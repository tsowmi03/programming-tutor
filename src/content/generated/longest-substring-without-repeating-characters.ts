import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "longest-substring-without-repeating-characters",
  title: "Longest Substring Without Repeating Characters",
  difficulty: "medium",
  category: "sliding-window",
  order: 1100,
  description: `Given a string \`s\`, return the length of the **longest substring** that contains no repeating characters.

A **substring** is a contiguous sequence of characters within the string.

\`\`\`text
Example 1:
Input:  s = "abcabcbb"
Output: 3
Explanation: "abc" has length 3 and contains no repeating characters.
\`\`\`

\`\`\`text
Example 2:
Input:  s = "bbbbb"
Output: 1
Explanation: "b" has length 1.
\`\`\`

\`\`\`text
Example 3:
Input:  s = "pwwkew"
Output: 3
Explanation: "wke" has length 3.
\`\`\`

**Constraints:**
- \`0 <= s.length <= 10^4\`
- \`s\` consists of printable ASCII characters (codes 32–126).`,
  hints: [
    `Think about maintaining a window [left, right] that contains no duplicates. How do you expand and shrink it?`,
    `Use a data structure to track the last index where each character was seen so you can jump the left pointer forward efficiently.`,
    `When you encounter a character that already exists inside the current window, move the left boundary just past its previous occurrence.`,
  ],
  signature: {
    "name": "lengthOfLongestSubstring",
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
        "abcabcbb"
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        "bbbbb"
      ],
      "expected": 1,
      "hidden": false
    },
    {
      "input": [
        "pwwkew"
      ],
      "expected": 3,
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
        "a"
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        "abcdefghij"
      ],
      "expected": 10,
      "hidden": true
    },
    {
      "input": [
        "aab"
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        "dvdf"
      ],
      "expected": 3,
      "hidden": true
    },
    {
      "input": [
        "anviaj"
      ],
      "expected": 5,
      "hidden": true
    },
    {
      "input": [
        " !  "
      ],
      "expected": 2,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def length_of_longest_substring(s: str) -> int:
    # TODO: implement sliding window
    return 0
`,
    javascript: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
    // TODO: implement sliding window
    return 0;
}
`,
    java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        // TODO: implement sliding window
        return 0;
    }
}
`,
    c: `#include <string.h>
int lengthOfLongestSubstring(char* s) {
    // TODO: implement sliding window
    return 0;
}
`,
  },
  solutions: {
    python: `def length_of_longest_substring(s: str) -> int:
    last_seen = {}
    left = 0
    best = 0
    for right, ch in enumerate(s):
        if ch in last_seen and last_seen[ch] >= left:
            left = last_seen[ch] + 1
        last_seen[ch] = right
        best = max(best, right - left + 1)
    return best
`,
    javascript: `function lengthOfLongestSubstring(s) {
    const lastSeen = new Map();
    let left = 0, best = 0;
    for (let right = 0; right < s.length; right++) {
        const ch = s[right];
        if (lastSeen.has(ch) && lastSeen.get(ch) >= left) {
            left = lastSeen.get(ch) + 1;
        }
        lastSeen.set(ch, right);
        best = Math.max(best, right - left + 1);
    }
    return best;
}
`,
    java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        int[] lastSeen = new int[128];
        java.util.Arrays.fill(lastSeen, -1);
        int left = 0, best = 0;
        for (int right = 0; right < s.length(); right++) {
            int c = s.charAt(right);
            if (lastSeen[c] >= left) {
                left = lastSeen[c] + 1;
            }
            lastSeen[c] = right;
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}
`,
    c: `#include <string.h>
int lengthOfLongestSubstring(char* s) {
    int lastSeen[128];
    int i;
    for (i = 0; i < 128; i++) lastSeen[i] = -1;
    int left = 0, best = 0;
    int n = (int)strlen(s);
    for (int right = 0; right < n; right++) {
        unsigned char c = (unsigned char)s[right];
        if (lastSeen[c] >= left) {
            left = lastSeen[c] + 1;
        }
        lastSeen[c] = right;
        int len = right - left + 1;
        if (len > best) best = len;
    }
    return best;
}
`,
  },
  editorial: `## Approach: Sliding Window with Last-Seen Index

### Intuition
Maintain a window \`[left, right]\` that always contains unique characters. As we advance \`right\` one step at a time, if the new character \`s[right]\` already appears inside the current window, we move \`left\` forward to one position past that character's previous occurrence — effectively removing the duplicate.

### Algorithm
1. Keep a map \`lastSeen\` from character → most recent index.
2. For each \`right\` from \`0\` to \`n-1\`:
   - If \`lastSeen[s[right]] >= left\`, set \`left = lastSeen[s[right]] + 1\`.
   - Update \`lastSeen[s[right]] = right\`.
   - Update \`best = max(best, right - left + 1)\`.
3. Return \`best\`.

### Why it works
At every step, the invariant is that \`s[left..right]\` has no repeating characters. We never move \`left\` backwards, so the window only grows or slides right — a classic sliding-window pattern.

### Complexity
- **Time:** O(n) — each character is visited at most twice (once by \`right\`, once when \`left\` jumps over it).
- **Space:** O(min(n, Σ)) where Σ is the alphabet size (128 for ASCII).

### Edge cases
- Empty string → return 0 immediately.
- All same characters → window never grows past 1.
- All unique characters → window grows to the full string length.`,
};

export default problem;
