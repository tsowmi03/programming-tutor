import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "search-a-row-wise-sorted-2-d-matrix",
  title: "Search a Row-Wise Sorted 2D Matrix",
  difficulty: "medium",
  category: "binary-search",
  order: 1026,
  description: `You are given a 2D matrix \`matrix\` of size \`m x n\` where each row is sorted in non-decreasing order. Given an integer \`target\`, return \`true\` if \`target\` exists in the matrix, or \`false\` otherwise.

**Note:** Unlike a fully sorted matrix, the first element of a row is **not** necessarily greater than the last element of the previous row. Each row is independently sorted.

\`\`\`text
Example 1:
Input:  matrix = [[1,3,5,7],[2,4,6,8],[10,11,12,13]], target = 6
Output: true
Explanation: 6 is found in row 1 at index 2.
\`\`\`

\`\`\`text
Example 2:
Input:  matrix = [[1,3,5,7],[2,4,6,8],[10,11,12,13]], target = 9
Output: false
Explanation: 9 does not exist in the matrix.
\`\`\`

\`\`\`text
Example 3:
Input:  matrix = [[5]], target = 5
Output: true
\`\`\`

**Constraints:**
- \`1 <= m, n <= 200\`
- \`-10^4 <= matrix[i][j], target <= 10^4\`
- Each row is sorted in non-decreasing order.`,
  hints: [
    `Each row is independently sorted — can you binary search within each row?`,
    `Before binary-searching a row, you can quickly check whether the target could possibly be in that row by comparing it against the first and last elements.`,
    `Combining the row-range check with binary search keeps the overall complexity to O(m log n).`,
  ],
  guidance: [
    {
      "title": "Start simple: linear scan of rows",
      "body": "Iterate over each row. Since each row is sorted, you can check in O(1) whether `target` is in the range `[row[0], row[n-1]]` before doing anything more expensive.",
      "level": "nudge"
    },
    {
      "title": "Binary search within a candidate row",
      "body": "Once you've identified a row where `row[0] <= target <= row[n-1]`, apply standard binary search on that row. If found, return true; otherwise continue to the next row.",
      "level": "strategy"
    },
    {
      "title": "Watch out for duplicate boundary values",
      "body": "Multiple rows may satisfy the range check (e.g., if rows overlap). Don't stop at the first row that fails binary search — keep checking other rows whose range includes the target.",
      "level": "pitfall"
    },
    {
      "title": "Overall complexity",
      "body": "The row-range filter is O(1) per row, and binary search per row is O(log n). With m rows total, the overall complexity is O(m log n), much better than a brute-force O(m * n).",
      "level": "strategy"
    },
    {
      "title": "Implementation shape",
      "body": "```\nfor each row in matrix:\n    if row[0] <= target <= row[last]:\n        lo, hi = 0, last\n        while lo <= hi:\n            mid = (lo + hi) / 2\n            if row[mid] == target: return true\n            elif row[mid] < target: lo = mid + 1\n            else: hi = mid - 1\nreturn false\n```",
      "level": "pseudocode"
    }
  ],

  signature: {
    "name": "searchMatrix",
    "params": [
      {
        "name": "matrix",
        "type": "int[][]"
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
          [
            1,
            3,
            5,
            7
          ],
          [
            2,
            4,
            6,
            8
          ],
          [
            10,
            11,
            12,
            13
          ]
        ],
        6
      ],
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        [
          [
            1,
            3,
            5,
            7
          ],
          [
            2,
            4,
            6,
            8
          ],
          [
            10,
            11,
            12,
            13
          ]
        ],
        9
      ],
      "expected": false,
      "hidden": false
    },
    {
      "input": [
        [
          [
            5
          ]
        ],
        5
      ],
      "expected": true,
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
          ],
          [
            7,
            8,
            9
          ]
        ],
        1
      ],
      "expected": true,
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
          ],
          [
            7,
            8,
            9
          ]
        ],
        10
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        [
          [
            1,
            4,
            7,
            11
          ],
          [
            2,
            5,
            8,
            12
          ],
          [
            3,
            6,
            9,
            16
          ]
        ],
        5
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          [
            -5,
            -3,
            -1
          ],
          [
            0,
            2,
            4
          ],
          [
            6,
            8,
            10
          ]
        ],
        -3
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          [
            -5,
            -3,
            -1
          ],
          [
            0,
            2,
            4
          ],
          [
            6,
            8,
            10
          ]
        ],
        5
      ],
      "expected": false,
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
        ],
        1
      ],
      "expected": true,
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
        ],
        2
      ],
      "expected": false,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def search_matrix(matrix: list[list[int]], target: int) -> bool:
    # TODO: implement
    return False
`,
    javascript: `/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
