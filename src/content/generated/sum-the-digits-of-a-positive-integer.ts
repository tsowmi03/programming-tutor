import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "sum-the-digits-of-a-positive-integer",
  title: "Sum of Digits",
  difficulty: "easy",
  category: "foundations",
  order: 1015,
  description: `Given a positive integer \`n\`, return the **sum of its digits**.

\`\`\`text
Example 1:
Input:  n = 123
Output: 6
Explanation: 1 + 2 + 3 = 6
\`\`\`

\`\`\`text
Example 2:
Input:  n = 9999
Output: 36
Explanation: 9 + 9 + 9 + 9 = 36
\`\`\`

\`\`\`text
Example 3:
Input:  n = 100
Output: 1
Explanation: 1 + 0 + 0 = 1
\`\`\`

**Constraints:**
- \`1 <= n <= 10^9\``,
  hints: [
    `How can you extract the last digit of a number using the modulo operator?`,
    `After extracting the last digit, how do you remove it from the number to process the remaining digits?`,
    `Keep extracting and accumulating digits until nothing is left — what condition ends the loop?`,
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
        123
      ],
      "expected": 6,
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
        1
      ],
      "expected": 1,
      "hidden": false
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
        999
      ],
      "expected": 27,
      "hidden": true
    },
    {
      "input": [
        12345
      ],
      "expected": 15,
      "hidden": true
    },
    {
      "input": [
        1000000
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        99
      ],
      "expected": 18,
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
        987654321
      ],
      "expected": 45,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def digit_sum(n: int) -> int:
    # TODO: return the sum of all digits of n
    return 0
`,
    javascript: `function digitSum(n) {
    // TODO: return the sum of all digits of n
    return 0;
}
`,
    java: `class Solution {
    public int digitSum(int n) {
        // TODO: return the sum of all digits of n
        return 0;
    }
}
`,
    c: `int digitSum(int n) {
    /* TODO: return the sum of all digits of n */
    return 0;
}
`,
  },
  solutions: {
    python: `def digit_sum(n: int) -> int:
    total = 0
    while n > 0:
        total += n % 10
        n //= 10
    return total
`,
    javascript: `function digitSum(n) {
    let total = 0;
    while (n > 0) {
        total += n % 10;
        n = Math.floor(n / 10);
    }
    return total;
}
`,
    java: `class Solution {
    public int digitSum(int n) {
        int total = 0;
        while (n > 0) {
            total += n % 10;
            n /= 10;
        }
        return total;
    }
}
`,
    c: `int digitSum(int n) {
    int total = 0;
    while (n > 0) {
        total += n % 10;
        n /= 10;
    }
    return total;
}
`,
  },
  editorial: `## Approach: Repeated Modulo and Division

### Intuition
The key insight is that for any integer \`n\`, the expression \`n % 10\` gives the **last digit**, and \`n / 10\` (integer division) **removes** the last digit. By repeatedly applying these two operations we can visit every digit exactly once.

### Algorithm
1. Initialize \`total = 0\`.
2. While \`n > 0\`:
   - Add \`n % 10\` (last digit) to \`total\`.
   - Set \`n = n / 10\` (drop the last digit).
3. Return \`total\`.

### Worked Example — n = 123
| Iteration | n   | n % 10 | total |
|-----------|-----|--------|-------|
| 1         | 123 | 3      | 3     |
| 2         | 12  | 2      | 5     |
| 3         | 1   | 1      | 6     |
| loop ends | 0   | —      | 6     |

### Complexity
- **Time:** O(d) where d is the number of digits — at most 10 for a 32-bit integer, so effectively O(1).
- **Space:** O(1) — only a single accumulator variable is needed.`,
};

export default problem;
