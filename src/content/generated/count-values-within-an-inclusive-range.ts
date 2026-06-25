import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-values-within-an-inclusive-range",
  title: "Count Values Within an Inclusive Range",
  difficulty: "easy",
  category: "foundations",
  order: 3002,
  description: `Given \`nums\`, \`low\`, and \`high\`, return how many values satisfy \`low <= value <= high\`.

\`\`\`text
Example 1:
Input:  nums = [1,4,5,8,10], low = 4, high = 8
Output: 3

Example 2:
Input:  nums = [-5,-2,0,3], low = -3, high = 0
Output: 2
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 1000\`
- \`low <= high\``,
  hints: [
    `This is a filtering/counting pass.`,
    `Check both the lower bound and upper bound for each value.`,
  ],

  signature: {
    "name": "countValuesInRange",
    "params": [
      {
        "name": "nums",
        "type": "int[]"
      },
      {
        "name": "low",
        "type": "int"
      },
      {
        "name": "high",
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
          4,
          5,
          8,
          10
        ],
        4,
        8
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        [
          -5,
          -2,
          0,
          3
        ],
        -3,
        0
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        [],
        1,
        2
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          7,
          7,
          7
        ],
        7,
        7
      ],
      "expected": 3,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          3
        ],
        4,
        6
      ],
      "expected": 0,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_values_in_range(nums: list[int], low: int, high: int) -> int:
    # TODO: implement
    return 0
`,
    javascript: `function countValuesInRange(nums, low, high) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function countValuesInRange(nums: number[], low: number, high: number): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int countValuesInRange(int[] nums, int low, int high) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int countValuesInRange(int* nums, int numsSize, int low, int high) {
    // TODO: implement
    return 0;
}
`,
  },
  solutions: {
    python: `def count_values_in_range(nums: list[int], low: int, high: int) -> int:
    count = 0
    for i in range(len(nums)):
        if low <= nums[i] <= high:
            count += 1
    return count
`,
    javascript: `function countValuesInRange(nums, low, high) {
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] >= low && nums[i] <= high) count++;
    }
    return count;
}
`,
    typescript: `function countValuesInRange(nums: number[], low: number, high: number): number {
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] >= low && nums[i] <= high) count++;
    }
    return count;
}`,
    java: `class Solution {
    public int countValuesInRange(int[] nums, int low, int high) {
        int count = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] >= low && nums[i] <= high) count++;
        }
        return count;
    }
}
`,
    c: `int countValuesInRange(int* nums, int numsSize, int low, int high) {
    int count = 0;
    for (int i = 0; i < numsSize; i++) {
        if (nums[i] >= low && nums[i] <= high) count++;
    }
    return count;
}
`,
  },
  editorial: `Count each value that lies inside the inclusive interval. This is O(n) time and O(1) space.`,
};

export default problem;
