import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-length-k-substrings-with-all-distinct-characters",
  title: "Count Length-K Substrings With All Distinct Characters",
  difficulty: "easy",
  category: "sliding-window",
  order: 1031,
  description: `Given a string \`s\` and an integer \`k\`, return the number of substrings of length exactly \`k\` that contain **all distinct** characters (no character appears more than once in the substring).

\`\`\`text
Example 1:
Input: s = "havefunn", k = 3
Substrings of length 3: "hav", "ave", "vef", "efu", "fun", "unn"
All distinct?              yes    yes    yes    yes    yes    no
Output: 5
\`\`\`

\`\`\`text
Example 2:
Input: s = "aab", k = 2
Substrings of length 2: "aa", "ab"
All distinct?              no    yes
Output: 1
\`\`\`

\`\`\`text
Example 3:
Input: s = "abcd", k = 5
k is larger than the string length, so no valid substring exists.
Output: 0
\`\`\`

**Constraints:**
- \`1 <= s.length <= 10^4\`
- \`1 <= k <= 10^4\`
- \`s\` consists of lowercase English letters only.`,
  hints: [
    `Slide a window of exactly k characters across the string, one position at a time.`,
    `Keep a frequency count of characters in the current window. When you slide, add the new character and remove the outgoing one. If all frequencies are at most 1, the window qualifies.`,
  ],
  guidance: [
    {
      "title": "Start with a fixed-size window",
      "body": "A substring of length k starting at index i covers indices i..i+k-1. There are n-k+1 such substrings. Iterate over each starting index and check if it is valid.",
      "level": "nudge"
    },
    {
      "title": "Track character frequencies efficiently",
      "body": "Instead of counting distinct characters from scratch for each window, maintain a frequency array of size 26. Also keep a counter `duplicates` tracking how many characters in the window have frequency > 1. When `duplicates == 0` the window is valid.",
      "level": "strategy"
    },
    {
      "title": "Sliding the window",
      "body": "```\ninitialize freq[26] = 0, duplicates = 0\n\n// Build first window\nfor i in 0..k-1:\n    freq[s[i]]++\n    if freq[s[i]] == 2: duplicates++\n\nif duplicates == 0: count++\n\n// Slide\nfor i in 1..n-k:\n    // Add right character\n    right = s[i+k-1]\n    freq[right]++\n    if freq[right] == 2: duplicates++\n\n    // Remove left character\n    left = s[i-1]\n    if freq[left] == 2: duplicates--\n    freq[left]--\n\n    if duplicates == 0: count++\n\nreturn count\n```",
      "level": "pseudocode"
    }
  ],

  signature: {
    "name": "countDistinctSubstrings",
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
    "returns": "int",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        "havefunn",
        3
      ],
      "expected": 5,
      "hidden": false
    },
    {
      "input": [
        "aab",
        2
      ],
      "expected": 1,
      "hidden": false
    },
    {
      "input": [
        "abcd",
        5
      ],
      "expected": 0,
      "hidden": false
    },
    {
      "input": [
        "abcdef",
        3
      ],
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        "aaaa",
        1
      ],
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        "aaaa",
        2
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        "abcabc",
        3
      ],
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        "a",
        1
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        "abcdefghij",
        10
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        "aabbcc",
        2
      ],
      "expected": 2,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_distinct_substrings(s: str, k: int) -> int:
    # TODO: implement sliding window
    return 0
`,
    javascript: `/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
