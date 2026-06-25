import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "sum-absolute-values-in-an-integer-array",
  title: "Sum Absolute Values",
  difficulty: "easy",
  category: "foundations",
  order: 3003,
  description: `Given an integer array \`nums\`, return the sum of the absolute values of all elements.

\`\`\`text
Example 1:
Input:  nums = [-3,4,-5]
Output: 12

Example 2:
Input:  nums = [0,0]
Output: 0
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 1000\`
- \`-1000 <= nums[i] <= 1000\``,
  hints: [
    `Convert each value to its non-negative magnitude before adding it.`,
    `Most languages provide an absolute-value helper, but a conditional also works.`,
  ],

  signature: {
    "name": "sumAbsoluteValues",
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
          -3,
          4,
          -5
        ]
      ],
      "expected": 12,
      "hidden": false
    },
    {
      "input": [
        [
          0,
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
          7
        ]
      ],
      "expected": 7,
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
      "expected": 6,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def sum_absolute_values(nums: list[int]) -> int:
    # TODO: implement
    return 0
`,
    javascript: `function sumAbsoluteValues(nums) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function sumAbsoluteValues(nums: number[]): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int sumAbsoluteValues(int[] nums) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int sumAbsoluteValues(int* nums, int numsSize) {
    // TODO: implement
    return 0;
}
`,
  },
  solutions: {
    python: `def sum_absolute_values(nums: list[int]) -> int:
    total = 0
    for value in nums:
        total += abs(value)
    return total
`,
    javascript: `function sumAbsoluteValues(nums) {
    let total = 0;
    for (const value of nums) total += Math.abs(value);
    return total;
}
`,
    typescript: `function sumAbsoluteValues(nums: number[]): number {
    let total = 0;
    for (const value of nums) total += Math.abs(value);
    return total;
}`,
    java: `class Solution {
    public int sumAbsoluteValues(int[] nums) {
        int total = 0;
        for (int value : nums) total += Math.abs(value);
        return total;
    }
}
`,
    c: `int sumAbsoluteValues(int* nums, int numsSize) {
    int total = 0;
    for (int i = 0; i < numsSize; i++) total += nums[i] < 0 ? -nums[i] : nums[i];
    return total;
}
`,
  },
  editorial: `Take the absolute value of each element and add it to a running total. This is O(n) time and O(1) space.`,
};

export default problem;
