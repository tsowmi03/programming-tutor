import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "minimum-additions-to-make-parentheses-valid",
  title: "Minimum Additions to Make Parentheses Valid",
  difficulty: "easy",
  category: "stack",
  order: 1019,
  description: `Given a string \`s\` consisting only of \`'('\` and \`')'\`, return the **minimum number of parentheses** you must add (anywhere in the string) to make the string valid.

A parentheses string is **valid** if every opening bracket has a matching closing bracket and vice versa.

\`\`\`text
Example 1:
Input:  s = "())"
Output: 1
Explanation: We need to add one '(' at the start → "(())"
\`\`\`

\`\`\`text
Example 2:
Input:  s = "((("
Output: 3
Explanation: We need to add three ')' at the end → "((()))"
\`\`\`

\`\`\`text
Example 3:
Input:  s = "()"
Output: 0
Explanation: Already valid.
\`\`\`

\`\`\`text
Example 4:
Input:  s = "())("
Output: 2
Explanation: Add one '(' at the start and one ')' at the end → "(())()"
\`\`\`

**Constraints:**
- \`1 <= s.length <= 1000\`
- \`s[i]\` is either \`'('\` or \`')'\``,
  hints: [
    `Think about tracking how many unmatched '(' you have seen so far as you scan left to right.`,
    `When you see a ')' and there is no unmatched '(', you must add a '(' — count that. When you finish scanning, every remaining unmatched '(' needs a ')' — count those too.`,
  ],
  guidance: [
    {
      "title": "Core Observation",
      "body": "A greedy left-to-right scan is enough. You never need to look ahead — decide what to do at each character based only on the current balance.",
      "level": "nudge"
    },
    {
      "title": "Track Open Count",
      "body": "Maintain a counter `open` representing unmatched `'('` seen so far, and a counter `additions` for how many characters you need to add.\n\n- `'('` → increment `open`.\n- `')'` → if `open > 0`, decrement `open` (a match is made); otherwise increment `additions` (we need an extra `'('`).\n\nAt the end, every remaining `open` unmatched `'('` needs a `')'`, so add `open` to `additions`.",
      "level": "strategy"
    },
    {
      "title": "Why a Full Stack is Unnecessary",
      "body": "You only ever push `'('` onto the stack, so the stack degenerates to a single integer counter. This keeps both time and space O(n) and O(1) respectively.",
      "level": "nudge"
    },
    {
      "title": "Pseudocode Shape",
      "body": "```\nopen = 0, additions = 0\nfor each char c in s:\n    if c == '(':\n        open += 1\n    else:  # c == ')'\n        if open > 0:\n            open -= 1\n        else:\n            additions += 1\nreturn additions + open\n```",
      "level": "pseudocode"
    }
  ],

  signature: {
    "name": "minAddToMakeValid",
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
        "())"
      ],
      "expected": 1,
      "hidden": false
    },
    {
      "input": [
        "((("
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        "()"
      ],
      "expected": 0,
      "hidden": false
    },
    {
      "input": [
        "())("
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        ""
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        ")"
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        "((()))"
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        "))(("
      ],
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        "()()()()()("
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        "))))))))"
      ],
      "expected": 8,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def min_add_to_make_valid(s: str) -> int:
    # TODO: implement
    return 0
`,
    javascript: `/**
 * @param {string} s
 * @return {number}
 */
function minAddToMakeValid(s) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function minAddToMakeValid(s: string): number {
    // TODO: implement
    return 0;
}
`,
    java: `class Solution {
    public int minAddToMakeValid(String s) {
        // TODO: implement
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int MinAddToMakeValid(string s) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int minAddToMakeValid(char* s) {
    // TODO: implement
    return 0;
}
`,
    cpp: `class Solution {
public:
    int minAddToMakeValid(string s) {
        // TODO: implement
        return 0;
    }
};
`,
  },
  solutions: {
    python: `def min_add_to_make_valid(s: str) -> int:
    open_count = 0
    additions = 0
    for c in s:
        if c == '(':
            open_count += 1
        else:
            if open_count > 0:
                open_count -= 1
            else:
                additions += 1
    return additions + open_count
`,
    javascript: `/**
 * @param {string} s
 * @return {number}
 */
function minAddToMakeValid(s) {
    let open = 0, additions = 0;
    for (const c of s) {
        if (c === '(') {
            open++;
        } else {
            if (open > 0) {
                open--;
            } else {
                additions++;
            }
        }
    }
    return additions + open;
}
`,
    typescript: `function minAddToMakeValid(s: string): number {
    let open = 0, additions = 0;
    for (const c of s) {
        if (c === '(') {
            open++;
        } else {
            if (open > 0) {
                open--;
            } else {
                additions++;
            }
        }
    }
    return additions + open;
}
`,
    java: `class Solution {
    public int minAddToMakeValid(String s) {
        int open = 0, additions = 0;
        for (char c : s.toCharArray()) {
            if (c == '(') {
                open++;
            } else {
                if (open > 0) {
                    open--;
                } else {
                    additions++;
                }
            }
        }
        return additions + open;
    }
}
`,
    csharp: `public class Solution {
    public int MinAddToMakeValid(string s) {
        int open = 0, additions = 0;
        foreach (char c in s) {
            if (c == '(') {
                open++;
            } else {
                if (open > 0) {
                    open--;
                } else {
                    additions++;
                }
            }
        }
        return additions + open;
    }
}
`,
    c: `int minAddToMakeValid(char* s) {
    int open = 0, additions = 0;
    for (int i = 0; s[i] != '\\0'; i++) {
        if (s[i] == '(') {
            open++;
        } else {
            if (open > 0) {
                open--;
            } else {
                additions++;
            }
        }
    }
    return additions + open;
}
`,
    cpp: `class Solution {
public:
    int minAddToMakeValid(string s) {
        int open = 0, additions = 0;
        for (char c : s) {
            if (c == '(') {
                open++;
            } else {
                if (open > 0) {
                    open--;
                } else {
                    additions++;
                }
            }
        }
        return additions + open;
    }
};
`,
  },
  editorial: `## Approach: Greedy Counter (Stack Reduced to an Integer)

### Intuition
When scanning left to right, the only reason a character cannot be immediately matched is:
- A \`')'\` appears when there is no unmatched \`'('\` to the left → we must have added a \`'('\` somewhere to the left.
- After the full scan, every remaining unmatched \`'('\` needs a \`')'\` to the right.

A stack that only ever holds \`'('\` characters degenerates to a single integer \`open\` tracking how many unmatched opening brackets exist.

### Algorithm
1. Initialise \`open = 0\` (unmatched \`'('\`) and \`additions = 0\`.
2. For each character \`c\`:
   - \`c == '('\` → \`open++\`
   - \`c == ')'\` → if \`open > 0\`, match it (\`open--\`); otherwise we need an extra \`'('\`, so \`additions++\`.
3. Return \`additions + open\`.

### Complexity
- **Time:** O(n) — single pass through the string.
- **Space:** O(1) — only two integer counters.

### Example Trace (\`"())("\`):
\`\`\`
c='(' → open=1, additions=0
c=')' → open=0, additions=0  (matched)
c=')' → open=0, additions=1  (no match; need extra '(')
c='(' → open=1, additions=1
Result = 1 + 1 = 2  ✓
\`\`\``,
};

export default problem;
