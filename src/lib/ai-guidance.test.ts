import { describe, expect, it } from "vitest";
import {
  buildAiGuidancePrompt,
  sanitizeOutcomeForGuidance,
  type AiGuidanceProblemContext,
} from "./ai-guidance";
import type { JudgeOutcome } from "./judge/types";

const problem: AiGuidanceProblemContext = {
  title: "Two Sum",
  difficulty: "easy",
  category: "arrays-hashing",
  description: "Return indices of two numbers that add up to the target.",
  guidance: [
    {
      title: "Track complements",
      level: "strategy",
      body: "Look for each number's complement as you scan.",
    },
  ],
  signature: {
    name: "twoSum",
    params: [
      { name: "nums", type: "int[]" },
      { name: "target", type: "int" },
    ],
    returns: "int[]",
  },
  visibleTests: [{ input: [[2, 7, 11, 15], 9], expected: [0, 1] }],
  hiddenTestCount: 1,
};

describe("AI guidance helpers", () => {
  it("redacts hidden result details before prompt construction", () => {
    const outcome: JudgeOutcome = {
      status: "failed",
      passedCount: 1,
      totalCount: 2,
      results: [
        { index: 0, status: "pass", got: "[0,1]", expected: "[0,1]" },
        {
          index: 1,
          status: "fail",
          hidden: true,
          got: "secret got",
          expected: "secret expected",
          stdout: "secret stdout",
        },
      ],
    };

    const sanitized = sanitizeOutcomeForGuidance(outcome);
    const json = JSON.stringify(sanitized);

    expect(sanitized?.results[1]).toEqual({
      index: 1,
      status: "fail",
      hidden: true,
      note: "Hidden test details redacted.",
    });
    expect(json).not.toContain("secret got");
    expect(json).not.toContain("secret expected");
    expect(json).not.toContain("secret stdout");
  });

  it("builds a tutor prompt from visible problem and attempt context", () => {
    const prompt = buildAiGuidancePrompt({
      problem,
      language: "python",
      code: "def two_sum(nums, target):\n    return []",
      mode: "debug",
      latestOutcome: {
        status: "failed",
        passedCount: 0,
        totalCount: 1,
        results: [{ index: 0, status: "fail", got: "[]", expected: "[0,1]" }],
      },
      runError: null,
    });

    expect(prompt.system).toContain("Do not provide a complete solution");
    expect(prompt.user).toContain("Use the latest run feedback");
    expect(prompt.user).toContain("twoSum(nums: int[], target: int) -> int[]");
    expect(prompt.user).toContain('"expected":[0,1]');
    expect(prompt.user).toContain("def two_sum");
  });
});
