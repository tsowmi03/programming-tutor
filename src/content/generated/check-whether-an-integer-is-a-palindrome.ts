import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "check-whether-an-integer-is-a-palindrome",
  title: "Integer Palindrome Check",
  difficulty: "easy",
  category: "foundations",
  order: 1005,
  description: `Given an integer \`x\`, return \`true\` if \`x\` is a **palindrome**, and \`false\` otherwise.

An integer is a palindrome when it reads the same forwards and backwards.

> **Note:** Negative integers are **never** palindromes.

\`\`\`text
Example 1:
Input:  x = 121
Output: true
Explanation: 121 reads as 121 from left to right and right to left.

Example 2:
Input:  x = -121
Output: false
Explanation: Negative numbers cannot be palindromes.

Example 3:
Input:  x = 10
Output: false
Explanation: "10" reversed is "01", which is not equal to "10".
\`\`\`

**Constraints:**
- \`-2^31 <= x <= 2^31 - 1\``,
  hints: [
    `A negative number can never be a palindrome — handle that case first.`,
    `Try converting the integer to its string representation, then check if it reads the same forwards and backwards.`,
    `Alternatively, reverse only the second half of the number's digits mathematically and compare it to the first half.`,
  ],
  signature: {
    "name": "isPalindrome",
    "params": [
      {
        "name": "x",
        "type": "int"
      }
    ],
    "returns": "bool"
  },
  testCases: [
    {
      "input": [
        121
      ],
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        -121
      ],
      "expected": false,
      "hidden": false
    },
    {
      "input": [
        10
      ],
      "expected": false,
      "hidden": false
    },
    {
      "input": [
        0
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        1
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        1221
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        12321
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        123
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        1000021
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        9
      ],
      "expected": true,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def is_palindrome(x: int) -> bool:
    # TODO: return True if x is a palindrome, False otherwise
    return False
`,
    javascript: `function isPalindrome(x) {
    // TODO: return true if x is a palindrome, false otherwise
    return false;
}
`,
    java: `class Solution {
    public boolean isPalindrome(int x) {
        // TODO: return true if x is a palindrome, false otherwise
        return false;
    }
}
`,
    c: `#include <stdio.h>
#include <string.h>
#include <stdbool.h>

bool isPalindrome(int x) {
    // TODO: return true if x is a palindrome, false otherwise
    return false;
}
`,
  },
  solutions: {
    python: `def is_palindrome(x: int) -> bool:
    if x < 0:
        return False
    s = str(x)
    return s == s[::-1]
`,
    javascript: `function isPalindrome(x) {
    if (x < 0) return false;
    const s = String(x);
    return s === s.split('').reverse().join('');
}
`,
    java: `class Solution {
    public boolean isPalindrome(int x) {
        if (x < 0) return false;
        String s = Integer.toString(x);
        String rev = new StringBuilder(s).reverse().toString();
        return s.equals(rev);
    }
}
`,
    c: `#include <stdio.h>
#include <string.h>
#include <stdbool.h>

bool isPalindrome(int x) {
    if (x < 0) return false;
    char buf[12];
    sprintf(buf, "%d", x);
    int len = (int)strlen(buf);
    for (int i = 0; i < len / 2; i++) {
        if (buf[i] != buf[len - 1 - i]) return false;
    }
    return true;
}
`,
  },
  editorial: `## Approach: String Reversal

### Key observations
1. **Negative numbers** can never be palindromes — return \`false\` immediately.
2. **Zero** is trivially a palindrome.
3. For all other non-negative integers, convert the number to its decimal string representation, then check whether the string equals its own reverse.

### Algorithm
\`\`\`
1. if x < 0 → return false
2. s = digits of x as a string
3. return s == reverse(s)
\`\`\`

### Worked example — x = 12321
- String: \`"12321"\`
- Reversed: \`"12321"\`
- Equal → \`true\`

### Worked example — x = 10
- String: \`"10"\`
- Reversed: \`"01"\`
- Not equal → \`false\`

### Complexity
| | Value |
|---|---|
| Time | O(d), where d = number of decimal digits |
| Space | O(d) for the string |

For 32-bit integers d ≤ 10, so both time and space are effectively **O(1)**.`,
};

export default problem;
