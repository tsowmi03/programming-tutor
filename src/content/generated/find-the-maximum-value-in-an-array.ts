import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "find-the-maximum-value-in-an-array",
  title: "Find the Maximum Value in an Array",
  difficulty: "easy",
  category: "foundations",
  order: 1001,
  description: `Given an integer array \`nums\`, return the **maximum** value present in the array.

\`\`\`text
Example 1:
Input:  nums = [3, 1, 4, 1, 5, 9, 2, 6]
Output: 9
Explanation: 9 is the largest number in the array.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [-5, -3, -1, -4]
Output: -1
Explanation: -1 is the largest (least-negative) number.
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 10^4\`
- \`-10^5 <= nums[i] <= 10^5\``,
  hints: [
    `Start by treating the first element as the current maximum.`,
    `Scan through the remaining elements one by one — can any beat the current maximum?`,
    `Each time you find a larger value, update your tracked maximum before moving on.`,
  ],
  signature: {
    "name": "findMax",
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
          3,
          1,
          4,
          1,
          5,
          9,
          2,
          6
        ]
      ],
      "expected": 9,
      "hidden": false
    },
    {
      "input": [
        [
          -5,
          -3,
          -1,
          -4
        ]
      ],
      "expected": -1,
      "hidden": false
    },
    {
      "input": [
        [
          42
        ]
      ],
      "expected": 42,
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
      "hidden": true
    },
    {
      "input": [
        [
          -100,
          0,
          100
        ]
      ],
      "expected": 100,
      "hidden": true
    },
    {
      "input": [
        [
          7,
          7,
          7,
          7
        ]
      ],
      "expected": 7,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          3,
          4,
          5
        ]
      ],
      "expected": 5,
      "hidden": true
    },
    {
      "input": [
        [
          5,
          4,
          3,
          2,
          1
        ]
      ],
      "expected": 5,
      "hidden": true
    },
    {
      "input": [
        [
          -1
        ]
      ],
      "expected": -1,
      "hidden": true
    },
    {
      "input": [
        [
          10,
          -10,
          10,
          -10,
          11
        ]
      ],
      "expected": 11,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def find_max(nums):
    # TODO: implement
    return 0
`,
    javascript: `function findMax(nums) {
    // TODO: implement
    return 0;
}
`,
    java: `class Solution {
    public int findMax(int[] nums) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int findMax(int* nums, int numsSize) {
    /* TODO: implement */
    return 0;
}
`,
  },
  solutions: {
    python: `def find_max(nums):
    max_val = nums[0]
    for num in nums:
        if num > max_val:
            max_val = num
    return max_val
`,
    javascript: `function findMax(nums) {
    let maxVal = nums[0];
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > maxVal) {
            maxVal = nums[i];
        }
    }
    return maxVal;
}
`,
    java: `class Solution {
    public int findMax(int[] nums) {
        int maxVal = nums[0];
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] > maxVal) {
                maxVal = nums[i];
            }
        }
        return maxVal;
    }
}
`,
    c: `int findMax(int* nums, int numsSize) {
    int maxVal = nums[0];
    int i;
    for (i = 1; i < numsSize; i++) {
        if (nums[i] > maxVal) {
            maxVal = nums[i];
        }
    }
    return maxVal;
}
`,
  },
  editorial: `## Approach: Single Linear Scan

The key insight is that we only need to remember **one value** — the largest we have seen so far.

### Algorithm
1. **Initialise** \`maxVal\` to \`nums[0]\` (the first element).
2. **Iterate** over every subsequent element \`nums[i]\`.
3. **Update**: if \`nums[i] > maxVal\`, set \`maxVal = nums[i]\`.
4. **Return** \`maxVal\` after the loop ends.

This guarantees that \`maxVal\` always holds the largest value among all elements visited so far.

### Complexity
- **Time:** O(n) — every element is visited exactly once.
- **Space:** O(1) — only a single extra variable is used regardless of input size.`,
};

export default problem;
