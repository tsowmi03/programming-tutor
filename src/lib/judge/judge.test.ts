import { afterEach, describe, expect, it, vi } from "vitest";
import { execute, type ExecStage } from "./executors";
import { judgeCode, judgeScript, normalizeScriptOutput } from "./judge";
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

describe("judgeScript", () => {
  it("normalizes line endings and trailing whitespace", () => {
    expect(normalizeScriptOutput("one  \r\ntwo\r\n\r\n")).toBe("one\ntwo");
  });

  it("runs every case with isolated stdin and redacts hidden output", async () => {
    executeMock
      .mockResolvedValueOnce({ run: stage({ stdout: "Hello, Mia!\n" }) })
      .mockResolvedValueOnce({ run: stage({ stdout: "wrong\n" }) });

    const outcome = await judgeScript({
      language: "python",
      code: "print(input())",
      tests: [
        { input: "Mia\n", expectedOutput: "Hello, Mia!" },
        { input: "Sam\n", expectedOutput: "Hello, Sam!", hidden: true },
      ],
    });

    expect(executeMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ stdin: "Mia\n" }),
    );
    expect(executeMock).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ stdin: "Sam\n" }),
    );
    expect(outcome.status).toBe("failed");
    expect(outcome.results[0]).toMatchObject({ status: "pass" });
    expect(outcome.results[1]).toMatchObject({ status: "fail", hidden: true });
    expect(outcome.results[1].got).toBeUndefined();
    expect(outcome.results[1].expected).toBeUndefined();
  });

  it("reports a script runtime error and leaves later cases not run", async () => {
    executeMock.mockResolvedValueOnce({
      run: stage({ code: 1, stderr: "ValueError: bad input" }),
    });
    const outcome = await judgeScript({
      language: "python",
      code: "raise ValueError('bad input')",
      tests: [
        { input: "", expectedOutput: "ok" },
        { input: "", expectedOutput: "ok" },
      ],
    });
    expect(outcome.status).toBe("error");
    expect(outcome.results[0]).toMatchObject({
      status: "error",
      error: "ValueError: bad input",
    });
    expect(outcome.results[1].status).toBe("not_run");
  });
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
    expect(outcome.results[1].input).toBeUndefined();
    expect(outcome.results[1].got).toBeUndefined();
    expect(outcome.results[1].expected).toBeUndefined();
    expect(outcome.results[1].stdout).toBeUndefined();
  });

  it("reveals hidden result data when requested", async () => {
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
      revealHiddenTests: true,
    });

    expect(outcome.results[1]).toMatchObject({
      status: "fail",
      hidden: true,
      input: [2],
      got: "99",
      expected: "2",
      stdout: "hidden input: 2",
    });
  });
});
