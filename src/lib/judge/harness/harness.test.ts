import { describe, expect, it } from "vitest";
import type { FunctionSignature, TestCase } from "../types";
import { buildPythonHarness } from "./python";
import { buildJavaScriptHarness } from "./javascript";
import { buildJavaHarness, escapeJavaString, javaLiteral } from "./java";
import { buildCHarness, escapeCString, cParamList } from "./c";

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
  });
});

describe("javascript harness", () => {
  it("references the camelCase function", () => {
    const src = buildJavaScriptHarness("function twoSum(a, b) {}", twoSum, tests);
    expect(src).toContain('typeof twoSum === "function"');
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
