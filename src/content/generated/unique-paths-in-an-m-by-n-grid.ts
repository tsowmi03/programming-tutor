import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "unique-paths-in-an-m-by-n-grid",
  title: "Unique Paths in a Grid",
  difficulty: "medium",
  category: "recursion-dp",
  order: 1147,
  description: `You are given an \`m x n\` grid. A robot starts at the **top-left corner** \`(0, 0)\` and wants to reach the **bottom-right corner** \`(m-1, n-1)\`.

The robot can only move **right** or **down** at each step.

Return the **total number of unique paths** the robot can take to reach the destination.

\`\`\`text
Example 1:
Input: m = 3, n = 7
Output: 28
\`\`\`

\`\`\`text
Example 2:
Input: m = 3, n = 2
Output: 3
Explanation: The three paths are:
  Right -> Down -> Down
  Down -> Right -> Down
  Down -> Down -> Right
\`\`\`

\`\`\`text
Example 3:
Input: m = 1, n = 1
Output: 1
\`\`\`

**Constraints:**
- \`1 <= m, n <= 15\``,
  hints: [
    `Think about what information you need to reach cell (i, j). Which cells can you come from?`,
    `A robot at (i, j) must have come from either (i-1, j) or (i, j-1). So the number of ways to reach (i, j) equals the sum of ways to reach those two neighbors.`,
    `Base cases: any cell in the first row or first column can only be reached in exactly 1 way.`,
    `Build a 2D DP table row by row, or observe that each row only depends on the previous row (space optimization).`,
  ],
  signature: {
    "name": "uniquePaths",
    "params": [
      {
        "name": "m",
        "type": "int"
      },
      {
        "name": "n",
        "type": "int"
      }
    ],
    "returns": "int",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        3,
        7
      ],
      "expected": 28,
      "hidden": false
    },
    {
      "input": [
        3,
        2
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        1,
        1
      ],
      "expected": 1,
      "hidden": false
    },
    {
      "input": [
        2,
        2
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        7,
        3
      ],
      "expected": 28,
      "hidden": true
    },
    {
      "input": [
        1,
        10
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        10,
        1
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        5,
        5
      ],
      "expected": 70,
      "hidden": true
    },
    {
      "input": [
        15,
        15
      ],
      "expected": 40116600,
      "hidden": true
    },
    {
      "input": [
        10,
        10
      ],
      "expected": 48620,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def unique_paths(m: int, n: int) -> int:
    # TODO: implement using dynamic programming
    pass
`,
    javascript: `/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
function uniquePaths(m, n) {
    // TODO: implement using dynamic programming
}
`,
    java: `class Solution {
    public int uniquePaths(int m, int n) {
        // TODO: implement using dynamic programming
        return 0;
    }
}
`,
    c: `int uniquePaths(int m, int n) {
    // TODO: implement using dynamic programming
    return 0;
}
`,
  },
  solutions: {
    python: `def unique_paths(m: int, n: int) -> int:
    dp = [1] * n
    for i in range(1, m):
        for j in range(1, n):
            dp[j] += dp[j - 1]
    return dp[n - 1]
`,
    javascript: `function uniquePaths(m, n) {
    const dp = new Array(n).fill(1);
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[j] += dp[j - 1];
        }
    }
    return dp[n - 1];
}
`,
    java: `class Solution {
    public int uniquePaths(int m, int n) {
        int[] dp = new int[n];
        java.util.Arrays.fill(dp, 1);
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[j] += dp[j - 1];
            }
        }
        return dp[n - 1];
    }
}
`,
    c: `int uniquePaths(int m, int n) {
    int dp[15];
    for (int j = 0; j < n; j++) dp[j] = 1;
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            dp[j] += dp[j - 1];
        }
    }
    return dp[n - 1];
}
`,
  },
  editorial: `## Approach: Dynamic Programming (1D Space-Optimized)

### Intuition

Let \`dp[i][j]\` = number of unique paths to reach cell \`(i, j)\`. Since the robot can only move right or down:

\`\`\`
dp[i][j] = dp[i-1][j] + dp[i][j-1]
\`\`\`

Base cases:
- First row: \`dp[0][j] = 1\` for all \`j\` (only one way — keep going right)
- First column: \`dp[i][0] = 1\` for all \`i\` (only one way — keep going down)

### Space Optimization

Since each row only depends on the previous row, we can compress the 2D table into a single 1D array of size \`n\`:

- Initialize \`dp[j] = 1\` for all \`j\` (represents the first row)
- For each subsequent row \`i\` from \`1\` to \`m-1\`:
  - For each column \`j\` from \`1\` to \`n-1\`: \`dp[j] += dp[j-1]\`

After processing all rows, \`dp[n-1]\` contains the answer.

### Why this works

When we update \`dp[j] += dp[j-1]\` left-to-right:
- \`dp[j]\` (before update) holds the value from the previous row (coming from above)
- \`dp[j-1]\` (already updated in this row) holds the value from the left

### Complexity

- **Time:** O(m × n) — fill every cell once
- **Space:** O(n) — single row array`,
};

export default problem;
