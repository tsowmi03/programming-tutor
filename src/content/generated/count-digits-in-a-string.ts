import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-digits-in-a-string",
  title: "Count Digits in a String",
  difficulty: "easy",
  category: "foundations",
  order: 3013,
  description: `Given a string \`s\`, return how many characters are decimal digits.

\`\`\`text
Example 1:
Input:  s = "a1b22"
Output: 3

Example 2:
Input:  s = "abc"
Output: 0
\`\`\`

**Constraints:**
- \`0 <= s.length <= 1000\``,
  hints: [
    `A digit lies between \`'0'\` and \`'9'\`.`,
    `Scan each character once.`,
  ],

  signature: {
    "name": "countDigits",
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
        "a1b22"
      ],
      "expected": 3,
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
        "12345"
      ],
      "expected": 5,
      "hidden": true
    },
    {
      "input": [
        "x9y0z"
      ],
      "expected": 2,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_digits(s: str) -> int:
    # TODO: implement
    return 0
`,
    javascript: `function countDigits(s) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function countDigits(s: string): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int countDigits(String s) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int countDigits(char* s) {
    // TODO: implement
    return 0;
}
`,
  },
  solutions: {
    python: `def count_digits(s: str) -> int:
    count = 0
    for ch in s:
        if '0' <= ch <= '9':
            count += 1
    return count
`,
    javascript: `function countDigits(s) {
    let count = 0;
    for (const ch of s) if (ch >= '0' && ch <= '9') count++;
    return count;
}
`,
    typescript: `function countDigits(s: string): number {
    let count = 0;
    for (const ch of s) if (ch >= '0' && ch <= '9') count++;
    return count;
}`,
    java: `class Solution {
    public int countDigits(String s) {
        int count = 0;
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (ch >= '0' && ch <= '9') count++;
        }
        return count;
    }
}
`,
    c: `int countDigits(char* s) {
    int count = 0;
    for (int i = 0; s[i] != '\\0'; i++) if (s[i] >= '0' && s[i] <= '9') count++;
    return count;
}
`,
  },
  editorial: `A character comparison is enough; count every character between \`0\` and \`9\` inclusive.`,
};

export default problem;
