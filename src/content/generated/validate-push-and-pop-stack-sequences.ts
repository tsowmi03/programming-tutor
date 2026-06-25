import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "validate-push-and-pop-stack-sequences",
  title: "Validate Stack Push and Pop Sequences",
  difficulty: "medium",
  category: "stack",
  order: 1022,
  description: `Given two integer arrays \`pushed\` and \`popped\`, each of length \`n\` containing distinct values, determine whether these could represent a valid sequence of push and pop operations on an initially empty stack.

Specifically, all \`n\` values are pushed onto the stack (in the order given by \`pushed\`), and the stack is popped in the order given by \`popped\`. Return \`true\` if the two sequences could be the result of a sequence of push and pop operations on the stack, and \`false\` otherwise.

\`\`\`text
Example 1:
Input:  pushed = [1, 2, 3, 4, 5], popped = [4, 5, 3, 2, 1]
Output: true
Explanation:
  Push 1, 2, 3, 4  → stack: [1,2,3,4]
  Pop  4           → stack: [1,2,3],  popped so far: [4]
  Push 5           → stack: [1,2,3,5]
  Pop  5           → stack: [1,2,3],  popped so far: [4,5]
  Pop  3           → stack: [1,2],    popped so far: [4,5,3]
  Pop  2           → stack: [1],      popped so far: [4,5,3,2]
  Pop  1           → stack: [],       popped so far: [4,5,3,2,1]
\`\`\`

\`\`\`text
Example 2:
Input:  pushed = [1, 2, 3, 4, 5], popped = [4, 3, 5, 1, 2]
Output: false
Explanation:
  After popping 4, 3, 5, the stack is [1, 2].
  The next value to pop is 1, but the top of the stack is 2.
  There is no valid sequence of operations that produces this popped order.
\`\`\`

**Constraints:**
- \`1 <= n <= 1000\`
- \`0 <= pushed[i], popped[i] <= 1000\`
- All values in \`pushed\` are distinct.
- \`popped\` is a permutation of \`pushed\`.`,
  hints: [
    `Simulate the process: use an auxiliary stack and a pointer into \`popped\`. Push elements one by one, and after each push check if the stack's top matches the current element to pop.`,
    `Keep popping as long as the stack is non-empty and its top equals \`popped[popIdx]\`. At the end, if the stack is empty you have a valid sequence.`,
  ],
  guidance: [
    {
      "title": "Think about simulation",
      "body": "Instead of reasoning abstractly, try to literally simulate the push/pop process with an auxiliary stack and see if you can reproduce the `popped` sequence.",
      "level": "nudge"
    },
    {
      "title": "Greedy pop strategy",
      "body": "After pushing each element, greedily pop from the auxiliary stack as many times as possible — every time the stack's top matches the next element in `popped`, pop it and advance the pop pointer. This greedy choice is always correct because there is never a reason to delay a pop.",
      "level": "strategy"
    },
    {
      "title": "When to declare failure",
      "body": "You don't need to check for failures mid-simulation. Simply run through all pushes with greedy pops; if the auxiliary stack is empty at the end, the sequences are valid. If anything remains, they are not.",
      "level": "pitfall"
    },
    {
      "title": "Simulation shape",
      "body": "```\nstack = []\npopIdx = 0\nfor each value in pushed:\n    stack.push(value)\n    while stack is not empty and stack.top == popped[popIdx]:\n        stack.pop()\n        popIdx++\nreturn stack is empty\n```",
      "level": "pseudocode"
    }
  ],

  signature: {
    "name": "validateStackSequences",
    "params": [
      {
        "name": "pushed",
        "type": "int[]"
      },
      {
        "name": "popped",
        "type": "int[]"
      }
    ],
    "returns": "bool",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        [
          1,
          2,
          3,
          4,
          5
        ],
        [
          4,
          5,
          3,
          2,
          1
        ]
      ],
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          2,
          3,
          4,
          5
        ],
        [
          4,
          3,
          5,
          1,
          2
        ]
      ],
      "expected": false,
      "hidden": false
    },
    {
      "input": [
        [
          1
        ],
        [
          1
        ]
      ],
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          2
        ],
        [
          2,
          1
        ]
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2
        ],
        [
          1,
          2
        ]
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          2,
          1,
          0
        ],
        [
          1,
          2,
          0
        ]
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          3
        ],
        [
          3,
          1,
          2
        ]
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          0,
          2
        ],
        [
          2,
          1,
          0
        ]
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        [
          5,
          4,
          3,
          2,
          1
        ],
        [
          1,
          2,
          3,
          4,
          5
        ]
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          3,
          4,
          5
        ],
        [
          1,
          2,
          3,
          4,
          5
        ]
      ],
      "expected": true,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def validate_stack_sequences(pushed: list[int], popped: list[int]) -> bool:
    # TODO: implement
    return False`,
    javascript: `function validateStackSequences(pushed, popped) {
    // TODO: implement
    return false;
}`,
    typescript: `function validateStackSequences(pushed: number[], popped: number[]): boolean {
    // TODO: implement
    return false;
}`,
    java: `class Solution {
    public boolean validateStackSequences(int[] pushed, int[] popped) {
        // TODO: implement
        return false;
    }
}`,
    csharp: `public class Solution {
    public bool ValidateStackSequences(int[] pushed, int[] popped) {
        // TODO: implement
        return false;
    }
}`,
    c: `bool validateStackSequences(int* pushed, int pushedSize, int* popped, int poppedSize) {
    // TODO: implement
    return false;
}`,
    cpp: `class Solution {
public:
    bool validateStackSequences(vector<int>& pushed, vector<int>& popped) {
        // TODO: implement
        return false;
    }
};`,
  },
  solutions: {
    python: `def validate_stack_sequences(pushed: list[int], popped: list[int]) -> bool:
    stack = []
    pop_idx = 0
    for val in pushed:
        stack.append(val)
        while stack and stack[-1] == popped[pop_idx]:
            stack.pop()
            pop_idx += 1
    return len(stack) == 0`,
    javascript: `function validateStackSequences(pushed, popped) {
    const stack = [];
    let popIdx = 0;
    for (const val of pushed) {
        stack.push(val);
        while (stack.length > 0 && stack[stack.length - 1] === popped[popIdx]) {
            stack.pop();
            popIdx++;
        }
    }
    return stack.length === 0;
}`,
    typescript: `function validateStackSequences(pushed: number[], popped: number[]): boolean {
    const stack: number[] = [];
    let popIdx = 0;
    for (const val of pushed) {
        stack.push(val);
        while (stack.length > 0 && stack[stack.length - 1] === popped[popIdx]) {
            stack.pop();
            popIdx++;
        }
    }
    return stack.length === 0;
}`,
    java: `class Solution {
    public boolean validateStackSequences(int[] pushed, int[] popped) {
        int[] stack = new int[pushed.length];
        int top = 0;
        int popIdx = 0;
        for (int val : pushed) {
            stack[top++] = val;
            while (top > 0 && stack[top - 1] == popped[popIdx]) {
                top--;
                popIdx++;
            }
        }
        return top == 0;
    }
}`,
    csharp: `public class Solution {
    public bool ValidateStackSequences(int[] pushed, int[] popped) {
        int[] stack = new int[pushed.Length];
        int top = 0;
        int popIdx = 0;
        foreach (int val in pushed) {
            stack[top++] = val;
            while (top > 0 && stack[top - 1] == popped[popIdx]) {
                top--;
                popIdx++;
            }
        }
        return top == 0;
    }
}`,
    c: `bool validateStackSequences(int* pushed, int pushedSize, int* popped, int poppedSize) {
    int* stack = (int*)malloc(pushedSize * sizeof(int));
    int top = 0;
    int popIdx = 0;
    for (int i = 0; i < pushedSize; i++) {
        stack[top++] = pushed[i];
        while (top > 0 && stack[top - 1] == popped[popIdx]) {
            top--;
            popIdx++;
        }
    }
    free(stack);
    return top == 0;
}`,
    cpp: `class Solution {
public:
    bool validateStackSequences(vector<int>& pushed, vector<int>& popped) {
        vector<int> stack;
        int popIdx = 0;
        for (int val : pushed) {
            stack.push_back(val);
            while (!stack.empty() && stack.back() == popped[popIdx]) {
                stack.pop_back();
                popIdx++;
            }
        }
        return stack.empty();
    }
};`,
  },
  editorial: `## Approach: Greedy Simulation

