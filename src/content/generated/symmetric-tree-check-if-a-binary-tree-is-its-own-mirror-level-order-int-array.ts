import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "symmetric-tree-check-if-a-binary-tree-is-its-own-mirror-level-order-int-array",
  title: "Symmetric Tree",
  difficulty: "easy",
  category: "trees-graphs",
  order: 1125,
  description: `A binary tree is represented as a **level-order** (BFS) array of integers where \`-1\` denotes a missing node (null).

Given such an array \`tree\`, return \`true\` if the binary tree is **symmetric** around its center (i.e., it is a mirror of itself), and \`false\` otherwise.

\`\`\`text
Example 1:
Input:  tree = [1, 2, 2, 3, 4, 4, 3]
Tree:
        1
       / \\
      2   2
     / \\ / \\
    3  4 4  3
Output: true
\`\`\`

\`\`\`text
Example 2:
Input:  tree = [1, 2, 2, -1, 3, -1, 3]
Tree:
        1
       / \\
      2   2
       \\    \\
        3    3
Output: false
\`\`\`

\`\`\`text
Example 3:
Input:  tree = [1]
Output: true
\`\`\`

**Constraints:**
- \`1 <= tree.length <= 1023\`
- \`-1000 <= tree[i] <= 1000\` (use \`-1\` exclusively to denote null/missing nodes)
- The array length is always of the form \`2^k - 1\` for some \`k >= 1\` (a complete level representation)
- The root is never \`-1\``,
  hints: [
    `Think recursively: a tree is symmetric if the left subtree is a mirror of the right subtree.`,
    `Two subtrees are mirrors if their roots are equal and each subtree's left child mirrors the other's right child (and vice versa).`,
    `In the level-order array, the left child of node at index \`i\` is at \`2*i+1\` and the right child is at \`2*i+2\`. You can write a recursive helper \`isMirror(i, j)\` that compares the subtrees rooted at indices \`i\` and \`j\`.`,
  ],
  signature: {
    "name": "isSymmetric",
    "params": [
      {
        "name": "tree",
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
          2,
          3,
          4,
          4,
          3
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
          2,
          -1,
          3,
          -1,
          3
        ]
      ],
      "expected": false,
      "hidden": false
    },
    {
      "input": [
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
          2,
          2,
          -1,
          -1,
          -1,
          -1
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
        ]
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        [
          5,
          5,
          5,
          5,
          -1,
          -1,
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
          2,
          3,
          -1,
          -1,
          3
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
          2,
          3,
          4,
          3,
          4
        ]
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        [
          7,
          7,
          7,
          7,
          7,
          7,
          7,
          7,
          7,
          7,
          7,
          7,
          7,
          7,
          7
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
          2,
          -1,
          3,
          3,
          -1
        ]
      ],
      "expected": true,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def is_symmetric(tree: list[int]) -> bool:
    # TODO: implement
    return False
`,
    javascript: `/**
 * @param {number[]} tree
 * @return {boolean}
 */
function isSymmetric(tree) {
    // TODO: implement
    return false;
}
`,
    typescript: `/**
 * @param {number[]} tree
 * @return {boolean}
 */
function isSymmetric(tree: number[]): boolean {
    // TODO: implement
    return false;
}`,
    java: `class Solution {
    public boolean isSymmetric(int[] tree) {
        // TODO: implement
        return false;
    }
}
`,
    csharp: `public class Solution {
    public bool IsSymmetric(int[] tree) {
        // TODO: implement
        return false;
    }
}`,
    c: `#include <stdbool.h>
bool isSymmetric(int* tree, int treeSize) {
    // TODO: implement
    return false;
}
`,
    cpp: `class Solution {
public:
    bool isSymmetric(vector<int>& tree) {
        // TODO: implement
        return false;
    }
};`,
  },
  solutions: {
    python: `def is_symmetric(tree: list[int]) -> bool:
    n = len(tree)

    def is_mirror(i, j):
        i_null = i >= n or tree[i] == -1
        j_null = j >= n or tree[j] == -1
        if i_null and j_null:
            return True
        if i_null or j_null:
            return False
        if tree[i] != tree[j]:
            return False
        return is_mirror(2*i+1, 2*j+2) and is_mirror(2*i+2, 2*j+1)

    if n == 0:
        return True
    return is_mirror(1, 2)
`,
    javascript: `/**
 * @param {number[]} tree
 * @return {boolean}
 */
