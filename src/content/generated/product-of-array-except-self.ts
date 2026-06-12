import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "product-of-array-except-self",
  title: "Product of Array Except Self",
  difficulty: "medium",
  category: "arrays-hashing",
  order: 1053,
  description: `Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` equals the product of all elements of \`nums\` **except** \`nums[i]\`.

You must solve this in **O(n)** time **without** using the division operator.

**Example 1:**
\`\`\`text
Input:  nums = [1, 2, 3, 4]
Output: [24, 12, 8, 6]
Explanation:
  answer[0] = 2 * 3 * 4 = 24
  answer[1] = 1 * 3 * 4 = 12
  answer[2] = 1 * 2 * 4 = 8
  answer[3] = 1 * 2 * 3 = 6
\`\`\`

**Example 2:**
\`\`\`text
Input:  nums = [-1, 1, 0, -3, 3]
Output: [0, 0, 9, 0, 0]
Explanation:
  answer[2] = (-1) * 1 * (-3) * 3 = 9
  All other positions include 0 as a factor, so their product is 0.
\`\`\`

**Constraints:**
- \`2 <= nums.length <= 1000\`
- \`-50 <= nums[i] <= 50\`
- The product of any prefix or suffix of \`nums\` is guaranteed to fit in a 32-bit integer.`,
  hints: [
    `For each index i, the answer is the product of all elements strictly to the LEFT of i multiplied by the product of all elements strictly to the RIGHT of i.`,
    `A left-to-right pass can accumulate a running prefix product and store it at each position. What would a right-to-left pass accumulate?`,
    `Try writing the left products directly into the output array during the first pass, then multiply each entry by a running right product computed in a second pass — this gives O(1) extra space.`,
  ],
  signature: {
    "name": "productExceptSelf",
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
          1,
          2,
          3,
          4
        ]
      ],
      "expected": [
        24,
        12,
        8,
        6
      ],
      "hidden": false
    },
    {
      "input": [
        [
          -1,
          1,
          0,
          -3,
          3
        ]
      ],
      "expected": [
        0,
        0,
        9,
        0,
        0
      ],
      "hidden": false
    },
    {
      "input": [
        [
          2,
          3
        ]
      ],
      "expected": [
        3,
        2
      ],
      "hidden": false
    },
    {
      "input": [
        [
          1,
          1,
          1,
          1
        ]
      ],
      "expected": [
        1,
        1,
        1,
        1
      ],
      "hidden": true
    },
    {
      "input": [
        [
          0,
          0
        ]
      ],
      "expected": [
        0,
        0
      ],
      "hidden": true
    },
    {
      "input": [
        [
          -1,
          -2,
          -3,
          -4
        ]
      ],
      "expected": [
        -24,
        -12,
        -8,
        -6
      ],
      "hidden": true
    },
    {
      "input": [
        [
          5,
          1
        ]
      ],
      "expected": [
        1,
        5
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
        120,
        60,
        40,
        30,
        24
      ],
      "hidden": true
    },
    {
      "input": [
        [
          0,
          1,
          2,
          3
        ]
      ],
      "expected": [
        6,
        0,
        0,
        0
      ],
      "hidden": true
    }
  ],
  starterCode: {
    python: `def product_except_self(nums: list[int]) -> list[int]:
    # TODO: implement
    return []
`,
    javascript: `function productExceptSelf(nums) {
    // TODO: implement
    return [];
}
`,
    typescript: `function productExceptSelf(nums: number[]): number[] {
    // TODO: implement
    return [];
}`,
    java: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        // TODO: implement
        return new int[]{};
    }
}
`,
    csharp: `public class Solution {
    public int[] ProductExceptSelf(int[] nums) {
        // TODO: implement
        return new int[]{};
    }
}`,
    c: `int* productExceptSelf(int* nums, int numsSize, int* returnSize) {
    // TODO: implement
    *returnSize = 0;
    return NULL;
}
`,
    cpp: `class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        // TODO: implement
        return {};
    }
};`,
  },
  solutions: {
    python: `def product_except_self(nums: list[int]) -> list[int]:
    n = len(nums)
    result = [1] * n
    prefix = 1
    for i in range(n):
        result[i] = prefix
        prefix *= nums[i]
    suffix = 1
    for i in range(n - 1, -1, -1):
        result[i] *= suffix
        suffix *= nums[i]
    return result
