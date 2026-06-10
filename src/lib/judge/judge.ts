/**
 * Judge orchestrator: builds the language-specific harness around the user's
 * code, executes it via the configured executor (local toolchains or a
 * Piston sandbox), and converts the output into a JudgeOutcome.
 */

import { LANGUAGES, type LanguageId } from "./languages";
import { execute } from "./executors";
import { parseJudgeOutput } from "./parse";
import { buildPythonHarness } from "./harness/python";
import { buildJavaScriptHarness } from "./harness/javascript";
import { buildJavaHarness } from "./harness/java";
import { buildCHarness } from "./harness/c";
import type {
  FunctionSignature,
  JudgeOutcome,
  TestCase,
  TestResult,
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
    case "java":
      return buildJavaHarness(userCode, signature, tests);
    case "c":
      return buildCHarness(userCode, signature, tests);
  }
}

export async function judgeCode(params: {
  language: LanguageId;
  code: string;
  signature: FunctionSignature;
  tests: TestCase[];
}): Promise<JudgeOutcome> {
  const { language, code, signature, tests } = params;
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

  // Mark hidden tests so the UI can redact their data.
  for (const result of results) {
    if (tests[result.index]?.hidden) result.hidden = true;
  }

  if (fatal) {
    return {
      status: "error",
      results,
      compileOutput: fatal,
      passedCount: 0,
      totalCount: tests.length,
    };
  }

  annotateCrash(results, response.run);

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

/** Attach a more specific message when the whole process was killed. */
function annotateCrash(
  results: TestResult[],
  run: { signal: string | null; stderr: string },
) {
  const crashed = results.find((r) => r.status === "error" && !r.got);
  if (!crashed) return;

  if (run.signal === "SIGKILL") {
    crashed.error =
      "Time or memory limit exceeded — the program was killed. Check for infinite loops or excessive memory use.";
  } else if (run.signal === "SIGSEGV") {
    crashed.error =
      "Segmentation fault — the program accessed invalid memory during this test.";
  } else if (run.stderr && crashed.error?.startsWith("The program stopped")) {
    crashed.error += `\n${trimOutput(run.stderr)}`;
  }
}

function trimOutput(text: string, max = 4_000): string {
  return text.length > max ? `${text.slice(0, max)}\n… (truncated)` : text;
}
