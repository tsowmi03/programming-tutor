import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-divisors-of-a-positive-integer",
  title: "Count Divisors of a Positive Integer",
  difficulty: "easy",
  category: "foundations",
  order: 3024,
  description: `Given a positive integer \`n\`, return how many positive divisors it has.

\`\`\`text
Example 1:
Input:  n = 6
Output: 4

Example 2:
Input:  n = 1
Output: 1
\`\`\`

**Constraints:**
- \`1 <= n <= 100000\``,
  hints: [
    `A divisor divides \`n\` with remainder zero.`,
    `You only need to test values from \`1\` to \`n\` for this version.`,
  ],

  signature: {
    "name": "countDivisors",
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
        6
      ],
      "expected": 4,
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
        12
      ],
      "expected": 6,
      "hidden": true
    },
    {
      "input": [
        13
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        36
      ],
      "expected": 9,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_divisors(n: int) -> int:
    # TODO: implement
    return 0
`,
    javascript: `function countDivisors(n) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function countDivisors(n: number): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int countDivisors(int n) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int countDivisors(int n) {
    // TODO: implement
    return 0;
}
`,
  },
  solutions: {
    python: `def count_divisors(n: int) -> int:
    count = 0
    for d in range(1, n + 1):
        if n % d == 0:
            count += 1
    return count
`,
    javascript: `function countDivisors(n) {
    let count = 0;
    for (let d = 1; d <= n; d++) if (n % d === 0) count++;
    return count;
}
`,
    typescript: `function countDivisors(n: number): number {
    let count = 0;
    for (let d = 1; d <= n; d++) if (n % d === 0) count++;
    return count;
}`,
    java: `class Solution {
    public int countDivisors(int n) {
        int count = 0;
        for (int d = 1; d <= n; d++) if (n % d == 0) count++;
        return count;
    }
}
`,
    c: `int countDivisors(int n) {
    int count = 0;
    for (int d = 1; d <= n; d++) if (n % d == 0) count++;
    return count;
}
`,
  },
  editorial: `Test each candidate divisor and count those that divide evenly. For the stated bound this simple O(n) method is acceptable.`,
};

export default problem;
