import type { CodeProblemDef } from "../types";

export const validParentheses: CodeProblemDef = {
  type: "code",
  slug: "valid-parentheses",
  title: "Valid Parentheses",
  difficulty: "easy",
  category: "stack",
  order: 1,
  description: `Given a string \`s\` containing only the characters \`(\`, \`)\`, \`{\`, \`}\`, \`[\` and \`]\`, determine whether the brackets are **valid**:

1. Every opening bracket is closed by the same type of bracket.
2. Brackets close in the correct order (most recently opened, first closed).
3. Every closing bracket has a matching opening bracket.

**Example 1**

\`\`\`text
Input: s = "()[]{}"
Output: true
\`\`\`

**Example 2**

\`\`\`text
Input: s = "(]"
Output: false
\`\`\`

**Example 3**

\`\`\`text
Input: s = "([{}])"
Output: true
\`\`\`

**Constraints**

- \`1 <= s.length <= 10000\`
`,
  hints: [
    `“Most recently opened, first closed” is exactly Last-In-First-Out — which data structure is that?`,
    `Push opening brackets onto a stack. On a closing bracket, the top of the stack must be its partner; pop it. Anything else is invalid.`,
    `Don't forget the two edge cases at the ends: a closing bracket when the stack is empty, and leftover open brackets when the string finishes.`,
  ],
  signature: {
    "name": "isValid",
    "params": [
      {
        "name": "s",
        "type": "string"
      }
    ],
    "returns": "bool"
  },
  testCases: [
    {
      "input": [
        "()[]{}"
      ],
      "expected": true
    },
    {
      "input": [
        "(]"
      ],
      "expected": false
    },
    {
      "input": [
        "([{}])"
      ],
      "expected": true
    },
    {
      "input": [
        "("
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        ")"
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        "(("
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        "([)]"
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        "{[]}"
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        "(())((()())())"
      ],
      "expected": true,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def is_valid(s):
    """Return True if the bracket string is valid."""
    # Your code here
    pass
`,
    javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  // Your code here
}
`,
    typescript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s: string): boolean {
  // Your code here
  return false;
}`,
    java: `class Solution {
    public boolean isValid(String s) {
        // Your code here
        return false;
    }
}
`,
    csharp: `public class Solution {
    public bool IsValid(string s) {
        // Your code here
        return false;
    }
}`,
    c: `bool isValid(char* s) {
    // Your code here (a char array can act as the stack)
    return false;
}
`,
    cpp: `class Solution {
public:
    bool isValid(string s) {
        // Your code here
        return false;
    }
};`,
  },
  solutions: {
    python: `def is_valid(s):
    pairs = {")": "(", "]": "[", "}": "{"}
    stack = []
    for ch in s:
        if ch in "([{":
            stack.append(ch)
        else:
            if not stack or stack[-1] != pairs[ch]:
                return False
            stack.pop()
    return not stack
`,
    javascript: `function isValid(s) {
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const stack = [];
  for (const ch of s) {
    if (ch === "(" || ch === "[" || ch === "{") {
      stack.push(ch);
    } else {
      if (stack.length === 0 || stack[stack.length - 1] !== pairs[ch]) {
        return false;
      }
      stack.pop();
    }
  }
  return stack.length === 0;
}
`,
    typescript: `function isValid(s: string): boolean {
  const pairs: Record<string, string> = { ")": "(", "]": "[", "}": "{" };
  const stack: string[] = [];
  for (const ch of s) {
    if (ch === "(" || ch === "[" || ch === "{") {
      stack.push(ch);
    } else {
      if (stack.length === 0 || stack[stack.length - 1] !== pairs[ch]) {
        return false;
      }
      stack.pop();
    }
  }
  return stack.length === 0;
}`,
    java: `class Solution {
    public boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '[' || c == '{') {
                stack.push(c);
            } else {
                char open = c == ')' ? '(' : c == ']' ? '[' : '{';
                if (stack.isEmpty() || stack.pop() != open) return false;
            }
        }
        return stack.isEmpty();
    }
}
`,
    csharp: `using System.Collections.Generic;

public class Solution {
    public bool IsValid(string s) {
        var stack = new Stack<char>();
        foreach (char c in s) {
            if (c == '(' || c == '[' || c == '{') {
                stack.Push(c);
            } else {
                char open = c == ')' ? '(' : c == ']' ? '[' : '{';
                if (stack.Count == 0 || stack.Pop() != open) return false;
            }
        }
        return stack.Count == 0;
    }
}`,
    c: `bool isValid(char* s) {
    int n = (int)strlen(s);
    char* stack = malloc(n);
    int top = -1;
    bool ok = true;
    for (int i = 0; i < n && ok; i++) {
        char c = s[i];
        if (c == '(' || c == '[' || c == '{') {
            stack[++top] = c;
        } else {
            char open = c == ')' ? '(' : c == ']' ? '[' : '{';
            if (top < 0 || stack[top--] != open) ok = false;
        }
    }
    if (top != -1) ok = false;
    free(stack);
    return ok;
}
`,
    cpp: `class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (char c : s) {
            if (c == '(' || c == '[' || c == '{') {
                st.push(c);
            } else {
                char open = c == ')' ? '(' : c == ']' ? '[' : '{';
                if (st.empty() || st.top() != open) return false;
                st.pop();
            }
        }
        return st.empty();
    }
};`,
  },
  editorial: `## Approach: a stack of open brackets

The rule "brackets close in the reverse order they were opened" is the
definition of **LIFO** — a stack models it directly:

- **Opening bracket** → push it.
- **Closing bracket** → the most recent unclosed opening bracket (the top of
  the stack) must be its partner. If the stack is empty or the top doesn't
  match, the string is invalid; otherwise pop and continue.
- **At the end** the stack must be empty — leftover entries are brackets
  that were never closed (catches inputs like \`"(("\`).

A lookup table from each closer to its opener keeps the matching logic
table-driven instead of a chain of conditionals.

**Complexity:** O(n) time, O(n) space in the worst case (all openers).

Stacks are *the* tool whenever the most recent unfinished thing must finish
first: matching tags, undo histories, call stacks, expression evaluation.
`,
};
