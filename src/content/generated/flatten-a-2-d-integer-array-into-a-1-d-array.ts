import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "flatten-a-2-d-integer-array-into-a-1-d-array",
  title: "Flatten a 2D Array",
  difficulty: "medium",
  category: "foundations",
  order: 1031,
  description: `Given a 2D integer array \`matrix\` (which may be **jagged** — rows can have different lengths), return a 1D integer array containing all elements of \`matrix\` in **row-major order**: left-to-right within each row, top-to-bottom across rows.

\`\`\`text
Example 1:
Input:  matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,4,5,6,7,8,9]
Explanation: Row 0 -> [1,2,3], row 1 -> [4,5,6], row 2 -> [7,8,9].
\`\`\`

\`\`\`text
Example 2:
Input:  matrix = [[1,2,3],[4,5],[6]]
Output: [1,2,3,4,5,6]
Explanation: Rows have lengths 3, 2, and 1; elements are appended left-to-right, top-to-bottom.
\`\`\`

**Constraints:**
- \`0 <= m <= 100\` (number of rows)
- \`0 <= cols_i <= 100\` (number of elements in row \`i\`; rows may differ in length)
- \`-10000 <= matrix[i][j] <= 10000\``,
  hints: [
    `A nested loop — outer over rows, inner over each row's elements — visits every element exactly once in the correct order.`,
    `Rows may have different lengths (jagged array). Use each row's own length rather than assuming a fixed column count.`,
    `In Java and C you must allocate the output array before filling it. Sum up all row lengths first to compute the total element count.`,
    `In C, the harness provides \`int* matrixColSize\` where \`matrixColSize[i]\` is the length of row \`i\`. Use this when iterating over each row.`,
  ],
  signature: {
    "name": "flattenMatrix",
    "params": [
      {
        "name": "matrix",
        "type": "int[][]"
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
        ]
      ],
      "expected": [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9
      ],
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
            3,
            4
          ]
        ]
      ],
      "expected": [
        1,
        2,
        3,
        4
      ],
      "hidden": false
    },
    {
      "input": [
        [
          [
            5
          ]
        ]
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
            2,
            3,
            4,
            5
          ]
        ]
      ],
      "expected": [
        1,
        2,
        3,
        4,
        5
      ],
      "hidden": true
    },
    {
      "input": [
        [
          [
            1
          ],
          [
            2
          ],
          [
            3
          ],
          [
            4
          ]
        ]
      ],
      "expected": [
        1,
        2,
        3,
        4
      ],
      "hidden": true
    },
    {
      "input": [
        [
          [
            -1,
            -2,
            3
          ],
          [
            4,
            -5,
            6
          ]
        ]
      ],
      "expected": [
        -1,
        -2,
        3,
        4,
        -5,
        6
      ],
      "hidden": true
    },
    {
      "input": [
        [
          [
            7,
            7,
            7
          ],
          [
            7,
            7,
            7
          ]
        ]
      ],
      "expected": [
        7,
        7,
        7,
        7,
        7,
        7
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
            5
          ],
          [
            6
          ]
        ]
      ],
      "expected": [
        1,
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
            -10000
          ],
          [
            10000
          ]
        ]
      ],
      "expected": [
        -10000,
        10000
      ],
      "hidden": true
    }
  ],
  starterCode: {
    python: `def flatten_matrix(matrix):
    # TODO: implement
    return []
`,
    javascript: `function flattenMatrix(matrix) {
    // TODO: implement
    return [];
}
`,
    typescript: `function flattenMatrix(matrix: number[][]): number[] {
    // TODO: implement
    return [];
}`,
    java: `class Solution {
    public int[] flattenMatrix(int[][] matrix) {
        // TODO: implement
        return new int[]{};
    }
}
`,
    csharp: `public class Solution {
    public int[] FlattenMatrix(int[][] matrix) {
        // TODO: implement
        return new int[]{};
    }
}`,
    c: `int* flattenMatrix(int** matrix, int matrixSize, int* matrixColSize, int* returnSize) {
    // TODO: implement
    *returnSize = 0;
    return NULL;
}
`,
    cpp: `class Solution {
public:
    vector<int> flattenMatrix(vector<vector<int>>& matrix) {
        // TODO: implement
        return {};
    }
};`,
  },
  solutions: {
    python: `def flatten_matrix(matrix):
    result = []
    for row in matrix:
        for val in row:
            result.append(val)
    return result
`,
    javascript: `function flattenMatrix(matrix) {
    const result = [];
    for (const row of matrix) {
        for (const val of row) {
            result.push(val);
        }
    }
    return result;
}
`,
    typescript: `function flattenMatrix(matrix: number[][]): number[] {
    const result: number[] = [];
    for (const row of matrix) {
        for (const val of row) {
            result.push(val);
        }
    }
    return result;
}`,
    java: `class Solution {
    public int[] flattenMatrix(int[][] matrix) {
        int total = 0;
        for (int[] row : matrix) {
            total += row.length;
        }
        int[] result = new int[total];
        int idx = 0;
        for (int[] row : matrix) {
            for (int val : row) {
                result[idx++] = val;
            }
        }
        return result;
    }
}
`,
    csharp: `using System.Collections.Generic;

public class Solution {
    public int[] FlattenMatrix(int[][] matrix) {
        List<int> result = new List<int>();
        foreach (int[] row in matrix) {
            foreach (int val in row) {
                result.Add(val);
            }
        }
        return result.ToArray();
    }
}`,
    c: `#include <stdlib.h>

int* flattenMatrix(int** matrix, int matrixSize, int* matrixColSize, int* returnSize) {
    int total = 0;
    for (int i = 0; i < matrixSize; i++) {
        total += matrixColSize[i];
    }
    *returnSize = total;
    if (total == 0) {
        return NULL;
    }
    int* result = (int*)malloc(total * sizeof(int));
    int idx = 0;
    for (int i = 0; i < matrixSize; i++) {
        for (int j = 0; j < matrixColSize[i]; j++) {
            result[idx++] = matrix[i][j];
        }
    }
    return result;
}
`,
    cpp: `class Solution {
public:
    vector<int> flattenMatrix(vector<vector<int>>& matrix) {
        vector<int> result;
        for (const vector<int>& row : matrix) {
            for (int val : row) {
                result.push_back(val);
            }
        }
        return result;
    }
};`,
  },
  editorial: `## Approach: Row-by-Row Traversal

Iterate through every row of \`matrix\`; within each row iterate through every element and append it to the output array in order.

### Algorithm

1. **Compute total size** (required in statically-typed languages): sum the length of each individual row.
2. **Allocate** an output array of that total size.
3. **Fill**: for each row \`i\` from \`0\` to \`m-1\`, for each index \`j\` from \`0\` to \`len(row_i)-1\`, write \`matrix[i][j]\` to the next position in the output.

### Handling jagged arrays

Because rows can have different lengths, always query each row's own length rather than assuming a fixed column count. In C, the harness supplies \`matrixColSize[i]\` for this purpose; in Java use \`row.length\`; in Python/JS use \`len(row)\` or the implicit iteration length.

### Complexity

| Metric | Value |
|--------|-------|
| Time   | O(m · n̄) — every element is visited exactly once |
| Space  | O(m · n̄) — the output array (input storage not counted) |

where \`m\` is the number of rows and \`n̄\` is the average row length.`,
};

export default problem;
