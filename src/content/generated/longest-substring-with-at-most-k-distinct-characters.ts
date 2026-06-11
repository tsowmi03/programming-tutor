import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "longest-substring-with-at-most-k-distinct-characters",
  title: "Longest Substring with At Most K Distinct Characters",
  difficulty: "medium",
  category: "sliding-window",
  order: 1103,
  description: `Given a string \`s\` and a non-negative integer \`k\`, return the **length** of the longest substring of \`s\` that contains **at most** \`k\` distinct characters.

If \`k\` is 0 or the string is empty, return 0.

\`\`\`text
Example 1:
Input:  s = "eceba", k = 2
Output: 3
Explanation: The substring "ece" has 2 distinct characters and length 3.
\`\`\`

\`\`\`text
Example 2:
Input:  s = "aabbcc", k = 2
Output: 4
Explanation: "aabb" and "bbcc" each have 2 distinct characters and length 4.
\`\`\`

**Constraints:**
- \`0 <= s.length <= 10^4\`
- \`0 <= k <= 26\`
- \`s\` consists of only lowercase English letters.`,
  hints: [
    `Think about maintaining a window [left, right] and expanding right one step at a time. What do you do when the window contains more than k distinct characters?`,
    `Keep a frequency count of characters in the current window. When distinct characters exceed k, advance left until the invariant is restored.`,
    `Each character is added to the window once and removed at most once, giving an O(n) overall solution.`,
  ],
  signature: {
    "name": "longestKDistinct",
    "params": [
      {
        "name": "s",
        "type": "string"
      },
      {
        "name": "k",
        "type": "int"
      }
    ],
    "returns": "int"
  },
  testCases: [
    {
      "input": [
        "eceba",
        2
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        "aabbcc",
        2
      ],
      "expected": 4,
      "hidden": false
    },
    {
      "input": [
        "aa",
        1
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        "abcabcabc",
        3
      ],
      "expected": 9,
      "hidden": true
    },
    {
      "input": [
        "abcdef",
        1
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        "",
        2
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        "a",
        0
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        "aaabbb",
        1
      ],
      "expected": 3,
      "hidden": true
    },
    {
      "input": [
        "abaccc",
        2
      ],
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        "aabbccdd",
        3
      ],
      "expected": 6,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def longest_kdistinct(s: str, k: int) -> int:
    # TODO: implement using a sliding window
    return 0
`,
    javascript: `function longestKDistinct(s, k) {
    // TODO: implement using a sliding window
    return 0;
}
`,
    java: `class Solution {
    public int longestKDistinct(String s, int k) {
        // TODO: implement using a sliding window
        return 0;
    }
}
`,
    c: `#include <string.h>
int longestKDistinct(char* s, int k) {
    // TODO: implement using a sliding window
    return 0;
}
`,
  },
  solutions: {
    python: `def longest_kdistinct(s: str, k: int) -> int:
    if k == 0 or not s:
        return 0
    freq = {}
    left = 0
    max_len = 0
    for right in range(len(s)):
        c = s[right]
        freq[c] = freq.get(c, 0) + 1
        while len(freq) > k:
            lc = s[left]
            freq[lc] -= 1
            if freq[lc] == 0:
                del freq[lc]
            left += 1
        max_len = max(max_len, right - left + 1)
    return max_len
`,
    javascript: `function longestKDistinct(s, k) {
    if (k === 0 || s.length === 0) return 0;
    const freq = new Map();
    let left = 0, maxLen = 0;
    for (let right = 0; right < s.length; right++) {
        const c = s[right];
        freq.set(c, (freq.get(c) || 0) + 1);
        while (freq.size > k) {
            const lc = s[left];
            freq.set(lc, freq.get(lc) - 1);
            if (freq.get(lc) === 0) freq.delete(lc);
            left++;
        }
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}
`,
    java: `class Solution {
    public int longestKDistinct(String s, int k) {
        if (k == 0 || s.length() == 0) return 0;
        int[] freq = new int[128];
        int distinct = 0, left = 0, maxLen = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (freq[c] == 0) distinct++;
            freq[c]++;
            while (distinct > k) {
                char lc = s.charAt(left);
                freq[lc]--;
                if (freq[lc] == 0) distinct--;
                left++;
            }
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}
`,
    c: `#include <string.h>
int longestKDistinct(char* s, int k) {
    if (k == 0) return 0;
    int n = (int)strlen(s);
    if (n == 0) return 0;
    int freq[128] = {0};
    int distinct = 0, left = 0, maxLen = 0;
    for (int right = 0; right < n; right++) {
        int c = (unsigned char)s[right];
        if (freq[c] == 0) distinct++;
        freq[c]++;
        while (distinct > k) {
            int lc = (unsigned char)s[left];
            freq[lc]--;
            if (freq[lc] == 0) distinct--;
            left++;
        }
        int len = right - left + 1;
        if (len > maxLen) maxLen = len;
    }
    return maxLen;
}
`,
  },
  editorial: `## Approach: Sliding Window

We maintain a window \`[left, right]\` and slide \`right\` across the string one character at a time. A frequency table tracks how many times each character appears in the current window, and a \`distinct\` counter tracks unique characters.

**Algorithm:**
1. For each \`right\`, add \`s[right]\` to the frequency table. If its count was 0 before, increment \`distinct\`.
2. While \`distinct > k\`, shrink from the left: decrement \`freq[s[left]]\`; if it hits 0, decrement \`distinct\`. Advance \`left\`.
3. After restoring the invariant, update \`maxLen = max(maxLen, right - left + 1)\`.

**Trace for \`"eceba", k = 2\`:**
\`\`\`
right=0 'e': window="e",   distinct=1, maxLen=1
right=1 'c': window="ec",  distinct=2, maxLen=2
right=2 'e': window="ece", distinct=2, maxLen=3
right=3 'b': distinct=3>2 → shrink left=0('e'→freq 1), left=1('c'→freq 0,distinct=2)
             window="eb",  len=2, maxLen=3
right=4 'a': distinct=3>2 → shrink left=2('e'→freq 0,distinct=2)
             window="ba",  len=2, maxLen=3
Result: 3
\`\`\`

**Complexity:**
- **Time:** O(n) — each character enters and leaves the window at most once.
- **Space:** O(1) — frequency array bounded by alphabet size (26 or 128).`,
};

export default problem;
