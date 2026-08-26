import { describe, expect, it } from "vitest";
import { beginnerFeedback } from "./beginner-feedback";

describe("beginner feedback", () => {
  it("translates an unterminated Python string", () => {
    const feedback = beginnerFeedback({
      status: "compile_error",
      results: [],
      compileOutput: "SyntaxError: unterminated string literal (line 2)",
      passedCount: 0,
      totalCount: 1,
    });
    expect(feedback?.title).toBe("Check your quotation marks");
  });

  it("does not disclose hidden cases when explaining a mismatch", () => {
    const feedback = beginnerFeedback({
      status: "failed",
      results: [{ index: 1, status: "fail", hidden: true }],
      passedCount: 1,
      totalCount: 2,
    });
    expect(feedback?.explanation).not.toContain("input was");
    expect(feedback?.title).toContain("not every example");
  });

  it("returns no corrective feedback after success", () => {
    expect(
      beginnerFeedback({
        status: "passed",
        results: [{ index: 0, status: "pass" }],
        passedCount: 1,
        totalCount: 1,
      }),
    ).toBeNull();
  });
});
