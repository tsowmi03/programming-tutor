import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-consonants-in-a-lowercase-string",
  title: "Count Consonants in a Lowercase String",
  difficulty: "easy",
  category: "foundations",
  order: 3012,
  description: `Given a lowercase English string \`s\`, return the number of consonants.

\`\`\`text
Example 1:
Input:  s = "code"
Output: 2

Example 2:
Input:  s = "aeiou"
Output: 0
\`\`\`

**Constraints:**
- \`0 <= s.length <= 1000\`
- \`s\` contains only lowercase English letters`,
  hints: [
    `Every lowercase letter is either a vowel or consonant.`,
    `Check that the character is not one of \`a\`, \`e\`, \`i\`, \`o\`, \`u\`.`,
  ],

  signature: {
    "name": "countConsonants",
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
        "code"
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        "aeiou"
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
        "bcdfg"
      ],
      "expected": 5,
      "hidden": true
    },
    {
      "input": [
        "algorithm"
      ],
      "expected": 6,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_consonants(s: str) -> int:
    # TODO: implement
    return 0
`,
    javascript: `function countConsonants(s) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function countConsonants(s: string): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int countConsonants(String s) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int countConsonants(char* s) {
    // TODO: implement
    return 0;
}
`,
  },
  solutions: {
    python: `def count_consonants(s: str) -> int:
    vowels = set('aeiou')
    count = 0
    for ch in s:
        if ch not in vowels:
            count += 1
    return count
`,
    javascript: `function countConsonants(s) {
    let count = 0;
    for (const ch of s) if (!'aeiou'.includes(ch)) count++;
    return count;
}
`,
    typescript: `function countConsonants(s: string): number {
    let count = 0;
    for (const ch of s) if (!'aeiou'.includes(ch)) count++;
    return count;
}`,
    java: `class Solution {
    public int countConsonants(String s) {
        int count = 0;
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if ("aeiou".indexOf(ch) == -1) count++;
        }
        return count;
    }
}
`,
    c: `int countConsonants(char* s) {
    int count = 0;
    for (int i = 0; s[i] != '\\0'; i++) {
        char ch = s[i];
        if (!(ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u')) count++;
    }
    return count;
}
`,
  },
  editorial: `Scan the string and count letters that are not vowels. The work is linear in the string length.`,
};

export default problem;
