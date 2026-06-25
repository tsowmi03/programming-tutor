import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "maximum-number-of-vowels-in-any-substring-of-length-k",
  title: "Maximum Vowels in a Substring of Length K",
  difficulty: "easy",
  category: "sliding-window",
  order: 1030,
  description: `Given a string \`s\` and an integer \`k\`, return the maximum number of vowel letters in any substring of \`s\` with length \`k\`.

The vowel letters are \`'a'\`, \`'e'\`, \`'i'\`, \`'o'\`, and \`'u'\`.

\`\`\`text
Example 1:
Input:  s = "abciiidef", k = 3
Output: 3
Explanation: The substring "iii" contains 3 vowels.
\`\`\`

\`\`\`text
Example 2:
Input:  s = "aeiou", k = 2
Output: 2
Explanation: Any substring of length 2 contains 2 vowels.
\`\`\`

\`\`\`text
Example 3:
Input:  s = "leetcode", k = 3
Output: 2
Explanation: "lee", "eet", and "ode" each contain 2 vowels.
\`\`\`

**Constraints:**
- \`1 <= k <= s.length <= 10^5\`
- \`s\` consists of lowercase English letters only.`,
  hints: [
    `Try building the count for the first window of size k, then slide one character at a time.`,
    `When the window slides right by one position, you add the new character on the right and remove the character that just left on the left — update the vowel count accordingly.`,
    `Keep a running maximum as you slide the window across the string.`,
  ],
  guidance: [
    {
      "title": "Identify the pattern",
      "body": "You need to examine every substring of exactly length `k`. Checking each one from scratch would be O(n·k). Think about what changes between two consecutive windows of the same size.",
      "level": "nudge"
    },
    {
      "title": "Sliding window setup",
      "body": "1. Count vowels in `s[0..k-1]` — this is your first window.\n2. Record that count as your current maximum.\n3. For each new character at index `i` (from `k` to `n-1`): add 1 if `s[i]` is a vowel, subtract 1 if `s[i-k]` is a vowel.\n4. Update the maximum after each slide.",
      "level": "strategy"
    },
    {
      "title": "Vowel check helper",
      "body": "Use a small set or a simple membership check for `{'a','e','i','o','u'}`. Avoid recomputing this set inside the inner loop — define it once before iterating.",
      "level": "pitfall"
    },
    {
      "title": "Edge cases",
      "body": "If `k == s.length`, the only window is the entire string — the algorithm handles this naturally since the loop from index `k` to `n-1` simply never executes.",
      "level": "pitfall"
    },
    {
      "title": "Implementation shape",
      "body": "```\nvowels = set of vowel characters\ncount  = number of vowels in s[0..k-1]\nbest   = count\nfor i from k to len(s)-1:\n    if s[i]   is a vowel: count += 1\n    if s[i-k] is a vowel: count -= 1\n    best = max(best, count)\nreturn best\n```",
      "level": "pseudocode"
    }
  ],

  signature: {
    "name": "maxVowels",
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
        "abciiidef",
        3
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        "aeiou",
        2
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        "leetcode",
        3
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        "rhythms",
        4
      ],
      "expected": 0,
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
        "z",
        1
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        "aaaaaaaaa",
        3
      ],
      "expected": 3,
      "hidden": true
    },
    {
      "input": [
        "bcdfghjklm",
        5
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        "weallloveyou",
        7
      ],
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        "abcde",
        5
      ],
      "expected": 2,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def max_vowels(s: str, k: int) -> int:
    # TODO: implement sliding window
    return 0
`,
    javascript: `/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
