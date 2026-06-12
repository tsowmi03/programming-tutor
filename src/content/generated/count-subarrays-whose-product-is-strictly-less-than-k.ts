import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-subarrays-whose-product-is-strictly-less-than-k",
  title: "Count Subarrays with Product Less Than K",
  difficulty: "medium",
  category: "sliding-window",
  order: 1105,
  description: `Given an array of positive integers \`nums\` and a positive integer \`k\`, return the number of contiguous subarrays where the product of all elements is **strictly less than** \`k\`.

\`\`\`text
Example 1:
Input:  nums = [10, 5, 2, 6], k = 100
Output: 8
Explanation: The 8 subarrays with product < 100 are:
  [10], [5], [2], [6], [10,5], [5,2], [2,6], [5,2,6]
  Note: [10,5,2] has product 100, which is NOT strictly less than 100.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [1, 2, 3], k = 0
Output: 0
Explanation: k = 0, so no subarray product can be strictly less than 0
             (all elements are positive).
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [1, 1, 1], k = 2
Output: 6
Explanation: Every subarray has product 1 < 2.
             Subarrays: [1],[1],[1],[1,1],[1,1],[1,1,1] => 6 total.
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 3 * 10^4\`
- \`1 <= nums[i] <= 1000\`
- \`0 <= k <= 10^6\``,
  hints: [
    `Think about maintaining a sliding window [left, right] where the product of all elements stays below k. As you move right, multiply the new element in; if the product exceeds or equals k, shrink from the left.`,
    `Once you have a valid window of length (right - left + 1) where the product is < k, how many new subarrays ending at \`right\` does this window contribute?`,
    `Every subarray ending at \`right\` that starts anywhere from \`left\` to \`right\` is valid, so add (right - left + 1) to the answer at each step.`,
  ],
  signature: {
    "name": "numSubarrayProductLessThanK",
    "params": [
      {
        "name": "nums",
        "type": "int[]"
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
          10,
          5,
          2,
          6
        ],
        100
      ],
      "expected": 8,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          2,
          3
        ],
        0
      ],
      "expected": 0,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          1,
          1
        ],
        2
      ],
      "expected": 6,
      "hidden": false
    },
    {
      "input": [
        [
          1
        ],
        1
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          1
        ],
        2
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          3,
          3,
          3,
          3,
          3
        ],
        9
      ],
      "expected": 5,
      "hidden": true
    },
    {
      "input": [
        [
          2,
          2,
          2,
          2
        ],
        16
      ],
      "expected": 9,
      "hidden": true
    },
    {
      "input": [
        [
          100,
          200,
          300
        ],
        1000000
      ],
      "expected": 5,
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
        ],
        1
      ],
      "expected": 0,
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
        ],
        100
      ],
      "expected": 13,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def num_subarray_product_less_than_k(nums: list[int], k: int) -> int:
    # TODO: implement sliding window
    return 0
`,
    javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function numSubarrayProductLessThanK(nums, k) {
    // TODO: implement sliding window
    return 0;
}
`,
    typescript: `function numSubarrayProductLessThanK(nums: number[], k: number): number {
    // TODO: implement sliding window
    return 0;
}`,
    java: `class Solution {
    public int numSubarrayProductLessThanK(int[] nums, int k) {
        // TODO: implement sliding window
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int NumSubarrayProductLessThanK(int[] nums, int k) {
        // TODO: implement sliding window
        return 0;
    }
}`,
    c: `int numSubarrayProductLessThanK(int* nums, int numsSize, int k) {
    // TODO: implement sliding window
    return 0;
}
`,
    cpp: `class Solution {
public:
    int numSubarrayProductLessThanK(vector<int>& nums, int k) {
        // TODO: implement sliding window
        return 0;
    }
};`,
  },
  solutions: {
    python: `def num_subarray_product_less_than_k(nums: list[int], k: int) -> int:
    if k <= 1:
        return 0
    count = 0
    product = 1
    left = 0
    for right in range(len(nums)):
        product *= nums[right]
        while product >= k:
            product //= nums[left]
            left += 1
        count += right - left + 1
    return count
`,
    javascript: `function numSubarrayProductLessThanK(nums, k) {
    if (k <= 1) return 0;
    let count = 0;
    let product = 1;
    let left = 0;
    for (let right = 0; right < nums.length; right++) {
        product *= nums[right];
        while (product >= k) {
            product = Math.floor(product / nums[left]);
            left++;
        }
        count += right - left + 1;
    }
    return count;
}
`,
    typescript: `function numSubarrayProductLessThanK(nums: number[], k: number): number {
    if (k <= 1) return 0;
    let count = 0;
    let product = 1;
    let left = 0;
    for (let right = 0; right < nums.length; right++) {
        product *= nums[right];
        while (product >= k) {
            product = Math.floor(product / nums[left]);
            left++;
        }
        count += right - left + 1;
    }
    return count;
}`,
    java: `class Solution {
    public int numSubarrayProductLessThanK(int[] nums, int k) {
        if (k <= 1) return 0;
        int count = 0;
        long product = 1;
        int left = 0;
        for (int right = 0; right < nums.length; right++) {
            product *= nums[right];
            while (product >= k) {
                product /= nums[left];
                left++;
            }
            count += right - left + 1;
        }
        return count;
    }
}
`,
    csharp: `public class Solution {
    public int NumSubarrayProductLessThanK(int[] nums, int k) {
        if (k <= 1) return 0;
        int count = 0;
        long product = 1;
        int left = 0;
        for (int right = 0; right < nums.Length; right++) {
            product *= nums[right];
            while (product >= k) {
                product /= nums[left];
                left++;
            }
            count += right - left + 1;
        }
        return count;
    }
}`,
    c: `int numSubarrayProductLessThanK(int* nums, int numsSize, int k) {
    if (k <= 1) return 0;
    int count = 0;
    long long product = 1;
    int left = 0;
    for (int right = 0; right < numsSize; right++) {
        product *= nums[right];
        while (product >= k) {
            product /= nums[left];
            left++;
        }
        count += right - left + 1;
    }
    return count;
}
`,
    cpp: `class Solution {
public:
    int numSubarrayProductLessThanK(vector<int>& nums, int k) {
        if (k <= 1) return 0;
        int count = 0;
        long long product = 1;
        int left = 0;
        for (int right = 0; right < (int)nums.size(); right++) {
            product *= nums[right];
            while (product >= k) {
                product /= nums[left];
                left++;
            }
            count += right - left + 1;
        }
        return count;
    }
};`,
  },
  editorial: `## Approach: Sliding Window

### Intuition
We maintain a window \`[left, right]\` such that the product of all elements inside is strictly less than \`k\`. As we extend \`right\` one step at a time:
1. Multiply the new element \`nums[right]\` into the running product.
2. While the product is ≥ k, divide out \`nums[left]\` and advance \`left\`.
3. After shrinking, every subarray ending at \`right\` and starting anywhere from \`left\` to \`right\` is valid, contributing \`right - left + 1\` new subarrays.

### Edge Case
If \`k <= 1\`, no subarray of positive integers can have a product strictly less than \`k\` (since all products ≥ 1), so return 0 immediately.

### Why This Works
Because all \`nums[i] ≥ 1\`, multiplying more elements into the window never decreases the product. So the window property (product < k) is monotone — once a window becomes invalid, we must shrink from the left.

### Complexity
- **Time:** O(n) — each index is added and removed from the window at most once.
- **Space:** O(1) — only a few variables are needed.`,
};

export default problem;
