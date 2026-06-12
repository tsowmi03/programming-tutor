import { describe, expect, it } from "vitest";
import { parseJudgeOutput } from "./parse";

describe("parseJudgeOutput", () => {
  it("parses passing and failing results", () => {
    const stdout = [
      "@@JUDGE:BEGIN:0@@",
      '@@JUDGE:RESULT:0:{"pass":true}@@',
      "@@JUDGE:BEGIN:1@@",
      '@@JUDGE:RESULT:1:{"pass":false,"got":5}@@',
    ].join("\n");

    const { results, fatal } = parseJudgeOutput(stdout, 2);
    expect(fatal).toBeUndefined();
    expect(results[0]).toMatchObject({
      index: 0,
      status: "pass",
    });
    expect(results[1]).toMatchObject({ index: 1, status: "fail", got: "5" });
  });

  it("captures user debug output between markers", () => {
    const stdout = [
      "@@JUDGE:BEGIN:0@@",
      "debugging value: 42",
      "another line",
      '@@JUDGE:RESULT:0:{"pass":true}@@',
    ].join("\n");

    const { results } = parseJudgeOutput(stdout, 1);
    expect(results[0].stdout).toBe("debugging value: 42\nanother line");
  });

  it("marks a crashed test as error and the rest as not run", () => {
    const stdout = [
      "@@JUDGE:BEGIN:0@@",
      '@@JUDGE:RESULT:0:{"pass":true}@@',
      "@@JUDGE:BEGIN:1@@",
      "partial output then segfault",
    ].join("\n");

    const { results } = parseJudgeOutput(stdout, 3);
    expect(results[0].status).toBe("pass");
    expect(results[1].status).toBe("error");
    expect(results[2].status).toBe("not_run");
  });

  it("reports runtime errors with their message", () => {
    const stdout = [
      "@@JUDGE:BEGIN:0@@",
      '@@JUDGE:RESULT:0:{"pass":false,"error":"IndexError: list index out of range"}@@',
    ].join("\n");

    const { results } = parseJudgeOutput(stdout, 1);
    expect(results[0].status).toBe("error");
    expect(results[0].error).toContain("IndexError");
  });

  it("surfaces fatal harness failures", () => {
    const { fatal } = parseJudgeOutput(
      "@@JUDGE:FATAL:Your solution must define a function named two_sum@@",
      1,
    );
    expect(fatal).toContain("two_sum");
  });

  it("handles results even when user prints without trailing newline", () => {
    const stdout = [
      "@@JUDGE:BEGIN:0@@",
      'no newline@@JUDGE:RESULT:0:{"pass":true}@@',
    ].join("\n");

    const { results } = parseJudgeOutput(stdout, 1);
    expect(results[0].status).toBe("pass");
  });
});
