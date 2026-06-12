import type { CodeProblemDef } from "../types";

export const climbingStairs: CodeProblemDef = {
  type: "code",
  slug: "climbing-stairs",
  title: "Climbing Stairs",
  difficulty: "easy",
  category: "recursion-dp",
  order: 1,
  description: `You are climbing a staircase with \`n\` steps. Each move you can climb either **1 or 2 steps**. In how many distinct ways can you reach the top?

**Example 1**

\`\`\`text
Input: n = 2
Output: 2
Explanation: 1+1, or 2.
\`\`\`

**Example 2**

\`\`\`text
Input: n = 3
Output: 3
Explanation: 1+1+1, 1+2, or 2+1.
\`\`\`

**Constraints**

- \`1 <= n <= 45\`
`,
  hints: [
    `Think about the *last* move you make. You arrived at step n either from step n-1 (a 1-step) or from step n-2 (a 2-step).`,
    `So ways(n) = ways(n-1) + ways(n-2) — every path to the top is one of those two kinds. What are ways(1) and ways(2)?`,
    `Naive recursion recomputes the same subproblems exponentially many times. Either memoize, or build up from the bottom keeping just the last two values.`,
  ],
  signature: {
    "name": "climbStairs",
    "params": [
      {
        "name": "n",
        "type": "int"
      }
    ],
    "returns": "int"
  },
  testCases: [
    {
      "input": [
        2
      ],
      "expected": 2
    },
    {
      "input": [
        3
      ],
      "expected": 3
    },
    {
      "input": [
        1
      ],
      "expected": 1
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
        30
      ],
      "expected": 1346269,
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
    python: `def climb_stairs(n):
    """Return the number of distinct ways to climb n steps."""
    # Your code here
    pass
`,
    javascript: `/**
 * @param {number} n
 * @return {number}
 */
function climbStairs(n) {
  // Your code here
}
`,
    typescript: `/**
 * @param {number} n
 * @return {number}
 */
function climbStairs(n: number): number {
  // Your code here
  return 0;
}`,
    java: `class Solution {
    public int climbStairs(int n) {
        // Your code here
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int ClimbStairs(int n) {
        // Your code here
        return 0;
    }
}`,
    c: `int climbStairs(int n) {
    // Your code here
    return 0;
}
`,
    cpp: `class Solution {
public:
    int climbStairs(int n) {
        // Your code here
        return 0;
    }
};`,
  },
  solutions: {
    python: `def climb_stairs(n):
    if n <= 2:
        return n
    prev2, prev1 = 1, 2  # ways(1), ways(2)
    for _ in range(3, n + 1):
        prev2, prev1 = prev1, prev1 + prev2
    return prev1
`,
    javascript: `function climbStairs(n) {
  if (n <= 2) return n;
  let prev2 = 1; // ways(1)
  let prev1 = 2; // ways(2)
  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  return prev1;
}
`,
    typescript: `function climbStairs(n: number): number {
  if (n <= 2) return n;
  let prev2 = 1; // ways(1)
  let prev1 = 2; // ways(2)
  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  return prev1;
}`,
    java: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int prev2 = 1, prev1 = 2;
        for (int i = 3; i <= n; i++) {
            int current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
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
            int current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }
        return prev1;
    }
}`,
    c: `int climbStairs(int n) {
    if (n <= 2) return n;
    int prev2 = 1, prev1 = 2;
    for (int i = 3; i <= n; i++) {
        int current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
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
            int current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }
        return prev1;
    }
};`,
  },
  editorial: `## Approach: recognise the recurrence

Look at the final move of any successful climb: it was either a 1-step from
stair \`n-1\` or a 2-step from stair \`n-2\`. Those two groups cover every
way exactly once, so:

\`\`\`text
ways(n) = ways(n-1) + ways(n-2),   ways(1) = 1,  ways(2) = 2
\`\`\`

That's the Fibonacci recurrence. This decomposition — *"express the answer
for n in terms of answers for smaller n"* — is the heart of dynamic
programming.

### From exponential to linear

Implementing the recurrence directly as recursion recomputes the same
subproblems an exponential number of times (\`ways(40)\` alone takes
hundreds of millions of calls). Two standard fixes:

1. **Memoization (top-down):** cache each \`ways(k)\` the first time it's
   computed. O(n) time, O(n) space.
2. **Tabulation (bottom-up):** compute \`ways(1), ways(2), …\` in order.
   Each value needs only the previous two, so two variables suffice —
   O(n) time, **O(1) space**. That's the reference solution.

**Complexity:** O(n) time, O(1) space.
`,
};
