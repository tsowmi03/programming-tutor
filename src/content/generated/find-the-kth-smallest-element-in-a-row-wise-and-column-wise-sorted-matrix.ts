import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "find-the-kth-smallest-element-in-a-row-wise-and-column-wise-sorted-matrix",
  title: "Kth Smallest Element in a Sorted Matrix",
  difficulty: "medium",
  category: "binary-search",
  order: 1095,
  description: `Given an \`n x n\` matrix where each row and each column is sorted in **ascending order**, return the \`k\`-th smallest element in the matrix.

Note that it is the \`k\`-th smallest element **in sorted order**, not the \`k\`-th distinct element.

The matrix is given as a flattened integer array of length \`n*n\` in row-major order (row 0, then row 1, …). You are also given \`n\` (the dimension) and \`k\`.

\`\`\`text
Example 1:
Input:  matrix = [1,5,9,10,11,13,12,13,15], n = 3, k = 8
         (represents [[1,5,9],[10,11,13],[12,13,15]])
Output: 13
Explanation: Sorted order: [1,5,9,10,11,12,13,13,15]; 8th element is 13.
\`\`\`

\`\`\`text
Example 2:
Input:  matrix = [1,2,3,4,5,6,7,8,9], n = 3, k = 5
         (represents [[1,2,3],[4,5,6],[7,8,9]])
Output: 5
Explanation: Sorted order: [1,2,3,4,5,6,7,8,9]; 5th element is 5.
\`\`\`

**Constraints:**
- \`1 <= n <= 300\`
- \`n * n == matrix.length\`
- \`-10^9 <= matrix[i] <= 10^9\`
- Each row and column of the matrix is sorted in ascending order.
- \`1 <= k <= n * n\``,
  hints: [
    `Think about binary searching on the *value* rather than the index. What range of values could the answer lie in?`,
    `For a given mid value, can you count how many elements in the matrix are <= mid? Use the sorted property of rows and columns.`,
    `Walk from the bottom-left corner of the matrix: if the current element <= mid, all elements above it in that column are also <= mid, so add the count and move right; otherwise move up.`,
    `Find the smallest value v such that the count of elements <= v is >= k. This v is guaranteed to be an actual element in the matrix.`,
  ],
  signature: {
    "name": "kthSmallest",
    "params": [
      {
        "name": "matrix",
        "type": "int[]"
      },
      {
        "name": "n",
        "type": "int"
      },
      {
        "name": "k",
        "type": "int"
      }
    ],
    "returns": "int",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        [
          1,
          5,
          9,
          10,
          11,
          13,
          12,
          13,
          15
        ],
        3,
        8
      ],
      "expected": 13,
      "hidden": false
    },
    {
      "input": [
        [
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
        3,
        5
      ],
      "expected": 5,
      "hidden": false
    },
    {
      "input": [
        [
          1
        ],
        1,
        1
      ],
      "expected": 1,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          5,
          9,
          10,
          11,
          13,
          12,
          13,
          15
        ],
        3,
        1
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          5,
          9,
          10,
          11,
          13,
          12,
          13,
          15
        ],
        3,
        9
      ],
      "expected": 15,
      "hidden": true
    },
    {
      "input": [
        [
          -5,
          -4,
          -3,
          -2,
          -1,
          0,
          1,
          2,
          3
        ],
        3,
        3
      ],
      "expected": -3,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1
        ],
        3,
        5
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          3,
          5,
          6,
          7,
          12,
          11,
          14,
          14
        ],
        3,
        6
      ],
      "expected": 11,
      "hidden": true
    },
    {
      "input": [
        [
          -10,
          -8,
          -6,
          -5,
          -3,
          -1,
          0,
          2,
          4
        ],
        3,
        7
      ],
      "expected": 0,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def kth_smallest(matrix: list[int], n: int, k: int) -> int:
    # TODO: implement
    return 0
`,
    javascript: `function kthSmallest(matrix, n, k) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function kthSmallest(matrix: number[], n: number, k: number): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int kthSmallest(int[] matrix, int n, int k) {
        // TODO: implement
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int KthSmallest(int[] matrix, int n, int k) {
        // TODO: implement
        return 0;
    }
}`,
    c: `int kthSmallest(int* matrix, int matrixSize, int n, int k) {
    // TODO: implement
    return 0;
}
`,
    cpp: `class Solution {
public:
    int kthSmallest(vector<int>& matrix, int n, int k) {
        // TODO: implement
        return 0;
    }
};`,
  },
  solutions: {
    python: `def kth_smallest(matrix: list[int], n: int, k: int) -> int:
    def count_less_equal(mid):
        # Start from bottom-left corner
        row, col = n - 1, 0
        count = 0
        while row >= 0 and col < n:
            if matrix[row * n + col] <= mid:
                count += row + 1
                col += 1
            else:
                row -= 1
        return count

    lo, hi = matrix[0], matrix[n * n - 1]
    while lo < hi:
        mid = (lo + hi) // 2
        if count_less_equal(mid) >= k:
            hi = mid
        else:
            lo = mid + 1
    return lo
`,
    javascript: `function kthSmallest(matrix, n, k) {
    function countLessEqual(mid) {
        let row = n - 1, col = 0, count = 0;
        while (row >= 0 && col < n) {
            if (matrix[row * n + col] <= mid) {
                count += row + 1;
                col++;
            } else {
                row--;
            }
        }
        return count;
    }

    let lo = matrix[0], hi = matrix[n * n - 1];
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (countLessEqual(mid) >= k) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
}
`,
    typescript: `function kthSmallest(matrix: number[], n: number, k: number): number {
    function countLessEqual(mid: number): number {
        let row = n - 1, col = 0, count = 0;
        while (row >= 0 && col < n) {
            if (matrix[row * n + col] <= mid) {
                count += row + 1;
                col++;
            } else {
                row--;
            }
        }
        return count;
    }

    let lo = matrix[0], hi = matrix[n * n - 1];
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (countLessEqual(mid) >= k) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
}`,
    java: `class Solution {
    public int kthSmallest(int[] matrix, int n, int k) {
        int lo = matrix[0], hi = matrix[n * n - 1];
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (countLessEqual(matrix, n, mid) >= k) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

    private int countLessEqual(int[] matrix, int n, int mid) {
        int row = n - 1, col = 0, count = 0;
        while (row >= 0 && col < n) {
            if (matrix[row * n + col] <= mid) {
                count += row + 1;
                col++;
            } else {
                row--;
            }
        }
        return count;
    }
}
`,
    csharp: `public class Solution {
    public int KthSmallest(int[] matrix, int n, int k) {
        int lo = matrix[0], hi = matrix[n * n - 1];
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (CountLessEqual(matrix, n, mid) >= k) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

    private int CountLessEqual(int[] matrix, int n, int mid) {
        int row = n - 1, col = 0, count = 0;
        while (row >= 0 && col < n) {
            if (matrix[row * n + col] <= mid) {
                count += row + 1;
                col++;
            } else {
                row--;
            }
        }
        return count;
    }
}`,
    c: `int kthSmallest(int* matrix, int matrixSize, int n, int k) {
    int lo = matrix[0], hi = matrix[n * n - 1];
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        /* count elements <= mid */
        int row = n - 1, col = 0, count = 0;
        while (row >= 0 && col < n) {
            if (matrix[row * n + col] <= mid) {
                count += row + 1;
                col++;
            } else {
                row--;
            }
        }
        if (count >= k) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
}
`,
    cpp: `class Solution {
public:
    int kthSmallest(vector<int>& matrix, int n, int k) {
        int lo = matrix[0], hi = matrix[n * n - 1];
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (countLessEqual(matrix, n, mid) >= k) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

private:
    int countLessEqual(vector<int>& matrix, int n, int mid) {
        int row = n - 1, col = 0, count = 0;
        while (row >= 0 && col < n) {
            if (matrix[row * n + col] <= mid) {
                count += row + 1;
                col++;
            } else {
                row--;
            }
        }
        return count;
    }
};`,
  },
  editorial: `## Approach: Binary Search on Value

### Key Insight

Instead of searching on indices, we binary search on the **value** itself in the range \`[matrix[0][0], matrix[n-1][n-1]]\`.

For any candidate value \`mid\`, we can count how many elements in the matrix are \`<= mid\` using the sorted properties of the matrix. We find the **smallest** value \`v\` such that \`count(v) >= k\` — this value must be in the matrix and is our answer.

### Counting Elements ≤ mid in O(n)

Start at the **bottom-left corner** \`(n-1, 0)\`. At each step:
- If \`matrix[row][col] <= mid\`: all elements in that column **above** (rows 0..row) are also ≤ mid, so add \`row+1\` to count and move right (\`col++\`).
- Otherwise: the current element is too large, move up (\`row--\`).

This traversal takes O(n) time.

### Why the answer is always in the matrix

When \`lo == hi\`, we've found the smallest integer value where \`count >= k\`. The binary search always sets \`lo\` or \`hi\` to actual matrix values (only \`mid+1\` or \`mid\` which is an actual matrix value when \`count >= k\`). The loop invariant guarantees \`lo\` is eventually an element that exists in the matrix.

### Complexity

- **Time:** O(n · log(max − min)) where max and min are the largest and smallest matrix values.
- **Space:** O(1) extra space.

### Example Walkthrough

For \`matrix = [[1,5,9],[10,11,13],[12,13,15]]\`, \`k = 8\`:
- \`lo = 1\`, \`hi = 15\`
- \`mid = 8\`: count = 3 < 8 → \`lo = 9\`
- \`mid = 12\`: count = 6 < 8 → \`lo = 13\`
- \`mid = 14\`: count = 8 >= 8 → \`hi = 14\`
- \`mid = 13\`: count = 8 >= 8 → \`hi = 13\`
- \`lo == hi == 13\` → return **13** ✓`,
};

export default problem;