### Idea
Simulate the push/pop process using an auxiliary stack and a pointer \`popIdx\` into the \`popped\` array.

For each value in \`pushed\`:
1. Push it onto the auxiliary stack.
2. While the stack is non-empty **and** the top of the stack equals \`popped[popIdx]\`, pop the stack and advance \`popIdx\`.

After processing all pushed values, if the auxiliary stack is empty, every element was popped in the required order → return \`true\`. Otherwise return \`false\`.

### Why greedy works
If the element on top of the stack is the next one that needs to be popped, there is never a reason to delay popping it. Delaying would only force a later pop while something else sits on top, which would be impossible.

### Complexity
- **Time:** O(n) — each element is pushed and popped at most once.
- **Space:** O(n) — for the auxiliary stack in the worst case.

### Example trace (test case 1)
\`\`\`
pushed = [1,2,3,4,5], popped = [4,5,3,2,1]

Push 1 → stack: [1]         top≠4, continue
Push 2 → stack: [1,2]       top≠4, continue
Push 3 → stack: [1,2,3]     top≠4, continue
Push 4 → stack: [1,2,3,4]   top==4 → pop, popIdx=1
          stack: [1,2,3]     top≠5, continue
Push 5 → stack: [1,2,3,5]   top==5 → pop, popIdx=2
          stack: [1,2,3]     top==3 → pop, popIdx=3
          stack: [1,2]       top==2 → pop, popIdx=4
          stack: [1]         top==1 → pop, popIdx=5
          stack: []          empty, stop
Stack is empty → true
\`\`\``,
};

export default problem;
