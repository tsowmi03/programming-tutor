import { afterEach, describe, expect, it, vi } from "vitest";
import { execute, type ExecStage } from "./executors";
import { judgeCode } from "./judge";
import type { FunctionSignature, TestCase } from "./types";

vi.mock("./executors", () => ({
  execute: vi.fn(),
}));

const executeMock = vi.mocked(execute);

const signature: FunctionSignature = {
  name: "answer",
  params: [{ name: "n", type: "int" }],
  returns: "int",
};

function stage(overrides: Partial<ExecStage> = {}): ExecStage {
  return {
    stdout: "",
    stderr: "",
    output: "",
    code: 0,
    signal: null,
    ...overrides,
  };
}

afterEach(() => {
  executeMock.mockReset();
});

describe("judgeCode", () => {
  it("uses Piston's output-limit status instead of misreporting SIGKILL", async () => {
    executeMock.mockResolvedValue({
      run: stage({
        stdout: "",
        code: null,
        signal: "SIGKILL",
        status: "OL",
        message: "stdout length exceeded",
      }),
    });

    const outcome = await judgeCode({
      language: "python",
      code: "def answer(n): return n",
      signature,
      tests: [{ input: [1], expected: 1 }],
    });

    expect(outcome.status).toBe("error");
    expect(outcome.results[0]).toMatchObject({
      status: "error",
      expected: "1",
      error:
        "Output limit exceeded — the program produced more standard output than the judge allows.",
    });
  });

  it("reconstructs visible values and redacts hidden result data", async () => {
    executeMock.mockResolvedValue({
      run: stage({
        stdout: [
          "@@JUDGE:BEGIN:0@@",
          '@@JUDGE:RESULT:0:{"pass":true}@@',
          "@@JUDGE:BEGIN:1@@",
          "hidden input: 2",
          '@@JUDGE:RESULT:1:{"pass":false,"got":99}@@',
        ].join("\n"),
      }),
    });

    const tests: TestCase[] = [
      { input: [1], expected: 1 },
      { input: [2], expected: 2, hidden: true },
    ];
    const outcome = await judgeCode({
      language: "python",
      code: "def answer(n): return n",
      signature,
      tests,
    });

    expect(outcome.results[0]).toMatchObject({
      status: "pass",
      got: "1",
      expected: "1",
    });
    expect(outcome.results[1]).toMatchObject({
      status: "fail",
      hidden: true,
    });
    expect(outcome.results[1].got).toBeUndefined();
    expect(outcome.results[1].expected).toBeUndefined();
    expect(outcome.results[1].stdout).toBeUndefined();
  });
});
