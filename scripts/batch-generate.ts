/**
 * Generate problems in bulk from a topic manifest (default scripts/topics.json).
 *
 * Usage:
 *   npx tsx scripts/batch-generate.ts [options]
 *     --topics <file>        manifest path (default scripts/topics.json)
 *     --category <id>        only this category
 *     --difficulty <id>      only this difficulty
 *     --type code|explanation
 *     --limit <n>            stop after n problems
 *     --concurrency <n>      parallel workers (default 3)
 *     --model <id>           default claude-opus-4-8 (use claude-sonnet-4-6 to cut cost)
 *     --force                regenerate even if the slug already exists
 *
 * Idempotent: a topic whose slug already exists on disk is skipped unless
 * --force. Verified problems land in src/content/generated/; ones that fail
 * verification (after one corrective retry) land in generated/_review/ and are
 * NOT seeded. Rebuilds the generated index at the end.
 */

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  CATEGORY_IDS,
  DIFFICULTIES,
  slugify,
  type ProblemSpec,
} from "./lib/spec";
import { modelForDifficulty } from "./lib/generate";
import {
  GENERATED_DIR,
  createClient,
  produceProblem,
  writeProblemFile,
} from "./lib/pipeline";

interface TopicEntry {
  category: string;
  difficulty: string;
  topic: string;
  type?: "code" | "explanation";
  slug?: string;
}

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 ? process.argv[i + 1] : undefined;
}
const flag = (name: string) => process.argv.includes(`--${name}`);

function loadManifest(path: string): TopicEntry[] {
  const entries = JSON.parse(readFileSync(path, "utf8")) as TopicEntry[];
  for (const e of entries) {
    if (!CATEGORY_IDS.includes(e.category as never))
      throw new Error(`Bad category "${e.category}" in manifest`);
    if (!DIFFICULTIES.includes(e.difficulty as never))
      throw new Error(`Bad difficulty "${e.difficulty}" in manifest`);
  }
  return entries;
}

/** Run an async worker over items with bounded concurrency. */
async function pool<T>(
  items: T[],
  limit: number,
  worker: (item: T, index: number) => Promise<void>,
): Promise<void> {
  let next = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const i = next++;
      await worker(items[i], i);
    }
  });
  await Promise.all(runners);
}

async function main() {
  const manifestPath = arg("topics") ?? join(process.cwd(), "scripts", "topics.json");
  const modelOverride = arg("model"); // when set, force this model for all difficulties
  const concurrency = Number(arg("concurrency") ?? "3");
  const limit = arg("limit") ? Number(arg("limit")) : Infinity;
  const onlyCategory = arg("category");
  const onlyDifficulty = arg("difficulty");
  const onlyType = arg("type");
  const force = flag("force");

  let entries = loadManifest(manifestPath);
  if (onlyCategory) entries = entries.filter((e) => e.category === onlyCategory);
  if (onlyDifficulty) entries = entries.filter((e) => e.difficulty === onlyDifficulty);
  if (onlyType) entries = entries.filter((e) => (e.type ?? "code") === onlyType);

  // Resolve slugs and skip ones already on disk (unless --force).
  const work = entries
    .map((e, idx) => {
      const slug = e.slug ?? slugify(e.topic);
      return { e, slug, order: 1000 + idx };
    })
    .filter(({ slug }) => {
      if (force) return true;
      return !existsSync(join(GENERATED_DIR, `${slug}.ts`));
    })
    .slice(0, limit);

  if (work.length === 0) {
    console.log("Nothing to generate (all topics already exist — use --force to regenerate).");
    return;
  }

  console.log(
    `Generating ${work.length} problem(s) at concurrency ${concurrency} ` +
      `(model: ${modelOverride ?? "sonnet for easy/medium, opus for hard"})...\n`,
  );

  const client = createClient();
  let ok = 0;
  let failed = 0;
  const failures: string[] = [];

  await pool(work, concurrency, async ({ e, slug, order }) => {
    const spec: ProblemSpec = {
      type: e.type ?? "code",
      category: e.category as ProblemSpec["category"],
      difficulty: e.difficulty as ProblemSpec["difficulty"],
      topic: e.topic,
      slug,
    };
    const model = modelOverride ?? modelForDifficulty(e.difficulty);
    const label = `${slug} (${e.category}/${e.difficulty})`;
    try {
      const produced = await produceProblem(client, spec, model);
      if (produced.status === "ok") {
        writeProblemFile(produced.problem, order);
        ok++;
        console.log(`✅ ${label}`);
      } else {
        writeProblemFile(produced.problem, 999, join(GENERATED_DIR, "_review"));
        failed++;
        failures.push(`${label}: verification failed\n${produced.report}`);
        console.log(`❌ ${label} — failed verification (draft in _review/)`);
      }
    } catch (err) {
      failed++;
      failures.push(`${label}: ${err instanceof Error ? err.message : String(err)}`);
      console.log(`❌ ${label} — ${err instanceof Error ? err.message : err}`);
    }
  });

  console.log(`\nDone: ${ok} ok, ${failed} failed.`);
  if (failures.length) {
    console.log(`\nFailures:\n${failures.join("\n\n")}`);
  }

  // Rebuild the index so new problems are importable.
  console.log("\nRebuilding generated index...");
  execFileSync("npx", ["tsx", join("scripts", "build-generated-index.ts")], {
    stdio: "inherit",
  });
  console.log("\nNext: npm run db:seed  (to load the new problems into the DB)");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
