/**
 * Executor selection.
 *
 * - EXECUTOR=local  — run with the machine's own toolchains (default when
 *                     PISTON_URL is unset; intended for single-user local use)
 * - EXECUTOR=piston — send code to the Piston instance at PISTON_URL
 *                     (default when PISTON_URL is set; required for hosting)
 */

import { executeLocally } from "./local";
import { executeOnPiston } from "./piston";
import type { ExecRequest, ExecResult } from "./types";

export type ExecutorKind = "local" | "piston";

export function selectedExecutor(): ExecutorKind {
  const explicit = process.env.EXECUTOR;
  if (explicit === "local" || explicit === "piston") return explicit;
  return process.env.PISTON_URL ? "piston" : "local";
}

export function execute(req: ExecRequest): Promise<ExecResult> {
  return selectedExecutor() === "piston"
    ? executeOnPiston(req)
    : executeLocally(req);
}

export { ExecutorUnavailableError } from "./types";
export type { ExecRequest, ExecResult, ExecStage } from "./types";
