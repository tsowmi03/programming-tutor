import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "decode-ways-count-decodings-of-a-digit-string-1-26-mapping",
  title: "Decode Ways",
  difficulty: "medium",
  category: "recursion-dp",
  order: 1149,
  description: `A message is encoded using the following mapping:

\`\`\`
'A' -> "1"
'B' -> "2"
...
'Z' -> "26"
\`\`\`

Given a string \`s\` containing only digits, return the **number of ways** to decode it.

A string with a leading zero (e.g. \`"06"\`) cannot be decoded as \`'F'\` (6) because \`"06"\` is not a valid encoding. However, \`"6"\` alone is valid. A \`'0'\` that cannot be paired with a preceding \`'1'\` or \`'2'\` makes the whole string invalid (0 ways).

\`\`\`text
Example 1:
Input:  s = "12"
Output: 2
Explanation:
  "1","2" -> "AB"
  "12"    -> "L"
  2 total ways.
\`\`\`

\`\`\`text
Example 2:
Input:  s = "226"
Output: 3
Explanation:
  "2","2","6" -> "BBF"
  "22","6"    -> "VF"
  "2","26"    -> "BZ"
  3 total ways.
\`\`\`

\`\`\`text
Example 3:
Input:  s = "06"
Output: 0
Explanation: Leading zero — no valid decoding exists.
\`\`\`

**Constraints:**
- \`1 <= s.length <= 100\`
- \`s\` contains only digit characters \`'0'\`–\`'9'\``,
  hints: [
    `Think recursively: at each position you can take 1 digit (if it's not '0') or 2 digits (if they form a number 10–26).`,
    `Use dynamic programming. Let dp[i] = number of ways to decode the first i characters. What are the base cases?`,
    `dp[0] = 1 (empty prefix), dp[1] = 0 or 1 depending on s[0]. For i >= 2, add dp[i-1] if s[i-1] != '0', and add dp[i-2] if s[i-2..i-1] is between 10 and 26.`,
  ],
  signature: {
    "name": "numDecodings",
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
        "12"
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        "226"
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        "06"
      ],
      "expected": 0,
      "hidden": false
    },
    {
      "input": [
        "1"
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        "10"
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        "27"
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        "11106"
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        "2101"
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        "230"
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        "11111"
      ],
      "expected": 8,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def num_decodings(s: str) -> int:
    # TODO: implement decode ways
    return 0
`,
    javascript: `/**
 * @param {string} s
 * @return {number}
 */
function numDecodings(s) {
    // TODO: implement decode ways
    return 0;
}
`,
    java: `class Solution {
    public int numDecodings(String s) {
        // TODO: implement decode ways
        return 0;
    }
}
`,
    c: `#include <stdlib.h>
#include <string.h>

int numDecodings(char* s) {
    // TODO: implement decode ways
    return 0;
}
`,
  },
  solutions: {
    python: `def num_decodings(s: str) -> int:
    n = len(s)
    if n == 0 or s[0] == '0':
        return 0
    dp = [0] * (n + 1)
    dp[0] = 1
    dp[1] = 1
    for i in range(2, n + 1):
        one_digit = int(s[i-1])
        two_digit = int(s[i-2:i])
        if one_digit >= 1:
            dp[i] += dp[i-1]
        if 10 <= two_digit <= 26:
            dp[i] += dp[i-2]
    return dp[n]
`,
    javascript: `function numDecodings(s) {
    const n = s.length;
    if (n === 0 || s[0] === '0') return 0;
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;
    dp[1] = 1;
    for (let i = 2; i <= n; i++) {
        const oneDig = parseInt(s[i-1], 10);
        const twoDig = parseInt(s.substring(i-2, i), 10);
        if (oneDig >= 1) dp[i] += dp[i-1];
        if (twoDig >= 10 && twoDig <= 26) dp[i] += dp[i-2];
    }
    return dp[n];
}
`,
    java: `class Solution {
    public int numDecodings(String s) {
        int n = s.length();
        if (n == 0 || s.charAt(0) == '0') return 0;
        int[] dp = new int[n + 1];
        dp[0] = 1;
        dp[1] = 1;
        for (int i = 2; i <= n; i++) {
            int oneDig = s.charAt(i-1) - '0';
            int twoDig = Integer.parseInt(s.substring(i-2, i));
            if (oneDig >= 1) dp[i] += dp[i-1];
            if (twoDig >= 10 && twoDig <= 26) dp[i] += dp[i-2];
        }
        return dp[n];
    }
}
`,
    c: `#include <stdlib.h>
#include <string.h>

int numDecodings(char* s) {
    int n = (int)strlen(s);
    if (n == 0 || s[0] == '0') return 0;
    int* dp = (int*)calloc(n + 1, sizeof(int));
    dp[0] = 1;
    dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        int oneDig = s[i-1] - '0';
        int twoDig = (s[i-2] - '0') * 10 + (s[i-1] - '0');
        if (oneDig >= 1) dp[i] += dp[i-1];
        if (twoDig >= 10 && twoDig <= 26) dp[i] += dp[i-2];
    }
    int result = dp[n];
    free(dp);
    return result;
}
`,
  },
  editorial: `## Approach: Dynamic Programming

### Intuition

At each position \`i\` in the string, we have at most two choices:
1. **Take one digit** \`s[i-1]\` — valid if \`s[i-1] != '0'\`.
2. **Take two digits** \`s[i-2..i-1]\` — valid if the resulting number is between \`10\` and \`26\`.

This optimal substructure leads us to define:

> \`dp[i]\` = number of ways to decode the first \`i\` characters of \`s\`.

### Recurrence

\`\`\`
dp[0] = 1               // empty string: one trivial decoding
dp[1] = 1 if s[0] != '0' else 0

for i from 2 to n:
    one = int(s[i-1])
    two = int(s[i-2:i])
    if one >= 1:            dp[i] += dp[i-1]
    if 10 <= two <= 26:     dp[i] += dp[i-2]
\`\`\`

### Key Edge Cases
- \`s[0] == '0'\` → return 0 immediately.
- Interior \`'0'\` can only be consumed as the second digit of \`10\` or \`20\`.
- Two-digit values \`27\`–\`99\` are not valid mappings.

### Verification of sample cases
- \`"12"\`: dp = [1,1,2] → **2** ✓
- \`"226"\`: dp = [1,1,2,3] → **3** ✓
- \`"06"\`: starts with '0' → **0** ✓
- \`"11111"\`: dp = [1,1,2,3,5,8] → **8** ✓

### Complexity
- **Time:** O(n) — single left-to-right pass.
- **Space:** O(n) for the dp array (reducible to O(1) using two variables).`,
};

export default problem;
