import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "longest-substring-with-at-most-two-distinct-characters",
  title: "Longest Substring with At Most Two Distinct Characters",
  difficulty: "medium",
  category: "sliding-window",
  order: 1101,
  description: `Given a string \`s\`, return the length of the longest substring that contains **at most two distinct characters**.

\`\`\`text
Example 1:
Input:  s = "eceba"
Output: 3
Explanation: The substring "ece" has at most 2 distinct characters and length 3.
\`\`\`

\`\`\`text
Example 2:
Input:  s = "ccaabbb"
Output: 5
Explanation: The substring "aabbb" has at most 2 distinct characters and length 5.
\`\`\`

\`\`\`text
Example 3:
Input:  s = "a"
Output: 1
Explanation: Single character string, 1 distinct character.
\`\`\`

**Constraints:**
- \`1 <= s.length <= 10^5\`
- \`s\` consists of printable ASCII characters (codes 32–126).`,
  hints: [
    `Think about maintaining a sliding window [left, right] and tracking how many distinct characters are currently inside it.`,
    `Use a frequency map (or array of size 128) to count occurrences of each character in the current window. The number of distinct characters equals the number of entries with count > 0.`,
    `When the number of distinct characters exceeds 2, shrink the window from the left: decrement the count of s[left], and if it reaches 0 remove that character from your distinct-count, then advance left.`,
    `After each valid window state, update your answer with (right - left + 1).`,
  ],
  signature: {
    "name": "lengthOfLongestSubstringTwoDistinct",
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
        "eceba"
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        "ccaabbb"
      ],
      "expected": 5,
      "hidden": false
    },
    {
      "input": [
        "a"
      ],
      "expected": 1,
      "hidden": false
    },
    {
      "input": [
        "abcabcabc"
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        "aabbcc"
      ],
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        "aaaa"
      ],
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        "ab"
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        "abaccc"
      ],
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        "aab"
      ],
      "expected": 3,
      "hidden": true
    },
    {
      "input": [
        "abcdef"
      ],
      "expected": 2,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def length_of_longest_substring_two_distinct(s: str) -> int:
    # TODO: implement sliding window
    return 0
`,
    javascript: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstringTwoDistinct(s) {
    // TODO: implement sliding window
    return 0;
}
`,
    java: `class Solution {
    public int lengthOfLongestSubstringTwoDistinct(String s) {
        // TODO: implement sliding window
        return 0;
    }
}
`,
    c: `int lengthOfLongestSubstringTwoDistinct(char* s) {
    // TODO: implement sliding window
    return 0;
}
`,
  },
  solutions: {
    python: `def length_of_longest_substring_two_distinct(s: str) -> int:
    freq = {}
    left = 0
    best = 0
    for right, ch in enumerate(s):
        freq[ch] = freq.get(ch, 0) + 1
        while len(freq) > 2:
            lc = s[left]
            freq[lc] -= 1
            if freq[lc] == 0:
                del freq[lc]
            left += 1
        best = max(best, right - left + 1)
    return best
`,
    javascript: `function lengthOfLongestSubstringTwoDistinct(s) {
    const freq = new Map();
    let left = 0;
    let best = 0;
    for (let right = 0; right < s.length; right++) {
        const ch = s[right];
        freq.set(ch, (freq.get(ch) || 0) + 1);
        while (freq.size > 2) {
            const lc = s[left];
            freq.set(lc, freq.get(lc) - 1);
            if (freq.get(lc) === 0) freq.delete(lc);
            left++;
        }
        best = Math.max(best, right - left + 1);
    }
    return best;
}
`,
    java: `class Solution {
    public int lengthOfLongestSubstringTwoDistinct(String s) {
        int[] freq = new int[128];
        int distinct = 0;
        int left = 0;
        int best = 0;
        for (int right = 0; right < s.length(); right++) {
            int rc = s.charAt(right);
            if (freq[rc] == 0) distinct++;
            freq[rc]++;
            while (distinct > 2) {
                int lc = s.charAt(left);
                freq[lc]--;
                if (freq[lc] == 0) distinct--;
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}
`,
    c: `int lengthOfLongestSubstringTwoDistinct(char* s) {
    int freq[128] = {0};
    int distinct = 0;
    int left = 0;
    int best = 0;
    for (int right = 0; s[right] != '\\0'; right++) {
        unsigned char rc = (unsigned char)s[right];
        if (freq[rc] == 0) distinct++;
        freq[rc]++;
        while (distinct > 2) {
            unsigned char lc = (unsigned char)s[left];
            freq[lc]--;
            if (freq[lc] == 0) distinct--;
            left++;
        }
        int len = right - left + 1;
        if (len > best) best = len;
    }
    return best;
}
`,
  },
  editorial: `## Approach: Sliding Window with Frequency Map

### Intuition
We maintain a window \`[left, right]\` that always contains **at most 2 distinct characters**. We expand the window to the right one character at a time, and shrink from the left whenever the distinct-character count exceeds 2.

### Algorithm
1. Keep a frequency counter (hash map or fixed array of size 128 for ASCII).
2. For each \`right\` index:
   - Add \`s[right]\` to the frequency counter. If its count goes from 0 → 1, increment \`distinct\`.
   - While \`distinct > 2\`, remove \`s[left]\` from the counter (decrement its frequency; if it reaches 0, decrement \`distinct\` too) and advance \`left\`.
   - Update \`best = max(best, right - left + 1)\`.
3. Return \`best\`.

### Complexity
- **Time:** O(n) — each character enters and leaves the window at most once.
- **Space:** O(1) — the frequency array/map holds at most 128 entries (bounded constant for ASCII).

### Example walkthrough (\`"eceba"\`):
| right | ch | window | distinct | best |
|-------|----|--------|----------|------|
| 0 | e | [0,0] | 1 | 1 |
| 1 | c | [0,1] | 2 | 2 |
| 2 | e | [0,2] | 2 | 3 |
| 3 | b | [0,3]→shrink→[1,3] | 2 | 3 |
| 4 | a | [1,4]→shrink→[3,4] | 2 | 3 |

Final answer: **3**.`,
};

export default problem;
