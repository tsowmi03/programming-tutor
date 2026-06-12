import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "maximum-product-subarray",
  title: "Maximum Product Subarray",
  difficulty: "medium",
  category: "recursion-dp",
  order: 1154,
  description: `Given an integer array \`nums\`, find the contiguous subarray (containing at least one number) that has the largest product, and return that product.

\`\`\`text
Example 1:
Input:  nums = [2, 3, -2, 4]
Output: 6
Explanation: The subarray [2, 3] has the largest product 6.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [-2, 0, -1]
Output: 0
Explanation: The result cannot be 2, because [-2, -1] is not a subarray (it is not contiguous).
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [-2, 3, -4]
Output: 24
Explanation: The subarray [-2, 3, -4] has the largest product 24.
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 10^4\`
- \`-10 <= nums[i] <= 10\`
- The product of any subarray of \`nums\` fits in a 32-bit integer.`,
  hints: [
    `Think about what happens when you multiply a negative number by another negative number — the product becomes positive. How can you track this?`,
    `Maintain both the maximum and minimum product ending at the current index. The minimum can become the maximum when multiplied by a negative number.`,
    `At each step: curMax = max(nums[i], prevMax * nums[i], prevMin * nums[i]), and similarly for curMin. Update the global answer with curMax.`,
  ],
  signature: {
    "name": "maxProduct",
    "params": [
      {
        "name": "nums",
        "type": "int[]"
      }
    ],
    "returns": "int",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        [
          2,
          3,
          -2,
          4
        ]
      ],
      "expected": 6,
      "hidden": false
    },
    {
      "input": [
        [
          -2,
          0,
          -1
        ]
      ],
      "expected": 0,
      "hidden": false
    },
    {
      "input": [
        [
          -2,
          3,
          -4
        ]
      ],
      "expected": 24,
      "hidden": false
    },
    {
      "input": [
        [
          0,
          2
        ]
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        [
          -2
        ]
      ],
      "expected": -2,
      "hidden": true
    },
    {
      "input": [
        [
          3,
          -1,
          4
        ]
      ],
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        [
          -2,
          -3,
          -1
        ]
      ],
      "expected": 6,
      "hidden": true
    },
    {
      "input": [
        [
          2,
          -5,
          -2,
          -4,
          3
        ]
      ],
      "expected": 24,
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
      "expected": 0,
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
      "expected": 24,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def max_product(nums):
    # TODO: implement
    return 0
`,
    javascript: `function maxProduct(nums) {
    // TODO: implement
    return 0;
}
`,
    java: `class Solution {
    public int maxProduct(int[] nums) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int maxProduct(int* nums, int numsSize) {
    // TODO: implement
    return 0;
}
`,
  },
  solutions: {
    python: `def max_product(nums):
    if not nums:
        return 0
    max_prod = nums[0]
    min_prod = nums[0]
    result = nums[0]
    for i in range(1, len(nums)):
        n = nums[i]
        candidates = (n, max_prod * n, min_prod * n)
        max_prod = max(candidates)
        min_prod = min(candidates)
        result = max(result, max_prod)
    return result
`,
    javascript: `function maxProduct(nums) {
    if (nums.length === 0) return 0;
    let maxProd = nums[0];
    let minProd = nums[0];
    let result = nums[0];
    for (let i = 1; i < nums.length; i++) {
        const n = nums[i];
        const tempMax = Math.max(n, maxProd * n, minProd * n);
        const tempMin = Math.min(n, maxProd * n, minProd * n);
        maxProd = tempMax;
        minProd = tempMin;
        result = Math.max(result, maxProd);
    }
    return result;
}
`,
    java: `class Solution {
    public int maxProduct(int[] nums) {
        int maxProd = nums[0];
        int minProd = nums[0];
        int result = nums[0];
        for (int i = 1; i < nums.length; i++) {
            int n = nums[i];
            int tempMax = Math.max(n, Math.max(maxProd * n, minProd * n));
            int tempMin = Math.min(n, Math.min(maxProd * n, minProd * n));
            maxProd = tempMax;
            minProd = tempMin;
            result = Math.max(result, maxProd);
        }
        return result;
    }
}
`,
    c: `int maxProduct(int* nums, int numsSize) {
    int maxProd = nums[0];
    int minProd = nums[0];
    int result = nums[0];
    for (int i = 1; i < numsSize; i++) {
        int n = nums[i];
        int a = maxProd * n;
        int b = minProd * n;
        int tempMax = n > a ? n : a;
        if (b > tempMax) tempMax = b;
        int tempMin = n < a ? n : a;
        if (b < tempMin) tempMin = b;
        maxProd = tempMax;
        minProd = tempMin;
        if (maxProd > result) result = maxProd;
    }
    return result;
}
`,
  },
  editorial: `## Approach: Dynamic Programming (Track Max and Min)

### Intuition
A subarray product can flip from large to small (or small to large) when we encounter a negative number. To handle this, we track **both** the maximum and minimum product ending at each index.

### Algorithm
1. Initialize \`maxProd\`, \`minProd\`, and \`result\` all to \`nums[0]\`.
2. For each subsequent element \`n\`:
   - Compute three candidates: \`n\` itself (start fresh), \`maxProd * n\`, and \`minProd * n\`.
   - \`maxProd = max(n, maxProd * n, minProd * n)\`
   - \`minProd = min(n, maxProd * n, minProd * n)\` *(use old maxProd, so compute both before updating)*
   - Update \`result = max(result, maxProd)\`.
3. Return \`result\`.

### Why track the minimum?
If \`n\` is negative, multiplying by the current minimum (most negative) gives the largest positive product.

### Complexity
- **Time:** O(n) — single pass through the array.
- **Space:** O(1) — only a constant number of variables.

### Example Trace for \`[-2, 3, -4]\`:
| i | n  | maxProd | minProd | result |
|---|----|---------|---------|--------|
| 0 | -2 | -2      | -2      | -2     |
| 1 |  3 | 3       | -6      | 3      |
| 2 | -4 | 24      | -12     | 24     |

Final answer: **24**.`,
};

export default problem;
