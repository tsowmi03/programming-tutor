import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "check-if-a-number-is-a-perfect-square-without-using-sqrt",
  title: "Perfect Square Check Without Square Root",
  difficulty: "medium",
  category: "foundations",
  order: 1030,
  description: `Given a non-negative integer \`n\`, return \`true\` if it is a **perfect square**, and \`false\` otherwise.

A **perfect square** is an integer that equals the product of some non-negative integer multiplied by itself (e.g., 0, 1, 4, 9, 16, 25, …).

> **Constraint:** You may **not** use any built-in square root or exponentiation function (e.g., \`sqrt\`, \`Math.sqrt\`, \`Math.pow\`, \`**\`, \`pow\`, etc.).

\`\`\`text
Example 1:
Input:  n = 16
Output: true
Explanation: 4 × 4 = 16

Example 2:
Input:  n = 14
Output: false
Explanation: No non-negative integer x satisfies x × x = 14.
         (3 × 3 = 9, 4 × 4 = 16; nothing hits 14 exactly.)
\`\`\`

**Constraints:**
- \`0 <= n <= 2^31 - 1\``,
  hints: [
    `If x * x == n, what range must x be in? Think about an upper bound for x relative to n.`,
    `Binary search works on any monotone function. Is x * x monotonically increasing for x ≥ 0? How does that help?`,
    `In C and Java, mid * mid can overflow a 32-bit integer when mid is large. What 64-bit type can you use to avoid this?`,
    `As an alternative to binary search, consider Newton's method: start with a guess g = n and repeatedly update g = (g + n/g) / 2 until g*g <= n, then check.`,
  ],
  signature: {
    "name": "isPerfectSquare",
    "params": [
      {
        "name": "n",
        "type": "int"
      }
    ],
    "returns": "bool"
  },
  testCases: [
    {
      "input": [
        1
      ],
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        14
      ],
      "expected": false,
      "hidden": false
    },
    {
      "input": [
        16
      ],
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        0
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        2
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        4
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        25
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        9
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        2147395600
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        2147483647
      ],
      "expected": false,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def is_perfect_square(n: int) -> bool:
    # TODO: implement without using sqrt or **
    return False
`,
    javascript: `function isPerfectSquare(n) {
    // TODO: implement without using Math.sqrt or Math.pow
    return false;
}
`,
    typescript: `function isPerfectSquare(n: number): boolean {
    // TODO: implement without using Math.sqrt or Math.pow
    return false;
}`,
    java: `class Solution {
    public boolean isPerfectSquare(int n) {
        // TODO: implement without using Math.sqrt or Math.pow
        return false;
    }
}
`,
    csharp: `public class Solution {
    public bool IsPerfectSquare(int n) {
        // TODO: implement without using Math.Sqrt or Math.Pow
        return false;
    }
}`,
    c: `#include <stdbool.h>

bool isPerfectSquare(int n) {
    /* TODO: implement without using sqrt() */
    return false;
}
`,
    cpp: `class Solution {
public:
    bool isPerfectSquare(int n) {
        // TODO: implement without using sqrt or pow
        return false;
    }
};`,
  },
  solutions: {
    python: `def is_perfect_square(n: int) -> bool:
    if n == 0:
        return True
    left, right = 1, n
    while left <= right:
        mid = (left + right) // 2
        sq = mid * mid
        if sq == n:
            return True
        elif sq < n:
            left = mid + 1
        else:
            right = mid - 1
    return False
`,
    javascript: `function isPerfectSquare(n) {
    if (n === 0) return true;
    let left = 1, right = n;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        let sq = mid * mid;
        if (sq === n) return true;
        else if (sq < n) left = mid + 1;
        else right = mid - 1;
    }
    return false;
}
`,
    typescript: `function isPerfectSquare(n: number): boolean {
    if (n === 0) return true;
    let left = 1, right = n;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        let sq = mid * mid;
        if (sq === n) return true;
        else if (sq < n) left = mid + 1;
        else right = mid - 1;
    }
    return false;
}`,
    java: `class Solution {
    public boolean isPerfectSquare(int n) {
        if (n == 0) return true;
        long left = 1, right = (long) n;
        while (left <= right) {
            long mid = (left + right) / 2;
            long sq = mid * mid;
            if (sq == (long) n) return true;
            else if (sq < (long) n) left = mid + 1;
            else right = mid - 1;
        }
        return false;
    }
}
`,
    csharp: `public class Solution {
    public bool IsPerfectSquare(int n) {
        if (n == 0) return true;
        long left = 1, right = (long) n;
        while (left <= right) {
            long mid = (left + right) / 2;
            long sq = mid * mid;
            if (sq == (long) n) return true;
            else if (sq < (long) n) left = mid + 1;
            else right = mid - 1;
        }
        return false;
    }
}`,
    c: `#include <stdbool.h>

bool isPerfectSquare(int n) {
    if (n == 0) return true;
    long long left = 1, right = (long long) n;
    while (left <= right) {
        long long mid = (left + right) / 2;
        long long sq = mid * mid;
        if (sq == (long long) n) return true;
        else if (sq < (long long) n) left = mid + 1;
        else right = mid - 1;
    }
    return false;
}
`,
    cpp: `class Solution {
public:
    bool isPerfectSquare(int n) {
        if (n == 0) return true;
        long long left = 1, right = (long long) n;
        while (left <= right) {
            long long mid = (left + right) / 2;
            long long sq = mid * mid;
            if (sq == (long long) n) return true;
            else if (sq < (long long) n) left = mid + 1;
            else right = mid - 1;
        }
        return false;
    }
};`,
  },
  editorial: `## Approach: Binary Search

We need to decide whether an integer \`x\` exists with \`x * x == n\`. The function \`f(x) = x * x\` is strictly increasing for \`x ≥ 0\`, which makes it a perfect target for **binary search**.

### Algorithm

1. **Base case:** \`n == 0\` → return \`true\` (0 × 0 = 0).
2. Set \`left = 1\`, \`right = n\`.
3. While \`left <= right\`:
   - \`mid = (left + right) / 2\`
   - \`sq  = mid * mid\`
   - If \`sq == n\` → return \`true\`.
   - If \`sq < n\`  → answer must be larger; set \`left = mid + 1\`.
   - If \`sq > n\`  → answer must be smaller; set \`right = mid - 1\`.
4. Loop exits without a match → return \`false\`.

### Overflow Note

For \`n\` up to \`2^31 − 1\`, early iterations can produce \`mid ≈ 10^9\`, and \`mid * mid ≈ 10^18\`. Use 64-bit integers (\`long\` in Java, \`long long\` in C) to avoid overflow. Python integers are arbitrary-precision and need no special handling.

### Complexity

| | Complexity |
|---|---|
| **Time** | O(log n) — range halves each iteration |
| **Space** | O(1) — only a few scalar variables |`,
};

export default problem;
