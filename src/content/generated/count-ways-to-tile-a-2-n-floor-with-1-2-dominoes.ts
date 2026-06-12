import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-ways-to-tile-a-2-n-floor-with-1-2-dominoes",
  title: "Tile a 2×N Floor",
  difficulty: "easy",
  category: "recursion-dp",
  order: 1142,
  description: `You have a \`2 × n\` floor and an unlimited supply of \`1 × 2\` dominoes. A domino can be placed **horizontally** (covering \`2 × 1\` cells) or **vertically** (covering \`1 × 2\` cells).

Return the **number of distinct ways** to completely tile the floor.

\`\`\`text
Example 1:
Input:  n = 1
Output: 1
Explanation: Only one way — place one vertical domino.
\`\`\`

\`\`\`text
Example 2:
Input:  n = 4
Output: 5
Explanation:
  VVVV  (4 vertical dominoes)
  HHVV  (2 horizontal on left, 2 vertical)
  VHHV
  VVHH
  HHHH  (2 pairs of horizontal dominoes)
\`\`\`

\`\`\`text
Example 3:
Input:  n = 5
Output: 8
\`\`\`

**Constraints:**
- \`1 <= n <= 30\``,
  hints: [
    `Think about what happens at the rightmost column: you can either place one vertical domino covering column n, or place two horizontal dominoes covering columns n-1 and n.`,
    `This leads to a recurrence: ways(n) = ways(n-1) + ways(n-2). Do the base cases look familiar?`,
    `The answer is simply the (n+1)-th Fibonacci number. Use an iterative DP array to compute it efficiently.`,
  ],
  signature: {
    "name": "tilingWays",
    "params": [
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
        1
      ],
      "expected": 1,
      "hidden": false
    },
    {
      "input": [
        2
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        4
      ],
      "expected": 5,
      "hidden": false
    },
    {
      "input": [
        5
      ],
      "expected": 8,
      "hidden": true
    },
    {
      "input": [
        3
      ],
      "expected": 3,
      "hidden": true
    },
    {
      "input": [
        6
      ],
      "expected": 13,
      "hidden": true
    },
    {
      "input": [
        10
      ],
      "expected": 89,
      "hidden": true
    },
    {
      "input": [
        15
      ],
      "expected": 987,
      "hidden": true
    },
    {
      "input": [
        20
      ],
      "expected": 10946,
      "hidden": true
    },
    {
      "input": [
        30
      ],
      "expected": 1346269,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def tiling_ways(n: int) -> int:
    # TODO: implement me
    return 0
`,
    javascript: `function tilingWays(n) {
    // TODO: implement me
    return 0;
}
`,
    typescript: `function tilingWays(n: number): number {
    // TODO: implement me
    return 0;
}`,
    java: `class Solution {
    public int tilingWays(int n) {
        // TODO: implement me
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int TilingWays(int n) {
        // TODO: implement me
        return 0;
    }
}`,
    c: `int tilingWays(int n) {
    // TODO: implement me
    return 0;
}
`,
    cpp: `class Solution {
public:
    int tilingWays(int n) {
        // TODO: implement me
        return 0;
    }
};`,
  },
  solutions: {
    python: `def tiling_ways(n: int) -> int:
    if n == 1:
        return 1
    dp = [0] * (n + 1)
    dp[0] = 1
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]
`,
    javascript: `function tilingWays(n) {
    if (n === 1) return 1;
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;
    dp[1] = 1;
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}
`,
    typescript: `function tilingWays(n: number): number {
    if (n === 1) return 1;
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;
    dp[1] = 1;
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}`,
    java: `class Solution {
    public int tilingWays(int n) {
        if (n == 1) return 1;
        int[] dp = new int[n + 1];
        dp[0] = 1;
        dp[1] = 1;
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }
}
`,
    csharp: `public class Solution {
    public int TilingWays(int n) {
        if (n == 1) return 1;
        int[] dp = new int[n + 1];
        dp[0] = 1;
        dp[1] = 1;
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }
}`,
    c: `int tilingWays(int n) {
    int dp[31];
    dp[0] = 1;
    dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}
`,
    cpp: `class Solution {
public:
    int tilingWays(int n) {
        int dp[31];
        dp[0] = 1;
        dp[1] = 1;
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }
};`,
  },
  editorial: `## Approach: Dynamic Programming (Fibonacci)

### Intuition

Consider the rightmost column(s) of the \`2 × n\` floor:
- **Option A:** Place a single **vertical** domino in column \`n\`. The remaining problem is \`2 × (n-1)\`.
- **Option B:** Place **two horizontal** dominoes covering columns \`n-1\` and \`n\` (one in each row). The remaining problem is \`2 × (n-2)\`.

These two options are exhaustive and mutually exclusive, giving the recurrence:

\`\`\`
ways(n) = ways(n-1) + ways(n-2)
\`\`\`

with base cases \`ways(1) = 1\` and \`ways(2) = 2\`.

This is exactly the Fibonacci sequence (offset by one): \`ways(n) = Fib(n+1)\`.

### Algorithm

1. Create a \`dp\` array of size \`n+1\`.
2. Set \`dp[0] = 1\` (empty floor — one way to tile nothing), \`dp[1] = 1\`.
3. Fill \`dp[i] = dp[i-1] + dp[i-2]\` for \`i\` from \`2\` to \`n\`.
4. Return \`dp[n]\`.

### Complexity

- **Time:** O(n) — single pass through the array.
- **Space:** O(n) — can be reduced to O(1) using two variables.`,
};

export default problem;
