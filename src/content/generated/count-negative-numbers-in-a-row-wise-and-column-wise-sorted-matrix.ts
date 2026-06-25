import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-negative-numbers-in-a-row-wise-and-column-wise-sorted-matrix",
  title: "Count Negatives in Sorted Matrix",
  difficulty: "medium",
  category: "binary-search",
  order: 1027,
  description: `Given a \`m x n\` matrix \`grid\` of integers that is sorted in **non-increasing order** both row-wise and column-wise, return the **number of negative numbers** in \`grid\`.

A **non-increasing** order means each row is sorted from largest to smallest (left to right), and each column is sorted from largest to smallest (top to bottom).

\`\`\`text
Example 1:
Input: grid = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]
Output: 8
Explanation: There are 8 negative numbers: the last element of rows 0 and 1,
the last two of row 2, and all four of row 3.
\`\`\`

\`\`\`text
Example 2:
Input: grid = [[3,2],[1,0]]
Output: 0
Explanation: There are no negative numbers.
\`\`\`

\`\`\`text
Example 3:
Input: grid = [[-1,-2],[-3,-4]]
Output: 4
Explanation: All four numbers are negative.
\`\`\`

**Constraints:**
- \`m == grid.length\`
- \`n == grid[i].length\`
- \`1 <= m, n <= 100\`
- \`-100 <= grid[i][j] <= 100\``,
  hints: [
    `Each row is sorted in non-increasing order. Can you use binary search to find the first negative number in each row?`,
    `Once you find the index of the first negative number in a row, every element to the right of it is also negative.`,
    `There is an even more efficient O(m+n) approach: start from the top-right corner and walk left or down based on the sign of the current element.`,
  ],
  guidance: [
    {
      "title": "Binary Search Per Row",
      "body": "Since each row is sorted in non-increasing order, you can binary search for the leftmost negative number in each row. If the first negative appears at column index `k`, then there are `n - k` negative numbers in that row. Sum this up for all rows.",
      "level": "strategy"
    },
    {
      "title": "Finding the Pivot with Binary Search",
      "body": "For each row, binary search for the first index where `grid[row][mid] < 0`:\n```\nlo = 0, hi = n\nwhile lo < hi:\n    mid = (lo + hi) / 2\n    if grid[row][mid] < 0:\n        hi = mid\n    else:\n        lo = mid + 1\nnegatives_in_row = n - lo\n```",
      "level": "pseudocode"
    },
    {
      "title": "O(m+n) Staircase Walk",
      "body": "Start at the top-right corner `(row=0, col=n-1)`. If the current element is negative, all elements below it in the same column are also negative (add `m - row` to the count, then move left). Otherwise, move down. This uses both row and column sorting simultaneously.",
      "level": "strategy"
    },
    {
      "title": "Common Pitfall: Off-by-One",
      "body": "When binary searching, make sure your `hi` is initialized to `n` (not `n-1`), so that the result correctly represents 'all n elements are negative' or 'no elements are negative'.",
      "level": "pitfall"
    }
  ],

  signature: {
    "name": "countNegatives",
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
            4,
            3,
            2,
            -1
          ],
          [
            3,
            2,
            1,
            -1
          ],
          [
            1,
            1,
            -1,
            -2
          ],
          [
            -1,
            -1,
            -2,
            -3
          ]
        ]
      ],
      "expected": 8,
      "hidden": false
    },
    {
      "input": [
        [
          [
            3,
            2
          ],
          [
            1,
            0
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
            -1,
            -2
          ],
          [
            -3,
            -4
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
            5,
            1,
            0,
            -5
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
            -1
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
            0,
            -1,
            -2,
            -3
          ]
        ]
      ],
      "expected": 3,
      "hidden": true
    },
    {
      "input": [
        [
          [
            3,
            3,
            3
          ],
          [
            2,
            2,
            2
          ],
          [
            1,
            1,
            1
          ],
          [
            0,
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
            -1,
            -1,
            -1
          ],
          [
            -1,
            -1,
            -1
          ],
          [
            -1,
            -1,
            -1
          ]
        ]
      ],
      "expected": 9,
      "hidden": true
    },
    {
      "input": [
        [
          [
            5,
            4,
            3,
            2,
            1,
            0,
            -1,
            -2,
            -3,
            -4
          ]
        ]
      ],
      "expected": 4,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_negatives(grid: list[list[int]]) -> int:
    # TODO: implement
    return 0
`,
    javascript: `/**
 * @param {number[][]} grid
 * @return {number}
 */
function countNegatives(grid) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function countNegatives(grid: number[][]): number {
    // TODO: implement
    return 0;
}
`,
    java: `class Solution {
    public int countNegatives(int[][] grid) {
        // TODO: implement
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int CountNegatives(int[][] grid) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int countNegatives(int** grid, int gridSize, int* gridColSize) {
    // TODO: implement
    return 0;
}
`,
    cpp: `class Solution {
public:
    int countNegatives(vector<vector<int>>& grid) {
        // TODO: implement
        return 0;
    }
};
`,
  },
  solutions: {
    python: `def count_negatives(grid: list[list[int]]) -> int:
    count = 0
    m = len(grid)
    n = len(grid[0])
    for row in grid:
        lo, hi = 0, n
        while lo < hi:
            mid = (lo + hi) // 2
            if row[mid] < 0:
                hi = mid
            else:
                lo = mid + 1
        count += n - lo
    return count
`,
    javascript: `function countNegatives(grid) {
    let count = 0;
    const m = grid.length;
    const n = grid[0].length;
    for (let r = 0; r < m; r++) {
        let lo = 0, hi = n;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (grid[r][mid] < 0) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        count += n - lo;
    }
    return count;
}
`,
    typescript: `function countNegatives(grid: number[][]): number {
    let count = 0;
    const m = grid.length;
    const n = grid[0].length;
    for (let r = 0; r < m; r++) {
        let lo = 0, hi = n;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (grid[r][mid] < 0) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        count += n - lo;
    }
    return count;
}
`,
    java: `class Solution {
    public int countNegatives(int[][] grid) {
        int count = 0;
        int m = grid.length;
        int n = grid[0].length;
        for (int r = 0; r < m; r++) {
            int lo = 0, hi = n;
            while (lo < hi) {
                int mid = (lo + hi) / 2;
                if (grid[r][mid] < 0) {
                    hi = mid;
                } else {
                    lo = mid + 1;
                }
            }
            count += n - lo;
        }
        return count;
    }
}
`,
    csharp: `public class Solution {
    public int CountNegatives(int[][] grid) {
        int count = 0;
        int m = grid.Length;
        int n = grid[0].Length;
        for (int r = 0; r < m; r++) {
            int lo = 0, hi = n;
            while (lo < hi) {
                int mid = (lo + hi) / 2;
                if (grid[r][mid] < 0) {
                    hi = mid;
                } else {
                    lo = mid + 1;
                }
            }
            count += n - lo;
        }
        return count;
    }
}
`,
    c: `int countNegatives(int** grid, int gridSize, int* gridColSize) {
    int count = 0;
    for (int r = 0; r < gridSize; r++) {
        int n = gridColSize[r];
        int lo = 0, hi = n;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (grid[r][mid] < 0) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        count += n - lo;
    }
    return count;
}
`,
    cpp: `class Solution {
public:
    int countNegatives(vector<vector<int>>& grid) {
        int count = 0;
        int m = grid.size();
        int n = grid[0].size();
        for (int r = 0; r < m; r++) {
            int lo = 0, hi = n;
            while (lo < hi) {
                int mid = (lo + hi) / 2;
                if (grid[r][mid] < 0) {
                    hi = mid;
                } else {
                    lo = mid + 1;
                }
            }
            count += n - lo;
        }
        return count;
    }
};
`,
  },
  editorial: `## Approach: Binary Search Per Row

### Intuition
Each row of the matrix is sorted in non-increasing order. To count the negatives in a row, we can binary search for the **leftmost index** where the value becomes negative. If that index is \`k\`, then there are \`n - k\` negative numbers in that row.

### Algorithm
1. For each row \`r\`, binary search for the smallest column index \`k\` such that \`grid[r][k] < 0\`.
2. Use \`lo = 0\`, \`hi = n\`. At each step, check the midpoint:
   - If \`grid[r][mid] < 0\`, the answer is at \`mid\` or earlier → \`hi = mid\`
   - Otherwise → \`lo = mid + 1\`
3. After the loop, \`lo\` is the first index of a negative number (or \`n\` if none). Add \`n - lo\` to the total count.

### Complexity
- **Time:** O(m · log n) — binary search for each of \`m\` rows.
- **Space:** O(1) — no extra memory used.

### Alternative: O(m + n) Staircase
Start at the top-right corner \`(0, n-1)\`. If the element is negative, everything below in the same column is also negative (add \`m - row\` to count, move left). Otherwise, move down. This leverages both the row-wise and column-wise sorting.`,
};

export default problem;
