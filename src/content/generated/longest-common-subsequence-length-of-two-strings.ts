import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "longest-common-subsequence-length-of-two-strings",
  title: "Longest Common Subsequence Length",
  difficulty: "medium",
  category: "recursion-dp",
  order: 1153,
  description: `Given two strings \`text1\` and \`text2\`, return the length of their **longest common subsequence** (LCS).

A **subsequence** of a string is a new string formed from the original by deleting some (possibly zero) characters without changing the relative order of the remaining characters.

A **common subsequence** of two strings is a subsequence that appears in both strings.

If there is no common subsequence, return \`0\`.

\`\`\`text
Example 1:
Input:  text1 = "abcde", text2 = "ace"
Output: 3
Explanation: The LCS is "ace", which has length 3.
\`\`\`

\`\`\`text
Example 2:
Input:  text1 = "abc", text2 = "abc"
Output: 3
Explanation: The LCS is "abc", which has length 3.
\`\`\`

\`\`\`text
Example 3:
Input:  text1 = "abc", text2 = "def"
Output: 0
Explanation: There is no common subsequence.
\`\`\`

**Constraints:**
- \`1 <= text1.length, text2.length <= 1000\`
- \`text1\` and \`text2\` consist of only lowercase English letters.`,
  hints: [
    `Think about what happens when the last characters of both strings match — you can include that character in the LCS and solve the remaining subproblem.`,
    `When the last characters don't match, the LCS must come from either dropping the last character of text1 or dropping the last character of text2 — take the maximum of the two.`,
    `Define dp[i][j] as the LCS length of text1[0..i-1] and text2[0..j-1]. Fill this table bottom-up using the two rules above.`,
  ],
  signature: {
    "name": "longestCommonSubsequence",
    "params": [
      {
        "name": "text1",
        "type": "string"
      },
      {
        "name": "text2",
        "type": "string"
      }
    ],
    "returns": "int",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        "abcde",
        "ace"
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        "abc",
        "abc"
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        "abc",
        "def"
      ],
      "expected": 0,
      "hidden": false
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
        "a",
        "b"
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        "bsbininm",
        "jmjkbkjkv"
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        "oxcpqrsvwf",
        "shmtulqrypy"
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        "abcbdab",
        "bdcab"
      ],
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        "aaaaaa",
        "aaaa"
      ],
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        "bl",
        "yby"
      ],
      "expected": 1,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def longest_common_subsequence(text1: str, text2: str) -> int:
    # TODO: implement
    return 0
`,
    javascript: `function longestCommonSubsequence(text1, text2) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function longestCommonSubsequence(text1: string, text2: string): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        // TODO: implement
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int LongestCommonSubsequence(string text1, string text2) {
        // TODO: implement
        return 0;
    }
}`,
    c: `int longestCommonSubsequence(char* text1, char* text2) {
    // TODO: implement
    return 0;
}
`,
    cpp: `class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        // TODO: implement
        return 0;
    }
};`,
  },
  solutions: {
    python: `def longest_common_subsequence(text1: str, text2: str) -> int:
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[m][n]
`,
    javascript: `function longestCommonSubsequence(text1, text2) {
    const m = text1.length, n = text2.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[m][n];
}
`,
    typescript: `function longestCommonSubsequence(text1: string, text2: string): number {
    const m = text1.length, n = text2.length;
    const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[m][n];
}`,
    java: `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length(), n = text2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[m][n];
    }
}
`,
    csharp: `using System;

public class Solution {
    public int LongestCommonSubsequence(string text1, string text2) {
        int m = text1.Length, n = text2.Length;
        int[][] dp = new int[m + 1][];
        for (int i = 0; i <= m; i++) {
            dp[i] = new int[n + 1];
        }
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1[i - 1] == text2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.Max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[m][n];
    }
}`,
    c: `#include <string.h>

int longestCommonSubsequence(char* text1, char* text2) {
    int m = (int)strlen(text1);
    int n = (int)strlen(text2);
    static int dp[1001][1001];
    for (int i = 0; i <= m; i++)
        for (int j = 0; j <= n; j++)
            dp[i][j] = 0;
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1[i - 1] == text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                int a = dp[i - 1][j];
                int b = dp[i][j - 1];
                dp[i][j] = a > b ? a : b;
            }
        }
    }
    return dp[m][n];
}
`,
    cpp: `class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int m = (int)text1.size(), n = (int)text2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1[i - 1] == text2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[m][n];
    }
};`,
  },
  editorial: `## Approach: Bottom-Up Dynamic Programming

### Intuition

Define \`dp[i][j]\` as the length of the longest common subsequence of \`text1[0..i-1]\` and \`text2[0..j-1]\`.

**Recurrence:**
- If \`text1[i-1] == text2[j-1]\`: both characters can be included, so \`dp[i][j] = dp[i-1][j-1] + 1\`.
- Otherwise: we skip one character from either string and take the best: \`dp[i][j] = max(dp[i-1][j], dp[i][j-1])\`.

**Base case:** \`dp[0][j] = dp[i][0] = 0\` (empty string has LCS of 0 with anything).

The answer is \`dp[m][n]\`.

### Example trace for \`"abcde"\` vs \`"ace"\`

\`\`\`
     "" a  c  e
""  [ 0  0  0  0 ]
a   [ 0  1  1  1 ]
b   [ 0  1  1  1 ]
c   [ 0  1  2  2 ]
d   [ 0  1  2  2 ]
e   [ 0  1  2  3 ]  <-- answer
\`\`\`

### Complexity
- **Time:** O(m × n) — fill an (m+1)×(n+1) table.
- **Space:** O(m × n) for the DP table (can be reduced to O(min(m,n)) with two rolling arrays).`,
};

export default problem;
