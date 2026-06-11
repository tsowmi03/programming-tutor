import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "minimum-path-sum-from-top-left-to-bottom-right-of-a-grid",
  title: "Minimum Path Sum",
  difficulty: "medium",
  category: "recursion-dp",
  order: 1152,
  description: `Given an \`m x n\` grid of non-negative integers, find a path from the **top-left** corner \`(0, 0)\` to the **bottom-right** corner \`(m-1, n-1)\` that minimizes the sum of all numbers along the path.

At each step you may only move **right** or **down**.

\`\`\`text
Example 1:
Input:  grid = [[1,3,1],
                [1,5,1],
                [4,2,1]]
Output: 7
Explanation: Path (0,0)->(0,1)->(0,2)->(1,2)->(2,2)
             gives sum 1+3+1+1+1 = 7.
\`\`\`

\`\`\`text
Example 2:
Input:  grid = [[1,2,3],
                [4,5,6]]
Output: 12
Explanation: Path (0,0)->(0,1)->(0,2)->(1,2)
             gives sum 1+2+3+6 = 12.
\`\`\`

**Constraints:**
- \`1 <= m, n <= 200\`
- \`0 <= grid[i][j] <= 100\``,
  hints: [
    `Ask yourself: how many ways can you arrive at cell (i, j)? Only from the cell directly above or the cell directly to the left.`,
    `Define dp[i][j] as the minimum path sum to reach (i, j). The recurrence is dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j].`,
    `The first row and first column are base cases — each cell there can only be reached from a single direction, so fill them with a simple running sum before computing the rest of the table.`,
  ],
  signature: {
    "name": "minPathSum",
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
            3,
            1
          ],
          [
            1,
            5,
            1
          ],
          [
            4,
            2,
            1
          ]
        ]
      ],
      "expected": 7,
      "hidden": false
    },
    {
      "input": [
        [
          [
            1,
            2,
            3
          ],
          [
            4,
            5,
            6
          ]
        ]
      ],
      "expected": 12,
      "hidden": false
    },
    {
      "input": [
        [
          [
            1,
            2
          ],
          [
            1,
            1
          ]
        ]
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        [
          [
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
            5,
            3
          ],
          [
            2,
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
            2,
            5
          ],
          [
            3,
            2,
            1
          ]
        ]
      ],
      "expected": 6,
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
            1
          ]
        ]
      ],
      "expected": 5,
      "hidden": true
    },
    {
      "input": [
        [
          [
            9,
            1,
            4,
            8
          ],
          [
            6,
            7,
            5,
            2
          ],
          [
            3,
            2,
            1,
            5
          ]
        ]
      ],
      "expected": 25,
      "hidden": true
    },
    {
      "input": [
        [
          [
            1,
            99,
            1
          ],
          [
            1,
            1,
            1
          ]
        ]
      ],
      "expected": 4,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def min_path_sum(grid):
    # TODO: implement minimum path sum
    return 0
`,
    javascript: `function minPathSum(grid) {
    // TODO: implement minimum path sum
    return 0;
}
`,
    java: `class Solution {
    public int minPathSum(int[][] grid) {
        // TODO: implement minimum path sum
        return 0;
    }
}
`,
    c: `int minPathSum(int** grid, int gridSize, int* gridColSize) {
    /* TODO: implement minimum path sum */
    return 0;
}
`,
  },
  solutions: {
    python: `def min_path_sum(grid):
    m = len(grid)
    n = len(grid[0])
    dp = [[0] * n for _ in range(m)]
    dp[0][0] = grid[0][0]
    for j in range(1, n):
        dp[0][j] = dp[0][j-1] + grid[0][j]
    for i in range(1, m):
        dp[i][0] = dp[i-1][0] + grid[i][0]
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]
    return dp[m-1][n-1]
`,
    javascript: `function minPathSum(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const dp = Array.from({length: m}, () => new Array(n).fill(0));
    dp[0][0] = grid[0][0];
    for (let j = 1; j < n; j++) dp[0][j] = dp[0][j-1] + grid[0][j];
    for (let i = 1; i < m; i++) dp[i][0] = dp[i-1][0] + grid[i][0];
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1]) + grid[i][j];
        }
    }
    return dp[m-1][n-1];
}
`,
    java: `class Solution {
    public int minPathSum(int[][] grid) {
        int m = grid.length;
        int n = grid[0].length;
        int[][] dp = new int[m][n];
        dp[0][0] = grid[0][0];
        for (int j = 1; j < n; j++) dp[0][j] = dp[0][j-1] + grid[0][j];
        for (int i = 1; i < m; i++) dp[i][0] = dp[i-1][0] + grid[i][0];
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1]) + grid[i][j];
            }
        }
        return dp[m-1][n-1];
    }
}
`,
    c: `#include <stdlib.h>
int minPathSum(int** grid, int gridSize, int* gridColSize) {
    int m = gridSize;
    int n = gridColSize[0];
    int* dp = (int*)malloc(m * n * sizeof(int));
    dp[0] = grid[0][0];
    for (int j = 1; j < n; j++)
        dp[j] = dp[j-1] + grid[0][j];
    for (int i = 1; i < m; i++)
        dp[i*n] = dp[(i-1)*n] + grid[i][0];
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            int fromTop = dp[(i-1)*n + j];
            int fromLeft = dp[i*n + j-1];
            dp[i*n + j] = (fromTop < fromLeft ? fromTop : fromLeft) + grid[i][j];
        }
    }
    int result = dp[m*n - 1];
    free(dp);
    return result;
}
`,
  },
  editorial: `## Approach: Bottom-Up Dynamic Programming

### Key Insight
Because we can only move **right** or **down**, cell \`(i, j)\` can be reached from exactly two places: \`(i-1, j)\` (above) or \`(i, j-1)\` (left). This gives a clean recurrence with no cycles.

### Algorithm

Define \`dp[i][j]\` = minimum path sum to reach cell \`(i, j)\`.

**Base cases:**
- \`dp[0][0] = grid[0][0]\`
- First row: \`dp[0][j] = dp[0][j-1] + grid[0][j]\` (only reachable from the left)
- First column: \`dp[i][0] = dp[i-1][0] + grid[i][0]\` (only reachable from above)

**Recurrence (interior cells):**
\`\`\`
dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]
\`\`\`

**Answer:** \`dp[m-1][n-1]\`

### Worked Example
\`\`\`
grid = [[1,3,1],    dp = [[1, 4, 5],
        [1,5,1],          [2, 7, 6],
        [4,2,1]]          [6, 8, 7]]
\`\`\`
Minimum is \`dp[2][2] = 7\`, corresponding to path \`1→3→1→1→1\`.

### Complexity
- **Time:** O(m × n) — each cell is computed exactly once.
- **Space:** O(m × n) for the \`dp\` table. This can be reduced to O(n) by updating a single row in-place, since each row only needs the row above it.

### Alternative: Top-Down Memoization
Define \`f(i, j)\` = minimum sum from \`(i, j)\` to \`(m-1, n-1)\`:  
\`f(i, j) = grid[i][j] + min(f(i+1, j), f(i, j+1))\`  
with memoization this is also O(m × n) time and space.`,
};

export default problem;
