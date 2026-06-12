import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "shortest-path-length-in-an-unweighted-grid-via-bfs",
  title: "Shortest Path in a Binary Grid",
  difficulty: "medium",
  category: "trees-graphs",
  order: 1130,
  description: `Given an \`m x n\` binary grid where \`0\` represents an open cell and \`1\` represents a wall, find the length of the shortest path from the top-left cell \`(0, 0)\` to the bottom-right cell \`(m-1, n-1)\`.

You may move in 4 directions: up, down, left, right. You may only move through open cells (\`0\`).

The **length** of a path is the number of cells visited (including the start and end cells).

Return \`-1\` if no such path exists.

The grid is given as a flattened 1-D array in row-major order. Cell \`(r, c)\` corresponds to index \`r * cols + c\`.

**Note:** If either the start or end cell is a wall (\`1\`), return \`-1\` immediately.

\`\`\`text
Example 1:
Grid (rows=3, cols=3):
  0 0 0
  1 1 0
  0 0 0
Input: grid=[0,0,0,1,1,0,0,0,0], rows=3, cols=3
Output: 5
Explanation: (0,0)->(0,1)->(0,2)->(1,2)->(2,2) — 5 cells
\`\`\`

\`\`\`text
Example 2:
Grid (rows=2, cols=2):
  0 1
  1 0
Input: grid=[0,1,1,0], rows=2, cols=2
Output: -1
Explanation: No path exists from (0,0) to (1,1).
\`\`\`

\`\`\`text
Example 3:
Grid (rows=1, cols=1):
  0
Input: grid=[0], rows=1, cols=1
Output: 1
Explanation: Start equals end; path length is 1.
\`\`\`

**Constraints:**
- \`1 <= rows, cols <= 100\`
- \`rows * cols == grid.length\`
- Each \`grid[i]\` is \`0\` or \`1\``,
  hints: [
    `BFS explores cells level by level, guaranteeing the shortest path in an unweighted graph. Start BFS from (0,0) and stop when you reach (rows-1, cols-1).`,
    `Represent each cell as an index in the flattened array: cell (r, c) maps to index r*cols + c. Use a visited boolean array of the same size to avoid revisiting cells.`,
    `Track path length as the BFS depth. Initialize distance to 1 at the start cell (since we count cells, not edges).`,
    `Handle edge cases: if start or end is a wall return -1 immediately; if rows==1 and cols==1 and grid[0]==0, return 1.`,
  ],
  signature: {
    "name": "shortestPathGrid",
    "params": [
      {
        "name": "grid",
        "type": "int[]"
      },
      {
        "name": "rows",
        "type": "int"
      },
      {
        "name": "cols",
        "type": "int"
      }
    ],
    "returns": "int",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        [
          0,
          0,
          0,
          1,
          1,
          0,
          0,
          0,
          0
        ],
        3,
        3
      ],
      "expected": 5,
      "hidden": false
    },
    {
      "input": [
        [
          0,
          1,
          1,
          0
        ],
        2,
        2
      ],
      "expected": -1,
      "hidden": false
    },
    {
      "input": [
        [
          0
        ],
        1,
        1
      ],
      "expected": 1,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          0,
          0,
          0,
          0
        ],
        1,
        5
      ],
      "expected": -1,
      "hidden": true
    },
    {
      "input": [
        [
          0,
          0,
          0,
          0,
          0
        ],
        1,
        5
      ],
      "expected": 5,
      "hidden": true
    },
    {
      "input": [
        [
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
          0,
          0,
          0,
          0,
          0,
          0,
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
        5,
        5
      ],
      "expected": 9,
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
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
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
        10,
        10
      ],
      "expected": 19,
      "hidden": true
    },
    {
      "input": [
        [
          1
        ],
        1,
        1
      ],
      "expected": -1,
      "hidden": true
    },
    {
      "input": [
        [
          0,
          1,
          0,
          0,
          0,
          0,
          0,
          1,
          0
        ],
        3,
        3
      ],
      "expected": 5,
      "hidden": true
    },
    {
      "input": [
        [
          0,
          0,
          1,
          0,
          0,
          0,
          1,
          0,
          0
        ],
        3,
        3
      ],
      "expected": 5,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def shortest_path_grid(grid: list[int], rows: int, cols: int) -> int:
    # TODO: implement BFS to find shortest path
    return -1
`,
    javascript: `function shortestPathGrid(grid, rows, cols) {
    // TODO: implement BFS to find shortest path
    return -1;
}
`,
    typescript: `function shortestPathGrid(grid: number[], rows: number, cols: number): number {
    // TODO: implement BFS to find shortest path
    return -1;
}`,
    java: `class Solution {
    public int shortestPathGrid(int[] grid, int rows, int cols) {
        // TODO: implement BFS to find shortest path
        return -1;
    }
}
`,
    csharp: `public class Solution {
    public int ShortestPathGrid(int[] grid, int rows, int cols) {
        // TODO: implement BFS to find shortest path
        return -1;
    }
}`,
    c: `int shortestPathGrid(int* grid, int gridSize, int rows, int cols) {
    // TODO: implement BFS to find shortest path
    return -1;
}
`,
    cpp: `class Solution {
public:
    int shortestPathGrid(vector<int>& grid, int rows, int cols) {
        // TODO: implement BFS to find shortest path
        return -1;
    }
};`,
  },
  solutions: {
    python: `from collections import deque

def shortest_path_grid(grid: list[int], rows: int, cols: int) -> int:
    if grid[0] == 1 or grid[rows * cols - 1] == 1:
        return -1
    if rows == 1 and cols == 1:
        return 1
    visited = [False] * (rows * cols)
    visited[0] = True
    queue = deque([(0, 0, 1)])
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    while queue:
        r, c, dist = queue.popleft()
        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols:
                idx = nr * cols + nc
                if not visited[idx] and grid[idx] == 0:
                    if nr == rows - 1 and nc == cols - 1:
                        return dist + 1
                    visited[idx] = True
                    queue.append((nr, nc, dist + 1))
    return -1
`,
    javascript: `function shortestPathGrid(grid, rows, cols) {
    if (grid[0] === 1 || grid[rows * cols - 1] === 1) return -1;
    if (rows === 1 && cols === 1) return 1;
    const visited = new Array(rows * cols).fill(false);
    visited[0] = true;
    const queue = [[0, 0, 1]];
    const dirs = [[-1,0],[1,0],[0,-1],[0,1]];
    let head = 0;
    while (head < queue.length) {
        const [r, c, dist] = queue[head++];
        for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                const idx = nr * cols + nc;
                if (!visited[idx] && grid[idx] === 0) {
                    if (nr === rows - 1 && nc === cols - 1) return dist + 1;
                    visited[idx] = true;
                    queue.push([nr, nc, dist + 1]);
                }
            }
        }
    }
    return -1;
}
`,
    typescript: `function shortestPathGrid(grid: number[], rows: number, cols: number): number {
    if (grid[0] === 1 || grid[rows * cols - 1] === 1) return -1;
    if (rows === 1 && cols === 1) return 1;
    const visited: boolean[] = new Array(rows * cols).fill(false);
    visited[0] = true;
    const queue: [number, number, number][] = [[0, 0, 1]];
    const dirs: [number, number][] = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    let head = 0;
    while (head < queue.length) {
        const [r, c, dist] = queue[head++];
        for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                const idx = nr * cols + nc;
                if (!visited[idx] && grid[idx] === 0) {
                    if (nr === rows - 1 && nc === cols - 1) return dist + 1;
                    visited[idx] = true;
                    queue.push([nr, nc, dist + 1]);
                }
            }
        }
    }
    return -1;
}`,
    java: `class Solution {
    public int shortestPathGrid(int[] grid, int rows, int cols) {
        if (grid[0] == 1 || grid[rows * cols - 1] == 1) return -1;
        if (rows == 1 && cols == 1) return 1;
        boolean[] visited = new boolean[rows * cols];
        visited[0] = true;
        int[] qr = new int[rows * cols];
        int[] qc = new int[rows * cols];
        int[] qd = new int[rows * cols];
        int head = 0, tail = 0;
        qr[tail] = 0; qc[tail] = 0; qd[tail] = 1; tail++;
        int[] drs = {-1, 1, 0, 0};
        int[] dcs = {0, 0, -1, 1};
        while (head < tail) {
            int r = qr[head], c = qc[head], dist = qd[head];
            head++;
            for (int i = 0; i < 4; i++) {
                int nr = r + drs[i], nc = c + dcs[i];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                    int idx = nr * cols + nc;
                    if (!visited[idx] && grid[idx] == 0) {
                        if (nr == rows - 1 && nc == cols - 1) return dist + 1;
                        visited[idx] = true;
                        qr[tail] = nr; qc[tail] = nc; qd[tail] = dist + 1;
                        tail++;
                    }
                }
            }
        }
        return -1;
    }
}
`,
    csharp: `using System.Collections.Generic;

