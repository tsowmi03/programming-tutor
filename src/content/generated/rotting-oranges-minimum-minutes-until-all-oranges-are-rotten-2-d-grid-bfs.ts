import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "rotting-oranges-minimum-minutes-until-all-oranges-are-rotten-2-d-grid-bfs",
  title: "Rotting Oranges",
  difficulty: "medium",
  category: "trees-graphs",
  order: 1136,
  description: `You are given an \`m x n\` grid where each cell can have one of three values:

- \`0\` — empty cell
- \`1\` — fresh orange
- \`2\` — rotten orange

Every minute, any fresh orange that is **4-directionally adjacent** (up, down, left, right) to a rotten orange becomes rotten.

Return the **minimum number of minutes** that must elapse until no fresh oranges remain. If it is impossible to rot all oranges, return \`-1\`.

\`\`\`text
Example 1:
Input:  grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4
Explanation:
Minute 0: [[2,1,1],[1,1,0],[0,1,1]]
Minute 1: [[2,2,1],[2,1,0],[0,1,1]]
Minute 2: [[2,2,2],[2,2,0],[0,1,1]]
Minute 3: [[2,2,2],[2,2,0],[0,2,1]]
Minute 4: [[2,2,2],[2,2,0],[0,2,2]]
All fresh oranges are rotten after 4 minutes.
\`\`\`

\`\`\`text
Example 2:
Input:  grid = [[2,1,1],[0,1,1],[1,0,1]]
Output: -1
Explanation:
The orange in the bottom-left corner (row 2, col 0) can never rot
because it is isolated by zeros.
\`\`\`

\`\`\`text
Example 3:
Input:  grid = [[0,2]]
Output: 0
Explanation: No fresh oranges exist, so 0 minutes are needed.
\`\`\`

**Constraints:**
- \`1 <= m, n <= 10\` (number of rows and columns)
- \`0 <= grid[i][j] <= 2\``,
  hints: [
    `Think about starting BFS from ALL rotten oranges simultaneously — multi-source BFS.`,
    `Track the number of fresh oranges before and after BFS. If any remain, return -1.`,
    `The answer is the number of BFS levels processed (each level = one minute).`,
  ],
  signature: {
    "name": "rottingOranges",
    "params": [
      {
        "name": "grid",
        "type": "int[][]"
      }
    ],
    "returns": "int",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        [
          [
            2,
            1,
            1
          ],
          [
            1,
            1,
            0
          ],
          [
            0,
            1,
            1
          ]
        ]
      ],
      "expected": 4,
      "hidden": false
    },
    {
      "input": [
        [
          [
            2,
            1,
            1
          ],
          [
            0,
            1,
            1
          ],
          [
            1,
            0,
            1
          ]
        ]
      ],
      "expected": -1,
      "hidden": false
    },
    {
      "input": [
        [
          [
            0,
            2
          ]
        ]
      ],
      "expected": 0,
      "hidden": false
    },
    {
      "input": [
        [
          [
            1,
            2
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
            0,
            0
          ],
          [
            0,
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
            2,
            2
          ],
          [
            2,
            2
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
            1
          ]
        ]
      ],
      "expected": -1,
      "hidden": true
    },
    {
      "input": [
        [
          [
            2,
            1,
            1
          ],
          [
            1,
            1,
            1
          ],
          [
            0,
            1,
            2
          ]
        ]
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        [
          [
            2,
            1,
            1,
            1,
            2
          ]
        ]
      ],
      "expected": 2,
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
            1,
            1,
            1
          ],
          [
            1,
            1,
            2
          ]
        ]
      ],
      "expected": 4,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def rotting_oranges(grid: list[list[int]]) -> int:
    # TODO: implement multi-source BFS
    return 0
`,
    javascript: `function rottingOranges(grid) {
    // TODO: implement multi-source BFS
    return 0;
}
`,
    typescript: `function rottingOranges(grid: number[][]): number {
    // TODO: implement multi-source BFS
    return 0;
}`,
    java: `class Solution {
    public int rottingOranges(int[][] grid) {
        // TODO: implement multi-source BFS
        return 0;
    }
}
`,
    csharp: `using System.Collections.Generic;

