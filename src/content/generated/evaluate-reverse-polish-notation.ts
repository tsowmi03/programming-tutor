import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "evaluate-reverse-polish-notation",
  title: "Evaluate Reverse Polish Notation",
  difficulty: "medium",
  category: "stack",
  order: 1077,
  description: `Given an array of strings \`tokens\` representing an arithmetic expression in **Reverse Polish Notation** (postfix notation), evaluate the expression and return its integer result.

Valid operators are \`"+"\`, \`"-"\`, \`"*"\`, and \`"/"\`. Each operand is either an integer string or the result of a valid sub-expression. **Division truncates toward zero** (e.g., \`7 / -2 = -3\`, not \`-4\`).

The expression is guaranteed to be valid and will never cause division by zero.

\`\`\`text
Example 1:
Input:  tokens = ["2","1","+","3","*"]
Output: 9
Explanation: ((2 + 1) * 3) = 9
\`\`\`

\`\`\`text
Example 2:
Input:  tokens = ["4","13","5","/","+"]
Output: 6
Explanation: (4 + (13 / 5)) = (4 + 2) = 6
\`\`\`

\`\`\`text
Example 3:
Input:  tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
Output: 22
Explanation:
  (9+3)*-11 = -132
  6 / -132 = 0  (truncation)
  10 * 0 = 0
  0 + 17 + 5 = 22
\`\`\`

**Constraints:**
- \`1 <= tokens.length <= 10^4\`
- Each token is either an operator (\`"+"\`, \`"-"\`, \`"*"\`, \`"/"\`) or an integer in \`[-200, 200]\`.
- The expression is a valid RPN expression.`,
  hints: [
    `Think about which data structure lets you store operands temporarily and always retrieve the most recently pushed one first.`,
    `When you encounter an operator, pop two values. Which value is the left operand and which is the right? (Order matters for subtraction and division.)`,
    `For division, remember that truncation toward zero differs from floor division when the result is negative. In Python, use int(a / b) rather than a // b.`,
  ],
  signature: {
    "name": "evalRPN",
    "params": [
      {
        "name": "tokens",
        "type": "string[]"
      }
    ],
    "returns": "int"
  },
  testCases: [
    {
      "input": [
        [
          "2",
          "1",
          "+",
          "3",
          "*"
        ]
      ],
      "expected": 9,
      "hidden": false
    },
    {
      "input": [
        [
          "4",
          "13",
          "5",
          "/",
          "+"
        ]
      ],
      "expected": 6,
      "hidden": false
    },
    {
      "input": [
        [
          "10",
          "6",
          "9",
          "3",
          "+",
          "-11",
          "*",
          "/",
          "*",
          "17",
          "+",
          "5",
          "+"
        ]
      ],
      "expected": 22,
      "hidden": false
    },
    {
      "input": [
        [
          "3",
          "4",
          "+"
        ]
      ],
      "expected": 7,
      "hidden": true
    },
    {
      "input": [
        [
          "5",
          "1",
          "2",
          "+",
          "4",
          "*",
          "+",
          "3",
          "-"
        ]
      ],
      "expected": 14,
      "hidden": true
    },
    {
      "input": [
        [
          "2",
          "3",
          "-"
        ]
      ],
      "expected": -1,
      "hidden": true
    },
    {
      "input": [
        [
          "6",
          "2",
          "/"
        ]
      ],
      "expected": 3,
      "hidden": true
    },
    {
      "input": [
        [
          "-7",
          "3",
          "+"
        ]
      ],
      "expected": -4,
      "hidden": true
    },
    {
      "input": [
        [
          "18",
          "3",
          "6",
          "*",
          "/"
        ]
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          "1"
        ]
      ],
      "expected": 1,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def eval_rpn(tokens):
    # TODO: evaluate the Reverse Polish Notation expression
    return 0
`,
    javascript: `function evalRPN(tokens) {
    // TODO: evaluate the Reverse Polish Notation expression
    return 0;
}
`,
    java: `class Solution {
    public int evalRPN(String[] tokens) {
        // TODO: evaluate the Reverse Polish Notation expression
        return 0;
    }
}
`,
    c: `#include <stdlib.h>

int evalRPN(char** tokens, int tokensSize) {
    // TODO: evaluate the Reverse Polish Notation expression
    return 0;
}
`,
  },
  solutions: {
    python: `def eval_rpn(tokens):
    stack = []
    for token in tokens:
        if token in ('+', '-', '*', '/'):
            b = stack.pop()
            a = stack.pop()
            if token == '+':
                stack.append(a + b)
            elif token == '-':
                stack.append(a - b)
            elif token == '*':
                stack.append(a * b)
            else:
                stack.append(int(a / b))  # truncate toward zero
        else:
            stack.append(int(token))
    return stack[0]
`,
    javascript: `function evalRPN(tokens) {
    const stack = [];
    for (const token of tokens) {
        if (token === '+' || token === '-' || token === '*' || token === '/') {
            const b = stack.pop();
            const a = stack.pop();
            if (token === '+') stack.push(a + b);
            else if (token === '-') stack.push(a - b);
            else if (token === '*') stack.push(a * b);
            else stack.push(Math.trunc(a / b));
        } else {
            stack.push(parseInt(token, 10));
        }
    }
    return stack[0];
}
`,
    java: `class Solution {
    public int evalRPN(String[] tokens) {
        int[] stack = new int[tokens.length];
        int top = 0;
        for (String token : tokens) {
            if (token.equals("+") || token.equals("-") || token.equals("*") || token.equals("/")) {
                int b = stack[--top];
                int a = stack[--top];
                if (token.equals("+"))      stack[top++] = a + b;
                else if (token.equals("-")) stack[top++] = a - b;
                else if (token.equals("*")) stack[top++] = a * b;
                else                        stack[top++] = a / b;
            } else {
                stack[top++] = Integer.parseInt(token);
            }
        }
        return stack[0];
    }
}
`,
    c: `#include <stdlib.h>
#include <string.h>

int evalRPN(char** tokens, int tokensSize) {
    int* stack = (int*)malloc(tokensSize * sizeof(int));
    int top = 0;
    for (int i = 0; i < tokensSize; i++) {
        char* t = tokens[i];
        /* single-character operator: +, -, *, / */
        if (strlen(t) == 1 && (t[0] == '+' || t[0] == '-' || t[0] == '*' || t[0] == '/')) {
            int b = stack[--top];
            int a = stack[--top];
            if (t[0] == '+')      stack[top++] = a + b;
            else if (t[0] == '-') stack[top++] = a - b;
            else if (t[0] == '*') stack[top++] = a * b;
            else                  stack[top++] = a / b;
        } else {
            stack[top++] = atoi(t);
        }
    }
    int result = stack[0];
    free(stack);
    return result;
}
`,
  },
  editorial: `## Approach: Stack-Based Evaluation

Reverse Polish Notation is perfectly suited for a stack: operands are pushed when seen, and an operator immediately consumes the two most recent operands.

### Algorithm

1. Initialize an empty stack.
2. For each token:
   - **Number token**: parse it to an integer and push it.
   - **Operator token**: pop \`b\` (right operand), then pop \`a\` (left operand), compute \`a OP b\`, and push the result.
3. After all tokens are processed, the stack holds exactly one value — return it.

### Truncation Toward Zero

Division must truncate toward zero, which differs from floor division for negative results:
- \`7 / -2 = -3\` (truncate), NOT \`-4\` (floor)
- In **Python** use \`int(a / b)\` rather than \`a // b\`.
- In **C** and **Java**, integer division already truncates toward zero natively.
- In **JavaScript**, use \`Math.trunc(a / b)\`.

### Distinguishing \`-\` the Operator from Negative Numbers in C

A token like \`"-11"\` has length > 1. The check \`strlen(t) == 1\` correctly identifies only the single-character operators; all other strings (including negative numbers) fall through to \`atoi\`.

### Complexity

- **Time:** O(n) — each of the n tokens is processed exactly once.
- **Space:** O(n) — the stack holds at most ⌈n/2⌉ operands in the worst case.`,
};

export default problem;