function searchMatrix(matrix, target) {
    // TODO: implement
    return false;
}
`,
    typescript: `function searchMatrix(matrix: number[][], target: number): boolean {
    // TODO: implement
    return false;
}
`,
    java: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        // TODO: implement
        return false;
    }
}
`,
    csharp: `public class Solution {
    public bool SearchMatrix(int[][] matrix, int target) {
        // TODO: implement
        return false;
    }
}
`,
    c: `#include <stdbool.h>
bool searchMatrix(int** matrix, int matrixSize, int* matrixColSize, int target) {
    // TODO: implement
    return false;
}
`,
    cpp: `class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        // TODO: implement
        return false;
    }
};
`,
  },
  solutions: {
    python: `def search_matrix(matrix: list[list[int]], target: int) -> bool:
    for row in matrix:
        if row[0] <= target <= row[-1]:
            lo, hi = 0, len(row) - 1
            while lo <= hi:
                mid = (lo + hi) // 2
                if row[mid] == target:
                    return True
                elif row[mid] < target:
                    lo = mid + 1
                else:
                    hi = mid - 1
    return False
`,
    javascript: `function searchMatrix(matrix, target) {
    for (const row of matrix) {
        if (row[0] <= target && target <= row[row.length - 1]) {
            let lo = 0, hi = row.length - 1;
            while (lo <= hi) {
                const mid = (lo + hi) >> 1;
                if (row[mid] === target) return true;
                else if (row[mid] < target) lo = mid + 1;
                else hi = mid - 1;
            }
        }
    }
    return false;
}
`,
    typescript: `function searchMatrix(matrix: number[][], target: number): boolean {
    for (const row of matrix) {
        if (row[0] <= target && target <= row[row.length - 1]) {
            let lo = 0, hi = row.length - 1;
            while (lo <= hi) {
                const mid = (lo + hi) >> 1;
                if (row[mid] === target) return true;
                else if (row[mid] < target) lo = mid + 1;
                else hi = mid - 1;
            }
        }
    }
    return false;
}
`,
    java: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        for (int[] row : matrix) {
            int n = row.length;
            if (row[0] <= target && target <= row[n - 1]) {
                int lo = 0, hi = n - 1;
                while (lo <= hi) {
                    int mid = (lo + hi) >>> 1;
                    if (row[mid] == target) return true;
                    else if (row[mid] < target) lo = mid + 1;
                    else hi = mid - 1;
                }
            }
        }
        return false;
    }
}
`,
    csharp: `public class Solution {
    public bool SearchMatrix(int[][] matrix, int target) {
        foreach (var row in matrix) {
            int n = row.Length;
            if (row[0] <= target && target <= row[n - 1]) {
                int lo = 0, hi = n - 1;
                while (lo <= hi) {
                    int mid = (lo + hi) / 2;
                    if (row[mid] == target) return true;
                    else if (row[mid] < target) lo = mid + 1;
                    else hi = mid - 1;
                }
            }
        }
        return false;
    }
}
`,
    c: `#include <stdbool.h>
bool searchMatrix(int** matrix, int matrixSize, int* matrixColSize, int target) {
    for (int i = 0; i < matrixSize; i++) {
        int n = matrixColSize[i];
        if (matrix[i][0] <= target && target <= matrix[i][n - 1]) {
            int lo = 0, hi = n - 1;
            while (lo <= hi) {
                int mid = (lo + hi) / 2;
                if (matrix[i][mid] == target) return true;
                else if (matrix[i][mid] < target) lo = mid + 1;
                else hi = mid - 1;
            }
        }
    }
    return false;
}
`,
    cpp: `class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        for (auto& row : matrix) {
            int n = (int)row.size();
            if (row[0] <= target && target <= row[n - 1]) {
                int lo = 0, hi = n - 1;
                while (lo <= hi) {
                    int mid = (lo + hi) / 2;
                    if (row[mid] == target) return true;
                    else if (row[mid] < target) lo = mid + 1;
                    else hi = mid - 1;
                }
            }
        }
        return false;
    }
};
`,
  },
  editorial: `## Approach: Row-Range Filter + Binary Search

### Key Insight
Since only each individual row is sorted (not the entire matrix globally), we cannot treat the matrix as a single flattened sorted array. Instead, we leverage the row-wise sort by:
1. **Filtering rows** — skip any row where \`target < row[0]\` or \`target > row[last]\`.
2. **Binary searching** within each candidate row.

### Algorithm
\`\`\`
for each row in matrix:
    if row[0] <= target <= row[n-1]:
        binary search the row for target
        if found: return true
return false
\`\`\`

### Why the range check matters
The range check eliminates rows in O(1). For most inputs this dramatically reduces the number of binary searches performed. Note that rows may overlap (the last element of row \`i\` can be larger than the first element of row \`i+1\`), so multiple rows can pass the range check — we must search all of them.

### Complexity
- **Time:** O(m log n) — at most m binary searches each costing O(log n).
- **Space:** O(1) — no extra data structures.

This is much better than a brute-force O(m·n) linear scan.`,
};

export default problem;
