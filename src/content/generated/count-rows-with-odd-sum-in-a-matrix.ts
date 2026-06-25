import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-rows-with-odd-sum-in-a-matrix",
  title: "Count Rows with Odd Sum",
  difficulty: "easy",
  category: "trees-graphs",
  order: 3021,
  description: `Given an integer matrix, return how many rows have an odd row sum.

\`\`\`text
Example 1:
Input:  matrix = [[1,2],[3,5],[2,2]]
Output: 1

Example 2:
Input:  matrix = [[1],[2],[3]]
Output: 2
\`\`\`

**Constraints:**
- \`1 <= matrix.length <= 100\``,
  hints: [
    `Compute a sum for each row.`,
    `Use \`sum % 2\` to test oddness.`,
  ],

  signature: {
    "name": "countOddSumRows",
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
            2
          ],
          [
            3,
            5
          ],
          [
            2,
            2
          ]
        ]
      ],
      "expected": 1,
      "hidden": false
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
            5,
            5,
            1
          ]
        ]
      ],
      "expected": 1,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_odd_sum_rows(matrix: list[list[int]]) -> int:
    # TODO: implement
    return 0
`,
    javascript: `function countOddSumRows(matrix) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function countOddSumRows(matrix: number[][]): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int countOddSumRows(int[][] matrix) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int countOddSumRows(int** matrix, int matrixSize, int* matrixColSize) {
    // TODO: implement
    return 0;
}
`,
  },
  solutions: {
    python: `def count_odd_sum_rows(matrix: list[list[int]]) -> int:
    count = 0
    for row in matrix:
        if sum(row) % 2 != 0:
            count += 1
    return count
`,
    javascript: `function countOddSumRows(matrix) {
    let count = 0;
    for (const row of matrix) {
        let sum = 0;
        for (const value of row) sum += value;
        if (sum % 2 !== 0) count++;
    }
    return count;
}
`,
    typescript: `function countOddSumRows(matrix: number[][]): number {
    let count = 0;
    for (const row of matrix) {
        let sum = 0;
        for (const value of row) sum += value;
        if (sum % 2 !== 0) count++;
    }
    return count;
}`,
    java: `class Solution {
    public int countOddSumRows(int[][] matrix) {
        int count = 0;
        for (int[] row : matrix) {
            int sum = 0;
            for (int value : row) sum += value;
            if (sum % 2 != 0) count++;
        }
        return count;
    }
}
`,
    c: `int countOddSumRows(int** matrix, int matrixSize, int* matrixColSize) {
    int count = 0;
    for (int r = 0; r < matrixSize; r++) {
        int sum = 0;
        for (int c = 0; c < matrixColSize[r]; c++) sum += matrix[r][c];
        if (sum % 2 != 0) count++;
    }
    return count;
}
`,
  },
  editorial: `For each row, compute the row sum and count it if the sum is odd.`,
};

export default problem;
