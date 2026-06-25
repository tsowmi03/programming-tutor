import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "check-whether-two-strings-are-equal-after-backspace-edits",
  title: "Backspace String Compare",
  difficulty: "easy",
  category: "stack",
  order: 2992,
  description: `Given two strings \`s\` and \`t\`, return \`true\` if they are equal when both are typed into empty text editors. The character \`'#'\` represents a backspace. If a backspace is applied to an empty text editor, it has no effect.

\`\`\`text
Example 1:
Input: s = "ab#c", t = "ad#c"
Output: true
Explanation:
s becomes "ac", t becomes "ac"
\`\`\`

\`\`\`text
Example 2:
Input: s = "ab##", t = "c#d#"
Output: true
Explanation:
s becomes "", t becomes ""
\`\`\`

\`\`\`text
Example 3:
Input: s = "a#c", t = "b"
Output: false
Explanation:
s becomes "c", t becomes "b"
\`\`\`

**Constraints:**
- \`1 <= s.length, t.length <= 200\`
- \`s\` and \`t\` only contain lowercase letters and \`'#'\` characters.`,
  hints: [
    `Think about how a backspace key works: it removes the most recently typed character. What data structure naturally supports 'remove the last element'?`,
    `Use a stack (or just build a string character by character). For each character: if it is '#', pop the top if the stack is non-empty; otherwise push the character. Compare the final stacks of both strings.`,
  ],
  guidance: [
    {
      "title": "Identify the Right Data Structure",
      "body": "A backspace removes the **last typed** character. A stack (last-in, first-out) mirrors this behavior perfectly — push characters, pop on '#'.",
      "level": "nudge"
    },
    {
      "title": "Processing Each String",
      "body": "Write a helper that takes a string and returns the 'final' string after applying all backspaces:\n- Iterate character by character.\n- If the character is `'#'` and the stack is non-empty, pop.\n- Otherwise, push the character.\n- Return the stack contents as a string.",
      "level": "strategy"
    },
    {
      "title": "Watch the Empty Stack Edge Case",
      "body": "If `'#'` appears when the stack is already empty, simply ignore it — a backspace on an empty editor does nothing. Make sure your pop is guarded by a non-empty check.",
      "level": "pitfall"
    },
    {
      "title": "Implementation Shape",
      "body": "```\nfunction process(str):\n    stack = []\n    for ch in str:\n        if ch == '#':\n            if stack is not empty:\n                stack.pop()\n        else:\n            stack.push(ch)\n    return join(stack)\n\nreturn process(s) == process(t)\n```",
      "level": "pseudocode"
    }
  ],

  signature: {
    "name": "backspaceCompare",
    "params": [
      {
        "name": "s",
        "type": "string"
      },
      {
        "name": "t",
        "type": "string"
      }
    ],
    "returns": "bool",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        "ab#c",
        "ad#c"
      ],
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        "ab##",
        "c#d#"
      ],
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        "a#c",
        "b"
      ],
      "expected": false,
      "hidden": false
    },
    {
      "input": [
        "a##b",
        "b"
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        "a##c",
        "a#c"
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        "a",
        "a"
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        "abc",
        "abc#d#"
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        "bxj##tw",
        "bxj###tw"
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        "nzp#o#g",
        "b#nzp#o#g"
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        "x#y#z#",
        "a#b#c#"
      ],
      "expected": true,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def backspace_compare(s: str, t: str) -> bool:
    # TODO: implement
    pass
`,
    javascript: `function backspaceCompare(s, t) {
    // TODO: implement
}
`,
    typescript: `function backspaceCompare(s: string, t: string): boolean {
    // TODO: implement
    return false;
}
`,
    java: `class Solution {
    public boolean backspaceCompare(String s, String t) {
        // TODO: implement
        return false;
    }
}
`,
    csharp: `public class Solution {
    public bool BackspaceCompare(string s, string t) {
        // TODO: implement
        return false;
    }
}
`,
    c: `#include <stdlib.h>
#include <string.h>
int backspaceCompare(char* s, char* t) {
    // TODO: implement
    return 0;
}
`,
    cpp: `class Solution {
public:
    bool backspaceCompare(string s, string t) {
        // TODO: implement
        return false;
    }
};
`,
  },
  solutions: {
    python: `def backspace_compare(s: str, t: str) -> bool:
    def process(string):
        stack = []
        for ch in string:
            if ch == '#':
                if stack:
                    stack.pop()
            else:
                stack.append(ch)
        return stack
    return process(s) == process(t)
`,
    javascript: `function backspaceCompare(s, t) {
    function process(str) {
        const stack = [];
        for (const ch of str) {
            if (ch === '#') {
                if (stack.length > 0) stack.pop();
            } else {
                stack.push(ch);
            }
        }
        return stack.join('');
    }
    return process(s) === process(t);
}
`,
    typescript: `function backspaceCompare(s: string, t: string): boolean {
    function process(str: string): string {
        const stack: string[] = [];
        for (const ch of str) {
            if (ch === '#') {
                if (stack.length > 0) stack.pop();
            } else {
                stack.push(ch);
            }
        }
        return stack.join('');
    }
    return process(s) === process(t);
}
`,
    java: `class Solution {
    public boolean backspaceCompare(String s, String t) {
        return process(s).equals(process(t));
    }
    private String process(String str) {
        StringBuilder sb = new StringBuilder();
        for (char ch : str.toCharArray()) {
            if (ch == '#') {
                if (sb.length() > 0) sb.deleteCharAt(sb.length() - 1);
            } else {
                sb.append(ch);
            }
        }
        return sb.toString();
    }
}
`,
    csharp: `public class Solution {
    public bool BackspaceCompare(string s, string t) {
        return Process(s) == Process(t);
    }
    private string Process(string str) {
        var sb = new System.Text.StringBuilder();
        foreach (char ch in str) {
            if (ch == '#') {
                if (sb.Length > 0) sb.Remove(sb.Length - 1, 1);
            } else {
                sb.Append(ch);
            }
        }
        return sb.ToString();
    }
}
`,
    c: `#include <stdlib.h>
#include <string.h>
static void processStr(const char* src, char* dst, int* len) {
    *len = 0;
    for (int i = 0; src[i] != '\\0'; i++) {
        if (src[i] == '#') {
            if (*len > 0) (*len)--;
        } else {
            dst[(*len)++] = src[i];
        }
    }
    dst[*len] = '\\0';
}
int backspaceCompare(char* s, char* t) {
    char bufS[201], bufT[201];
    int lenS, lenT;
    processStr(s, bufS, &lenS);
    processStr(t, bufT, &lenT);
    if (lenS != lenT) return 0;
    return strcmp(bufS, bufT) == 0 ? 1 : 0;
}
`,
    cpp: `class Solution {
public:
    bool backspaceCompare(string s, string t) {
        return process(s) == process(t);
    }
private:
    string process(const string& str) {
        string stack;
        for (char ch : str) {
            if (ch == '#') {
                if (!stack.empty()) stack.pop_back();
            } else {
                stack.push_back(ch);
            }
        }
        return stack;
    }
};
`,
  },
  editorial: `## Approach: Stack Simulation

### Intuition
A backspace key removes the **most recently typed** character, which is exactly the behavior of a stack (last-in, first-out). We simulate typing by pushing characters onto a stack, and popping on \`'#'\`.

### Algorithm
1. Write a helper \`process(str)\` that iterates over each character:
   - If the character is \`'#'\` and the stack is non-empty, pop the top.
   - Otherwise, push the character.
2. Return the final string formed by the stack.
3. Compare \`process(s) == process(t)\`.

### Example Walkthrough
\`\`\`
s = "ab#c"
Process: push 'a' → [a], push 'b' → [a,b], '#' → pop → [a], push 'c' → [a,c]
Result: "ac"

t = "ad#c"
Process: push 'a' → [a], push 'd' → [a,d], '#' → pop → [a], push 'c' → [a,c]
Result: "ac"

"ac" == "ac" → true
\`\`\`

### Complexity
- **Time:** O(n + m) where n = len(s), m = len(t) — each character is pushed/popped at most once.
- **Space:** O(n + m) for the two stacks.

### Edge Cases
- Backspace on an empty editor: guarded by checking stack non-emptiness before popping.
- Multiple consecutive \`'#'\`: handled naturally by the loop.
- Strings that reduce to the empty string: both stacks will be empty and equal.`,
};

export default problem;
