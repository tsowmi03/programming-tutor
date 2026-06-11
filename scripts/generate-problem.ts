/**
 * Generate ONE problem and write it to src/content/generated.
 *
 * Usage:
 *   npx tsx scripts/generate-problem.ts \
 *     --category arrays-hashing --difficulty easy --topic "prefix sums" [--type code] \
 *     [--slug my-slug] [--model claude-opus-4-8] [--no-verify]
 *
 * After generating, run: npx tsx scripts/build-generated-index.ts
 */

import { readdirSync } from "node:fs";
import { generateProblem, modelForDifficulty } from "./lib/generate";
import { CATEGORY_IDS, DIFFICULTIES, type ProblemSpec } from "./lib/spec";
import {
  GENERATED_DIR,
  createClient,
  produceProblem,
  writeProblemFile,
} from "./lib/pipeline";

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 ? process.argv[i + 1] : undefined;
}
const flag = (name: string) => process.argv.includes(`--${name}`);

function fail(msg: string): never {
  console.error(`Error: ${msg}`);
  process.exit(1);
}

async function main() {
  const category = arg("category");
  const difficulty = arg("difficulty");
  const topic = arg("topic");
  const type = (arg("type") ?? "code") as ProblemSpec["type"];
  const model = arg("model") ?? modelForDifficulty(difficulty ?? "");
  const slug = arg("slug");

  if (!category || !CATEGORY_IDS.includes(category as never))
    fail(`--category must be one of: ${CATEGORY_IDS.join(", ")}`);
  if (!difficulty || !DIFFICULTIES.includes(difficulty as never))
    fail(`--difficulty must be one of: ${DIFFICULTIES.join(", ")}`);
  if (!topic) fail("--topic is required");
  if (type !== "code" && type !== "explanation")
    fail("--type must be code or explanation");

  const spec: ProblemSpec = {
    type,
    category: category as ProblemSpec["category"],
    difficulty: difficulty as ProblemSpec["difficulty"],
    topic,
    slug: slug ?? undefined,
  };

  console.log(`Generating ${type} problem: "${topic}" (${category}/${difficulty})...`);

  const client = createClient();
  const produced = flag("no-verify")
    ? await generateProblem({ client, spec, model }).then((r) => ({
        status: "ok" as const,
        problem: r.problem,
        report: "",
        attempts: 1,
      }))
    : await produceProblem(client, spec, model);

  if (produced.status === "failed") {
    console.error(
      `\n❌ Verification failed after ${produced.attempts} attempt(s). NOT writing to the seeded set.\n${produced.report}`,
    );
    const path = writeProblemFile(
      produced.problem,
      999,
      `${GENERATED_DIR}/_review`,
    );
    console.error(`Wrote unverified draft to ${path} for manual review.`);
    process.exit(1);
  }

  const existing = readdirSync(GENERATED_DIR).filter(
    (f) => f.endsWith(".ts") && f !== "index.ts",
  ).length;
  const path = writeProblemFile(produced.problem, 1000 + existing);

  console.log(`\n✅ ${produced.problem.slug} — ${produced.problem.title}`);
  console.log(`   ${path}`);
  console.log(
    `\nNext: npx tsx scripts/build-generated-index.ts && npm run db:seed`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
