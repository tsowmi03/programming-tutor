import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";

export const DEFAULT_AI_EXPLANATION_MARKING_MODEL = "claude-haiku-4-5";

export type AiExplanationScore = 0 | 1 | 2;

export interface AiExplanationMarking {
  score: AiExplanationScore;
  label: "Missed it" | "Partially there" | "Got it";
  feedback: string;
  coveredKeyPointIndexes: number[];
  missingKeyPointIndexes: number[];
  nextStep: string;
}

export interface AiExplanationMarkingContext {
  title: string;
  difficulty: string;
  category: string;
  description: string;
  modelAnswer: string;
  keyPoints: string[];
  answerText: string;
}

const SYSTEM_PROMPT = `You are CodeClimb's explanation marker for data structures and algorithms practice.

Mark the student's explanation against the prompt, model answer, and key points. Be fair about wording: award credit for correct ideas even if phrased differently. Penalize serious misconceptions, missing core ideas, and vague answers. Do not require the answer to match the model answer exactly.

Return only valid JSON.`;

function truncate(value: string, max = 6_000): string {
  if (value.length <= max) return value;
  return `${value.slice(0, max)}\n[truncated]`;
}

function scoreLabel(score: AiExplanationScore): AiExplanationMarking["label"] {
  if (score === 2) return "Got it";
  if (score === 1) return "Partially there";
  return "Missed it";
}

function numberedKeyPoints(keyPoints: string[]): string {
  if (keyPoints.length === 0) return "No key points supplied.";
  return keyPoints
    .map((point, index) => `[${index}] ${point}`)
    .join("\n");
}

export function buildAiExplanationMarkingPrompt(
  context: AiExplanationMarkingContext,
): { system: string; user: string } {
  return {
    system: SYSTEM_PROMPT,
    user: `Mark this explanation submission.

Use this score scale:
0 = missed it: mostly wrong, empty, or not addressing the question.
1 = partially there: some correct ideas, but missing important points or containing a serious gap.
2 = got it: covers the main ideas accurately enough to count as solved.

Respond with JSON only:
{
  "score": 0 | 1 | 2,
  "feedback": "2-4 concise sentences addressed to the student",
  "coveredKeyPointIndexes": [0],
  "missingKeyPointIndexes": [1],
  "nextStep": "one specific revision suggestion"
}

Problem:
Title: ${context.title}
Difficulty: ${context.difficulty}
Category: ${context.category}

Prompt:
${truncate(context.description)}

Key points:
${numberedKeyPoints(context.keyPoints)}

Model answer:
${truncate(context.modelAnswer)}

Student answer:
${truncate(context.answerText)}`,
  };
}

const scoreSchema = z.preprocess((value) => {
  if (typeof value === "string" && /^[0-2]$/.test(value)) {
    return Number(value);
  }
  return value;
}, z.union([z.literal(0), z.literal(1), z.literal(2)]));

const markingSchema = z.object({
  score: scoreSchema,
  feedback: z.string().trim().min(1).max(1_500),
  coveredKeyPointIndexes: z.array(z.number().int().nonnegative()).max(50),
  missingKeyPointIndexes: z.array(z.number().int().nonnegative()).max(50),
  nextStep: z.string().trim().min(1).max(500),
});

function extractJsonObject(text: string): string {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("AI marking did not return JSON.");
  }
  return text.slice(start, end + 1);
}

function uniqueValidIndexes(indexes: number[], keyPoints: string[]): number[] {
  return Array.from(new Set(indexes))
    .filter((index) => index < keyPoints.length)
    .sort((a, b) => a - b);
}

export function parseAiExplanationMarking(
  text: string,
  keyPoints: string[],
): AiExplanationMarking {
  const parsed = markingSchema.parse(JSON.parse(extractJsonObject(text)));
  const covered = uniqueValidIndexes(parsed.coveredKeyPointIndexes, keyPoints);
  const missingFromModel = uniqueValidIndexes(parsed.missingKeyPointIndexes, keyPoints);
  const missing =
    keyPoints.length > 0
      ? Array.from(
          new Set([
            ...missingFromModel.filter((index) => !covered.includes(index)),
            ...keyPoints
              .map((_, index) => index)
              .filter((index) => !covered.includes(index)),
          ]),
        ).sort((a, b) => a - b)
      : [];

  return {
    score: parsed.score,
    label: scoreLabel(parsed.score),
    feedback: parsed.feedback,
    coveredKeyPointIndexes: covered,
    missingKeyPointIndexes: missing,
    nextStep: parsed.nextStep,
  };
}

export async function requestAiExplanationMarking({
  client,
  model,
  context,
}: {
  client: Anthropic;
  model: string;
  context: AiExplanationMarkingContext;
}): Promise<AiExplanationMarking> {
  const prompt = buildAiExplanationMarkingPrompt(context);
  const message = await client.messages.create({
    model,
    max_tokens: 650,
    system: prompt.system,
    messages: [{ role: "user", content: prompt.user }],
  });

  const text = message.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("")
    .trim();

  return parseAiExplanationMarking(text, context.keyPoints);
}
