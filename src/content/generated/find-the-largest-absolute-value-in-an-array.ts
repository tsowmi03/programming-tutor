import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "find-the-largest-absolute-value-in-an-array",
  title: "Largest Absolute Value",
  difficulty: "easy",
  category: "foundations",
  order: 3004,
  description: `Given an integer array \`nums\`, return the largest absolute value in the array. If the array is empty, return \`0\`.

\`\`\`text
Example 1:
Input:  nums = [-2,5,-9,1]
Output: 9

Example 2:
Input:  nums = [0,3,-3]
Output: 3
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 1000\``,
  hints: [
    `Track the best magnitude seen so far.`,
    `Compare absolute values, not raw values.`,
  ],

  signature: {
    "name": "largestAbsoluteValue",
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
          -2,
          5,
          -9,
          1
        ]
      ],
      "expected": 9,
      "hidden": false
    },
    {
      "input": [
        [
          0,
          3,
          -3
        ]
      ],
      "expected": 3,
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
          -7
        ]
      ],
      "expected": 7,
      "hidden": true
    },
    {
      "input": [
        [
          4,
          2
        ]
      ],
      "expected": 4,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def largest_absolute_value(nums: list[int]) -> int:
    # TODO: implement
    return 0
`,
    javascript: `function largestAbsoluteValue(nums) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function largestAbsoluteValue(nums: number[]): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int largestAbsoluteValue(int[] nums) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int largestAbsoluteValue(int* nums, int numsSize) {
    // TODO: implement
    return 0;
}
`,
  },
  solutions: {
    python: `def largest_absolute_value(nums: list[int]) -> int:
    best = 0
    for value in nums:
        best = max(best, abs(value))
    return best
`,
    javascript: `function largestAbsoluteValue(nums) {
    let best = 0;
    for (const value of nums) best = Math.max(best, Math.abs(value));
    return best;
}
`,
    typescript: `function largestAbsoluteValue(nums: number[]): number {
    let best = 0;
    for (const value of nums) best = Math.max(best, Math.abs(value));
    return best;
}`,
    java: `class Solution {
    public int largestAbsoluteValue(int[] nums) {
        int best = 0;
        for (int value : nums) best = Math.max(best, Math.abs(value));
        return best;
    }
}
`,
    c: `int largestAbsoluteValue(int* nums, int numsSize) {
    int best = 0;
    for (int i = 0; i < numsSize; i++) {
        int mag = nums[i] < 0 ? -nums[i] : nums[i];
        if (mag > best) best = mag;
    }
    return best;
}
`,
  },
  editorial: `A single pass is enough: compute each magnitude and keep the maximum. Empty input returns the initial value \`0\`.`,
};

export default problem;
