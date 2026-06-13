import { describe, expect, it } from "vitest";
import type { ProblemSummary } from "./problems";
import {
  buildProblemHref,
  filterProblems,
  getNextProblem,
  orderProblems,
  parseProblemSequenceParams,
} from "./problem-navigation";

const PROBLEMS: ProblemSummary[] = [
  {
    slug: "binary-search",
    title: "Binary Search",
    type: "code",
    difficulty: "easy",
    category: "binary-search",
    order: 1,
    status: "not_started",
    submissionCount: 0,
  },
  {
    slug: "two-sum",
    title: "Two Sum",
    type: "code",
    difficulty: "easy",
    category: "arrays-hashing",
    order: 1,
    status: "solved",
    submissionCount: 1,
  },
  {
    slug: "hash-maps",
    title: "Hash Maps",
    type: "explanation",
    difficulty: "medium",
    category: "arrays-hashing",
    order: 2,
    status: "attempted",
    submissionCount: 1,
  },
];

describe("problem navigation", () => {
  it("filters a sequence using all supported controls", () => {
    expect(
      filterProblems(PROBLEMS, {
        category: "arrays-hashing",
        type: "code",
        status: "solved",
        query: "sum",
      }).map((problem) => problem.slug),
    ).toEqual(["two-sum"]);
  });

  it("uses the visible category and problem order by default", () => {
    expect(orderProblems(PROBLEMS).map((problem) => problem.slug)).toEqual([
      "two-sum",
      "hash-maps",
      "binary-search",
    ]);
  });

  it("produces a stable shuffled order without mutating the input", () => {
    const original = PROBLEMS.map((problem) => problem.slug);
    const first = orderProblems(PROBLEMS, "shared-seed").map(
      (problem) => problem.slug,
    );
    const second = orderProblems(PROBLEMS, "shared-seed").map(
      (problem) => problem.slug,
    );

    expect(first).toEqual(second);
    expect(PROBLEMS.map((problem) => problem.slug)).toEqual(original);
    expect(first).toHaveLength(PROBLEMS.length);
  });

  it("wraps next-problem navigation at the end of a queue", () => {
    const ordered = orderProblems(PROBLEMS);
    expect(getNextProblem(ordered, "binary-search")?.slug).toBe("two-sum");
    expect(getNextProblem([ordered[0]], ordered[0].slug)).toBeNull();
  });

  it("sanitizes URL state and carries it into problem links", () => {
    const params = parseProblemSequenceParams({
      category: "arrays-hashing",
      difficulty: "easy",
      type: "code",
      status: "not_started",
      q: "  pair sum  ",
      shuffle: "seed",
      ignored: "value",
    });

    expect(buildProblemHref("two-sum", params)).toBe(
      "/problems/two-sum?category=arrays-hashing&difficulty=easy&type=code&status=not_started&q=pair+sum&shuffle=seed",
    );
    expect(
      parseProblemSequenceParams({
        difficulty: "impossible",
        type: "essay",
        status: "unknown",
      }),
    ).toEqual({});
  });
});
