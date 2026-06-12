import type { CodeProblemDef } from "../types";

export const numberOfIslands: CodeProblemDef = {
  type: "code",
  slug: "number-of-islands",
  title: "Number of Islands",
  difficulty: "medium",
  category: "trees-graphs",
  order: 1,
  description: `Given an \`m x n\` grid where \`1\` represents land and \`0\` represents water, return the **number of islands**.

An island is a group of \`1\`s connected **horizontally or vertically** (not diagonally), surrounded by water. You may assume all four edges of the grid are surrounded by water.

You are allowed to modify the grid.

**Example 1**

\`\`\`text
Input: grid = [[1,1,1,1,0],
               [1,1,0,1,0],
               [1,1,0,0,0],
               [0,0,0,0,0]]
Output: 1
\`\`\`

**Example 2**

\`\`\`text
Input: grid = [[1,1,0,0,0],
               [1,1,0,0,0],
               [0,0,1,0,0],
               [0,0,0,1,1]]
Output: 3
\`\`\`

**Constraints**

- \`1 <= m, n <= 100\`
- \`grid[i][j]\` is \`0\` or \`1\`.
`,
  hints: [
    `Scan every cell. When you find a \`1\` you've discovered a *new* island — but how do you avoid counting the rest of that island again?`,
    `From each newly found land cell, “flood fill” the whole island (DFS or BFS to all connected land), marking each visited cell so it won't be counted twice.`,
    `Sinking visited land in place (set it to 0) is the simplest marking. Recurse in the four cardinal directions, stopping at water or the grid edge.`,
  ],
  signature: {
    "name": "numIslands",
    "params": [
      {
        "name": "grid",
        "type": "int[][]"
      }
    ],
    "returns": "int"
  },
  testCases: [
    {
      "input": [
        [
          [
            1,
            1,
            1,
            1,
            0
          ],
          [
            1,
            1,
            0,
            1,
            0
          ],
          [
            1,
            1,
            0,
            0,
            0
          ],
          [
            0,
            0,
            0,
            0,
            0
          ]
        ]
      ],
      "expected": 1
    },
    {
      "input": [
        [
          [
            1,
            1,
            0,
            0,
            0
          ],
          [
            1,
            1,
            0,
            0,
            0
          ],
          [
            0,
            0,
            1,
            0,
            0
          ],
          [
            0,
            0,
            0,
            1,
            1
          ]
        ]
      ],
      "expected": 3
    },
    {
      "input": [
        [
          [
            1
          ]
        ]
      ],
      "expected": 1
    },
    {
      "input": [
        [
          [
            0
          ]
        ]
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          [
            1,
            0,
            1,
            0,
            1
          ],
          [
            0,
            1,
            0,
            1,
            0
          ],
          [
            1,
            0,
            1,
            0,
            1
          ]
        ]
      ],
      "expected": 8,
      "hidden": true
    },
    {
      "input": [
        [
          [
            1,
            1,
            1
          ],
          [
            0,
            1,
            0
          ],
          [
            1,
            1,
            1
          ]
        ]
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          [
            1,
            1,
            0,
            1,
            1
          ],
          [
            1,
            0,
            0,
            0,
            1
          ],
          [
            0,
            0,
            1,
            0,
            0
          ]
        ]
      ],
      "expected": 3,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def num_islands(grid):
    """Return the number of islands in the grid (you may modify it)."""
    # Your code here
    pass
`,
    javascript: `/**
 * @param {number[][]} grid 1 = land, 0 = water (you may modify it)
 * @return {number}
 */
function numIslands(grid) {
  // Your code here
}
`,
    typescript: `/**
 * @param {number[][]} grid 1 = land, 0 = water (you may modify it)
 * @return {number}
 */
function numIslands(grid: number[][]): number {
  // Your code here
  return 0;
}`,
    java: `class Solution {
    public int numIslands(int[][] grid) {
        // Your code here
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int NumIslands(int[][] grid) {
        // Your code here
        return 0;
    }
}`,
    c: `int numIslands(int** grid, int gridSize, int* gridColSize) {
    // gridSize = number of rows; gridColSize[r] = columns in row r
    // Your code here
    return 0;
}
`,
    cpp: `class Solution {
public:
    int numIslands(vector<vector<int>>& grid) {
        // Your code here
        return 0;
    }
};`,
  },
  solutions: {
    python: `def num_islands(grid):
    rows, cols = len(grid), len(grid[0])

    def sink(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == 0:
            return
        grid[r][c] = 0
        sink(r + 1, c)
        sink(r - 1, c)
        sink(r, c + 1)
        sink(r, c - 1)

    count = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1:
                count += 1
                sink(r, c)
    return count
`,
    javascript: `function numIslands(grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  function sink(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === 0) return;
    grid[r][c] = 0;
    sink(r + 1, c);
    sink(r - 1, c);
    sink(r, c + 1);
    sink(r, c - 1);
  }

  let count = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) {
        count++;
        sink(r, c);
      }
    }
  }
  return count;
}
`,
    typescript: `function numIslands(grid: number[][]): number {
  const rows = grid.length;
  const cols = grid[0].length;

  function sink(r: number, c: number): void {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === 0) return;
    grid[r][c] = 0;
    sink(r + 1, c);
    sink(r - 1, c);
    sink(r, c + 1);
    sink(r, c - 1);
  }

  let count = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) {
        count++;
        sink(r, c);
      }
    }
  }
  return count;
}`,
    java: `class Solution {
    public int numIslands(int[][] grid) {
        int count = 0;
        for (int r = 0; r < grid.length; r++) {
            for (int c = 0; c < grid[0].length; c++) {
                if (grid[r][c] == 1) {
                    count++;
                    sink(grid, r, c);
                }
            }
        }
        return count;
    }

    private void sink(int[][] grid, int r, int c) {
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length
                || grid[r][c] == 0) {
            return;
        }
        grid[r][c] = 0;
        sink(grid, r + 1, c);
        sink(grid, r - 1, c);
        sink(grid, r, c + 1);
        sink(grid, r, c - 1);
    }
}
`,
    csharp: `public class Solution {
    public int NumIslands(int[][] grid) {
        int count = 0;
        for (int r = 0; r < grid.Length; r++) {
            for (int c = 0; c < grid[0].Length; c++) {
                if (grid[r][c] == 1) {
                    count++;
                    Sink(grid, r, c);
                }
            }
        }
        return count;
    }

    private void Sink(int[][] grid, int r, int c) {
        if (r < 0 || r >= grid.Length || c < 0 || c >= grid[0].Length
                || grid[r][c] == 0) {
            return;
        }
        grid[r][c] = 0;
        Sink(grid, r + 1, c);
        Sink(grid, r - 1, c);
        Sink(grid, r, c + 1);
        Sink(grid, r, c - 1);
    }
}`,
    c: `static void sink(int** grid, int rows, int cols, int r, int c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] == 0) return;
    grid[r][c] = 0;
    sink(grid, rows, cols, r + 1, c);
    sink(grid, rows, cols, r - 1, c);
    sink(grid, rows, cols, r, c + 1);
    sink(grid, rows, cols, r, c - 1);
}

