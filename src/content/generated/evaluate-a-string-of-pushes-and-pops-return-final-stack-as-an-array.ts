import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "evaluate-a-string-of-pushes-and-pops-return-final-stack-as-an-array",
  title: "Evaluate Stack Operations",
  difficulty: "easy",
  category: "stack",
  order: 1074,
  description: `Given an array of strings \`ops\`, where each element is either:

- \`"push X"\` — push the integer \`X\` onto the stack.
- \`"pop"\` — remove the top element from the stack.

Simulate the operations in order and return the final contents of the stack as an integer array ordered **from bottom to top**.

You may assume the input is always valid: \`"pop"\` is never applied to an empty stack.

**Example 1:**
\`\`\`text
Input:  ops = ["push 1", "push 2", "push 3"]
Output: [1, 2, 3]
Explanation: Three pushes leave the stack [1, 2, 3] bottom-to-top.
\`\`\`

**Example 2:**
\`\`\`text
Input:  ops = ["push 5", "push 3", "pop", "push 7"]
Output: [5, 7]
Explanation:
  push 5 → stack: [5]
  push 3 → stack: [5, 3]
  pop    → stack: [5]
  push 7 → stack: [5, 7]
\`\`\`

**Constraints:**
- \`0 <= ops.length <= 1000\`
- Each pushed value \`X\` satisfies \`-1000 <= X <= 1000\`
- A \`"pop"\` operation is never applied to an empty stack.`,
  hints: [
    `For each operation, check whether it starts with 'push' or equals 'pop'. A plain list or array works perfectly as the stack.`,
    `To extract the integer from a push operation, split on the space character and parse the second token. In C you can skip the 5-byte prefix "push " with pointer arithmetic and call atoi on the remainder (which also handles negative values).`,
  ],
  signature: {
    "name": "evaluateStack",
    "params": [
      {
        "name": "ops",
        "type": "string[]"
      }
    ],
    "returns": "int[]",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        [
          "push 1",
          "push 2",
          "push 3"
        ]
      ],
      "expected": [
        1,
        2,
        3
      ],
      "hidden": false
    },
    {
      "input": [
        [
          "push 5",
          "push 3",
          "pop",
          "push 7"
        ]
      ],
      "expected": [
        5,
        7
      ],
      "hidden": false
    },
    {
      "input": [
        [
          "push 10"
        ]
      ],
      "expected": [
        10
      ],
      "hidden": false
    },
    {
      "input": [
        [
          "push 1",
          "push 2",
          "pop",
          "pop"
        ]
      ],
      "expected": [],
      "hidden": true
    },
    {
      "input": [
        []
      ],
      "expected": [],
      "hidden": true
    },
    {
      "input": [
        [
          "push 3",
          "push 1",
          "push 4",
          "pop",
          "push 2"
        ]
      ],
      "expected": [
        3,
        1,
        2
      ],
      "hidden": true
    },
    {
      "input": [
        [
          "push 5",
          "push 5",
          "push 5"
        ]
      ],
      "expected": [
        5,
        5,
        5
      ],
      "hidden": true
    },
    {
      "input": [
        [
          "push -1",
          "push 2",
          "pop",
          "push -3"
        ]
      ],
      "expected": [
        -1,
        -3
      ],
      "hidden": true
    },
    {
      "input": [
        [
          "push 100",
          "pop",
          "push 200",
          "pop",
          "push 300"
        ]
      ],
      "expected": [
        300
      ],
      "hidden": true
    },
    {
      "input": [
        [
          "push 1",
          "push 2",
          "push 3",
          "pop",
          "pop",
          "pop"
        ]
      ],
      "expected": [],
      "hidden": true
    }
  ],
  starterCode: {
    python: `def evaluate_stack(ops):
    # TODO: simulate push/pop operations and return the final stack bottom-to-top
    return []`,
    javascript: `function evaluateStack(ops) {
    // TODO: simulate push/pop operations and return the final stack bottom-to-top
    return [];
}`,
    typescript: `function evaluateStack(ops: string[]): number[] {
    // TODO: simulate push/pop operations and return the final stack bottom-to-top
    return [];
}`,
    java: `class Solution {
    public int[] evaluateStack(String[] ops) {
        // TODO: simulate push/pop operations and return the final stack bottom-to-top
        return new int[]{};
    }
}`,
    csharp: `public class Solution {
    public int[] EvaluateStack(string[] ops) {
        // TODO: simulate push/pop operations and return the final stack bottom-to-top
        return new int[]{};
    }
}`,
    c: `int* evaluateStack(char** ops, int opsSize, int* returnSize) {
    // TODO: simulate push/pop operations and return the final stack bottom-to-top
    *returnSize = 0;
    return NULL;
}`,
    cpp: `class Solution {
public:
    vector<int> evaluateStack(vector<string>& ops) {
        // TODO: simulate push/pop operations and return the final stack bottom-to-top
        return {};
    }
};`,
  },
  solutions: {
    python: `def evaluate_stack(ops):
    stack = []
    for op in ops:
        if op.startswith("push"):
            stack.append(int(op.split(" ")[1]))
        else:
            stack.pop()
    return stack`,
    javascript: `function evaluateStack(ops) {
    const stack = [];
    for (const op of ops) {
        if (op.startsWith('push')) {
            stack.push(parseInt(op.split(' ')[1], 10));
        } else {
            stack.pop();
        }
    }
    return stack;
}`,
    typescript: `function evaluateStack(ops: string[]): number[] {
    const stack: number[] = [];
    for (const op of ops) {
        if (op.startsWith('push')) {
            stack.push(parseInt(op.split(' ')[1], 10));
        } else {
            stack.pop();
        }
    }
    return stack;
}`,
    java: `class Solution {
    public int[] evaluateStack(String[] ops) {
        int[] temp = new int[ops.length + 1];
        int top = 0;
        for (String op : ops) {
            if (op.startsWith("push")) {
                temp[top++] = Integer.parseInt(op.split(" ")[1]);
            } else {
                if (top > 0) top--;
            }
        }
        int[] result = new int[top];
        for (int i = 0; i < top; i++) result[i] = temp[i];
        return result;
    }
}`,
    csharp: `using System.Collections.Generic;
public class Solution {
    public int[] EvaluateStack(string[] ops) {
        List<int> stack = new List<int>();
        foreach (string op in ops) {
            if (op.StartsWith("push")) {
                string[] parts = op.Split(' ');
                stack.Add(int.Parse(parts[1]));
            } else {
                stack.RemoveAt(stack.Count - 1);
            }
        }
        return stack.ToArray();
    }
}`,
    c: `#include <stdlib.h>

int* evaluateStack(char** ops, int opsSize, int* returnSize) {
    int* temp = (int*)malloc((opsSize + 1) * sizeof(int));
    int top = 0;
    for (int i = 0; i < opsSize; i++) {
        if (ops[i][1] == 'u') {
            /* "push X": skip the 5-char prefix "push " */
            temp[top++] = atoi(ops[i] + 5);
        } else {
            /* "pop" */
            if (top > 0) top--;
        }
    }
    *returnSize = top;
    int* result = (int*)malloc((top + 1) * sizeof(int));
    for (int i = 0; i < top; i++) result[i] = temp[i];
    free(temp);
    return result;
}`,
    cpp: `class Solution {
public:
    vector<int> evaluateStack(vector<string>& ops) {
        vector<int> stack;
        for (const string& op : ops) {
            if (op[1] == 'u') {
                stack.push_back(stoi(op.substr(5)));
            } else {
                stack.pop_back();
            }
        }
        return stack;
    }
};`,
  },
  editorial: `## Approach: Stack Simulation

Iterate over every operation string:

1. If the string **starts with \`"push"\`**, parse the integer that follows and append it to the stack.
2. If the string **equals \`"pop"\`**, remove the last (top) element.

After processing all operations, the underlying array is already in **bottom-to-top** order — return it directly.

**Parsing tip:** Split on the space character and convert the second token to an integer. In C, the prefix \`"push "\` is exactly 5 characters, so \`atoi(ops[i] + 5)\` advances past the prefix and parses the number directly. The C standard \`atoi\` correctly handles a leading minus sign, so negative push values like \`"push -42"\` work without special-casing.

**Distinguishing operations in C:** \`ops[i][1]\` is \`'u'\` for \`"push"\` and \`'o'\` for \`"pop"\`, providing a quick single-character branch.

**Complexity:**
- **Time:** O(n) — one pass over the \`ops\` array.
- **Space:** O(n) — the stack holds at most *n* elements.`,
};

export default problem;
