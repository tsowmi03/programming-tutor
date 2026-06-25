import type { CategoryId, Difficulty } from "@/content/types";
import { prisma } from "./prisma";
import { deriveStatus, type ProblemStatus, type ProblemSummary } from "./problems";

const DAY_MS = 24 * 60 * 60 * 1000;

export type ReviewReason =
  | "retry_failed_code"
  | "fix_runtime_error"
  | "revisit_missed_concept"
  | "strengthen_partial_concept"
  | "refresh_solved_problem";

export interface ReviewQueueItem {
  problem: ProblemSummary;
  reason: ReviewReason;
  reasonLabel: string;
  detail: string;
  dueAt: Date;
  latestSubmissionAt: Date;
  latestStatus: string;
  attempts: number;
  priority: number;
  due: boolean;
}

export interface ReviewQueue {
  generatedAt: Date;
  items: ReviewQueueItem[];
  due: ReviewQueueItem[];
  upcoming: ReviewQueueItem[];
}

interface ReviewSubmissionInput {
  status: string;
  selfScore: number | null;
  aiScore: number | null;
  createdAt: Date;
  passedCount: number | null;
  totalCount: number | null;
}

export interface ReviewProblemInput {
  slug: string;
  title: string;
  type: "code" | "explanation";
  difficulty: Difficulty;
  category: CategoryId;
  order: number;
  submissions: ReviewSubmissionInput[];
}

const REVIEW_REASON_COPY: Record<
  ReviewReason,
  { label: string; detail: string; priority: number; waitDays: number }
> = {
  retry_failed_code: {
    label: "Retry failed code",
    detail: "Your latest code submission did not pass. Rework it while the failure is still fresh.",
    priority: 100,
    waitDays: 0,
  },
  fix_runtime_error: {
    label: "Fix runtime or compile issue",
    detail: "The latest attempt stopped before all tests could pass. Start by making it run cleanly.",
    priority: 95,
    waitDays: 0,
  },
  revisit_missed_concept: {
    label: "Revisit missed concept",
    detail: "Your latest explanation missed the core idea. Try explaining it again before checking the model answer.",
    priority: 90,
    waitDays: 0,
  },
  strengthen_partial_concept: {
    label: "Strengthen partial concept",
    detail: "You were partly there. A short delay helps test whether the idea stuck.",
    priority: 70,
    waitDays: 2,
  },
  refresh_solved_problem: {
    label: "Refresh solved problem",
    detail: "You solved this before. Redo it from memory to keep the pattern available.",
    priority: 30,
    waitDays: 7,
  },
};

function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * DAY_MS);
}

function getEffectiveScore(submission: ReviewSubmissionInput): number | null {
  return submission.selfScore ?? submission.aiScore ?? null;
}

function getReason(
  problem: ReviewProblemInput,
  latest: ReviewSubmissionInput,
  status: ProblemStatus,
): ReviewReason | null {
  const score = getEffectiveScore(latest);
  if (score === 0) return "revisit_missed_concept";
  if (score === 1) return "strengthen_partial_concept";
  if (latest.status === "failed") return "retry_failed_code";
  if (latest.status === "error" || latest.status === "compile_error") {
    return "fix_runtime_error";
  }
  if (
    status === "solved" &&
    (latest.status === "passed" || score === 2 || problem.type === "explanation")
  ) {
    return "refresh_solved_problem";
  }
  return null;
}

function toProblemSummary(
  problem: ReviewProblemInput,
  status: ProblemStatus,
): ProblemSummary {
  return {
    slug: problem.slug,
    title: problem.title,
    type: problem.type,
    difficulty: problem.difficulty,
    category: problem.category,
    order: problem.order,
    status,
    submissionCount: problem.submissions.length,
  };
}

function sortReviewItems(a: ReviewQueueItem, b: ReviewQueueItem): number {
  if (a.due !== b.due) return a.due ? -1 : 1;
  return (
    b.priority - a.priority ||
    a.dueAt.getTime() - b.dueAt.getTime() ||
    a.problem.category.localeCompare(b.problem.category) ||
    a.problem.order - b.problem.order ||
    a.problem.title.localeCompare(b.problem.title)
  );
}

export function buildReviewQueue(
  problems: ReviewProblemInput[],
  now = new Date(),
): ReviewQueue {
  const items = problems.flatMap((problem) => {
    if (problem.submissions.length === 0) return [];
    const sortedSubmissions = [...problem.submissions].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
    const latest = sortedSubmissions[0];
    const status = deriveStatus(problem.submissions);
    const reason = getReason(problem, latest, status);
    if (!reason) return [];

    const copy = REVIEW_REASON_COPY[reason];
    const dueAt = addDays(latest.createdAt, copy.waitDays);
    return [
      {
        problem: toProblemSummary(problem, status),
        reason,
        reasonLabel: copy.label,
        detail: copy.detail,
        dueAt,
        latestSubmissionAt: latest.createdAt,
        latestStatus: latest.status,
        attempts: problem.submissions.length,
        priority: copy.priority,
        due: dueAt.getTime() <= now.getTime(),
      },
    ];
  });

  items.sort(sortReviewItems);

  return {
    generatedAt: now,
    items,
    due: items.filter((item) => item.due),
    upcoming: items.filter((item) => !item.due),
  };
}

export async function listReviewQueue(userId: string): Promise<ReviewQueue> {
  const problems = await prisma.problem.findMany({
    include: {
      submissions: {
        where: { userId },
        orderBy: { createdAt: "desc" },
        select: {
          status: true,
          selfScore: true,
          aiScore: true,
          createdAt: true,
          passedCount: true,
          totalCount: true,
        },
      },
    },
  });

  return buildReviewQueue(
    problems.map((problem) => ({
      slug: problem.slug,
      title: problem.title,
      type: problem.type as "code" | "explanation",
      difficulty: problem.difficulty as Difficulty,
      category: problem.category as CategoryId,
      order: problem.order,
      submissions: problem.submissions,
    })),
  );
}