int numIslands(int** grid, int gridSize, int* gridColSize) {
    int count = 0;
    for (int r = 0; r < gridSize; r++) {
        for (int c = 0; c < gridColSize[r]; c++) {
            if (grid[r][c] == 1) {
                count++;
                sink(grid, gridSize, gridColSize[r], r, c);
            }
        }
    }
    return count;
}
`,
    cpp: `class Solution {
public:
    int numIslands(vector<vector<int>>& grid) {
        int count = 0;
        int rows = grid.size();
        int cols = grid[0].size();
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == 1) {
                    count++;
                    sink(grid, r, c, rows, cols);
                }
            }
        }
        return count;
    }

private:
    void sink(vector<vector<int>>& grid, int r, int c, int rows, int cols) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] == 0) return;
        grid[r][c] = 0;
        sink(grid, r + 1, c, rows, cols);
        sink(grid, r - 1, c, rows, cols);
        sink(grid, r, c + 1, rows, cols);
        sink(grid, r, c - 1, rows, cols);
    }
};`,
  },
  editorial: `## Approach: flood fill (DFS)

The grid is an implicit **graph**: each land cell is a node with edges to
its four cardinal neighbours. An island is then a *connected component* of
land cells, and the task is to count components.

The standard technique:

1. Scan all cells.
2. The first time you touch an island (an unvisited \`1\`), increment the
   count, then **flood fill** the entire component so it can never be
   counted again.

Flood fill here is a depth-first search that "sinks" land: set the cell to
\`0\`, then recurse into the four neighbours, stopping at water or the
edge. Marking visited cells *in the grid itself* avoids a separate visited
structure (fine since the problem allows modification).

Every cell is visited a constant number of times, so the whole thing is
linear in the grid size.

**Complexity:** O(m·n) time; O(m·n) worst-case recursion depth (one giant
snake-shaped island). An explicit stack or BFS queue avoids deep recursion
if that worries you.

The scan-and-flood pattern transfers directly to BFS (use a queue), to
Union-Find, and to dozens of "count the regions" problems.
`,
};
