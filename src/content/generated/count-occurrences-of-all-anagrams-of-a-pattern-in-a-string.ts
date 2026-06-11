import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-occurrences-of-all-anagrams-of-a-pattern-in-a-string",
  title: "Count All Anagram Occurrences",
  difficulty: "medium",
  category: "sliding-window",
  order: 1107,
  description: `Given a string \`s\` and a pattern string \`p\`, return the **number of starting indices** in \`s\` where a substring of length \`len(p)\` is an anagram of \`p\`.

An **anagram** is a rearrangement of all characters of a string.

\`\`\`text
Example 1:
Input:  s = "cbaebabacd", p = "abc"
Output: 2
Explanation:
  s[0..2]="cba" ✓  (c,b,a — same counts as a,b,c)
  s[6..8]="bac" ✓
  All other windows don't match → 2 total.
\`\`\`

\`\`\`text
Example 2:
Input:  s = "abab", p = "ab"
Output: 3
Explanation:
  s[0..1]="ab" ✓, s[1..2]="ba" ✓, s[2..3]="ab" ✓ → 3 matches.
\`\`\`

\`\`\`text
Example 3:
Input:  s = "aababab", p = "ab"
Output: 5
Explanation:
  s[0..1]="aa" ✗, s[1..2]="ab" ✓, s[2..3]="ba" ✓,
  s[3..4]="ab" ✓, s[4..5]="ba" ✓, s[5..6]="ab" ✓ → 5 matches.
\`\`\`

**Constraints:**
- \`1 <= len(s) <= 10^4\`
- \`1 <= len(p) <= len(s)\`
- \`s\` and \`p\` consist of lowercase English letters only.`,
  hints: [
    `A fixed-size sliding window of length len(p) lets you examine every substring of s in O(1) amortised time.`,
    `Instead of sorting each window, maintain a frequency array of size 26 for both the window and the pattern; compare them when the window is full.`,
    `When sliding the window one step right, decrement the count for the character leaving the left end and increment for the character entering the right end — then compare the two frequency arrays.`,
  ],
  signature: {
    "name": "countAnagrams",
    "params": [
      {
        "name": "s",
        "type": "string"
      },
      {
        "name": "p",
        "type": "string"
      }
    ],
    "returns": "int",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        "cbaebabacd",
        "abc"
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        "abab",
        "ab"
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        "aababab",
        "ab"
      ],
      "expected": 5,
      "hidden": false
    },
    {
      "input": [
        "aaaaaaa",
        "aa"
      ],
      "expected": 6,
      "hidden": true
    },
    {
      "input": [
        "abcdef",
        "xyz"
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        "a",
        "a"
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        "ab",
        "ba"
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        "abacbabc",
        "abc"
      ],
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        "aaabbb",
        "aabb"
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        "zzzzzz",
        "zzz"
      ],
      "expected": 4,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_anagrams(s: str, p: str) -> int:
    # TODO: implement sliding window with frequency arrays
    return 0
`,
    javascript: `/**
 * @param {string} s
 * @param {string} p
 * @return {number}
 */
function countAnagrams(s, p) {
    // TODO: implement sliding window with frequency arrays
    return 0;
}
`,
    java: `class Solution {
    public int countAnagrams(String s, String p) {
        // TODO: implement sliding window with frequency arrays
        return 0;
    }
}
`,
    c: `int countAnagrams(char* s, char* p) {
    // TODO: implement sliding window with frequency arrays
    return 0;
}
`,
  },
  solutions: {
    python: `def count_anagrams(s: str, p: str) -> int:
    n, m = len(s), len(p)
    if m > n:
        return 0

    pFreq = [0] * 26
    wFreq = [0] * 26
    for ch in p:
        pFreq[ord(ch) - ord('a')] += 1

    result = 0
    for i in range(n):
        wFreq[ord(s[i]) - ord('a')] += 1
        if i >= m:
            wFreq[ord(s[i - m]) - ord('a')] -= 1
        if i >= m - 1:
            if wFreq == pFreq:
                result += 1
    return result
`,
    javascript: `function countAnagrams(s, p) {
    const n = s.length, m = p.length;
    if (m > n) return 0;

    const pFreq = new Array(26).fill(0);
    const wFreq = new Array(26).fill(0);
    const a = 'a'.charCodeAt(0);

    for (let i = 0; i < m; i++) {
        pFreq[p.charCodeAt(i) - a]++;
    }

    let result = 0;
    for (let i = 0; i < n; i++) {
        wFreq[s.charCodeAt(i) - a]++;
        if (i >= m) {
            wFreq[s.charCodeAt(i - m) - a]--;
        }
        if (i >= m - 1) {
            let match = true;
            for (let k = 0; k < 26; k++) {
                if (wFreq[k] !== pFreq[k]) { match = false; break; }
            }
            if (match) result++;
        }
    }
    return result;
}
`,
    java: `class Solution {
    public int countAnagrams(String s, String p) {
        int n = s.length(), m = p.length();
        if (m > n) return 0;

        int[] pFreq = new int[26];
        int[] wFreq = new int[26];

        for (char c : p.toCharArray()) {
            pFreq[c - 'a']++;
        }

        int result = 0;
        for (int i = 0; i < n; i++) {
            wFreq[s.charAt(i) - 'a']++;
            if (i >= m) {
                wFreq[s.charAt(i - m) - 'a']--;
            }
            if (i >= m - 1) {
                boolean match = true;
                for (int k = 0; k < 26; k++) {
                    if (wFreq[k] != pFreq[k]) { match = false; break; }
                }
                if (match) result++;
            }
        }
        return result;
    }
}
`,
    c: `#include <string.h>

int countAnagrams(char* s, char* p) {
    int n = (int)strlen(s);
    int m = (int)strlen(p);
    if (m > n) return 0;

    int pFreq[26] = {0};
    int wFreq[26] = {0};
    int i, k;

    for (i = 0; i < m; i++) {
        pFreq[p[i] - 'a']++;
    }

    int result = 0;
    for (i = 0; i < n; i++) {
        wFreq[s[i] - 'a']++;
        if (i >= m) {
            wFreq[s[i - m] - 'a']--;
        }
        if (i >= m - 1) {
            int match = 1;
            for (k = 0; k < 26; k++) {
                if (wFreq[k] != pFreq[k]) { match = 0; break; }
            }
            if (match) result++;
        }
    }
    return result;
}
`,
  },
  editorial: `## Approach: Sliding Window with Frequency Arrays

### Intuition
We want to check every contiguous substring of \`s\` with length \`len(p)\` to see if it is an anagram of \`p\`. A naive approach would sort each substring — O(n · m log m) overall. Instead, we track character frequencies in a sliding window.

### Algorithm
1. Build a frequency array \`pFreq[26]\` for pattern \`p\`.
2. Maintain a window frequency array \`wFreq[26]\` as we scan \`s\` left-to-right.
3. At each position \`i\`:
   - Add \`s[i]\` to the window.
   - If \`i >= m\`, remove \`s[i - m]\` (the character that just left the left side of the window).
   - If \`i >= m - 1\` (window is full), compare \`wFreq\` with \`pFreq\` in O(26) = O(1).
4. Each match increments the answer.

### Complexity
- **Time:** O(n · 26) = O(n), since the frequency comparison is over a fixed alphabet of 26 letters.
- **Space:** O(26) = O(1) extra space for the two frequency arrays.

### Why it works
Two strings are anagrams if and only if they have identical character frequency distributions. By maintaining a sliding window of exactly \`m\` characters and updating frequencies incrementally, we avoid recomputing from scratch at each step.`,
};

export default problem;
