import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "number-of-islands-in-a-grid-int-of-0s-and-1s",
  title: "Number of Islands",
  difficulty: "medium",
  category: "trees-graphs",
  order: 1128,
  description: `Given a 2D grid of \`1\`s (land) and \`0\`s (water) encoded as integers, count the number of **islands**.

An island is surrounded by water and is formed by connecting adjacent land cells **horizontally or vertically**. You may assume all four edges of the grid are surrounded by water.

The grid is passed as a flat \`int[]\` in row-major order, and \`dims\` is a 2-element array where \`dims[0]\` = number of rows and \`dims[1]\` = number of columns.

\`\`\`text
Example 1:
Input:
  grid = [1,1,1,1,0,
          1,1,0,1,0,
          1,1,0,0,0,
          0,0,0,0,0],  dims = [4,5]
Output: 1
Explanation: All 1s are connected, forming one island.
\`\`\`

\`\`\`text
Example 2:
Input:
  grid = [1,1,0,0,0,
          1,1,0,0,0,
          0,0,1,0,0,
          0,0,0,1,1],  dims = [4,5]
Output: 3
Explanation: There are three separate islands.
\`\`\`

**Constraints:**
- \`1 <= rows, cols <= 50\`
- \`grid[i][j]\` is either \`0\` or \`1\`
- \`grid\` has exactly \`dims[0] * dims[1]\` elements.`,
  hints: [
    `Think of each land cell (1) as a node. Two adjacent land cells (horizontally or vertically) share an edge. The problem reduces to counting connected components.`,
    `When you find an unvisited land cell, start a DFS or BFS to mark all reachable land cells as visited, then increment your island count by 1.`,
    `You can avoid a separate visited array by modifying a copy of the grid in place — change a visited land cell from 1 to 0 as you explore.`,
  ],
  signature: {
    "name": "numIslands",
    "params": [
      {
        "name": "grid",
        "type": "int[]"
      },
      {
        "name": "dims",
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
          1,
          1,
          1,
          0,
          1,
          1,
          0,
          1,
          0,
          1,
          1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        [
          4,
          5
        ]
      ],
      "expected": 1,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          1,
          0,
          0,
          0,
          1,
          1,
          0,
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          0,
          1,
          1
        ],
        [
          4,
          5
        ]
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        [
          1
        ],
        [
          1,
          1
        ]
      ],
      "expected": 1,
      "hidden": false
    },
    {
      "input": [
        [
          0
        ],
        [
          1,
          1
        ]
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1
        ],
        [
          5,
          5
        ]
      ],
      "expected": 13,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1
        ],
        [
          3,
          3
        ]
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        [
          3,
          3
        ]
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          1
        ],
        [
          3,
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
          1,
          0,
          1,
          1,
          0,
          0,
          0,
          0,
          1,
          0,
          1,
          1,
          0,
          1,
          0,
          0,
          0,
          1,
          0,
          1,
          1,
          0,
          1,
          1
        ],
        [
          5,
          5
        ]
      ],
      "expected": 5,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def num_islands(grid: list[int], dims: list[int]) -> int:
    # TODO: implement
    return 0
`,
    javascript: `/**
 * @param {number[]} grid
 * @param {number[]} dims
 * @return {number}
 */
function numIslands(grid, dims) {
    // TODO: implement
    return 0;
}
`,
    java: `class Solution {
    public int numIslands(int[] grid, int[] dims) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int numIslands(int* grid, int gridSize, int* dims, int dimsSize) {
    // TODO: implement
    return 0;
}
`,
  },
  solutions: {
    python: `def num_islands(grid: list[int], dims: list[int]) -> int:
    rows, cols = dims[0], dims[1]
    g = list(grid)

    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols:
            return
        if g[r * cols + c] != 1:
            return
        g[r * cols + c] = 0
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    count = 0
    for r in range(rows):
        for c in range(cols):
            if g[r * cols + c] == 1:
                dfs(r, c)
                count += 1
    return count
`,
    javascript: `function numIslands(grid, dims) {
    const rows = dims[0];
    const cols = dims[1];
    const g = grid.slice();

    function dfs(r, c) {
        if (r < 0 || r >= rows || c < 0 || c >= cols) return;
        if (g[r * cols + c] !== 1) return;
        g[r * cols + c] = 0;
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }

    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (g[r * cols + c] === 1) {
                dfs(r, c);
                count++;
            }
        }
    }
    return count;
}
`,
    java: `class Solution {
    private int[] g;
    private int rows, cols;

    public int numIslands(int[] grid, int[] dims) {
        rows = dims[0];
        cols = dims[1];
        g = grid.clone();
        int count = 0;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (g[r * cols + c] == 1) {
                    dfs(r, c);
                    count++;
                }
            }
        }
        return count;
    }

    private void dfs(int r, int c) {
        if (r < 0 || r >= rows || c < 0 || c >= cols) return;
        if (g[r * cols + c] != 1) return;
        g[r * cols + c] = 0;
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }
}
`,
    c: `#include <stdlib.h>
#include <string.h>

static int* sg;
static int srows, scols;

static void dfs(int r, int c) {
    if (r < 0 || r >= srows || c < 0 || c >= scols) return;
    if (sg[r * scols + c] != 1) return;
    sg[r * scols + c] = 0;
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
}

int numIslands(int* grid, int gridSize, int* dims, int dimsSize) {
    srows = dims[0];
    scols = dims[1];
    int total = srows * scols;
    sg = (int*)malloc(total * sizeof(int));
    memcpy(sg, grid, total * sizeof(int));
    int count = 0;
    for (int r = 0; r < srows; r++) {
        for (int c = 0; c < scols; c++) {
            if (sg[r * scols + c] == 1) {
                dfs(r, c);
                count++;
            }
        }
    }
    free(sg);
    return count;
}
`,
  },
  editorial: `## Approach: DFS Flood Fill

### Intuition
The grid can be viewed as a graph where each land cell (\`1\`) is a node connected to its horizontal and vertical neighbors. Counting islands is equivalent to counting **connected components** in this graph.

### Algorithm
1. Iterate over every cell \`(r, c)\` in the grid.
2. When a land cell (\`1\`) is found, increment the island counter and launch a **DFS** from that cell.
3. During DFS, mark each visited land cell as \`0\` (water) to prevent revisiting.
4. The DFS explores all four directions (up, down, left, right) recursively.

Because the grid is encoded as a flat \`int[]\`, the 2D index \`(r, c)\` maps to the 1D index \`r * cols + c\`.

### Complexity
- **Time:** O(R × C) — each cell is visited at most once.
- **Space:** O(R × C) — recursion stack depth in the worst case (all land).

### Example trace (Example 2)
\`\`\`
[1,1,0,0,0]   → DFS from (0,0) marks (0,0),(0,1),(1,0),(1,1) → island 1
[1,1,0,0,0]   → all visited
[0,0,1,0,0]   → DFS from (2,2) marks (2,2) → island 2
[0,0,0,1,1]   → DFS from (3,3) marks (3,3),(3,4) → island 3
Result: 3
\`\`\``,
};

export default problem;
