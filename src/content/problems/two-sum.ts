import type { CodeProblemDef } from "../types";

export const twoSum: CodeProblemDef = {
  type: "code",
  slug: "two-sum",
  title: "Two Sum",
  difficulty: "easy",
  category: "arrays-hashing",
  order: 1,
  description: `Given an array of integers \`nums\` and an integer \`target\`, return the **indices** of the two numbers that add up to \`target\`, in ascending order.

Each input has **exactly one solution**, and you may not use the same element twice.

**Example 1**

\`\`\`text
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: nums[0] + nums[1] = 2 + 7 = 9
\`\`\`

**Example 2**

\`\`\`text
Input: nums = [3,2,4], target = 6
Output: [1,2]
\`\`\`

**Constraints**

- \`2 <= nums.length <= 10000\`
- \`-1000000 <= nums[i] <= 1000000\`
- Exactly one valid answer exists.

**Follow-up:** the brute-force solution checks every pair in O(n²). Can you do it in a single pass?
`,
  hints: [
    "For each number `x`, you are really looking for whether `target - x` exists elsewhere in the array.",
    "A hash map gives O(1) average lookups. What would you store as keys, and what as values?",
    "Walk the array once: before inserting the current number, check whether its complement is already in the map. This also guarantees you never reuse the same index.",
  ],
  signature: {
    name: "twoSum",
    params: [
      { name: "nums", type: "int[]" },
      { name: "target", type: "int" },
    ],
    returns: "int[]",
  },
  testCases: [
    { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
    { input: [[3, 2, 4], 6], expected: [1, 2] },
    { input: [[3, 3], 6], expected: [0, 1] },
    { input: [[-1, -2, -3, -4, -5], -8], expected: [2, 4], hidden: true },
    { input: [[0, 4, 3, 0], 0], expected: [0, 3], hidden: true },
    { input: [[1, 5, 9, 2], 11], expected: [2, 3], hidden: true },
    {
      input: [[5, 75, 25, 90, 1, 14, 30], 104],
      expected: [3, 5],
      hidden: true,
    },
  ],
  starterCode: {
    python: `def two_sum(nums, target):
    """Return the indices of the two numbers that add up to target,
    in ascending order."""
    # Your code here
    pass
`,
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]} indices in ascending order
 */
function twoSum(nums, target) {
  // Your code here
}
`,
    java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        return new int[]{};
    }
}
`,
    c: `/**
 * Return a heap-allocated array of the two indices (ascending).
 * Set *returnSize to 2.
 */
int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    // Your code here
    *returnSize = 0;
    return NULL;
}
`,
  },
  solutions: {
    python: `def two_sum(nums, target):
    seen = {}  # value -> index
    for i, n in enumerate(nums):
        complement = target - n
        if complement in seen:
            return [seen[complement], i]
        seen[n] = i
    return []
`,
    javascript: `function twoSum(nums, target) {
  const seen = new Map(); // value -> index
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement), i];
    seen.set(nums[i], i);
  }
  return [];
}
`,
    java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>(); // value -> index
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (seen.containsKey(complement)) {
                return new int[]{seen.get(complement), i};
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
                out[0] = i;
                out[1] = j;
                *returnSize = 2;
                return out;
            }
        }
    }
    *returnSize = 0;
    return out;
}
`,
  },
  editorial: `## Approach: one-pass hash map

The brute force checks all pairs — O(n²). The key insight: while scanning,
for each number \`x\` you already know exactly what its partner must be:
\`target - x\` (the *complement*).

Keep a hash map from **value → index** of the numbers seen so far. For each
element, first look up its complement; if present, you have your pair. Then
insert the current number and move on.

Checking *before* inserting elegantly handles duplicates like
\`nums = [3,3], target = 6\` and guarantees you never match an element with
itself.

\`\`\`python
def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        if target - n in seen:
            return [seen[target - n], i]
        seen[n] = i
\`\`\`

**Complexity:** O(n) time — each element is processed once with O(1) average
map operations — and O(n) space.

> The C reference solution shown here uses the O(n²) scan for simplicity,
> since C has no built-in hash map. Writing one (or sorting index pairs) is a
> good extra exercise.
`,
};
