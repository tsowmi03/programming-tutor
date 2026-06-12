import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "valid-parentheses-with-three-bracket-types",
  title: "Valid Parentheses",
  difficulty: "easy",
  category: "stack",
  order: 1073,
  description: `Given a string \`s\` containing only the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\`, and \`']'\`, determine if the input string is **valid**.

A string is valid if:
1. Every open bracket is closed by the **same type** of bracket.
2. Open brackets are closed in the correct **LIFO** order.
3. Every closing bracket has a corresponding open bracket.

\`\`\`text
Example 1:
Input:  s = "()"
Output: true

Example 2:
Input:  s = "()[]{}"
Output: true

Example 3:
Input:  s = "(]"
Output: false
Explanation: '(' must be closed by ')' not ']'.

Example 4:
Input:  s = "([)]"
Output: false
Explanation: '[' is still open when ')' tries to close '('.
\`\`\`

**Constraints:**
- \`0 <= s.length <= 10^4\`
- \`s\` consists only of \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\`, \`']\`'`,
  hints: [
    `Which data structure naturally enforces LIFO order — the most recently opened bracket must be closed first?`,
    `When you encounter a closing bracket, the top of your stack must hold the matching opener. What do you do if the stack is empty or mismatches?`,
    `After scanning the entire string, what does a non-empty stack mean?`,
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
        "()"
      ],
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        "()[]{}"
      ],
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        "(]"
      ],
      "expected": false,
      "hidden": false
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
        ""
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        "["
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        "]"
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        "((("
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        "{[()]}"
      ],
      "expected": true,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def is_valid(s: str) -> bool:
    # TODO: implement
    return False
`,
    javascript: `function isValid(s) {
    // TODO: implement
    return false;
}
`,
    typescript: `function isValid(s: string): boolean {
    // TODO: implement
    return false;
}`,
    java: `class Solution {
    public boolean isValid(String s) {
        // TODO: implement
        return false;
    }
}
`,
    csharp: `public class Solution {
    public bool IsValid(string s) {
        // TODO: implement
        return false;
    }
}`,
    c: `#include <stdbool.h>
#include <string.h>
#include <stdlib.h>

bool isValid(char* s) {
    // TODO: implement
    return false;
}
`,
    cpp: `class Solution {
public:
    bool isValid(string s) {
        // TODO: implement
        return false;
    }
};`,
  },
  solutions: {
    python: `def is_valid(s: str) -> bool:
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for ch in s:
        if ch in mapping:
            top = stack.pop() if stack else '#'
            if mapping[ch] != top:
                return False
        else:
            stack.append(ch)
    return not stack
`,
    javascript: `function isValid(s) {
    const stack = [];
    const mapping = { ')': '(', '}': '{', ']': '[' };
    for (const ch of s) {
        if (ch in mapping) {
            const top = stack.length > 0 ? stack.pop() : '#';
            if (mapping[ch] !== top) return false;
        } else {
            stack.push(ch);
        }
    }
    return stack.length === 0;
}
`,
    typescript: `function isValid(s: string): boolean {
    const stack: string[] = [];
    const mapping: { [key: string]: string } = { ')': '(', '}': '{', ']': '[' };
    for (const ch of s) {
        if (ch in mapping) {
            const top = stack.length > 0 ? stack.pop() : '#';
            if (mapping[ch] !== top) return false;
        } else {
            stack.push(ch);
        }
    }
    return stack.length === 0;
}`,
    java: `class Solution {
    public boolean isValid(String s) {
        char[] stack = new char[s.length() + 1];
        int top = 0;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '(' || c == '[' || c == '{') {
                stack[top++] = c;
            } else {
                if (top == 0) return false;
                char t = stack[--top];
                if ((c == ')' && t != '(') ||
                    (c == ']' && t != '[') ||
                    (c == '}' && t != '{')) {
                    return false;
                }
            }
        }
        return top == 0;
    }
}
`,
    csharp: `public class Solution {
    public bool IsValid(string s) {
        char[] stack = new char[s.Length + 1];
        int top = 0;
        for (int i = 0; i < s.Length; i++) {
            char c = s[i];
            if (c == '(' || c == '[' || c == '{') {
                stack[top++] = c;
            } else {
                if (top == 0) return false;
                char t = stack[--top];
                if ((c == ')' && t != '(') ||
                    (c == ']' && t != '[') ||
                    (c == '}' && t != '{')) {
                    return false;
                }
            }
        }
        return top == 0;
    }
}`,
    c: `#include <stdbool.h>
#include <string.h>
#include <stdlib.h>

bool isValid(char* s) {
    int n = (int)strlen(s);
    char* stack = (char*)malloc((n + 1) * sizeof(char));
    int top = 0;
    bool result = true;
    for (int i = 0; i < n; i++) {
        char c = s[i];
        if (c == '(' || c == '[' || c == '{') {
            stack[top++] = c;
        } else {
            if (top == 0) { result = false; break; }
            char t = stack[--top];
            if ((c == ')' && t != '(') ||
                (c == ']' && t != '[') ||
                (c == '}' && t != '{')) {
                result = false;
                break;
            }
        }
    }
    if (top != 0) result = false;
    free(stack);
    return result;
}
`,
    cpp: `class Solution {
public:
    bool isValid(string s) {
        vector<char> stack;
        for (char c : s) {
            if (c == '(' || c == '[' || c == '{') {
                stack.push_back(c);
            } else {
                if (stack.empty()) return false;
                char t = stack.back();
                stack.pop_back();
                if ((c == ')' && t != '(') ||
                    (c == ']' && t != '[') ||
                    (c == '}' && t != '{')) {
                    return false;
                }
            }
        }
        return stack.empty();
    }
};`,
  },
  editorial: `## Approach: Stack

Brackets must be closed in **LIFO** order, so a stack is the natural fit: the most recently opened bracket is always the next one that must be closed.

### Algorithm

1. Initialize an empty stack.
2. For each character \`c\` in \`s\`:
   - **Opening** bracket (\`(\`, \`[\`, \`{\`) → push onto the stack.
   - **Closing** bracket (\`)\`, \`]\`, \`}\`):
     - If the stack is empty, there is no matching opener → return \`false\`.
     - Pop the top. If it does not match \`c\`'s expected opener, return \`false\`.
3. Return \`true\` only if the stack is **empty** (every opener was matched).

### Why each edge case is handled

| Case | Detection |
|---|---|
| Extra closer \`]\` | Stack is empty when we try to pop |
| Mismatched types \`(]\` | Popped opener doesn't equal expected opener |
| Interleaved \`([)]\` | Popped opener is \`[\`, not \`(\` when \`)\` is seen |
| Extra opener \`(((\` | Stack is non-empty after the loop |
| Empty string \`""\` | Loop never runs; empty stack → \`true\` |

### Complexity

- **Time:** O(n) — each character is pushed and popped at most once.
- **Space:** O(n) — worst case the stack holds all characters (e.g., \`((((\`).`,
};

export default problem;