`,
    javascript: `function productExceptSelf(nums) {
    const n = nums.length;
    const result = new Array(n).fill(1);
    let prefix = 1;
    for (let i = 0; i < n; i++) {
        result[i] = prefix;
        prefix *= nums[i];
    }
    let suffix = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= suffix;
        suffix *= nums[i];
    }
    return result;
}
`,
    typescript: `function productExceptSelf(nums: number[]): number[] {
    const n = nums.length;
    const result = new Array(n).fill(1);
    let prefix = 1;
    for (let i = 0; i < n; i++) {
        result[i] = prefix;
        prefix *= nums[i];
    }
    let suffix = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= suffix;
        suffix *= nums[i];
    }
    return result;
}`,
    java: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];
        int prefix = 1;
        for (int i = 0; i < n; i++) {
            result[i] = prefix;
            prefix *= nums[i];
        }
        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            result[i] *= suffix;
            suffix *= nums[i];
        }
        return result;
    }
}
`,
    csharp: `public class Solution {
    public int[] ProductExceptSelf(int[] nums) {
        int n = nums.Length;
        int[] result = new int[n];
        int prefix = 1;
        for (int i = 0; i < n; i++) {
            result[i] = prefix;
            prefix *= nums[i];
        }
        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            result[i] *= suffix;
            suffix *= nums[i];
        }
        return result;
    }
}`,
    c: `#include <stdlib.h>
int* productExceptSelf(int* nums, int numsSize, int* returnSize) {
    *returnSize = numsSize;
    int* result = (int*)malloc(numsSize * sizeof(int));
    int prefix = 1;
    for (int i = 0; i < numsSize; i++) {
        result[i] = prefix;
        prefix *= nums[i];
    }
    int suffix = 1;
    for (int i = numsSize - 1; i >= 0; i--) {
        result[i] *= suffix;
        suffix *= nums[i];
    }
    return result;
}
`,
    cpp: `class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> result(n, 1);
        int prefix = 1;
        for (int i = 0; i < n; i++) {
            result[i] = prefix;
            prefix *= nums[i];
        }
        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            result[i] *= suffix;
            suffix *= nums[i];
        }
        return result;
    }
};`,
  },
  editorial: `## Approach: Prefix & Suffix Products

### Key Insight

For each index \`i\`, the answer is:
\`\`\`
answer[i] = (product of nums[0..i-1]) * (product of nums[i+1..n-1])
\`\`\`
We call these the **prefix product** and **suffix product** at position \`i\`.

### Algorithm

**Pass 1 — Left to right (prefix products):**  
Maintain a running variable \`prefix = 1\`. At each index \`i\`, store the current \`prefix\` into \`result[i]\`, then multiply \`prefix\` by \`nums[i]\`.

After this pass, \`result[i]\` holds the product of all elements **before** index \`i\`.

**Pass 2 — Right to left (suffix products):**  
Maintain a running variable \`suffix = 1\`. At each index \`i\` (from right to left), multiply \`result[i]\` by \`suffix\`, then multiply \`suffix\` by \`nums[i]\`.

This folds in the product of all elements **after** index \`i\`, completing the answer.

### Why Not Division?

A naive approach computes the total product then divides by \`nums[i]\`, but this breaks when \`nums[i] = 0\`. The prefix/suffix technique handles zeros naturally.

### Example Trace (\`[-1, 1, 0, -3, 3]\`)

| i | prefix before | result[i] after pass 1 | suffix before | result[i] final |
|---|---|---|---|---|
| 0 | 1 | 1 | 0 | 0 |
| 1 | -1 | -1 | 0 | 0 |
| 2 | -1 | -1 | -9 | 9 |
| 3 | 0 | 0 | 3 | 0 |
| 4 | 0 | 0 | 1 | 0 |

Output: \`[0, 0, 9, 0, 0]\` ✓

### Complexity

- **Time:** O(n) — two linear passes.
- **Space:** O(1) extra — the output array is not counted as extra space; only two scalar variables (\`prefix\`, \`suffix\`) are used.`,
};

export default problem;
