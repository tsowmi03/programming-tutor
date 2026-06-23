import { describe, expect, it } from "vitest";
import {
  aiGuidanceRequestSchema,
  codeSubmissionSchema,
  courseAiGuidanceRequestSchema,
  courseExerciseRunSchema,
} from "./validation";

describe("AI guidance validation", () => {
  it("accepts course exercise guidance requests without client language", () => {
    const parsed = courseAiGuidanceRequestSchema.parse({
      courseSlug: "python",
      lessonSlug: "functions",
      exerciseId: "normalize-name",
      code: "def normalize_name(name):\n    return name.strip()",
    });

    expect(parsed).toMatchObject({
      courseSlug: "python",
      lessonSlug: "functions",
      exerciseId: "normalize-name",
      mode: "nudge",
    });
  });

  it("requires language for problem guidance requests", () => {
    const result = aiGuidanceRequestSchema.safeParse({
      code: "def two_sum(nums, target):\n    return []",
    });

    expect(result.success).toBe(false);
  });
});

describe("hidden test reveal validation", () => {
  it("defaults code submissions to hidden test redaction", () => {
    const parsed = codeSubmissionSchema.parse({
      kind: "code",
      slug: "two-sum",
      language: "python",
      code: "def two_sum(nums, target):\n    return []",
    });

    expect(parsed.showHiddenTests).toBe(false);
  });

  it("accepts course exercise hidden test reveal requests", () => {
    const parsed = courseExerciseRunSchema.parse({
      courseSlug: "python",
      lessonSlug: "functions",
      exerciseId: "normalize-name",
      code: "def normalize_name(name):\n    return name.strip()",
      showHiddenTests: true,
    });

    expect(parsed.showHiddenTests).toBe(true);
  });
});
