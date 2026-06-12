import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "move-all-zeros-to-the-end-while-preserving-relative-order-of-non-zero-elements",
  title: "Move Zeros to End",
  difficulty: "easy",
  category: "arrays-hashing",
  order: 1051,
  description: `Given an integer array \`nums\`, return a new array with all \`0\`s moved to the **end** while the **relative order** of the non-zero elements is preserved.

\`\`\`text
Example 1:
Input:  nums = [0, 1, 0, 3, 12]
Output: [1, 3, 12, 0, 0]
Explanation: Non-zero elements [1, 3, 12] keep their relative order;
             two zeros are appended at the end.

Example 2:
Input:  nums = [0, 0, 1]
Output: [1, 0, 0]

Example 3:
Input:  nums = [1, 2, 3]
Output: [1, 2, 3]
Explanation: No zeros, so the array is unchanged.
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 10^4\`
- \`-10^9 <= nums[i] <= 10^9\``,
  hints: [
    `Try collecting all non-zero elements into a new array first.`,
    `Once you know how many non-zero elements there are, you also know exactly how many zeros should be appended at the end.`,
    `Alternatively, use a write-pointer \`j\` that starts at 0 and advances only when you place a non-zero element; then fill positions from \`j\` to the end with zeros.`,
  ],
  signature: {
    "name": "moveZeros",
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
          0,
          1,
          0,
          3,
          12
        ]
      ],
      "expected": [
        1,
        3,
        12,
        0,
        0
      ],
      "hidden": false
    },
    {
      "input": [
        [
          0,
          0,
          1
        ]
      ],
      "expected": [
        1,
        0,
        0
      ],
      "hidden": false
    },
    {
      "input": [
        [
          1,
          2,
          3
        ]
      ],
      "expected": [
        1,
        2,
        3
      ],
      "hidden": false
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
          1
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
          0,
          0,
          0
        ]
      ],
      "expected": [
        0,
        0,
        0
      ],
      "hidden": true
    },
    {
      "input": [
        [
          1,
          0,
          2,
          0,
          3,
          0
        ]
      ],
      "expected": [
        1,
        2,
        3,
        0,
        0,
        0
      ],
      "hidden": true
    },
    {
      "input": [
        [
          1,
          0,
          0,
          0,
          2
        ]
      ],
      "expected": [
        1,
        2,
        0,
        0,
        0
      ],
      "hidden": true
    },
    {
      "input": [
        [
          -1,
          0,
          2,
          0,
          -3
        ]
      ],
      "expected": [
        -1,
        2,
        -3,
        0,
        0
      ],
      "hidden": true
    },
    {
      "input": [
        [
          0,
          0,
          0,
          1
        ]
      ],
      "expected": [
        1,
        0,
        0,
        0
      ],
      "hidden": true
    }
  ],
  starterCode: {
    python: `def move_zeros(nums):
    # TODO: move all zeros to the end while preserving relative order of non-zero elements
    return []
`,
    javascript: `function moveZeros(nums) {
    // TODO: move all zeros to the end while preserving relative order of non-zero elements
    return [];
}
`,
    java: `class Solution {
    public int[] moveZeros(int[] nums) {
        // TODO: move all zeros to the end while preserving relative order of non-zero elements
        return new int[]{};
    }
}
`,
    c: `int* moveZeros(int* nums, int numsSize, int* returnSize) {
    // TODO: move all zeros to the end while preserving relative order of non-zero elements
    *returnSize = 0;
    return NULL;
}
`,
  },
  solutions: {
    python: `def move_zeros(nums):
    non_zeros = [x for x in nums if x != 0]
    non_zeros += [0] * (len(nums) - len(non_zeros))
    return non_zeros
`,
    javascript: `function moveZeros(nums) {
    const nonZeros = nums.filter(x => x !== 0);
    const zeros = new Array(nums.length - nonZeros.length).fill(0);
    return [...nonZeros, ...zeros];
}
`,
    java: `class Solution {
    public int[] moveZeros(int[] nums) {
        int[] result = new int[nums.length];
        int idx = 0;
        for (int num : nums) {
            if (num != 0) result[idx++] = num;
        }
        // remaining positions already default to 0
        return result;
    }
}
`,
    c: `int* moveZeros(int* nums, int numsSize, int* returnSize) {
    *returnSize = numsSize;
    if (numsSize == 0) {
        return NULL;
    }
    int* result = (int*)malloc(numsSize * sizeof(int));
    int idx = 0;
    for (int i = 0; i < numsSize; i++) {
        if (nums[i] != 0) result[idx++] = nums[i];
    }
    while (idx < numsSize) result[idx++] = 0;
    return result;
}
`,
  },
  editorial: `## Approach: Collect Non-Zeros then Fill

### Intuition
The simplest strategy is a two-pass scan:
1. Copy every non-zero element into the output in the order they appear.
2. Append exactly \`(n - count_of_non_zeros)\` zeros at the end.

Because we visit each element once in each pass, this is **O(n) time** and **O(n) extra space**.

### Walkthrough
For \`nums = [0, 1, 0, 3, 12]\`:
- Non-zero sweep → \`[1, 3, 12]\` (3 elements)
- We need \`5 - 3 = 2\` zeros appended → \`[1, 3, 12, 0, 0]\`

### Alternative: Write-Pointer (in-place)
Maintain a write index \`j = 0\`. Iterate with read index \`i\`:
- If \`nums[i] != 0\`, write it at position \`j\` and increment \`j\`.
- After the loop, fill positions \`j..n-1\` with \`0\`.

This achieves O(1) extra space.

### Complexity
| | Time | Space |
|---|---|---|
| Two-pass collect | O(n) | O(n) |
| In-place write-pointer | O(n) | O(1) |`,
};

export default problem;
