import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-character-transitions-in-a-string",
  title: "Count Character Transitions",
  difficulty: "easy",
  category: "sliding-window",
  order: 3016,
  description: `Given a string \`s\`, count how many adjacent character pairs are different.

\`\`\`text
Example 1:
Input:  s = "aaabbc"
Output: 2

Example 2:
Input:  s = "abc"
Output: 2
\`\`\`

**Constraints:**
- \`0 <= s.length <= 1000\``,
  hints: [
    `Start at index 1.`,
    `Compare each character to the one before it.`,
  ],

  signature: {
    "name": "countCharacterTransitions",
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
        "aaabbc"
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        "abc"
      ],
      "expected": 2,
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
        "aaaa"
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        "abab"
      ],
      "expected": 3,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_character_transitions(s: str) -> int:
    # TODO: implement
    return 0
`,
    javascript: `function countCharacterTransitions(s) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function countCharacterTransitions(s: string): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int countCharacterTransitions(String s) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int countCharacterTransitions(char* s) {
    // TODO: implement
    return 0;
}
`,
  },
  solutions: {
    python: `def count_character_transitions(s: str) -> int:
    count = 0
    for i in range(1, len(s)):
        if s[i] != s[i - 1]:
            count += 1
    return count
`,
    javascript: `function countCharacterTransitions(s) {
    let count = 0;
    for (let i = 1; i < s.length; i++) if (s[i] !== s[i - 1]) count++;
    return count;
}
`,
    typescript: `function countCharacterTransitions(s: string): number {
    let count = 0;
    for (let i = 1; i < s.length; i++) if (s[i] !== s[i - 1]) count++;
    return count;
}`,
    java: `class Solution {
    public int countCharacterTransitions(String s) {
        int count = 0;
        for (int i = 1; i < s.length(); i++) if (s.charAt(i) != s.charAt(i - 1)) count++;
        return count;
    }
}
`,
    c: `int countCharacterTransitions(char* s) {
    if (s[0] == '\\0') return 0;
    int count = 0;
    for (int i = 1; s[i] != '\\0'; i++) if (s[i] != s[i - 1]) count++;
    return count;
}
`,
  },
  editorial: `Every adjacent comparison either changes character or it does not. Count the changes in one pass.`,
};

export default problem;