function maxVowels(s, k) {
    // TODO: implement sliding window
    return 0;
}
`,
    typescript: `function maxVowels(s: string, k: number): number {
    // TODO: implement sliding window
    return 0;
}
`,
    java: `class Solution {
    public int maxVowels(String s, int k) {
        // TODO: implement sliding window
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int MaxVowels(string s, int k) {
        // TODO: implement sliding window
        return 0;
    }
}
`,
    c: `int maxVowels(char* s, int k) {
    // TODO: implement sliding window
    return 0;
}
`,
    cpp: `class Solution {
public:
    int maxVowels(string s, int k) {
        // TODO: implement sliding window
        return 0;
    }
};
`,
  },
  solutions: {
    python: `def max_vowels(s: str, k: int) -> int:
    vowels = set('aeiou')
    count = sum(1 for c in s[:k] if c in vowels)
    best = count
    for i in range(k, len(s)):
        if s[i] in vowels:
            count += 1
        if s[i - k] in vowels:
            count -= 1
        if count > best:
            best = count
    return best
`,
    javascript: `function maxVowels(s, k) {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    let count = 0;
    for (let i = 0; i < k; i++) {
        if (vowels.has(s[i])) count++;
    }
    let best = count;
    for (let i = k; i < s.length; i++) {
        if (vowels.has(s[i])) count++;
        if (vowels.has(s[i - k])) count--;
        if (count > best) best = count;
    }
    return best;
}
`,
    typescript: `function maxVowels(s: string, k: number): number {
    const vowels = new Set<string>(['a', 'e', 'i', 'o', 'u']);
    let count = 0;
    for (let i = 0; i < k; i++) {
        if (vowels.has(s[i])) count++;
    }
    let best = count;
    for (let i = k; i < s.length; i++) {
        if (vowels.has(s[i])) count++;
        if (vowels.has(s[i - k])) count--;
        if (count > best) best = count;
    }
    return best;
}
`,
    java: `class Solution {
    public int maxVowels(String s, int k) {
        String vowels = "aeiou";
        int count = 0;
        for (int i = 0; i < k; i++) {
            if (vowels.indexOf(s.charAt(i)) >= 0) count++;
        }
        int best = count;
        for (int i = k; i < s.length(); i++) {
            if (vowels.indexOf(s.charAt(i)) >= 0) count++;
            if (vowels.indexOf(s.charAt(i - k)) >= 0) count--;
            if (count > best) best = count;
        }
        return best;
    }
}
`,
    csharp: `public class Solution {
    public int MaxVowels(string s, int k) {
        string vowels = "aeiou";
        int count = 0;
        for (int i = 0; i < k; i++) {
            if (vowels.IndexOf(s[i]) >= 0) count++;
        }
        int best = count;
        for (int i = k; i < s.Length; i++) {
            if (vowels.IndexOf(s[i]) >= 0) count++;
            if (vowels.IndexOf(s[i - k]) >= 0) count--;
            if (count > best) best = count;
        }
        return best;
    }
}
`,
    c: `#include <string.h>
static int isVowel(char c) {
    return c=='a' || c=='e' || c=='i' || c=='o' || c=='u';
}
int maxVowels(char* s, int k) {
    int n = (int)strlen(s);
    int count = 0;
    for (int i = 0; i < k; i++) {
        if (isVowel(s[i])) count++;
    }
    int best = count;
    for (int i = k; i < n; i++) {
        if (isVowel(s[i])) count++;
        if (isVowel(s[i - k])) count--;
        if (count > best) best = count;
    }
    return best;
}
`,
    cpp: `class Solution {
public:
    int maxVowels(string s, int k) {
        auto isVowel = [](char c) {
            return c=='a' || c=='e' || c=='i' || c=='o' || c=='u';
        };
        int count = 0;
        for (int i = 0; i < k; i++) {
            if (isVowel(s[i])) count++;
        }
        int best = count;
        for (int i = k; i < (int)s.size(); i++) {
            if (isVowel(s[i])) count++;
            if (isVowel(s[i - k])) count--;
            if (count > best) best = count;
        }
        return best;
    }
};
`,
  },
  editorial: `## Approach: Sliding Window

### Intuition
Instead of recomputing the vowel count for every substring of length \`k\` from scratch (which would be O(n·k)), we observe that two consecutive windows of size \`k\` differ by exactly one character on each end. We can maintain a running count by adding the newly included character and subtracting the character that just left the window.

### Algorithm
1. Count vowels in the first window \`s[0..k-1]\`.
2. Set \`best = count\`.
3. Slide the window one position at a time from index \`k\` to \`n-1\`:
   - If \`s[i]\` is a vowel, increment \`count\`.
   - If \`s[i-k]\` is a vowel, decrement \`count\`.
   - Update \`best = max(best, count)\`.
4. Return \`best\`.

### Complexity
- **Time:** O(n) — each character is added and removed from the window at most once.
- **Space:** O(1) — only a constant number of variables are used (the vowel set has fixed size 5).`,
};

export default problem;
