import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "minimum-depth-of-a-binary-tree-encoded-as-a-level-order-int-array",
  title: "Minimum Depth of a Binary Tree",
  difficulty: "easy",
  category: "trees-graphs",
  order: 1123,
  description: `You are given a binary tree encoded as a **level-order (BFS) array** of integers.

- The root is at index \`0\`.
- For a node at index \`i\`, its left child is at index \`2*i + 1\` and its right child is at index \`2*i + 2\`.
- A value of \`-1\` at any index means that node does **not** exist.

The **minimum depth** is the number of nodes along the shortest path from the root node to the nearest **leaf** node. A leaf is a node with no children (both left and right children are absent / \`-1\`).

Return \`0\` if the tree is empty (the array is empty or the root value is \`-1\`).

\`\`\`text
Example 1:
Input:  tree = [3, 9, 20, -1, -1, 15, 7]
Tree structure:
        3
       / \\
      9   20
         /  \\
        15   7
The nearest leaf is node 9 (depth 2).
Output: 2
\`\`\`

\`\`\`text
Example 2:
Input:  tree = [1, 2, -1, 3, -1, -1, -1]
Tree structure:
    1
   /
  2
 /
3
The only leaf is node 3 (depth 3).
Output: 3
\`\`\`

\`\`\`text
Example 3:
Input:  tree = [42]
Single node, it is both root and leaf.
Output: 1
\`\`\`

**Constraints:**
- \`0 <= tree.length <= 1000\`
- \`-1\` encodes a missing node; valid node values are \`>= 0\`.
- The array is guaranteed to represent a valid binary tree (no orphan children).`,
  hints: [
    `Use BFS (breadth-first search) level by level. The first level where you encounter a leaf node gives you the minimum depth.`,
    `When processing a node at index \`i\`, check indices \`2*i+1\` and \`2*i+2\`. A node is a leaf when both those indices are either out of bounds or hold the value \`-1\`.`,
    `Track the current depth as you move from one BFS level to the next. Return as soon as you find the first leaf.`,
  ],
  signature: {
    "name": "minDepth",
    "params": [
      {
        "name": "tree",
        "type": "int[]"
      }
    ],
    "returns": "int",
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
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          2,
          -1,
          3,
          -1,
          -1,
          -1
        ]
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        [
          42
        ]
      ],
      "expected": 1,
      "hidden": false
    },
    {
      "input": [
        []
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          -1
        ]
      ],
      "expected": 0,
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
          7
        ]
      ],
      "expected": 3,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          3,
          -1,
          -1,
          6,
          -1
        ]
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          -1,
          3,
          -1,
          -1,
          -1,
          4,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1,
          -1
        ]
      ],
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        [
          5,
          3,
          8,
          1,
          -1,
          -1,
          9
        ]
      ],
      "expected": 3,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def min_depth(tree: list[int]) -> int:
    # TODO: implement
    return 0
`,
    javascript: `/**
 * @param {number[]} tree
 * @return {number}
 */
function minDepth(tree) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function minDepth(tree: number[]): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int minDepth(int[] tree) {
        // TODO: implement
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int MinDepth(int[] tree) {
        // TODO: implement
        return 0;
    }
}`,
    c: `int minDepth(int* tree, int treeSize) {
    // TODO: implement
    return 0;
}
`,
    cpp: `class Solution {
public:
    int minDepth(vector<int>& tree) {
        // TODO: implement
        return 0;
    }
};`,
  },
  solutions: {
    python: `from collections import deque

def min_depth(tree: list[int]) -> int:
    if not tree or tree[0] == -1:
        return 0
    n = len(tree)
    queue = deque([(0, 1)])  # (index, depth)
    while queue:
        idx, depth = queue.popleft()
        left = 2 * idx + 1
        right = 2 * idx + 2
        left_missing = left >= n or tree[left] == -1
        right_missing = right >= n or tree[right] == -1
        if left_missing and right_missing:
            return depth
        if not left_missing:
            queue.append((left, depth + 1))
        if not right_missing:
            queue.append((right, depth + 1))
    return 0
`,
    javascript: `/**
 * @param {number[]} tree
 * @return {number}
 */
