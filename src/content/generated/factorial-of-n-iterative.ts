import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "factorial-of-n-iterative",
  title: "Factorial of N (Iterative)",
  difficulty: "easy",
  category: "foundations",
  order: 1006,
  description: `Given a non-negative integer \`n\`, return its **factorial** computed **iteratively** (without recursion).

The factorial of \`n\` is defined as:

- \`0! = 1\`
- \`n! = n × (n − 1) × (n − 2) × … × 1\` for \`n ≥ 1\`

\`\`\`text
Example 1:
Input:  n = 0
Output: 1
Explanation: 0! is defined as 1.
\`\`\`

\`\`\`text
Example 2:
Input:  n = 5
Output: 120
Explanation: 5! = 5 × 4 × 3 × 2 × 1 = 120
\`\`\`

\`\`\`text
Example 3:
Input:  n = 12
Output: 479001600
Explanation: 12! = 479001600 (the largest factorial that fits in a 32-bit integer).
\`\`\`

**Constraints:**
- \`0 <= n <= 12\``,
  hints: [
    `Start with a result variable set to 1 — that handles the base case (n = 0) automatically.`,
    `Use a loop that multiplies result by each integer from 2 up to and including n.`,
    `Verify your answer with small values: 3! should be 6, 4! should be 24.`,
  ],
  signature: {
    "name": "factorial",
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
      "expected": 1,
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
        5
      ],
      "expected": 120,
      "hidden": false
    },
    {
      "input": [
        2
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        3
      ],
      "expected": 6,
      "hidden": true
    },
    {
      "input": [
        4
      ],
      "expected": 24,
      "hidden": true
    },
    {
      "input": [
        7
      ],
      "expected": 5040,
      "hidden": true
    },
    {
      "input": [
        10
      ],
      "expected": 3628800,
      "hidden": true
    },
    {
      "input": [
        11
      ],
      "expected": 39916800,
      "hidden": true
    },
    {
      "input": [
        12
      ],
      "expected": 479001600,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def factorial(n: int) -> int:
    # TODO: compute n! iteratively
    return 0
`,
    javascript: `function factorial(n) {
    // TODO: compute n! iteratively
    return 0;
}
`,
    java: `class Solution {
    public int factorial(int n) {
        // TODO: compute n! iteratively
        return 0;
    }
}
`,
    c: `int factorial(int n) {
    /* TODO: compute n! iteratively */
    return 0;
}
`,
  },
  solutions: {
    python: `def factorial(n: int) -> int:
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result
`,
    javascript: `function factorial(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
`,
    java: `class Solution {
    public int factorial(int n) {
        int result = 1;
        for (int i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
}
`,
    c: `int factorial(int n) {
    int result = 1;
    int i;
    for (i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
`,
  },
  editorial: `## Approach: Simple Iterative Multiplication

### Intuition
The factorial of \`n\` is the product of all positive integers up to \`n\`. We can compute it by starting from 1 and multiplying each integer from 2 through \`n\` in a loop. Initialising the accumulator to 1 also handles the edge case \`n = 0\` automatically, since the loop body never executes and we return 1 — which is correct by definition.

### Algorithm
1. Initialise \`result = 1\`.
2. Loop \`i\` from \`2\` to \`n\` (inclusive).
3. Multiply \`result\` by \`i\` on each iteration.
4. Return \`result\`.

### Example trace for n = 5
\`\`\`
i=2: result = 1 × 2 = 2
i=3: result = 2 × 3 = 6
i=4: result = 6 × 4 = 24
i=5: result = 24 × 5 = 120
\`\`\`

### Complexity
- **Time:** O(n) — one multiplication per value from 2 to n.
- **Space:** O(1) — only a single accumulator variable is used.

### Note on constraints
The constraint \`n ≤ 12\` ensures the result (\`12! = 479 001 600\`) fits comfortably within a signed 32-bit integer (max ≈ 2.1 × 10⁹).`,
};

export default problem;
