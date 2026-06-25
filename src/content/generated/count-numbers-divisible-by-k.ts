import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-numbers-divisible-by-k",
  title: "Count Numbers Divisible by K",
  difficulty: "easy",
  category: "foundations",
  order: 3001,
  description: `Given an integer array \`nums\` and a positive integer \`k\`, return how many values are divisible by \`k\`.

\`\`\`text
Example 1:
Input:  nums = [3,6,7,10,12], k = 3
Output: 3

Example 2:
Input:  nums = [1,2,3], k = 5
Output: 0
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 1000\`
- \`1 <= k <= 1000\``,
  hints: [
    `Use the remainder operator.`,
    `A number is divisible by \`k\` when \`value % k == 0\`.`,
  ],

  signature: {
    "name": "countDivisibleByK",
    "params": [
      {
        "name": "nums",
        "type": "int[]"
      },
      {
        "name": "k",
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
          3,
          6,
          7,
          10,
          12
        ],
        3
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
        ],
        5
      ],
      "expected": 0,
      "hidden": false
    },
    {
      "input": [
        [],
        2
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          -4,
          0,
          8
        ],
        4
      ],
      "expected": 3,
      "hidden": true
    },
    {
      "input": [
        [
          9
        ],
        3
      ],
      "expected": 1,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_divisible_by_k(nums: list[int], k: int) -> int:
    # TODO: implement
    return 0
`,
    javascript: `function countDivisibleByK(nums, k) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function countDivisibleByK(nums: number[], k: number): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int countDivisibleByK(int[] nums, int k) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int countDivisibleByK(int* nums, int numsSize, int k) {
    // TODO: implement
    return 0;
}
`,
  },
  solutions: {
    python: `def count_divisible_by_k(nums: list[int], k: int) -> int:
    count = 0
    for i in range(len(nums)):
        if nums[i] % k == 0:
            count += 1
    return count
`,
    javascript: `function countDivisibleByK(nums, k) {
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] % k === 0) count++;
    }
    return count;
}
`,
    typescript: `function countDivisibleByK(nums: number[], k: number): number {
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] % k === 0) count++;
    }
    return count;
}`,
    java: `class Solution {
    public int countDivisibleByK(int[] nums, int k) {
        int count = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] % k == 0) count++;
        }
        return count;
    }
}
`,
    c: `int countDivisibleByK(int* nums, int numsSize, int k) {
    int count = 0;
    for (int i = 0; i < numsSize; i++) {
        if (nums[i] % k == 0) count++;
    }
    return count;
}
`,
  },
  editorial: `Loop through the values and test each with the modulo operator. This is O(n) time and O(1) space.`,
};

export default problem;
