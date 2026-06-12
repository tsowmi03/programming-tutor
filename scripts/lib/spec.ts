/**
 * Validation for AI-generated problems. The model returns a JSON object; we
 * validate it with zod before rendering so malformed output never reaches a
 * content file. The schema mirrors src/content/types.ts but additionally
 * enforces the judge's hard constraints (supported value types, the four
 * languages, slug shape).
 */

import { z } from "zod";
import { LANGUAGE_IDS } from "../../src/lib/judge/languages";
import type { CategoryId } from "../../src/content/types";

/** The only value types the cross-language harness can marshal. */
export const JUDGE_TYPES = [
  "int",
  "bool",
  "string",
  "int[]",
  "string[]",
  "int[][]",
] as const;

export const CATEGORY_IDS = [
  "foundations",
  "complexity",
  "arrays-hashing",
  "two-pointers",
  "stack",
  "binary-search",
  "sliding-window",
  "linked-lists",
  "trees-graphs",
  "recursion-dp",
] as const satisfies readonly CategoryId[];

export const DIFFICULTIES = ["easy", "medium", "hard"] as const;

/** What the generator is asked to produce, before order/slug bookkeeping. */
export interface ProblemSpec {
  type: "code" | "explanation";
  category: CategoryId;
  difficulty: (typeof DIFFICULTIES)[number];
  topic: string;
  /** Optional explicit slug; otherwise derived from the model's title. */
  slug?: string;
}

const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case");

const langMap = z.object(
  Object.fromEntries(LANGUAGE_IDS.map((l) => [l, z.string().min(1)])),
) as z.ZodType<Record<(typeof LANGUAGE_IDS)[number], string>>;

const judgeType = z.enum(JUDGE_TYPES);

const testCase = z.object({
  input: z.array(z.unknown()),
  expected: z.unknown(),
  hidden: z.boolean().optional(),
});

const signature = z.object({
  name: z.string().regex(/^[a-zA-Z][a-zA-Z0-9]*$/, "name must be camelCase"),
  params: z
    .array(z.object({ name: z.string().min(1), type: judgeType }))
    .min(1),
  returns: judgeType,
  ordered: z.boolean().optional(),
});

const base = {
  slug: slugSchema,
  title: z.string().min(1),
  difficulty: z.enum(DIFFICULTIES),
  category: z.enum(CATEGORY_IDS),
  description: z.string().min(1),
  hints: z.array(z.string().min(1)).min(1),
};

export const codeProblemSchema = z.object({
  ...base,
  type: z.literal("code"),
  signature,
  testCases: z.array(testCase).min(3),
  starterCode: langMap,
  solutions: langMap,
  editorial: z.string().min(1),
});

export const explanationProblemSchema = z.object({
  ...base,
  type: z.literal("explanation"),
  modelAnswer: z.string().min(1),
  keyPoints: z.array(z.string().min(1)).min(1),
});

export const problemSchema = z.discriminatedUnion("type", [
  codeProblemSchema,
  explanationProblemSchema,
]);

export type GeneratedProblem = z.infer<typeof problemSchema>;

/** twoSum / two-sum / "Two Sum" -> two-sum */
export function slugify(input: string): string {
  return input
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** camelCase export-name from a slug: two-sum -> twoSum */
export function exportName(slug: string): string {
  return slug.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());
}
