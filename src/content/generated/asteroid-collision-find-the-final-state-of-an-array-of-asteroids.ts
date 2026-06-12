import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "asteroid-collision-find-the-final-state-of-an-array-of-asteroids",
  title: "Asteroid Collision",
  difficulty: "medium",
  category: "stack",
  order: 1080,
  description: `You are given an array of integers \`asteroids\` where each element represents an asteroid in a row:
- The **absolute value** represents the asteroid's size.
- The **sign** represents its direction: **positive** = moving right, **negative** = moving left.

All asteroids move at the **same speed**. Simulate all collisions and return the **final state** of the asteroids.

**Collision rules:**
- Two asteroids collide only when a **right-moving** (positive) asteroid is to the left of a **left-moving** (negative) asteroid.
- The **smaller** asteroid (by absolute value) explodes. If they are equal in size, **both** explode.
- Asteroids moving in the **same direction** never collide.

\`\`\`text
Example 1:
Input:  asteroids = [5, 10, -5]
Output: [5, 10]
Explanation: 10 and -5 collide; 10 survives. 5 and 10 both move right and never meet.

Example 2:
Input:  asteroids = [8, -8]
Output: []
Explanation: 8 and -8 are equal in size, so both explode.

Example 3:
Input:  asteroids = [10, 2, -5]
Output: [10]
Explanation: 2 and -5 collide; -5 wins and 2 explodes.
               Then 10 and -5 collide; 10 wins and -5 explodes.
\`\`\`

**Constraints:**
- \`1 <= asteroids.length <= 10^4\`
- \`-1000 <= asteroids[i] <= 1000\`
- \`asteroids[i] != 0\``,
  hints: [
    `Think about which pairs of asteroids can actually collide. Can two right-moving asteroids ever collide with each other? What about a left-moving asteroid to the left of a right-moving one?`,
    `A stack is a natural fit here — the top of the stack is always the most recently seen asteroid that hasn't been destroyed yet.`,
    `When processing a left-moving asteroid (negative), repeatedly compare it with the stack top. Use a boolean \`destroyed\` flag: if the top is smaller, pop it and keep checking; if equal, pop it and mark current as destroyed; if larger, just mark current as destroyed.`,
  ],
  signature: {
    "name": "asteroidCollision",
    "params": [
      {
        "name": "asteroids",
        "type": "int[]"
      }
    ],
    "returns": "int[]",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        [
          5,
          10,
          -5
        ]
      ],
      "expected": [
        5,
        10
      ],
      "hidden": false
    },
    {
      "input": [
        [
          8,
          -8
        ]
      ],
      "expected": [],
      "hidden": false
    },
    {
      "input": [
        [
          10,
          2,
          -5
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
          -2,
          -1,
          1,
          2
        ]
      ],
      "expected": [
        -2,
        -1,
        1,
        2
      ],
      "hidden": true
    },
    {
      "input": [
        [
          1,
          -1
        ]
      ],
      "expected": [],
      "hidden": true
    },
    {
      "input": [
        [
          -1,
          -2,
          -3
        ]
      ],
      "expected": [
        -1,
        -2,
        -3
      ],
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          3
        ]
      ],
      "expected": [
        1,
        2,
        3
      ],
      "hidden": true
    },
    {
      "input": [
        [
          10,
          -5,
          -10
        ]
      ],
      "expected": [],
      "hidden": true
    },
    {
      "input": [
        [
          -3,
          2,
          -2
        ]
      ],
      "expected": [
        -3
      ],
      "hidden": true
    },
    {
      "input": [
        [
          -2,
          1,
          1
        ]
      ],
      "expected": [
        -2,
        1,
        1
      ],
      "hidden": true
    }
  ],
  starterCode: {
    python: `def asteroid_collision(asteroids):
    # TODO: implement
    return []
`,
    javascript: `function asteroidCollision(asteroids) {
    // TODO: implement
    return [];
}
`,
    java: `class Solution {
    public int[] asteroidCollision(int[] asteroids) {
        // TODO: implement
        return new int[]{};
    }
}
`,
    c: `#include <stdlib.h>

int* asteroidCollision(int* asteroids, int asteroidsSize, int* returnSize) {
    // TODO: implement
    *returnSize = 0;
    return NULL;
}
`,
  },
  solutions: {
    python: `def asteroid_collision(asteroids):
    stack = []
    for a in asteroids:
        destroyed = False
        while stack and a < 0 and stack[-1] > 0:
            if stack[-1] < -a:
                stack.pop()
            elif stack[-1] == -a:
                stack.pop()
                destroyed = True
                break
            else:
                destroyed = True
                break
        if not destroyed:
            stack.append(a)
    return stack
`,
    javascript: `function asteroidCollision(asteroids) {
    const stack = [];
    for (const a of asteroids) {
        let destroyed = false;
        while (stack.length > 0 && a < 0 && stack[stack.length - 1] > 0) {
            const top = stack[stack.length - 1];
            if (top < -a) {
                stack.pop();
            } else if (top === -a) {
                stack.pop();
                destroyed = true;
                break;
            } else {
                destroyed = true;
                break;
            }
        }
        if (!destroyed) {
            stack.push(a);
        }
    }
    return stack;
}
`,
    java: `class Solution {
    public int[] asteroidCollision(int[] asteroids) {
        int[] stack = new int[asteroids.length];
        int top = 0;
        for (int a : asteroids) {
            boolean destroyed = false;
            while (top > 0 && a < 0 && stack[top - 1] > 0) {
                int t = stack[top - 1];
                if (t < -a) {
                    top--;
                } else if (t == -a) {
                    top--;
                    destroyed = true;
                    break;
                } else {
                    destroyed = true;
                    break;
                }
            }
            if (!destroyed) {
                stack[top++] = a;
            }
        }
        int[] result = new int[top];
        System.arraycopy(stack, 0, result, 0, top);
        return result;
    }
}
`,
    c: `#include <stdlib.h>

int* asteroidCollision(int* asteroids, int asteroidsSize, int* returnSize) {
    int* stack = (int*)malloc((asteroidsSize + 1) * sizeof(int));
    int top = 0;
    for (int i = 0; i < asteroidsSize; i++) {
        int a = asteroids[i];
        int destroyed = 0;
        while (top > 0 && a < 0 && stack[top - 1] > 0) {
            int t = stack[top - 1];
            if (t < -a) {
                top--;
            } else if (t == -a) {
                top--;
                destroyed = 1;
                break;
            } else {
                destroyed = 1;
                break;
            }
        }
        if (!destroyed) {
            stack[top++] = a;
        }
    }
    *returnSize = top;
    return stack;
}
`,
  },
  editorial: `## Approach: Stack Simulation

A collision only occurs when a **right-moving** asteroid (positive) is immediately to the left of a **left-moving** asteroid (negative). A **stack** lets us efficiently compare each new asteroid against the most recently surviving one.

### Algorithm

For each asteroid \`a\`:
1. Start with \`destroyed = false\`.
2. While the stack is non-empty **and** \`a < 0\` **and** the stack top is positive, a collision happens:
   - \`top < |a|\` → top explodes: pop it, continue the loop.
   - \`top == |a|\` → both explode: pop it, set \`destroyed = true\`, break.
   - \`top > |a|\` → \`a\` explodes: set \`destroyed = true\`, break.
3. If \`a\` was not destroyed, push it onto the stack.

The stack contents from bottom to top form the answer.

### Complexity

- **Time:** O(n) — each asteroid is pushed and popped at most once.
- **Space:** O(n) — for the stack.

### Example Trace: \`[10, 2, -5]\`

| Step | Asteroid | Stack   | Event                          |
|------|----------|---------|--------------------------------|
| 1    | 10       | [10]    | push (moves right)             |
| 2    | 2        | [10, 2] | push (moves right)             |
| 3    | -5       | [10, 2] | 2 < 5 → 2 explodes, pop        |
|      |          | [10]    | 10 > 5 → -5 explodes, stop     |

Final result: \`[10]\``,
};

export default problem;
