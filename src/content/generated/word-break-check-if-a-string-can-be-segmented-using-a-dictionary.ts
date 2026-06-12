import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "word-break-check-if-a-string-can-be-segmented-using-a-dictionary",
  title: "Word Break: String Segmentation",
  difficulty: "medium",
  category: "recursion-dp",
  order: 1148,
  description: `Given a string \`s\` and a dictionary of words \`wordDict\`, return \`true\` if \`s\` can be segmented into a space-separated sequence of one or more dictionary words, or \`false\` otherwise.

Each word in \`wordDict\` may be used **any number of times**. All characters are lowercase English letters.

\`\`\`text
Example 1:
Input:  s = "leetcode", wordDict = ["leet", "code"]
Output: true
Explanation: "leetcode" = "leet" + "code"
\`\`\`

\`\`\`text
Example 2:
Input:  s = "applepenapple", wordDict = ["apple", "pen"]
Output: true
Explanation: "applepenapple" = "apple" + "pen" + "apple"
\`\`\`

\`\`\`text
Example 3:
Input:  s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
Output: false
Explanation: No valid segmentation covers the full string.
\`\`\`

**Constraints:**
- \`1 <= s.length <= 300\`
- \`1 <= wordDict.length <= 50\`
- \`1 <= wordDict[i].length <= 20\`
- \`s\` consists of lowercase English letters only.
- All strings in \`wordDict\` are distinct.`,
  hints: [
    `Think about a boolean array \`dp\` where \`dp[i]\` means the first \`i\` characters of \`s\` can be segmented. What is the base case?`,
    `For each position \`i\`, check every position \`j < i\`: if \`dp[j]\` is true and the substring \`s[j..i]\` is in the dictionary, then \`dp[i]\` is also true.`,
    `You can store \`wordDict\` in a set for O(1) lookup per substring check.`,
  ],
  signature: {
    "name": "wordBreak",
    "params": [
      {
        "name": "s",
        "type": "string"
      },
      {
        "name": "wordDict",
        "type": "string[]"
      }
    ],
    "returns": "bool",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        "leetcode",
        [
          "leet",
          "code"
        ]
      ],
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        "applepenapple",
        [
          "apple",
          "pen"
        ]
      ],
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        "catsandog",
        [
          "cats",
          "dog",
          "sand",
          "and",
          "cat"
        ]
      ],
      "expected": false,
      "hidden": false
    },
    {
      "input": [
        "a",
        [
          "a"
        ]
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        "ab",
        [
          "a",
          "b"
        ]
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        "aaaaaaaaaaaaaaaaaaaaaaaab",
        [
          "a",
          "aa",
          "aaa",
          "aaaa"
        ]
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        "cars",
        [
          "car",
          "ca",
          "rs"
        ]
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        "goalspecial",
        [
          "go",
          "goal",
          "goals",
          "special"
        ]
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        "dogs",
        [
          "dog",
          "s",
          "gs"
        ]
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        "hello",
        [
          "world",
          "hell",
          "o",
          "he"
        ]
      ],
      "expected": true,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def word_break(s: str, word_dict: list[str]) -> bool:
    # TODO: implement using dynamic programming
    return False
`,
    javascript: `/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
function wordBreak(s, wordDict) {
    // TODO: implement using dynamic programming
    return false;
}
`,
    java: `class Solution {
    public boolean wordBreak(String s, String[] wordDict) {
        // TODO: implement using dynamic programming
        return false;
    }
}
`,
    c: `bool wordBreak(char* s, char** wordDict, int wordDictSize) {
    // TODO: implement using dynamic programming
    return false;
}
`,
  },
  solutions: {
    python: `def word_break(s: str, word_dict: list[str]) -> bool:
    word_set = set(word_dict)
    n = len(s)
    dp = [False] * (n + 1)
    dp[0] = True
    for i in range(1, n + 1):
        for j in range(i):
            if dp[j] and s[j:i] in word_set:
                dp[i] = True
                break
    return dp[n]
`,
    javascript: `function wordBreak(s, wordDict) {
    const wordSet = new Set(wordDict);
    const n = s.length;
    const dp = new Array(n + 1).fill(false);
    dp[0] = true;
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && wordSet.has(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[n];
}
`,
    java: `class Solution {
    public boolean wordBreak(String s, String[] wordDict) {
        java.util.Set<String> wordSet = new java.util.HashSet<>();
        for (String w : wordDict) wordSet.add(w);
        int n = s.length();
        boolean[] dp = new boolean[n + 1];
        dp[0] = true;
        for (int i = 1; i <= n; i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && wordSet.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[n];
    }
}
`,
    c: `#include <stdbool.h>
#include <string.h>
#include <stdlib.h>

bool wordBreak(char* s, char** wordDict, int wordDictSize) {
    int n = (int)strlen(s);
    bool* dp = (bool*)calloc(n + 1, sizeof(bool));
    dp[0] = true;
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j < i; j++) {
            if (!dp[j]) continue;
            int len = i - j;
            for (int k = 0; k < wordDictSize; k++) {
                if ((int)strlen(wordDict[k]) == len &&
                    strncmp(s + j, wordDict[k], len) == 0) {
                    dp[i] = true;
                    break;
                }
            }
            if (dp[i]) break;
        }
    }
    bool result = dp[n];
    free(dp);
    return result;
}
`,
  },
  editorial: `## Approach: Dynamic Programming

### Intuition
Define \`dp[i]\` as \`true\` if the first \`i\` characters of \`s\` can be segmented using the dictionary. The answer is \`dp[n]\`.

### Recurrence
- Base case: \`dp[0] = true\` (empty string is trivially segmented).
- Transition: For each \`i\` from \`1\` to \`n\`, scan all split points \`j\` from \`0\` to \`i-1\`. If \`dp[j]\` is \`true\` **and** the substring \`s[j..i-1]\` is in the word dictionary, then set \`dp[i] = true\` and stop scanning.

### Implementation Detail
Store \`wordDict\` in a hash set so each substring lookup is O(L) (where L is the substring length).

### Complexity
- **Time:** O(n² · L) where n = |s| and L = max word length.
- **Space:** O(n + W) for the DP array and the word set.

### Why It Works
By building the table from left to right, every sub-problem is solved before it is needed. This bottom-up DP is equivalent to a memoized recursion that tries to peel off a dictionary word at every position.`,
};

export default problem;
