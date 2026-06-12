import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-leaf-nodes-in-a-binary-tree-encoded-as-a-level-order-int-array",
  title: "Count Leaf Nodes in a Binary Tree",
  difficulty: "easy",
  category: "trees-graphs",
  order: 1127,
  description: `You are given a binary tree encoded as a **level-order (BFS) array** of integers.

- The root is at index \`0\`.
- For a node at index \`i\`, its left child is at index \`2*i + 1\` and its right child is at index \`2*i + 2\`.
- A value of \`-1\` means **no node** exists at that position (null).

A **leaf node** is a node that exists (value ≠ -1) **and** has no children (both children are either out of bounds or equal to \`-1\`).

Return the **number of leaf nodes** in the tree.

If the array is empty, return \`0\`.

\`\`\`text
Example 1:
Input:  tree = [1, 2, 3, 4, 5, -1, 7]

        1
       / \\
      2   3
     / \\   \\
    4   5   7

Leaves: 4, 5, 7  →  Output: 3
\`\`\`

\`\`\`text
Example 2:
Input:  tree = [1, 2, -1, 4, -1]

        1
       /
      2
     /
    4

Leaves: 4  →  Output: 1
\`\`\`

\`\`\`text
Example 3:
Input:  tree = [42]
Leaves: 42  →  Output: 1
\`\`\`

**Constraints:**
- \`0 <= tree.length <= 1000\`
- \`-1\` is used exclusively as the null sentinel; all real node values satisfy \`0 <= value <= 10^4\`.
`,
  hints: [
    `Iterate over every index i in the array. If tree[i] == -1, skip it — that position has no node.`,
    `For a node at index i to be a leaf, both its left child (index 2*i+1) and right child (index 2*i+2) must be absent: either out of bounds or equal to -1.`,
    `Count all indices that satisfy the leaf condition and return that count.`,
  ],
  signature: {
    "name": "countLeafNodes",
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
          1,
          2,
          3,
          4,
          5,
          -1,
          7
        ]
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          2,
          -1,
          4,
          -1
        ]
      ],
      "expected": 1,
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
          1,
          2,
          3
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
          3,
          4,
          5,
          6,
          7
        ]
      ],
      "expected": 4,
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
      "expected": 1,
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
          9,
          -1,
          2
        ]
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        [
          10,
          10,
          10,
          10,
          10,
          10,
          10
        ]
      ],
      "expected": 4,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_leaf_nodes(tree: list[int]) -> int:
    # TODO: implement
    return 0
`,
    javascript: `/**
 * @param {number[]} tree
 * @return {number}
 */
function countLeafNodes(tree) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function countLeafNodes(tree: number[]): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int countLeafNodes(int[] tree) {
        // TODO: implement
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int CountLeafNodes(int[] tree) {
        // TODO: implement
        return 0;
    }
}`,
    c: `#include <stdlib.h>
int countLeafNodes(int* tree, int treeSize) {
    // TODO: implement
    return 0;
}
`,
    cpp: `class Solution {
public:
    int countLeafNodes(vector<int>& tree) {
        // TODO: implement
        return 0;
    }
};`,
  },
  solutions: {
    python: `def count_leaf_nodes(tree: list[int]) -> int:
    n = len(tree)
    count = 0
    for i in range(n):
        if tree[i] == -1:
            continue
        left = 2 * i + 1
        right = 2 * i + 2
        left_absent = left >= n or tree[left] == -1
        right_absent = right >= n or tree[right] == -1
        if left_absent and right_absent:
            count += 1
    return count
`,
    javascript: `/**
 * @param {number[]} tree
 * @return {number}
 */
function countLeafNodes(tree) {
    const n = tree.length;
    let count = 0;
    for (let i = 0; i < n; i++) {
        if (tree[i] === -1) continue;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        const leftAbsent = left >= n || tree[left] === -1;
        const rightAbsent = right >= n || tree[right] === -1;
        if (leftAbsent && rightAbsent) count++;
    }
    return count;
}
`,
    typescript: `function countLeafNodes(tree: number[]): number {
    const n = tree.length;
    let count = 0;
    for (let i = 0; i < n; i++) {
        if (tree[i] === -1) continue;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        const leftAbsent = left >= n || tree[left] === -1;
        const rightAbsent = right >= n || tree[right] === -1;
        if (leftAbsent && rightAbsent) count++;
    }
    return count;
}`,
    java: `class Solution {
    public int countLeafNodes(int[] tree) {
        int n = tree.length;
        int count = 0;
        for (int i = 0; i < n; i++) {
            if (tree[i] == -1) continue;
            int left = 2 * i + 1;
            int right = 2 * i + 2;
            boolean leftAbsent = left >= n || tree[left] == -1;
            boolean rightAbsent = right >= n || tree[right] == -1;
            if (leftAbsent && rightAbsent) count++;
        }
        return count;
    }
}
`,
    csharp: `public class Solution {
    public int CountLeafNodes(int[] tree) {
        int n = tree.Length;
        int count = 0;
        for (int i = 0; i < n; i++) {
            if (tree[i] == -1) continue;
            int left = 2 * i + 1;
            int right = 2 * i + 2;
            bool leftAbsent = left >= n || tree[left] == -1;
            bool rightAbsent = right >= n || tree[right] == -1;
            if (leftAbsent && rightAbsent) count++;
        }
        return count;
    }
}`,
    c: `#include <stdlib.h>
int countLeafNodes(int* tree, int treeSize) {
    int count = 0;
    for (int i = 0; i < treeSize; i++) {
        if (tree[i] == -1) continue;
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        int leftAbsent = (left >= treeSize || tree[left] == -1);
        int rightAbsent = (right >= treeSize || tree[right] == -1);
        if (leftAbsent && rightAbsent) count++;
    }
    return count;
}
`,
    cpp: `class Solution {
public:
    int countLeafNodes(vector<int>& tree) {
        int n = tree.size();
        int count = 0;
        for (int i = 0; i < n; i++) {
            if (tree[i] == -1) continue;
            int left = 2 * i + 1;
            int right = 2 * i + 2;
            bool leftAbsent = left >= n || tree[left] == -1;
            bool rightAbsent = right >= n || tree[right] == -1;
            if (leftAbsent && rightAbsent) count++;
        }
        return count;
    }
};`,
  },
  editorial: `## Approach: Linear Scan on the Level-Order Array

### Key Observations
1. The tree is stored as a flat array using the standard heap-index encoding: node \`i\` has children at \`2i+1\` (left) and \`2i+2\` (right).
2. A node is **present** if its value ≠ \`-1\`.
3. A present node is a **leaf** when *both* of its child slots are absent — either the index falls outside the array bounds, or the value stored there is \`-1\`.

### Algorithm
\`\`\`
count = 0
for i in 0 .. n-1:
    if tree[i] == -1: skip          # no node here
    left  = 2*i + 1
    right = 2*i + 2
    if (left  >= n or tree[left]  == -1) and
       (right >= n or tree[right] == -1):
        count++
return count
\`\`\`

### Why this works
Every node in the encoded tree corresponds to exactly one array index. Checking the child indices directly tells us whether a node has children without needing to build an explicit tree structure.

### Complexity
- **Time:** O(n) — single pass over the array.
- **Space:** O(1) — only a counter is maintained.
`,
};

export default problem;
