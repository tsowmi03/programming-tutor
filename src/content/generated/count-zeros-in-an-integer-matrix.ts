import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-zeros-in-an-integer-matrix",
  title: "Count Zeros in an Integer Matrix",
  difficulty: "easy",
  category: "trees-graphs",
  order: 3022,
  description: `Given an integer matrix, return the number of cells equal to zero.

\`\`\`text
Example 1:
Input:  matrix = [[0,1],[2,0]]
Output: 2

Example 2:
Input:  matrix = [[1,2,3]]
Output: 0
\`\`\`

**Constraints:**
- \`1 <= matrix.length <= 100\``,
  hints: [
    `Nested loops are enough.`,
    `Increment when the current cell is exactly zero.`,
  ],

  signature: {
    "name": "countZerosInMatrix",
    "params": [
      {
        "name": "matrix",
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
            0,
            1
          ],
          [
            2,
            0
          ]
        ]
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        [
          [
            1,
            2,
            3
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
            0
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
      "expected": 4,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_zeros_in_matrix(matrix: list[list[int]]) -> int:
    # TODO: implement
    return 0
`,
    javascript: `function countZerosInMatrix(matrix) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function countZerosInMatrix(matrix: number[][]): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int countZerosInMatrix(int[][] matrix) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int countZerosInMatrix(int** matrix, int matrixSize, int* matrixColSize) {
    // TODO: implement
    return 0;
}
`,
  },
  solutions: {
    python: `def count_zeros_in_matrix(matrix: list[list[int]]) -> int:
    count = 0
    for row in matrix:
        for value in row:
            if value == 0:
                count += 1
    return count
`,
    javascript: `function countZerosInMatrix(matrix) {
    let count = 0;
    for (const row of matrix) for (const value of row) if (value === 0) count++;
    return count;
}
`,
    typescript: `function countZerosInMatrix(matrix: number[][]): number {
    let count = 0;
    for (const row of matrix) for (const value of row) if (value === 0) count++;
    return count;
}`,
    java: `class Solution {
    public int countZerosInMatrix(int[][] matrix) {
        int count = 0;
        for (int[] row : matrix) for (int value : row) if (value == 0) count++;
        return count;
    }
}
`,
    c: `int countZerosInMatrix(int** matrix, int matrixSize, int* matrixColSize) {
    int count = 0;
    for (int r = 0; r < matrixSize; r++) for (int c = 0; c < matrixColSize[r]; c++) if (matrix[r][c] == 0) count++;
    return count;
}
`,
  },
  editorial: `Visit every cell exactly once and count zero values. This is O(rows * columns).`,
};

export default problem;
