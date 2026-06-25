import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "richest-row-sum-in-a-matrix",
  title: "Richest Row Sum in a Matrix",
  difficulty: "easy",
  category: "arrays-hashing",
  order: 3023,
  description: `Given an integer matrix, return the largest sum of any row.

\`\`\`text
Example 1:
Input:  matrix = [[1,2,3],[3,2,1]]
Output: 6

Example 2:
Input:  matrix = [[1,5],[7,3],[3,5]]
Output: 10
\`\`\`

**Constraints:**
- \`1 <= matrix.length <= 100\``,
  hints: [
    `Compute each row sum independently.`,
    `Keep the maximum row sum seen so far.`,
  ],

  signature: {
    "name": "richestRowSum",
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
            3,
            2,
            1
          ]
        ]
      ],
      "expected": 6,
      "hidden": false
    },
    {
      "input": [
        [
          [
            1,
            5
          ],
          [
            7,
            3
          ],
          [
            3,
            5
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
            -1,
            -2
          ],
          [
            -3,
            -4
          ]
        ]
      ],
      "expected": -3,
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
    }
  ],
  starterCode: {
    python: `def richest_row_sum(matrix: list[list[int]]) -> int:
    # TODO: implement
    return 0
`,
    javascript: `function richestRowSum(matrix) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function richestRowSum(matrix: number[][]): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int richestRowSum(int[][] matrix) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int richestRowSum(int** matrix, int matrixSize, int* matrixColSize) {
    // TODO: implement
    return 0;
}
`,
  },
  solutions: {
    python: `def richest_row_sum(matrix: list[list[int]]) -> int:
    best = None
    for row in matrix:
        total = sum(row)
        if best is None or total > best:
            best = total
    return best if best is not None else 0
`,
    javascript: `function richestRowSum(matrix) {
    let best = null;
    for (const row of matrix) {
        let total = 0;
        for (const value of row) total += value;
        if (best === null || total > best) best = total;
    }
    return best === null ? 0 : best;
}
`,
    typescript: `function richestRowSum(matrix: number[][]): number {
    let best: number | null = null;
    for (const row of matrix) {
        let total = 0;
        for (const value of row) total += value;
        if (best === null || total > best) best = total;
    }
    return best === null ? 0 : best;
}`,
    java: `class Solution {
    public int richestRowSum(int[][] matrix) {
        int best = Integer.MIN_VALUE;
        for (int[] row : matrix) {
            int total = 0;
            for (int value : row) total += value;
            best = Math.max(best, total);
        }
        return best == Integer.MIN_VALUE ? 0 : best;
    }
}
`,
    c: `int richestRowSum(int** matrix, int matrixSize, int* matrixColSize) {
    int has = 0;
    int best = 0;
    for (int r = 0; r < matrixSize; r++) {
        int total = 0;
        for (int c = 0; c < matrixColSize[r]; c++) total += matrix[r][c];
        if (!has || total > best) { best = total; has = 1; }
    }
    return best;
}
`,
  },
  editorial: `Row sums can be compared independently. Track the maximum as you scan.`,
};

export default problem;
