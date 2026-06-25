import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "check-whether-one-string-is-a-subsequence-of-another",
  title: "Is Subsequence",
  difficulty: "easy",
  category: "two-pointers",
  order: 1012,
  description: `Given two strings \`s\` and \`t\`, return \`true\` if \`s\` is a **subsequence** of \`t\`, or \`false\` otherwise.

A subsequence of a string is a new string formed from the original string by deleting some (or no) characters without disturbing the relative order of the remaining characters.

\`\`\`text
Example 1:
Input:  s = "ace", t = "abcde"
Output: true
Explanation: 'a', 'c', and 'e' all appear in order inside "abcde".
\`\`\`

\`\`\`text
Example 2:
Input:  s = "aec", t = "abcde"
Output: false
Explanation: 'e' comes after 'c' in t, so "aec" cannot be formed as a subsequence.
\`\`\`

\`\`\`text
Example 3:
Input:  s = "", t = "abcde"
Output: true
Explanation: An empty string is a subsequence of any string.
\`\`\`

**Constraints:**
- \`0 <= s.length <= 100\`
- \`0 <= t.length <= 10^4\`
- \`s\` and \`t\` consist only of lowercase English letters.`,
  hints: [
    `Try walking through both strings simultaneously with two separate pointers — one for s and one for t.`,
    `When the characters pointed to by both pointers match, advance the pointer in s. Always advance the pointer in t. If the pointer in s reaches the end of s, you're done.`,
  ],
  guidance: [
    {
      "title": "Start with two pointers",
      "body": "Use pointer `i` for `s` and pointer `j` for `t`. Both start at 0. Iterate until either pointer goes out of bounds.",
      "level": "nudge"
    },
    {
      "title": "Matching rule",
      "body": "At each step, check if `s[i] == t[j]`. If yes, increment both `i` and `j`. If no, increment only `j`. This way you consume `t` fully while greedily matching characters of `s` in order.",
      "level": "strategy"
    },
    {
      "title": "Termination condition",
      "body": "After the loop, `s` is a subsequence of `t` if and only if `i == len(s)` — meaning every character in `s` was matched.",
      "level": "strategy"
    },
    {
      "title": "Edge cases to watch",
      "body": "An empty `s` is always a subsequence (the loop never runs and `i == 0 == len(s)`). If `s` is longer than `t`, it can never be a subsequence — the two-pointer approach handles this naturally.",
      "level": "pitfall"
    }
  ],

  signature: {
    "name": "isSubsequence",
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
    "returns": "bool",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        "ace",
        "abcde"
      ],
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        "aec",
        "abcde"
      ],
      "expected": false,
      "hidden": false
    },
    {
      "input": [
        "",
        "abcde"
      ],
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        "abc",
        "ahbgdc"
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        "axc",
        "ahbgdc"
      ],
      "expected": false,
      "hidden": true
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
        ""
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        "abcde",
        "abcde"
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        "abcdef",
        "abcde"
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        "b",
        "abc"
      ],
      "expected": true,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def is_subsequence(s: str, t: str) -> bool:
    # TODO: implement using two pointers
    pass
`,
    javascript: `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isSubsequence(s, t) {
    // TODO: implement using two pointers
}
`,
    typescript: `function isSubsequence(s: string, t: string): boolean {
    // TODO: implement using two pointers
}
`,
    java: `class Solution {
    public boolean isSubsequence(String s, String t) {
        // TODO: implement using two pointers
        return false;
    }
}
`,
    csharp: `public class Solution {
    public bool IsSubsequence(string s, string t) {
        // TODO: implement using two pointers
        return false;
    }
}
`,
    c: `bool isSubsequence(char* s, char* t) {
    // TODO: implement using two pointers
    return false;
}
`,
    cpp: `class Solution {
public:
    bool isSubsequence(string s, string t) {
        // TODO: implement using two pointers
        return false;
    }
};
`,
  },
  solutions: {
    python: `def is_subsequence(s: str, t: str) -> bool:
    i, j = 0, 0
    while i < len(s) and j < len(t):
        if s[i] == t[j]:
            i += 1
        j += 1
    return i == len(s)
`,
    javascript: `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isSubsequence(s, t) {
    let i = 0, j = 0;
    while (i < s.length && j < t.length) {
        if (s[i] === t[j]) {
            i++;
        }
        j++;
    }
    return i === s.length;
}
`,
    typescript: `function isSubsequence(s: string, t: string): boolean {
    let i = 0, j = 0;
    while (i < s.length && j < t.length) {
        if (s[i] === t[j]) {
            i++;
        }
        j++;
    }
    return i === s.length;
}
`,
    java: `class Solution {
    public boolean isSubsequence(String s, String t) {
        int i = 0, j = 0;
        while (i < s.length() && j < t.length()) {
            if (s.charAt(i) == t.charAt(j)) {
                i++;
            }
            j++;
        }
        return i == s.length();
    }
}
`,
    csharp: `public class Solution {
    public bool IsSubsequence(string s, string t) {
        int i = 0, j = 0;
        while (i < s.Length && j < t.Length) {
            if (s[i] == t[j]) {
                i++;
            }
            j++;
        }
        return i == s.Length;
    }
}
`,
    c: `#include <stdbool.h>
#include <string.h>

bool isSubsequence(char* s, char* t) {
    int i = 0, j = 0;
    int sLen = (int)strlen(s);
    int tLen = (int)strlen(t);
    while (i < sLen && j < tLen) {
        if (s[i] == t[j]) {
            i++;
        }
        j++;
    }
    return i == sLen;
}
`,
    cpp: `class Solution {
public:
    bool isSubsequence(string s, string t) {
        int i = 0, j = 0;
        while (i < (int)s.size() && j < (int)t.size()) {
            if (s[i] == t[j]) {
                i++;
            }
            j++;
        }
        return i == (int)s.size();
    }
};
`,
  },
  editorial: `## Approach: Two Pointers

### Intuition

We need to check whether every character of \`s\` appears in \`t\` **in order**. The two-pointer technique is a natural fit: maintain one pointer for \`s\` and one for \`t\`, advancing each according to whether the current characters match.

### Algorithm

1. Initialize \`i = 0\` (pointer into \`s\`) and \`j = 0\` (pointer into \`t\`).
2. While \`i < len(s)\` and \`j < len(t)\`:
   - If \`s[i] == t[j]\`, increment \`i\` (we matched one character of \`s\`).
   - Always increment \`j\` (we consume one character of \`t\`).
3. After the loop, if \`i == len(s)\`, all characters of \`s\` were matched in order → return \`true\`. Otherwise return \`false\`.

### Example Walkthrough

\`\`\`
s = "ace", t = "abcde"

i=0 j=0: s[0]='a' == t[0]='a' → i=1, j=1
i=1 j=1: s[1]='c' != t[1]='b' →      j=2
i=1 j=2: s[1]='c' == t[2]='c' → i=2, j=3
i=2 j=3: s[2]='e' != t[3]='d' →      j=4
i=2 j=4: s[2]='e' == t[4]='e' → i=3, j=5
Loop ends (i==3==len(s)) → return true
\`\`\`

### Complexity

- **Time:** O(n) where n = len(t). We scan \`t\` at most once.
- **Space:** O(1). Only two integer pointers are used.`,
};

export default problem;
