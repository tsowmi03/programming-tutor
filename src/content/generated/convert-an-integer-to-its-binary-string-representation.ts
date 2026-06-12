import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "convert-an-integer-to-its-binary-string-representation",
  title: "Integer to Binary String",
  difficulty: "medium",
  category: "foundations",
  order: 1024,
  description: `Given a non-negative integer \`n\`, return its **binary string representation** — the base-2 representation without leading zeros.

The only exception is \`n = 0\`, whose binary representation is \`"0"\`.

\`\`\`text
Example 1:
Input:  n = 5
Output: "101"
Explanation: 5 = 1×4 + 0×2 + 1×1 = (101)₂
\`\`\`

\`\`\`text
Example 2:
Input:  n = 10
Output: "1010"
Explanation: 10 = 1×8 + 0×4 + 1×2 + 0×1 = (1010)₂
\`\`\`

\`\`\`text
Example 3:
Input:  n = 0
Output: "0"
\`\`\`

**Constraints:**
- \`0 <= n <= 10^9\``,
  hints: [
    `Think about what \`n % 2\` reveals — it is the least significant (rightmost) bit of \`n\`'s binary representation.`,
    `Repeatedly divide \`n\` by 2, recording \`n % 2\` each time. The remainders give the bits from LSB to MSB — how do you reverse them to form the final string?`,
    `Remember to handle the edge case \`n = 0\` before entering the loop, since the condition \`n > 0\` would never execute.`,
    `After implementing manually, consider exploring built-in helpers: Python's \`bin()\`, JavaScript's \`.toString(2)\`, and Java's \`Integer.toBinaryString()\`.`,
  ],
  signature: {
    "name": "decimalToBinary",
    "params": [
      {
        "name": "n",
        "type": "int"
      }
    ],
    "returns": "string"
  },
  testCases: [
    {
      "input": [
        0
      ],
      "expected": "0",
      "hidden": false
    },
    {
      "input": [
        5
      ],
      "expected": "101",
      "hidden": false
    },
    {
      "input": [
        10
      ],
      "expected": "1010",
      "hidden": false
    },
    {
      "input": [
        1
      ],
      "expected": "1",
      "hidden": true
    },
    {
      "input": [
        2
      ],
      "expected": "10",
      "hidden": true
    },
    {
      "input": [
        255
      ],
      "expected": "11111111",
      "hidden": true
    },
    {
      "input": [
        1024
      ],
      "expected": "10000000000",
      "hidden": true
    },
    {
      "input": [
        42
      ],
      "expected": "101010",
      "hidden": true
    },
    {
      "input": [
        100
      ],
      "expected": "1100100",
      "hidden": true
    },
    {
      "input": [
        1000000000
      ],
      "expected": "111011100110101100101000000000",
      "hidden": true
    }
  ],
  starterCode: {
    python: `def decimal_to_binary(n: int) -> str:
    # TODO: implement
    return ""`,
    javascript: `function decimalToBinary(n) {
    // TODO: implement
    return "";
}`,
    typescript: `function decimalToBinary(n: number): string {
    // TODO: implement
    return "";
}`,
    java: `class Solution {
    public String decimalToBinary(int n) {
        // TODO: implement
        return "";
    }
}`,
    csharp: `public class Solution {
    public string DecimalToBinary(int n) {
        // TODO: implement
        return "";
    }
}`,
    c: `char* decimalToBinary(int n) {
    /* TODO: implement */
    return "";
}`,
    cpp: `class Solution {
public:
    string decimalToBinary(int n) {
        // TODO: implement
        return "";
    }
};`,
  },
  solutions: {
    python: `def decimal_to_binary(n: int) -> str:
    if n == 0:
        return "0"
    bits = []
    while n > 0:
        bits.append(str(n % 2))
        n //= 2
    return "".join(reversed(bits))`,
    javascript: `function decimalToBinary(n) {
    if (n === 0) return "0";
    let result = "";
    while (n > 0) {
        result = String(n % 2) + result;
        n = Math.floor(n / 2);
    }
    return result;
}`,
    typescript: `function decimalToBinary(n: number): string {
    if (n === 0) return "0";
    let result = "";
    while (n > 0) {
        result = String(n % 2) + result;
        n = Math.floor(n / 2);
    }
    return result;
}`,
    java: `class Solution {
    public String decimalToBinary(int n) {
        if (n == 0) return "0";
        StringBuilder sb = new StringBuilder();
        while (n > 0) {
            sb.append(n % 2);
            n /= 2;
        }
        return sb.reverse().toString();
    }
}`,
    csharp: `public class Solution {
    public string DecimalToBinary(int n) {
        if (n == 0) return "0";
        System.Text.StringBuilder sb = new System.Text.StringBuilder();
        while (n > 0) {
            sb.Append(n % 2);
            n /= 2;
        }
        char[] chars = sb.ToString().ToCharArray();
        System.Array.Reverse(chars);
        return new string(chars);
    }
}`,
    c: `#include <stdlib.h>

char* decimalToBinary(int n) {
    if (n == 0) {
        char* result = (char*)malloc(2 * sizeof(char));
        result[0] = '0';
        result[1] = '\\0';
        return result;
    }
    int temp = n, bits = 0;
    while (temp > 0) { bits++; temp /= 2; }
    char* result = (char*)malloc((bits + 1) * sizeof(char));
    result[bits] = '\\0';
    int i = bits - 1;
    while (n > 0) {
        result[i--] = '0' + (n % 2);
        n /= 2;
    }
    return result;
}`,
    cpp: `class Solution {
public:
    string decimalToBinary(int n) {
        if (n == 0) return "0";
        string result = "";
        while (n > 0) {
            result = char('0' + n % 2) + result;
            n /= 2;
        }
        return result;
    }
};`,
  },
  editorial: `## Approach: Repeated Division by 2

### Intuition

In binary (base 2) every digit represents a power of 2. The key insight is:
- \`n % 2\` gives the **least significant bit** (the rightmost 0 or 1).
- \`n / 2\` (integer division) **shifts all bits one position right**, discarding the bit we just recorded.

By repeating these two operations until \`n\` reaches 0 we collect all bits in LSB-to-MSB order; reversing them yields the final binary string.

### Algorithm

1. **Edge case** — if \`n == 0\`, return \`"0"\` immediately.
2. **Collect bits** — while \`n > 0\`, record \`n % 2\`, then set \`n = n / 2\`.
3. **Reverse** the collected bits (they were gathered LSB-first).
4. **Return** the resulting string.

### Worked Example — n = 42

| Step | n  | n % 2 | n / 2 |
|------|----|-------|-------|
| 1    | 42 | 0     | 21    |
| 2    | 21 | 1     | 10    |
| 3    | 10 | 0     | 5     |
| 4    | 5  | 1     | 2     |
| 5    | 2  | 0     | 1     |
| 6    | 1  | 1     | 0     |

Remainders (LSB → MSB): \`0 1 0 1 0 1\`  
Reversed (MSB → LSB): \`1 0 1 0 1 0\`  
Result: \`"101010"\` ✓  (42 = 32 + 8 + 2)

### Complexity

- **Time**: O(log n) — the loop executes ⌊log₂ n⌋ + 1 times.
- **Space**: O(log n) — the result string holds ⌊log₂ n⌋ + 1 characters.`,
};

export default problem;
