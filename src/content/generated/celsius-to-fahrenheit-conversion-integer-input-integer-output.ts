import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "celsius-to-fahrenheit-conversion-integer-input-integer-output",
  title: "Celsius to Fahrenheit",
  difficulty: "easy",
  category: "foundations",
  order: 1021,
  description: `Given a temperature in Celsius, convert it to Fahrenheit using the formula:

**F = (C × 9 / 5) + 32**

The input temperature is always a multiple of 5, so the result will always be a whole number.

\`\`\`text
Example 1:
Input:  celsius = 0
Output: 32
Explanation: (0 × 9 / 5) + 32 = 0 + 32 = 32
\`\`\`

\`\`\`text
Example 2:
Input:  celsius = 100
Output: 212
Explanation: (100 × 9 / 5) + 32 = 180 + 32 = 212
\`\`\`

\`\`\`text
Example 3:
Input:  celsius = 25
Output: 77
Explanation: (25 × 9 / 5) + 32 = 45 + 32 = 77
\`\`\`

**Constraints:**
- -200 ≤ celsius ≤ 1000
- celsius is guaranteed to be a multiple of 5`,
  hints: [
    `The conversion formula is F = (C × 9 / 5) + 32.`,
    `Try computing C × 9 first, then divide by 5, then add 32 as three separate steps.`,
    `Since celsius is always a multiple of 5, the product C × 9 is always exactly divisible by 5, so no rounding is needed — straightforward integer arithmetic works perfectly.`,
  ],
  signature: {
    "name": "celsiusToFahrenheit",
    "params": [
      {
        "name": "celsius",
        "type": "int"
      }
    ],
    "returns": "int"
  },
  testCases: [
    {
      "input": [
        0
      ],
      "expected": 32,
      "hidden": false
    },
    {
      "input": [
        100
      ],
      "expected": 212,
      "hidden": false
    },
    {
      "input": [
        25
      ],
      "expected": 77,
      "hidden": false
    },
    {
      "input": [
        -40
      ],
      "expected": -40,
      "hidden": true
    },
    {
      "input": [
        20
      ],
      "expected": 68,
      "hidden": true
    },
    {
      "input": [
        -20
      ],
      "expected": -4,
      "hidden": true
    },
    {
      "input": [
        5
      ],
      "expected": 41,
      "hidden": true
    },
    {
      "input": [
        50
      ],
      "expected": 122,
      "hidden": true
    },
    {
      "input": [
        -5
      ],
      "expected": 23,
      "hidden": true
    },
    {
      "input": [
        35
      ],
      "expected": 95,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def celsius_to_fahrenheit(celsius: int) -> int:
    # TODO: implement the Celsius to Fahrenheit conversion
    return 0`,
    javascript: `function celsiusToFahrenheit(celsius) {
    // TODO: implement the Celsius to Fahrenheit conversion
    return 0;
}`,
    typescript: `function celsiusToFahrenheit(celsius: number): number {
    // TODO: implement the Celsius to Fahrenheit conversion
    return 0;
}`,
    java: `class Solution {
    public int celsiusToFahrenheit(int celsius) {
        // TODO: implement the Celsius to Fahrenheit conversion
        return 0;
    }
}`,
    csharp: `public class Solution {
    public int CelsiusToFahrenheit(int celsius) {
        // TODO: implement the Celsius to Fahrenheit conversion
        return 0;
    }
}`,
    c: `int celsiusToFahrenheit(int celsius) {
    /* TODO: implement the Celsius to Fahrenheit conversion */
    return 0;
}`,
    cpp: `class Solution {
public:
    int celsiusToFahrenheit(int celsius) {
        // TODO: implement the Celsius to Fahrenheit conversion
        return 0;
    }
};`,
  },
  solutions: {
    python: `def celsius_to_fahrenheit(celsius: int) -> int:
    return (celsius * 9) // 5 + 32`,
    javascript: `function celsiusToFahrenheit(celsius) {
    return (celsius * 9) / 5 + 32;
}`,
    typescript: `function celsiusToFahrenheit(celsius: number): number {
    return (celsius * 9) / 5 + 32;
}`,
    java: `class Solution {
    public int celsiusToFahrenheit(int celsius) {
        return (celsius * 9) / 5 + 32;
    }
}`,
    csharp: `public class Solution {
    public int CelsiusToFahrenheit(int celsius) {
        return (celsius * 9) / 5 + 32;
    }
}`,
    c: `int celsiusToFahrenheit(int celsius) {
    return (celsius * 9) / 5 + 32;
}`,
    cpp: `class Solution {
public:
    int celsiusToFahrenheit(int celsius) {
        return (celsius * 9) / 5 + 32;
    }
};`,
  },
  editorial: `## Approach: Direct Formula Application

Apply the standard Celsius-to-Fahrenheit conversion formula directly:

**F = (C × 9) / 5 + 32**

Because the input is guaranteed to be a multiple of 5, the intermediate product \`C × 9\` is always exactly divisible by 5. This means plain integer division produces a perfectly exact result in every language — no floating-point arithmetic or rounding is necessary.

### Steps
1. Multiply \`celsius\` by \`9\`.
2. Divide the result by \`5\` (exact integer division since \`celsius\` is a multiple of 5).
3. Add \`32\`.

### Worked Example (celsius = 25)
- 25 × 9 = 225
- 225 / 5 = 45
- 45 + 32 = **77** ✓

### Worked Example (celsius = −40)
- −40 × 9 = −360
- −360 / 5 = −72
- −72 + 32 = **−40** ✓  (the famous crossover point where both scales agree)

### Complexity
- **Time:** O(1) — only three arithmetic operations.
- **Space:** O(1) — no extra memory used.`,
};

export default problem;
