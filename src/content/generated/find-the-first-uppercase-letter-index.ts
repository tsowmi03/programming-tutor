import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "find-the-first-uppercase-letter-index",
  title: "First Uppercase Letter Index",
  difficulty: "easy",
  category: "foundations",
  order: 3014,
  description: `Given a string \`s\`, return the first index containing an uppercase English letter. Return \`-1\` if no uppercase letter appears.

\`\`\`text
Example 1:
Input:  s = "abCde"
Output: 2

Example 2:
Input:  s = "lower"
Output: -1
\`\`\`

**Constraints:**
- \`0 <= s.length <= 1000\``,
  hints: [
    `Scan from left to right.`,
    `The first uppercase character has code between \`A\` and \`Z\`.`,
  ],

  signature: {
    "name": "firstUppercaseIndex",
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
        "abCde"
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        "lower"
      ],
      "expected": -1,
      "hidden": false
    },
    {
      "input": [
        "A"
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        "123Z"
      ],
      "expected": 3,
      "hidden": true
    },
    {
      "input": [
        ""
      ],
      "expected": -1,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def first_uppercase_index(s: str) -> int:
    # TODO: implement
    return 0
`,
    javascript: `function firstUppercaseIndex(s) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function firstUppercaseIndex(s: string): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int firstUppercaseIndex(String s) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int firstUppercaseIndex(char* s) {
    // TODO: implement
    return 0;
}
`,
  },
  solutions: {
    python: `def first_uppercase_index(s: str) -> int:
    for i, ch in enumerate(s):
        if 'A' <= ch <= 'Z':
            return i
    return -1
`,
    javascript: `function firstUppercaseIndex(s) {
    for (let i = 0; i < s.length; i++) if (s[i] >= 'A' && s[i] <= 'Z') return i;
    return -1;
}
`,
    typescript: `function firstUppercaseIndex(s: string): number {
    for (let i = 0; i < s.length; i++) if (s[i] >= 'A' && s[i] <= 'Z') return i;
    return -1;
}`,
    java: `class Solution {
    public int firstUppercaseIndex(String s) {
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (ch >= 'A' && ch <= 'Z') return i;
        }
        return -1;
    }
}
`,
    c: `int firstUppercaseIndex(char* s) {
    for (int i = 0; s[i] != '\\0'; i++) if (s[i] >= 'A' && s[i] <= 'Z') return i;
    return -1;
}
`,
  },
  editorial: `A left-to-right scan returns the earliest uppercase index. If the scan ends, return -1.`,
};

export default problem;
