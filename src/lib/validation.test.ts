import { describe, expect, it } from "vitest";
import {
  aiGuidanceRequestSchema,
  courseAiGuidanceRequestSchema,
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
