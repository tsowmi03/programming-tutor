import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "roman-numeral-string-to-integer",
  title: "Roman Numeral to Integer",
  difficulty: "medium",
  category: "foundations",
  order: 1025,
  description: `Given a Roman numeral string \`s\`, convert it to an integer.

Roman numerals use seven symbols:

| Symbol | Value |
|--------|-------|
| I      | 1     |
| V      | 5     |
| X      | 10    |
| L      | 50    |
| C      | 100   |
| D      | 500   |
| M      | 1000  |

Numerals are normally written largest to smallest, left to right. However, **subtractive notation** creates six special two-character combinations:

- **IV** = 4, **IX** = 9 (I placed before V or X)
- **XL** = 40, **XC** = 90 (X placed before L or C)
- **CD** = 400, **CM** = 900 (C placed before D or M)

\`\`\`text
Example 1:
Input:  s = "III"
Output: 3
Explanation: I + I + I = 3
\`\`\`

\`\`\`text
Example 2:
Input:  s = "MCMXCIV"
Output: 1994
Explanation: M=1000, CM=900, XC=90, IV=4  →  1000 + 900 + 90 + 4 = 1994
\`\`\`

**Constraints:**
- \`1 <= s.length <= 15\`
- \`s\` consists only of \`'I'\`, \`'V'\`, \`'X'\`, \`'L'\`, \`'C'\`, \`'D'\`, \`'M'\`.
- It is guaranteed that \`s\` is a valid Roman numeral in the range \`[1, 3999]\`.`,
  hints: [
    `Process the string from left to right. What happens when a symbol of smaller value appears directly before a symbol of larger value?`,
    `When the current symbol's value is less than the next symbol's value, that current symbol should be subtracted rather than added.`,
    `Build a lookup table mapping each Roman character to its integer value — a dictionary, switch statement, or small array works well.`,
    `A single left-to-right pass is sufficient: at each position, peek at the next character and decide whether to add or subtract the current value.`,
  ],
  signature: {
    "name": "romanToInt",
    "params": [
      {
        "name": "s",
        "type": "string"
      }
    ],
    "returns": "int"
  },
  testCases: [
    {
      "input": [
        "III"
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        "IV"
      ],
      "expected": 4,
      "hidden": false
    },
    {
      "input": [
        "MCMXCIV"
      ],
      "expected": 1994,
      "hidden": false
    },
    {
      "input": [
        "IX"
      ],
      "expected": 9,
      "hidden": true
    },
    {
      "input": [
        "LVIII"
      ],
      "expected": 58,
      "hidden": true
    },
    {
      "input": [
        "XLII"
      ],
      "expected": 42,
      "hidden": true
    },
    {
      "input": [
        "MMXXIV"
      ],
      "expected": 2024,
      "hidden": true
    },
    {
      "input": [
        "CDXLIV"
      ],
      "expected": 444,
      "hidden": true
    },
    {
      "input": [
        "I"
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        "MMMCMXCIX"
      ],
      "expected": 3999,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def roman_to_int(s: str) -> int:
    # TODO: implement
    return 0
`,
    javascript: `function romanToInt(s) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function romanToInt(s: string): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int romanToInt(String s) {
        // TODO: implement
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int RomanToInt(string s) {
        // TODO: implement
        return 0;
    }
}`,
    c: `int romanToInt(char* s) {
    /* TODO: implement */
    return 0;
}
`,
    cpp: `class Solution {
public:
    int romanToInt(string s) {
        // TODO: implement
        return 0;
    }
};`,
  },
  solutions: {
    python: `def roman_to_int(s: str) -> int:
    val = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000}
    result = 0
    for i in range(len(s)):
        curr = val[s[i]]
        nxt  = val[s[i + 1]] if i + 1 < len(s) else 0
        if curr < nxt:
            result -= curr
        else:
            result += curr
    return result
`,
    javascript: `function romanToInt(s) {
    const val = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000};
    let result = 0;
    for (let i = 0; i < s.length; i++) {
        const curr = val[s[i]];
        const next = i + 1 < s.length ? val[s[i + 1]] : 0;
        if (curr < next) result -= curr;
        else result += curr;
    }
    return result;
}
`,
    typescript: `function romanToInt(s: string): number {
    const val: {[key: string]: number} = {'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000};
    let result = 0;
    for (let i = 0; i < s.length; i++) {
        const curr = val[s[i]];
        const next = i + 1 < s.length ? val[s[i + 1]] : 0;
        if (curr < next) result -= curr;
        else result += curr;
    }
    return result;
}`,
    java: `class Solution {
    private int symVal(char c) {
        switch (c) {
            case 'I': return 1;
            case 'V': return 5;
            case 'X': return 10;
            case 'L': return 50;
            case 'C': return 100;
            case 'D': return 500;
            case 'M': return 1000;
            default:  return 0;
        }
    }

    public int romanToInt(String s) {
        int result = 0;
        for (int i = 0; i < s.length(); i++) {
            int curr = symVal(s.charAt(i));
            int next = (i + 1 < s.length()) ? symVal(s.charAt(i + 1)) : 0;
            if (curr < next) result -= curr;
            else             result += curr;
        }
        return result;
    }
}
`,
    csharp: `public class Solution {
    private int SymVal(char c) {
        switch (c) {
            case 'I': return 1;
            case 'V': return 5;
            case 'X': return 10;
            case 'L': return 50;
            case 'C': return 100;
            case 'D': return 500;
            case 'M': return 1000;
            default:  return 0;
        }
    }

    public int RomanToInt(string s) {
        int result = 0;
        for (int i = 0; i < s.Length; i++) {
            int curr = SymVal(s[i]);
            int next = (i + 1 < s.Length) ? SymVal(s[i + 1]) : 0;
            if (curr < next) result -= curr;
            else             result += curr;
        }
        return result;
    }
}`,
    c: `static int symVal(char c) {
    switch (c) {
        case 'I': return 1;
        case 'V': return 5;
        case 'X': return 10;
        case 'L': return 50;
        case 'C': return 100;
        case 'D': return 500;
        case 'M': return 1000;
        default:  return 0;
    }
}

int romanToInt(char* s) {
    int result = 0;
    int i = 0;
    while (s[i] != '\\0') {
        int curr = symVal(s[i]);
        int next = (s[i + 1] != '\\0') ? symVal(s[i + 1]) : 0;
        if (curr < next) result -= curr;
        else             result += curr;
        i++;
    }
    return result;
}
`,
    cpp: `class Solution {
private:
    int symVal(char c) {
        switch (c) {
            case 'I': return 1;
            case 'V': return 5;
            case 'X': return 10;
            case 'L': return 50;
            case 'C': return 100;
            case 'D': return 500;
            case 'M': return 1000;
            default:  return 0;
        }
    }
public:
    int romanToInt(string s) {
        int result = 0;
        for (int i = 0; i < (int)s.length(); i++) {
            int curr = symVal(s[i]);
            int next = (i + 1 < (int)s.length()) ? symVal(s[i + 1]) : 0;
            if (curr < next) result -= curr;
            else             result += curr;
        }
        return result;
    }
};`,
  },
  editorial: `## Approach: Left-to-Right Scan with Subtractive Rule

### Key Insight
In a valid Roman numeral, a symbol of **smaller value** immediately to the **left** of a symbol of **larger value** should be **subtracted** rather than added. All other symbols are added. This single rule covers all six subtractive cases (IV, IX, XL, XC, CD, CM).

### Algorithm
1. Build a constant-size lookup from each Roman character to its integer value.
2. Iterate through \`s\` left to right.
3. At index \`i\`, compare \`val[s[i]]\` with \`val[s[i+1]]\` (treat out-of-bounds as 0).
4. If \`curr < next\`, subtract \`curr\` from the running total; otherwise add it.
5. Return the total.

### Example Trace — \`"MCMXCIV"\`
| i | char | curr | next | action | total |
|---|------|------|------|--------|-------|
| 0 | M    | 1000 | 100  | +1000  | 1000  |
| 1 | C    | 100  | 1000 | −100   | 900   |
| 2 | M    | 1000 | 10   | +1000  | 1900  |
| 3 | X    | 10   | 100  | −10    | 1890  |
| 4 | C    | 100  | 1    | +100   | 1990  |
| 5 | I    | 1    | 5    | −1     | 1989  |
| 6 | V    | 5    | 0    | +5     | **1994** |

### Complexity
- **Time:** O(n) — one pass, where n ≤ 15, so effectively O(1).
- **Space:** O(1) — the lookup table has a fixed number of entries.`,
};

export default problem;