public class Solution {
    public int RottingOranges(int[][] grid) {
        // TODO: implement multi-source BFS
        return 0;
    }
}`,
    c: `#include <stdlib.h>
int rottingOranges(int** grid, int gridSize, int* gridColSize) {
    // TODO: implement multi-source BFS
    return 0;
}
`,
    cpp: `class Solution {
public:
    int rottingOranges(vector<vector<int>>& grid) {
        // TODO: implement multi-source BFS
        return 0;
    }
};`,
  },
  solutions: {
    python: `from collections import deque

def rotting_oranges(grid: list[list[int]]) -> int:
    m = len(grid)
    n = len(grid[0])
    queue = deque()
    fresh = 0

    for r in range(m):
        for c in range(n):
            if grid[r][c] == 2:
                queue.append((r, c))
            elif grid[r][c] == 1:
                fresh += 1

    if fresh == 0:
        return 0

    directions = [(0,1),(0,-1),(1,0),(-1,0)]
    minutes = 0

    while queue and fresh > 0:
        minutes += 1
        for _ in range(len(queue)):
            r, c = queue.popleft()
            for dr, dc in directions:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1:
                    grid[nr][nc] = 2
                    fresh -= 1
                    queue.append((nr, nc))

    return minutes if fresh == 0 else -1
`,
    javascript: `function rottingOranges(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const queue = [];
    let fresh = 0;
    let head = 0;

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (grid[r][c] === 2) queue.push([r, c]);
            else if (grid[r][c] === 1) fresh++;
        }
    }

    if (fresh === 0) return 0;

    const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
    let minutes = 0;

    while (head < queue.length && fresh > 0) {
        minutes++;
        const size = queue.length - head;
        for (let i = 0; i < size; i++) {
            const [r, c] = queue[head++];
            for (const [dr, dc] of dirs) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === 1) {
                    grid[nr][nc] = 2;
                    fresh--;
                    queue.push([nr, nc]);
                }
            }
        }
    }

    return fresh === 0 ? minutes : -1;
}
`,
    typescript: `function rottingOranges(grid: number[][]): number {
    const m = grid.length;
    const n = grid[0].length;
    const queue: number[][] = [];
    let fresh = 0;
    let head = 0;

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (grid[r][c] === 2) queue.push([r, c]);
            else if (grid[r][c] === 1) fresh++;
        }
    }

    if (fresh === 0) return 0;

    const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
    let minutes = 0;

    while (head < queue.length && fresh > 0) {
        minutes++;
        const size = queue.length - head;
        for (let i = 0; i < size; i++) {
            const [r, c] = queue[head++];
            for (const [dr, dc] of dirs) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === 1) {
                    grid[nr][nc] = 2;
                    fresh--;
                    queue.push([nr, nc]);
                }
            }
        }
    }

    return fresh === 0 ? minutes : -1;
}`,
    java: `class Solution {
    public int rottingOranges(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        java.util.Queue<int[]> queue = new java.util.LinkedList<>();
        int fresh = 0;

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 2) queue.offer(new int[]{r, c});
                else if (grid[r][c] == 1) fresh++;
            }
        }

        if (fresh == 0) return 0;

        int[][] dirs = {{0,1},{0,-1},{1,0},{-1,0}};
        int minutes = 0;

        while (!queue.isEmpty() && fresh > 0) {
            minutes++;
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                int[] cell = queue.poll();
                for (int[] d : dirs) {
                    int nr = cell[0] + d[0], nc = cell[1] + d[1];
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2;
                        fresh--;
                        queue.offer(new int[]{nr, nc});
                    }
                }
            }
        }

        return fresh == 0 ? minutes : -1;
    }
}
`,
    csharp: `using System.Collections.Generic;

