/**
 * Parser for the judge output protocol.
 *
 * Harnesses emit markers on stdout:
 *   @@JUDGE:BEGIN:<i>@@                — test i is about to run
 *   @@JUDGE:RESULT:<i>:<json>@@        — test i finished; payload on one line
 *   @@JUDGE:FATAL:<message>@@          — harness could not run at all
 *
 * Anything between BEGIN and RESULT that is not a marker is the user's own
 * debug output for that test and is captured so it can be shown in the UI.
 * A test with BEGIN but no RESULT crashed the process (segfault, output
 * limit, timeout); later tests never ran.
 */

import { canonical, type JudgeValue, type TestResult } from "./types";

const RESULT_RE = /@@JUDGE:RESULT:(\d+):(.*)@@\s*$/;
const BEGIN_RE = /@@JUDGE:BEGIN:(\d+)@@/;
const FATAL_RE = /@@JUDGE:FATAL:(.*)@@/;

interface RawPayload {
  pass?: boolean;
  got?: JudgeValue;
  expected?: JudgeValue;
  error?: string;
}

export interface ParsedRun {
  results: TestResult[];
  fatal?: string;
}

const MAX_CAPTURED_STDOUT = 4_000;

export function parseJudgeOutput(
  stdout: string,
  totalTests: number,
): ParsedRun {
  const byIndex = new Map<number, TestResult>();
  const captured = new Map<number, string[]>();
  let current = -1;
  let fatal: string | undefined;

  for (const line of stdout.split("\n")) {
    const fatalMatch = line.match(FATAL_RE);
    if (fatalMatch) {
      fatal = fatalMatch[1];
      continue;
    }

    const beginMatch = line.match(BEGIN_RE);
    if (beginMatch) {
      current = Number(beginMatch[1]);
      captured.set(current, []);
      continue;
    }

    const resultMatch = line.match(RESULT_RE);
    if (resultMatch) {
      const index = Number(resultMatch[1]);
      byIndex.set(index, toResult(index, resultMatch[2]));
      current = -1;
      continue;
    }

    if (current >= 0) {
      captured.get(current)?.push(line);
    }
  }

  const results: TestResult[] = [];
  for (let i = 0; i < totalTests; i++) {
    const result =
      byIndex.get(i) ??
      ({
        index: i,
        status: captured.has(i) ? "error" : "not_run",
        error: captured.has(i)
          ? "The program stopped before this test finished (crash, timeout, or output limit exceeded)."
          : undefined,
      } satisfies TestResult);

    const lines = captured.get(i);
    if (lines && lines.length > 0) {
      result.stdout = lines.join("\n").slice(0, MAX_CAPTURED_STDOUT);
    }
    results.push(result);
  }

  return { results, fatal };
}

function toResult(index: number, payloadText: string): TestResult {
  let payload: RawPayload;
  try {
    payload = JSON.parse(payloadText) as RawPayload;
  } catch {
    return {
      index,
      status: "error",
      error: "The judge could not read this test's result output.",
    };
  }

  if (payload.error) {
    return {
      index,
      status: "error",
      error: payload.error,
      expected:
        payload.expected !== undefined ? canonical(payload.expected) : undefined,
    };
  }

  return {
    index,
    status: payload.pass ? "pass" : "fail",
    got: payload.got !== undefined ? canonical(payload.got) : undefined,
    expected:
      payload.expected !== undefined ? canonical(payload.expected) : undefined,
  };
}
