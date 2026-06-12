/**
 * C++ harness generator.
 *
 * Follows LeetCode conventions: the user defines `class Solution` with a
 * public method, parameters use std::vector / std::string, and a block of
 * common standard headers plus `using namespace std` precedes the user's
 * code. Test cases are compiled into braced-init literals; each result is
 * serialized to canonical compact JSON and compared with the pre-rendered
 * expected string (as in the C harness, string comparison sidesteps writing
 * deep equality). Exceptions are caught per test; a segfault kills the whole
 * run and the protocol parser marks the in-flight test as errored.
 */

import {
  canonical,
  type FunctionSignature,
  type JudgeType,
  type JudgeValue,
  type TestCase,
} from "../types";

/** Escape an arbitrary string so it is a valid C++ string literal body. */
export function escapeCppString(s: string): string {
  let out = "";
  for (const ch of s) {
    const code = ch.codePointAt(0)!;
    if (ch === "\\") out += "\\\\";
    else if (ch === '"') out += '\\"';
    else if (ch === "\n") out += "\\n";
    else if (ch === "\r") out += "\\r";
    else if (ch === "\t") out += "\\t";
    else if (code < 0x20) out += `\\x${code.toString(16).padStart(2, "0")}`;
    else out += ch;
  }
  return out;
}

const CPP_TYPES: Record<JudgeType, string> = {
  int: "int",
  bool: "bool",
  string: "string",
  "int[]": "vector<int>",
  "string[]": "vector<string>",
  "int[][]": "vector<vector<int>>",
};

export function cppType(type: JudgeType): string {
  return CPP_TYPES[type];
}

export function cppLiteral(value: JudgeValue, type: JudgeType): string {
  switch (type) {
    case "int":
      return String(value);
    case "bool":
      return value ? "true" : "false";
    case "string":
      return `"${escapeCppString(value as string)}"`;
    case "int[]":
      return `{${(value as number[]).join(",")}}`;
    case "string[]":
      return `{${(value as string[])
        .map((s) => `"${escapeCppString(s)}"`)
        .join(",")}}`;
    case "int[][]":
      return `{${(value as number[][])
        .map((row) => `{${row.join(",")}}`)
        .join(",")}}`;
  }
}

function cppTestBlock(
  test: TestCase,
  index: number,
  signature: FunctionSignature,
): string {
  const decls = test.input.map((value, p) => {
    const param = signature.params[p];
    const type = cppType(param.type);
    const literal = cppLiteral(value, param.type);
    // Scalars use `=` init; containers use braced init lists.
    return param.type === "int" || param.type === "bool" || param.type === "string"
      ? `${type} __p${p} = ${literal};`
      : `${type} __p${p}${literal === "{}" ? "" : literal};`;
  });
  const args = test.input.map((_, p) => `__p${p}`).join(", ");

  const unordered = signature.ordered === false;
  const expectedValue =
    unordered && Array.isArray(test.expected)
      ? ([...(test.expected as (number | string)[])].sort((a, b) =>
          a < b ? -1 : a > b ? 1 : 0,
        ) as JudgeValue)
      : test.expected;
  const expected = `"${escapeCppString(canonical(expectedValue))}"`;

  const sortGot =
    unordered &&
    (signature.returns === "int[]" || signature.returns === "string[]")
      ? "\n            sort(__got.begin(), __got.end());"
      : "";

  return `    {
        cout << "@@JUDGE:BEGIN:${index}@@" << endl;
        try {
            ${decls.join("\n            ")}${decls.length > 0 ? "\n            " : ""}auto __got = sol.${signature.name}(${args});${sortGot}
            __finish(${index}, __repr(__got), ${expected});
        } catch (const exception& __e) {
            __error(${index}, __e.what());
        } catch (...) {
            __error(${index}, "unknown exception thrown");
        }
    }`;
}

export function buildCppHarness(
  userCode: string,
  signature: FunctionSignature,
  tests: TestCase[],
): string {
  const blocks = tests.map((t, i) => cppTestBlock(t, i, signature)).join("\n");

  return `#include <algorithm>
#include <array>
#include <bitset>
#include <cassert>
#include <cctype>
#include <climits>
#include <cmath>
#include <cstdint>
#include <cstdlib>
#include <cstring>
#include <deque>
#include <functional>
#include <iostream>
#include <iterator>
#include <limits>
#include <list>
#include <map>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <tuple>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
using namespace std;

${userCode}

// ---- judge harness (auto-generated, do not edit) ----
static string __jsonStr(const string& s) {
    string out = "\\"";
    for (unsigned char c : s) {
        if (c == '"') out += "\\\\\\"";
        else if (c == '\\\\') out += "\\\\\\\\";
        else if (c == '\\n') out += "\\\\n";
        else if (c == '\\r') out += "\\\\r";
        else if (c == '\\t') out += "\\\\t";
        else if (c < 0x20) {
            char buf[8];
            snprintf(buf, sizeof buf, "\\\\u%04x", c);
            out += buf;
        } else out += (char)c;
    }
    return out + "\\"";
}
static string __repr(int v) { return to_string(v); }
static string __repr(bool v) { return v ? "true" : "false"; }
static string __repr(const string& s) { return __jsonStr(s); }
template <typename T>
static string __repr(const vector<T>& v) {
    string out = "[";
    for (size_t i = 0; i < v.size(); i++) {
        if (i > 0) out += ",";
        out += __repr(v[i]);
    }
    return out + "]";
}
static void __finish(int i, const string& got, const string& expected) {
    if (got == expected) {
        cout << "@@JUDGE:RESULT:" << i << ":{\\"pass\\":true}@@" << endl;
    } else {
        cout << "@@JUDGE:RESULT:" << i << ":{\\"pass\\":false,\\"got\\":" << got
             << "}@@" << endl;
    }
}
static void __error(int i, const string& message) {
    cout << "@@JUDGE:RESULT:" << i << ":{\\"pass\\":false,\\"error\\":"
         << __jsonStr(message) << "}@@" << endl;
}

int main() {
    Solution sol;
${blocks}
    return 0;
}
`;
}
