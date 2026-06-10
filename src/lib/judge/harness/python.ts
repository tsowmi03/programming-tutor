/**
 * Python harness generator.
 *
 * Test cases are embedded as base64-encoded JSON (avoiding any string-escaping
 * pitfalls), decoded and dispatched to the user's function at runtime. The
 * user's code is placed first so tracebacks line up with the editor.
 */

import {
  snakeCase,
  type FunctionSignature,
  type TestCase,
} from "../types";

export function buildPythonHarness(
  userCode: string,
  signature: FunctionSignature,
  tests: TestCase[],
): string {
  const fn = snakeCase(signature.name);
  const testsB64 = Buffer.from(
    JSON.stringify(tests.map((t) => ({ input: t.input, expected: t.expected }))),
    "utf8",
  ).toString("base64");
  const ordered = signature.ordered === false ? "False" : "True";

  return `${userCode}

# ---- judge harness (auto-generated, do not edit) ----
import base64 as __b64
import copy as __copy
import json as __json
import sys as __sys
import traceback as __tb

__sys.setrecursionlimit(20000)


def __judge_norm(v):
    if isinstance(v, tuple):
        v = list(v)
    if isinstance(v, list):
        return [__judge_norm(x) for x in v]
    return v


def __judge_safe_json(v):
    try:
        return __json.dumps(v, separators=(",", ":"))
    except (TypeError, ValueError):
        return __json.dumps(repr(v))


def __judge_main():
    tests = __json.loads(__b64.b64decode("${testsB64}").decode("utf-8"))
    ordered = ${ordered}
    fn = globals().get("${fn}")
    if not callable(fn):
        print("@@JUDGE:FATAL:Your solution must define a function named ${fn}@@")
        return
    for i, t in enumerate(tests):
        print("@@JUDGE:BEGIN:%d@@" % i, flush=True)
        expected_json = __judge_safe_json(t["expected"])
        try:
            got = __judge_norm(fn(*__copy.deepcopy(t["input"])))
            exp = __judge_norm(t["expected"])
            got_c, exp_c = got, exp
            if not ordered and isinstance(got, list) and isinstance(exp, list):
                try:
                    got_c, exp_c = sorted(got), sorted(exp)
                except TypeError:
                    pass
            ok = got_c == exp_c
            payload = '{"pass":%s,"got":%s,"expected":%s}' % (
                "true" if ok else "false",
                __judge_safe_json(got),
                expected_json,
            )
        except BaseException:
            lines = __tb.format_exc().strip().splitlines()
            user_lines = [l for l in lines if "__judge" not in l]
            msg = "\\n".join(user_lines[-4:])[:800]
            payload = '{"pass":false,"error":%s,"expected":%s}' % (
                __json.dumps(msg),
                expected_json,
            )
        print("@@JUDGE:RESULT:%d:%s@@" % (i, payload), flush=True)


__judge_main()
`;
}
