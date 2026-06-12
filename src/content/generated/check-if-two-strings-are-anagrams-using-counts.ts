import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "check-if-two-strings-are-anagrams-using-counts",
  title: "Valid Anagram Check",
  difficulty: "easy",
  category: "arrays-hashing",
  order: 1047,
  description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.

Two strings are **anagrams** of each other if they contain the same characters with the same frequencies (order does not matter).

\`\`\`text
Example 1:
Input:  s = "anagram", t = "nagaram"
Output: true
Explanation: Both strings contain exactly {a:3, n:1, g:1, r:1, m:1}.
\`\`\`

\`\`\`text
Example 2:
Input:  s = "rat", t = "car"
Output: false
Explanation: s has 't' but t has 'c', so they are not anagrams.
\`\`\`

\`\`\`text
Example 3:
Input:  s = "listen", t = "silent"
Output: true
Explanation: Both strings contain exactly {l:1, i:1, s:1, t:1, e:1, n:1}.
\`\`\`

**Constraints:**
- \`0 <= s.length, t.length <= 5 * 10^4\`
- \`s\` and \`t\` consist of lowercase English letters only.`,
  hints: [
    `If the two strings have different lengths, can they ever be anagrams?`,
    `Count the frequency of each character in both strings and compare the counts.`,
    `Try using a single integer array of size 26 — increment counts for characters in \`s\` and decrement for characters in \`t\`. What should every element equal if they are anagrams?`,
  ],
  signature: {
    "name": "isAnagram",
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
        "anagram",
        "nagaram"
      ],
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        "rat",
        "car"
      ],
      "expected": false,
      "hidden": false
    },
    {
      "input": [
        "listen",
        "silent"
      ],
      "expected": true,
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
        "a"
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        "ab",
        "a"
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        "aab",
        "baa"
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        "aacc",
        "ccac"
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        "abcde",
        "edcba"
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        "abc",
        "abd"
      ],
      "expected": false,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def is_anagram(s: str, t: str) -> bool:
    # TODO: implement
    return False
`,
    javascript: `function isAnagram(s, t) {
    // TODO: implement
    return false;
}
`,
    java: `class Solution {
    public boolean isAnagram(String s, String t) {
        // TODO: implement
        return false;
    }
}
`,
    c: `#include <stdbool.h>
#include <string.h>

bool isAnagram(char* s, char* t) {
    // TODO: implement
    return false;
}
`,
  },
  solutions: {
    python: `def is_anagram(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False
    counts = [0] * 26
    for c in s:
        counts[ord(c) - ord('a')] += 1
    for c in t:
        counts[ord(c) - ord('a')] -= 1
    return all(x == 0 for x in counts)
`,
    javascript: `function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    const counts = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
        counts[s.charCodeAt(i) - 97]++;
        counts[t.charCodeAt(i) - 97]--;
    }
    return counts.every(x => x === 0);
}
`,
    java: `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] counts = new int[26];
        for (char c : s.toCharArray()) counts[c - 'a']++;
        for (char c : t.toCharArray()) counts[c - 'a']--;
        for (int x : counts) {
            if (x != 0) return false;
        }
        return true;
    }
}
`,
    c: `#include <stdbool.h>
#include <string.h>

bool isAnagram(char* s, char* t) {
    int ls = (int)strlen(s);
    int lt = (int)strlen(t);
    if (ls != lt) return false;
    int counts[26] = {0};
    for (int i = 0; i < ls; i++) {
        counts[s[i] - 'a']++;
        counts[t[i] - 'a']--;
    }
    for (int i = 0; i < 26; i++) {
        if (counts[i] != 0) return false;
    }
    return true;
}
`,
  },
  editorial: `## Approach: Character Frequency Counting

### Key Insight
Two strings are anagrams if and only if every character appears **exactly the same number of times** in both strings.

### Algorithm
1. **Early exit**: if \`len(s) != len(t)\`, return \`false\` immediately — anagrams must have equal length.
2. **Single frequency array**: Create an integer array \`counts[26]\` initialized to 0.
3. **Increment / Decrement**: For each character in \`s\`, increment its slot; for each character in \`t\`, decrement its slot.
4. **Verify**: If every element of \`counts\` is 0, all characters balance out — the strings are anagrams.

### Why a Single Array?
Using one array and performing both increment and decrement keeps the code concise. Any imbalance — whether a character appears too many times in \`s\` or in \`t\` — leaves a non-zero entry.

### Complexity
- **Time**: O(n) where n = length of the strings (each character visited at most twice).
- **Space**: O(1) — the frequency array is always exactly 26 integers, independent of input size.`,
};

export default problem;
