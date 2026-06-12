import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "climbing-stairs-number-of-ways-to-reach-step-n",
  title: "Climbing Stairs",
  difficulty: "easy",
  category: "recursion-dp",
  order: 1138,
  description: `You are climbing a staircase with \`n\` steps. Each time you can either climb **1** or **2** steps. Return the number of distinct ways you can reach the top (step \`n\`).

\`\`\`text
Example 1:
Input:  n = 2
Output: 2
Explanation: Two ways: (1+1) or (2).
\`\`\`

\`\`\`text
Example 2:
Input:  n = 5
Output: 8
Explanation: Eight ways:
  1+1+1+1+1
  1+1+1+2
  1+1+2+1
  1+2+1+1
  2+1+1+1
  1+2+2
  2+1+2
  2+2+1
\`\`\`

**Constraints:**
- \`1 <= n <= 45\``,
  hints: [
    `Think about the last step you take to reach step n — you must have come from either step n-1 or step n-2.`,
    `The number of ways to reach step n equals the number of ways to reach step n-1 plus the number of ways to reach step n-2.`,
    `This recurrence is exactly the Fibonacci sequence. Try building the answer bottom-up with two variables to avoid recomputation.`,
  ],
  signature: {
    "name": "climbStairs",
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
        3
      ],
      "expected": 3,
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
        10
      ],
      "expected": 89,
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
        35
      ],
      "expected": 14930352,
      "hidden": true
    },
    {
      "input": [
        45
      ],
      "expected": 1836311903,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def climb_stairs(n: int) -> int:
    # TODO: implement
    return 0
`,
    javascript: `function climbStairs(n) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function climbStairs(n: number): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int climbStairs(int n) {
        // TODO: implement
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int ClimbStairs(int n) {
        // TODO: implement
        return 0;
    }
}`,
    c: `int climbStairs(int n) {
    // TODO: implement
    return 0;
}
`,
    cpp: `class Solution {
public:
    int climbStairs(int n) {
        // TODO: implement
        return 0;
    }
};`,
  },
  solutions: {
    python: `def climb_stairs(n: int) -> int:
    if n <= 2:
        return n
    prev2, prev1 = 1, 2
    for _ in range(3, n + 1):
        prev2, prev1 = prev1, prev2 + prev1
    return prev1
`,
    javascript: `function climbStairs(n) {
    if (n <= 2) return n;
    let prev2 = 1, prev1 = 2;
    for (let i = 3; i <= n; i++) {
        let cur = prev1 + prev2;
        prev2 = prev1;
        prev1 = cur;
    }
    return prev1;
}
`,
    typescript: `function climbStairs(n: number): number {
    if (n <= 2) return n;
    let prev2 = 1, prev1 = 2;
    for (let i = 3; i <= n; i++) {
        let cur = prev1 + prev2;
        prev2 = prev1;
        prev1 = cur;
    }
    return prev1;
}`,
    java: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int prev2 = 1, prev1 = 2;
        for (int i = 3; i <= n; i++) {
            int cur = prev1 + prev2;
            prev2 = prev1;
            prev1 = cur;
        }
        return prev1;
    }
}
`,
    csharp: `public class Solution {
    public int ClimbStairs(int n) {
        if (n <= 2) return n;
        int prev2 = 1, prev1 = 2;
        for (int i = 3; i <= n; i++) {
            int cur = prev1 + prev2;
            prev2 = prev1;
            prev1 = cur;
        }
        return prev1;
    }
}`,
    c: `int climbStairs(int n) {
    if (n <= 2) return n;
    int prev2 = 1, prev1 = 2;
    for (int i = 3; i <= n; i++) {
        int cur = prev1 + prev2;
        prev2 = prev1;
        prev1 = cur;
    }
    return prev1;
}
`,
    cpp: `class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        int prev2 = 1, prev1 = 2;
        for (int i = 3; i <= n; i++) {
            int cur = prev1 + prev2;
            prev2 = prev1;
            prev1 = cur;
        }
        return prev1;
    }
};`,
  },
  editorial: `## Approach: Bottom-Up Dynamic Programming (Fibonacci)

### Key Insight
To reach step \`n\`, you must have come from step \`n-1\` (taking 1 step) or step \`n-2\` (taking 2 steps). Therefore:

\`\`\`
ways(n) = ways(n-1) + ways(n-2)
\`\`\`

with base cases \`ways(1) = 1\` and \`ways(2) = 2\`. This is precisely the Fibonacci recurrence.

### Algorithm
Instead of using recursion (which would recompute subproblems exponentially), we iterate from the bottom up using two variables to track the previous two values:

1. If \`n <= 2\`, return \`n\` directly.
2. Initialize \`prev2 = 1\` (ways to reach step 1), \`prev1 = 2\` (ways to reach step 2).
3. For each step from 3 to n: \`cur = prev1 + prev2\`, then shift \`prev2 = prev1\`, \`prev1 = cur\`.
4. Return \`prev1\`.

### Complexity
- **Time:** O(n) — one pass from 3 to n.
- **Space:** O(1) — only two variables needed, no array.`,
};

export default problem;
