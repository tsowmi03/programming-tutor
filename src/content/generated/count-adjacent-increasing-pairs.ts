import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-adjacent-increasing-pairs",
  title: "Count Adjacent Increasing Pairs",
  difficulty: "easy",
  category: "arrays-hashing",
  order: 3005,
  description: `Given an integer array \`nums\`, count adjacent index pairs \`(i - 1, i)\` where \`nums[i] > nums[i - 1]\`.

\`\`\`text
Example 1:
Input:  nums = [1,3,2,4]
Output: 2

Example 2:
Input:  nums = [5,4,3]
Output: 0
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 1000\``,
  hints: [
    `Start from index 1.`,
    `Compare each value with the value immediately before it.`,
  ],

  signature: {
    "name": "countIncreasingPairs",
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
          3,
          2,
          4
        ]
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        [
          5,
          4,
          3
        ]
      ],
      "expected": 0,
      "hidden": false
    },
    {
      "input": [
        [
          1
        ]
      ],
      "expected": 0,
      "hidden": true
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
          1,
          2,
          3,
          4
        ]
      ],
      "expected": 3,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_increasing_pairs(nums: list[int]) -> int:
    # TODO: implement
    return 0
`,
    javascript: `function countIncreasingPairs(nums) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function countIncreasingPairs(nums: number[]): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int countIncreasingPairs(int[] nums) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int countIncreasingPairs(int* nums, int numsSize) {
    // TODO: implement
    return 0;
}
`,
  },
  solutions: {
    python: `def count_increasing_pairs(nums: list[int]) -> int:
    count = 0
    for i in range(len(nums)):
        if i > 0 and nums[i] > nums[i - 1]:
            count += 1
    return count
`,
    javascript: `function countIncreasingPairs(nums) {
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i > 0 && nums[i] > nums[i - 1]) count++;
    }
    return count;
}
`,
    typescript: `function countIncreasingPairs(nums: number[]): number {
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i > 0 && nums[i] > nums[i - 1]) count++;
    }
    return count;
}`,
    java: `class Solution {
    public int countIncreasingPairs(int[] nums) {
        int count = 0;
        for (int i = 0; i < nums.length; i++) {
            if (i > 0 && nums[i] > nums[i - 1]) count++;
        }
        return count;
    }
}
`,
    c: `int countIncreasingPairs(int* nums, int numsSize) {
    int count = 0;
    for (int i = 0; i < numsSize; i++) {
        if (i > 0 && nums[i] > nums[i - 1]) count++;
    }
    return count;
}
`,
  },
  editorial: `Compare each element to its predecessor and count the increasing transitions. This is O(n) time.`,
};

export default problem;
