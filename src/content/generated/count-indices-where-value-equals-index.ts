import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-indices-where-value-equals-index",
  title: "Count Indices Where Value Equals Index",
  difficulty: "easy",
  category: "arrays-hashing",
  order: 3009,
  description: `Given \`nums\`, return how many indices \`i\` satisfy \`nums[i] == i\`.

\`\`\`text
Example 1:
Input:  nums = [0,2,2,3]
Output: 3

Example 2:
Input:  nums = [1,1,1]
Output: 1
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 1000\``,
  hints: [
    `You need both the index and value.`,
    `Compare each value to its current index.`,
  ],

  signature: {
    "name": "countValueEqualsIndex",
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
          2,
          2,
          3
        ]
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          1,
          1
        ]
      ],
      "expected": 1,
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
          0
        ]
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          5,
          6
        ]
      ],
      "expected": 0,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_value_equals_index(nums: list[int]) -> int:
    # TODO: implement
    return 0
`,
    javascript: `function countValueEqualsIndex(nums) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function countValueEqualsIndex(nums: number[]): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int countValueEqualsIndex(int[] nums) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int countValueEqualsIndex(int* nums, int numsSize) {
    // TODO: implement
    return 0;
}
`,
  },
  solutions: {
    python: `def count_value_equals_index(nums: list[int]) -> int:
    count = 0
    for i in range(len(nums)):
        if nums[i] == i:
            count += 1
    return count
`,
    javascript: `function countValueEqualsIndex(nums) {
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === i) count++;
    }
    return count;
}
`,
    typescript: `function countValueEqualsIndex(nums: number[]): number {
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === i) count++;
    }
    return count;
}`,
    java: `class Solution {
    public int countValueEqualsIndex(int[] nums) {
        int count = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == i) count++;
        }
        return count;
    }
}
`,
    c: `int countValueEqualsIndex(int* nums, int numsSize) {
    int count = 0;
    for (int i = 0; i < numsSize; i++) {
        if (nums[i] == i) count++;
    }
    return count;
}
`,
  },
  editorial: `Scan with an index and count positions where the stored value equals that index.`,
};

export default problem;