function isSymmetric(tree) {
    const n = tree.length;

    function isMirror(i, j) {
        const iNull = i >= n || tree[i] === -1;
        const jNull = j >= n || tree[j] === -1;
        if (iNull && jNull) return true;
        if (iNull || jNull) return false;
        if (tree[i] !== tree[j]) return false;
        return isMirror(2*i+1, 2*j+2) && isMirror(2*i+2, 2*j+1);
    }

    if (n === 0) return true;
    return isMirror(1, 2);
}
`,
    typescript: `function isSymmetric(tree: number[]): boolean {
    const n = tree.length;

    function isMirror(i: number, j: number): boolean {
        const iNull = i >= n || tree[i] === -1;
        const jNull = j >= n || tree[j] === -1;
        if (iNull && jNull) return true;
        if (iNull || jNull) return false;
        if (tree[i] !== tree[j]) return false;
        return isMirror(2*i+1, 2*j+2) && isMirror(2*i+2, 2*j+1);
    }

    if (n === 0) return true;
    return isMirror(1, 2);
}`,
    java: `class Solution {
    private int[] tree;
    private int n;

    private boolean isMirror(int i, int j) {
        boolean iNull = i >= n || tree[i] == -1;
        boolean jNull = j >= n || tree[j] == -1;
        if (iNull && jNull) return true;
        if (iNull || jNull) return false;
        if (tree[i] != tree[j]) return false;
        return isMirror(2*i+1, 2*j+2) && isMirror(2*i+2, 2*j+1);
    }

    public boolean isSymmetric(int[] tree) {
        this.tree = tree;
        this.n = tree.length;
        if (n == 0) return true;
        return isMirror(1, 2);
    }
}
`,
    csharp: `public class Solution {
    private int[] tree;
    private int n;

    private bool IsMirror(int i, int j) {
        bool iNull = i >= n || tree[i] == -1;
        bool jNull = j >= n || tree[j] == -1;
        if (iNull && jNull) return true;
        if (iNull || jNull) return false;
        if (tree[i] != tree[j]) return false;
        return IsMirror(2*i+1, 2*j+2) && IsMirror(2*i+2, 2*j+1);
    }

    public bool IsSymmetric(int[] tree) {
        this.tree = tree;
        this.n = tree.Length;
        if (n == 0) return true;
        return IsMirror(1, 2);
    }
}`,
    c: `#include <stdbool.h>

static int* g_tree;
static int g_n;

static bool isMirror(int i, int j) {
    int iNull = (i >= g_n || g_tree[i] == -1);
    int jNull = (j >= g_n || g_tree[j] == -1);
    if (iNull && jNull) return true;
    if (iNull || jNull) return false;
    if (g_tree[i] != g_tree[j]) return false;
    return isMirror(2*i+1, 2*j+2) && isMirror(2*i+2, 2*j+1);
}

bool isSymmetric(int* tree, int treeSize) {
    g_tree = tree;
    g_n = treeSize;
    if (treeSize == 0) return true;
    return isMirror(1, 2);
}
`,
    cpp: `class Solution {
private:
    vector<int>* tree;
    int n;

    bool isMirror(int i, int j) {
        bool iNull = i >= n || (*tree)[i] == -1;
        bool jNull = j >= n || (*tree)[j] == -1;
        if (iNull && jNull) return true;
        if (iNull || jNull) return false;
        if ((*tree)[i] != (*tree)[j]) return false;
        return isMirror(2*i+1, 2*j+2) && isMirror(2*i+2, 2*j+1);
    }

public:
    bool isSymmetric(vector<int>& tree) {
        this->tree = &tree;
        this->n = (int)tree.size();
        if (n == 0) return true;
        return isMirror(1, 2);
    }
};`,
  },
  editorial: `## Approach: Recursive Mirror Check

### Intuition
A tree is symmetric if and only if its left subtree is a **mirror** of its right subtree. Two subtrees are mirrors of each other when:
1. Both roots are null (or \`-1\` in our encoding) — trivially a mirror.
2. Exactly one root is null — **not** a mirror.
3. Both roots have the **same value**, and the left child of one mirrors the right child of the other.

### Level-Order Array Indexing
For a node at index \`i\` (0-based), its children are at \`2*i+1\` (left) and \`2*i+2\` (right). A node is absent if its index is out of bounds or its value is \`-1\`.

We call \`isMirror(1, 2)\` — comparing the root's left child (index 1) against the root's right child (index 2).

### Algorithm
\`\`\`
isMirror(i, j):
  if both i and j are null → return true
  if only one is null      → return false
  if tree[i] ≠ tree[j]    → return false
  return isMirror(left(i), right(j)) AND isMirror(right(i), left(j))
\`\`\`

### Complexity
- **Time:** O(n) — each node is visited at most once.
- **Space:** O(log n) — recursion depth equals tree height; the input is a complete level representation so height is O(log n).`,
};

export default problem;
