import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "check-if-two-strings-are-equal-ignoring-case",
  title: "Case-Insensitive String Equality",
  difficulty: "easy",
  category: "foundations",
  order: 1020,
  description: `Given two strings \`s\` and \`t\`, return \`true\` if they are equal when letter case is ignored, and \`false\` otherwise.

Two strings are considered equal ignoring case if every character at the same position is the same letter, regardless of whether it is uppercase or lowercase. Non-letter characters (e.g., digits) must still match exactly.

\`\`\`text
Example 1:
Input:  s = "Hello", t = "hello"
Output: true
Explanation: 'H' and 'h' represent the same letter, and the rest match exactly.
\`\`\`

\`\`\`text
Example 2:
Input:  s = "Hello", t = "World"
Output: false
Explanation: After ignoring case, "hello" != "world".
\`\`\`

\`\`\`text
Example 3:
Input:  s = "test123", t = "TEST123"
Output: true
Explanation: The letter characters differ only in case; digits match exactly.
\`\`\`

**Constraints:**
- \`0 <= s.length, t.length <= 100\`
- \`s\` and \`t\` consist of printable ASCII characters.`,
  hints: [
    `Before comparing two strings, can you transform both of them so that case no longer matters?`,
    `Converting every letter in a string to lowercase (or uppercase) is a common normalization step — look for a built-in string method that does this.`,
    `Once both strings are in the same case, a plain equality check is all you need.`,
  ],
  signature: {
    "name": "areEqualIgnoreCase",
    "params": [
      {
        "name": "s",
        "type": "string"
      },
      {
        "name": "t",
        "type": "string"
      }
    ],
    "returns": "bool"
  },
  testCases: [
    {
      "input": [
        "Hello",
        "hello"
      ],
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        "abc",
        "ABC"
      ],
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        "Hello",
        "World"
      ],
      "expected": false,
      "hidden": false
    },
    {
      "input": [
        "",
        ""
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        "a",
        "B"
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        "CasE",
        "cAsE"
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        "abc",
        "abcd"
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        "UPPER",
        "upper"
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        "MiXeD",
        "mIxEd"
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        "test123",
        "TEST123"
      ],
      "expected": true,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def are_equal_ignore_case(s: str, t: str) -> bool:
    # TODO: implement
    return False
`,
    javascript: `function areEqualIgnoreCase(s, t) {
    // TODO: implement
    return false;
}
`,
    java: `class Solution {
    public boolean areEqualIgnoreCase(String s, String t) {
        // TODO: implement
        return false;
    }
}
`,
    c: `#include <stdbool.h>
#include <string.h>
#include <ctype.h>

bool areEqualIgnoreCase(char* s, char* t) {
    // TODO: implement
    return false;
}
`,
  },
  solutions: {
    python: `def are_equal_ignore_case(s: str, t: str) -> bool:
    return s.lower() == t.lower()
`,
    javascript: `function areEqualIgnoreCase(s, t) {
    return s.toLowerCase() === t.toLowerCase();
}
`,
    java: `class Solution {
    public boolean areEqualIgnoreCase(String s, String t) {
        return s.equalsIgnoreCase(t);
    }
}
`,
    c: `#include <stdbool.h>
#include <string.h>
#include <ctype.h>

bool areEqualIgnoreCase(char* s, char* t) {
    if (strlen(s) != strlen(t)) return false;
    int i = 0;
    while (s[i] != '\\0') {
        if (tolower((unsigned char)s[i]) != tolower((unsigned char)t[i])) return false;
        i++;
    }
    return true;
}
`,
  },
  editorial: `## Approach: Normalize to the Same Case, Then Compare

### Intuition

Case-insensitive comparison boils down to one observation: if we convert every letter in both strings to the same case (all lowercase or all uppercase), then two strings that differ only in case become identical strings. A plain equality check then suffices.

### Algorithm

1. Convert \`s\` to lowercase → \`sLow\`
2. Convert \`t\` to lowercase → \`tLow\`
3. Return \`sLow == tLow\`

Most languages expose a single built-in method for this transformation (\`str.lower()\` in Python, \`String.toLowerCase()\` in JavaScript, \`String.equalsIgnoreCase()\` in Java). In C, where no such convenience exists, we iterate character-by-character, applying \`tolower()\` from \`<ctype.h>\` to each character before comparing.

**Quick-exit optimization (C):** Compare lengths first — if they differ, the strings cannot be equal and we return \`false\` immediately without looping.

### Complexity Analysis

| | Time | Space |
|---|---|---|
| Python / JS | O(n) | O(n) — new lowercase strings are allocated |
| Java | O(n) | O(n) — \`equalsIgnoreCase\` scans internally |
| C | O(n) | O(1) — in-place character comparison, no allocation |

where *n* is the length of the strings.`,
};

export default problem;