function minDepth(tree) {
    if (!tree || tree.length === 0 || tree[0] === -1) return 0;
    const n = tree.length;
    const queue = [[0, 1]];
    let head = 0;
    while (head < queue.length) {
        const [idx, depth] = queue[head++];
        const left = 2 * idx + 1;
        const right = 2 * idx + 2;
        const leftMissing = left >= n || tree[left] === -1;
        const rightMissing = right >= n || tree[right] === -1;
        if (leftMissing && rightMissing) return depth;
        if (!leftMissing) queue.push([left, depth + 1]);
        if (!rightMissing) queue.push([right, depth + 1]);
    }
    return 0;
}
`,
    typescript: `function minDepth(tree: number[]): number {
    if (!tree || tree.length === 0 || tree[0] === -1) return 0;
    const n = tree.length;
    const queue: [number, number][] = [[0, 1]];
    let head = 0;
    while (head < queue.length) {
        const [idx, depth] = queue[head++];
        const left = 2 * idx + 1;
        const right = 2 * idx + 2;
        const leftMissing = left >= n || tree[left] === -1;
        const rightMissing = right >= n || tree[right] === -1;
        if (leftMissing && rightMissing) return depth;
        if (!leftMissing) queue.push([left, depth + 1]);
        if (!rightMissing) queue.push([right, depth + 1]);
    }
    return 0;
}`,
    java: `class Solution {
    public int minDepth(int[] tree) {
        if (tree == null || tree.length == 0 || tree[0] == -1) return 0;
        int n = tree.length;
        int[] queueIdx = new int[n * 2 + 10];
        int[] queueDepth = new int[n * 2 + 10];
        int head = 0, tail = 0;
        queueIdx[tail] = 0;
        queueDepth[tail] = 1;
        tail++;
        while (head < tail) {
            int idx = queueIdx[head];
            int depth = queueDepth[head];
            head++;
            int left = 2 * idx + 1;
            int right = 2 * idx + 2;
            boolean leftMissing = left >= n || tree[left] == -1;
            boolean rightMissing = right >= n || tree[right] == -1;
            if (leftMissing && rightMissing) return depth;
            if (!leftMissing) {
                queueIdx[tail] = left;
                queueDepth[tail] = depth + 1;
                tail++;
            }
            if (!rightMissing) {
                queueIdx[tail] = right;
                queueDepth[tail] = depth + 1;
                tail++;
            }
        }
        return 0;
    }
}
`,
    csharp: `using System.Collections.Generic;

public class Solution {
    public int MinDepth(int[] tree) {
        if (tree == null || tree.Length == 0 || tree[0] == -1) return 0;
        int n = tree.Length;
        var queue = new Queue<(int idx, int depth)>();
        queue.Enqueue((0, 1));
        while (queue.Count > 0) {
            var (idx, depth) = queue.Dequeue();
            int left = 2 * idx + 1;
            int right = 2 * idx + 2;
            bool leftMissing = left >= n || tree[left] == -1;
            bool rightMissing = right >= n || tree[right] == -1;
            if (leftMissing && rightMissing) return depth;
            if (!leftMissing) queue.Enqueue((left, depth + 1));
            if (!rightMissing) queue.Enqueue((right, depth + 1));
        }
        return 0;
    }
}`,
    c: `int minDepth(int* tree, int treeSize) {
    if (treeSize == 0 || tree[0] == -1) return 0;
    int queueIdx[2000];
    int queueDepth[2000];
    int head = 0, tail = 0;
    queueIdx[tail] = 0;
    queueDepth[tail] = 1;
    tail++;
    while (head < tail) {
        int idx = queueIdx[head];
        int depth = queueDepth[head];
        head++;
        int left = 2 * idx + 1;
        int right = 2 * idx + 2;
        int leftMissing = (left >= treeSize || tree[left] == -1);
        int rightMissing = (right >= treeSize || tree[right] == -1);
        if (leftMissing && rightMissing) return depth;
        if (!leftMissing) {
            queueIdx[tail] = left;
            queueDepth[tail] = depth + 1;
            tail++;
        }
        if (!rightMissing) {
            queueIdx[tail] = right;
            queueDepth[tail] = depth + 1;
            tail++;
        }
    }
    return 0;
}
`,
    cpp: `class Solution {
public:
    int minDepth(vector<int>& tree) {
        if (tree.empty() || tree[0] == -1) return 0;
        int n = (int)tree.size();
        queue<pair<int,int>> q;
        q.push({0, 1});
        while (!q.empty()) {
            auto [idx, depth] = q.front();
            q.pop();
            int left = 2 * idx + 1;
            int right = 2 * idx + 2;
            bool leftMissing = left >= n || tree[left] == -1;
            bool rightMissing = right >= n || tree[right] == -1;
            if (leftMissing && rightMissing) return depth;
            if (!leftMissing) q.push({left, depth + 1});
            if (!rightMissing) q.push({right, depth + 1});
        }
        return 0;
    }
};`,
  },
  editorial: `## Approach: BFS Level-Order Traversal

We perform a **breadth-first search (BFS)** starting from the root (index \`0\`). For each node we process, we compute its left child index (\`2*i+1\`) and right child index (\`2*i+2\`).

- If both children are absent (index out of bounds or value \`-1\`), the current node is a **leaf**. Since BFS visits nodes level by level, the first leaf we encounter is at the **minimum depth** — return it immediately.
- Otherwise, enqueue whichever children exist, carrying along \`depth + 1\`.

### Edge Cases
- Empty array or root \`-1\` → return \`0\`.
- Single element array → root is also a leaf → return \`1\`.

### Complexity
- **Time:** O(n) — in the worst case (a path / stick tree) we visit every node.
- **Space:** O(n) — the BFS queue holds at most O(n) entries.

The key insight is that BFS naturally finds the **shortest path** to any leaf because it explores all nodes at depth \`d\` before any node at depth \`d+1\`.`,
};

export default problem;
