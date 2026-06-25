import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "hamming-distance-between-two-integers",
  title: "Hamming Distance Between Two Integers",
  difficulty: "easy",
  category: "foundations",
  order: 3011,
  description: `Given two non-negative integers \`a\` and \`b\`, return the number of bit positions where their binary representations differ.

\`\`\`text
Example 1:
Input:  a = 1, b = 4
Output: 2

Example 2:
Input:  a = 3, b = 3
Output: 0
\`\`\`

**Constraints:**
- \`0 <= a, b <= 1000000\``,
  hints: [
    `XOR marks the bit positions where two numbers differ.`,
    `Count the set bits in \`a XOR b\`.`,
  ],

  signature: {
    "name": "hammingDistance",
    "params": [
      {
        "name": "a",
        "type": "int"
      },
      {
        "name": "b",
        "type": "int"
      }
    ],
    "returns": "int",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        1,
        4
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        3,
        3
      ],
      "expected": 0,
      "hidden": false
    },
    {
      "input": [
        0,
        0
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        7,
        8
      ],
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        10,
        5
      ],
      "expected": 4,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def hamming_distance(a: int, b: int) -> int:
    # TODO: implement
    return 0
`,
    javascript: `function hammingDistance(a, b) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function hammingDistance(a: number, b: number): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int hammingDistance(int a, int b) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int hammingDistance(int a, int b) {
    // TODO: implement
    return 0;
}
`,
  },
  solutions: {
    python: `def hamming_distance(a: int, b: int) -> int:
    x = a ^ b
    count = 0
    while x:
        count += x & 1
        x >>= 1
    return count
`,
    javascript: `function hammingDistance(a, b) {
    let x = a ^ b;
    let count = 0;
    while (x !== 0) { count += x & 1; x = x >>> 1; }
    return count;
}
`,
    typescript: `function hammingDistance(a: number, b: number): number {
    let x = a ^ b;
    let count = 0;
    while (x !== 0) { count += x & 1; x = x >>> 1; }
    return count;
}`,
    java: `class Solution {
    public int hammingDistance(int a, int b) {
        int x = a ^ b;
        int count = 0;
        while (x != 0) { count += x & 1; x >>>= 1; }
        return count;
    }
}
`,
    c: `int hammingDistance(int a, int b) {
    int x = a ^ b;
    int count = 0;
    while (x != 0) { count += x & 1; x = (unsigned int)x >> 1; }
    return count;
}
`,
  },
  editorial: `Compute \`a XOR b\`; every 1 bit in that result is a differing position. Count those set bits.`,
};

export default problem;
