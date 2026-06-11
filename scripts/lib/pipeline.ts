/**
 * End-to-end production of one problem: generate → verify → (one corrective
 * retry on verification failure) → render to a content module. Shared by
 * generate-problem.ts (single) and batch-generate.ts (bulk).
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import Anthropic from "@anthropic-ai/sdk";
import type { ProblemDef } from "../../src/content/types";
import { generateProblem, modelForDifficulty } from "./generate";
import { renderProblemModule } from "./render";
import type { GeneratedProblem, ProblemSpec } from "./spec";
import { verifyProblem } from "./verify";

export const GENERATED_DIR = join(
  process.cwd(),
  "src",
  "content",
  "generated",
);

export interface ProduceResult {
  status: "ok" | "failed";
  problem: GeneratedProblem;
  /** Why verification failed, if it did (empty when ok). */
  report: string;
  attempts: number;
}

export function createClient(): Anthropic {
  // Load .env so the key can live alongside DATABASE_URL etc. (no-op if the
  // file is missing or the var is already exported in the environment).
  if (!process.env.ANTHROPIC_API_KEY) {
    try {
      process.loadEnvFile(join(process.cwd(), ".env"));
    } catch {
      // .env absent — fall through to the check below.
    }
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error(
      "ANTHROPIC_API_KEY is not set. Add it to .env (ANTHROPIC_API_KEY=sk-ant-...) " +
        "or export it in your shell.",
    );
  }
  return new Anthropic();
}

/**
 * Generate and verify a problem, with a single corrective retry that feeds the
 * failing test output back to the model. Explanation problems skip
 * verification and always come back "ok".
 */
export async function produceProblem(
  client: Anthropic,
  spec: ProblemSpec,
  model: string = modelForDifficulty(spec.difficulty),
): Promise<ProduceResult> {
  const first = await generateProblem({ client, spec, model });
  let result = await verifyProblem(first.problem);
  if (result.ok) {
    return { status: "ok", problem: first.problem, report: "", attempts: 1 };
  }

  const retry = await generateProblem({
    client,
    spec,
    model,
    fixContext: { previousJson: first.json, failures: result.report },
  });
  result = await verifyProblem(retry.problem);
  return {
    status: result.ok ? "ok" : "failed",
    problem: retry.problem,
    report: result.ok ? "" : result.report,
    attempts: 2,
  };
}

/** Attach an order and write the rendered module. Returns the file path. */
export function writeProblemFile(
  problem: GeneratedProblem,
  order: number,
  dir: string = GENERATED_DIR,
): string {
  const def = { ...problem, order } as ProblemDef;
  mkdirSync(dir, { recursive: true });
  const path = join(dir, `${problem.slug}.ts`);
  writeFileSync(path, renderProblemModule(def));
  return path;
}
