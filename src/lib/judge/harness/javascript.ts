/**
 * JavaScript (Node) harness generator.
 *
 * Mirrors the Python harness: tests embedded as base64 JSON, user code first
 * so stack traces line up with the editor.
 */

import type { FunctionSignature, TestCase } from "../types";

export function buildJavaScriptHarness(
  userCode: string,
  signature: FunctionSignature,
  tests: TestCase[],
): string {
  const fn = signature.name;
  const testsB64 = Buffer.from(
    JSON.stringify(tests.map((t) => ({ input: t.input, expected: t.expected }))),
    "utf8",
  ).toString("base64");
  const ordered = signature.ordered === false ? "false" : "true";

  return `${userCode}

// ---- judge harness (auto-generated, do not edit) ----
(function __judgeMain() {
  const tests = JSON.parse(
    Buffer.from("${testsB64}", "base64").toString("utf8"),
  );
  const ordered = ${ordered};

  const fn = typeof ${fn} === "function" ? ${fn} : undefined;
  if (!fn) {
    console.log("@@JUDGE:FATAL:Your solution must define a function named ${fn}@@");
    return;
  }

  const cmp = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
  const norm = (v) =>
    !ordered && Array.isArray(v) ? [...v].sort(cmp) : v;
  const deepEq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const safeJson = (v) => {
    if (v === undefined) return '"undefined"';
    try {
      const s = JSON.stringify(v);
      return s === undefined ? JSON.stringify(String(v)) : s;
    } catch {
      return JSON.stringify(String(v));
    }
  };

  for (let i = 0; i < tests.length; i++) {
    console.log("@@JUDGE:BEGIN:" + i + "@@");
    const t = tests[i];
    let payload;
    try {
      const args = JSON.parse(JSON.stringify(t.input));
      const got = fn(...args);
      const ok = deepEq(norm(got), norm(t.expected));
      payload = ok
        ? '{"pass":true}'
        : '{"pass":false,"got":' + safeJson(got) + "}";
    } catch (e) {
      const msg =
        e instanceof Error && e.stack
          ? e.stack.split("\\n").slice(0, 3).join("\\n").slice(0, 800)
          : String(e).slice(0, 800);
      payload =
        '{"pass":false,"error":' + JSON.stringify(msg) + "}";
    }
    console.log("@@JUDGE:RESULT:" + i + ":" + payload + "@@");
  }
})();
`;
}
