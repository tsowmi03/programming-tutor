import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "remove-stars-from-a-string-using-a-stack",
  title: "Remove Stars From a String",
  difficulty: "easy",
  category: "stack",
  order: 1018,
  description: `You are given a string \`s\` that may contain lowercase English letters and \`'*'\` characters.

Process the string left to right using a stack:
- If the current character is a letter, push it onto the stack.
- If the current character is \`'*'\`, pop the top character from the stack (the input is guaranteed to always have a non-empty stack when a \`'*'\` is encountered).

Return the string formed by the characters remaining in the stack (from bottom to top).

\`\`\`text
Example 1:
Input:  s = "leet**cod*e"
Output: "lecoe"
Explanation:
  - Push 'l', 'e', 'e', 't' → stack: [l, e, e, t]
  - '*' → pop 't'            → stack: [l, e, e]
  - '*' → pop 'e'            → stack: [l, e]
  - Push 'c', 'o', 'd'      → stack: [l, e, c, o, d]
  - '*' → pop 'd'            → stack: [l, e, c, o]
  - Push 'e'                 → stack: [l, e, c, o, e]
  Result: "lecoe"
\`\`\`

\`\`\`text
Example 2:
Input:  s = "erase*"
Output: "eras"
Explanation:
  - Push 'e','r','a','s','e' → stack: [e, r, a, s, e]
  - '*' → pop 'e'            → stack: [e, r, a, s]
  Result: "eras"
\`\`\`

**Constraints:**
- \`1 <= s.length <= 100\`
- \`s\` consists of lowercase English letters and \`'*'\`.
- Every \`'*'\` is guaranteed to have a character to its left that has not yet been removed.`,
  hints: [
    `Use a list/array as a stack: push letters, pop on '*'.`,
    `After processing all characters, join the remaining stack contents to form the result string.`,
  ],
  guidance: [
    {
      "title": "Think about what data structure fits",
      "body": "You need to remove the most recently added character whenever you see a `'*'`. Which data structure gives you easy access to the last added element?",
      "level": "nudge"
    },
    {
      "title": "Stack simulation",
      "body": "Iterate through each character:\n- Letter → push onto stack.\n- `'*'` → pop from stack.\n\nAt the end, the stack contains exactly the surviving characters in order.",
      "level": "strategy"
    },
    {
      "title": "Watch out for off-by-one errors",
      "body": "The bottom of the stack is the leftmost character of the result, and the top is the rightmost. Make sure you read the stack from bottom to top (index 0 to top) when constructing the answer string.",
      "level": "pitfall"
    },
    {
      "title": "Implementation shape",
      "body": "```\nstack = []\nfor ch in s:\n    if ch != '*':\n        stack.push(ch)\n    else:\n        stack.pop()\nreturn join(stack)\n```",
      "level": "pseudocode"
    }
  ],

  signature: {
    "name": "removeStars",
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
        "leet**cod*e"
      ],
      "expected": "lecoe",
      "hidden": false
    },
    {
      "input": [
        "erase*"
      ],
      "expected": "eras",
      "hidden": false
    },
    {
      "input": [
        "abc"
      ],
      "expected": "abc",
      "hidden": false
    },
    {
      "input": [
        "a*"
      ],
      "expected": "",
      "hidden": true
    },
    {
      "input": [
        "ab*c*d"
      ],
      "expected": "ad",
      "hidden": true
    },
    {
      "input": [
        "z*z*z"
      ],
      "expected": "z",
      "hidden": true
    },
    {
      "input": [
        "aaa***"
      ],
      "expected": "",
      "hidden": true
    },
    {
      "input": [
        "hello*world"
      ],
      "expected": "hellworld",
      "hidden": true
    },
    {
      "input": [
        "x"
      ],
      "expected": "x",
      "hidden": true
    }
  ],
  starterCode: {
    python: `def remove_stars(s: str) -> str:
    # TODO: implement using a stack
    pass
`,
    javascript: `function removeStars(s) {
    // TODO: implement using a stack
}
`,
    typescript: `function removeStars(s: string): string {
    // TODO: implement using a stack
}
`,
    java: `class Solution {
    public String removeStars(String s) {
        // TODO: implement using a stack
        return "";
    }
}
`,
    csharp: `public class Solution {
    public string RemoveStars(string s) {
        // TODO: implement using a stack
        return "";
    }
}
`,
    c: `char* removeStars(char* s) {
    // TODO: implement using a stack
    return "";
}
`,
    cpp: `class Solution {
public:
    string removeStars(string s) {
        // TODO: implement using a stack
        return "";
    }
};
`,
  },
  solutions: {
    python: `def remove_stars(s: str) -> str:
    stack = []
    for ch in s:
        if ch != '*':
            stack.append(ch)
        else:
            stack.pop()
    return ''.join(stack)
`,
    javascript: `function removeStars(s) {
    const stack = [];
    for (const ch of s) {
        if (ch !== '*') {
            stack.push(ch);
        } else {
            stack.pop();
        }
    }
    return stack.join('');
}
`,
    typescript: `function removeStars(s: string): string {
    const stack: string[] = [];
    for (const ch of s) {
        if (ch !== '*') {
            stack.push(ch);
        } else {
            stack.pop();
        }
    }
    return stack.join('');
}
`,
    java: `class Solution {
    public String removeStars(String s) {
        StringBuilder stack = new StringBuilder();
        for (char ch : s.toCharArray()) {
            if (ch != '*') {
                stack.append(ch);
            } else {
                stack.deleteCharAt(stack.length() - 1);
            }
        }
        return stack.toString();
    }
}
`,
    csharp: `public class Solution {
    public string RemoveStars(string s) {
        var stack = new System.Text.StringBuilder();
        foreach (char ch in s) {
            if (ch != '*') {
                stack.Append(ch);
            } else {
                stack.Remove(stack.Length - 1, 1);
            }
        }
        return stack.ToString();
    }
}
`,
    c: `#include <stdlib.h>
#include <string.h>

char* removeStars(char* s) {
    int len = strlen(s);
    char* stack = (char*)malloc((len + 1) * sizeof(char));
    int top = 0;
    for (int i = 0; s[i] != '\\0'; i++) {
        if (s[i] != '*') {
            stack[top++] = s[i];
        } else {
            if (top > 0) top--;
        }
    }
    stack[top] = '\\0';
    return stack;
}
`,
    cpp: `class Solution {
public:
    string removeStars(string s) {
        string stack;
        for (char ch : s) {
            if (ch != '*') {
                stack.push_back(ch);
            } else {
                stack.pop_back();
            }
        }
        return stack;
    }
};
`,
  },
  editorial: `## Approach: Stack Simulation

### Intuition
The \`'*'\` character always removes the most recently added letter — that's exactly the LIFO (last-in, first-out) property of a stack.

### Algorithm
1. Initialize an empty stack (or a dynamic string acting as one).
2. Iterate through each character in \`s\`:
   - If it's a letter, **push** it onto the stack.
   - If it's \`'*'\`, **pop** the top element from the stack.
3. Join the remaining elements to form the result.

### Complexity
- **Time:** O(n) — each character is pushed and popped at most once.
- **Space:** O(n) — the stack holds at most all \`n\` characters.

### Example walkthrough (\`"leet**cod*e"\`)
\`\`\`
Char  Stack after
l     [l]
e     [l,e]
e     [l,e,e]
t     [l,e,e,t]
*     [l,e,e]      ← pop t
*     [l,e]        ← pop e
c     [l,e,c]
o     [l,e,c,o]
d     [l,e,c,o,d]
*     [l,e,c,o]    ← pop d
e     [l,e,c,o,e]
Result: "lecoe"
\`\`\`
`,
};

export default problem;
