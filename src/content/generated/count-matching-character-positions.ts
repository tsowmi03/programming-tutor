import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-matching-character-positions",
  title: "Count Matching Character Positions",
  difficulty: "easy",
  category: "two-pointers",
  order: 3019,
  description: `Given two strings \`a\` and \`b\` of the same length, return how many positions contain the same character.

\`\`\`text
Example 1:
Input:  a = "code", b = "cope"
Output: 3

Example 2:
Input:  a = "abc", b = "xyz"
Output: 0
\`\`\`

**Constraints:**
- \`0 <= a.length == b.length <= 1000\``,
  hints: [
    `Use one index for both strings.`,
    `Compare characters at the same position.`,
  ],

  signature: {
    "name": "countMatchingCharacters",
    "params": [
      {
        "name": "a",
        "type": "string"
      },
      {
        "name": "b",
        "type": "string"
      }
    ],
    "returns": "int",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        "code",
        "cope"
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        "abc",
        "xyz"
      ],
      "expected": 0,
      "hidden": false
    },
    {
      "input": [
        "",
        ""
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        "same",
        "same"
      ],
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        "abca",
        "abda"
      ],
      "expected": 3,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_matching_characters(a: str, b: str) -> int:
    # TODO: implement
    return 0
`,
    javascript: `function countMatchingCharacters(a, b) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function countMatchingCharacters(a: string, b: string): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int countMatchingCharacters(String a, String b) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int countMatchingCharacters(char* a, char* b) {
    // TODO: implement
    return 0;
}
`,
  },
  solutions: {
    python: `def count_matching_characters(a: str, b: str) -> int:
    count = 0
    for i in range(len(a)):
        if a[i] == b[i]:
            count += 1
    return count
`,
    javascript: `function countMatchingCharacters(a, b) {
    let count = 0;
    for (let i = 0; i < a.length; i++) if (a[i] === b[i]) count++;
    return count;
}
`,
    typescript: `function countMatchingCharacters(a: string, b: string): number {
    let count = 0;
    for (let i = 0; i < a.length; i++) if (a[i] === b[i]) count++;
    return count;
}`,
    java: `class Solution {
    public int countMatchingCharacters(String a, String b) {
        int count = 0;
        for (int i = 0; i < a.length(); i++) if (a.charAt(i) == b.charAt(i)) count++;
        return count;
    }
}
`,
    c: `int countMatchingCharacters(char* a, char* b) {
    int count = 0;
    for (int i = 0; a[i] != '\\0'; i++) if (a[i] == b[i]) count++;
    return count;
}
`,
  },
  editorial: `Compare each pair of characters at the same index and count matches.`,
};

export default problem;
