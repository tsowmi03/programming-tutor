/**
 * Runs every reference solution of every coding problem through the judge in
 * every supported language. All must pass — this validates the problems'
 * test cases, the reference solutions, and the harness generators in one go.
 *
 * Usage: npx tsx scripts/verify-solutions.ts [slug]
 */

import { ALL_PROBLEMS } from "../src/content";
import { LANGUAGE_IDS } from "../src/lib/judge/languages";
import { judgeCode } from "../src/lib/judge/judge";

async function main() {
  const only = process.argv[2];
  const codeProblems = ALL_PROBLEMS.filter(
    (p) => p.type === "code" && (!only || p.slug === only),
  );

  let failures = 0;
  let runs = 0;
  for (const problem of codeProblems) {
    if (problem.type !== "code") continue;
    for (const language of LANGUAGE_IDS) {
      const code = problem.solutions[language];
      // Newer languages are backfilled per problem and may be missing.
      if (code == null) continue;
      runs++;
      const started = Date.now();
      try {
        const outcome = await judgeCode({
          language,
          code,
          signature: problem.signature,
          tests: problem.testCases,
        });
        const ok = outcome.status === "passed";
        if (!ok) failures++;
        console.log(
          `${ok ? "✅" : "❌"} ${problem.slug} [${language}] ${outcome.status} ` +
            `(${outcome.passedCount}/${outcome.totalCount}) ${Date.now() - started}ms`,
        );
        if (!ok) {
          for (const r of outcome.results) {
            if (r.status !== "pass") {
              console.log(
                `     test ${r.index}: ${r.status} got=${r.got} expected=${r.expected} ${r.error ?? ""}`,
              );
            }
          }
          if (outcome.compileOutput) console.log(outcome.compileOutput);
        }
      } catch (err) {
        failures++;
        console.log(`❌ ${problem.slug} [${language}] threw: ${err}`);
      }
    }
  }

  console.log(
    failures === 0
      ? `\nAll ${runs} solution runs passed`
      : `\n${failures} runs failed`,
  );
  process.exit(failures === 0 ? 0 : 1);
}

main();
