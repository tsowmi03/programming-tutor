import { describe, expect, it } from "vitest";
import {
  answerIsAccepted,
  normalizeCourseAnswer,
  parseCheckpointObjectiveIds,
  requiredActivityIds,
} from "./course-mastery";
import type { Lesson } from "@/content/courses";

describe("course mastery helpers", () => {
  it("grades short answers case-insensitively with normalized whitespace", () => {
    expect(normalizeCourseAnswer("  The   Final Line ")).toBe("the final line");
    expect(answerIsAccepted(" TRUE ", ["true", "yes"])).toBe(true);
    expect(answerIsAccepted("false", ["true", "yes"])).toBe(false);
  });

  it("only includes required exercises and checks in mastery", () => {
    const lesson = {
      slug: "example",
      title: "Example",
      summary: "Example",
      blocks: [
        {
          kind: "knowledge_check",
          check: {
            id: "required-check",
            format: "short_answer",
            prompt: "Prompt",
            acceptedAnswers: ["answer"],
            explanation: "Explanation",
            objectiveId: "objective",
          },
        },
        {
          kind: "knowledge_check",
          check: {
            id: "optional-check",
            format: "short_answer",
            prompt: "Prompt",
            acceptedAnswers: ["answer"],
            explanation: "Explanation",
            objectiveId: "objective",
            required: false,
          },
        },
      ],
    } satisfies Lesson;
    expect(requiredActivityIds(lesson)).toEqual(["required-check"]);
  });

  it("validates persisted checkpoint objective identifiers", () => {
    const validIds = ["m1-order", "m1-output"];

    expect(
      parseCheckpointObjectiveIds(
        '["m1-order","m1-output","m1-order"]',
        validIds,
      ),
    ).toEqual(["m1-order", "m1-output"]);
    expect(parseCheckpointObjectiveIds("not json", validIds)).toBeNull();
    expect(parseCheckpointObjectiveIds("[]", validIds)).toBeNull();
    expect(
      parseCheckpointObjectiveIds('["m1-order",42]', validIds),
    ).toBeNull();
    expect(
      parseCheckpointObjectiveIds('["unknown-objective"]', validIds),
    ).toBeNull();
  });
});
