import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "longest-run-of-the-same-character",
  title: "Longest Run of the Same Character",
  difficulty: "easy",
  category: "sliding-window",
  order: 3015,
  description: `Given a string \`s\`, return the length of the longest contiguous run made of one repeated character.

\`\`\`text
Example 1:
Input:  s = "aaabbc"
Output: 3

Example 2:
Input:  s = "abc"
Output: 1
\`\`\`

**Constraints:**
- \`0 <= s.length <= 1000\``,
  hints: [
    `Track the current run length.`,
    `When the character changes, reset the current run to 1.`,
  ],

  signature: {
    "name": "longestSameCharRun",
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
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        "abc"
      ],
      "expected": 1,
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
        "zzzz"
      ],
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        "aabbbbcc"
      ],
      "expected": 4,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def longest_same_char_run(s: str) -> int:
    # TODO: implement
    return 0
`,
    javascript: `function longestSameCharRun(s) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function longestSameCharRun(s: string): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int longestSameCharRun(String s) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int longestSameCharRun(char* s) {
    // TODO: implement
    return 0;
}
`,
  },
  solutions: {
    python: `def longest_same_char_run(s: str) -> int:
    if not s:
        return 0
    best = 1
    current = 1
    for i in range(1, len(s)):
        if s[i] == s[i - 1]:
            current += 1
        else:
            current = 1
        best = max(best, current)
    return best
`,
    javascript: `function longestSameCharRun(s) {
    if (s.length === 0) return 0;
    let best = 1, current = 1;
    for (let i = 1; i < s.length; i++) {
        current = s[i] === s[i - 1] ? current + 1 : 1;
        best = Math.max(best, current);
    }
    return best;
}
`,
    typescript: `function longestSameCharRun(s: string): number {
    if (s.length === 0) return 0;
    let best = 1, current = 1;
    for (let i = 1; i < s.length; i++) {
        current = s[i] === s[i - 1] ? current + 1 : 1;
        best = Math.max(best, current);
    }
    return best;
}`,
    java: `class Solution {
    public int longestSameCharRun(String s) {
        if (s.length() == 0) return 0;
        int best = 1, current = 1;
        for (int i = 1; i < s.length(); i++) {
            current = s.charAt(i) == s.charAt(i - 1) ? current + 1 : 1;
            best = Math.max(best, current);
        }
        return best;
    }
}
`,
    c: `int longestSameCharRun(char* s) {
    if (s[0] == '\\0') return 0;
    int best = 1, current = 1;
    for (int i = 1; s[i] != '\\0'; i++) {
        current = s[i] == s[i - 1] ? current + 1 : 1;
        if (current > best) best = current;
    }
    return best;
}
`,
  },
  editorial: `Maintain the current run and the best run. Reset the current run when the character changes.`,
};

export default problem;
