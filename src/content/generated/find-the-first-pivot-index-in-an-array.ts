import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "find-the-first-pivot-index-in-an-array",
  title: "Find the First Pivot Index",
  difficulty: "medium",
  category: "arrays-hashing",
  order: 3008,
  description: `Given \`nums\`, return the first index where the sum of values to the left equals the sum of values to the right. If no such index exists, return \`-1\`.

\`\`\`text
Example 1:
Input:  nums = [1,7,3,6,5,6]
Output: 3

Example 2:
Input:  nums = [1,2,3]
Output: -1
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 1000\``,
  hints: [
    `Compute the total sum first.`,
    `While scanning, the right sum is \`total - leftSum - nums[i]\`.`,
  ],

  signature: {
    "name": "pivotIndex",
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
          7,
          3,
          6,
          5,
          6
        ]
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          2,
          3
        ]
      ],
      "expected": -1,
      "hidden": false
    },
    {
      "input": [
        [
          2,
          1,
          -1
        ]
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          0
        ]
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        []
      ],
      "expected": -1,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def pivot_index(nums: list[int]) -> int:
    # TODO: implement
    return 0
`,
    javascript: `function pivotIndex(nums) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function pivotIndex(nums: number[]): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int pivotIndex(int[] nums) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int pivotIndex(int* nums, int numsSize) {
    // TODO: implement
    return 0;
}
`,
  },
  solutions: {
    python: `def pivot_index(nums: list[int]) -> int:
    total = sum(nums)
    left = 0
    for i, value in enumerate(nums):
        if left == total - left - value:
            return i
        left += value
    return -1
`,
    javascript: `function pivotIndex(nums) {
    let total = nums.reduce((a, b) => a + b, 0);
    let left = 0;
    for (let i = 0; i < nums.length; i++) {
        if (left === total - left - nums[i]) return i;
        left += nums[i];
    }
    return -1;
}
`,
    typescript: `function pivotIndex(nums: number[]): number {
    let total = nums.reduce((a, b) => a + b, 0);
    let left = 0;
    for (let i = 0; i < nums.length; i++) {
        if (left === total - left - nums[i]) return i;
        left += nums[i];
    }
    return -1;
}`,
    java: `class Solution {
    public int pivotIndex(int[] nums) {
        int total = 0;
        for (int value : nums) total += value;
        int left = 0;
        for (int i = 0; i < nums.length; i++) {
            if (left == total - left - nums[i]) return i;
            left += nums[i];
        }
        return -1;
    }
}
`,
    c: `int pivotIndex(int* nums, int numsSize) {
    int total = 0;
    for (int i = 0; i < numsSize; i++) total += nums[i];
    int left = 0;
    for (int i = 0; i < numsSize; i++) {
        if (left == total - left - nums[i]) return i;
        left += nums[i];
    }
    return -1;
}
`,
  },
  editorial: `Use the total sum to compute the right side in O(1) while scanning left to right. The first match is the answer.`,
};

export default problem;
