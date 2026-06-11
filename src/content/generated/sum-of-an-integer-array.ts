import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "sum-of-an-integer-array",
  title: "Sum of an Integer Array",
  difficulty: "easy",
  category: "foundations",
  order: 1000,
  description: `Given an integer array \`nums\`, return the **sum** of all its elements.

If the array is empty, return \`0\`.

\`\`\`text
Example 1:
Input:  nums = [1, 2, 3, 4, 5]
Output: 15
Explanation: 1 + 2 + 3 + 4 + 5 = 15
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [10, -10, 5]
Output: 5
Explanation: 10 + (-10) + 5 = 5
\`\`\`

\`\`\`text
Example 3:
Input:  nums = []
Output: 0
Explanation: No elements, so the sum is 0.
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 1000\`
- \`-1000 <= nums[i] <= 1000\``,
  hints: [
    `Start with a variable initialized to 0 to hold the running total.`,
    `Iterate through each element of the array and add it to your running total.`,
    `Don't forget the edge case where the array might be empty — what should you return then?`,
  ],
  signature: {
    "name": "arraySum",
    "params": [
      {
        "name": "nums",
        "type": "int[]"
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
        ]
      ],
      "expected": 15,
      "hidden": false
    },
    {
      "input": [
        [
          10,
          -10,
          5
        ]
      ],
      "expected": 5,
      "hidden": false
    },
    {
      "input": [
        [
          0
        ]
      ],
      "expected": 0,
      "hidden": false
    },
    {
      "input": [
        []
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          -1,
          -2,
          -3
        ]
      ],
      "expected": -6,
      "hidden": true
    },
    {
      "input": [
        [
          100,
          200,
          300
        ]
      ],
      "expected": 600,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          1,
          1,
          1,
          1
        ]
      ],
      "expected": 5,
      "hidden": true
    },
    {
      "input": [
        [
          -100,
          100
        ]
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          42
        ]
      ],
      "expected": 42,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def array_sum(nums: list[int]) -> int:
    # TODO: return the sum of all elements in nums
    return 0
`,
    javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function arraySum(nums) {
    // TODO: return the sum of all elements in nums
    return 0;
}
`,
    java: `class Solution {
    public int arraySum(int[] nums) {
        // TODO: return the sum of all elements in nums
        return 0;
    }
}
`,
    c: `int arraySum(int* nums, int numsSize) {
    /* TODO: return the sum of all elements in nums */
    return 0;
}
`,
  },
  solutions: {
    python: `def array_sum(nums: list[int]) -> int:
    total = 0
    for n in nums:
        total += n
    return total
`,
    javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function arraySum(nums) {
    let total = 0;
    for (let i = 0; i < nums.length; i++) {
        total += nums[i];
    }
    return total;
}
`,
    java: `class Solution {
    public int arraySum(int[] nums) {
        int total = 0;
        for (int n : nums) {
            total += n;
        }
        return total;
    }
}
`,
    c: `int arraySum(int* nums, int numsSize) {
    int total = 0;
    for (int i = 0; i < numsSize; i++) {
        total += nums[i];
    }
    return total;
}
`,
  },
  editorial: `## Approach: Linear Scan

The simplest correct approach is to iterate over every element once, keeping a running total.

### Algorithm
1. Initialize \`total = 0\`.
2. For each element \`x\` in \`nums\`, add \`x\` to \`total\`.
3. Return \`total\`.

The empty-array edge case is handled naturally: the loop body never executes, so \`total\` remains \`0\`.

### Complexity
- **Time:** O(n) — we visit each element exactly once.
- **Space:** O(1) — only a single integer accumulator is needed regardless of input size.`,
};

export default problem;
