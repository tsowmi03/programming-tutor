/**
 * Authoring types for problem content.
 *
 * Problems are authored as TypeScript modules under src/content/problems and
 * seeded into the database (prisma/seed.ts). Keeping content in the repo
 * makes it reviewable, versioned, and type-checked.
 */

import type { LanguageCodeMap } from "@/lib/judge/languages";
import type { FunctionSignature, TestCase } from "@/lib/judge/types";

export type Difficulty = "easy" | "medium" | "hard";

export type CategoryId =
  | "foundations"
  | "complexity"
  | "arrays-hashing"
  | "two-pointers"
  | "stack"
  | "binary-search"
  | "sliding-window"
  | "linked-lists"
  | "trees-graphs"
  | "recursion-dp";

export type GuidanceLevel = "nudge" | "strategy" | "pitfall" | "pseudocode";

export interface GuidanceItem {
  title: string;
  body: string;
  level: GuidanceLevel;
}

interface ProblemBase {
  slug: string;
  title: string;
  difficulty: Difficulty;
  category: CategoryId;
  /** Sort order within the category (roughly a learning path). */
  order: number;
  /** Markdown statement shown in the workspace. */
  description: string;
  /** Progressive hints, revealed one at a time. */
  hints: string[];
  /**
   * Optional structured guidance, revealed only when requested. Existing
   * content can keep using hints; the app normalizes hints into guidance.
   */
  guidance?: GuidanceItem[];
}

export interface CodeProblemDef extends ProblemBase {
  type: "code";
  signature: FunctionSignature;
  testCases: TestCase[];
  /** Per-language editor stubs; core languages required, newer ones optional. */
  starterCode: LanguageCodeMap;
  /** Reference solutions; shown after solving and used to verify the judge. */
  solutions: LanguageCodeMap;
  /** Markdown walkthrough of the intended approach. */
  editorial: string;
}

export interface ExplanationProblemDef extends ProblemBase {
  type: "explanation";
  /** Markdown model answer revealed after the user writes theirs. */
  modelAnswer: string;
  /** Checklist of points a good answer should cover (self-assessment). */
  keyPoints: string[];
}

export type ProblemDef = CodeProblemDef | ExplanationProblemDef;
