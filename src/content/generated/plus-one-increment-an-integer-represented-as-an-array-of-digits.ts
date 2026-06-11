import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "plus-one-increment-an-integer-represented-as-an-array-of-digits",
  title: "Plus One",
  difficulty: "medium",
  category: "foundations",
  order: 1027,
  description: `Given a **non-negative integer** represented as a non-empty array of its decimal digits (most-significant digit first), increment the integer by one and return the result as an array of digits.

The input array contains no leading zeros, except for the single-element array \`[0]\`.

\`\`\`text
Example 1:
Input:  digits = [1, 2, 3]
Output: [1, 2, 4]
Explanation: 123 + 1 = 124
\`\`\`

\`\`\`text
Example 2:
Input:  digits = [9, 9, 9]
Output: [1, 0, 0, 0]
Explanation: 999 + 1 = 1000  (carry propagates through every digit)
\`\`\`

\`\`\`text
Example 3:
Input:  digits = [1, 9, 9]
Output: [2, 0, 0]
Explanation: 199 + 1 = 200
\`\`\`

**Constraints:**
- \`1 <= digits.length <= 100\`
- \`0 <= digits[i] <= 9\`
- The integer represented by \`digits\` does not contain leading zeros (except the input \`[0]\`).`,
  hints: [
    `Start from the rightmost digit. If it is less than 9 you can increment it directly and stop.`,
    `If the rightmost digit is 9, set it to 0 and carry 1 to the left — exactly like grade-school addition.`,
    `Keep propagating the carry leftward until you either find a digit less than 9 or run out of digits.`,
    `If every digit was 9 the output has one more digit than the input: the result is 1 followed by all zeros.`,
  ],
  signature: {
    "name": "plusOne",
    "params": [
      {
        "name": "digits",
        "type": "int[]"
      }
    ],
    "returns": "int[]",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        [
          1,
          2,
          3
        ]
      ],
      "expected": [
        1,
        2,
        4
      ],
      "hidden": false
    },
    {
      "input": [
        [
          9,
          9,
          9
        ]
      ],
      "expected": [
        1,
        0,
        0,
        0
      ],
      "hidden": false
    },
    {
      "input": [
        [
          1,
          9,
          9
        ]
      ],
      "expected": [
        2,
        0,
        0
      ],
      "hidden": false
    },
    {
      "input": [
        [
          9
        ]
      ],
      "expected": [
        1,
        0
      ],
      "hidden": true
    },
    {
      "input": [
        [
          0
        ]
      ],
      "expected": [
        1
      ],
      "hidden": true
    },
    {
      "input": [
        [
          1,
          0,
          0
        ]
      ],
      "expected": [
        1,
        0,
        1
      ],
      "hidden": true
    },
    {
      "input": [
        [
          4,
          3,
          2,
          1
        ]
      ],
      "expected": [
        4,
        3,
        2,
        2
      ],
      "hidden": true
    },
    {
      "input": [
        [
          2,
          9
        ]
      ],
      "expected": [
        3,
        0
      ],
      "hidden": true
    },
    {
      "input": [
        [
          9,
          9,
          9,
          9,
          9
        ]
      ],
      "expected": [
        1,
        0,
        0,
        0,
        0,
        0
      ],
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          8,
          9,
          9
        ]
      ],
      "expected": [
        1,
        2,
        9,
        0,
        0
      ],
      "hidden": true
    }
  ],
  starterCode: {
    python: `def plus_one(digits):
    # TODO: increment the integer represented by digits and return the result
    return []
`,
    javascript: `function plusOne(digits) {
    // TODO: increment the integer represented by digits and return the result
    return [];
}
`,
    java: `class Solution {
    public int[] plusOne(int[] digits) {
        // TODO: increment the integer represented by digits and return the result
        return new int[]{};
    }
}
`,
    c: `int* plusOne(int* digits, int digitsSize, int* returnSize) {
    // TODO: increment the integer represented by digits and return the result
    *returnSize = 0;
    return NULL;
}
`,
  },
  solutions: {
    python: `def plus_one(digits):
    for i in range(len(digits) - 1, -1, -1):
        if digits[i] < 9:
            digits[i] += 1
            return digits
        digits[i] = 0
    return [1] + digits
`,
    javascript: `function plusOne(digits) {
    for (let i = digits.length - 1; i >= 0; i--) {
        if (digits[i] < 9) {
            digits[i]++;
            return digits;
        }
        digits[i] = 0;
    }
    return [1, ...digits];
}
`,
    java: `class Solution {
    public int[] plusOne(int[] digits) {
        for (int i = digits.length - 1; i >= 0; i--) {
            if (digits[i] < 9) {
                digits[i]++;
                return digits;
            }
            digits[i] = 0;
        }
        int[] result = new int[digits.length + 1];
        result[0] = 1;
        return result;
    }
}
`,
    c: `int* plusOne(int* digits, int digitsSize, int* returnSize) {
    int allNine = 1;
    for (int i = 0; i < digitsSize; i++) {
        if (digits[i] != 9) { allNine = 0; break; }
    }
    if (allNine) {
        *returnSize = digitsSize + 1;
        int* result = (int*)malloc((digitsSize + 1) * sizeof(int));
        result[0] = 1;
        for (int i = 1; i <= digitsSize; i++) result[i] = 0;
        return result;
    }
    *returnSize = digitsSize;
    int* result = (int*)malloc(digitsSize * sizeof(int));
    for (int i = 0; i < digitsSize; i++) result[i] = digits[i];
    for (int i = digitsSize - 1; i >= 0; i--) {
        if (result[i] < 9) { result[i]++; break; }
        result[i] = 0;
    }
    return result;
}
`,
  },
  editorial: `## Approach: Right-to-Left Carry Propagation

**Key Insight:** Adding 1 only affects the suffix of 9s at the end of the array. Every trailing 9 rolls over to 0, and the first non-9 digit from the right is simply incremented. The only special case is when *all* digits are 9, which requires prepending a new leading 1.

**Algorithm:**
1. Iterate from index \`n-1\` down to \`0\`.
2. If \`digits[i] < 9\`: increment it and **return immediately** — no carry to propagate.
3. If \`digits[i] == 9\`: set it to \`0\` and continue leftward (carry propagates).
4. If the loop completes without returning, every digit was \`9\`. Return a new array of size \`n+1\` with \`1\` at index \`0\` and \`0\`s everywhere else.

\`\`\`text
Trace for [1, 9, 9]:
  i=2: digits[2]==9  → set to 0, carry left
  i=1: digits[1]==9  → set to 0, carry left
  i=0: digits[0]==1 < 9 → increment to 2, return [2, 0, 0]

Trace for [9, 9, 9]:
  i=2,1,0: all 9s → all become 0
  Loop ends → return [1, 0, 0, 0]
\`\`\`

**Complexity:**
- **Time:** O(n) — at most one full leftward scan.
- **Space:** O(n) only in the all-nines case; O(1) extra space otherwise.`,
};

export default problem;
