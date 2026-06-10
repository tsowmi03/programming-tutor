import type { CodeProblemDef } from "../types";

export const validAnagram: CodeProblemDef = {
  type: "code",
  slug: "valid-anagram",
  title: "Valid Anagram",
  difficulty: "easy",
  category: "arrays-hashing",
  order: 3,
  description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an **anagram** of \`s\` — that is, \`t\` uses exactly the same letters as \`s\`, the same number of times, in any order.

**Example 1**

\`\`\`text
Input: s = "anagram", t = "nagaram"
Output: true
\`\`\`

**Example 2**

\`\`\`text
Input: s = "rat", t = "car"
Output: false
\`\`\`

**Constraints**

- \`1 <= s.length, t.length <= 50000\`
- \`s\` and \`t\` consist of lowercase English letters only.
`,
  hints: [
    "If the lengths differ, the answer is immediately false.",
    "Count how many times each letter occurs. Two strings are anagrams exactly when their letter counts match.",
    "Since only lowercase a–z appear, a fixed array of 26 counters works: increment for `s`, decrement for `t`, then check that every counter is zero.",
  ],
  signature: {
    name: "isAnagram",
    params: [
      { name: "s", type: "string" },
      { name: "t", type: "string" },
    ],
    returns: "bool",
  },
  testCases: [
    { input: ["anagram", "nagaram"], expected: true },
    { input: ["rat", "car"], expected: false },
    { input: ["a", "a"], expected: true, hidden: true },
    { input: ["ab", "a"], expected: false, hidden: true },
    { input: ["aacc", "ccac"], expected: false, hidden: true },
    { input: ["listen", "silent"], expected: true, hidden: true },
    { input: ["aaaaaaab", "baaaaaaa"], expected: true, hidden: true },
  ],
  starterCode: {
    python: `def is_anagram(s, t):
    """Return True if t is an anagram of s."""
    # Your code here
    pass
`,
    javascript: `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isAnagram(s, t) {
  // Your code here
}
`,
    java: `class Solution {
    public boolean isAnagram(String s, String t) {
        // Your code here
        return false;
    }
}
`,
    c: `bool isAnagram(char* s, char* t) {
    // Your code here
    return false;
}
`,
  },
  solutions: {
    python: `def is_anagram(s, t):
    if len(s) != len(t):
        return False
    counts = {}
    for ch in s:
        counts[ch] = counts.get(ch, 0) + 1
    for ch in t:
        if counts.get(ch, 0) == 0:
            return False
        counts[ch] -= 1
    return True
`,
    javascript: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const counts = new Array(26).fill(0);
  const a = "a".charCodeAt(0);
  for (const ch of s) counts[ch.charCodeAt(0) - a]++;
  for (const ch of t) {
    if (--counts[ch.charCodeAt(0) - a] < 0) return false;
  }
  return true;
}
`,
    java: `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] counts = new int[26];
        for (char c : s.toCharArray()) counts[c - 'a']++;
        for (char c : t.toCharArray()) {
            if (--counts[c - 'a'] < 0) return false;
        }
        return true;
    }
}
`,
    c: `bool isAnagram(char* s, char* t) {
    if (strlen(s) != strlen(t)) return false;
    int counts[26] = {0};
    for (int i = 0; s[i]; i++) counts[s[i] - 'a']++;
    for (int i = 0; t[i]; i++) {
        if (--counts[t[i] - 'a'] < 0) return false;
    }
    return true;
}
`,
  },
  editorial: `## Approach: letter counting

An anagram is just a rearrangement, so two strings are anagrams exactly when
each letter appears the **same number of times** in both. That makes this a
counting problem, not a string problem.

1. If the lengths differ, return false.
2. Count occurrences of each letter in \`s\` (a 26-slot array works because
   the alphabet is fixed).
3. Walk \`t\` decrementing the counters. If any counter would go negative,
   \`t\` has a letter \`s\` doesn't have enough of — return false.

Because lengths are equal, never going negative also means every counter
ends at exactly zero, so a final verification pass isn't needed.

**Complexity:** O(n) time, O(1) space (the counter array's size is fixed at
26, independent of input size).

## Alternative: sort both strings

Sorting both strings and comparing them is a one-liner
(\`sorted(s) == sorted(t)\`) at O(n log n). Great for readability; the
counting approach wins on asymptotics and interview points.
`,
};
