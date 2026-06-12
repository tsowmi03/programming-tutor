import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "path-sum-check-if-any-root-to-leaf-path-sums-to-a-target-level-order-encoding",
  title: "Path Sum: Root-to-Leaf Target",
  difficulty: "easy",
  category: "trees-graphs",
  order: 1124,
  description: `You are given a binary tree encoded as a **level-order (BFS) array** and an integer \`target\`.

In the level-order encoding:
- The root is at index \`0\`.
- For a node at index \`i\`, its left child is at index \`2*i + 1\` and its right child is at index \`2*i + 2\`.
- A value of \`-1\` means the node is **null** (absent).

Return \`true\` if there exists **any root-to-leaf path** whose node values sum to exactly \`target\`, otherwise return \`false\`.

A **leaf** is a node that has no children (both left and right children are null/absent).

\`\`\`text
Example 1:
Tree (level-order): [5, 4, 8, 11, -1, 13, 4, 7, 2, -1, -1, -1, -1, -1, 1]
Target: 22

        5
       / \\
      4   8
     /   / \\
    11  13   4
   /  \\       \\
  7    2       1

Path 5 → 4 → 11 → 2 sums to 22 → true
\`\`\`

\`\`\`text
Example 2:
Tree (level-order): [1, 2, 3]
Target: 5

    1
   / \\
  2   3

Paths: 1+2=3, 1+3=4. Neither equals 5 → false
\`\`\`

\`\`\`text
Example 3:
Tree (level-order): [-1]
Target: 0

Empty tree → false
\`\`\`

**Constraints:**
- \`1 <= tree.length <= 1023\` (fits at most 10 levels)
- \`-100 <= tree[i] <= 100\` (node values; \`-1\` means null)
- \`-1000 <= target <= 1000\``,
  hints: [
    `Think about how to traverse the tree using the index relationships: left child = 2*i+1, right child = 2*i+2.`,
    `Use a recursive DFS (or an explicit stack) carrying the running sum along each path. When do you know you've reached a leaf?`,
    `A node is a leaf when both its left child index (2*i+1) and right child index (2*i+2) are either out of bounds or hold -1.`,
  ],
  signature: {
    "name": "pathSum",
    "params": [
      {
        "name": "tree",
        "type": "int[]"
      },
      {
        "name": "target",
        "type": "int"
      }
    ],
    "returns": "bool",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        [
          5,
          4,
          8,
          11,
          -1,
          13,
          4,
          7,
          2,
          -1,
          -1,
          -1,
          -1,
          -1,
          1
        ],
        22
      ],
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          2,
          3
        ],
        5
      ],
      "expected": false,
      "hidden": false
    },
    {
      "input": [
        [
          -1
        ],
        0
      ],
      "expected": false,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          2,
          3
        ],
        4
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          1
        ],
        1
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          1
        ],
        0
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        [
          5,
          4,
          8,
          11,
          -1,
          13,
          4,
          7,
          2,
          -1,
          -1,
          -1,
          -1,
          -1,
          1
        ],
        26
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          -5,
          -3,
          -2,
          -1,
          -1,
          -1,
          -1
        ],
        -8
      ],
      "expected": true,
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
        ],
        6
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          0,
          -1,
          0
        ],
        0
      ],
      "expected": true,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def path_sum(tree: list[int], target: int) -> bool:
    # TODO: implement
    return False
`,
    javascript: `/**
 * @param {number[]} tree
 * @param {number} target
 * @return {boolean}
 */
function pathSum(tree, target) {
    // TODO: implement
    return false;
}
`,
    typescript: `function pathSum(tree: number[], target: number): boolean {
    // TODO: implement
    return false;
}`,
    java: `class Solution {
    public boolean pathSum(int[] tree, int target) {
        // TODO: implement
        return false;
    }
}
`,
    csharp: `public class Solution {
    public bool PathSum(int[] tree, int target) {
        // TODO: implement
        return false;
    }
}`,
    c: `#include <stdbool.h>
bool pathSum(int* tree, int treeSize, int target) {
    // TODO: implement
    return false;
}
`,
    cpp: `class Solution {
public:
    bool pathSum(vector<int>& tree, int target) {
        // TODO: implement
        return false;
    }
};`,
  },
  solutions: {
    python: `def path_sum(tree: list[int], target: int) -> bool:
    n = len(tree)
    if n == 0 or tree[0] == -1:
        return False

    def dfs(i, current_sum):
        if i >= n or tree[i] == -1:
            return False
        current_sum += tree[i]
        left = 2 * i + 1
        right = 2 * i + 2
        # Check if leaf
        left_null = (left >= n or tree[left] == -1)
        right_null = (right >= n or tree[right] == -1)
        if left_null and right_null:
            return current_sum == target
        return dfs(left, current_sum) or dfs(right, current_sum)

    return dfs(0, 0)
