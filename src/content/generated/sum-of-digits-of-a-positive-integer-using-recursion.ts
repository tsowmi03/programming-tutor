import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "sum-of-digits-of-a-positive-integer-using-recursion",
  title: "Recursive Digit Sum",
  difficulty: "easy",
  category: "recursion-dp",
  order: 1141,
  description: `Given a positive integer \`n\`, return the **sum of its digits** using a recursive approach.

For example, the digit sum of \`1234\` is \`1 + 2 + 3 + 4 = 10\`.

\`\`\`text
Example 1:
Input:  n = 1234
Output: 10
Explanation: 1 + 2 + 3 + 4 = 10
\`\`\`

\`\`\`text
Example 2:
Input:  n = 9999
Output: 36
Explanation: 9 + 9 + 9 + 9 = 36
\`\`\`

\`\`\`text
Example 3:
Input:  n = 7
Output: 7
Explanation: Single digit — the sum is the number itself.
\`\`\`

**Constraints:**
- \`1 <= n <= 10^9\``,
  hints: [
    `Think about what the last digit of n is (hint: use the modulo operator %). What remains after removing it?`,
    `The base case is when n has only one digit (i.e., n < 10). In that case, return n directly.`,
    `For the recursive case, return (n % 10) + digitSum(n / 10), where / is integer division.`,
  ],
  signature: {
    "name": "digitSum",
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
        1234
      ],
      "expected": 10,
      "hidden": false
    },
    {
      "input": [
        9999
      ],
      "expected": 36,
      "hidden": false
    },
    {
      "input": [
        7
      ],
      "expected": 7,
      "hidden": false
    },
    {
      "input": [
        1000000000
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        999999999
      ],
      "expected": 81,
      "hidden": true
    },
    {
      "input": [
        100
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        55
      ],
      "expected": 10,
      "hidden": true
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
        987654321
      ],
      "expected": 45,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def digit_sum(n: int) -> int:
    # TODO: implement using recursion
    pass
`,
    javascript: `function digitSum(n) {
    // TODO: implement using recursion
}
`,
    java: `class Solution {
    public int digitSum(int n) {
        // TODO: implement using recursion
        return 0;
    }
}
`,
    c: `int digitSum(int n) {
    // TODO: implement using recursion
    return 0;
}
`,
  },
  solutions: {
    python: `def digit_sum(n: int) -> int:
    if n < 10:
        return n
    return (n % 10) + digit_sum(n // 10)
`,
    javascript: `function digitSum(n) {
    if (n < 10) return n;
    return (n % 10) + digitSum(Math.floor(n / 10));
}
`,
    java: `class Solution {
    public int digitSum(int n) {
        if (n < 10) return n;
        return (n % 10) + digitSum(n / 10);
    }
}
`,
    c: `int digitSum(int n) {
    if (n < 10) return n;
    return (n % 10) + digitSum(n / 10);
}
`,
  },
  editorial: `## Approach: Simple Recursion

### Intuition
Every positive integer can be broken into its **last digit** (\`n % 10\`) and the **remaining number** (\`n / 10\`). The digit sum is therefore:

\`\`\`
digitSum(n) = (n % 10) + digitSum(n / 10)
\`\`\`

We keep stripping the last digit and summing it until we reach a single-digit number, at which point we return that number directly (base case).

### Algorithm
1. **Base case:** if \`n < 10\`, return \`n\`.
2. **Recursive case:** return \`(n % 10) + digitSum(n / 10)\`.

### Worked Example
\`\`\`
digitSum(1234)
  = 4 + digitSum(123)
  = 4 + 3 + digitSum(12)
  = 4 + 3 + 2 + digitSum(1)
  = 4 + 3 + 2 + 1   (base case: 1 < 10)
  = 10
\`\`\`

### Complexity
- **Time:** O(d) where d is the number of digits in n (at most 10 for n ≤ 10^9).
- **Space:** O(d) for the recursion call stack.
`,
};

export default problem;
