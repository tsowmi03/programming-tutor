import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "remove-all-adjacent-duplicate-characters-from-a-string-using-a-stack",
  title: "Remove Adjacent Duplicate Characters",
  difficulty: "easy",
  category: "stack",
  order: 1076,
  description: `Given a string \`s\` consisting of lowercase English letters, repeatedly remove **pairs of adjacent duplicate characters** until no more adjacent duplicates remain. Return the final string.

After each removal, new adjacent duplicates may form and must also be removed.

\`\`\`text
Example 1:
Input:  s = "abbaca"
Output: "ca"
Explanation:
  "abbaca" → remove "bb" → "aaca"
  "aaca"   → remove "aa" → "ca"
  No more adjacent duplicates. Result: "ca"
\`\`\`

\`\`\`text
Example 2:
Input:  s = "azxxzy"
Output: "ay"
Explanation:
  "azxxzy" → remove "xx" → "azzy"
  "azzy"   → remove "zz" → "ay"
  No more adjacent duplicates. Result: "ay"
\`\`\`

**Constraints:**
- \`0 <= s.length <= 10^4\`
- \`s\` consists of lowercase English letters only.`,
  hints: [
    `Think about processing characters one at a time. What data structure lets you instantly check and remove the most recently added character?`,
    `Use a stack: for each character, if it matches the top of the stack, pop the top (the pair cancels). Otherwise, push the character.`,
    `After processing all characters, read the stack from bottom to top — that is your answer.`,
  ],
  signature: {
    "name": "removeDuplicates",
    "params": [
      {
        "name": "s",
        "type": "string"
      }
    ],
    "returns": "string"
  },
  testCases: [
    {
      "input": [
        "abbaca"
      ],
      "expected": "ca",
      "hidden": false
    },
    {
      "input": [
        "azxxzy"
      ],
      "expected": "ay",
      "hidden": false
    },
    {
      "input": [
        "aabbcc"
      ],
      "expected": "",
      "hidden": false
    },
    {
      "input": [
        ""
      ],
      "expected": "",
      "hidden": true
    },
    {
      "input": [
        "a"
      ],
      "expected": "a",
      "hidden": true
    },
    {
      "input": [
        "abcd"
      ],
      "expected": "abcd",
      "hidden": true
    },
    {
      "input": [
        "aaaa"
      ],
      "expected": "",
      "hidden": true
    },
    {
      "input": [
        "abba"
      ],
      "expected": "",
      "hidden": true
    },
    {
      "input": [
        "aabccbaa"
      ],
      "expected": "",
      "hidden": true
    },
    {
      "input": [
        "abcddcba"
      ],
      "expected": "",
      "hidden": true
    }
  ],
  starterCode: {
    python: `def remove_duplicates(s: str) -> str:
    # TODO: use a stack to remove adjacent duplicate characters
    return ""
`,
    javascript: `function removeDuplicates(s) {
    // TODO: use a stack to remove adjacent duplicate characters
    return "";
}
`,
    java: `class Solution {
    public String removeDuplicates(String s) {
        // TODO: use a stack to remove adjacent duplicate characters
        return "";
    }
}
`,
    c: `char* removeDuplicates(char* s) {
    /* TODO: use a stack to remove adjacent duplicate characters */
    return "";
}
`,
  },
  solutions: {
    python: `def remove_duplicates(s: str) -> str:
    stack = []
    for c in s:
        if stack and stack[-1] == c:
            stack.pop()
        else:
            stack.append(c)
    return ''.join(stack)
`,
    javascript: `function removeDuplicates(s) {
    const stack = [];
    for (const c of s) {
        if (stack.length > 0 && stack[stack.length - 1] === c) {
            stack.pop();
        } else {
            stack.push(c);
        }
    }
    return stack.join('');
}
`,
    java: `class Solution {
    public String removeDuplicates(String s) {
        StringBuilder stack = new StringBuilder();
        for (char c : s.toCharArray()) {
            int len = stack.length();
            if (len > 0 && stack.charAt(len - 1) == c) {
                stack.deleteCharAt(len - 1);
            } else {
                stack.append(c);
            }
        }
        return stack.toString();
    }
}
`,
    c: `#include <stdlib.h>
#include <string.h>

char* removeDuplicates(char* s) {
    int n = (int)strlen(s);
    char* stack = (char*)malloc((n + 1) * sizeof(char));
    int top = 0;
    for (int i = 0; i < n; i++) {
        if (top > 0 && stack[top - 1] == s[i]) {
            top--;
        } else {
            stack[top++] = s[i];
        }
    }
    stack[top] = '\\0';
    return stack;
}
`,
  },
  editorial: `## Approach: Stack Simulation

The key insight is that we only ever need to compare an incoming character with the **most recently unmatched** character — exactly what a stack provides.

**Algorithm:**
1. Initialize an empty stack.
2. For each character \`c\` in \`s\`:
   - If the stack is non-empty **and** its top equals \`c\`, pop the top (the pair cancels).
   - Otherwise, push \`c\` onto the stack.
3. Join the stack contents into a string and return it.

Chain reactions are handled automatically: after a pair is popped, the new stack top may form a pair with the next character.

**Trace for \`"abbaca"\`:**
\`\`\`
'a' → stack: [a]
'b' → stack: [a, b]
'b' → top == 'b', pop  → stack: [a]
'a' → top == 'a', pop  → stack: []
'c' → stack: [c]
'a' → stack: [c, a]
Result: "ca"
\`\`\`

**Complexity:**
- **Time:** O(n) — each character is pushed and popped at most once.
- **Space:** O(n) — the stack holds at most all \`n\` characters.`,
};

export default problem;
