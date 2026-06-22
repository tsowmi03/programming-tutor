import Anthropic from "@anthropic-ai/sdk";
import type { GuidanceItem } from "@/content/types";
import { LANGUAGES, type LanguageId } from "@/lib/judge/languages";
import type {
  FunctionSignature,
  JudgeOutcome,
  TestCase,
} from "@/lib/judge/types";

export type AiGuidanceMode = "nudge" | "debug" | "strategy" | "edge_case";

export const DEFAULT_AI_GUIDANCE_MODEL = "claude-haiku-4-5";

export interface AiGuidanceProblemContext {
  title: string;
  difficulty: string;
  category: string;
  description: string;
  guidance: GuidanceItem[];
  signature: FunctionSignature;
  visibleTests: TestCase[];
  hiddenTestCount: number;
}

interface SanitizedResult {
  index: number;
  status: string;
  hidden?: boolean;
  got?: string;
  expected?: string;
  error?: string;
  stdout?: string;
  note?: string;
}

interface SanitizedOutcome {
  status: string;
  passedCount: number;
  totalCount: number;
  compileOutput?: string;
  results: SanitizedResult[];
}

const MODE_INTENT: Record<AiGuidanceMode, string> = {
  nudge: "Give one small conceptual nudge.",
  debug:
    "Use the latest run feedback and current code to point to the most likely issue.",
  strategy: "Describe the next strategic step without writing the solution.",
  edge_case: "Suggest one edge case or invariant the student should test.",
};

const SYSTEM_PROMPT = `You are CodeClimb's on-demand tutor for data structures and algorithms practice.

Give the smallest useful next step. Do not provide a complete solution, complete function, or final reference code. Do not invent hidden test values. If hidden tests failed, you may say what kind of issue is likely, but you must not claim to know the hidden input or expected output. Keep the reply under 140 words unless the student has a compile error. Markdown is allowed.`;

function truncate(value: string | undefined, max = 1_500): string | undefined {
  if (!value) return value;
  if (value.length <= max) return value;
  return `${value.slice(0, max)}\n[truncated]`;
}

export function sanitizeOutcomeForGuidance(
  outcome: JudgeOutcome | null | undefined,
): SanitizedOutcome | null {
  if (!outcome) return null;

  return {
    status: outcome.status,
    passedCount: outcome.passedCount,
    totalCount: outcome.totalCount,
    compileOutput: truncate(outcome.compileOutput, 3_000),
    results: outcome.results.slice(0, 25).map((result) => {
      if (result.hidden) {
        return {
          index: result.index,
          status: result.status,
          hidden: true,
          note: "Hidden test details redacted.",
        };
      }

      return {
        index: result.index,
        status: result.status,
        hidden: false,
        got: truncate(result.got),
        expected: truncate(result.expected),
        error: truncate(result.error),
        stdout: truncate(result.stdout),
      };
    }),
  };
}

function renderSignature(signature: FunctionSignature): string {
  const params = signature.params
    .map((param) => `${param.name}: ${param.type}`)
    .join(", ");
  return `${signature.name}(${params}) -> ${signature.returns}`;
}

function renderVisibleTests(problem: AiGuidanceProblemContext): string {
  if (problem.visibleTests.length === 0) return "No visible tests.";
  return problem.visibleTests
    .slice(0, 4)
    .map((test, index) =>
      JSON.stringify({
        case: index + 1,
        input: test.input,
        expected: test.expected,
      }),
    )
    .join("\n");
}

function renderStaticGuidance(guidance: GuidanceItem[]): string {
  if (guidance.length === 0) return "No authored guidance.";
  return guidance
    .map((item, index) => `${index + 1}. ${item.level}: ${item.title} - ${item.body}`)
    .join("\n");
}

function renderOutcome(outcome: SanitizedOutcome | null): string {
  if (!outcome) return "No run or submission result yet.";
  return JSON.stringify(outcome, null, 2);
}

export function buildAiGuidancePrompt({
  problem,
  language,
  code,
  mode,
  latestOutcome,
  runError,
}: {
  problem: AiGuidanceProblemContext;
  language: LanguageId;
  code?: string;
  mode: AiGuidanceMode;
  latestOutcome?: JudgeOutcome | null;
  runError?: string | null;
}): { system: string; user: string } {
  const sanitizedOutcome = sanitizeOutcomeForGuidance(latestOutcome);
  const languageLabel = LANGUAGES[language]?.label ?? language;

  return {
    system: SYSTEM_PROMPT,
    user: `Student request: ${MODE_INTENT[mode]}

Problem:
Title: ${problem.title}
Difficulty: ${problem.difficulty}
Category: ${problem.category}
Signature: ${renderSignature(problem.signature)}
Hidden tests: ${problem.hiddenTestCount}

Description:
${problem.description}

Visible tests:
${renderVisibleTests(problem)}

Authored progressive guidance:
${renderStaticGuidance(problem.guidance)}

Student language: ${languageLabel}

Current code:
\`\`\`${language}
${code?.trim() || "[no code provided]"}
\`\`\`

Latest judge result:
${renderOutcome(sanitizedOutcome)}

Latest request error:
${runError ? truncate(runError, 3_000) : "None"}

Reply with only the requested guidance. Do not include a heading.`,
  };
}

export async function requestAiGuidance({
  client,
  model,
  problem,
  language,
  code,
  mode,
  latestOutcome,
  runError,
}: {
  client: Anthropic;
  model: string;
  problem: AiGuidanceProblemContext;
  language: LanguageId;
  code?: string;
  mode: AiGuidanceMode;
  latestOutcome?: JudgeOutcome | null;
  runError?: string | null;
}): Promise<string> {
  const prompt = buildAiGuidancePrompt({
    problem,
    language,
    code,
    mode,
    latestOutcome,
    runError,
  });

  const message = await client.messages.create({
    model,
    max_tokens: 700,
    system: prompt.system,
    messages: [{ role: "user", content: prompt.user }],
  });

  return message.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("")
    .trim();
}
