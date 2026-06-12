import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "squares-of-a-sorted-array-return-in-sorted-order",
  title: "Squares of a Sorted Array",
  difficulty: "easy",
  category: "two-pointers",
  order: 1064,
  description: `Given an integer array \`nums\` sorted in **non-decreasing** order, return an array of the **squares of each number** also sorted in non-decreasing order.

You must solve it in **O(n)** time using a two-pointer approach.

\`\`\`text
Example 1:
Input:  nums = [-4, -1, 0, 3, 10]
Output: [0, 1, 9, 16, 100]
Explanation: After squaring: [16, 1, 0, 9, 100] → sorted: [0, 1, 9, 16, 100]

Example 2:
Input:  nums = [-7, -3, 2, 3, 11]
Output: [4, 9, 9, 49, 121]
Explanation: After squaring: [49, 9, 4, 9, 121] → sorted: [4, 9, 9, 49, 121]
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 10^4\`
- \`-10^4 <= nums[i] <= 10^4\`
- \`nums\` is sorted in non-decreasing order.`,
  hints: [
    `The largest square must come from either the leftmost or the rightmost element of the sorted array — which end has the larger absolute value?`,
    `Use two pointers starting at both ends. Compare absolute values and place the larger square at the current rightmost unfilled position of the result array, moving inward.`,
    `Fill the result array from right to left, always picking the bigger square from the two pointer ends.`,
  ],
  signature: {
    "name": "sortedSquares",
    "params": [
      {
        "name": "nums",
        "type": "int[]"
      }
    ],
    "returns": "int[]",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        [
          -4,
          -1,
          0,
          3,
          10
        ]
      ],
      "expected": [
        0,
        1,
        9,
        16,
        100
      ],
      "hidden": false
    },
    {
      "input": [
        [
          -7,
          -3,
          2,
          3,
          11
        ]
      ],
      "expected": [
        4,
        9,
        9,
        49,
        121
      ],
      "hidden": false
    },
    {
      "input": [
        [
          0,
          1,
          2,
          3,
          4
        ]
      ],
      "expected": [
        0,
        1,
        4,
        9,
        16
      ],
      "hidden": false
    },
    {
      "input": [
        [
          -5,
          -3,
          -2,
          -1
        ]
      ],
      "expected": [
        1,
        4,
        9,
        25
      ],
      "hidden": true
    },
    {
      "input": [
        [
          0
        ]
      ],
      "expected": [
        0
      ],
      "hidden": true
    },
    {
      "input": [
        [
          -1
        ]
      ],
      "expected": [
        1
      ],
      "hidden": true
    },
    {
      "input": [
        [
          -10,
          -5,
          0,
          5,
          10
        ]
      ],
      "expected": [
        0,
        25,
        25,
        100,
        100
      ],
      "hidden": true
    },
    {
      "input": [
        [
          -3,
          -2,
          -1,
          0
        ]
      ],
      "expected": [
        0,
        1,
        4,
        9
      ],
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          3,
          4,
          5
        ]
      ],
      "expected": [
        1,
        4,
        9,
        16,
        25
      ],
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
          3,
          4,
          5
        ]
      ],
      "expected": [
        0,
        1,
        1,
        4,
        4,
        9,
        9,
        16,
        16,
        25,
        25
      ],
      "hidden": true
    }
  ],
  starterCode: {
    python: `def sorted_squares(nums):
    # TODO: implement using two pointers
    return []
`,
    javascript: `function sortedSquares(nums) {
    // TODO: implement using two pointers
    return [];
}
`,
    java: `class Solution {
    public int[] sortedSquares(int[] nums) {
        // TODO: implement using two pointers
        return new int[]{};
    }
}
`,
    c: `int* sortedSquares(int* nums, int numsSize, int* returnSize) {
    // TODO: implement using two pointers
    *returnSize = 0;
    return NULL;
}
`,
  },
  solutions: {
    python: `def sorted_squares(nums):
    n = len(nums)
    result = [0] * n
    left, right = 0, n - 1
    pos = n - 1
    while left <= right:
        if abs(nums[left]) >= abs(nums[right]):
            result[pos] = nums[left] * nums[left]
            left += 1
        else:
            result[pos] = nums[right] * nums[right]
            right -= 1
        pos -= 1
    return result
`,
    javascript: `function sortedSquares(nums) {
    const n = nums.length;
    const result = new Array(n).fill(0);
    let left = 0, right = n - 1, pos = n - 1;
    while (left <= right) {
        if (Math.abs(nums[left]) >= Math.abs(nums[right])) {
            result[pos] = nums[left] * nums[left];
            left++;
        } else {
            result[pos] = nums[right] * nums[right];
            right--;
        }
        pos--;
    }
    return result;
}
`,
    java: `class Solution {
    public int[] sortedSquares(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];
        int left = 0, right = n - 1, pos = n - 1;
        while (left <= right) {
            if (Math.abs(nums[left]) >= Math.abs(nums[right])) {
                result[pos] = nums[left] * nums[left];
                left++;
            } else {
                result[pos] = nums[right] * nums[right];
                right--;
            }
            pos--;
        }
        return result;
    }
}
`,
    c: `#include <stdlib.h>
int* sortedSquares(int* nums, int numsSize, int* returnSize) {
    *returnSize = numsSize;
    int* result = (int*)malloc(numsSize * sizeof(int));
    int left = 0, right = numsSize - 1, pos = numsSize - 1;
    while (left <= right) {
        int absLeft  = nums[left]  < 0 ? -nums[left]  : nums[left];
        int absRight = nums[right] < 0 ? -nums[right] : nums[right];
        if (absLeft >= absRight) {
            result[pos] = nums[left] * nums[left];
            left++;
        } else {
            result[pos] = nums[right] * nums[right];
            right--;
        }
        pos--;
    }
    return result;
}
`,
  },
  editorial: `## Approach: Two Pointers (Fill from the Right)

### Key Insight
Because \`nums\` is already sorted, the **largest square** must come from one of the two ends — whichever has the larger absolute value. The smallest square sits somewhere in the middle where values are closest to zero.

We exploit this by using two pointers (\`left\` at the start, \`right\` at the end) and filling the result array **from right to left**.

### Algorithm
1. Initialize \`left = 0\`, \`right = n - 1\`, \`pos = n - 1\`.
2. While \`left <= right\`:
   - Compare \`|nums[left]|\` and \`|nums[right]|\`.
   - Place the **larger** square at \`result[pos]\` and advance the corresponding pointer inward.
   - Decrement \`pos\`.
3. Return \`result\`.

\`\`\`python
def sorted_squares(nums):
    n = len(nums)
    result = [0] * n
    left, right, pos = 0, n - 1, n - 1
    while left <= right:
        if abs(nums[left]) >= abs(nums[right]):
            result[pos] = nums[left] ** 2
            left += 1
        else:
            result[pos] = nums[right] ** 2
            right -= 1
        pos -= 1
    return result
\`\`\`

### Complexity
- **Time:** O(n) — each element is visited exactly once.
- **Space:** O(n) — for the output array (no extra space beyond that).

A naive approach (square all, then sort) is O(n log n). The two-pointer technique achieves optimal O(n) by leveraging the pre-sorted order.`,
};

export default problem;
