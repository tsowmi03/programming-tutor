import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "check-if-a-number-is-a-power-of-two",
  title: "Power of Two",
  difficulty: "easy",
  category: "foundations",
  order: 1016,
  description: `Given an integer \`n\`, return \`true\` if it is a power of two, otherwise return \`false\`.

An integer is a power of two if there exists an integer \`k\` such that \`n == 2^k\` (where \`k >= 0\`).

\`\`\`text
Example 1:
Input:  n = 1
Output: true
Explanation: 2^0 = 1
\`\`\`

\`\`\`text
Example 2:
Input:  n = 16
Output: true
Explanation: 2^4 = 16
\`\`\`

\`\`\`text
Example 3:
Input:  n = 6
Output: false
Explanation: 6 cannot be expressed as 2^k for any integer k.
\`\`\`

**Constraints:**
- \`-2^31 <= n <= 2^31 - 1\``,
  hints: [
    `Think about what powers of two look like in binary: 1, 10, 100, 1000 … What do you notice about the number of set bits?`,
    `For any positive power of two \`n\`, the expression \`n - 1\` flips all bits below the single set bit. What does \`n & (n - 1)\` equal?`,
    `Don't forget to handle the case where \`n\` is zero or negative — neither can be a power of two.`,
  ],
  signature: {
    "name": "isPowerOfTwo",
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
        2
      ],
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        3
      ],
      "expected": false,
      "hidden": false
    },
    {
      "input": [
        16
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        0
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        -1
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        6
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        1024
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        1073741824
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        5
      ],
      "expected": false,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def is_power_of_two(n: int) -> bool:
    # TODO: implement
    return False
`,
    javascript: `function isPowerOfTwo(n) {
    // TODO: implement
    return false;
}
`,
    java: `class Solution {
    public boolean isPowerOfTwo(int n) {
        // TODO: implement
        return false;
    }
}
`,
    c: `#include <stdbool.h>
bool isPowerOfTwo(int n) {
    // TODO: implement
    return false;
}
`,
  },
  solutions: {
    python: `def is_power_of_two(n: int) -> bool:
    return n > 0 and (n & (n - 1)) == 0
`,
    javascript: `function isPowerOfTwo(n) {
    return n > 0 && (n & (n - 1)) === 0;
}
`,
    java: `class Solution {
    public boolean isPowerOfTwo(int n) {
        return n > 0 && (n & (n - 1)) == 0;
    }
}
`,
    c: `#include <stdbool.h>
bool isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}
`,
  },
  editorial: `## Approach: Bit Manipulation

### Key Observation

Every positive power of two has **exactly one bit set** in its binary representation:

\`\`\`
1  → 00001
2  → 00010
4  → 00100
8  → 01000
16 → 10000
\`\`\`

### The Trick: \`n & (n - 1)\`

For any positive integer \`n\`, subtracting 1 flips the lowest set bit and sets all lower bits:

\`\`\`
n     = 1000  (8)
n - 1 = 0111  (7)
n & (n-1) = 0000  ← zero only when n has one set bit!
\`\`\`

For a non-power-of-two like 6:
\`\`\`
n     = 110  (6)
n - 1 = 101  (5)
n & (n-1) = 100  ← non-zero
\`\`\`

### Algorithm

\`\`\`
return n > 0 and (n & (n - 1)) == 0
\`\`\`

The \`n > 0\` guard handles:
- \`n = 0\`: \`0 & -1\` would be 0 (false positive without the guard).
- Negative numbers: cannot be powers of two.

### Complexity

- **Time:** O(1) — a constant number of bitwise operations.
- **Space:** O(1) — no extra memory used.`,
};

export default problem;
