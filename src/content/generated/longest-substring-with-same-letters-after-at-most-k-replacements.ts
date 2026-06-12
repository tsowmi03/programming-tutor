import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "longest-substring-with-same-letters-after-at-most-k-replacements",
  title: "Longest Substring with Same Letters After At Most K Replacements",
  difficulty: "medium",
  category: "sliding-window",
  order: 1104,
  description: `Given a string \`s\` consisting of uppercase English letters and an integer \`k\`, you may replace **at most** \`k\` characters in the string with any uppercase letter.

Return the length of the **longest substring** containing all the same letter that you can obtain after performing at most \`k\` replacements.

\`\`\`text
Example 1:
Input:  s = "AABABBA", k = 1
Output: 4
Explanation: The window "ABAB" with one replacement gives "AAAA" (length 4).
             Alternatively, window "BABB" with one replacement gives "BBBB" (length 4).
\`\`\`

\`\`\`text
Example 2:
Input:  s = "ABCDE", k = 2
Output: 3
Explanation: Any window of size 3 can be made uniform with at most 2 replacements.
             E.g., "ABC" -> replace B and C -> "AAA" (length 3).
\`\`\`

\`\`\`text
Example 3:
Input:  s = "AAAA", k = 2
Output: 4
Explanation: The entire string is already uniform — no replacements needed.
\`\`\`

**Constraints:**
- \`1 <= s.length <= 10^5\`
- \`0 <= k <= s.length\`
- \`s\` consists of uppercase English letters only (\`'A'\`–\`'Z'\`).`,
  hints: [
    `Think about a sliding window [left, right]. For a window to be valid, all characters can be made the same if the number of replacements needed — (window size − count of the most frequent character) — is ≤ k.`,
    `As you expand the right pointer, track the frequency of each character in the window. The key quantity is maxFreq: the highest frequency of any single character in the current window.`,
    `When (window size − maxFreq) > k, the window is invalid — shrink from the left. Note: you only need to track the maximum frequency seen so far (it never needs to decrease) to keep the solution O(n).`,
    `The answer is the maximum window size you ever see while the window is valid.`,
  ],
  signature: {
    "name": "characterReplacement",
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
        "AABABBA",
        1
      ],
      "expected": 4,
      "hidden": false
    },
    {
      "input": [
        "ABCDE",
        2
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        "AAAA",
        2
      ],
      "expected": 4,
      "hidden": false
    },
    {
      "input": [
        "ABAB",
        2
      ],
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        "A",
        0
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        "AABABBA",
        0
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        "ZZZZZZZ",
        3
      ],
      "expected": 7,
      "hidden": true
    },
    {
      "input": [
        "ABCDEFGHIJ",
        5
      ],
      "expected": 6,
      "hidden": true
    },
    {
      "input": [
        "BAAAB",
        2
      ],
      "expected": 5,
      "hidden": true
    },
    {
      "input": [
        "EEMCHKTITQ",
        3
      ],
      "expected": 5,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def character_replacement(s: str, k: int) -> int:
    # TODO: implement sliding window
    return 0
`,
    javascript: `/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
function characterReplacement(s, k) {
    // TODO: implement sliding window
    return 0;
}
`,
    typescript: `function characterReplacement(s: string, k: number): number {
    // TODO: implement sliding window
    return 0;
}`,
    java: `class Solution {
    public int characterReplacement(String s, int k) {
        // TODO: implement sliding window
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int CharacterReplacement(string s, int k) {
        // TODO: implement sliding window
        return 0;
    }
}`,
    c: `int characterReplacement(char* s, int k) {
    // TODO: implement sliding window
    return 0;
}
`,
    cpp: `class Solution {
public:
    int characterReplacement(string s, int k) {
        // TODO: implement sliding window
        return 0;
    }
};`,
  },
  solutions: {
    python: `def character_replacement(s: str, k: int) -> int:
    count = [0] * 26
    left = 0
    max_freq = 0
    result = 0
    for right in range(len(s)):
        count[ord(s[right]) - ord('A')] += 1
        max_freq = max(max_freq, count[ord(s[right]) - ord('A')])
        while (right - left + 1) - max_freq > k:
            count[ord(s[left]) - ord('A')] -= 1
            left += 1
        result = max(result, right - left + 1)
    return result
`,
    javascript: `function characterReplacement(s, k) {
    const count = new Array(26).fill(0);
    let left = 0, maxFreq = 0, result = 0;
    for (let right = 0; right < s.length; right++) {
        const idx = s.charCodeAt(right) - 65;
        count[idx]++;
        maxFreq = Math.max(maxFreq, count[idx]);
        while ((right - left + 1) - maxFreq > k) {
            count[s.charCodeAt(left) - 65]--;
            left++;
        }
        result = Math.max(result, right - left + 1);
    }
    return result;
}
`,
    typescript: `function characterReplacement(s: string, k: number): number {
    const count = new Array(26).fill(0);
    let left = 0, maxFreq = 0, result = 0;
    for (let right = 0; right < s.length; right++) {
        const idx = s.charCodeAt(right) - 65;
        count[idx]++;
        maxFreq = Math.max(maxFreq, count[idx]);
        while ((right - left + 1) - maxFreq > k) {
            count[s.charCodeAt(left) - 65]--;
            left++;
        }
        result = Math.max(result, right - left + 1);
    }
    return result;
}`,
    java: `class Solution {
    public int characterReplacement(String s, int k) {
        int[] count = new int[26];
        int left = 0, maxFreq = 0, result = 0;
        for (int right = 0; right < s.length(); right++) {
            int idx = s.charAt(right) - 'A';
            count[idx]++;
            maxFreq = Math.max(maxFreq, count[idx]);
            while ((right - left + 1) - maxFreq > k) {
                count[s.charAt(left) - 'A']--;
                left++;
            }
            result = Math.max(result, right - left + 1);
        }
        return result;
    }
}
`,
    csharp: `using System;

public class Solution {
    public int CharacterReplacement(string s, int k) {
        int[] count = new int[26];
        int left = 0, maxFreq = 0, result = 0;
        for (int right = 0; right < s.Length; right++) {
            int idx = s[right] - 'A';
            count[idx]++;
            maxFreq = Math.Max(maxFreq, count[idx]);
            while ((right - left + 1) - maxFreq > k) {
                count[s[left] - 'A']--;
                left++;
            }
            result = Math.Max(result, right - left + 1);
        }
        return result;
    }
}`,
    c: `int characterReplacement(char* s, int k) {
    int count[26] = {0};
    int left = 0, maxFreq = 0, result = 0;
    int n = 0;
    while (s[n]) n++;
    for (int right = 0; right < n; right++) {
        int idx = s[right] - 'A';
        count[idx]++;
        if (count[idx] > maxFreq) maxFreq = count[idx];
        while ((right - left + 1) - maxFreq > k) {
            count[s[left] - 'A']--;
            left++;
        }
        if (right - left + 1 > result) result = right - left + 1;
    }
    return result;
}
`,
    cpp: `class Solution {
public:
    int characterReplacement(string s, int k) {
        int count[26] = {0};
        int left = 0, maxFreq = 0, result = 0;
        for (int right = 0; right < (int)s.size(); right++) {
            int idx = s[right] - 'A';
            count[idx]++;
            maxFreq = max(maxFreq, count[idx]);
            while ((right - left + 1) - maxFreq > k) {
                count[s[left] - 'A']--;
                left++;
            }
            result = max(result, right - left + 1);
        }
        return result;
    }
};`,
  },
  editorial: `## Approach: Sliding Window with Max-Frequency Tracking

### Key Insight

For any window \`[left, right]\`, the **minimum number of replacements** needed to make all characters the same equals:
\`\`\`
window_size - max_frequency_in_window
\`\`\`
Because we keep the most-frequent character and replace everything else.

The window is **valid** when \`(right - left + 1) - maxFreq <= k\`.

### Algorithm

1. Maintain a frequency array \`count[26]\` for characters in the current window.
2. Expand \`right\` one step at a time, updating \`count\` and \`maxFreq\`.
3. If the window becomes invalid (\`size - maxFreq > k\`), slide \`left\` forward by 1 (shrink the window).
4. Track the maximum valid window size.

### Why maxFreq never needs to decrease

We only care about finding a **longer** window than the best seen so far. If \`maxFreq\` were to decrease, the window size would have to shrink, which can never beat our current best. So we safely keep \`maxFreq\` as a non-decreasing running maximum — this is what makes the solution O(n) rather than O(26n).

### Complexity

- **Time:** O(n) — each character is added and removed from the window at most once.
- **Space:** O(1) — the frequency array has a fixed size of 26.`,
};

export default problem;
