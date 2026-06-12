import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "validate-a-binary-search-tree-level-order-int-array",
  title: "Validate Binary Search Tree",
  difficulty: "medium",
  category: "trees-graphs",
  order: 1158,
  description: `Given a binary tree encoded as a **level-order integer array**, determine whether it is a valid **Binary Search Tree (BST)**.

A valid BST satisfies:
- The left subtree of a node contains only nodes with values **strictly less than** the node's value.
- The right subtree of a node contains only nodes with values **strictly greater than** the node's value.
- Both subtrees must also be valid BSTs.

The tree is encoded as a level-order (BFS) array where \`-1001\` represents a null node. For a node at index \`i\`, its left child is at index \`2i+1\` and its right child is at \`2i+2\`.

\`\`\`text
Example 1:
Input:  tree = [2, 1, 3]
Output: true
Explanation:    2
               / \\
              1   3     — 1 < 2 < 3 ✓

Example 2:
Input:  tree = [5, 1, 4, -1001, -1001, 3, 6]
Output: false
Explanation:    5
               / \\
              1   4     — right child 4 < 5, invalid
                 / \\
                3   6
\`\`\`

**Constraints:**
- \`0 <= tree.length <= 1000\`
- \`-1000 <= tree[i] <= 1000\` (use \`-1001\` as the null sentinel)
- Node values are unique within the tree.`,
  hints: [
    `Sorting alone isn't enough — a BST requires every node in the *left subtree* to be less than the current node, not just the immediate child.`,
    `Think about passing a valid range \`(min, max)\` down the tree: a node's value must fall strictly inside that range, and the range tightens as you go deeper.`,
    `For the root, the range is \`(-infinity, +infinity)\`. When you recurse left, the upper bound becomes the current node's value. When you recurse right, the lower bound becomes the current node's value.`,
    `In the level-order encoding, the left child of index \`i\` is at \`2*i+1\` and the right child is at \`2*i+2\`. A node is null if it equals \`-1001\` or its index is out of bounds.`,
  ],
  signature: {
    name: "isValidBST",
    params: [{ name: "tree", type: "int[]" }],
    returns: "bool",
  },
  testCases: [
    {
      input: [[2, 1, 3]],
      expected: true,
      hidden: false,
    },
    {
      input: [[5, 1, 4, -1001, -1001, 3, 6]],
      expected: false,
      hidden: false,
    },
    {
      input: [[1]],
      expected: true,
      hidden: false,
    },
    {
      input: [[]],
      expected: true,
      hidden: true,
    },
    {
      input: [[2, 2, 2]],
      expected: false,
      hidden: true,
    },
    {
      input: [[5, 4, 6, -1001, -1001, 3, 7]],
      expected: false,
      hidden: true,
    },
    {
      input: [[10, 5, 15, -1001, -1001, 6, 20]],
      expected: false,
      hidden: true,
    },
    {
      input: [[8, 3, 10, 1, 6, -1001, 14, -1001, -1001, 4, 7]],
      expected: true,
      hidden: true,
    },
    {
      input: [[3, 1, 5, -1001, 2]],
      expected: true,
      hidden: true,
    },
    {
      input: [[0, -3, 5, -4, -1, -1001, 9]],
      expected: true,
      hidden: true,
    },
  ],
  starterCode: {
    python: `def is_valid_bst(tree):
    # TODO: implement
    return False
`,
    javascript: `function isValidBST(tree) {
    // TODO: implement
    return false;
}
`,
    java: `class Solution {
    public boolean isValidBST(int[] tree) {
        // TODO: implement
        return false;
    }
}
`,
    c: `int isValidBST(int* tree, int treeSize) {
    // TODO: implement
    return 0;
}
`,
  },
  solutions: {
    python: `def is_valid_bst(tree):
    if not tree:
        return True
    def dfs(i, min_val, max_val):
        if i >= len(tree) or tree[i] == -1001:
            return True
        val = tree[i]
        if val <= min_val or val >= max_val:
            return False
        return dfs(2 * i + 1, min_val, val) and dfs(2 * i + 2, val, max_val)
    return dfs(0, float('-inf'), float('inf'))
`,
    javascript: `function isValidBST(tree) {
    if (tree.length === 0) return true;
    function dfs(i, minVal, maxVal) {
        if (i >= tree.length || tree[i] === -1001) return true;
        const val = tree[i];
        if (val <= minVal || val >= maxVal) return false;
        return dfs(2 * i + 1, minVal, val) && dfs(2 * i + 2, val, maxVal);
    }
    return dfs(0, -Infinity, Infinity);
}
`,
    java: `class Solution {
    private int[] tree;

    public boolean isValidBST(int[] tree) {
        this.tree = tree;
        if (tree.length == 0) return true;
        return dfs(0, Long.MIN_VALUE, Long.MAX_VALUE);
    }

    private boolean dfs(int i, long min, long max) {
        if (i >= tree.length || tree[i] == -1001) return true;
        long val = tree[i];
        if (val <= min || val >= max) return false;
        return dfs(2 * i + 1, min, val) && dfs(2 * i + 2, val, max);
    }
}
`,
    c: `#include <limits.h>

static int* g_tree;
static int g_size;

static int dfs(int i, long long min_val, long long max_val) {
    if (i >= g_size || g_tree[i] == -1001) return 1;
    long long val = g_tree[i];
    if (val <= min_val || val >= max_val) return 0;
    return dfs(2 * i + 1, min_val, val) && dfs(2 * i + 2, val, max_val);
}

int isValidBST(int* tree, int treeSize) {
    if (treeSize == 0) return 1;
    g_tree = tree;
    g_size = treeSize;
    return dfs(0, LLONG_MIN, LLONG_MAX);
}
`,
  },
  editorial: `## Approach: DFS with Valid Range Propagation

### Key Insight
Checking only the immediate parent-child relationship is not enough. For example, \`[10, 5, 15, -1001, -1001, 6, 20]\` looks locally valid (6 < 15) but is globally invalid because 6 is in the right subtree of 10, so it must be > 10.

The fix: propagate a **(min, max)** range down the tree. Each node must fall strictly inside its range, and the range tightens at every step.

### Algorithm
\`\`\`text
dfs(index, min, max):
  if index out of bounds or tree[index] == -1001 (null): return true
  if tree[index] <= min or tree[index] >= max: return false
  left  = dfs(2*index+1, min,            tree[index])
  right = dfs(2*index+2, tree[index],    max)
  return left AND right
\`\`\`

Initial call: \`dfs(0, -∞, +∞)\`

### Level-Order Encoding
| Node index | Left child | Right child |
|---|---|---|
| i | 2i + 1 | 2i + 2 |

A node is null if its value is \`-1001\` or its index exceeds the array length.

### Complexity
- **Time:** O(n) — each node visited once
- **Space:** O(h) call stack, where h is the tree height (O(log n) balanced, O(n) worst case)`,
};

export default problem;
