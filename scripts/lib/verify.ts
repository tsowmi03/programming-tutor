/**
 * Verifies a generated code problem by running every reference solution
 * through the real judge (local toolchains) against its own test cases. This
 * is the same guarantee scripts/verify-solutions.ts gives the curated
 * problems: if a solution doesn't pass, the problem is broken.
 */

import { LANGUAGE_IDS } from "../../src/lib/judge/languages";
import { judgeCode } from "../../src/lib/judge/judge";
import type { FunctionSignature, TestCase } from "../../src/lib/judge/types";
import type { GeneratedProblem } from "./spec";

export interface VerifyResult {
  ok: boolean;
  /** Human-readable failure summary, suitable for a corrective retry prompt. */
  report: string;
}

export async function verifyProblem(
  problem: GeneratedProblem,
): Promise<VerifyResult> {
  if (problem.type !== "code") return { ok: true, report: "" };

  const lines: string[] = [];
  let ok = true;

  for (const language of LANGUAGE_IDS) {
    try {
      const outcome = await judgeCode({
        language,
        code: problem.solutions[language],
        // The schema validated structure and types; values are checked by
        // actually running them through the judge below.
        signature: problem.signature as FunctionSignature,
        tests: problem.testCases as TestCase[],
      });
      if (outcome.status !== "passed") {
        ok = false;
        lines.push(
          `[${language}] ${outcome.status} (${outcome.passedCount}/${outcome.totalCount})`,
        );
        for (const r of outcome.results) {
          if (r.status !== "pass") {
            lines.push(
              `  test ${r.index}: ${r.status} got=${r.got} expected=${r.expected}${r.error ? ` error=${r.error}` : ""}`,
            );
          }
        }
        if (outcome.compileOutput) {
          lines.push(`  compile: ${outcome.compileOutput.slice(0, 500)}`);
        }
      }
    } catch (err) {
      ok = false;
      lines.push(`[${language}] threw: ${err}`);
    }
  }

  return { ok, report: lines.join("\n") };
}
