/**
 * Backfills TypeScript, C#, and C++ starter code and reference solutions onto
 * existing code problems that predate those languages.
 *
 * For each problem missing any of the target languages, Claude ports the
 * existing (verified) reference solutions, the new solutions are run through
 * the real judge against the problem's own test cases (one corrective retry
 * on failure, same contract as generation), and the content module is
 * rewritten in place — default-export style for src/content/generated,
 * named-export style for the curated src/content/problems.
 *
 * Usage:
 *   npx tsx scripts/backfill-languages.ts [--only <slug>] [--limit N] [--concurrency N] [--dry-run]
 *
 * Afterwards: npm run db:seed  (and redeploy) to push the new content live.
 */

import { existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { ALL_PROBLEMS } from "../src/content";
import type { CodeProblemDef } from "../src/content/types";
import { judgeCode } from "../src/lib/judge/judge";
import {
  LANGUAGE_IDS,
  type LanguageCodeMap,
  type LanguageId,
} from "../src/lib/judge/languages";
import { createClient, GENERATED_DIR } from "./lib/pipeline";
import { renderProblemModule } from "./lib/render";
import { exportName } from "./lib/spec";

const TARGET_LANGUAGES = ["typescript", "csharp", "cpp"] as const;
type TargetLanguage = (typeof TARGET_LANGUAGES)[number];

const CURATED_DIR = join(process.cwd(), "src", "content", "problems");
const MODEL = "claude-sonnet-4-6";

const targetMap = z.object({
  typescript: z.string().min(1),
  csharp: z.string().min(1),
  cpp: z.string().min(1),
});

const additionSchema = z.object({
  starterCode: targetMap,
  solutions: targetMap,
});

type Addition = z.infer<typeof additionSchema>;

const SYSTEM_PROMPT = `You are an expert polyglot engineer for the CodeClimb platform. You are given an existing, verified coding problem with reference solutions in Python, JavaScript, Java, and C. Your job is to add starter code and a correct reference solution for three more languages: TypeScript, C#, and C++.

Output ONE JSON object wrapped in <addition></addition> tags. No prose outside the tags:

<addition>
{
  "starterCode": { "typescript": "...", "csharp": "...", "cpp": "..." },
  "solutions": { "typescript": "...", "csharp": "...", "cpp": "..." }
}
</addition>

The judge depends on these conventions:

- typescript: a plain standalone typed function with the exact same camelCase name as the JavaScript solution (e.g. "function twoSum(nums: number[], target: number): number[]"). No imports/exports. Judge types map to: number, boolean, string, number[], string[], number[][]. Modern runtime features (Map, Set, etc.) are fine.
- csharp: "public class Solution" with a public PascalCase method (twoSum -> TwoSum). Judge types map to: int, bool, string, int[], string[], int[][] (jagged arrays). Include any using directives YOUR code needs at the top (e.g. "using System.Collections.Generic;") — nothing is pre-imported. Target C# 7 (mono): no top-level statements, no records, and do NOT define Main.
- cpp: "class Solution" with a single public method, LeetCode style. Judge types map to: int, bool, string, vector<int>, vector<string>, vector<vector<int>>. Array parameters arrive as lvalue references or values (e.g. "vector<int>& nums"). Common standard headers and "using namespace std;" are pre-included by the judge; do NOT write includes or a main function.

Rules:
1. Port the logic of the existing solutions faithfully — same algorithm where the language allows, idiomatic to each language. The Java solution is usually the best template for C#, the JavaScript solution for TypeScript, and the Java or C solution for C++.
2. Every solution must return exactly the declared "expected" value for every test case. Double-check edge cases (empty arrays, single elements, negatives) before emitting.
3. starterCode is a stub matching the existing starter style: correct signature, a TODO comment, a trivial default return. Mirror the wording of the provided starter stubs.
4. Match the formatting conventions of the existing code: 4-space indent for C#, Java-style braces, etc.`;

function buildUserPrompt(problem: CodeProblemDef): string {
  return [
    `Problem: ${problem.title}`,
    "",
    "Description (markdown):",
    problem.description,
    "",
    `Signature: ${JSON.stringify(problem.signature)}`,
    "",
    `Test cases: ${JSON.stringify(
      problem.testCases.map((t) => ({ input: t.input, expected: t.expected })),
    )}`,
    "",
    "Existing starter code (mirror this style for the new languages):",
    `--- python ---\n${problem.starterCode.python}`,
    `--- javascript ---\n${problem.starterCode.javascript}`,
    `--- java ---\n${problem.starterCode.java}`,
    "",
    "Existing reference solutions (port these):",
    `--- python ---\n${problem.solutions.python}`,
    `--- javascript ---\n${problem.solutions.javascript}`,
    `--- java ---\n${problem.solutions.java}`,
    `--- c ---\n${problem.solutions.c}`,
    "",
    "Return only the <addition>...</addition> JSON.",
  ].join("\n");
}

function extractJson(text: string): string {
  const m = text.match(/<addition>([\s\S]*?)<\/addition>/);
  if (m) return m[1].trim();
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end < start) {
    throw new Error("No <addition> JSON block found in model output.");
  }
  return text.slice(start, end + 1);
}

