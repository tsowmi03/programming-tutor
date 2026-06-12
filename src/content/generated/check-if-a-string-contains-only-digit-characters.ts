import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "check-if-a-string-contains-only-digit-characters",
  title: "All Digit Characters",
  difficulty: "easy",
  category: "foundations",
  order: 1014,
  description: `Given a string \`s\`, return \`true\` if **every** character in \`s\` is a decimal digit (\`'0'\` through \`'9'\`), and \`false\` otherwise.

An **empty string** should return \`false\`.

\`\`\`text
Example 1:
Input:  s = "12345"
Output: true
Explanation: All five characters are digit characters.
\`\`\`

\`\`\`text
Example 2:
Input:  s = "123abc"
Output: false
Explanation: 'a', 'b', and 'c' are not digit characters.
\`\`\`

\`\`\`text
Example 3:
Input:  s = "3.14"
Output: false
Explanation: '.' is not a digit character.
\`\`\`

**Constraints:**
- \`0 <= s.length <= 1000\`
- \`s\` consists of printable ASCII characters.`,
  hints: [
    `Try checking each character one at a time — if any single character fails the test, you already have your answer.`,
    `A digit character has ASCII value between '0' (48) and '9' (57). You can compare characters directly with '<' and '>'.`,
    `Don't forget the edge case: what should the function return when the string is empty?`,
  ],
  signature: {
    "name": "isAllDigits",
    "params": [
      {
        "name": "s",
        "type": "string"
      }
    ],
    "returns": "bool"
  },
  testCases: [
    {
      "input": [
        "12345"
      ],
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        "hello"
      ],
      "expected": false,
      "hidden": false
    },
    {
      "input": [
        "123abc"
      ],
      "expected": false,
      "hidden": false
    },
    {
      "input": [
        ""
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        "0"
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        "a"
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        "9876543210"
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        " 123"
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        "3.14"
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        "00000"
      ],
      "expected": true,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def is_all_digits(s: str) -> bool:
    # TODO: return True if s contains only digit characters ('0'-'9'), False otherwise
    return False
`,
    javascript: `function isAllDigits(s) {
    // TODO: return true if s contains only digit characters ('0'-'9'), false otherwise
    return false;
}
`,
    java: `class Solution {
    public boolean isAllDigits(String s) {
        // TODO: return true if s contains only digit characters ('0'-'9'), false otherwise
        return false;
    }
}
`,
    c: `#include <stdbool.h>

bool isAllDigits(char* s) {
    // TODO: return true if s contains only digit characters ('0'-'9'), false otherwise
    return false;
}
`,
  },
  solutions: {
    python: `def is_all_digits(s: str) -> bool:
    if not s:
        return False
    for c in s:
        if c < '0' or c > '9':
            return False
    return True
`,
    javascript: `function isAllDigits(s) {
    if (s.length === 0) return false;
    for (let i = 0; i < s.length; i++) {
        if (s[i] < '0' || s[i] > '9') return false;
    }
    return true;
}
`,
    java: `class Solution {
    public boolean isAllDigits(String s) {
        if (s.isEmpty()) return false;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c < '0' || c > '9') return false;
        }
        return true;
    }
}
`,
    c: `#include <stdbool.h>
#include <string.h>

bool isAllDigits(char* s) {
    if (s == NULL || s[0] == '\\0') return false;
    for (int i = 0; s[i] != '\\0'; i++) {
        if (s[i] < '0' || s[i] > '9') return false;
    }
    return true;
}
`,
  },
  editorial: `## Approach: Linear Scan

We iterate through every character in the string and check whether it lies within the range \`'0'\` to \`'9'\`. If any character falls outside that range, we immediately return \`false\`. After a successful scan of all characters we return \`true\`.

The empty-string edge case is handled first: an empty string has no digit characters, so we return \`false\` before the loop.

\`\`\`
function isAllDigits(s):
    if s is empty → return false
    for each character c in s:
        if c < '0' or c > '9' → return false
    return true
\`\`\`

### Why character comparison works
In ASCII (and every encoding used by these languages), the digit characters \`'0'\`–\`'9'\` occupy consecutive code points 48–57. Comparing a character directly with \`'0'\` and \`'9'\` is therefore a reliable, language-agnostic range check.

### Complexity
| | |
|---|---|
| **Time** | O(n) — we visit each character at most once |
| **Space** | O(1) — no extra storage beyond the loop variable |`,
};

export default problem;
