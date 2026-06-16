import { describe, expect, it } from "vitest";
import { ALL_PROBLEMS } from ".";
import { normalizeGuidance } from "@/lib/guidance";

describe("problem content", () => {
  it("provides revealable guidance for every problem", () => {
    for (const problem of ALL_PROBLEMS) {
      const guidance = normalizeGuidance(problem.guidance, problem.hints);

      expect(guidance.length, `${problem.slug} guidance`).toBeGreaterThanOrEqual(
        1,
      );
      expect(
        guidance.every((item) => item.title.trim() && item.body.trim()),
        `${problem.slug} guidance content`,
      ).toBe(true);
    }
  });
});
