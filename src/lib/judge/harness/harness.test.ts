import { describe, expect, it } from "vitest";
import type { FunctionSignature, TestCase } from "../types";
import { buildPythonHarness } from "./python";
import { buildJavaScriptHarness } from "./javascript";
import { buildTypeScriptHarness } from "./typescript";
import { buildJavaHarness, escapeJavaString, javaLiteral } from "./java";
import { buildCSharpHarness, csharpLiteral, pascalCase } from "./csharp";
import { buildCHarness, escapeCString, cParamList } from "./c";
import { buildCppHarness, cppLiteral, escapeCppString } from "./cpp";

const twoSum: FunctionSignature = {
  name: "twoSum",
  params: [
    { name: "nums", type: "int[]" },
    { name: "target", type: "int" },
  ],
  returns: "int[]",
};

const tests: TestCase[] = [
  { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
  { input: [[3, 3], 6], expected: [0, 1], hidden: true },
];

describe("python harness", () => {
  it("uses snake_case naming and embeds tests", () => {
    const src = buildPythonHarness("def two_sum(nums, target): ...", twoSum, tests);
    expect(src).toContain('globals().get("two_sum")');
    expect(src.startsWith("def two_sum")).toBe(true);
    expect(src).toContain("b64decode");
    expect(src).toContain('\'{"pass":true}\'');
    expect(src).not.toContain(',"expected":%s');
  });
});

describe("javascript harness", () => {
  it("references the camelCase function", () => {
    const src = buildJavaScriptHarness("function twoSum(a, b) {}", twoSum, tests);
    expect(src).toContain('typeof twoSum === "function"');
    expect(src).toContain('\'{"pass":true}\'');
    expect(src).not.toContain('\'"expected":\'');
  });
});

describe("typescript harness", () => {
  it("disables type checking for Piston's bare tsc and keeps the camelCase name", () => {
    const src = buildTypeScriptHarness(
      "function twoSum(nums: number[], target: number): number[] { return []; }",
      twoSum,
      tests,
    );
    expect(src.startsWith("// @ts-nocheck")).toBe(true);
    expect(src).toContain('typeof twoSum === "function"');
    expect(src).toContain('\'{"pass":true}\'');
  });
});

describe("java harness", () => {
  it("generates typed literals for each test", () => {
    const src = buildJavaHarness(
      "class Solution { public int[] twoSum(int[] nums, int target) { return null; } }",
      twoSum,
      tests,
    );
    expect(src).toContain(
      "runTest(0, new int[]{0,1}, true, () -> sol.twoSum(new int[]{2,7,11,15}, 9));",
    );
    expect(src).toContain("public class Main");
    expect(src).toContain('"{\\"pass\\":true}"');
    expect(src).not.toContain('+\\"expected\\"');
  });

  it("escapes special characters in string literals", () => {
    expect(escapeJavaString('he said "hi"\n')).toBe('"he said \\"hi\\"\\n"');
    expect(javaLiteral(["a\\b"], "string[]")).toBe('new String[]{"a\\\\b"}');
  });

  it("renders 2D arrays and empty arrays", () => {
    expect(javaLiteral([[1, 2], []], "int[][]")).toBe("new int[][]{{1,2},{}}");
    expect(javaLiteral([], "int[]")).toBe("new int[]{}");
  });
});

describe("csharp harness", () => {
  it("calls the PascalCase method with typed literals", () => {
    const src = buildCSharpHarness(
      "public class Solution { public int[] TwoSum(int[] nums, int target) { return null; } }",
      twoSum,
      tests,
    );
    expect(src).toContain(
      "RunTest(0, new int[]{0,1}, true, () => (object)sol.TwoSum(new int[]{2,7,11,15}, 9));",
    );
    expect(src).toContain("public class __Judge");
    expect(src).toContain('"{\\"pass\\":true}"');
  });

  it("converts names and renders jagged arrays", () => {
    expect(pascalCase("twoSum")).toBe("TwoSum");
    expect(csharpLiteral([[1, 2], []], "int[][]")).toBe(
      "new int[][]{new int[]{1,2},new int[]{}}",
    );
    expect(csharpLiteral(['a"b'], "string[]")).toBe('new string[]{"a\\"b"}');
  });
});

describe("cpp harness", () => {
  it("declares vector parameters as lvalues and compares canonical JSON", () => {
    const src = buildCppHarness(
      "class Solution { public: vector<int> twoSum(vector<int>& nums, int target) { return {}; } };",
      twoSum,
      tests,
    );
    expect(src).toContain("vector<int> __p0{2,7,11,15};");
    expect(src).toContain("int __p1 = 9;");
    expect(src).toContain("auto __got = sol.twoSum(__p0, __p1);");
    expect(src).toContain('__finish(0, __repr(__got), "[0,1]");');
    expect(src).toContain("using namespace std;");
  });

  it("renders literals and escapes strings", () => {
    expect(cppLiteral([[1, 2], []], "int[][]")).toBe("{{1,2},{}}");
    expect(cppLiteral(["a", "b"], "string[]")).toBe('{"a","b"}');
    expect(escapeCppString('a"b\\c')).toBe('a\\"b\\\\c');
  });

  it("sorts both sides for unordered comparisons", () => {
    const src = buildCppHarness(
      "class Solution { public: vector<int> f(vector<int>& a) { return {}; } };",
      {
        name: "f",
        params: [{ name: "a", type: "int[]" }],
        returns: "int[]",
        ordered: false,
      },
      [{ input: [[3, 1, 2]], expected: [3, 1, 2] }],
    );
    expect(src).toContain("sort(__got.begin(), __got.end());");
    expect(src).toContain('__finish(0, __repr(__got), "[1,2,3]");');
  });
});

describe("c harness", () => {
  it("builds LeetCode-style parameter lists", () => {
    expect(cParamList(twoSum)).toBe(
      "int* nums, int numsSize, int target, int* returnSize",
    );
    expect(
      cParamList({
        name: "numIslands",
        params: [{ name: "grid", type: "int[][]" }],
        returns: "int",
      }),
    ).toBe("int** grid, int gridSize, int* gridColSize");
  });

  it("escapes C string literals", () => {
    expect(escapeCString('a"b\\c')).toBe('a\\"b\\\\c');
  });

  it("generates per-test blocks with literal arrays", () => {
    const src = buildCHarness(
      "int* twoSum(int* nums, int numsSize, int target, int* returnSize) { return 0; }",
      twoSum,
      tests,
    );
    expect(src).toContain("int __t0_p0[] = {2,7,11,15};");
    expect(src).toContain("twoSum(__t0_p0, 4, 9, &__rs)");
    expect(src).toContain('__emit(0, "[0,1]");');
    expect(src).toContain('{\\"pass\\":true}');
    expect(src).not.toContain(',\\"expected\\":%s');
  });

  it("sorts expected values for unordered comparisons", () => {
    const src = buildCHarness(
      "int* f(int* a, int aSize, int* returnSize) { return 0; }",
      {
        name: "f",
        params: [{ name: "a", type: "int[]" }],
        returns: "int[]",
        ordered: false,
      },
      [{ input: [[3, 1, 2]], expected: [3, 1, 2] }],
    );
    expect(src).toContain('__emit(0, "[1,2,3]");');
    expect(src).toContain("qsort(__got, __rs, sizeof(int), __cmp_int);");
  });

  it("rejects unsupported return types", () => {
    expect(() =>
      buildCHarness(
        "",
        { name: "f", params: [], returns: "int[][]" },
        [{ input: [], expected: [[1]] }],
      ),
    ).toThrow(/does not support/);
  });
});
