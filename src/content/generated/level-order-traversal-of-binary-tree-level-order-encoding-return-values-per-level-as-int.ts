import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "level-order-traversal-of-binary-tree-level-order-encoding-return-values-per-level-as-int",
  title: "Level Order Traversal of Binary Tree",
  difficulty: "medium",
  category: "trees-graphs",
  order: 1132,
  description: `Given a binary tree encoded as an array \`tree\` using **heap-style indexing**:

- \`tree[0]\` is the root value.
- For a node at index \`i\`, its **left child** is at index \`2*i + 1\` and its **right child** is at index \`2*i + 2\`.
- A value of \`-1\` represents a **null** (absent) node. Null nodes are never traversed and do not contribute children.

Perform a **level-order (BFS) traversal** and return a **flat integer array** of node values where **consecutive levels are separated by \`-1\`**.

Since valid node values are in \`[0, 100]\`, \`-1\` only ever appears as a level separator and cannot be confused with a node value.

If the tree is empty or the root is null, return an empty array.

**Example 1:**
\`\`\`text
Input:  tree = [3, 9, 20, -1, -1, 15, 7]

Tree structure:
      3
     / \\
    9   20
       /  \\
      15   7

Output: [3, -1, 9, 20, -1, 15, 7]
Explanation:
  Level 1: [3]
  Level 2: [9, 20]
  Level 3: [15, 7]
  Levels separated by -1 in the flat output.
\`\`\`

**Example 2:**
\`\`\`text
Input:  tree = [1, 2, -1, 3]

Tree structure:
    1
   /
  2
 /
3

Output: [1, -1, 2, -1, 3]
Explanation:
  Level 1: [1], Level 2: [2], Level 3: [3]
\`\`\`

**Constraints:**
- \`0 <= tree.length <= 100\`
- Each element of \`tree\` is either \`-1\` (null node) or an integer in \`[0, 100]\`.`,
  hints: [
    `Use Breadth-First Search (BFS) — process all nodes at the current depth before moving to the next depth.`,
    `Store array *indices* in your BFS queue, not node values. For index \`i\`, children are at \`2*i+1\` and \`2*i+2\`. Only enqueue a child if it is within bounds and \`tree[child] != -1\`.`,
    `Snapshot the queue size at the start of each BFS round — that count tells you exactly how many nodes belong to the current level.`,
    `Append \`-1\` to the result after finishing each level, but only if there is at least one more non-empty level to follow.`,
  ],
  signature: {
    "name": "levelOrder",
    "params": [
      {
        "name": "tree",
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
          3,
          9,
          20,
          -1,
          -1,
          15,
          7
        ]
      ],
      "expected": [
        3,
        -1,
        9,
        20,
        -1,
        15,
        7
      ],
      "hidden": false
    },
    {
      "input": [
        [
          1
        ]
      ],
      "expected": [
        1
      ],
      "hidden": false
    },
    {
      "input": [
        []
      ],
      "expected": [],
      "hidden": false
    },
    {
      "input": [
        [
          -1
        ]
      ],
      "expected": [],
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
          -1,
          -1
        ]
      ],
      "expected": [
        1,
        -1,
        2,
        3,
        -1,
        4,
        5
      ],
      "hidden": true
    },
    {
      "input": [
        [
          1,
          -1,
          2,
          -1,
          -1,
          -1,
          3
        ]
      ],
      "expected": [
        1,
        -1,
        2,
        -1,
        3
      ],
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          -1,
          3
        ]
      ],
      "expected": [
        1,
        -1,
        2,
        -1,
        3
      ],
      "hidden": true
    },
    {
      "input": [
        [
          5,
          3,
          8,
          1,
          4,
          7,
          9
        ]
      ],
      "expected": [
        5,
        -1,
        3,
        8,
        -1,
        1,
        4,
        7,
        9
      ],
      "hidden": true
    },
    {
      "input": [
        [
          10,
          5,
          15,
          3,
          7,
          -1,
          18
        ]
      ],
      "expected": [
        10,
        -1,
        5,
        15,
        -1,
        3,
        7,
        18
      ],
      "hidden": true
    }
  ],
  starterCode: {
    python: `def level_order(tree):
    # TODO
    return []
`,
    javascript: `function levelOrder(tree) {
    // TODO
    return [];
}
`,
    typescript: `function levelOrder(tree: number[]): number[] {
    // TODO
    return [];
}`,
    java: `class Solution {
    public int[] levelOrder(int[] tree) {
        // TODO
        return new int[0];
    }
}
`,
    csharp: `public class Solution {
    public int[] LevelOrder(int[] tree) {
        // TODO
        return new int[0];
    }
}`,
    c: `int* levelOrder(int* tree, int treeSize, int* returnSize) {
    // TODO
    *returnSize = 0;
    return NULL;
}
`,
    cpp: `class Solution {
public:
    vector<int> levelOrder(vector<int>& tree) {
        // TODO
        return {};
    }
};`,
  },
  solutions: {
    python: `def level_order(tree):
    if not tree or tree[0] == -1:
        return []
    n = len(tree)
    result = []
    cur_level = [0]
    first = True
    while cur_level:
        if not first:
            result.append(-1)
        first = False
        next_level = []
        for idx in cur_level:
            result.append(tree[idx])
            left = 2 * idx + 1
            right = 2 * idx + 2
            if left < n and tree[left] != -1:
                next_level.append(left)
            if right < n and tree[right] != -1:
                next_level.append(right)
        cur_level = next_level
    return result
`,
    javascript: `function levelOrder(tree) {
    if (!tree || tree.length === 0 || tree[0] === -1) return [];
    const n = tree.length;
    const result = [];
    let curLevel = [0];
    let first = true;
    while (curLevel.length > 0) {
        if (!first) result.push(-1);
        first = false;
        const nextLevel = [];
        for (const idx of curLevel) {
            result.push(tree[idx]);
            const left = 2 * idx + 1;
            const right = 2 * idx + 2;
            if (left < n && tree[left] !== -1) nextLevel.push(left);
            if (right < n && tree[right] !== -1) nextLevel.push(right);
        }
        curLevel = nextLevel;
    }
    return result;
}
`,
    typescript: `function levelOrder(tree: number[]): number[] {
    if (!tree || tree.length === 0 || tree[0] === -1) return [];
    const n = tree.length;
    const result: number[] = [];
    let curLevel: number[] = [0];
    let first = true;
    while (curLevel.length > 0) {
        if (!first) result.push(-1);
        first = false;
        const nextLevel: number[] = [];
        for (const idx of curLevel) {
            result.push(tree[idx]);
            const left = 2 * idx + 1;
            const right = 2 * idx + 2;
            if (left < n && tree[left] !== -1) nextLevel.push(left);
            if (right < n && tree[right] !== -1) nextLevel.push(right);
        }
        curLevel = nextLevel;
    }
    return result;
}`,
    java: `class Solution {
    public int[] levelOrder(int[] tree) {
        if (tree == null || tree.length == 0 || tree[0] == -1) return new int[0];
        int n = tree.length;
        int[] queue = new int[n];
        int head = 0, tail = 0;
        queue[tail++] = 0;
        int[] result = new int[2 * n];
        int resSize = 0;
        while (head < tail) {
            int levelSize = tail - head;
            for (int i = 0; i < levelSize; i++) {
                int idx = queue[head++];
                result[resSize++] = tree[idx];
                int left = 2 * idx + 1;
                int right = 2 * idx + 2;
                if (left < n && tree[left] != -1) queue[tail++] = left;
                if (right < n && tree[right] != -1) queue[tail++] = right;
            }
            if (head < tail) {
                result[resSize++] = -1;
            }
        }
        int[] trimmed = new int[resSize];
        System.arraycopy(result, 0, trimmed, 0, resSize);
        return trimmed;
    }
}
`,
    csharp: `using System.Collections.Generic;

public class Solution {
    public int[] LevelOrder(int[] tree) {
        if (tree == null || tree.Length == 0 || tree[0] == -1) return new int[0];
        int n = tree.Length;
        int[] queue = new int[n];
        int head = 0, tail = 0;
        queue[tail++] = 0;
        List<int> result = new List<int>();
        while (head < tail) {
            int levelSize = tail - head;
            for (int i = 0; i < levelSize; i++) {
                int idx = queue[head++];
                result.Add(tree[idx]);
                int left = 2 * idx + 1;
                int right = 2 * idx + 2;
                if (left < n && tree[left] != -1) queue[tail++] = left;
                if (right < n && tree[right] != -1) queue[tail++] = right;
            }
            if (head < tail) {
                result.Add(-1);
            }
        }
        return result.ToArray();
    }
}`,
    c: `#include <stdlib.h>

int* levelOrder(int* tree, int treeSize, int* returnSize) {
    *returnSize = 0;
    if (treeSize == 0 || tree[0] == -1) return NULL;
    int* queue = (int*)malloc(treeSize * sizeof(int));
    int head = 0, tail = 0;
    queue[tail++] = 0;
    int* result = (int*)malloc(2 * treeSize * sizeof(int));
    int resSize = 0;
    while (head < tail) {
        int levelSize = tail - head;
        int i;
        for (i = 0; i < levelSize; i++) {
            int idx = queue[head++];
            result[resSize++] = tree[idx];
            int left = 2 * idx + 1;
            int right = 2 * idx + 2;
            if (left < treeSize && tree[left] != -1) queue[tail++] = left;
            if (right < treeSize && tree[right] != -1) queue[tail++] = right;
        }
        if (head < tail) {
            result[resSize++] = -1;
        }
    }
    free(queue);
    *returnSize = resSize;
    return result;
}
`,
    cpp: `class Solution {
public:
    vector<int> levelOrder(vector<int>& tree) {
        if (tree.empty() || tree[0] == -1) return {};
        int n = (int)tree.size();
        vector<int> result;
        vector<int> curLevel = {0};
        bool first = true;
        while (!curLevel.empty()) {
            if (!first) result.push_back(-1);
            first = false;
            vector<int> nextLevel;
            for (int idx : curLevel) {
                result.push_back(tree[idx]);
                int left = 2 * idx + 1;
                int right = 2 * idx + 2;
                if (left < n && tree[left] != -1) nextLevel.push_back(left);
                if (right < n && tree[right] != -1) nextLevel.push_back(right);
            }
            curLevel = nextLevel;
        }
        return result;
    }
};`,
  },
  editorial: `## Approach: BFS with Level-Separator Encoding

Since the tree is given as a heap-encoded array rather than linked node objects, BFS is performed on **array indices** rather than pointers.

**Output encoding:** valid node values are in \`[0, 100]\`, so \`-1\` is a safe sentinel to insert between levels in the flat output.

**Algorithm:**
1. If \`tree\` is empty or \`tree[0] == -1\`, return \`[]\`.
2. Seed BFS with index \`0\` (the root).
3. While there are indices in the current level:
   - If not the first level, append \`-1\` to the result.
   - For each index \`idx\`, append \`tree[idx]\` to the result.
   - Compute \`left = 2*idx+1\` and \`right = 2*idx+2\`; enqueue each if it is within bounds and its value is not \`-1\`.
4. Return the result array.

**Snapshot technique:** record \`tail - head\` (or the current queue size) before processing a level. This tells you exactly how many nodes belong to that level so you never mix levels.

**Java implementation note:** Collection classes (\`Queue\`, \`ArrayList\`) require imports that conflict with some harness structures. Instead, a plain \`int[]\` with \`head\`/\`tail\` pointers serves as an efficient sliding-window queue. \`System.arraycopy\` (available from \`java.lang\` without any import) trims the oversized result buffer to its exact length.

**Complexity:**
- **Time:** O(n) — each index is enqueued and dequeued at most once.
- **Space:** O(n) — the queue and result array together hold at most \`2n - 1\` entries (n values + at most n − 1 separators).`,
};

export default problem;
