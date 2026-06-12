/**
 * Calls Claude to author a single problem from a ProblemSpec and validates the
 * result. The model returns a JSON object inside <problem></problem> tags; we
 * extract, parse, and zod-validate it. A failing verification run can be fed
 * back via `fixContext` for a corrective second attempt.
 */

import Anthropic from "@anthropic-ai/sdk";
import { LANGUAGE_IDS } from "../../src/lib/judge/languages";
import {
  problemSchema,
  slugify,
  type GeneratedProblem,
  type ProblemSpec,
} from "./spec";

/** Sonnet handles easy/medium well and is ~5x cheaper; reserve Opus for hard. */
export const MODEL_BY_DIFFICULTY: Record<string, string> = {
  easy: "claude-sonnet-4-6",
  medium: "claude-sonnet-4-6",
  hard: "claude-opus-4-8",
};

export function modelForDifficulty(difficulty: string): string {
  return MODEL_BY_DIFFICULTY[difficulty] ?? "claude-sonnet-4-6";
}

const SYSTEM_PROMPT = `You are an expert problem author for a programming-tutor platform. You write LeetCode-style coding problems and short conceptual "explanation" problems for students learning data structures and algorithms.

You output ONE problem as a single JSON object wrapped in <problem></problem> tags. No prose outside the tags.

# Hard constraints for CODE problems

The platform runs a cross-language judge. Solutions are executed in Python, JavaScript, Java, and C. You MUST respect these limits or the problem is unusable:

1. The function signature may only use these value types, for both parameters and the return:
   "int", "bool", "string", "int[]", "string[]", "int[][]"
   No floats, no maps/dicts, no linked-list/tree node types, no tuples, no chars. Model graphs/trees/lists as int[]/int[][] adjacency or array encodings.
2. "name" is camelCase (e.g. "twoSum"). Python harnesses auto-convert to snake_case.
3. Provide starterCode AND a correct reference solution for ALL FOUR languages: python, javascript, java, c. Every solution must pass every test case.
4. C has no built-in hash map or dynamic containers. Keep C solutions simple and self-contained — a brute-force O(n^2) scan is acceptable in C even when the editorial describes an O(n) approach. Allocate returned arrays with malloc. For array returns, follow this convention: the function takes an extra "int* returnSize" out-parameter as the LAST argument and sets it. (The harness handles this; match the style of the starter code you emit.) For int[][] parameters, use the LeetCode C convention: "int** grid, int gridSize, int* gridColSize" — gridSize is the number of rows, gridColSize[r] is the number of columns in row r.
5. testCases: an array of { "input": [...one value per parameter in order...], "expected": <value>, "hidden": true|false }. Provide 6-10 cases. Mark the first 2-3 as visible (hidden:false) and the rest hidden:true. Include edge cases (empty input, single element, duplicates, negatives, all-same) among the hidden ones. Values must match the declared types exactly.
6. If the correct answer is an array whose order is not significant, set "ordered": false on the signature so the judge sorts before comparing.
7. starterCode is a stub the student fills in (correct signature, a TODO comment, a trivial default return). solutions is the full working answer.

# Hard constraints for EXPLANATION problems

Used for conceptual understanding (no code execution). Provide:
- description: the prompt/question (markdown), telling the student exactly what to cover.
- modelAnswer: a thorough markdown reference answer.
- keyPoints: a checklist (array of short strings) a good answer should hit, for self-assessment.
- hints: 2-4 progressive hints nudging the student toward the key ideas without giving away the full answer.
Do NOT include signature/testCases/starterCode/solutions/editorial for explanation problems.

# Shared fields
- slug: kebab-case, unique, derived from the title.
- title, difficulty ("easy"|"medium"|"hard"), category (given to you).
- description: markdown. Include a couple of worked examples in fenced \`\`\`text blocks and a "Constraints" section for code problems.
- hints: 2-4 progressive hints (array), each nudging without giving away the answer.
- editorial (code only): markdown walkthrough of the intended approach with complexity analysis.

# JSON shape — match exactly

<problem>
{
  "type": "code",
  "slug": "...",
  "title": "...",
  "difficulty": "easy",
  "category": "...",
  "description": "...",
  "hints": ["...", "..."],
  "signature": { "name": "...", "params": [{ "name": "...", "type": "int[]" }], "returns": "int", "ordered": true },
  "testCases": [{ "input": [[1,2,3]], "expected": 6, "hidden": false }],
  "starterCode": { "python": "...", "javascript": "...", "java": "...", "c": "..." },
  "solutions": { "python": "...", "javascript": "...", "java": "...", "c": "..." },
  "editorial": "..."
}
</problem>

Difficulty calibration: "easy" = one idea, ~10 lines; "medium" = a known pattern applied with care; "hard" = multiple ideas or a non-obvious insight. Keep problems self-contained and unambiguous.`;

