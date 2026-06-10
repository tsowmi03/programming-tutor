/**
 * Local executor: runs submissions with the machine's own toolchains
 * (python3, node, javac/java, cc) inside a temp directory with time and
 * output limits.
 *
 * This is the default for local, single-user use, where submissions are the
 * user's own code — the same trust model as running a script from the
 * terminal. It is NOT suitable for a multi-user deployment; hosted
 * installations must point PISTON_URL at a sandboxed Piston instance
 * (see DEPLOYMENT.md).
 */

import { execFile } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import type { LanguageId } from "../languages";
import {
  ExecutorUnavailableError,
  type ExecRequest,
  type ExecResult,
  type ExecStage,
} from "./types";

const COMPILE_TIMEOUT_MS = 20_000;
const RUN_TIMEOUT_MS = 10_000;
const MAX_OUTPUT_BYTES = 5 * 1024 * 1024;

const INSTALL_HINTS: Record<string, string> = {
  python3: "Install Python 3 from https://www.python.org or `brew install python`.",
  node: "Install Node.js from https://nodejs.org or `brew install node`.",
  javac: "Install a JDK, e.g. `brew install --cask temurin`.",
  java: "Install a JDK, e.g. `brew install --cask temurin`.",
  cc: "Install the Xcode Command Line Tools: `xcode-select --install` (macOS) or gcc/clang via your package manager.",
};

interface CommandPlan {
  compile?: { cmd: string; args: string[] };
  run: { cmd: string; args: string[] };
}

function planFor(language: LanguageId, dir: string): CommandPlan {
  switch (language) {
    case "python":
      return { run: { cmd: "python3", args: ["main.py"] } };
    case "javascript":
      return { run: { cmd: "node", args: ["main.js"] } };
    case "java":
      return {
        compile: { cmd: "javac", args: ["Main.java"] },
        run: { cmd: "java", args: ["-cp", ".", "Main"] },
      };
    case "c":
      return {
        compile: { cmd: "cc", args: ["main.c", "-O1", "-o", "main"] },
        run: { cmd: path.join(dir, "main"), args: [] },
      };
  }
}

function runCommand(
  cmd: string,
  args: string[],
  cwd: string,
  timeout: number,
): Promise<ExecStage> {
  return new Promise((resolve, reject) => {
    execFile(
      cmd,
      args,
      { cwd, timeout, maxBuffer: MAX_OUTPUT_BYTES, killSignal: "SIGKILL" },
      (error, stdout, stderr) => {
        const err = error as
          | (Error & { code?: number | string; signal?: NodeJS.Signals | null; killed?: boolean })
          | null;

        if (err && err.code === "ENOENT") {
          const tool = path.basename(cmd);
          reject(
            new ExecutorUnavailableError(
              `The "${tool}" runtime was not found on this machine. ${INSTALL_HINTS[tool] ?? ""}`,
            ),
          );
          return;
        }

        resolve({
          stdout: stdout ?? "",
          stderr: stderr ?? "",
          output: `${stdout ?? ""}${stderr ?? ""}`,
          code: err ? (typeof err.code === "number" ? err.code : 1) : 0,
          signal: err?.signal ?? (err?.killed ? "SIGKILL" : null),
        });
      },
    );
  });
}

const EMPTY_STAGE: ExecStage = {
  stdout: "",
  stderr: "",
  output: "",
  code: null,
  signal: null,
};

export async function executeLocally(req: ExecRequest): Promise<ExecResult> {
  const dir = await mkdtemp(path.join(tmpdir(), "tutor-judge-"));
  try {
    await Promise.all(
      req.files.map((f) => writeFile(path.join(dir, f.name), f.content, "utf8")),
    );

    const plan = planFor(req.language, dir);

    let compile: ExecStage | undefined;
    if (plan.compile) {
      compile = await runCommand(
        plan.compile.cmd,
        plan.compile.args,
        dir,
        COMPILE_TIMEOUT_MS,
      );
      if (compile.code !== 0) {
        return { compile, run: EMPTY_STAGE };
      }
    }

    const run = await runCommand(plan.run.cmd, plan.run.args, dir, RUN_TIMEOUT_MS);
    return { compile, run };
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}
