/**
 * Java harness generator.
 *
 * Java has no JSON parser in its standard library, so instead of embedding
 * JSON the generator compiles each test case into typed Java literals
 * (e.g. `new int[]{2,7,11,15}`) and emits the result protocol with a small
 * hand-rolled JSON writer. The user's code must define `class Solution` with
 * the expected public method, matching LeetCode conventions.
 */

import type {
  FunctionSignature,
  JudgeType,
  JudgeValue,
  TestCase,
} from "../types";

const JAVA_TYPES: Record<JudgeType, string> = {
  int: "int",
  bool: "boolean",
  string: "String",
  "int[]": "int[]",
  "string[]": "String[]",
  "int[][]": "int[][]",
};

export function javaType(type: JudgeType): string {
  return JAVA_TYPES[type];
}

export function escapeJavaString(s: string): string {
  let out = '"';
  for (const ch of s) {
    const code = ch.codePointAt(0)!;
    if (ch === '"') out += '\\"';
    else if (ch === "\\") out += "\\\\";
    else if (ch === "\n") out += "\\n";
    else if (ch === "\r") out += "\\r";
    else if (ch === "\t") out += "\\t";
    else if (code < 0x20)
      out += "\\u" + code.toString(16).padStart(4, "0");
    else out += ch;
  }
  return out + '"';
}

export function javaLiteral(value: JudgeValue, type: JudgeType): string {
  switch (type) {
    case "int":
      return String(value);
    case "bool":
      return value ? "true" : "false";
    case "string":
      return escapeJavaString(value as string);
    case "int[]":
      return `new int[]{${(value as number[]).join(",")}}`;
    case "string[]":
      return `new String[]{${(value as string[])
        .map(escapeJavaString)
        .join(",")}}`;
    case "int[][]":
      return `new int[][]{${(value as number[][])
        .map((row) => `{${row.join(",")}}`)
        .join(",")}}`;
  }
}

export function buildJavaHarness(
  userCode: string,
  signature: FunctionSignature,
  tests: TestCase[],
): string {
  const ordered = signature.ordered === false ? "false" : "true";

  const calls = tests
    .map((t, i) => {
      const args = t.input
        .map((value, p) => javaLiteral(value, signature.params[p].type))
        .join(", ");
      const expected = javaLiteral(t.expected, signature.returns);
      return `        runTest(${i}, ${expected}, ${ordered}, () -> sol.${signature.name}(${args}));`;
    })
    .join("\n");

  return `import java.util.*;

${userCode}

// ---- judge harness (auto-generated, do not edit) ----
public class Main {
    interface Thunk {
        Object run() throws Throwable;
    }

    static String jsonStr(String s) {
        StringBuilder sb = new StringBuilder("\\"");
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '"') sb.append("\\\\\\"");
            else if (c == '\\\\') sb.append("\\\\\\\\");
            else if (c == '\\n') sb.append("\\\\n");
            else if (c == '\\r') sb.append("\\\\r");
            else if (c == '\\t') sb.append("\\\\t");
            else if (c < 0x20) sb.append(String.format("\\\\u%04x", (int) c));
            else sb.append(c);
        }
        return sb.append('"').toString();
    }

    static String repr(Object o) {
        if (o == null) return "null";
        if (o instanceof String) return jsonStr((String) o);
        if (o instanceof int[]) {
            int[] a = (int[]) o;
            StringBuilder sb = new StringBuilder("[");
            for (int i = 0; i < a.length; i++) {
                if (i > 0) sb.append(',');
                sb.append(a[i]);
            }
            return sb.append(']').toString();
        }
        if (o instanceof String[]) {
            String[] a = (String[]) o;
            StringBuilder sb = new StringBuilder("[");
            for (int i = 0; i < a.length; i++) {
                if (i > 0) sb.append(',');
                sb.append(jsonStr(a[i]));
            }
            return sb.append(']').toString();
        }
        if (o instanceof int[][]) {
            int[][] a = (int[][]) o;
            StringBuilder sb = new StringBuilder("[");
            for (int i = 0; i < a.length; i++) {
                if (i > 0) sb.append(',');
                sb.append(repr(a[i]));
            }
            return sb.append(']').toString();
        }
        return String.valueOf(o);
    }

    static Object normalize(Object o, boolean ordered) {
        if (ordered) return o;
        if (o instanceof int[]) {
            int[] c = ((int[]) o).clone();
            Arrays.sort(c);
            return c;
        }
        if (o instanceof String[]) {
            String[] c = ((String[]) o).clone();
            Arrays.sort(c);
            return c;
        }
        return o;
    }

    static void runTest(int i, Object expected, boolean ordered, Thunk thunk) {
        System.out.println("@@JUDGE:BEGIN:" + i + "@@");
        System.out.flush();
        String payload;
        try {
            Object got = thunk.run();
            boolean ok = Objects.deepEquals(
                normalize(got, ordered), normalize(expected, ordered));
            payload = "{\\"pass\\":" + ok + ",\\"got\\":" + repr(got)
                + ",\\"expected\\":" + repr(expected) + "}";
        } catch (Throwable e) {
            payload = "{\\"pass\\":false,\\"error\\":" + jsonStr(String.valueOf(e))
                + ",\\"expected\\":" + repr(expected) + "}";
        }
        System.out.println("@@JUDGE:RESULT:" + i + ":" + payload + "@@");
        System.out.flush();
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
${calls}
    }
}
`;
}
