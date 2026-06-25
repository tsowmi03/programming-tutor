import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-peaks-in-an-integer-array",
  title: "Count Peaks in an Integer Array",
  difficulty: "easy",
  category: "arrays-hashing",
  order: 3006,
  description: `Given \`nums\`, return how many interior positions are strictly greater than both immediate neighbours.

\`\`\`text
Example 1:
Input:  nums = [1,3,2,4,1]
Output: 2

Example 2:
Input:  nums = [1,2,3]
Output: 0
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 1000\``,
  hints: [
    `The first and last elements cannot be peaks under this definition.`,
    `Check \`nums[i - 1]\`, \`nums[i]\`, and \`nums[i + 1]\` together.`,
  ],

  signature: {
    "name": "countPeaks",
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
          4,
          1
        ]
      ],
      "expected": 2,
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
      "expected": 0,
      "hidden": false
    },
    {
      "input": [
        [
          3,
          1,
          3
        ]
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          5,
          1
        ]
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          3
        ]
      ],
      "expected": 0,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_peaks(nums: list[int]) -> int:
    # TODO: implement
    return 0
`,
    javascript: `function countPeaks(nums) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function countPeaks(nums: number[]): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int countPeaks(int[] nums) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int countPeaks(int* nums, int numsSize) {
    // TODO: implement
    return 0;
}
`,
  },
  solutions: {
    python: `def count_peaks(nums: list[int]) -> int:
    count = 0
    for i in range(len(nums)):
        if 0 < i < len(nums) - 1 and nums[i] > nums[i - 1] and nums[i] > nums[i + 1]:
            count += 1
    return count
`,
    javascript: `function countPeaks(nums) {
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i > 0 && i < nums.length - 1 && nums[i] > nums[i - 1] && nums[i] > nums[i + 1]) count++;
    }
    return count;
}
`,
    typescript: `function countPeaks(nums: number[]): number {
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i > 0 && i < nums.length - 1 && nums[i] > nums[i - 1] && nums[i] > nums[i + 1]) count++;
    }
    return count;
}`,
    java: `class Solution {
    public int countPeaks(int[] nums) {
        int count = 0;
        for (int i = 0; i < nums.length; i++) {
            if (i > 0 && i < nums.length - 1 && nums[i] > nums[i - 1] && nums[i] > nums[i + 1]) count++;
        }
        return count;
    }
}
`,
    c: `int countPeaks(int* nums, int numsSize) {
    int count = 0;
    for (int i = 0; i < numsSize; i++) {
        if (i > 0 && i < numsSize - 1 && nums[i] > nums[i - 1] && nums[i] > nums[i + 1]) count++;
    }
    return count;
}
`,
  },
  editorial: `Only interior indices can be peaks. A linear scan with neighbour comparisons solves the problem in O(n).`,
};

export default problem;
