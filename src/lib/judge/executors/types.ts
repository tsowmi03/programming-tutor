/** Shared execution types for the pluggable executor backends. */

import type { LanguageId } from "../languages";

export interface ExecFile {
  name: string;
  content: string;
}

export interface ExecRequest {
  language: LanguageId;
  files: ExecFile[];
}

export type ExecStatus = "RE" | "SG" | "TO" | "OL" | "EL" | "XX";

export interface ExecStage {
  stdout: string;
  stderr: string;
  output: string;
  code: number | null;
  signal: string | null;
  message?: string | null;
  status?: ExecStatus | null;
  cpu_time?: number | null;
  wall_time?: number | null;
  memory?: number | null;
}

export interface ExecResult {
  compile?: ExecStage;
  run: ExecStage;
}

/**
 * Thrown when an executor cannot run at all (missing local toolchain,
 * unreachable execution service) — as opposed to user code failing.
 */
export class ExecutorUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ExecutorUnavailableError";
  }
}
