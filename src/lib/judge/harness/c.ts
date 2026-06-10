/**
 * C harness generator.
 *
 * Test cases are compiled into C literals and the result of each call is
 * serialized to a canonical compact-JSON string which is compared with the
 * pre-rendered expected string (string comparison sidesteps deep-equality
 * in C). Array parameters and return values follow LeetCode's C conventions:
 *
 *   int[]    param  -> int* name, int nameSize
 *   string[] param  -> char** name, int nameSize
 *   int[][]  param  -> int** name, int nameSize, int* nameColSize
 *   int[]    return -> int* fn(..., int* returnSize)
 *   string[] return -> char** fn(..., int* returnSize)
 *
 * A segfault in user code kills the whole run; the protocol parser marks the
 * in-flight test as errored and the remaining tests as not run.
 */

import {
  canonical,
  type FunctionSignature,
  type JudgeType,
  type JudgeValue,
  type TestCase,
} from "../types";

/** Escape an arbitrary string so it is a valid C string literal body. */
export function escapeCString(s: string): string {
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

export function cParamList(signature: FunctionSignature): string {
  const parts: string[] = [];
  for (const p of signature.params) {
    switch (p.type) {
      case "int":
        parts.push(`int ${p.name}`);
        break;
      case "bool":
        parts.push(`bool ${p.name}`);
        break;
      case "string":
        parts.push(`char* ${p.name}`);
        break;
      case "int[]":
        parts.push(`int* ${p.name}`, `int ${p.name}Size`);
        break;
      case "string[]":
        parts.push(`char** ${p.name}`, `int ${p.name}Size`);
        break;
      case "int[][]":
        parts.push(
          `int** ${p.name}`,
          `int ${p.name}Size`,
          `int* ${p.name}ColSize`,
        );
        break;
    }
  }
  if (signature.returns === "int[]" || signature.returns === "string[]") {
    parts.push("int* returnSize");
  }
  return parts.join(", ");
}

const C_RETURN_TYPES: Partial<Record<JudgeType, string>> = {
  int: "int",
  bool: "bool",
  string: "char*",
  "int[]": "int*",
  "string[]": "char**",
};

export function cReturnType(type: JudgeType): string {
  const mapped = C_RETURN_TYPES[type];
  if (!mapped) {
    throw new Error(`C harness does not support return type ${type}`);
  }
  return mapped;
}

/** Declarations + argument expressions for one parameter of one test. */
function cArgument(
  value: JudgeValue,
  type: JudgeType,
  testIndex: number,
  paramIndex: number,
): { decls: string[]; args: string[] } {
  const base = `__t${testIndex}_p${paramIndex}`;
  switch (type) {
    case "int":
      return { decls: [], args: [String(value)] };
    case "bool":
      return { decls: [], args: [value ? "true" : "false"] };
    case "string":
      return {
        decls: [`char ${base}[] = "${escapeCString(value as string)}";`],
        args: [base],
      };
    case "int[]": {
      const arr = value as number[];
      const init = arr.length > 0 ? arr.join(",") : "0";
      return {
        decls: [`int ${base}[] = {${init}};`],
        args: [base, String(arr.length)],
      };
    }
    case "string[]": {
      const arr = value as string[];
      const decls = arr.map(
        (s, i) => `char ${base}_${i}[] = "${escapeCString(s)}";`,
      );
      const ptrs = arr.length > 0
        ? arr.map((_, i) => `${base}_${i}`).join(",")
        : "0";
      decls.push(`char* ${base}[] = {${ptrs}};`);
      return { decls, args: [base, String(arr.length)] };
    }
    case "int[][]": {
      const grid = value as number[][];
      const decls = grid.map((row, r) => {
        const init = row.length > 0 ? row.join(",") : "0";
        return `int ${base}_r${r}[] = {${init}};`;
      });
      const ptrs = grid.length > 0
        ? grid.map((_, r) => `${base}_r${r}`).join(",")
        : "0";
      decls.push(`int* ${base}[] = {${ptrs}};`);
      const colInit = grid.length > 0
        ? grid.map((row) => row.length).join(",")
        : "0";
      decls.push(`int ${base}_cs[] = {${colInit}};`);
      return {
        decls,
        args: [base, String(grid.length), `${base}_cs`],
      };
    }
  }
}

function cTestBlock(
  test: TestCase,
  index: number,
  signature: FunctionSignature,
): string {
  const decls: string[] = [];
  const args: string[] = [];
  test.input.forEach((value, p) => {
    const piece = cArgument(value, signature.params[p].type, index, p);
    decls.push(...piece.decls);
    args.push(...piece.args);
  });

  const unordered = signature.ordered === false;
  const expectedValue =
    unordered && Array.isArray(test.expected)
      ? ([...(test.expected as number[])].sort((a, b) => a - b) as JudgeValue)
      : test.expected;
  const expected = `"${escapeCString(canonical(expectedValue))}"`;

  let invoke: string;
  switch (signature.returns) {
    case "int":
      invoke = [
        `int __got = ${signature.name}(${args.join(", ")});`,
        `__reset(); __put_int(__got);`,
      ].join("\n        ");
      break;
    case "bool":
      invoke = [
        `bool __got = ${signature.name}(${args.join(", ")});`,
        `__reset(); __put_bool(__got);`,
      ].join("\n        ");
      break;
    case "string":
      invoke = [
        `char* __got = ${signature.name}(${args.join(", ")});`,
        `__reset(); if (__got) __put_json_str(__got); else __puts_("null");`,
      ].join("\n        ");
      break;
    case "int[]":
      invoke = [
        `int __rs = 0;`,
        `int* __got = ${signature.name}(${[...args, "&__rs"].join(", ")});`,
        ...(unordered
          ? [`if (__got) qsort(__got, __rs, sizeof(int), __cmp_int);`]
          : []),
        `__reset(); __put_int_arr(__got, __rs);`,
      ].join("\n        ");
      break;
    case "string[]":
      invoke = [
        `int __rs = 0;`,
        `char** __got = ${signature.name}(${[...args, "&__rs"].join(", ")});`,
        `__reset(); __put_str_arr(__got, __rs);`,
      ].join("\n        ");
      break;
    default:
      throw new Error(
        `C harness does not support return type ${signature.returns}`,
      );
  }

  return `    {
        printf("@@JUDGE:BEGIN:${index}@@\\n");
        fflush(stdout);
        ${decls.join("\n        ")}${decls.length > 0 ? "\n        " : ""}${invoke}
        __emit(${index}, ${expected});
    }`;
}

export function buildCHarness(
  userCode: string,
  signature: FunctionSignature,
  tests: TestCase[],
): string {
  const blocks = tests.map((t, i) => cTestBlock(t, i, signature)).join("\n");

  return `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

${userCode}

/* ---- judge harness (auto-generated, do not edit) ---- */
#define __UNUSED __attribute__((unused))
static char __buf[1 << 20];
static size_t __bp;
__UNUSED static void __putc_(char c) { if (__bp + 1 < sizeof __buf) __buf[__bp++] = c; }
__UNUSED static void __puts_(const char* s) { while (*s) __putc_(*s++); }
__UNUSED static void __reset(void) { __bp = 0; }
__UNUSED static void __put_int(long long v) {
    char t[32];
    snprintf(t, sizeof t, "%lld", v);
    __puts_(t);
}
__UNUSED static void __put_bool(int b) { __puts_(b ? "true" : "false"); }
__UNUSED static void __put_json_str(const char* s) {
    __putc_('"');
    for (; *s; s++) {
        unsigned char c = (unsigned char)*s;
        if (c == '"') __puts_("\\\\\\"");
        else if (c == '\\\\') __puts_("\\\\\\\\");
        else if (c == '\\n') __puts_("\\\\n");
        else if (c == '\\r') __puts_("\\\\r");
        else if (c == '\\t') __puts_("\\\\t");
        else if (c < 0x20) {
            char t[8];
            snprintf(t, sizeof t, "\\\\u%04x", c);
            __puts_(t);
        } else __putc_((char)c);
    }
    __putc_('"');
}
__UNUSED static void __put_int_arr(const int* a, int n) {
    __putc_('[');
    if (a) for (int i = 0; i < n; i++) { if (i) __putc_(','); __put_int(a[i]); }
    __putc_(']');
}
__UNUSED static void __put_str_arr(char** a, int n) {
    __putc_('[');
    if (a) for (int i = 0; i < n; i++) {
        if (i) __putc_(',');
        if (a[i]) __put_json_str(a[i]); else __puts_("null");
    }
    __putc_(']');
}
__UNUSED static int __cmp_int(const void* x, const void* y) {
    int a = *(const int*)x, b = *(const int*)y;
    return (a > b) - (a < b);
}
static void __emit(int i, const char* expected) {
    __buf[__bp < sizeof __buf ? __bp : sizeof __buf - 1] = 0;
    int pass = strcmp(__buf, expected) == 0;
    printf("@@JUDGE:RESULT:%d:{\\"pass\\":%s,\\"got\\":%s,\\"expected\\":%s}@@\\n",
        i, pass ? "true" : "false", __buf, expected);
    fflush(stdout);
}

int main(void) {
${blocks}
    return 0;
}
`;
}
