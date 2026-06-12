import type { CodeProblemDef } from "../types";

export const longestSubstring: CodeProblemDef = {
  type: "code",
  slug: "longest-substring-without-repeating-characters",
  title: "Longest Substring Without Repeating Characters",
  difficulty: "medium",
  category: "sliding-window",
  order: 1,
  description: `Given a string \`s\`, find the length of the **longest substring** (contiguous!) that contains no repeated characters.

**Example 1**

\`\`\`text
Input: s = "abcabcbb"
Output: 3
Explanation: "abc" has length 3.
\`\`\`

**Example 2**

\`\`\`text
Input: s = "bbbbb"
Output: 1
\`\`\`

**Example 3**

\`\`\`text
Input: s = "pwwkew"
Output: 3
Explanation: "wke" — note "pwke" is a subsequence, not a substring.
\`\`\`

**Constraints**

- \`0 <= s.length <= 50000\`
- \`s\` consists of printable ASCII characters.
`,
  hints: [
    `Checking every substring is O(n³)/O(n²). Instead, grow a window \`[left, right]\` that always contains unique characters.`,
    `Move \`right\` forward one character at a time. If the new character already appears in the window, shrink from the left until it doesn't.`,
    `Keep a set of the characters in the window (or a map from character to its last index, letting \`left\` jump instead of crawl). Track the best window length seen.`,
  ],
  signature: {
    "name": "lengthOfLongestSubstring",
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
        "abcabcbb"
      ],
      "expected": 3
    },
    {
      "input": [
        "bbbbb"
      ],
      "expected": 1
    },
    {
      "input": [
        "pwwkew"
      ],
      "expected": 3
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
        " "
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        "au"
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
        "abba"
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        "tmmzuxt"
      ],
      "expected": 5,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def length_of_longest_substring(s):
    """Return the length of the longest substring without
    repeating characters."""
    # Your code here
    pass
`,
    javascript: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
  // Your code here
}
`,
    typescript: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s: string): number {
  // Your code here
  return 0;
}`,
    java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Your code here
        return 0;
    }
}
`,
    csharp: `using System.Collections.Generic;

public class Solution {
    public int LengthOfLongestSubstring(string s) {
        // Your code here
        return 0;
    }
}`,
    c: `int lengthOfLongestSubstring(char* s) {
    // Your code here
    return 0;
}
`,
    cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        // Your code here
        return 0;
    }
};`,
  },
  solutions: {
    python: `def length_of_longest_substring(s):
    last = {}  # char -> most recent index
    left = 0
    best = 0
    for right, ch in enumerate(s):
        if ch in last and last[ch] >= left:
            left = last[ch] + 1
        last[ch] = right
        best = max(best, right - left + 1)
    return best
`,
    javascript: `function lengthOfLongestSubstring(s) {
  const last = new Map(); // char -> most recent index
  let left = 0;
  let best = 0;
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (last.has(ch) && last.get(ch) >= left) {
      left = last.get(ch) + 1;
    }
    last.set(ch, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}
`,
    typescript: `function lengthOfLongestSubstring(s: string): number {
  const last = new Map<string, number>(); // char -> most recent index
  let left = 0;
  let best = 0;
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (last.has(ch) && last.get(ch)! >= left) {
      left = last.get(ch)! + 1;
    }
    last.set(ch, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
    java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> last = new HashMap<>();
        int left = 0, best = 0;
        for (int right = 0; right < s.length(); right++) {
            char ch = s.charAt(right);
            if (last.containsKey(ch) && last.get(ch) >= left) {
                left = last.get(ch) + 1;
            }
            last.put(ch, right);
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}
`,
    csharp: `using System.Collections.Generic;

public class Solution {
    public int LengthOfLongestSubstring(string s) {
        Dictionary<char, int> last = new Dictionary<char, int>();
        int left = 0, best = 0;
        for (int right = 0; right < s.Length; right++) {
            char ch = s[right];
            if (last.ContainsKey(ch) && last[ch] >= left) {
                left = last[ch] + 1;
            }
            last[ch] = right;
            best = System.Math.Max(best, right - left + 1);
        }
        return best;
    }
}`,
    c: `int lengthOfLongestSubstring(char* s) {
    int last[128];
    for (int i = 0; i < 128; i++) last[i] = -1;
    int left = 0, best = 0;
    for (int right = 0; s[right]; right++) {
        unsigned char ch = (unsigned char)s[right];
        if (last[ch] >= left) {
            left = last[ch] + 1;
        }
        last[ch] = right;
        int len = right - left + 1;
        if (len > best) best = len;
    }
    return best;
}
`,
    cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        int last[128];
        for (int i = 0; i < 128; i++) last[i] = -1;
        int left = 0, best = 0;
        for (int right = 0; right < (int)s.size(); right++) {
            unsigned char ch = (unsigned char)s[right];
            if (last[ch] >= left) {
                left = last[ch] + 1;
            }
            last[ch] = right;
            int len = right - left + 1;
            if (len > best) best = len;
        }
        return best;
    }
};`,
  },
  editorial: `## Approach: sliding window

The brute force re-examines the same characters over and over. A **sliding
window** avoids that by maintaining an invariant: the window
\`s[left..right]\` always contains **no repeats**.

Advance \`right\` one character at a time. When the incoming character
violates the invariant (it's already in the window), advance \`left\` just
far enough to restore it. The best answer is the largest window seen.

The refined version here stores, for each character, its **most recent
index**. When a repeat appears, \`left\` jumps directly past the previous
occurrence instead of crawling — but only if that occurrence is inside the
current window (\`last[ch] >= left\`). The \`"abba"\` test exists precisely
to punish skipping that check: when \`right\` reaches the final \`'a'\`, the
stale entry for \`'a'\` points *before* \`left\`, and moving \`left\`
backwards would wrongly count \`"ba"\` plus the leading \`"ab"\` as one
window.

Both pointers only move forward, so the total work is O(n) even though
there are two pointers.

**Complexity:** O(n) time; O(min(n, alphabet)) space.

Sliding windows fit any "longest/shortest contiguous range satisfying a
condition" problem where the condition is easy to maintain incrementally.
`,
};
