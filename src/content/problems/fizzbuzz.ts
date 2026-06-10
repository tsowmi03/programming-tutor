import type { CodeProblemDef } from "../types";

export const fizzbuzz: CodeProblemDef = {
  type: "code",
  slug: "fizzbuzz",
  title: "FizzBuzz",
  difficulty: "easy",
  category: "foundations",
  order: 1,
  description: `The classic warm-up. Given an integer \`n\`, return an array of strings where, for each number \`i\` from \`1\` to \`n\`:

- \`"FizzBuzz"\` if \`i\` is divisible by both 3 and 5
- \`"Fizz"\` if \`i\` is divisible by 3
- \`"Buzz"\` if \`i\` is divisible by 5
- the number itself as a string otherwise

**Example 1**

\`\`\`text
Input: n = 3
Output: ["1","2","Fizz"]
\`\`\`

**Example 2**

\`\`\`text
Input: n = 5
Output: ["1","2","Fizz","4","Buzz"]
\`\`\`

**Constraints**

- \`1 <= n <= 10000\`
`,
  hints: [
    "Check divisibility with the modulo operator: `i % 3 == 0`.",
    "Test for divisibility by both 3 and 5 *before* testing each individually — otherwise `15` matches `\"Fizz\"` first.",
    "A number divisible by both 3 and 5 is divisible by 15.",
  ],
  signature: {
    name: "fizzBuzz",
    params: [{ name: "n", type: "int" }],
    returns: "string[]",
  },
  testCases: [
    { input: [3], expected: ["1", "2", "Fizz"] },
    { input: [5], expected: ["1", "2", "Fizz", "4", "Buzz"] },
    {
      input: [15],
      expected: [
        "1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz",
        "11", "Fizz", "13", "14", "FizzBuzz",
      ],
    },
    { input: [1], expected: ["1"], hidden: true },
    { input: [2], expected: ["1", "2"], hidden: true },
    {
      input: [30],
      expected: [
        "1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz",
        "11", "Fizz", "13", "14", "FizzBuzz", "16", "17", "Fizz", "19",
        "Buzz", "Fizz", "22", "23", "Fizz", "Buzz", "26", "Fizz", "28",
        "29", "FizzBuzz",
      ],
      hidden: true,
    },
  ],
  starterCode: {
    python: `def fizz_buzz(n):
    """Return the FizzBuzz sequence from 1 to n as a list of strings."""
    # Your code here
    pass
`,
    javascript: `/**
 * @param {number} n
 * @return {string[]}
 */
function fizzBuzz(n) {
  // Your code here
}
`,
    java: `class Solution {
    public String[] fizzBuzz(int n) {
        // Your code here
        return new String[]{};
    }
}
`,
    c: `/**
 * Return a heap-allocated array of heap-allocated strings.
 * Set *returnSize to the length of the returned array.
 */
char** fizzBuzz(int n, int* returnSize) {
    // Your code here
    *returnSize = 0;
    return NULL;
}
`,
  },
  solutions: {
    python: `def fizz_buzz(n):
    out = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            out.append("FizzBuzz")
        elif i % 3 == 0:
            out.append("Fizz")
        elif i % 5 == 0:
            out.append("Buzz")
        else:
            out.append(str(i))
    return out
`,
    javascript: `function fizzBuzz(n) {
  const out = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) out.push("FizzBuzz");
    else if (i % 3 === 0) out.push("Fizz");
    else if (i % 5 === 0) out.push("Buzz");
    else out.push(String(i));
  }
  return out;
}
`,
    java: `class Solution {
    public String[] fizzBuzz(int n) {
        String[] out = new String[n];
        for (int i = 1; i <= n; i++) {
            if (i % 15 == 0) out[i - 1] = "FizzBuzz";
            else if (i % 3 == 0) out[i - 1] = "Fizz";
            else if (i % 5 == 0) out[i - 1] = "Buzz";
            else out[i - 1] = String.valueOf(i);
        }
        return out;
    }
}
`,
    c: `char** fizzBuzz(int n, int* returnSize) {
    char** out = malloc(n * sizeof(char*));
    for (int i = 1; i <= n; i++) {
        char* s = malloc(16);
        if (i % 15 == 0) strcpy(s, "FizzBuzz");
        else if (i % 3 == 0) strcpy(s, "Fizz");
        else if (i % 5 == 0) strcpy(s, "Buzz");
        else snprintf(s, 16, "%d", i);
        out[i - 1] = s;
    }
    *returnSize = n;
    return out;
}
`,
  },
  editorial: `## Approach

Loop from \`1\` to \`n\` and decide what to append for each number. The only
trap is **order of checks**: a multiple of 15 is also a multiple of 3, so the
combined case must be tested first.

Checking \`i % 15 == 0\` is equivalent to checking divisibility by both 3 and
5, because 15 is their least common multiple.

**Complexity:** O(n) time, O(n) space for the output array.

This problem is mostly about getting comfortable with the editor, the Run
button, and how test results are reported — the habits you'll use on every
other problem here.
`,
};
