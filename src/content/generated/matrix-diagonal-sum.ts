import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "matrix-diagonal-sum",
  title: "Matrix Diagonal Sum",
  difficulty: "easy",
  category: "trees-graphs",
  order: 3020,
  description: `Given a square integer matrix, return the sum of its main diagonal and anti-diagonal. If the matrix has a center cell, count it only once.

\`\`\`text
Example 1:
Input:  matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: 25

Example 2:
Input:  matrix = [[1,2],[3,4]]
Output: 10
\`\`\`

**Constraints:**
- \`1 <= matrix.length <= 100\`
- \`matrix\` is square`,
  hints: [
    `Main diagonal uses \`(i, i)\`.`,
    `Anti-diagonal uses \`(i, n - 1 - i)\`. Avoid double-counting the middle.`,
  ],

  signature: {
    "name": "matrixDiagonalSum",
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
      "expected": 25,
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
      "expected": 10,
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
      "expected": 5,
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
        ]
      ],
      "expected": 5,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def matrix_diagonal_sum(matrix: list[list[int]]) -> int:
    # TODO: implement
    return 0
`,
    javascript: `function matrixDiagonalSum(matrix) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function matrixDiagonalSum(matrix: number[][]): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int matrixDiagonalSum(int[][] matrix) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int matrixDiagonalSum(int** matrix, int matrixSize, int* matrixColSize) {
    // TODO: implement
    return 0;
}
`,
  },
  solutions: {
    python: `def matrix_diagonal_sum(matrix: list[list[int]]) -> int:
    n = len(matrix)
    total = 0
    for i in range(n):
        total += matrix[i][i]
        j = n - 1 - i
        if j != i:
            total += matrix[i][j]
    return total
`,
    javascript: `function matrixDiagonalSum(matrix) {
    const n = matrix.length;
    let total = 0;
    for (let i = 0; i < n; i++) {
        total += matrix[i][i];
        const j = n - 1 - i;
        if (j !== i) total += matrix[i][j];
    }
    return total;
}
`,
    typescript: `function matrixDiagonalSum(matrix: number[][]): number {
    const n = matrix.length;
    let total = 0;
    for (let i = 0; i < n; i++) {
        total += matrix[i][i];
        const j = n - 1 - i;
        if (j !== i) total += matrix[i][j];
    }
    return total;
}`,
    java: `class Solution {
    public int matrixDiagonalSum(int[][] matrix) {
        int n = matrix.length;
        int total = 0;
        for (int i = 0; i < n; i++) {
            total += matrix[i][i];
            int j = n - 1 - i;
            if (j != i) total += matrix[i][j];
        }
        return total;
    }
}
`,
    c: `int matrixDiagonalSum(int** matrix, int matrixSize, int* matrixColSize) {
    int n = matrixSize;
    int total = 0;
    for (int i = 0; i < n; i++) {
        total += matrix[i][i];
        int j = n - 1 - i;
        if (j != i) total += matrix[i][j];
    }
    return total;
}
`,
  },
  editorial: `Walk one row at a time and add both diagonal positions. Skip the anti-diagonal addition when it is the same center cell.`,
};

export default problem;
