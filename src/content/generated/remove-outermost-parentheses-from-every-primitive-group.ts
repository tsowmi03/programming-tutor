import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "remove-outermost-parentheses-from-every-primitive-group",
  title: "Remove Outermost Parentheses",
  difficulty: "medium",
  category: "stack",
  order: 1023,
  description: `A valid parentheses string is either empty, \`"(" + A + ")"\`, or \`A + B\`, where \`A\` and \`B\` are valid parentheses strings.

A valid parentheses string \`s\` can be decomposed into a list of **primitive** strings: the shortest non-empty valid parentheses substrings. For example, \`"(())(())"\` decomposes into \`["(())", "(())"]\`.

Given a valid parentheses string \`s\`, remove the **outermost** parentheses of each primitive component and return the resulting string.

\`\`\`text
Example 1:
Input:  s = "(())()"
Decomposition: ["(())", "()"]
After removing outermost: "()" + "" = "()"
Output: "()"
\`\`\`

\`\`\`text
Example 2:
Input:  s = "(()())"
Decomposition: ["(()())"]
After removing outermost: "()()"
Output: "()()"
\`\`\`

\`\`\`text
Example 3:
Input:  s = "()()"
Decomposition: ["()", "()"]
After removing outermost: "" + "" = ""
Output: ""
\`\`\`

**Constraints:**
- \`1 <= s.length <= 10^5\`
- \`s\` is a valid parentheses string.
- \`s.length\` is even.`,
  hints: [
    `Think about tracking the depth of nesting as you scan left to right. When does a character belong to the 'outermost' layer?`,
    `A character is part of the outermost parentheses if the depth is exactly 0 before a '(' or exactly 1 before a ')'. Use a counter to track depth and skip those characters.`,
  ],
  guidance: [
    {
      "title": "What defines the outermost parentheses?",
      "body": "Each primitive group starts with an opening `(` that brings the depth from 0 to 1, and ends with a closing `)` that brings the depth from 1 to 0. These two characters are the 'outermost' ones and should be skipped.",
      "level": "nudge"
    },
    {
      "title": "Use a depth counter instead of a stack",
      "body": "Instead of maintaining an explicit stack, use a single integer counter `depth`. Increment it on `(` and decrement it on `)`. Include the character in the result only when:\n- It is `(` and `depth > 0` (after incrementing), OR\n- It is `)` and `depth > 0` (before decrementing).",
      "level": "strategy"
    },
    {
      "title": "Pitfall: order of check and update",
      "body": "Be careful about whether you update `depth` before or after checking. For `(`: increment first, then include if `depth > 1`. For `)`: include if `depth > 1`, then decrement. This ensures the very first `(` (depth goes 0→1) and the very last `)` (depth goes 1→0) are excluded.",
      "level": "pitfall"
    },
    {
      "title": "Algorithm shape",
      "body": "```\ndepth = 0\nresult = []\nfor each char c in s:\n    if c == '(':\n        depth += 1\n        if depth > 1:\n            result.append(c)\n    else:  # c == ')'\n        depth -= 1\n        if depth > 0:\n            result.append(c)\nreturn join(result)\n```",
      "level": "pseudocode"
    }
  ],

  signature: {
    "name": "removeOuterParentheses",
    "params": [
      {
        "name": "s",
        "type": "string"
      }
    ],
    "returns": "string",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        "(())()"
      ],
      "expected": "()",
      "hidden": false
    },
    {
      "input": [
        "(()())"
      ],
      "expected": "()()",
      "hidden": false
    },
    {
      "input": [
        "()()"
      ],
      "expected": "",
      "hidden": false
    },
    {
      "input": [
        "((()))"
      ],
      "expected": "(())",
      "hidden": true
    },
    {
      "input": [
        "(())(())"
      ],
      "expected": "()()",
      "hidden": true
    },
    {
      "input": [
        "(()(()))"
      ],
      "expected": "()(())",
      "hidden": true
    },
    {
      "input": [
        "()"
      ],
      "expected": "",
      "hidden": true
    },
    {
      "input": [
        "(()())(())(()(()))"
      ],
      "expected": "()()()()(())",
      "hidden": true
    },
    {
      "input": [
        "((()))((()))"
      ],
      "expected": "(())(())",
      "hidden": true
    }
  ],
  starterCode: {
    python: `def remove_outer_parentheses(s: str) -> str:
    # TODO: implement
    return ""
`,
    javascript: `/**
 * @param {string} s
 * @return {string}
 */
function removeOuterParentheses(s) {
    // TODO: implement
    return "";
}
`,
    typescript: `function removeOuterParentheses(s: string): string {
    // TODO: implement
    return "";
}
`,
    java: `class Solution {
    public String removeOuterParentheses(String s) {
        // TODO: implement
        return "";
    }
}
`,
    csharp: `public class Solution {
    public string RemoveOuterParentheses(string s) {
        // TODO: implement
        return "";
    }
}
`,
    c: `char* removeOuterParentheses(char* s) {
    // TODO: implement
    return "";
}
`,
    cpp: `class Solution {
public:
    string removeOuterParentheses(string s) {
        // TODO: implement
        return "";
    }
};
`,
  },
  solutions: {
    python: `def remove_outer_parentheses(s: str) -> str:
    depth = 0
    result = []
    for c in s:
        if c == '(':
            depth += 1
            if depth > 1:
                result.append(c)
        else:
            depth -= 1
            if depth > 0:
                result.append(c)
    return ''.join(result)
`,
    javascript: `/**
 * @param {string} s
 * @return {string}
 */
function removeOuterParentheses(s) {
    let depth = 0;
    let result = [];
    for (const c of s) {
        if (c === '(') {
            depth++;
            if (depth > 1) result.push(c);
        } else {
            depth--;
            if (depth > 0) result.push(c);
        }
    }
    return result.join('');
}
`,
    typescript: `function removeOuterParentheses(s: string): string {
    let depth = 0;
    const result: string[] = [];
    for (const c of s) {
        if (c === '(') {
            depth++;
            if (depth > 1) result.push(c);
        } else {
            depth--;
            if (depth > 0) result.push(c);
        }
    }
    return result.join('');
}
`,
    java: `class Solution {
    public String removeOuterParentheses(String s) {
        int depth = 0;
        StringBuilder sb = new StringBuilder();
        for (char c : s.toCharArray()) {
            if (c == '(') {
                depth++;
                if (depth > 1) sb.append(c);
            } else {
                depth--;
                if (depth > 0) sb.append(c);
            }
        }
        return sb.toString();
    }
}
`,
    csharp: `public class Solution {
    public string RemoveOuterParentheses(string s) {
        int depth = 0;
        var sb = new System.Text.StringBuilder();
        foreach (char c in s) {
            if (c == '(') {
                depth++;
                if (depth > 1) sb.Append(c);
            } else {
                depth--;
                if (depth > 0) sb.Append(c);
            }
        }
        return sb.ToString();
    }
}
`,
    c: `#include <stdlib.h>
#include <string.h>

char* removeOuterParentheses(char* s) {
    int n = (int)strlen(s);
    char* result = (char*)malloc((n + 1) * sizeof(char));
    int idx = 0;
    int depth = 0;
    for (int i = 0; i < n; i++) {
        if (s[i] == '(') {
            depth++;
            if (depth > 1) result[idx++] = s[i];
        } else {
            depth--;
            if (depth > 0) result[idx++] = s[i];
        }
    }
    result[idx] = '\\0';
    return result;
}
`,
    cpp: `class Solution {
public:
    string removeOuterParentheses(string s) {
        int depth = 0;
        string result;
        for (char c : s) {
            if (c == '(') {
                depth++;
                if (depth > 1) result += c;
            } else {
                depth--;
                if (depth > 0) result += c;
            }
        }
        return result;
    }
};
`,
  },
  editorial: `## Approach: Depth Counter

### Intuition

We scan the string left to right, maintaining a \`depth\` counter. Each primitive group starts when \`depth\` rises from 0 to 1 (an opening \`(\`) and ends when \`depth\` falls from 1 to 0 (a closing \`)\`). These boundary characters are the outermost parentheses of each primitive — we skip them and include everything else.

### Algorithm

1. Initialize \`depth = 0\` and an empty result buffer.
2. For each character \`c\`:
   - If \`c == '('\`: increment \`depth\`. If \`depth > 1\`, append \`c\` (it's not the outermost opening).
   - If \`c == ')'\`: decrement \`depth\`. If \`depth > 0\`, append \`c\` (it's not the outermost closing — check *after* decrement).
3. Return the joined result.

### Why it works

- The very first \`(\` of a primitive takes \`depth\` from 0 → 1. After increment, \`depth == 1\` which is not \`> 1\`, so it's skipped. ✓
- The very last \`)\` of a primitive takes \`depth\` from 1 → 0. After decrement, \`depth == 0\` which is not \`> 0\`, so it's skipped. ✓
- All interior characters have \`depth > 1\` (for \`(\`) or \`depth > 0\` after decrement (for \`)\`), so they're included. ✓

### Complexity

- **Time:** O(n) — single pass through the string.
- **Space:** O(n) — for the result buffer.`,
};

export default problem;