async function requestAddition(
  client: Anthropic,
  problem: CodeProblemDef,
  fixContext?: { previousJson: string; failures: string },
): Promise<{ addition: Addition; json: string }> {
  const messages: Anthropic.MessageParam[] = [
    { role: "user", content: buildUserPrompt(problem) },
  ];
  if (fixContext) {
    messages.push(
      {
        role: "assistant",
        content: `<addition>${fixContext.previousJson}</addition>`,
      },
      {
        role: "user",
        content: `Those ports FAILED verification — they did not pass the problem's test cases:\n\n${fixContext.failures}\n\nFix the bug and re-emit the COMPLETE corrected <addition>...</addition> JSON (all three languages, starterCode and solutions).`,
      },
    );
  }

  const stream = client.messages.stream({
    model: MODEL,
    max_tokens: 8000,
    system: SYSTEM_PROMPT,
    messages,
  });
  const message = await stream.finalMessage();
  const text = message.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("");

  const json = extractJson(text);
  const parsed = additionSchema.safeParse(JSON.parse(json));
  if (!parsed.success) {
    throw new Error(
      `Addition failed validation:\n${parsed.error.issues
        .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
        .join("\n")}`,
    );
  }
  return { addition: parsed.data, json };
}

/** Runs the new solutions through the real judge. Empty report = all passed. */
async function verifyAddition(
  problem: CodeProblemDef,
  addition: Addition,
): Promise<string> {
  const lines: string[] = [];
  for (const language of TARGET_LANGUAGES) {
    try {
      const outcome = await judgeCode({
        language,
        code: addition.solutions[language],
        signature: problem.signature,
        tests: problem.testCases,
      });
      if (outcome.status !== "passed") {
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
      lines.push(`[${language}] threw: ${err}`);
    }
  }
  return lines.join("\n");
}

/** Rebuild a code map in canonical LANGUAGE_IDS order with additions merged. */
function mergeCodeMap(
  existing: LanguageCodeMap,
  additions: Record<TargetLanguage, string>,
): LanguageCodeMap {
  const merged: Partial<Record<LanguageId, string>> = {
    ...existing,
    ...additions,
  };
  const ordered: Partial<Record<LanguageId, string>> = {};
  for (const id of LANGUAGE_IDS) {
    if (merged[id] != null) ordered[id] = merged[id];
  }
  return ordered as LanguageCodeMap;
}

/** Generated problems are default exports; curated ones are named exports. */
function locateModule(slug: string): { path: string; exportAs?: string } {
  const generated = join(GENERATED_DIR, `${slug}.ts`);
  if (existsSync(generated)) return { path: generated };
  const curated = join(CURATED_DIR, `${slug}.ts`);
  if (existsSync(curated)) return { path: curated, exportAs: exportName(slug) };
  throw new Error(`No content module found for slug "${slug}"`);
}

interface Outcome {
  slug: string;
  status: "ok" | "failed" | "skipped";
  attempts: number;
  report?: string;
}

async function backfillProblem(
  client: Anthropic,
  problem: CodeProblemDef,
  dryRun: boolean,
): Promise<Outcome> {
  const { path, exportAs } = locateModule(problem.slug);

  let fixContext: { previousJson: string; failures: string } | undefined;
  for (let attempt = 1; attempt <= 2; attempt++) {
    const { addition, json } = await requestAddition(
      client,
      problem,
      fixContext,
    );
    const report = await verifyAddition(problem, addition);
    if (!report) {
      if (!dryRun) {
        const def: CodeProblemDef = {
          ...problem,
          starterCode: mergeCodeMap(problem.starterCode, addition.starterCode),
          solutions: mergeCodeMap(problem.solutions, addition.solutions),
        };
        writeFileSync(path, renderProblemModule(def, exportAs));
      }
      return { slug: problem.slug, status: "ok", attempts: attempt };
    }
    fixContext = { previousJson: json, failures: report };
  }
  return {
    slug: problem.slug,
    status: "failed",
    attempts: 2,
    report: fixContext?.failures,
  };
}

async function runPool<T>(
  items: T[],
  concurrency: number,
  worker: (item: T) => Promise<void>,
): Promise<void> {
  let next = 0;
  const lanes = Array.from(
    { length: Math.min(concurrency, items.length) },
    async () => {
      while (next < items.length) {
        const item = items[next++];
        await worker(item);
      }
    },
  );
  await Promise.all(lanes);
}

function parseArgs() {
  const args = process.argv.slice(2);
  const get = (flag: string) => {
    const i = args.indexOf(flag);
    return i !== -1 ? args[i + 1] : undefined;
  };
  return {
    only: get("--only"),
    limit: get("--limit") ? Number(get("--limit")) : Infinity,
    concurrency: get("--concurrency") ? Number(get("--concurrency")) : 4,
    dryRun: args.includes("--dry-run"),
  };
}

async function main() {
  const { only, limit, concurrency, dryRun } = parseArgs();
  const client = createClient();

  const pending = ALL_PROBLEMS.filter(
    (p): p is CodeProblemDef =>
      p.type === "code" &&
      (!only || p.slug === only) &&
      TARGET_LANGUAGES.some(
        (l) => p.solutions[l] == null || p.starterCode[l] == null,
      ),
  ).slice(0, limit);

  if (pending.length === 0) {
    console.log("Nothing to backfill — all code problems have every language.");
    return;
  }
  console.log(
    `Backfilling ${TARGET_LANGUAGES.join(", ")} for ${pending.length} problem(s)` +
      `${dryRun ? " (dry run, files untouched)" : ""}…\n`,
  );

  const outcomes: Outcome[] = [];
  let done = 0;
  await runPool(pending, concurrency, async (problem) => {
    const started = Date.now();
    let outcome: Outcome;
    try {
      outcome = await backfillProblem(client, problem, dryRun);
    } catch (err) {
      outcome = {
        slug: problem.slug,
        status: "failed",
        attempts: 0,
        report: String(err),
      };
    }
    outcomes.push(outcome);
    done++;
    const icon = outcome.status === "ok" ? "✅" : "❌";
    console.log(
      `${icon} [${done}/${pending.length}] ${outcome.slug} ` +
        `(${outcome.attempts} attempt${outcome.attempts === 1 ? "" : "s"}, ${Math.round((Date.now() - started) / 1000)}s)`,
    );
    if (outcome.report) console.log(indent(outcome.report));
  });

  const failed = outcomes.filter((o) => o.status === "failed");
  console.log(
    `\n${outcomes.length - failed.length}/${outcomes.length} problems backfilled` +
      (failed.length > 0
        ? `; FAILED: ${failed.map((f) => f.slug).join(", ")}`
        : ""),
  );
  if (!dryRun && outcomes.some((o) => o.status === "ok")) {
    console.log(
      "Now run `npm run problems:verify` to re-verify and `npm run db:seed` to publish.",
    );
  }
  process.exit(failed.length > 0 ? 1 : 0);
}

function indent(text: string): string {
  return text
    .split("\n")
    .map((l) => `     ${l}`)
    .join("\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