public class Solution {
    public int RottingOranges(int[][] grid) {
        int m = grid.Length, n = grid[0].Length;
        Queue<int[]> queue = new Queue<int[]>();
        int fresh = 0;

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 2) queue.Enqueue(new int[]{r, c});
                else if (grid[r][c] == 1) fresh++;
            }
        }

        if (fresh == 0) return 0;

        int[][] dirs = new int[][]{ new int[]{0,1}, new int[]{0,-1}, new int[]{1,0}, new int[]{-1,0} };
        int minutes = 0;

        while (queue.Count > 0 && fresh > 0) {
            minutes++;
            int size = queue.Count;
            for (int i = 0; i < size; i++) {
                int[] cell = queue.Dequeue();
                foreach (int[] d in dirs) {
                    int nr = cell[0] + d[0], nc = cell[1] + d[1];
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2;
                        fresh--;
                        queue.Enqueue(new int[]{nr, nc});
                    }
                }
            }
        }

        return fresh == 0 ? minutes : -1;
    }
}`,
    c: `#include <stdlib.h>
int rottingOranges(int** grid, int gridSize, int* gridColSize) {
    int m = gridSize;
    int n = gridColSize[0];
    int* queue = (int*)malloc(m * n * sizeof(int));
    int head = 0, tail = 0;
    int fresh = 0;

    for (int r = 0; r < m; r++) {
        for (int c = 0; c < n; c++) {
            if (grid[r][c] == 2) queue[tail++] = r * n + c;
            else if (grid[r][c] == 1) fresh++;
        }
    }

    if (fresh == 0) { free(queue); return 0; }

    int dr[] = {0, 0, 1, -1};
    int dc[] = {1, -1, 0, 0};
    int minutes = 0;

    while (head < tail && fresh > 0) {
        minutes++;
        int size = tail - head;
        for (int i = 0; i < size; i++) {
            int pos = queue[head++];
            int r = pos / n, c = pos % n;
            for (int d = 0; d < 4; d++) {
                int nr = r + dr[d], nc = c + dc[d];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                    grid[nr][nc] = 2;
                    fresh--;
                    queue[tail++] = nr * n + nc;
                }
            }
        }
    }

    free(queue);
    return fresh == 0 ? minutes : -1;
}
`,
    cpp: `class Solution {
public:
    int rottingOranges(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        queue<pair<int,int>> q;
        int fresh = 0;

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 2) q.push({r, c});
                else if (grid[r][c] == 1) fresh++;
            }
        }

        if (fresh == 0) return 0;

        int dirs[4][2] = {{0,1},{0,-1},{1,0},{-1,0}};
        int minutes = 0;

        while (!q.empty() && fresh > 0) {
            minutes++;
            int size = q.size();
            for (int i = 0; i < size; i++) {
                auto [r, c] = q.front();
                q.pop();
                for (auto& d : dirs) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2;
                        fresh--;
                        q.push({nr, nc});
                    }
                }
            }
        }

        return fresh == 0 ? minutes : -1;
    }
};`,
  },
  editorial: `## Approach: Multi-Source BFS

### Intuition
Instead of running BFS from each rotten orange independently, we seed the BFS queue with **all** initially rotten oranges at once. This gives us a "wave" that spreads outward level by level, where each level corresponds to one minute.

### Algorithm
1. **Scan the grid** — enqueue every cell with value \`2\`, count cells with value \`1\` (\`fresh\`).
2. If \`fresh == 0\`, return \`0\` immediately (nothing to rot).
3. **BFS level by level** — each outer loop iteration = one minute. For each rotten orange dequeued, check its 4 neighbors. If a neighbor is fresh, mark it rotten, decrement \`fresh\`, and enqueue it.
4. After BFS, if \`fresh > 0\`, some oranges are unreachable → return \`-1\`; otherwise return the minute count.

### Complexity
- **Time:** O(m × n) — each cell is visited at most once.
- **Space:** O(m × n) — queue can hold all cells in the worst case.

### Key Edge Cases
- Grid has no fresh oranges → return \`0\`.
- Fresh oranges exist but are surrounded by zeros → return \`-1\`.
- Multiple disconnected rotten sources → multi-source BFS handles them all simultaneously.`,
};

export default problem;