public class Solution {
    public int ShortestPathGrid(int[] grid, int rows, int cols) {
        if (grid[0] == 1 || grid[rows * cols - 1] == 1) return -1;
        if (rows == 1 && cols == 1) return 1;
        bool[] visited = new bool[rows * cols];
        visited[0] = true;
        Queue<int[]> queue = new Queue<int[]>();
        queue.Enqueue(new int[] { 0, 0, 1 });
        int[] drs = { -1, 1, 0, 0 };
        int[] dcs = { 0, 0, -1, 1 };
        while (queue.Count > 0) {
            int[] cur = queue.Dequeue();
            int r = cur[0], c = cur[1], dist = cur[2];
            for (int i = 0; i < 4; i++) {
                int nr = r + drs[i], nc = c + dcs[i];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                    int idx = nr * cols + nc;
                    if (!visited[idx] && grid[idx] == 0) {
                        if (nr == rows - 1 && nc == cols - 1) return dist + 1;
                        visited[idx] = true;
                        queue.Enqueue(new int[] { nr, nc, dist + 1 });
                    }
                }
            }
        }
        return -1;
    }
}`,
    c: `#include <stdlib.h>
#include <string.h>

int shortestPathGrid(int* grid, int gridSize, int rows, int cols) {
    if (grid[0] == 1 || grid[rows * cols - 1] == 1) return -1;
    if (rows == 1 && cols == 1) return 1;
    int total = rows * cols;
    int* visited = (int*)calloc(total, sizeof(int));
    int* qr = (int*)malloc(total * sizeof(int));
    int* qc = (int*)malloc(total * sizeof(int));
    int* qd = (int*)malloc(total * sizeof(int));
    int head = 0, tail = 0;
    qr[tail] = 0; qc[tail] = 0; qd[tail] = 1; tail++;
    visited[0] = 1;
    int drs[] = {-1, 1, 0, 0};
    int dcs[] = {0, 0, -1, 1};
    int result = -1;
    while (head < tail) {
        int r = qr[head], c = qc[head], dist = qd[head];
        head++;
        for (int i = 0; i < 4; i++) {
            int nr = r + drs[i], nc = c + dcs[i];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                int idx = nr * cols + nc;
                if (!visited[idx] && grid[idx] == 0) {
                    if (nr == rows - 1 && nc == cols - 1) {
                        result = dist + 1;
                        free(visited); free(qr); free(qc); free(qd);
                        return result;
                    }
                    visited[idx] = 1;
                    qr[tail] = nr; qc[tail] = nc; qd[tail] = dist + 1;
                    tail++;
                }
            }
        }
    }
    free(visited); free(qr); free(qc); free(qd);
    return result;
}
`,
    cpp: `class Solution {
public:
    int shortestPathGrid(vector<int>& grid, int rows, int cols) {
        if (grid[0] == 1 || grid[rows * cols - 1] == 1) return -1;
        if (rows == 1 && cols == 1) return 1;
        vector<bool> visited(rows * cols, false);
        visited[0] = true;
        queue<tuple<int,int,int>> q;
        q.push({0, 0, 1});
        int drs[] = {-1, 1, 0, 0};
        int dcs[] = {0, 0, -1, 1};
        while (!q.empty()) {
            auto [r, c, dist] = q.front();
            q.pop();
            for (int i = 0; i < 4; i++) {
                int nr = r + drs[i], nc = c + dcs[i];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                    int idx = nr * cols + nc;
                    if (!visited[idx] && grid[idx] == 0) {
                        if (nr == rows - 1 && nc == cols - 1) return dist + 1;
                        visited[idx] = true;
                        q.push({nr, nc, dist + 1});
                    }
                }
            }
        }
        return -1;
    }
};`,
  },
  editorial: `## Approach: Breadth-First Search (BFS)

### Key Idea
BFS on an unweighted graph always finds the shortest path, because it explores all cells at distance \`d\` before any cell at distance \`d+1\`. We count path length as the number of cells visited.

### Algorithm
1. **Edge cases**: If \`grid[0]\` or \`grid[rows*cols-1]\` is a wall, return \`-1\`. If the grid is 1×1 and open, return \`1\`.
2. **BFS setup**: Use a queue seeded with \`(0, 0, distance=1)\`. Mark \`(0,0)\` visited.
3. **Expansion**: For each dequeued cell \`(r, c, dist)\`, try all 4 neighbors \`(nr, nc)\`. If in-bounds, unvisited, and open:
   - If it's the destination, return \`dist + 1\`.
   - Otherwise enqueue it with \`dist + 1\` and mark visited.
4. If the queue empties without reaching the destination, return \`-1\`.

### Complexity
- **Time**: O(m × n) — each cell is visited at most once.
- **Space**: O(m × n) — for the visited array and BFS queue.

### Why BFS and not DFS?
DFS might find *a* path but not the *shortest* path. BFS guarantees shortest path in unweighted graphs because nodes are processed in non-decreasing order of distance from the source.`,
};

export default problem;
