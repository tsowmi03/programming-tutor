/**
 * Runs every course exercise's reference solution through the judge in the
 * course's language. All must pass — this validates the exercises' test cases,
 * the reference solutions, and the harness in one go.
 *
 * Usage: npx tsx scripts/verify-courses.ts [courseSlug]
 */

import { ALL_COURSES } from "../src/content/courses";
import { judgeCode, judgeScript } from "../src/lib/judge/judge";

async function main() {
  const only = process.argv[2];
  const courses = ALL_COURSES.filter((c) => !only || c.slug === only);

  let failures = 0;
  let runs = 0;
  for (const course of courses) {
    for (const mod of course.modules) {
      for (const lesson of mod.lessons) {
        for (const block of lesson.blocks) {
          if (block.kind !== "exercise") continue;
          const ex = block.exercise;
          runs++;
          const id = `${course.slug}/${lesson.slug}/${ex.id} [${course.language}]`;
          const started = Date.now();
          try {
            const outcome =
              ex.mode === "script"
                ? await judgeScript({
                    language: course.language,
                    code: ex.solution,
                    tests: ex.tests,
                  })
                : await judgeCode({
                    language: course.language,
                    code: ex.solution,
                    signature: ex.signature,
                    tests: ex.tests,
                  });
            const ok = outcome.status === "passed";
            if (!ok) failures++;
            console.log(
              `${ok ? "✅" : "❌"} ${id} ${outcome.status} ` +
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
            console.log(`❌ ${id} threw: ${err}`);
          }
        }
      }
    }
  }

  console.log(
    failures === 0
      ? `\nAll ${runs} course exercise solutions passed`
      : `\n${failures} of ${runs} runs failed`,
  );
  process.exit(failures === 0 ? 0 : 1);
}

main();
