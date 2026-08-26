/**
 * Judge orchestrator: builds the language-specific harness around the user's
 * code, executes it via the configured executor (local toolchains or a
 * Piston sandbox), and converts the output into a JudgeOutcome.
 */

import { LANGUAGES, type LanguageId } from "./languages";
import { execute, type ExecStage } from "./executors";
import { parseJudgeOutput } from "./parse";
import { buildPythonHarness } from "./harness/python";
import { buildJavaScriptHarness } from "./harness/javascript";
import { buildTypeScriptHarness } from "./harness/typescript";
import { buildJavaHarness } from "./harness/java";
import { buildCSharpHarness } from "./harness/csharp";
import { buildCHarness } from "./harness/c";
import { buildCppHarness } from "./harness/cpp";
import {
  canonical,
  type FunctionSignature,
  type JudgeOutcome,
  type TestCase,
  type TestResult,
  type ScriptTestCase,
} from "./types";

export function buildHarness(
  language: LanguageId,
  userCode: string,
  signature: FunctionSignature,
  tests: TestCase[],
): string {
  switch (language) {
    case "python":
      return buildPythonHarness(userCode, signature, tests);
    case "javascript":
      return buildJavaScriptHarness(userCode, signature, tests);
    case "typescript":
      return buildTypeScriptHarness(userCode, signature, tests);
    case "java":
      return buildJavaHarness(userCode, signature, tests);
    case "csharp":
      return buildCSharpHarness(userCode, signature, tests);
    case "c":
      return buildCHarness(userCode, signature, tests);
    case "cpp":
      return buildCppHarness(userCode, signature, tests);
  }
}

export async function judgeCode(params: {
  language: LanguageId;
  code: string;
  signature: FunctionSignature;
  tests: TestCase[];
  revealHiddenTests?: boolean;
}): Promise<JudgeOutcome> {
  const { language, code, signature, tests, revealHiddenTests = false } = params;
  const info = LANGUAGES[language];
  const source = buildHarness(language, code, signature, tests);

  const response = await execute({
    language,
    files: [{ name: info.fileName, content: source }],
  });

  // A non-zero compile stage means the user's code didn't build.
  if (response.compile && response.compile.code !== 0) {
    return {
      status: "compile_error",
      results: [],
      compileOutput: trimOutput(
        response.compile.stderr || response.compile.output,
      ),
      passedCount: 0,
      totalCount: tests.length,
    };
  }

  const { results, fatal } = parseJudgeOutput(response.run.stdout, tests.length);

  if (fatal) {
    decorateResults(results, tests, revealHiddenTests);
    return {
      status: "error",
      results,
      compileOutput: fatal,
      passedCount: 0,
      totalCount: tests.length,
    };
  }

  annotateCrash(results, response.run);
  decorateResults(results, tests, revealHiddenTests);

  const passedCount = results.filter((r) => r.status === "pass").length;
  const hasError = results.some(
    (r) => r.status === "error" || r.status === "not_run",
  );

  return {
    status:
      passedCount === tests.length
        ? "passed"
        : hasError
          ? "error"
          : "failed",
    results,
    passedCount,
    totalCount: tests.length,
  };
}

export function normalizeScriptOutput(value: string): string {
  return value
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/g, ""))
    .join("\n")
    .replace(/\n+$/g, "");
}

/** Judge a complete program once per case so stdin and process state are isolated. */
export async function judgeScript(params: {
  language: LanguageId;
  code: string;
  tests: ScriptTestCase[];
  revealHiddenTests?: boolean;
}): Promise<JudgeOutcome> {
  const { language, code, tests, revealHiddenTests = false } = params;
  const info = LANGUAGES[language];
  const results: TestResult[] = [];
  let compileOutput: string | undefined;

  for (let index = 0; index < tests.length; index += 1) {
    const test = tests[index];
    const response = await execute({
      language,
      files: [{ name: info.fileName, content: code }],
      stdin: test.input,
    });

    if (response.compile && response.compile.code !== 0) {
      compileOutput = trimOutput(
        response.compile.stderr || response.compile.output,
      );
      break;
    }

    const got = normalizeScriptOutput(response.run.stdout);
    const expected = normalizeScriptOutput(test.expectedOutput);
    const crashed = response.run.code !== 0 || response.run.signal != null;
    const result: TestResult = {
      index,
      status: crashed ? "error" : got === expected ? "pass" : "fail",
      got,
      expected,
      hidden: test.hidden,
    };
    if (crashed) {
      result.error = trimOutput(
        response.run.stderr || response.run.message || "The program stopped unexpectedly.",
      );
      annotateCrash([result], response.run);
    }
    if (test.hidden && !revealHiddenTests) {
      delete result.got;
      delete result.expected;
    } else {
      result.input = [test.input];
    }
    results.push(result);
    if (crashed) break;
  }

  if (compileOutput) {
    return {
      status: "compile_error",
      results: [],
      compileOutput,
      passedCount: 0,
      totalCount: tests.length,
    };
  }

  while (results.length < tests.length) {
    results.push({ index: results.length, status: "not_run" });
  }
  const passedCount = results.filter((result) => result.status === "pass").length;
  const hasError = results.some(
    (result) => result.status === "error" || result.status === "not_run",
  );
  return {
    status:
      passedCount === tests.length ? "passed" : hasError ? "error" : "failed",
    results,
    passedCount,
    totalCount: tests.length,
  };
}

/** Attach a specific message when the executor stopped the whole process. */
function annotateCrash(
  results: TestResult[],
  run: ExecStage,
) {
  const crashed =
    results.find((r) => r.status === "error" && !r.got) ??
    results.find((r) => r.status === "not_run");
  if (!crashed) return;

  crashed.status = "error";

  if (run.status === "TO") {
    crashed.error =
      "Time limit exceeded — the program did not finish within the allowed time.";
  } else if (run.status === "OL") {
    crashed.error =
      "Output limit exceeded — the program produced more standard output than the judge allows.";
  } else if (run.status === "EL") {
    crashed.error =
      "Error output limit exceeded — the program produced more diagnostic output than the judge allows.";
  } else if (run.status === "XX") {
    crashed.error =
      "The code execution sandbox encountered an internal error. Please try again.";
  } else if (run.signal === "SIGKILL") {
    crashed.error =
      "The program was killed by the sandbox, possibly after exceeding a resource limit.";
  } else if (run.signal === "SIGSEGV") {
    crashed.error =
      "Segmentation fault — the program accessed invalid memory during this test.";
  } else if (run.message && crashed.error?.startsWith("The program stopped")) {
    crashed.error = trimOutput(run.message);
  } else if (run.stderr && crashed.error?.startsWith("The program stopped")) {
    crashed.error += `\n${trimOutput(run.stderr)}`;
  }
}

function decorateResults(
  results: TestResult[],
  tests: TestCase[],
  revealHiddenTests = false,
) {
  for (const result of results) {
    const test = tests[result.index];
    if (!test) continue;

    if (test.hidden) {
      result.hidden = true;
      if (!revealHiddenTests) {
        delete result.input;
        delete result.expected;
        delete result.got;
        delete result.stdout;
        continue;
      }

      result.input = test.input;
      result.expected = canonical(test.expected);
      if (result.status === "pass" && result.got === undefined) {
        result.got = result.expected;
      }
      continue;
    }

    if (result.status !== "not_run") {
      result.expected = canonical(test.expected);
      if (result.status === "pass" && result.got === undefined) {
        result.got = result.expected;
      }
    }
  }
}

function trimOutput(text: string, max = 4_000): string {
  return text.length > max ? `${text.slice(0, max)}\n… (truncated)` : text;
}
