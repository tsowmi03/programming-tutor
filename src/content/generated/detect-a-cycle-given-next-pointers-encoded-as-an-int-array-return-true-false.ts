import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "detect-a-cycle-given-next-pointers-encoded-as-an-int-array-return-true-false",
  title: "Detect Cycle in Encoded Linked List",
  difficulty: "medium",
  category: "linked-lists",
  order: 1114,
  description: `You are given an integer array \`next\` of length \`n\` representing the \`next\` pointers of a linked list. The list has nodes numbered \`0\` through \`n-1\`. \`next[i]\` is the index of the node that node \`i\` points to. If \`next[i] == -1\`, node \`i\` has no next pointer (it is the tail).

The list always starts at node \`0\`. Determine whether the linked list contains a cycle.

A cycle exists if, starting from node \`0\` and following \`next\` pointers, you can reach a node you have already visited.

\`\`\`text
Example 1:
next = [1, 2, 3, 1]
Traversal: 0 -> 1 -> 2 -> 3 -> 1 -> ... (cycle back to 1)
Output: true
\`\`\`

\`\`\`text
Example 2:
next = [1, 2, 3, -1]
Traversal: 0 -> 1 -> 2 -> 3 -> (tail)
Output: false
\`\`\`

\`\`\`text
Example 3:
next = [1, 0]
Traversal: 0 -> 1 -> 0 -> ... (cycle back to 0)
Output: true
\`\`\`

**Constraints:**
- \`1 <= n <= 10^4\`
- \`-1 <= next[i] < n\`
- \`next[i] != i\` (no self-loops)
- The list starts at node \`0\`.`,
  hints: [
    `Try tracking which nodes you have already visited as you follow the next pointers from node 0.`,
    `A visited array (or boolean array) of size n can record whether you've seen each node index before. If you arrive at a node you've already marked, there is a cycle.`,
    `Alternatively, think about Floyd's tortoise-and-hare algorithm: use a slow pointer that advances one step and a fast pointer that advances two steps. If they ever meet, there is a cycle.`,
  ],
  signature: {
    "name": "hasCycle",
    "params": [
      {
        "name": "next",
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
          -1
        ]
      ],
      "expected": false,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          0
        ]
      ],
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        [
          -1
        ]
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          3,
          4,
          5,
          -1
        ]
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          3,
          4,
          2
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
          5,
          6,
          7,
          8,
          9,
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
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          -1
        ]
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          0
        ]
      ],
      "expected": true,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def has_cycle(next: list[int]) -> bool:
    # TODO: implement
    return False
`,
    javascript: `/**
 * @param {number[]} next
 * @return {boolean}
 */
function hasCycle(next) {
    // TODO: implement
    return false;
}
`,
    typescript: `function hasCycle(next: number[]): boolean {
    // TODO: implement
    return false;
}`,
    java: `class Solution {
    public boolean hasCycle(int[] next) {
        // TODO: implement
        return false;
    }
}
`,
    csharp: `public class Solution {
    public bool HasCycle(int[] next) {
        // TODO: implement
        return false;
    }
}`,
    c: `bool hasCycle(int* next, int nextSize) {
    // TODO: implement
    return false;
}
`,
    cpp: `class Solution {
public:
    bool hasCycle(vector<int>& next) {
        // TODO: implement
        return false;
    }
};`,
  },
  solutions: {
    python: `def has_cycle(next: list[int]) -> bool:
    n = len(next)
    visited = [False] * n
    cur = 0
    while cur != -1:
        if visited[cur]:
            return True
        visited[cur] = True
        cur = next[cur]
    return False
`,
    javascript: `/**
 * @param {number[]} next
 * @return {boolean}
 */
function hasCycle(next) {
    const n = next.length;
    const visited = new Array(n).fill(false);
    let cur = 0;
    while (cur !== -1) {
        if (visited[cur]) return true;
        visited[cur] = true;
        cur = next[cur];
    }
    return false;
}
`,
    typescript: `function hasCycle(next: number[]): boolean {
    const n = next.length;
    const visited = new Array(n).fill(false);
    let cur = 0;
    while (cur !== -1) {
        if (visited[cur]) return true;
        visited[cur] = true;
        cur = next[cur];
    }
    return false;
}`,
    java: `class Solution {
    public boolean hasCycle(int[] next) {
        int n = next.length;
        boolean[] visited = new boolean[n];
        int cur = 0;
        while (cur != -1) {
            if (visited[cur]) return true;
            visited[cur] = true;
            cur = next[cur];
        }
        return false;
    }
}
`,
    csharp: `public class Solution {
    public bool HasCycle(int[] next) {
        int n = next.Length;
        bool[] visited = new bool[n];
        int cur = 0;
        while (cur != -1) {
            if (visited[cur]) return true;
            visited[cur] = true;
            cur = next[cur];
        }
        return false;
    }
}`,
    c: `#include <stdlib.h>
#include <stdbool.h>
#include <string.h>

bool hasCycle(int* next, int nextSize) {
    bool* visited = (bool*)calloc(nextSize, sizeof(bool));
    int cur = 0;
    bool result = false;
    while (cur != -1) {
        if (visited[cur]) {
            result = true;
            break;
        }
        visited[cur] = true;
        cur = next[cur];
    }
    free(visited);
    return result;
}
`,
    cpp: `class Solution {
public:
    bool hasCycle(vector<int>& next) {
        int n = next.size();
        vector<bool> visited(n, false);
        int cur = 0;
        while (cur != -1) {
            if (visited[cur]) return true;
            visited[cur] = true;
            cur = next[cur];
        }
        return false;
    }
};`,
  },
  editorial: `## Approach: Visited Array

### Intuition
Starting from node \`0\`, we follow \`next\` pointers one step at a time. We maintain a boolean \`visited\` array of size \`n\`. Before visiting a node, we check whether we have been there before:
- If **yes** → a cycle exists, return \`true\`.
- If **no** → mark it visited and move to \`next[cur]\`.
- If \`cur == -1\` → we reached the tail without revisiting any node, return \`false\`.

Because there are only \`n\` nodes, if we ever take more than \`n\` steps without hitting \`-1\`, we must have revisited a node — so this loop terminates in at most \`n+1\` iterations.

### Complexity
- **Time:** O(n) — we visit each node at most once.
- **Space:** O(n) — the visited array.

### Alternative: Floyd's Tortoise and Hare
You can also use two pointers (\`slow\` advances 1 step, \`fast\` advances 2 steps). If there is a cycle they will eventually meet; if \`fast\` reaches \`-1\` there is no cycle. This uses O(1) extra space.`,
};

export default problem;
