import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "min-stack-support-get-min-in-o-1-via-an-operations-encoding",
  title: "Min Stack Operations",
  difficulty: "medium",
  category: "stack",
  order: 1079,
  description: `You are given a list of stack operations encoded as integer pairs. Each operation is one of:

- \`[0, val]\` — **push(val)**: push the integer \`val\` onto the stack.
- \`[1, 0]\` — **pop**: remove the top element from the stack (the second element is ignored).
- \`[2, 0]\` — **getMin**: query the minimum element currently in the stack (the second element is ignored).

Implement the operations and return an integer array containing the results of every \`getMin\` call, **in the order they appear**.

You must support \`getMin\` in **O(1)** time.

**Guaranteed**: the stack is non-empty whenever \`pop\` or \`getMin\` is called, and there is at least one \`getMin\` operation.

\`\`\`text
Example 1:
Input:  operations = [[0,5],[0,3],[2,0],[0,7],[2,0],[1,0],[2,0],[1,0],[2,0]]
  push(5) → stack: [5]
  push(3) → stack: [5, 3]
  getMin  → min = 3
  push(7) → stack: [5, 3, 7]
  getMin  → min = 3
  pop     → stack: [5, 3]
  getMin  → min = 3
  pop     → stack: [5]
  getMin  → min = 5
Output: [3, 3, 3, 5]
\`\`\`

\`\`\`text
Example 2:
Input:  operations = [[0,-2],[0,0],[0,-3],[2,0],[1,0],[2,0]]
  push(-2) → stack: [-2]
  push(0)  → stack: [-2, 0]
  push(-3) → stack: [-2, 0, -3]
  getMin   → min = -3
  pop      → stack: [-2, 0]
  getMin   → min = -2
Output: [-3, -2]
\`\`\`

**Constraints:**
- \`1 ≤ operations.length ≤ 10000\`
- \`-2^31 ≤ val ≤ 2^31 - 1\`
- There is at least one \`getMin\` operation.
- The stack is non-empty when \`pop\` or \`getMin\` is called.`,
  hints: [
    `Think about what extra information you need at each stack level to retrieve the minimum in O(1) — without scanning the whole stack.`,
    `When you push a new element, the minimum of the entire stack is min(new_element, previous_minimum). Can you store this fact somewhere that mirrors the main stack?`,
    `Use a second parallel 'min stack' where position i holds the minimum of all elements from the bottom up to position i. Then getMin is just a peek at its top.`,
  ],
  signature: {
    "name": "minStackOps",
    "params": [
      {
        "name": "operations",
        "type": "int[][]"
      }
    ],
    "returns": "int[]",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        [
          [
            0,
            5
          ],
          [
            0,
            3
          ],
          [
            2,
            0
          ],
          [
            0,
            7
          ],
          [
            2,
            0
          ],
          [
            1,
            0
          ],
          [
            2,
            0
          ],
          [
            1,
            0
          ],
          [
            2,
            0
          ]
        ]
      ],
      "expected": [
        3,
        3,
        3,
        5
      ],
      "hidden": false
    },
    {
      "input": [
        [
          [
            0,
            -2
          ],
          [
            0,
            0
          ],
          [
            0,
            -3
          ],
          [
            2,
            0
          ],
          [
            1,
            0
          ],
          [
            2,
            0
          ]
        ]
      ],
      "expected": [
        -3,
        -2
      ],
      "hidden": false
    },
    {
      "input": [
        [
          [
            0,
            1
          ],
          [
            2,
            0
          ]
        ]
      ],
      "expected": [
        1
      ],
      "hidden": false
    },
    {
      "input": [
        [
          [
            0,
            42
          ],
          [
            2,
            0
          ],
          [
            2,
            0
          ],
          [
            2,
            0
          ]
        ]
      ],
      "expected": [
        42,
        42,
        42
      ],
      "hidden": true
    },
    {
      "input": [
        [
          [
            0,
            3
          ],
          [
            0,
            3
          ],
          [
            0,
            3
          ],
          [
            2,
            0
          ],
          [
            1,
            0
          ],
          [
            2,
            0
          ],
          [
            1,
            0
          ],
          [
            2,
            0
          ]
        ]
      ],
      "expected": [
        3,
        3,
        3
      ],
      "hidden": true
    },
    {
      "input": [
        [
          [
            0,
            -5
          ],
          [
            0,
            -3
          ],
          [
            2,
            0
          ],
          [
            0,
            -10
          ],
          [
            2,
            0
          ],
          [
            1,
            0
          ],
          [
            2,
            0
          ]
        ]
      ],
      "expected": [
        -5,
        -10,
        -5
      ],
      "hidden": true
    },
    {
      "input": [
        [
          [
            0,
            10
          ],
          [
            0,
            5
          ],
          [
            1,
            0
          ],
          [
            2,
            0
          ],
          [
            0,
            3
          ],
          [
            2,
            0
          ]
        ]
      ],
      "expected": [
        10,
        3
      ],
      "hidden": true
    },
    {
      "input": [
        [
          [
            0,
            5
          ],
          [
            0,
            4
          ],
          [
            0,
            3
          ],
          [
            0,
            2
          ],
          [
            0,
            1
          ],
          [
            2,
            0
          ],
          [
            1,
            0
          ],
          [
            2,
            0
          ],
          [
            1,
            0
          ],
          [
            2,
            0
          ],
          [
            1,
            0
          ],
          [
            2,
            0
          ],
          [
            1,
            0
          ],
          [
            2,
            0
          ]
        ]
      ],
      "expected": [
        1,
        2,
        3,
        4,
        5
      ],
      "hidden": true
    },
    {
      "input": [
        [
          [
            0,
            2147483647
          ],
          [
            0,
            -2147483648
          ],
          [
            2,
            0
          ],
          [
            1,
            0
          ],
          [
            2,
            0
          ]
        ]
      ],
      "expected": [
        -2147483648,
        2147483647
      ],
      "hidden": true
    }
  ],
  starterCode: {
    python: `def min_stack_ops(operations):
    # TODO: implement min stack operations
    return []
`,
    javascript: `function minStackOps(operations) {
    // TODO: implement min stack operations
    return [];
}
`,
    java: `class Solution {
    public int[] minStackOps(int[][] operations) {
        // TODO: implement min stack operations
        return new int[0];
    }
}
`,
    c: `int* minStackOps(int** operations, int operationsSize, int* operationsColSize, int* returnSize) {
    // TODO: implement min stack operations
    *returnSize = 0;
    return NULL;
}
`,
  },
  solutions: {
    python: `def min_stack_ops(operations):
    stack = []
    min_stack = []
    result = []
    for op in operations:
        if op[0] == 0:
            val = op[1]
            stack.append(val)
            min_stack.append(val if not min_stack else min(val, min_stack[-1]))
        elif op[0] == 1:
            stack.pop()
            min_stack.pop()
        elif op[0] == 2:
            result.append(min_stack[-1])
    return result
`,
    javascript: `function minStackOps(operations) {
    const stack = [];
    const minStack = [];
    const result = [];
    for (const op of operations) {
        if (op[0] === 0) {
            const val = op[1];
            stack.push(val);
            minStack.push(minStack.length === 0 ? val : Math.min(val, minStack[minStack.length - 1]));
        } else if (op[0] === 1) {
            stack.pop();
            minStack.pop();
        } else if (op[0] === 2) {
            result.push(minStack[minStack.length - 1]);
        }
    }
    return result;
}
`,
    java: `class Solution {
    public int[] minStackOps(int[][] operations) {
        int getMinCount = 0;
        for (int[] op : operations) if (op[0] == 2) getMinCount++;
        int[] result = new int[getMinCount];
        int[] stack = new int[10001];
        int[] minStack = new int[10001];
        int top = -1, resultIdx = 0;
        for (int[] op : operations) {
            if (op[0] == 0) {
                int val = op[1];
                top++;
                stack[top] = val;
                minStack[top] = (top == 0) ? val : Math.min(val, minStack[top - 1]);
            } else if (op[0] == 1) {
                top--;
            } else if (op[0] == 2) {
                result[resultIdx++] = minStack[top];
            }
        }
        return result;
    }
}
`,
    c: `#include <stdlib.h>

int* minStackOps(int** operations, int operationsSize, int* operationsColSize, int* returnSize) {
    int getMinCount = 0;
    int i;
    for (i = 0; i < operationsSize; i++)
        if (operations[i][0] == 2) getMinCount++;
    *returnSize = getMinCount;
    int* result = (int*)malloc((getMinCount > 0 ? getMinCount : 1) * sizeof(int));
    int stack[10001];
    int minStack[10001];
    int top = -1, resultIdx = 0;
    for (i = 0; i < operationsSize; i++) {
        if (operations[i][0] == 0) {
            int val = operations[i][1];
            top++;
            stack[top] = val;
            if (top == 0) {
                minStack[top] = val;
            } else {
                minStack[top] = (val < minStack[top-1]) ? val : minStack[top-1];
            }
        } else if (operations[i][0] == 1) {
            top--;
        } else if (operations[i][0] == 2) {
            result[resultIdx++] = minStack[top];
        }
    }
    return result;
}
`,
  },
  editorial: `## Approach: Auxiliary Min Stack

**Key Insight**: Maintain a second \`minStack\` in parallel with the main stack. Entry \`minStack[i]\` always stores *the minimum of all elements from the bottom of the stack up through index i*. This makes \`getMin\` a simple O(1) peek.

### Algorithm

1. **push(val)**: Push \`val\` onto \`stack\`. Push \`min(val, minStack.top())\` onto \`minStack\` (just \`val\` if the stack was empty).
2. **pop()**: Pop from *both* \`stack\` and \`minStack\` simultaneously.
3. **getMin()**: Return \`minStack.top()\` — O(1).

### Example Trace (Test Case 1)

\`\`\`
Operation   stack           minStack       result
push(5)     [5]             [5]
push(3)     [5,3]           [5,3]
getMin                                     → 3
push(7)     [5,3,7]         [5,3,3]
getMin                                     → 3
pop         [5,3]           [5,3]
getMin                                     → 3
pop         [5]             [5]
getMin                                     → 5
Output: [3, 3, 3, 5]
\`\`\`

### Why It Works

Every time we pop the main stack we also pop \`minStack\`, restoring the previous minimum automatically. The invariant — \`minStack[top]\` equals the minimum of all current stack elements — is preserved by every operation.

### Complexity

- **Time**: O(1) per operation (push, pop, getMin).
- **Space**: O(n) for the auxiliary min stack, where n is the number of pushed elements.`,
};

export default problem;
