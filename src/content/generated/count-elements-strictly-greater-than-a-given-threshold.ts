import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-elements-strictly-greater-than-a-given-threshold",
  title: "Count Elements Above Threshold",
  difficulty: "easy",
  category: "foundations",
  order: 1012,
  description: `Given an integer array \`nums\` and an integer \`threshold\`, return the **count** of elements in \`nums\` that are **strictly greater than** \`threshold\`.

\`\`\`text
Example 1:
Input:  nums = [1, 2, 3, 4, 5], threshold = 3
Output: 2
Explanation: Only 4 and 5 are strictly greater than 3.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [5, 5, 5], threshold = 5
Output: 0
Explanation: No element is strictly greater than 5 (equal does not count).
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [-3, -2, -1, 0, 1], threshold = -2
Output: 3
Explanation: -1, 0, and 1 are all strictly greater than -2.
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 10^4\`
- \`-10^6 <= nums[i] <= 10^6\`
- \`-10^6 <= threshold <= 10^6\``,
  hints: [
    `Loop through every element in the array one by one.`,
    `Use a counter variable that you increment whenever an element satisfies the condition.`,
    `Remember: 'strictly greater than' means elements equal to the threshold do NOT count.`,
    `Think about edge cases: what if the array is empty? The answer should naturally be 0.`,
  ],
  signature: {
    "name": "countGreaterThan",
    "params": [
      {
        "name": "nums",
        "type": "int[]"
      },
      {
        "name": "threshold",
        "type": "int"
      }
    ],
    "returns": "int",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        [
          1,
          2,
          3,
          4,
          5
        ],
        3
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        [
          10,
          20,
          30
        ],
        15
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        [
          5,
          5,
          5
        ],
        5
      ],
      "expected": 0,
      "hidden": false
    },
    {
      "input": [
        [],
        10
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          1
        ],
        0
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          -3,
          -2,
          -1,
          0,
          1
        ],
        -2
      ],
      "expected": 3,
      "hidden": true
    },
    {
      "input": [
        [
          100,
          200,
          300
        ],
        300
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          3,
          4,
          5
        ],
        0
      ],
      "expected": 5,
      "hidden": true
    },
    {
      "input": [
        [
          7,
          7,
          7,
          7
        ],
        6
      ],
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          3,
          5,
          7,
          9
        ],
        4
      ],
      "expected": 3,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_greater_than(nums: list[int], threshold: int) -> int:
    # TODO: count elements strictly greater than threshold
    return 0
`,
    javascript: `/**
 * @param {number[]} nums
 * @param {number} threshold
 * @return {number}
 */
function countGreaterThan(nums, threshold) {
    // TODO: count elements strictly greater than threshold
    return 0;
}
`,
    java: `class Solution {
    public int countGreaterThan(int[] nums, int threshold) {
        // TODO: count elements strictly greater than threshold
        return 0;
    }
}
`,
    c: `int countGreaterThan(int* nums, int numsSize, int threshold) {
    /* TODO: count elements strictly greater than threshold */
    return 0;
}
`,
  },
  solutions: {
    python: `def count_greater_than(nums: list[int], threshold: int) -> int:
    count = 0
    for x in nums:
        if x > threshold:
            count += 1
    return count
`,
    javascript: `function countGreaterThan(nums, threshold) {
    let count = 0;
    for (const x of nums) {
        if (x > threshold) count++;
    }
    return count;
}
`,
    java: `class Solution {
    public int countGreaterThan(int[] nums, int threshold) {
        int count = 0;
        for (int x : nums) {
            if (x > threshold) count++;
        }
        return count;
    }
}
`,
    c: `int countGreaterThan(int* nums, int numsSize, int threshold) {
    int count = 0;
    for (int i = 0; i < numsSize; i++) {
        if (nums[i] > threshold) count++;
    }
    return count;
}
`,
  },
  editorial: `## Approach: Linear Scan

The simplest and most direct approach is to iterate through every element of the array once, comparing each element to the threshold.

### Algorithm
1. Initialize a counter \`count = 0\`.
2. For each element \`x\` in \`nums\`:
   - If \`x > threshold\` (strictly), increment \`count\`.
3. Return \`count\`.

### Why it works
We check every element exactly once. An element qualifies if and only if it is **strictly** greater than the threshold — equal values are excluded by using \`>\` rather than \`>=\`.

### Complexity
- **Time:** O(n) — single pass through the array.
- **Space:** O(1) — only one integer counter is used regardless of input size.

### Edge cases
- Empty array (\`n = 0\`): the loop body never executes, so \`count\` stays 0. ✓
- All elements equal to threshold: none pass the \`>\` check, result is 0. ✓
- All elements greater than threshold: every element is counted, result is \`n\`. ✓`,
};

export default problem;
