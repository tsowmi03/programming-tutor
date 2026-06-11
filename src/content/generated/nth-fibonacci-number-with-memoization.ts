import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "nth-fibonacci-number-with-memoization",
  title: "Nth Fibonacci Number",
  difficulty: "easy",
  category: "recursion-dp",
  order: 1137,
  description: `Given a non-negative integer \`n\`, return the \`n\`-th Fibonacci number using memoization (top-down dynamic programming).

The Fibonacci sequence is defined as:
- \`F(0) = 0\`
- \`F(1) = 1\`
- \`F(n) = F(n-1) + F(n-2)\` for \`n >= 2\`

\`\`\`text
Example 1:
Input:  n = 0
Output: 0

Example 2:
Input:  n = 1
Output: 1

Example 3:
Input:  n = 6
Output: 8
Explanation: F(0)=0, F(1)=1, F(2)=1, F(3)=2, F(4)=3, F(5)=5, F(6)=8
\`\`\`

**Constraints:**
- \`0 <= n <= 30\``,
  hints: [
    `Start with the base cases: F(0) = 0 and F(1) = 1.`,
    `Use a dictionary or array to cache results so each subproblem is solved only once.`,
    `If memo[n] is already computed, return it directly instead of recursing again.`,
  ],
  signature: {
    "name": "fib",
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
        0
      ],
      "expected": 0,
      "hidden": false
    },
    {
      "input": [
        1
      ],
      "expected": 1,
      "hidden": false
    },
    {
      "input": [
        6
      ],
      "expected": 8,
      "hidden": false
    },
    {
      "input": [
        2
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        5
      ],
      "expected": 5,
      "hidden": true
    },
    {
      "input": [
        10
      ],
      "expected": 55,
      "hidden": true
    },
    {
      "input": [
        15
      ],
      "expected": 610,
      "hidden": true
    },
    {
      "input": [
        20
      ],
      "expected": 6765,
      "hidden": true
    },
    {
      "input": [
        30
      ],
      "expected": 832040,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def fib(n: int) -> int:
    # TODO: implement using memoization
    return 0
`,
    javascript: `function fib(n) {
    // TODO: implement using memoization
    return 0;
}
`,
    java: `class Solution {
    public int fib(int n) {
        // TODO: implement using memoization
        return 0;
    }
}
`,
    c: `int fib(int n) {
    // TODO: implement using memoization
    return 0;
}
`,
  },
  solutions: {
    python: `def fib(n: int) -> int:
    memo = {}
    def helper(k):
        if k == 0:
            return 0
        if k == 1:
            return 1
        if k in memo:
            return memo[k]
        memo[k] = helper(k - 1) + helper(k - 2)
        return memo[k]
    return helper(n)
`,
    javascript: `function fib(n) {
    const memo = {};
    function helper(k) {
        if (k === 0) return 0;
        if (k === 1) return 1;
        if (memo[k] !== undefined) return memo[k];
        memo[k] = helper(k - 1) + helper(k - 2);
        return memo[k];
    }
    return helper(n);
}
`,
    java: `class Solution {
    private int[] memo = new int[31];

    public int fib(int n) {
        java.util.Arrays.fill(memo, -1);
        return helper(n);
    }

    private int helper(int k) {
        if (k == 0) return 0;
        if (k == 1) return 1;
        if (memo[k] != -1) return memo[k];
        memo[k] = helper(k - 1) + helper(k - 2);
        return memo[k];
    }
}
`,
    c: `int fib(int n) {
    int memo[31];
    int i;
    for (i = 0; i <= 30; i++) memo[i] = -1;
    memo[0] = 0;
    memo[1] = 1;
    /* Iterative DP using the memo array */
    for (i = 2; i <= n; i++) {
        memo[i] = memo[i - 1] + memo[i - 2];
    }
    return memo[n];
}
`,
  },
  editorial: `## Approach: Top-Down Recursion with Memoization

### Intuition
The naive recursive solution for Fibonacci has exponential time complexity O(2^n) because it recomputes the same subproblems many times. Memoization solves this by caching each result the first time it is computed, so subsequent calls for the same \`n\` return immediately.

### Algorithm
1. Create a cache (dictionary or array) initialized as empty/sentinel.
2. Define a recursive helper \`helper(k)\`:
   - **Base cases:** return 0 if k=0, return 1 if k=1.
   - **Cache hit:** if \`memo[k]\` is already computed, return it.
   - **Recurse:** compute \`helper(k-1) + helper(k-2)\`, store in \`memo[k]\`, return it.
3. Call \`helper(n)\` and return the result.

### Complexity
- **Time:** O(n) — each value from 0 to n is computed exactly once.
- **Space:** O(n) — for the memo cache and the call stack.

### Note on C solution
The C reference solution uses an iterative bottom-up DP (filling \`memo[0]\` through \`memo[n]\`), which is equivalent in result and avoids the overhead of function call recursion, while still demonstrating the core DP idea.`,
};

export default problem;
