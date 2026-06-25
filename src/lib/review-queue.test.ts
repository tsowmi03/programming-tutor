import { describe, expect, it } from "vitest";
import { buildReviewQueue, type ReviewProblemInput } from "./review-queue";

const NOW = new Date("2026-06-25T10:00:00.000Z");

function submission(
  overrides: Partial<ReviewProblemInput["submissions"][number]>,
): ReviewProblemInput["submissions"][number] {
  return {
    status: "passed",
    selfScore: null,
    aiScore: null,
    createdAt: new Date("2026-06-20T10:00:00.000Z"),
    passedCount: null,
    totalCount: null,
    ...overrides,
  };
}

function problem(
  overrides: Partial<ReviewProblemInput>,
): ReviewProblemInput {
  return {
    slug: "two-sum",
    title: "Two Sum",
    type: "code",
    difficulty: "easy",
    category: "arrays-hashing",
    order: 1,
    submissions: [],
    ...overrides,
  };
}

describe("buildReviewQueue", () => {
  it("puts failed latest code submissions due immediately", () => {
    const queue = buildReviewQueue(
      [
        problem({
          submissions: [
            submission({
              status: "failed",
              createdAt: new Date("2026-06-25T09:00:00.000Z"),
            }),
          ],
        }),
      ],
      NOW,
    );

    expect(queue.due).toHaveLength(1);
    expect(queue.due[0]).toMatchObject({
      reason: "retry_failed_code",
      due: true,
      latestStatus: "failed",
    });
  });

  it("uses the newest submission when choosing the review reason", () => {
    const queue = buildReviewQueue(
      [
        problem({
          slug: "binary-search",
          title: "Binary Search",
          submissions: [
            submission({
              status: "passed",
              createdAt: new Date("2026-06-24T09:00:00.000Z"),
            }),
            submission({
              status: "failed",
              createdAt: new Date("2026-06-20T09:00:00.000Z"),
            }),
          ],
        }),
      ],
      NOW,
    );

    expect(queue.items[0]).toMatchObject({
      reason: "refresh_solved_problem",
      due: false,
    });
  });

  it("lets manual explanation scores override AI scores", () => {
    const queue = buildReviewQueue(
      [
        problem({
          slug: "big-o",
          title: "Big-O Basics",
          type: "explanation",
          category: "complexity",
          submissions: [
            submission({
              status: "self_assessed",
              selfScore: 1,
              aiScore: 2,
              createdAt: new Date("2026-06-23T09:00:00.000Z"),
            }),
          ],
        }),
      ],
      NOW,
    );

    expect(queue.due[0]).toMatchObject({
      reason: "strengthen_partial_concept",
      due: true,
      problem: expect.objectContaining({ status: "attempted" }),
    });
  });

  it("keeps partial concepts upcoming until their review interval passes", () => {
    const queue = buildReviewQueue(
      [
        problem({
          slug: "hash-maps",
          title: "Hash Maps",
          type: "explanation",
          submissions: [
            submission({
              status: "ai_assessed",
              aiScore: 1,
              createdAt: new Date("2026-06-24T10:00:00.000Z"),
            }),
          ],
        }),
      ],
      NOW,
    );

    expect(queue.due).toHaveLength(0);
    expect(queue.upcoming[0]).toMatchObject({
      reason: "strengthen_partial_concept",
      due: false,
    });
  });

  it("queues solved problems after the retention interval", () => {
    const queue = buildReviewQueue(
      [
        problem({
          slug: "contains-duplicate",
          title: "Contains Duplicate",
          submissions: [
            submission({
              status: "passed",
              createdAt: new Date("2026-06-10T10:00:00.000Z"),
            }),
          ],
        }),
      ],
      NOW,
    );

    expect(queue.due[0]).toMatchObject({
      reason: "refresh_solved_problem",
      due: true,
      problem: expect.objectContaining({ status: "solved" }),
    });
  });

  it("sorts due retry work ahead of retention refreshes", () => {
    const queue = buildReviewQueue(
      [
        problem({
          slug: "old-solved",
          title: "Old Solved",
          submissions: [
            submission({
              status: "passed",
              createdAt: new Date("2026-06-01T10:00:00.000Z"),
            }),
          ],
        }),
        problem({
          slug: "latest-failed",
          title: "Latest Failed",
          submissions: [
            submission({
              status: "failed",
              createdAt: new Date("2026-06-25T09:00:00.000Z"),
            }),
          ],
        }),
      ],
      NOW,
    );

    expect(queue.due.map((item) => item.problem.slug)).toEqual([
      "latest-failed",
      "old-solved",
    ]);
  });
});