function countDistinctSubstrings(s, k) {
    // TODO: implement sliding window
    return 0;
}
`,
    typescript: `function countDistinctSubstrings(s: string, k: number): number {
    // TODO: implement sliding window
    return 0;
}
`,
    java: `class Solution {
    public int countDistinctSubstrings(String s, int k) {
        // TODO: implement sliding window
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int CountDistinctSubstrings(string s, int k) {
        // TODO: implement sliding window
        return 0;
    }
}
`,
    c: `#include <string.h>
int countDistinctSubstrings(char* s, int k) {
    // TODO: implement sliding window
    return 0;
}
`,
    cpp: `class Solution {
public:
    int countDistinctSubstrings(string s, int k) {
        // TODO: implement sliding window
        return 0;
    }
};
`,
  },
  solutions: {
    python: `def count_distinct_substrings(s: str, k: int) -> int:
    n = len(s)
    if k > n:
        return 0
    freq = [0] * 26
    duplicates = 0
    for i in range(k):
        idx = ord(s[i]) - ord('a')
        freq[idx] += 1
        if freq[idx] == 2:
            duplicates += 1
    count = 1 if duplicates == 0 else 0
    for i in range(1, n - k + 1):
        right = ord(s[i + k - 1]) - ord('a')
        freq[right] += 1
        if freq[right] == 2:
            duplicates += 1
        left = ord(s[i - 1]) - ord('a')
        if freq[left] == 2:
            duplicates -= 1
        freq[left] -= 1
        if duplicates == 0:
            count += 1
    return count
`,
    javascript: `function countDistinctSubstrings(s, k) {
    const n = s.length;
    if (k > n) return 0;
    const freq = new Array(26).fill(0);
    let duplicates = 0;
    for (let i = 0; i < k; i++) {
        const idx = s.charCodeAt(i) - 97;
        freq[idx]++;
        if (freq[idx] === 2) duplicates++;
    }
    let count = duplicates === 0 ? 1 : 0;
    for (let i = 1; i <= n - k; i++) {
        const right = s.charCodeAt(i + k - 1) - 97;
        freq[right]++;
        if (freq[right] === 2) duplicates++;
        const left = s.charCodeAt(i - 1) - 97;
        if (freq[left] === 2) duplicates--;
        freq[left]--;
        if (duplicates === 0) count++;
    }
    return count;
}
`,
    typescript: `function countDistinctSubstrings(s: string, k: number): number {
    const n = s.length;
    if (k > n) return 0;
    const freq: number[] = new Array(26).fill(0);
    let duplicates = 0;
    for (let i = 0; i < k; i++) {
        const idx = s.charCodeAt(i) - 97;
        freq[idx]++;
        if (freq[idx] === 2) duplicates++;
    }
    let count = duplicates === 0 ? 1 : 0;
    for (let i = 1; i <= n - k; i++) {
        const right = s.charCodeAt(i + k - 1) - 97;
        freq[right]++;
        if (freq[right] === 2) duplicates++;
        const left = s.charCodeAt(i - 1) - 97;
        if (freq[left] === 2) duplicates--;
        freq[left]--;
        if (duplicates === 0) count++;
    }
    return count;
}
`,
    java: `class Solution {
    public int countDistinctSubstrings(String s, int k) {
        int n = s.length();
        if (k > n) return 0;
        int[] freq = new int[26];
        int duplicates = 0;
        for (int i = 0; i < k; i++) {
            int idx = s.charAt(i) - 'a';
            freq[idx]++;
            if (freq[idx] == 2) duplicates++;
        }
        int count = duplicates == 0 ? 1 : 0;
        for (int i = 1; i <= n - k; i++) {
            int right = s.charAt(i + k - 1) - 'a';
            freq[right]++;
            if (freq[right] == 2) duplicates++;
            int left = s.charAt(i - 1) - 'a';
            if (freq[left] == 2) duplicates--;
            freq[left]--;
            if (duplicates == 0) count++;
        }
        return count;
    }
}
`,
    csharp: `public class Solution {
    public int CountDistinctSubstrings(string s, int k) {
        int n = s.Length;
        if (k > n) return 0;
        int[] freq = new int[26];
        int duplicates = 0;
        for (int i = 0; i < k; i++) {
            int idx = s[i] - 'a';
            freq[idx]++;
            if (freq[idx] == 2) duplicates++;
        }
        int count = duplicates == 0 ? 1 : 0;
        for (int i = 1; i <= n - k; i++) {
            int right = s[i + k - 1] - 'a';
            freq[right]++;
            if (freq[right] == 2) duplicates++;
            int left = s[i - 1] - 'a';
            if (freq[left] == 2) duplicates--;
            freq[left]--;
            if (duplicates == 0) count++;
        }
        return count;
    }
}
`,
    c: `#include <string.h>
int countDistinctSubstrings(char* s, int k) {
    int n = (int)strlen(s);
    if (k > n) return 0;
    int freq[26] = {0};
    int duplicates = 0;
    for (int i = 0; i < k; i++) {
        int idx = s[i] - 'a';
        freq[idx]++;
        if (freq[idx] == 2) duplicates++;
    }
    int count = duplicates == 0 ? 1 : 0;
    for (int i = 1; i <= n - k; i++) {
        int right = s[i + k - 1] - 'a';
        freq[right]++;
        if (freq[right] == 2) duplicates++;
        int left = s[i - 1] - 'a';
        if (freq[left] == 2) duplicates--;
        freq[left]--;
        if (duplicates == 0) count++;
    }
    return count;
}
`,
    cpp: `class Solution {
public:
    int countDistinctSubstrings(string s, int k) {
        int n = (int)s.size();
        if (k > n) return 0;
        vector<int> freq(26, 0);
        int duplicates = 0;
        for (int i = 0; i < k; i++) {
            int idx = s[i] - 'a';
            freq[idx]++;
            if (freq[idx] == 2) duplicates++;
        }
        int count = duplicates == 0 ? 1 : 0;
        for (int i = 1; i <= n - k; i++) {
            int right = s[i + k - 1] - 'a';
            freq[right]++;
            if (freq[right] == 2) duplicates++;
            int left = s[i - 1] - 'a';
            if (freq[left] == 2) duplicates--;
            freq[left]--;
            if (duplicates == 0) count++;
        }
        return count;
    }
};
`,
  },
  editorial: `## Approach: Fixed-Size Sliding Window

### Intuition
We need to check every substring of length \`k\`. A naive approach checks each one from scratch in O(k) time, giving O(n·k) overall. With a sliding window we reuse work from the previous window.

### Algorithm
1. **Initialize** a frequency array \`freq[26]\` and build the first window (indices 0..k-1). Track \`duplicates\` — the count of characters whose frequency is exactly 2 (as soon as a character reaches frequency 2 it contributes one duplicate).
2. **Slide** the window one step at a time:
   - **Add** the new right character: increment its frequency. If it just reached 2, increment \`duplicates\`.
   - **Remove** the old left character: if its frequency was 2, decrement \`duplicates\`. Then decrement its frequency.
3. After each step, if \`duplicates == 0\` all characters in the window are unique → increment the result counter.

### Complexity
- **Time:** O(n) — each character is added and removed from the window exactly once.
- **Space:** O(1) — frequency array of fixed size 26.`,
};

export default problem;
