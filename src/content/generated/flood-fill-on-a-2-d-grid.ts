import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "flood-fill-on-a-2-d-grid",
  title: "Flood Fill",
  difficulty: "medium",
  category: "trees-graphs",
  order: 1129,
  description: `Given an \`m x n\` integer grid \`image\` representing a digital image, where \`image[r][c]\` is the color of pixel \`(r, c)\`, a starting pixel \`(sr, sc)\`, and a new \`color\`, perform a **flood fill** on the image.

A flood fill changes the color of pixel \`(sr, sc)\` to \`color\`, then repeatedly changes the color of any pixel that is:
- **4-directionally adjacent** (up, down, left, right) to a pixel already recolored, **and**
- shares the **same original color** as \`image[sr][sc]\`.

Return the **modified image as a flattened 1D array** (pixels listed row by row, left to right).

\`\`\`text
Example 1:
Input:  image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2
Output: [2,2,2,2,2,0,2,0,1]

Before:   After (2D):    Flattened output:
1 1 1     2 2 2         [2,2,2,2,2,0,2,0,1]
1 1 0     2 2 0
1 0 1     2 0 1

All 1s connected to (1,1) become 2. The isolated 1 at (2,2)
is blocked by 0s and remains unchanged.
\`\`\`

\`\`\`text
Example 2:
Input:  image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, color = 0
Output: [0,0,0,0,0,0]

The starting pixel already has color 0, which equals the new color.
No pixels change.
\`\`\`

**Constraints:**
- \`1 <= m, n <= 50\` (m = rows, n = columns)
- \`0 <= image[r][c] <= 65535\`
- \`0 <= sr < m\`, \`0 <= sc < n\`
- \`0 <= color <= 65535\``,
  hints: [
    `Think of each pixel as a node in a graph. Two pixels share an edge if they are 4-directionally adjacent AND have the same color. You need to recolor the entire connected component containing (sr, sc).`,
    `What happens if the new color already equals the original color at (sr, sc)? Handle this edge case first — it prevents revisiting cells forever.`,
    `Use DFS or BFS from (sr, sc). Change a cell's color to the new color as soon as you visit it — this acts as your 'visited' marker so you never re-enter a cell.`,
    `After performing the fill in-place, flatten the 2D grid into a 1D array row by row to produce the final answer.`,
  ],
  signature: {
    "name": "floodFill",
    "params": [
      {
        "name": "image",
        "type": "int[][]"
      },
      {
        "name": "sr",
        "type": "int"
      },
      {
        "name": "sc",
        "type": "int"
      },
      {
        "name": "color",
        "type": "int"
      }
    ],
    "returns": "int[]",
    "ordered": true
  },
  testCases: [
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
            0
          ],
          [
            1,
            0,
            1
          ]
        ],
        1,
        1,
        2
      ],
      "expected": [
        2,
        2,
        2,
        2,
        2,
        0,
        2,
        0,
        1
      ],
      "hidden": false
    },
    {
      "input": [
        [
          [
            0,
            0,
            0
          ],
          [
            0,
            0,
            0
          ]
        ],
        0,
        0,
        0
      ],
      "expected": [
        0,
        0,
        0,
        0,
        0,
        0
      ],
      "hidden": false
    },
    {
      "input": [
        [
          [
            0
          ]
        ],
        0,
        0,
        5
      ],
      "expected": [
        5
      ],
      "hidden": false
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
        ],
        1,
        1,
        3
      ],
      "expected": [
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3,
        3
      ],
      "hidden": true
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
        ],
        0,
        0,
        9
      ],
      "expected": [
        9,
        2,
        3,
        4,
        5,
        6
      ],
      "hidden": true
    },
    {
      "input": [
        [
          [
            0,
            0,
            0
          ],
          [
            0,
            1,
            1
          ]
        ],
        1,
        1,
        1
      ],
      "expected": [
        0,
        0,
        0,
        0,
        1,
        1
      ],
      "hidden": true
    },
    {
      "input": [
        [
          [
            1,
            1,
            0,
            0
          ],
          [
            1,
            0,
            0,
            1
          ],
          [
            0,
            0,
            1,
            1
          ]
        ],
        0,
        0,
        5
      ],
      "expected": [
        5,
        5,
        0,
        0,
        5,
        0,
        0,
        1,
        0,
        0,
        1,
        1
      ],
      "hidden": true
    },
    {
      "input": [
        [
          [
            0,
            0,
            0
          ],
          [
            0,
            0,
            0
          ],
          [
            0,
            0,
            0
          ]
        ],
        1,
        1,
        2
      ],
      "expected": [
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2,
        2
      ],
      "hidden": true
    },
    {
      "input": [
        [
          [
            1,
            0,
            1
          ],
          [
            0,
            1,
            0
          ],
          [
            1,
            0,
            1
          ]
        ],
        0,
        0,
        3
      ],
      "expected": [
        3,
        0,
        1,
        0,
        1,
        0,
        1,
        0,
        1
      ],
      "hidden": true
    }
  ],
  starterCode: {
    python: `def flood_fill(image, sr, sc, color):
    # TODO: implement flood fill
    # Return the modified image as a flattened 1D list (row by row)
    return []
`,
    javascript: `function floodFill(image, sr, sc, color) {
    // TODO: implement flood fill
    // Return the modified image as a flattened 1D array (row by row)
    return [];
}
`,
    typescript: `function floodFill(image: number[][], sr: number, sc: number, color: number): number[] {
    // TODO: implement flood fill
    // Return the modified image as a flattened 1D array (row by row)
    return [];
}`,
    java: `class Solution {
    public int[] floodFill(int[][] image, int sr, int sc, int color) {
        // TODO: implement flood fill
        // Return the modified image as a flattened 1D array (row by row)
        return new int[0];
    }
}
`,
    csharp: `public class Solution {
    public int[] FloodFill(int[][] image, int sr, int sc, int color) {
        // TODO: implement flood fill
        // Return the modified image as a flattened 1D array (row by row)
        return new int[0];
    }
}`,
    c: `int* floodFill(int** image, int imageSize, int* imageColSize, int sr, int sc, int color, int* returnSize) {
    /* TODO: implement flood fill */
    /* Return the modified image as a flattened 1D array (row by row) */
    *returnSize = 0;
    return NULL;
}
`,
    cpp: `class Solution {
public:
    vector<int> floodFill(vector<vector<int>>& image, int sr, int sc, int color) {
        // TODO: implement flood fill
        // Return the modified image as a flattened 1D array (row by row)
        return {};
    }
};`,
  },
  solutions: {
    python: `def flood_fill(image, sr, sc, color):
    original = image[sr][sc]
    rows, cols = len(image), len(image[0])
    if original != color:
        def dfs(r, c):
            if r < 0 or r >= rows or c < 0 or c >= cols:
                return
            if image[r][c] != original:
                return
            image[r][c] = color
            dfs(r + 1, c)
            dfs(r - 1, c)
            dfs(r, c + 1)
            dfs(r, c - 1)
        dfs(sr, sc)
    return [image[r][c] for r in range(rows) for c in range(cols)]
`,
    javascript: `function floodFill(image, sr, sc, color) {
    const original = image[sr][sc];
    const rows = image.length, cols = image[0].length;
    if (original !== color) {
        function dfs(r, c) {
            if (r < 0 || r >= rows || c < 0 || c >= cols) return;
            if (image[r][c] !== original) return;
            image[r][c] = color;
            dfs(r + 1, c);
            dfs(r - 1, c);
            dfs(r, c + 1);
            dfs(r, c - 1);
        }
        dfs(sr, sc);
    }
    const result = [];
    for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
            result.push(image[r][c]);
    return result;
}
`,
    typescript: `function floodFill(image: number[][], sr: number, sc: number, color: number): number[] {
    const original = image[sr][sc];
    const rows = image.length, cols = image[0].length;
    if (original !== color) {
        function dfs(r: number, c: number): void {
            if (r < 0 || r >= rows || c < 0 || c >= cols) return;
            if (image[r][c] !== original) return;
            image[r][c] = color;
            dfs(r + 1, c);
            dfs(r - 1, c);
            dfs(r, c + 1);
            dfs(r, c - 1);
        }
        dfs(sr, sc);
    }
    const result: number[] = [];
    for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
            result.push(image[r][c]);
    return result;
}`,
    java: `class Solution {
    private int rows, cols;
    public int[] floodFill(int[][] image, int sr, int sc, int color) {
        int original = image[sr][sc];
        rows = image.length;
        cols = image[0].length;
        if (original != color) {
            dfs(image, sr, sc, original, color);
        }
        int[] result = new int[rows * cols];
        int idx = 0;
        for (int r = 0; r < rows; r++)
            for (int c = 0; c < cols; c++)
                result[idx++] = image[r][c];
        return result;
    }
    private void dfs(int[][] image, int r, int c, int original, int color) {
        if (r < 0 || r >= rows || c < 0 || c >= cols) return;
        if (image[r][c] != original) return;
        image[r][c] = color;
        dfs(image, r + 1, c, original, color);
        dfs(image, r - 1, c, original, color);
        dfs(image, r, c + 1, original, color);
        dfs(image, r, c - 1, original, color);
    }
}
`,
    csharp: `public class Solution {
    private int rows, cols;

    public int[] FloodFill(int[][] image, int sr, int sc, int color) {
        int original = image[sr][sc];
        rows = image.Length;
        cols = image[0].Length;
        if (original != color) {
            Dfs(image, sr, sc, original, color);
        }
        int[] result = new int[rows * cols];
        int idx = 0;
        for (int r = 0; r < rows; r++)
            for (int c = 0; c < cols; c++)
                result[idx++] = image[r][c];
        return result;
    }

    private void Dfs(int[][] image, int r, int c, int original, int color) {
        if (r < 0 || r >= rows || c < 0 || c >= cols) return;
        if (image[r][c] != original) return;
        image[r][c] = color;
        Dfs(image, r + 1, c, original, color);
        Dfs(image, r - 1, c, original, color);
        Dfs(image, r, c + 1, original, color);
        Dfs(image, r, c - 1, original, color);
    }
}`,
    c: `#include <stdlib.h>

int* floodFill(int** image, int imageSize, int* imageColSize, int sr, int sc, int color, int* returnSize) {
    int rows = imageSize, cols = imageColSize[0];
    int original = image[sr][sc];
    if (original != color) {
        int maxCells = rows * cols;
        int* qr = (int*)malloc(maxCells * sizeof(int));
        int* qc = (int*)malloc(maxCells * sizeof(int));
        int head = 0, tail = 0;
        int dr[4] = {1, -1, 0, 0};
        int dc[4] = {0, 0, 1, -1};
        qr[tail] = sr; qc[tail] = sc; tail++;
        image[sr][sc] = color;
        while (head < tail) {
            int r = qr[head], c = qc[head]; head++;
            int d;
            for (d = 0; d < 4; d++) {
                int nr = r + dr[d], nc = c + dc[d];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && image[nr][nc] == original) {
                    image[nr][nc] = color;
                    qr[tail] = nr; qc[tail] = nc; tail++;
                }
            }
        }
        free(qr);
        free(qc);
    }
    *returnSize = rows * cols;
    int* result = (int*)malloc(rows * cols * sizeof(int));
    int idx = 0, r, c;
    for (r = 0; r < rows; r++)
        for (c = 0; c < cols; c++)
            result[idx++] = image[r][c];
    return result;
}
`,
    cpp: `class Solution {
private:
    int rows, cols;

    void dfs(vector<vector<int>>& image, int r, int c, int original, int color) {
        if (r < 0 || r >= rows || c < 0 || c >= cols) return;
        if (image[r][c] != original) return;
        image[r][c] = color;
        dfs(image, r + 1, c, original, color);
        dfs(image, r - 1, c, original, color);
        dfs(image, r, c + 1, original, color);
        dfs(image, r, c - 1, original, color);
    }

public:
    vector<int> floodFill(vector<vector<int>>& image, int sr, int sc, int color) {
        int original = image[sr][sc];
        rows = image.size();
        cols = image[0].size();
        if (original != color) {
            dfs(image, sr, sc, original, color);
        }
        vector<int> result;
        for (int r = 0; r < rows; r++)
            for (int c = 0; c < cols; c++)
                result.push_back(image[r][c]);
        return result;
    }
};`,
  },
  editorial: `## Approach: Depth-First Search (DFS)

### Intuition
Model the grid as a graph: each cell is a node, and two cells share an edge if they are 4-directionally adjacent **and** share the same color. A flood fill is simply recoloring the entire connected component containing \`(sr, sc)\`. The result is returned as a flattened 1D array (row by row).

### Critical Edge Case
If \`image[sr][sc]\` already equals \`color\`, the DFS would revisit cells infinitely because they still appear to match the original color. **Short-circuit immediately** when \`original == color\` — return the grid as-is.

### DFS Algorithm
1. Save \`original = image[sr][sc]\`.
2. If \`original == color\`, skip the fill.
3. From \`(sr, sc)\`, run DFS:
   - **Base cases:** out of bounds, or \`image[r][c] != original\` — return.
   - **Action:** set \`image[r][c] = color\` (marks the cell as visited), then recurse in all 4 directions.
4. Flatten the modified grid row by row into a 1D array and return it.

Setting the cell to the new color *before* recursing serves as the visited marker, avoiding a separate boolean array.

### BFS Alternative (used in C solution)
Enqueue \`(sr, sc)\` and set \`image[sr][sc] = color\` immediately. Dequeue each cell and enqueue any 4-directional neighbor that still holds \`original\`, recoloring it at enqueue time.

### Complexity
- **Time:** O(m × n) — each cell is visited at most once.
- **Space:** O(m × n) — recursion stack (DFS) or queue (BFS) in the worst case (a fully connected single-color grid).`,
};

export default problem;
