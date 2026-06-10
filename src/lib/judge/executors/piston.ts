/**
 * Piston executor: sends code to a Piston instance for sandboxed execution.
 *
 * Use this in hosted deployments by setting PISTON_URL to a self-hosted
 * Piston (https://github.com/engineer-man/piston). Note the public instance
 * at emkc.org became whitelist-only in February 2026, so a self-hosted or
 * whitelisted endpoint is required.
 *
 * A submission judges all of its test cases in a single execution, so one
 * judge run costs exactly one request (plus a compile stage for Java/C).
 */

import { LANGUAGES } from "../languages";
import {
  ExecutorUnavailableError,
  type ExecRequest,
  type ExecResult,
  type ExecStage,
} from "./types";

const MAX_ATTEMPTS = 4;
const BASE_DELAY_MS = 700;

interface PistonResponse {
  language: string;
  version: string;
  compile?: ExecStage;
  run: ExecStage;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function pistonUrl(): string {
  const url = process.env.PISTON_URL;
  if (!url) {
    throw new ExecutorUnavailableError(
      "PISTON_URL is not configured. Set it to a Piston instance, or unset EXECUTOR to run code locally.",
    );
  }
  return url.replace(/\/$/, "");
}

export async function executeOnPiston(req: ExecRequest): Promise<ExecResult> {
  const { piston } = LANGUAGES[req.language];
  const body = JSON.stringify({
    language: piston.language,
    version: piston.version,
    files: req.files,
  });

  let lastError: Error | undefined;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    if (attempt > 0) {
      await sleep(BASE_DELAY_MS * 2 ** (attempt - 1));
    }
    try {
      const res = await fetch(`${pistonUrl()}/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        signal: AbortSignal.timeout(30_000),
      });

      if (res.status === 429 || res.status >= 500) {
        lastError = new Error(`Piston responded with ${res.status}`);
        continue;
      }
      if (!res.ok) {
        const detail = await res.text().catch(() => "");
        throw new ExecutorUnavailableError(
          `Piston request failed (${res.status}): ${detail.slice(0, 300)}`,
        );
      }
      const parsed = (await res.json()) as PistonResponse;
      return { compile: parsed.compile, run: parsed.run };
    } catch (err) {
      if (err instanceof ExecutorUnavailableError) throw err;
      lastError = err instanceof Error ? err : new Error(String(err));
    }
  }

  throw new ExecutorUnavailableError(
    `Code execution service is unavailable after ${MAX_ATTEMPTS} attempts: ${lastError?.message}`,
  );
}
