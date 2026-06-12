import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-vowels-in-a-string",
  title: "Count Vowels in a String",
  difficulty: "easy",
  category: "foundations",
  order: 1007,
  description: `Given a string \`s\`, return the number of **vowels** it contains.

Vowels are the letters \`a\`, \`e\`, \`i\`, \`o\`, and \`u\` — both **lowercase and uppercase** count.

\`\`\`text
Example 1:
Input:  s = "hello"
Output: 2
Explanation: 'e' and 'o' are vowels.
\`\`\`

\`\`\`text
Example 2:
Input:  s = "rhythm"
Output: 0
Explanation: No vowels appear in the string.
\`\`\`

\`\`\`text
Example 3:
Input:  s = "AeIoU"
Output: 5
Explanation: All five characters are vowels (case-insensitive).
\`\`\`

**Constraints:**
- \`0 <= s.length <= 10^4\`
- \`s\` consists of printable ASCII characters.`,
  hints: [
    `Iterate through each character in the string one at a time.`,
    `Check whether the current character belongs to the set {'a','e','i','o','u','A','E','I','O','U'}.`,
    `Keep a running counter and increment it whenever you find a vowel.`,
  ],
  signature: {
    "name": "countVowels",
    "params": [
      {
        "name": "s",
        "type": "string"
      }
    ],
    "returns": "int"
  },
  testCases: [
    {
      "input": [
        "hello"
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        "aeiou"
      ],
      "expected": 5,
      "hidden": false
    },
    {
      "input": [
        "AEIOU"
      ],
      "expected": 5,
      "hidden": false
    },
    {
      "input": [
        "rhythm"
      ],
      "expected": 0,
      "hidden": true
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
        "Hello World"
      ],
      "expected": 3,
      "hidden": true
    },
    {
      "input": [
        "Programming"
      ],
      "expected": 3,
      "hidden": true
    },
    {
      "input": [
        "AeIoU"
      ],
      "expected": 5,
      "hidden": true
    },
    {
      "input": [
        "bcdfg"
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        "aaaa"
      ],
      "expected": 4,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_vowels(s: str) -> int:
    # TODO: return the number of vowels in s
    return 0
`,
    javascript: `function countVowels(s) {
    // TODO: return the number of vowels in s
    return 0;
}
`,
    typescript: `function countVowels(s: string): number {
    // TODO: return the number of vowels in s
    return 0;
}`,
    java: `class Solution {
    public int countVowels(String s) {
        // TODO: return the number of vowels in s
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int CountVowels(string s) {
        // TODO: return the number of vowels in s
        return 0;
    }
}`,
    c: `int countVowels(char* s) {
    // TODO: return the number of vowels in s
    return 0;
}
`,
    cpp: `class Solution {
public:
    int countVowels(string s) {
        // TODO: return the number of vowels in s
        return 0;
    }
};`,
  },
  solutions: {
    python: `def count_vowels(s: str) -> int:
    vowels = set('aeiouAEIOU')
    return sum(1 for c in s if c in vowels)
`,
    javascript: `function countVowels(s) {
    const vowels = new Set(['a','e','i','o','u','A','E','I','O','U']);
    let count = 0;
    for (const c of s) {
        if (vowels.has(c)) count++;
    }
    return count;
}
`,
    typescript: `function countVowels(s: string): number {
    const vowels = new Set(['a','e','i','o','u','A','E','I','O','U']);
    let count = 0;
    for (const c of s) {
        if (vowels.has(c)) count++;
    }
    return count;
}`,
    java: `class Solution {
    public int countVowels(String s) {
        String vowels = "aeiouAEIOU";
        int count = 0;
        for (int i = 0; i < s.length(); i++) {
            if (vowels.indexOf(s.charAt(i)) >= 0) count++;
        }
        return count;
    }
}
`,
    csharp: `public class Solution {
    public int CountVowels(string s) {
        string vowels = "aeiouAEIOU";
        int count = 0;
        for (int i = 0; i < s.Length; i++) {
            if (vowels.IndexOf(s[i]) >= 0) count++;
        }
        return count;
    }
}`,
    c: `int countVowels(char* s) {
    const char* vowels = "aeiouAEIOU";
    int count = 0;
    for (int i = 0; s[i] != '\\0'; i++) {
        for (int j = 0; vowels[j] != '\\0'; j++) {
            if (s[i] == vowels[j]) {
                count++;
                break;
            }
        }
    }
    return count;
}
`,
    cpp: `class Solution {
public:
    int countVowels(string s) {
        string vowels = "aeiouAEIOU";
        int count = 0;
        for (int i = 0; i < (int)s.size(); i++) {
            if (vowels.find(s[i]) != string::npos) count++;
        }
        return count;
    }
};`,
  },
  editorial: `## Approach: Linear Scan

Iterate through every character of the string and check membership in the vowel set \`{a, e, i, o, u, A, E, I, O, U}\`. Increment a counter for each match.

\`\`\`python
def count_vowels(s):
    vowels = set('aeiouAEIOU')
    return sum(1 for c in s if c in vowels)
\`\`\`

### Complexity
- **Time:** O(n) — each character is visited exactly once, and the membership check against the fixed 10-character vowel set is O(1).
- **Space:** O(1) — only a small fixed-size set and a single counter are used, regardless of input length.

The C solution uses a nested loop (O(10 × n) = O(n)) to avoid hash maps, which is perfectly acceptable given the fixed-size inner loop.`,
};

export default problem;
