import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "maximum-depth-of-a-binary-tree-encoded-as-a-level-order-int-array",
  title: "Maximum Depth of a Level-Order Encoded Binary Tree",
  difficulty: "easy",
  category: "trees-graphs",
  order: 1120,
  description: `A binary tree is encoded as a **level-order (BFS) array** of integers where:
- Index \`0\` is the root.
- For a node at index \`i\`, its left child is at index \`2*i + 1\` and its right child is at index \`2*i + 2\`.
- The value \`-1\` means **no node exists** at that position (a null placeholder).

Given this array encoding, return the **maximum depth** of the binary tree. The maximum depth is the number of nodes along the longest path from the root to the farthest leaf node.

If the array is empty or the root is \`-1\`, return \`0\`.

\`\`\`text
Example 1:
Input:  tree = [3, 9, 20, -1, -1, 15, 7]
Tree structure:
        3
       / \\
      9  20
         / \\
        15   7
Output: 3
\`\`\`

\`\`\`text
Example 2:
Input:  tree = [1, -1, 2, -1, -1, -1, 3]
Tree structure:
    1
     \\
      2
       \\
        3
Output: 3
\`\`\`

\`\`\`text
Example 3:
Input:  tree = [1]
Output: 1
\`\`\`

**Constraints:**
- \`0 <= tree.length <= 1000\`
- \`-1 <= tree[i] <= 10^4\`
- The array represents a valid level-order encoding (null nodes use \`-1\`).`,
  hints: [
    `Think about which indices in the array correspond to each depth level. Depth 1 has index 0, depth 2 has indices 1-2, depth 3 has indices 3-6, etc.`,
    `For each node at index \`i\`, its children are at \`2*i+1\` and \`2*i+2\`. A node is 'real' only if its array value is not \`-1\` AND its parent is also a real node.`,
    `Try a recursive DFS approach: define a helper that takes an index and returns the depth from that node downward. The result is \`1 + max(left_depth, right_depth)\`, but only if the current index is valid and not \`-1\`.`,
  ],
  signature: {
    "name": "maxDepth",
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
      "expected": 3,
      "hidden": false
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
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        [
          1
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
          -1,
          3,
          -1,
          -1,
          -1,
          4
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
          4,
          7,
          9
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
          4,
          -1,
          -1,
          -1,
          5
        ]
      ],
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        [
          42,
          -1,
          -1
        ]
      ],
      "expected": 1,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def max_depth(tree: list[int]) -> int:
    # TODO: implement
    return 0
`,
    javascript: `/**
 * @param {number[]} tree
 * @return {number}
 */
function maxDepth(tree) {
    // TODO: implement
    return 0;
}
`,
    java: `class Solution {
    public int maxDepth(int[] tree) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int maxDepth(int* tree, int treeSize) {
    // TODO: implement
    return 0;
}
`,
  },
  solutions: {
    python: `def max_depth(tree: list[int]) -> int:
    if not tree or tree[0] == -1:
        return 0
    n = len(tree)

    def dfs(i):
        if i >= n or tree[i] == -1:
            return 0
        return 1 + max(dfs(2 * i + 1), dfs(2 * i + 2))

    return dfs(0)
`,
    javascript: `/**
 * @param {number[]} tree
 * @return {number}
 */
function maxDepth(tree) {
    if (!tree || tree.length === 0 || tree[0] === -1) return 0;
    const n = tree.length;

    function dfs(i) {
        if (i >= n || tree[i] === -1) return 0;
        return 1 + Math.max(dfs(2 * i + 1), dfs(2 * i + 2));
    }

    return dfs(0);
}
`,
    java: `class Solution {
    private int[] tree;
    private int n;

    public int maxDepth(int[] tree) {
        if (tree == null || tree.length == 0 || tree[0] == -1) return 0;
        this.tree = tree;
        this.n = tree.length;
        return dfs(0);
    }

    private int dfs(int i) {
        if (i >= n || tree[i] == -1) return 0;
        return 1 + Math.max(dfs(2 * i + 1), dfs(2 * i + 2));
    }
}
`,
    c: `int dfsHelper(int* tree, int treeSize, int i) {
    if (i >= treeSize || tree[i] == -1) return 0;
    int left = dfsHelper(tree, treeSize, 2 * i + 1);
    int right = dfsHelper(tree, treeSize, 2 * i + 2);
    return 1 + (left > right ? left : right);
}

int maxDepth(int* tree, int treeSize) {
    if (treeSize == 0 || tree[0] == -1) return 0;
    return dfsHelper(tree, treeSize, 0);
}
`,
  },
  editorial: `## Approach: Recursive DFS on Array-Encoded Tree

### Key Insight
In a level-order encoded binary tree array, the children of node at index \`i\` are at indices \`2*i+1\` (left) and \`2*i+2\` (right). A node is absent if its array value is \`-1\` or its index is out of bounds.

### Algorithm
1. **Base case**: If the array is empty or \`tree[0] == -1\`, return \`0\`.
2. Define a recursive helper \`dfs(i)\` that returns the depth of the subtree rooted at index \`i\`:
   - If \`i >= n\` or \`tree[i] == -1\`, return \`0\` (no node here).
   - Otherwise return \`1 + max(dfs(2*i+1), dfs(2*i+2))\`.
3. Return \`dfs(0)\`.

### Why \`-1\` as null?
The array may have placeholder \`-1\` values to indicate missing children. For example, \`[1, -1, 2, -1, -1, -1, 3]\` means the root \`1\` has no left child; its right child \`2\` has no left child but has right child \`3\` at index \`6\`.

### Complexity
- **Time**: O(n) — each index is visited at most once.
- **Space**: O(n) — recursion stack in the worst case (a skewed tree).`,
};

export default problem;
