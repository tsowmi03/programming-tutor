import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "house-robber-max-non-adjacent-sum",
  title: "House Robber: Max Non-Adjacent Sum",
  difficulty: "medium",
  category: "recursion-dp",
  order: 1145,
  description: `You are a robber planning to rob houses along a street. Each house has a certain amount of money stored in it. You **cannot** rob two adjacent houses (i.e., houses at consecutive indices), because doing so will trigger the alarm.

Given an integer array \`nums\` where \`nums[i]\` represents the amount of money in the \`i\`-th house, return the **maximum amount of money** you can rob without robbing two adjacent houses.

If the array is empty, return \`0\`.

\`\`\`text
Example 1:
Input:  nums = [2, 7, 9, 3, 1]
Output: 12
Explanation: Rob house 0 (2) + house 2 (9) + house 4 (1) = 12.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [2, 1, 1, 2]
Output: 4
Explanation: Rob house 0 (2) + house 3 (2) = 4.
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [5]
Output: 5
Explanation: Only one house, rob it.
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 10^4\`
- \`0 <= nums[i] <= 400\``,
  hints: [
    `Think about what the optimal choice is for the last house: either you rob it (and add it to the best solution for all houses two steps back) or you skip it (and take the best solution for all houses one step back).`,
    `Define dp[i] as the maximum money you can rob from the first i houses. How does dp[i] relate to dp[i-1] and dp[i-2]?`,
    `You only ever look back two steps, so you can reduce space to O(1) by keeping just two variables instead of a full array.`,
  ],
  signature: {
    "name": "rob",
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
          2,
          7,
          9,
          3,
          1
        ]
      ],
      "expected": 12,
      "hidden": false
    },
    {
      "input": [
        [
          2,
          1,
          1,
          2
        ]
      ],
      "expected": 4,
      "hidden": false
    },
    {
      "input": [
        [
          5
        ]
      ],
      "expected": 5,
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
          0,
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
          400,
          400,
          400,
          400,
          400
        ]
      ],
      "expected": 1200,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          3,
          1
        ]
      ],
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        [
          2,
          1
        ]
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        [
          10,
          1,
          1,
          10,
          1,
          1,
          10
        ]
      ],
      "expected": 30,
      "hidden": true
    },
    {
      "input": [
        [
          5,
          3,
          4,
          11,
          2
        ]
      ],
      "expected": 16,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def rob(nums):
    # TODO: implement house robber DP
    pass
`,
    javascript: `function rob(nums) {
    // TODO: implement house robber DP
}
`,
    java: `class Solution {
    public int rob(int[] nums) {
        // TODO: implement house robber DP
        return 0;
    }
}
`,
    c: `int rob(int* nums, int numsSize) {
    // TODO: implement house robber DP
    return 0;
}
`,
  },
  solutions: {
    python: `def rob(nums):
    if not nums:
        return 0
    prev2 = 0
    prev1 = 0
    for n in nums:
        curr = max(prev1, prev2 + n)
        prev2 = prev1
        prev1 = curr
    return prev1
`,
    javascript: `function rob(nums) {
    if (nums.length === 0) return 0;
    let prev2 = 0;
    let prev1 = 0;
    for (const n of nums) {
        const curr = Math.max(prev1, prev2 + n);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}
`,
    java: `class Solution {
    public int rob(int[] nums) {
        if (nums.length == 0) return 0;
        int prev2 = 0, prev1 = 0;
        for (int n : nums) {
            int curr = Math.max(prev1, prev2 + n);
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
}
`,
    c: `int rob(int* nums, int numsSize) {
    if (numsSize == 0) return 0;
    int prev2 = 0, prev1 = 0;
    for (int i = 0; i < numsSize; i++) {
        int curr = prev1 > prev2 + nums[i] ? prev1 : prev2 + nums[i];
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}
`,
  },
  editorial: `## Approach: Dynamic Programming with O(1) Space

### Intuition
For each house \`i\`, we have two choices:
1. **Skip** house \`i\` → best profit is whatever we got up to house \`i-1\`.
2. **Rob** house \`i\` → best profit is \`nums[i]\` plus whatever we got up to house \`i-2\` (we must skip \`i-1\`).

So \`dp[i] = max(dp[i-1], dp[i-2] + nums[i])\`.

### Space Optimization
Since \`dp[i]\` only depends on the previous two values, we can replace the array with two variables \`prev1\` (dp[i-1]) and \`prev2\` (dp[i-2]).

\`\`\`
prev2 = 0, prev1 = 0
for each num in nums:
    curr  = max(prev1, prev2 + num)
    prev2 = prev1
    prev1 = curr
return prev1
\`\`\`

### Worked Example
\`nums = [2, 7, 9, 3, 1]\`

| i | num | prev2 | prev1 | curr = max(prev1, prev2+num) |
|---|-----|-------|-------|------------------------------|
| 0 | 2   | 0     | 0     | max(0, 0+2) = 2              |
| 1 | 7   | 0     | 2     | max(2, 0+7) = 7              |
| 2 | 9   | 2     | 7     | max(7, 2+9) = 11             |
| 3 | 3   | 7     | 11    | max(11, 7+3) = 11            |
| 4 | 1   | 11    | 11    | max(11, 11+1) = 12           |

Answer: **12** ✓

### Complexity
- **Time:** O(n) — single pass through the array.
- **Space:** O(1) — only two variables maintained.`,
};

export default problem;