function buildUserPrompt(spec: ProblemSpec): string {
  const langs = LANGUAGE_IDS.join(", ");
  if (spec.type === "explanation") {
    return `Write ONE explanation problem.
Category: ${spec.category}
Difficulty: ${spec.difficulty}
Topic: ${spec.topic}

Return only the <problem>...</problem> JSON.`;
  }
  return `Write ONE code problem with full, correct reference solutions in all four languages (${langs}).
Category: ${spec.category}
Difficulty: ${spec.difficulty}
Topic: ${spec.topic}

Double-check that every reference solution returns exactly the declared "expected" value for every test case before emitting. Return only the <problem>...</problem> JSON.`;
}

function extractJson(text: string): string {
  const m = text.match(/<problem>([\s\S]*?)<\/problem>/);
  if (!m) {
    // Fall back to the largest brace-balanced block.
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end === -1 || end < start) {
      throw new Error("No <problem> JSON block found in model output.");
    }
    return text.slice(start, end + 1);
  }
  return m[1].trim();
}

export interface GenerateOptions {
  client: Anthropic;
  spec: ProblemSpec;
  model?: string;
  /** Failing-verification feedback for a corrective retry. */
  fixContext?: { previousJson: string; failures: string };
}

export interface GenerateResult {
  problem: GeneratedProblem;
  /** The raw JSON the model emitted, for feeding into a corrective retry. */
  json: string;
}

export async function generateProblem(
  opts: GenerateOptions,
): Promise<GenerateResult> {
  const { client, spec, model = modelForDifficulty(spec.difficulty), fixContext } = opts;

  const messages: Anthropic.MessageParam[] = [
    { role: "user", content: buildUserPrompt(spec) },
  ];
  if (fixContext) {
    messages.push(
      { role: "assistant", content: `<problem>${fixContext.previousJson}</problem>` },
      {
        role: "user",
        content: `That problem FAILED verification — its reference solutions did not pass the test cases:\n\n${fixContext.failures}\n\nFix the bug. The mismatch is usually a wrong "expected" value, a buggy reference solution, or a type that the judge can't marshal. Re-emit the COMPLETE corrected problem as <problem>...</problem> JSON.`,
      },
    );
  }

  const useThinking = spec.difficulty === "hard";
  const stream = client.messages.stream({
    model,
    max_tokens: useThinking ? 32000 : 8000,
    ...(useThinking
      ? { thinking: { type: "adaptive" }, output_config: { effort: "high" } }
      : {}),
    system: SYSTEM_PROMPT,
    messages,
  });

  const message = await stream.finalMessage();
  const text = message.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");

  const json = extractJson(text);
  const raw = JSON.parse(json);

  // Backfill a slug if the model omitted one or it was overridden.
  if (spec.slug) raw.slug = spec.slug;
  else if (!raw.slug && raw.title) raw.slug = slugify(raw.title);

  // Force category/difficulty to the requested values — the spec is authoritative.
  raw.category = spec.category;
  raw.difficulty = spec.difficulty;

  const parsed = problemSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(
      `Generated problem failed validation:\n${parsed.error.issues
        .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
        .join("\n")}\n\nRaw JSON:\n${json.slice(0, 2000)}`,
    );
  }
  return { problem: parsed.data, json: JSON.stringify(raw) };
}
