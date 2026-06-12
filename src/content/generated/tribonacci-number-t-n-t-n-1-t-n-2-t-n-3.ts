import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "tribonacci-number-t-n-t-n-1-t-n-2-t-n-3",
  title: "Tribonacci Number",
  difficulty: "easy",
  category: "recursion-dp",
  order: 1143,
  description: `The **Tribonacci** sequence is defined as follows:

- \`T(0) = 0\`
- \`T(1) = 1\`
- \`T(2) = 1\`
- \`T(n) = T(n-1) + T(n-2) + T(n-3)\` for \`n >= 3\`

Given a non-negative integer \`n\`, return the \`n\`-th Tribonacci number.

\`\`\`text
Example 1:
Input:  n = 0
Output: 0
Explanation: T(0) = 0 by definition.
\`\`\`

\`\`\`text
Example 2:
Input:  n = 4
Output: 4
Explanation:
T(0)=0, T(1)=1, T(2)=1, T(3)=2, T(4)=4
\`\`\`

\`\`\`text
Example 3:
Input:  n = 7
Output: 24
Explanation:
T(0)=0, T(1)=1, T(2)=1, T(3)=2, T(4)=4,
T(5)=7, T(6)=13, T(7)=24
\`\`\`

**Constraints:**
- \`0 <= n <= 37\`
- The answer is guaranteed to fit in a 32-bit signed integer.`,
  hints: [
    `Start with the base cases: T(0)=0, T(1)=1, T(2)=1.`,
    `Use bottom-up dynamic programming: keep track of only the last three values to avoid recomputation.`,
    `You can solve this iteratively with just three variables, updating them in a loop.`,
  ],
  signature: {
    "name": "tribonacci",
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
        4
      ],
      "expected": 4,
      "hidden": false
    },
    {
      "input": [
        7
      ],
      "expected": 24,
      "hidden": false
    },
    {
      "input": [
        1
      ],
      "expected": 1,
      "hidden": true
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
        3
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        10
      ],
      "expected": 149,
      "hidden": true
    },
    {
      "input": [
        25
      ],
      "expected": 1389537,
      "hidden": true
    },
    {
      "input": [
        37
      ],
      "expected": 2082876103,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def tribonacci(n: int) -> int:
    # TODO: implement
    return 0
`,
    javascript: `/**
 * @param {number} n
 * @return {number}
 */
function tribonacci(n) {
    // TODO: implement
    return 0;
}
`,
    java: `class Solution {
    public int tribonacci(int n) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int tribonacci(int n) {
    // TODO: implement
    return 0;
}
`,
  },
  solutions: {
    python: `def tribonacci(n: int) -> int:
    if n == 0:
        return 0
    if n == 1 or n == 2:
        return 1
    a, b, c = 0, 1, 1
    for _ in range(3, n + 1):
        a, b, c = b, c, a + b + c
    return c
`,
    javascript: `/**
 * @param {number} n
 * @return {number}
 */
function tribonacci(n) {
    if (n === 0) return 0;
    if (n === 1 || n === 2) return 1;
    let a = 0, b = 1, c = 1;
    for (let i = 3; i <= n; i++) {
        const next = a + b + c;
        a = b;
        b = c;
        c = next;
    }
    return c;
}
`,
    java: `class Solution {
    public int tribonacci(int n) {
        if (n == 0) return 0;
        if (n == 1 || n == 2) return 1;
        int a = 0, b = 1, c = 1;
        for (int i = 3; i <= n; i++) {
            int next = a + b + c;
            a = b;
            b = c;
            c = next;
        }
        return c;
    }
}
`,
    c: `int tribonacci(int n) {
    if (n == 0) return 0;
    if (n == 1 || n == 2) return 1;
    int a = 0, b = 1, c = 1;
    for (int i = 3; i <= n; i++) {
        int next = a + b + c;
        a = b;
        b = c;
        c = next;
    }
    return c;
}
`,
  },
  editorial: `## Approach: Iterative Bottom-Up DP

### Intuition
The Tribonacci recurrence \`T(n) = T(n-1) + T(n-2) + T(n-3)\` only depends on the three previous values. We can solve it iteratively by maintaining three variables and updating them in a single pass, which is both time- and space-efficient.

### Algorithm
1. Handle base cases: \`T(0) = 0\`, \`T(1) = 1\`, \`T(2) = 1\`.
2. Initialize three variables \`a = 0\`, \`b = 1\`, \`c = 1\` representing \`T(0)\`, \`T(1)\`, \`T(2)\`.
3. Loop from \`i = 3\` to \`n\` (inclusive):
   - Compute \`next = a + b + c\`.
   - Shift: \`a = b\`, \`b = c\`, \`c = next\`.
4. Return \`c\`.

### Complexity
- **Time:** O(n) — one pass through the values.
- **Space:** O(1) — only three variables are used regardless of \`n\`.

### Why not plain recursion?
Naive recursion recomputes sub-problems exponentially. Memoisation fixes that but uses O(n) stack/memory. The iterative approach is the cleanest O(n) / O(1) solution.`,
};

export default problem;
