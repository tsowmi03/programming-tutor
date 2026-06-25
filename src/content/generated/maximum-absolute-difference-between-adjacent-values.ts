import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "maximum-absolute-difference-between-adjacent-values",
  title: "Maximum Adjacent Absolute Difference",
  difficulty: "easy",
  category: "arrays-hashing",
  order: 3007,
  description: `Given an integer array \`nums\`, return the largest absolute difference between two adjacent values. If there are fewer than two values, return \`0\`.

\`\`\`text
Example 1:
Input:  nums = [4,1,7,6]
Output: 6

Example 2:
Input:  nums = [5]
Output: 0
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 1000\``,
  hints: [
    `Adjacent means positions next to each other.`,
    `Track the maximum of \`abs(nums[i] - nums[i - 1])\`.`,
  ],

  signature: {
    "name": "maxAdjacentDifference",
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
          4,
          1,
          7,
          6
        ]
      ],
      "expected": 6,
      "hidden": false
    },
    {
      "input": [
        [
          5
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
          -2,
          -8,
          1
        ]
      ],
      "expected": 9,
      "hidden": true
    },
    {
      "input": [
        [
          3,
          3,
          3
        ]
      ],
      "expected": 0,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def max_adjacent_difference(nums: list[int]) -> int:
    # TODO: implement
    return 0
`,
    javascript: `function maxAdjacentDifference(nums) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function maxAdjacentDifference(nums: number[]): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int maxAdjacentDifference(int[] nums) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int maxAdjacentDifference(int* nums, int numsSize) {
    // TODO: implement
    return 0;
}
`,
  },
  solutions: {
    python: `def max_adjacent_difference(nums: list[int]) -> int:
    best = 0
    for i in range(1, len(nums)):
        best = max(best, abs(nums[i] - nums[i - 1]))
    return best
`,
    javascript: `function maxAdjacentDifference(nums) {
    let best = 0;
    for (let i = 1; i < nums.length; i++) best = Math.max(best, Math.abs(nums[i] - nums[i - 1]));
    return best;
}
`,
    typescript: `function maxAdjacentDifference(nums: number[]): number {
    let best = 0;
    for (let i = 1; i < nums.length; i++) best = Math.max(best, Math.abs(nums[i] - nums[i - 1]));
    return best;
}`,
    java: `class Solution {
    public int maxAdjacentDifference(int[] nums) {
        int best = 0;
        for (int i = 1; i < nums.length; i++) best = Math.max(best, Math.abs(nums[i] - nums[i - 1]));
        return best;
    }
}
`,
    c: `int maxAdjacentDifference(int* nums, int numsSize) {
    int best = 0;
    for (int i = 1; i < numsSize; i++) {
        int diff = nums[i] - nums[i - 1];
        if (diff < 0) diff = -diff;
        if (diff > best) best = diff;
    }
    return best;
}
`,
  },
  editorial: `Scan adjacent pairs and keep the largest absolute difference. This is O(n) time and O(1) space.`,
};

export default problem;
