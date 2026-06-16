/**
 * Problem service: typed access over the Problem/Submission tables,
 * including JSON column parsing and progress derivation.
 */

import { prisma } from "./prisma";
import type { LanguageId } from "./judge/languages";
import type { FunctionSignature, TestCase } from "./judge/types";
import type { CategoryId, Difficulty, GuidanceItem } from "@/content/types";
import { guidanceBodies, normalizeGuidance } from "./guidance";

export type ProblemStatus = "not_started" | "attempted" | "solved";

export interface ProblemSummary {
  slug: string;
  title: string;
  type: "code" | "explanation";
  difficulty: Difficulty;
  category: CategoryId;
  order: number;
  status: ProblemStatus;
  submissionCount: number;
}

export interface ProblemDetail {
  slug: string;
  title: string;
  type: "code" | "explanation";
  difficulty: Difficulty;
  category: CategoryId;
  description: string;
  guidance: GuidanceItem[];
  /** Legacy shape retained for older components and API consumers. */
  hints: string[];
  status: ProblemStatus;
  /** Code problems: sample (visible) tests and editor scaffolding. */
  signature?: FunctionSignature;
  visibleTests?: TestCase[];
  hiddenTestCount?: number;
  starterCode?: Partial<Record<LanguageId, string>>;
}

interface SubmissionLite {
  status: string;
  selfScore: number | null;
}

/**
 * A problem is solved by a passing code submission, or an explanation
 * submission self-assessed as "got it" (2). Anything else with at least one
 * submission counts as attempted.
 */
export function deriveStatus(submissions: SubmissionLite[]): ProblemStatus {
  if (submissions.length === 0) return "not_started";
  const solved = submissions.some(
    (s) =>
      s.status === "passed" ||
      (s.status === "self_assessed" && (s.selfScore ?? 0) >= 2),
  );
  return solved ? "solved" : "attempted";
}

export async function listProblems(userId: string): Promise<ProblemSummary[]> {
  const problems = await prisma.problem.findMany({
    orderBy: [{ category: "asc" }, { order: "asc" }],
    include: {
      submissions: {
        where: { userId },
        select: { status: true, selfScore: true },
      },
    },
  });

  return problems.map((p) => ({
    slug: p.slug,
    title: p.title,
    type: p.type as "code" | "explanation",
    difficulty: p.difficulty as Difficulty,
    category: p.category as CategoryId,
    order: p.order,
    status: deriveStatus(p.submissions),
    submissionCount: p.submissions.length,
  }));
}

export async function getProblemRecord(slug: string) {
  return prisma.problem.findUnique({ where: { slug } });
}

export async function getProblemDetail(
  slug: string,
  userId: string,
): Promise<ProblemDetail | null> {
  const p = await prisma.problem.findUnique({
    where: { slug },
    include: {
      submissions: {
        where: { userId },
        select: { status: true, selfScore: true },
      },
    },
  });
  if (!p) return null;
  const guidance = normalizeGuidance(JSON.parse(p.hints));

  const detail: ProblemDetail = {
    slug: p.slug,
    title: p.title,
    type: p.type as "code" | "explanation",
    difficulty: p.difficulty as Difficulty,
    category: p.category as CategoryId,
    description: p.description,
    guidance,
    hints: guidanceBodies(guidance),
    status: deriveStatus(p.submissions),
  };

  if (p.type === "code" && p.signature && p.testCases && p.starterCode) {
    const allTests = JSON.parse(p.testCases) as TestCase[];
    detail.signature = JSON.parse(p.signature) as FunctionSignature;
    detail.visibleTests = allTests.filter((t) => !t.hidden);
    detail.hiddenTestCount = allTests.filter((t) => t.hidden).length;
    detail.starterCode = JSON.parse(p.starterCode) as Partial<
      Record<LanguageId, string>
    >;
  }

  return detail;
}

/**
 * Parsed judging inputs for a code problem (server-side only).
 * Tests are ordered visible-first so that result indices line up with the
 * sample tests the client displays, regardless of authoring order.
 */
export function parseJudgingData(record: {
  signature: string | null;
  testCases: string | null;
}): { signature: FunctionSignature; tests: TestCase[] } | null {
  if (!record.signature || !record.testCases) return null;
  const tests = JSON.parse(record.testCases) as TestCase[];
  return {
    signature: JSON.parse(record.signature) as FunctionSignature,
    tests: [...tests.filter((t) => !t.hidden), ...tests.filter((t) => t.hidden)],
  };
}