`,
    javascript: `function pathSum(tree, target) {
    const n = tree.length;
    if (n === 0 || tree[0] === -1) return false;

    function dfs(i, currentSum) {
        if (i >= n || tree[i] === -1) return false;
        currentSum += tree[i];
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        const leftNull = (left >= n || tree[left] === -1);
        const rightNull = (right >= n || tree[right] === -1);
        if (leftNull && rightNull) {
            return currentSum === target;
        }
        return dfs(left, currentSum) || dfs(right, currentSum);
    }

    return dfs(0, 0);
}
`,
    typescript: `function pathSum(tree: number[], target: number): boolean {
    const n = tree.length;
    if (n === 0 || tree[0] === -1) return false;

    function dfs(i: number, currentSum: number): boolean {
        if (i >= n || tree[i] === -1) return false;
        currentSum += tree[i];
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        const leftNull = (left >= n || tree[left] === -1);
        const rightNull = (right >= n || tree[right] === -1);
        if (leftNull && rightNull) {
            return currentSum === target;
        }
        return dfs(left, currentSum) || dfs(right, currentSum);
    }

    return dfs(0, 0);
}`,
    java: `class Solution {
    private int[] tree;
    private int n;
    private int target;

    public boolean pathSum(int[] tree, int target) {
        this.tree = tree;
        this.n = tree.length;
        this.target = target;
        if (n == 0 || tree[0] == -1) return false;
        return dfs(0, 0);
    }

    private boolean dfs(int i, int currentSum) {
        if (i >= n || tree[i] == -1) return false;
        currentSum += tree[i];
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        boolean leftNull = (left >= n || tree[left] == -1);
        boolean rightNull = (right >= n || tree[right] == -1);
        if (leftNull && rightNull) {
            return currentSum == target;
        }
        return dfs(left, currentSum) || dfs(right, currentSum);
    }
}
`,
    csharp: `public class Solution {
    private int[] tree;
    private int n;
    private int target;

    public bool PathSum(int[] tree, int target) {
        this.tree = tree;
        this.n = tree.Length;
        this.target = target;
        if (n == 0 || tree[0] == -1) return false;
        return Dfs(0, 0);
    }

    private bool Dfs(int i, int currentSum) {
        if (i >= n || tree[i] == -1) return false;
        currentSum += tree[i];
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        bool leftNull = (left >= n || tree[left] == -1);
        bool rightNull = (right >= n || tree[right] == -1);
        if (leftNull && rightNull) {
            return currentSum == target;
        }
        return Dfs(left, currentSum) || Dfs(right, currentSum);
    }
}`,
    c: `#include <stdbool.h>

static int* g_tree;
static int g_n;
static int g_target;

static bool dfs(int i, int currentSum) {
    if (i >= g_n || g_tree[i] == -1) return false;
    currentSum += g_tree[i];
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    int leftNull = (left >= g_n || g_tree[left] == -1);
    int rightNull = (right >= g_n || g_tree[right] == -1);
    if (leftNull && rightNull) {
        return currentSum == g_target;
    }
    return dfs(left, currentSum) || dfs(right, currentSum);
}

bool pathSum(int* tree, int treeSize, int target) {
    if (treeSize == 0 || tree[0] == -1) return false;
    g_tree = tree;
    g_n = treeSize;
    g_target = target;
    return dfs(0, 0);
}
`,
    cpp: `class Solution {
public:
    bool pathSum(vector<int>& tree, int target) {
        int n = (int)tree.size();
        if (n == 0 || tree[0] == -1) return false;
        return dfs(tree, n, target, 0, 0);
    }

private:
    bool dfs(vector<int>& tree, int n, int target, int i, int currentSum) {
        if (i >= n || tree[i] == -1) return false;
        currentSum += tree[i];
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        bool leftNull = (left >= n || tree[left] == -1);
        bool rightNull = (right >= n || tree[right] == -1);
        if (leftNull && rightNull) {
            return currentSum == target;
        }
        return dfs(tree, n, target, left, currentSum) || dfs(tree, n, target, right, currentSum);
    }
};`,
  },
  editorial: `## Approach: DFS on Array-Encoded Tree

### Key Insight
The level-order encoding maps parent-child relationships via index arithmetic:
- Node at index \`i\` has left child at \`2*i + 1\` and right child at \`2*i + 2\`.
- A node is **null** if its index is out of bounds or its value is \`-1\`.
- A node is a **leaf** if both its left and right children are null.

### Algorithm
1. If the tree is empty or the root is \`-1\`, return \`false\`.
2. Run a recursive DFS starting from index \`0\` with a running sum of \`0\`.
3. At each node:
   - Add the node's value to the running sum.
   - If the node is a leaf, check whether \`running_sum == target\`.
   - Otherwise, recurse into non-null children and return \`true\` if either subtree finds a valid path.

### Complexity
- **Time:** O(n) — each node is visited at most once.
- **Space:** O(h) where h is the tree height (recursion stack). In the worst case (skewed tree) O(n), but typically O(log n) for balanced trees.

### Edge Cases
- Empty or null root → \`false\`.
- Single-node tree → check if that node's value equals \`target\`.
- Negative values are handled naturally since we just accumulate the sum.
`,
};

export default problem;
