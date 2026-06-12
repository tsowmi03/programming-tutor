import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "jump-game-can-you-reach-the-last-index-given-jump-lengths",
  title: "Jump Game: Can You Reach the Last Index?",
  difficulty: "medium",
  category: "recursion-dp",
  order: 1150,
  description: `You are given a **0-indexed** integer array \`nums\`. Each element \`nums[i]\` represents the **maximum** number of steps you can jump forward from index \`i\`.

Starting at index \`0\`, return \`true\` if you can reach the last index, or \`false\` otherwise.

\`\`\`text
Example 1:
Input:  nums = [2, 3, 1, 1, 4]
Output: true
Explanation: Jump 1 step from index 0 to index 1, then 3 steps to the last index.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [3, 2, 1, 0, 4]
Output: false
Explanation: No matter what, you always reach index 3 which has jump length 0,
             so you can never reach index 4.
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [0]
Output: true
Explanation: You are already at the last index.
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 10^4\`
- \`0 <= nums[i] <= 10^5\``,
  hints: [
    `Think about tracking the farthest index you can currently reach as you scan from left to right.`,
    `At each index i, if i is beyond the farthest reachable index, you're stuck — return false. Otherwise, update the farthest reach with i + nums[i].`,
    `A simple DP approach: define dp[i] as whether index i is reachable. dp[0] = true; for each reachable index i, mark all indices up to i + nums[i] as reachable.`,
  ],
  signature: {
    "name": "canJump",
    "params": [
      {
        "name": "nums",
        "type": "int[]"
      }
    ],
    "returns": "bool",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        [
          2,
          3,
          1,
          1,
          4
        ]
      ],
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        [
          3,
          2,
          1,
          0,
          4
        ]
      ],
      "expected": false,
      "hidden": false
    },
    {
      "input": [
        [
          0
        ]
      ],
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          0,
          1,
          0
        ]
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        [
          2,
          0,
          0
        ]
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          1,
          1,
          1,
          1
        ]
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          0,
          1
        ]
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        [
          5,
          0,
          0,
          0,
          0,
          0
        ]
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          0,
          1
        ]
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          3,
          0,
          0,
          0,
          1
        ]
      ],
      "expected": false,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def can_jump(nums):
    # TODO: implement
    return False
`,
    javascript: `function canJump(nums) {
    // TODO: implement
    return false;
}
`,
    java: `class Solution {
    public boolean canJump(int[] nums) {
        // TODO: implement
        return false;
    }
}
`,
    c: `bool canJump(int* nums, int numsSize) {
    // TODO: implement
    return false;
}
`,
  },
  solutions: {
    python: `def can_jump(nums):
    farthest = 0
    n = len(nums)
    for i in range(n):
        if i > farthest:
            return False
        if farthest >= n - 1:
            return True
        farthest = max(farthest, i + nums[i])
    return True
`,
    javascript: `function canJump(nums) {
    let farthest = 0;
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        if (i > farthest) return false;
        if (farthest >= n - 1) return true;
        farthest = Math.max(farthest, i + nums[i]);
    }
    return true;
}
`,
    java: `class Solution {
    public boolean canJump(int[] nums) {
        int farthest = 0;
        int n = nums.length;
        for (int i = 0; i < n; i++) {
            if (i > farthest) return false;
            if (farthest >= n - 1) return true;
            farthest = Math.max(farthest, i + nums[i]);
        }
        return true;
    }
}
`,
    c: `#include <stdbool.h>
bool canJump(int* nums, int numsSize) {
    int farthest = 0;
    for (int i = 0; i < numsSize; i++) {
        if (i > farthest) return false;
        if (farthest >= numsSize - 1) return true;
        int reach = i + nums[i];
        if (reach > farthest) farthest = reach;
    }
    return true;
}
`,
  },
  editorial: `## Approach: Greedy Reachability Scan

### Intuition
Instead of exploring every possible path (which would be exponential), we only need to track the **farthest index reachable** so far. As we scan left to right, every index up to \`farthest\` is reachable. If we ever encounter an index \`i > farthest\`, we're stuck.

### Algorithm
1. Initialize \`farthest = 0\`.
2. For each index \`i\` from \`0\` to \`n-1\`:
   - If \`i > farthest\`: we can't reach this index → return \`false\`.
   - If \`farthest >= n-1\`: we can already reach the end → return \`true\`.
   - Update \`farthest = max(farthest, i + nums[i])\`.
3. Return \`true\`.

### Why it's correct
At every step, \`farthest\` represents the maximum index reachable using any sequence of jumps from index 0 through the current position. Jumping greedily to the farthest possible position never loses us any option — if a position is reachable, so is every position before it.

### DP connection
This is equivalent to a 1-D DP where \`dp[i] = true\` if index \`i\` is reachable. The greedy approach collapses that DP into a single variable.

### Complexity
- **Time:** O(n) — single pass through the array.
- **Space:** O(1) — only one variable maintained.`,
};

export default problem;
