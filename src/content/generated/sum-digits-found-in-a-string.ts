import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "sum-digits-found-in-a-string",
  title: "Sum Digits Found in a String",
  difficulty: "easy",
  category: "foundations",
  order: 3017,
  description: `Given a string \`s\`, return the sum of all decimal digit characters it contains.

\`\`\`text
Example 1:
Input:  s = "a1b23"
Output: 6

Example 2:
Input:  s = "abc"
Output: 0
\`\`\`

**Constraints:**
- \`0 <= s.length <= 1000\``,
  hints: [
    `Ignore non-digit characters.`,
    `Convert a digit character to its numeric value by subtracting \`'0'\`.`,
  ],

  signature: {
    "name": "sumDigitsInString",
    "params": [
      {
        "name": "s",
        "type": "string"
      }
    ],
    "returns": "int",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        "a1b23"
      ],
      "expected": 6,
      "hidden": false
    },
    {
      "input": [
        "abc"
      ],
      "expected": 0,
      "hidden": false
    },
    {
      "input": [
        ""
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        "909"
      ],
      "expected": 18,
      "hidden": true
    },
    {
      "input": [
        "x5y0z"
      ],
      "expected": 5,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def sum_digits_in_string(s: str) -> int:
    # TODO: implement
    return 0
`,
    javascript: `function sumDigitsInString(s) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function sumDigitsInString(s: string): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int sumDigitsInString(String s) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int sumDigitsInString(char* s) {
    // TODO: implement
    return 0;
}
`,
  },
  solutions: {
    python: `def sum_digits_in_string(s: str) -> int:
    total = 0
    for ch in s:
        if '0' <= ch <= '9':
            total += ord(ch) - ord('0')
    return total
`,
    javascript: `function sumDigitsInString(s) {
    let total = 0;
    for (const ch of s) if (ch >= '0' && ch <= '9') total += ch.charCodeAt(0) - 48;
    return total;
}
`,
    typescript: `function sumDigitsInString(s: string): number {
    let total = 0;
    for (const ch of s) if (ch >= '0' && ch <= '9') total += ch.charCodeAt(0) - 48;
    return total;
}`,
    java: `class Solution {
    public int sumDigitsInString(String s) {
        int total = 0;
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (ch >= '0' && ch <= '9') total += ch - '0';
        }
        return total;
    }
}
`,
    c: `int sumDigitsInString(char* s) {
    int total = 0;
    for (int i = 0; s[i] != '\\0'; i++) if (s[i] >= '0' && s[i] <= '9') total += s[i] - '0';
    return total;
}
`,
  },
  editorial: `Check each character for digit range, convert digit characters to their numeric value, and add them.`,
};

export default problem;
