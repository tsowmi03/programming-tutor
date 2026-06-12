import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "power-function-compute-x-raised-to-the-power-n-recursive-non-negative-n",
  title: "Recursive Power Function",
  difficulty: "easy",
  category: "recursion-dp",
  order: 1140,
  description: `Given a non-negative integer \`x\` and a non-negative integer \`n\`, compute \`x\` raised to the power \`n\` using recursion.

You may assume the result fits within a 32-bit signed integer.

\`\`\`text
Example 1:
Input:  x = 2, n = 10
Output: 1024

Example 2:
Input:  x = 3, n = 0
Output: 1

Example 3:
Input:  x = 5, n = 3
Output: 125
\`\`\`

**Constraints:**
- \`0 <= x <= 15\`
- \`0 <= n <= 10\`
- The result fits within a 32-bit signed integer.`,
  hints: [
    `Think about the base case: what is x^0 for any x?`,
    `For the recursive step, how does x^n relate to x^(n-1)?`,
    `Can you reduce the number of recursive calls by using the fact that x^n = (x^(n/2))^2 when n is even?`,
  ],
  signature: {
    "name": "myPow",
    "params": [
      {
        "name": "x",
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
        2,
        10
      ],
      "expected": 1024,
      "hidden": false
    },
    {
      "input": [
        3,
        0
      ],
      "expected": 1,
      "hidden": false
    },
    {
      "input": [
        5,
        3
      ],
      "expected": 125,
      "hidden": false
    },
    {
      "input": [
        0,
        5
      ],
      "expected": 0,
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
        7,
        2
      ],
      "expected": 49,
      "hidden": true
    },
    {
      "input": [
        2,
        0
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        4,
        4
      ],
      "expected": 256,
      "hidden": true
    },
    {
      "input": [
        3,
        5
      ],
      "expected": 243,
      "hidden": true
    },
    {
      "input": [
        0,
        0
      ],
      "expected": 1,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def my_pow(x: int, n: int) -> int:
    # TODO: implement using recursion
    pass
`,
    javascript: `/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
function myPow(x, n) {
    // TODO: implement using recursion
}
`,
    typescript: `function myPow(x: number, n: number): number {
    // TODO: implement using recursion
    return 0;
}`,
    java: `class Solution {
    public int myPow(int x, int n) {
        // TODO: implement using recursion
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int MyPow(int x, int n) {
        // TODO: implement using recursion
        return 0;
    }
}`,
    c: `int myPow(int x, int n) {
    // TODO: implement using recursion
    return 0;
}
`,
    cpp: `class Solution {
public:
    int myPow(int x, int n) {
        // TODO: implement using recursion
        return 0;
    }
};`,
  },
  solutions: {
    python: `def my_pow(x: int, n: int) -> int:
    if n == 0:
        return 1
    return x * my_pow(x, n - 1)
`,
    javascript: `function myPow(x, n) {
    if (n === 0) return 1;
    return x * myPow(x, n - 1);
}
`,
    typescript: `function myPow(x: number, n: number): number {
    if (n === 0) return 1;
    return x * myPow(x, n - 1);
}`,
    java: `class Solution {
    public int myPow(int x, int n) {
        if (n == 0) return 1;
        return x * myPow(x, n - 1);
    }
}
`,
    csharp: `public class Solution {
    public int MyPow(int x, int n) {
        if (n == 0) return 1;
        return x * MyPow(x, n - 1);
    }
}`,
    c: `int myPow(int x, int n) {
    if (n == 0) return 1;
    return x * myPow(x, n - 1);
}
`,
    cpp: `class Solution {
public:
    int myPow(int x, int n) {
        if (n == 0) return 1;
        return x * myPow(x, n - 1);
    }
};`,
  },
  editorial: `## Approach: Simple Linear Recursion

### Idea
The key observations are:
1. **Base case:** Any number raised to the power 0 equals 1, i.e., \`x^0 = 1\`.
2. **Recursive case:** \`x^n = x * x^(n-1)\`.

This directly translates to a recursive function.

### Implementation
\`\`\`python
def my_pow(x, n):
    if n == 0:
        return 1
    return x * my_pow(x, n - 1)
\`\`\`

### Complexity
- **Time:** O(n) — one recursive call per decrement of \`n\`.
- **Space:** O(n) — call stack depth is \`n\`.

### Note
For larger values of \`n\`, a more efficient approach (fast exponentiation / exponentiation by squaring) reduces time to O(log n) by using \`x^n = (x^(n/2))^2\`. However, given the small constraints here (\`n ≤ 10\`), the simple linear approach is perfectly acceptable.`,
};

export default problem;
