import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "compute-the-score-of-a-balanced-parentheses-string",
  title: "Score of Parentheses",
  difficulty: "medium",
  category: "stack",
  order: 1021,
  description: `Given a **balanced** parentheses string \`s\`, compute its **score** using the following rules:

- \`()\` has a score of **1**.
- \`AB\` has a score of \`score(A) + score(B)\`, where \`A\` and \`B\` are balanced parentheses strings placed side by side.
- \`(A)\` has a score of \`2 * score(A)\`, where \`A\` is a balanced parentheses string.

Return the score of the string \`s\`.

\`\`\`text
Example 1:
Input:  s = "()"
Output: 1
Explanation: Base case — () = 1.
\`\`\`

\`\`\`text
Example 2:
Input:  s = "(())"
Output: 2
Explanation: (()) = 2 * score(()) = 2 * 1 = 2.
\`\`\`

\`\`\`text
Example 3:
Input:  s = "(()(()))"
Output: 6
Explanation:
  Inner part: () + (()) = 1 + 2 = 3
  Outer wrapping: 2 * 3 = 6
\`\`\`

**Constraints:**
- \`2 <= s.length <= 50\`
- \`s\` consists of \`'('\` and \`')'\` only.
- \`s\` is guaranteed to be a balanced parentheses string.
- The score of \`s\` fits in a 32-bit signed integer.`,
  hints: [
    `Think about what happens when you push a 0 onto the stack every time you see '(' — it acts as a marker for a new level.`,
    `When you see ')', pop from the stack. If the top was 0, you found a base '()' worth 1. Otherwise the popped value v represents a nested group worth 2*v. Then add the result back to the new top of the stack.`,
  ],
  guidance: [
    {
      "title": "Model nesting depth with a stack",
      "body": "Each `(` opens a new 'frame'. A stack lets you track the running score at each nesting level independently.",
      "level": "nudge"
    },
    {
      "title": "Use 0 as a sentinel for an open frame",
      "body": "Push `0` onto the stack when you encounter `(`. This zero will accumulate the score of everything inside the matching `)`. When you close with `)`, the value at the top is what's inside.",
      "level": "strategy"
    },
    {
      "title": "Closing parenthesis logic",
      "body": "On `)`: pop the top value `v`.\n- If `v == 0`, the pair `()` is a base case → contribute **1**.\n- Otherwise the pair wraps a non-empty interior → contribute **2 * v**.\n\nAdd the contribution to the **new** top of the stack (the enclosing frame).",
      "level": "strategy"
    },
    {
      "title": "Pitfall: remembering to add to the parent frame",
      "body": "After computing the contribution for a closed group, don't forget to add it to `stack[-1]` (the frame opened by the enclosing `(`). If the stack is now empty after popping, that contribution is the final answer.",
      "level": "pitfall"
    },
    {
      "title": "Algorithm shape",
      "body": "```\nstack = [0]          // start with a base frame\nfor ch in s:\n    if ch == '(':\n        stack.push(0)\n    else:            // ch == ')'\n        v = stack.pop()\n        contribution = max(2 * v, 1)   // 1 if v==0, else 2*v\n        stack.top() += contribution\nreturn stack[0]\n```",
      "level": "pseudocode"
    }
  ],

  signature: {
    "name": "scoreOfParentheses",
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
        "()"
      ],
      "expected": 1,
      "hidden": false
    },
    {
      "input": [
        "(())"
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        "()()"
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        "(()(()))"
      ],
      "expected": 6,
      "hidden": true
    },
    {
      "input": [
        "((()))"
      ],
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        "(())(())"
      ],
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        "((()()))"
      ],
      "expected": 8,
      "hidden": true
    },
    {
      "input": [
        "()((()))()"
      ],
      "expected": 6,
      "hidden": true
    },
    {
      "input": [
        "((((())))())"
      ],
      "expected": 18,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def score_of_parentheses(s: str) -> int:
    # TODO: implement using a stack
    return 0
`,
    javascript: `/**
 * @param {string} s
 * @return {number}
 */
function scoreOfParentheses(s) {
    // TODO: implement using a stack
    return 0;
}
`,
    typescript: `function scoreOfParentheses(s: string): number {
    // TODO: implement using a stack
    return 0;
}
`,
    java: `class Solution {
    public int scoreOfParentheses(String s) {
        // TODO: implement using a stack
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int ScoreOfParentheses(string s) {
        // TODO: implement using a stack
        return 0;
    }
}
`,
    c: `int scoreOfParentheses(char* s) {
    // TODO: implement using a stack
    return 0;
}
`,
    cpp: `class Solution {
public:
    int scoreOfParentheses(string s) {
        // TODO: implement using a stack
        return 0;
    }
};
`,
  },
  solutions: {
    python: `def score_of_parentheses(s: str) -> int:
    stack = [0]
    for ch in s:
        if ch == '(':
            stack.append(0)
        else:
            v = stack.pop()
            stack[-1] += max(2 * v, 1)
    return stack[0]
`,
    javascript: `/**
 * @param {string} s
 * @return {number}
 */
function scoreOfParentheses(s) {
    const stack = [0];
    for (const ch of s) {
        if (ch === '(') {
            stack.push(0);
        } else {
            const v = stack.pop();
            stack[stack.length - 1] += v === 0 ? 1 : 2 * v;
        }
    }
    return stack[0];
}
`,
    typescript: `function scoreOfParentheses(s: string): number {
    const stack: number[] = [0];
    for (const ch of s) {
        if (ch === '(') {
            stack.push(0);
        } else {
            const v = stack.pop()!;
            stack[stack.length - 1] += v === 0 ? 1 : 2 * v;
        }
    }
    return stack[0];
}
`,
    java: `class Solution {
    public int scoreOfParentheses(String s) {
        java.util.Deque<Integer> stack = new java.util.ArrayDeque<>();
        stack.push(0);
        for (char ch : s.toCharArray()) {
            if (ch == '(') {
                stack.push(0);
            } else {
                int v = stack.pop();
                int top = stack.pop();
                stack.push(top + (v == 0 ? 1 : 2 * v));
            }
        }
        return stack.pop();
    }
}
`,
    csharp: `public class Solution {
    public int ScoreOfParentheses(string s) {
        var stack = new System.Collections.Generic.Stack<int>();
        stack.Push(0);
        foreach (char ch in s) {
            if (ch == '(') {
                stack.Push(0);
            } else {
                int v = stack.Pop();
                int top = stack.Pop();
                stack.Push(top + (v == 0 ? 1 : 2 * v));
            }
        }
        return stack.Pop();
    }
}
`,
    c: `int scoreOfParentheses(char* s) {
    int stack[64];
    int top = 0;
    stack[top++] = 0;
    for (int i = 0; s[i] != '\\0'; i++) {
        if (s[i] == '(') {
            stack[top++] = 0;
        } else {
            int v = stack[--top];
            int contrib = (v == 0) ? 1 : 2 * v;
            stack[top - 1] += contrib;
        }
    }
    return stack[0];
}
`,
    cpp: `class Solution {
public:
    int scoreOfParentheses(string s) {
        vector<int> stack = {0};
        for (char ch : s) {
            if (ch == '(') {
                stack.push_back(0);
            } else {
                int v = stack.back();
                stack.pop_back();
                stack.back() += (v == 0 ? 1 : 2 * v);
            }
        }
        return stack[0];
    }
};
`,
  },
  editorial: `## Approach: Stack-based Score Accumulation

### Intuition

We treat the stack as a collection of **frames**, one per open \`(\`. Each frame accumulates the total score of everything inside its matching \`)\`.

### Algorithm

1. Initialize \`stack = [0]\`. The single \`0\` is the base frame that will hold the final answer.
2. For each character in \`s\`:
   - \`'('\` → push \`0\` (open a new frame).
   - \`')'\` → pop the top value \`v\` (score inside the just-closed pair).
     - If \`v == 0\`, we found a literal \`()\` → contribute **1**.
     - Otherwise, we wrapped a non-empty interior → contribute **2 * v**.
     - Add the contribution to the **new top** of the stack (the enclosing frame).
3. Return \`stack[0]\`.

### Worked Example — \`"(()(()))"\` → 6

\`\`\`
char  stack (right = top)
(     [0, 0]
(     [0, 0, 0]
)     v=0  → contrib=1  [0, 1]
(     [0, 1, 0]
(     [0, 1, 0, 0]
)     v=0  → contrib=1  [0, 1, 1]
)     v=1  → contrib=2  [0, 3]
)     v=3  → contrib=6  [6]
result = 6 ✓
\`\`\`

### Test Case Verification

- \`()\` → 1 ✓
- \`(())\` → 2 ✓
- \`()()\` → 1+1 = 2 ✓
- \`(()(()))\` → 2*(1+2) = 6 ✓
- \`((()))\` → 2*2*1 = 4 ✓
- \`(())(())\` → 2+2 = 4 ✓
- \`((()()))\` → 2*(1+1)*2 = 8... let's trace: inner \`()()\` = 2, wrapped = 2*2=4, outer = 2*4=8 ✓
- \`()((()))()\` → 1+4+1 = 6 ✓
- \`((((())))())\` → outer wraps \`(((())))\` + \`()\` = 8+1=9, result = 2*9=18 ✓

### Complexity

- **Time:** O(n) — one pass through the string.
- **Space:** O(n) — the stack depth is at most n/2 (maximum nesting).`,
};

export default problem;
