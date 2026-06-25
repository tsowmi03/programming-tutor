import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-non-zero-values-in-an-integer-array",
  title: "Count Non-Zero Values",
  difficulty: "easy",
  category: "foundations",
  order: 3000,
  description: `Given an integer array \`nums\`, return how many values are not equal to zero.

\`\`\`text
Example 1:
Input:  nums = [0,1,2,0,-3]
Output: 3

Example 2:
Input:  nums = [0,0,0]
Output: 0
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 1000\`
- \`-1000 <= nums[i] <= 1000\``,
  hints: [
    `Scan the array once.`,
    `Increment a counter only when the current value is not zero.`,
  ],

  signature: {
    "name": "countNonZeroValues",
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
          0,
          1,
          2,
          0,
          -3
        ]
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        [
          0,
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
          -1,
          -2
        ]
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        [
          5
        ]
      ],
      "expected": 1,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_non_zero_values(nums: list[int]) -> int:
    # TODO: implement
    return 0
`,
    javascript: `function countNonZeroValues(nums) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function countNonZeroValues(nums: number[]): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int countNonZeroValues(int[] nums) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int countNonZeroValues(int* nums, int numsSize) {
    // TODO: implement
    return 0;
}
`,
  },
  solutions: {
    python: `def count_non_zero_values(nums: list[int]) -> int:
    count = 0
    for i in range(len(nums)):
        if nums[i] != 0:
            count += 1
    return count
`,
    javascript: `function countNonZeroValues(nums) {
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) count++;
    }
    return count;
}
`,
    typescript: `function countNonZeroValues(nums: number[]): number {
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) count++;
    }
    return count;
}`,
    java: `class Solution {
    public int countNonZeroValues(int[] nums) {
        int count = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != 0) count++;
        }
        return count;
    }
}
`,
    c: `int countNonZeroValues(int* nums, int numsSize) {
    int count = 0;
    for (int i = 0; i < numsSize; i++) {
        if (nums[i] != 0) count++;
    }
    return count;
}
`,
  },
  editorial: `Scan the array and count the elements whose value is not zero. This is O(n) time and O(1) space.`,
};

export default problem;
