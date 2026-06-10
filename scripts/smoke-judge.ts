/**
 * Live smoke test for the judge engine against the real Piston API.
 * Usage: npx tsx scripts/smoke-judge.ts
 */

import { judgeCode } from "../src/lib/judge/judge";
import type { FunctionSignature, TestCase } from "../src/lib/judge/types";
import type { LanguageId } from "../src/lib/judge/languages";

const signature: FunctionSignature = {
  name: "twoSum",
  params: [
    { name: "nums", type: "int[]" },
    { name: "target", type: "int" },
  ],
  returns: "int[]",
};

const tests: TestCase[] = [
  { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
  { input: [[3, 2, 4], 6], expected: [1, 2] },
  { input: [[3, 3], 6], expected: [0, 1], hidden: true },
];

const solutions: Record<LanguageId, string> = {
  python: `def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        if target - n in seen:
            return [seen[target - n], i]
        seen[n] = i
    return []
`,
  javascript: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (seen.has(target - nums[i])) return [seen.get(target - nums[i]), i];
    seen.set(nums[i], i);
  }
  return [];
}
`,
  java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            if (seen.containsKey(target - nums[i])) {
                return new int[]{seen.get(target - nums[i]), i};
            }
            seen.put(nums[i], i);
        }
        return new int[]{};
    }
}
`,
  c: `int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    int* out = malloc(2 * sizeof(int));
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[i] + nums[j] == target) {
                out[0] = i; out[1] = j; *returnSize = 2;
                return out;
            }
        }
    }
    *returnSize = 0;
    return out;
}
`,
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function main() {
  let failures = 0;

  for (const [language, code] of Object.entries(solutions)) {
    const outcome = await judgeCode({
      language: language as LanguageId,
      code,
      signature,
      tests,
    });
    const ok = outcome.status === "passed";
    if (!ok) failures++;
    console.log(
      `${ok ? "✅" : "❌"} ${language}: ${outcome.status} (${outcome.passedCount}/${outcome.totalCount})`,
    );
    if (!ok) console.log(JSON.stringify(outcome, null, 2));
    await sleep(400);
  }

  // Wrong answer must be reported as failed, not error.
  const wrong = await judgeCode({
    language: "python",
    code: "def two_sum(nums, target):\n    return [0, 0]\n",
    signature,
    tests,
  });
  console.log(
    `${wrong.status === "failed" ? "✅" : "❌"} wrong answer -> ${wrong.status}`,
  );
  if (wrong.status !== "failed") failures++;
  await sleep(400);

  // Runtime error must be reported per-test with a useful message.
  const crash = await judgeCode({
    language: "python",
    code: "def two_sum(nums, target):\n    return nums[999]\n",
    signature,
    tests,
  });
  const crashResult = crash.results[0];
  const crashOk =
    crash.status === "error" && /IndexError/.test(crashResult.error ?? "");
  console.log(`${crashOk ? "✅" : "❌"} runtime error -> ${crash.status}`);
  if (!crashOk) {
    failures++;
    console.log(JSON.stringify(crash, null, 2));
  }
  await sleep(400);

  // Java compile error must surface compiler output.
  const compileErr = await judgeCode({
    language: "java",
    code: "class Solution { public int[] twoSum(int[] nums, int target) { return }",
    signature,
    tests,
  });
  console.log(
    `${compileErr.status === "compile_error" ? "✅" : "❌"} compile error -> ${compileErr.status}`,
  );
  if (compileErr.status !== "compile_error") {
    failures++;
    console.log(JSON.stringify(compileErr, null, 2));
  }

  if (failures > 0) {
    console.error(`\n${failures} smoke check(s) failed`);
    process.exit(1);
  }
  console.log("\nAll smoke checks passed");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
