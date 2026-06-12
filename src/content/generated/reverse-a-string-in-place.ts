import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "reverse-a-string-in-place",
  title: "Reverse a String",
  difficulty: "easy",
  category: "foundations",
  order: 1004,
  description: `Given a string \`s\`, return a new string containing the characters of \`s\` in reverse order.

\`\`\`text
Example 1:
Input:  s = "hello"
Output: "olleh"
Explanation: Reading "hello" from right to left gives "olleh".
\`\`\`

\`\`\`text
Example 2:
Input:  s = "racecar"
Output: "racecar"
Explanation: "racecar" is a palindrome, so reversing it yields the same string.
\`\`\`

**Constraints:**
- \`0 <= s.length <= 10^4\`
- \`s\` consists of printable ASCII characters.`,
  hints: [
    `Think about how you'd swap the first and last characters, then move both pointers inward.`,
    `A two-pointer approach works well: one pointer starts at index 0, the other at index n-1; keep swapping and moving until they meet.`,
    `In Python a slicing trick (s[::-1]) reverses a string in one line; in Java, StringBuilder has a built-in reverse() method.`,
  ],
  signature: {
    "name": "reverseString",
    "params": [
      {
        "name": "s",
        "type": "string"
      }
    ],
    "returns": "string"
  },
  testCases: [
    {
      "input": [
        "hello"
      ],
      "expected": "olleh",
      "hidden": false
    },
    {
      "input": [
        "abcde"
      ],
      "expected": "edcba",
      "hidden": false
    },
    {
      "input": [
        "racecar"
      ],
      "expected": "racecar",
      "hidden": false
    },
    {
      "input": [
        "a"
      ],
      "expected": "a",
      "hidden": true
    },
    {
      "input": [
        ""
      ],
      "expected": "",
      "hidden": true
    },
    {
      "input": [
        "ab"
      ],
      "expected": "ba",
      "hidden": true
    },
    {
      "input": [
        "Hello World"
      ],
      "expected": "dlroW olleH",
      "hidden": true
    },
    {
      "input": [
        "12345"
      ],
      "expected": "54321",
      "hidden": true
    },
    {
      "input": [
        "zzzzzz"
      ],
      "expected": "zzzzzz",
      "hidden": true
    }
  ],
  starterCode: {
    python: `def reverse_string(s: str) -> str:
    # TODO: return the characters of s in reverse order
    return ""
`,
    javascript: `function reverseString(s) {
    // TODO: return the characters of s in reverse order
    return "";
}
`,
    java: `class Solution {
    public String reverseString(String s) {
        // TODO: return the characters of s in reverse order
        return "";
    }
}
`,
    c: `#include <stdlib.h>
#include <string.h>

char* reverseString(char* s) {
    /* TODO: return a newly allocated string with characters in reverse order */
    return "";
}
`,
  },
  solutions: {
    python: `def reverse_string(s: str) -> str:
    return s[::-1]
`,
    javascript: `function reverseString(s) {
    return s.split('').reverse().join('');
}
`,
    java: `class Solution {
    public String reverseString(String s) {
        return new StringBuilder(s).reverse().toString();
    }
}
`,
    c: `#include <stdlib.h>
#include <string.h>

char* reverseString(char* s) {
    int len = (int)strlen(s);
    char* result = (char*)malloc(len + 1);
    for (int i = 0; i < len; i++) {
        result[i] = s[len - 1 - i];
    }
    result[len] = '\\0';
    return result;
}
`,
  },
  editorial: `## Approach: Two-Pointer Swap

The classic idea is to keep two pointers, \`left = 0\` and \`right = n - 1\`, and repeatedly swap the characters they point to, then advance \`left\` forward and \`right\` backward until the pointers meet in the middle.

Because strings are immutable in Python, JavaScript, and Java, we first convert to a mutable structure (list / array / StringBuilder), perform the swaps, then convert back.

\`\`\`
left = 0, right = n-1
while left < right:
    swap(s[left], s[right])
    left++, right--
\`\`\`

**Why it works:** every character at position \`i\` from the left maps to position \`n-1-i\` in the reversed string; the two-pointer swap achieves exactly this in ⌊n/2⌋ iterations.

**Time Complexity:** O(n) — each character is visited at most once.

**Space Complexity:** O(n) for the output string; the swap itself uses O(1) extra space.`,
};

export default problem;
