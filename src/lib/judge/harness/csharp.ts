/**
 * C# harness generator.
 *
 * Follows LeetCode conventions: the user defines `class Solution` with a
 * public PascalCase method (the camelCase signature name is converted, e.g.
 * twoSum -> TwoSum). Like the Java harness, test cases are compiled into
 * typed C# literals and results are emitted with a small hand-rolled JSON
 * writer — Piston's mono runtime has no System.Text.Json. The harness class
 * holds Main(); mono's csc compiles both classes into one executable.
 *
 * The user's code comes first: C# requires using directives to precede all
 * type declarations in a file, so the user's own usings stay legal (and stack
 * traces line up with the editor). The harness consequently uses fully
 * qualified names throughout and declares no usings of its own.
 */

import type {
  FunctionSignature,
  JudgeType,
  JudgeValue,
  TestCase,
} from "../types";

/** twoSum -> TwoSum (C# method naming convention). */
export function pascalCase(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

const CSHARP_TYPES: Record<JudgeType, string> = {
  int: "int",
  bool: "bool",
  string: "string",
  "int[]": "int[]",
  "string[]": "string[]",
  "int[][]": "int[][]",
};

export function csharpType(type: JudgeType): string {
  return CSHARP_TYPES[type];
}

export function escapeCSharpString(s: string): string {
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

export function csharpLiteral(value: JudgeValue, type: JudgeType): string {
  switch (type) {
    case "int":
      return String(value);
    case "bool":
      return value ? "true" : "false";
    case "string":
      return escapeCSharpString(value as string);
    case "int[]":
      return `new int[]{${(value as number[]).join(",")}}`;
    case "string[]":
      return `new string[]{${(value as string[])
        .map(escapeCSharpString)
        .join(",")}}`;
    case "int[][]":
      // C# jagged arrays need an explicit `new int[]` per row.
      return `new int[][]{${(value as number[][])
        .map((row) => `new int[]{${row.join(",")}}`)
        .join(",")}}`;
  }
}

export function buildCSharpHarness(
  userCode: string,
  signature: FunctionSignature,
  tests: TestCase[],
): string {
  const ordered = signature.ordered === false ? "false" : "true";
  const method = pascalCase(signature.name);

  const calls = tests
    .map((t, i) => {
      const args = t.input
        .map((value, p) => csharpLiteral(value, signature.params[p].type))
        .join(", ");
      const expected = csharpLiteral(t.expected, signature.returns);
      return `        RunTest(${i}, ${expected}, ${ordered}, () => (object)sol.${method}(${args}));`;
    })
    .join("\n");

  return `${userCode}

// ---- judge harness (auto-generated, do not edit) ----
public class __Judge
{
    static string JsonStr(string s)
    {
        var sb = new System.Text.StringBuilder("\\"");
        foreach (char c in s)
        {
            if (c == '"') sb.Append("\\\\\\"");
            else if (c == '\\\\') sb.Append("\\\\\\\\");
            else if (c == '\\n') sb.Append("\\\\n");
            else if (c == '\\r') sb.Append("\\\\r");
            else if (c == '\\t') sb.Append("\\\\t");
            else if (c < 0x20) sb.AppendFormat("\\\\u{0:x4}", (int)c);
            else sb.Append(c);
        }
        return sb.Append('"').ToString();
    }

    static string Repr(object o)
    {
        if (o == null) return "null";
        if (o is string) return JsonStr((string)o);
        if (o is bool) return ((bool)o) ? "true" : "false";
        if (o is int[])
        {
            var a = (int[])o;
            var sb = new System.Text.StringBuilder("[");
            for (int i = 0; i < a.Length; i++)
            {
                if (i > 0) sb.Append(',');
                sb.Append(a[i]);
            }
            return sb.Append(']').ToString();
        }
        if (o is string[])
        {
            var a = (string[])o;
            var sb = new System.Text.StringBuilder("[");
            for (int i = 0; i < a.Length; i++)
            {
                if (i > 0) sb.Append(',');
                sb.Append(a[i] == null ? "null" : JsonStr(a[i]));
            }
            return sb.Append(']').ToString();
        }
        if (o is int[][])
        {
            var a = (int[][])o;
            var sb = new System.Text.StringBuilder("[");
            for (int i = 0; i < a.Length; i++)
            {
                if (i > 0) sb.Append(',');
                sb.Append(Repr(a[i]));
            }
            return sb.Append(']').ToString();
        }
        return System.Convert.ToString(o, System.Globalization.CultureInfo.InvariantCulture);
    }

    static object Norm(object o, bool ordered)
    {
        if (ordered) return o;
        if (o is int[])
        {
            var c = (int[])((int[])o).Clone();
            System.Array.Sort(c);
            return c;
        }
        if (o is string[])
        {
            var c = (string[])((string[])o).Clone();
            System.Array.Sort(c, System.StringComparer.Ordinal);
            return c;
        }
        return o;
    }

    static bool DeepEq(object a, object b)
    {
        if (a == null || b == null) return a == null && b == null;
        if (a is int[] && b is int[])
        {
            var x = (int[])a; var y = (int[])b;
            if (x.Length != y.Length) return false;
            for (int i = 0; i < x.Length; i++) if (x[i] != y[i]) return false;
            return true;
        }
        if (a is string[] && b is string[])
        {
            var x = (string[])a; var y = (string[])b;
            if (x.Length != y.Length) return false;
            for (int i = 0; i < x.Length; i++)
                if (!string.Equals(x[i], y[i], System.StringComparison.Ordinal)) return false;
            return true;
        }
        if (a is int[][] && b is int[][])
        {
            var x = (int[][])a; var y = (int[][])b;
            if (x.Length != y.Length) return false;
            for (int i = 0; i < x.Length; i++) if (!DeepEq(x[i], y[i])) return false;
            return true;
        }
        return a.Equals(b);
    }

    static void RunTest(int i, object expected, bool ordered, System.Func<object> thunk)
    {
        System.Console.WriteLine("@@JUDGE:BEGIN:" + i + "@@");
        System.Console.Out.Flush();
        string payload;
        try
        {
            object got = thunk();
            bool ok = DeepEq(Norm(got, ordered), Norm(expected, ordered));
            payload = ok
                ? "{\\"pass\\":true}"
                : "{\\"pass\\":false,\\"got\\":" + Repr(got) + "}";
        }
        catch (System.Exception e)
        {
            payload = "{\\"pass\\":false,\\"error\\":"
                + JsonStr(e.GetType().Name + ": " + e.Message) + "}";
        }
        System.Console.WriteLine("@@JUDGE:RESULT:" + i + ":" + payload + "@@");
        System.Console.Out.Flush();
    }

    public static void Main()
    {
        var sol = new Solution();
${calls}
    }
}
`;
}
