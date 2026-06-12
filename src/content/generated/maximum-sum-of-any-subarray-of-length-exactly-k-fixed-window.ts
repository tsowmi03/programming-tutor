import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "maximum-sum-of-any-subarray-of-length-exactly-k-fixed-window",
  title: "Maximum Sum Subarray of Size K",
  difficulty: "medium",
  category: "arrays-hashing",
  order: 1059,
  description: `Given an integer array \`nums\` and a positive integer \`k\`, return the **maximum sum** of any contiguous subarray of length **exactly** \`k\`.

If the array contains fewer than \`k\` elements, return \`0\`.

\`\`\`text
Example 1:
Input:  nums = [2, 1, 5, 1, 3, 2], k = 3
Output: 9
Explanation: Subarray [5, 1, 3] has the largest sum (9)
             among all subarrays of length 3.
             Windows: [2,1,5]=8, [1,5,1]=7, [5,1,3]=9, [1,3,2]=6
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [2, 3, 4, 1, 5], k = 2
Output: 7
Explanation: Subarray [3, 4] has sum 7.
             Windows: [2,3]=5, [3,4]=7, [4,1]=5, [1,5]=6
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 10^5\`
- \`-10^4 <= nums[i] <= 10^4\`
- \`1 <= k <= 10^5\``,
  hints: [
    `A brute-force approach recomputes the sum for every k-length window from scratch — can you find a way to update the sum in O(1) as the window moves?`,
    `Adjacent windows share k−1 elements. When you slide the window one step right, only one element enters (the new right end) and one leaves (the old left end). Maintain a running sum.`,
    `Be careful about initializing your maximum to 0 — what if every element is negative? Start maxSum at the sum of the first window instead.`,
  ],
  signature: {
    "name": "maxSumSubarrayOfSizeK",
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
    "returns": "int"
  },
  testCases: [
    {
      "input": [
        [
          2,
          1,
          5,
          1,
          3,
          2
        ],
        3
      ],
      "expected": 9,
      "hidden": false
    },
    {
      "input": [
        [
          2,
          3,
          4,
          1,
          5
        ],
        2
      ],
      "expected": 7,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          4,
          2,
          10,
          23,
          3,
          1,
          0,
          20
        ],
        4
      ],
      "expected": 39,
      "hidden": false
    },
    {
      "input": [
        [
          1
        ],
        1
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2
        ],
        3
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          -3,
          -1,
          -2,
          -4
        ],
        2
      ],
      "expected": -3,
      "hidden": true
    },
    {
      "input": [
        [
          5,
          5,
          5,
          5
        ],
        2
      ],
      "expected": 10,
      "hidden": true
    },
    {
      "input": [
        [
          3,
          -1,
          4,
          1,
          5,
          -9,
          2,
          6
        ],
        3
      ],
      "expected": 10,
      "hidden": true
    },
    {
      "input": [
        [],
        2
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          10,
          -1,
          10,
          -1,
          10
        ],
        5
      ],
      "expected": 28,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def max_sum_subarray_of_size_k(nums, k):
    # TODO: return the maximum sum of any contiguous subarray of length exactly k
    return 0`,
    javascript: `function maxSumSubarrayOfSizeK(nums, k) {
    // TODO: return the maximum sum of any contiguous subarray of length exactly k
    return 0;
}`,
    typescript: `function maxSumSubarrayOfSizeK(nums: number[], k: number): number {
    // TODO: return the maximum sum of any contiguous subarray of length exactly k
    return 0;
}`,
    java: `class Solution {
    public int maxSumSubarrayOfSizeK(int[] nums, int k) {
        // TODO: return the maximum sum of any contiguous subarray of length exactly k
        return 0;
    }
}`,
    csharp: `public class Solution {
    public int MaxSumSubarrayOfSizeK(int[] nums, int k) {
        // TODO: return the maximum sum of any contiguous subarray of length exactly k
        return 0;
    }
}`,
    c: `int maxSumSubarrayOfSizeK(int* nums, int numsSize, int k) {
    // TODO: return the maximum sum of any contiguous subarray of length exactly k
    return 0;
}`,
    cpp: `class Solution {
public:
    int maxSumSubarrayOfSizeK(vector<int>& nums, int k) {
        // TODO: return the maximum sum of any contiguous subarray of length exactly k
        return 0;
    }
};`,
  },
  solutions: {
    python: `def max_sum_subarray_of_size_k(nums, k):
    n = len(nums)
    if n < k:
        return 0
    window_sum = sum(nums[:k])
    max_sum = window_sum
    for i in range(k, n):
        window_sum += nums[i] - nums[i - k]
        if window_sum > max_sum:
            max_sum = window_sum
    return max_sum`,
    javascript: `function maxSumSubarrayOfSizeK(nums, k) {
    const n = nums.length;
    if (n < k) return 0;
    let windowSum = 0;
    for (let i = 0; i < k; i++) windowSum += nums[i];
    let maxSum = windowSum;
    for (let i = k; i < n; i++) {
        windowSum += nums[i] - nums[i - k];
        if (windowSum > maxSum) maxSum = windowSum;
    }
    return maxSum;
}`,
    typescript: `function maxSumSubarrayOfSizeK(nums: number[], k: number): number {
    const n = nums.length;
    if (n < k) return 0;
    let windowSum = 0;
    for (let i = 0; i < k; i++) windowSum += nums[i];
    let maxSum = windowSum;
    for (let i = k; i < n; i++) {
        windowSum += nums[i] - nums[i - k];
        if (windowSum > maxSum) maxSum = windowSum;
    }
    return maxSum;
}`,
    java: `class Solution {
    public int maxSumSubarrayOfSizeK(int[] nums, int k) {
        int n = nums.length;
        if (n < k) return 0;
        int windowSum = 0;
        for (int i = 0; i < k; i++) windowSum += nums[i];
        int maxSum = windowSum;
        for (int i = k; i < n; i++) {
            windowSum += nums[i] - nums[i - k];
            if (windowSum > maxSum) maxSum = windowSum;
        }
        return maxSum;
    }
}`,
    csharp: `public class Solution {
    public int MaxSumSubarrayOfSizeK(int[] nums, int k) {
        int n = nums.Length;
        if (n < k) return 0;
        int windowSum = 0;
        for (int i = 0; i < k; i++) windowSum += nums[i];
        int maxSum = windowSum;
        for (int i = k; i < n; i++) {
            windowSum += nums[i] - nums[i - k];
            if (windowSum > maxSum) maxSum = windowSum;
        }
        return maxSum;
    }
}`,
    c: `int maxSumSubarrayOfSizeK(int* nums, int numsSize, int k) {
    int i, windowSum, maxSum;
    if (numsSize < k) return 0;
    windowSum = 0;
    for (i = 0; i < k; i++) windowSum += nums[i];
    maxSum = windowSum;
    for (i = k; i < numsSize; i++) {
        windowSum += nums[i] - nums[i - k];
        if (windowSum > maxSum) maxSum = windowSum;
    }
    return maxSum;
}`,
    cpp: `class Solution {
public:
    int maxSumSubarrayOfSizeK(vector<int>& nums, int k) {
        int n = nums.size();
        if (n < k) return 0;
        int windowSum = 0;
        for (int i = 0; i < k; i++) windowSum += nums[i];
        int maxSum = windowSum;
        for (int i = k; i < n; i++) {
            windowSum += nums[i] - nums[i - k];
            if (windowSum > maxSum) maxSum = windowSum;
        }
        return maxSum;
    }
};`,
  },
  editorial: `## Approach: Fixed-Size Sliding Window

### Intuition
A brute-force solution iterates over every starting index, summing \`k\` elements each time — **O(n·k)**. The key observation is that consecutive windows of size \`k\` overlap in \`k − 1\` elements. Sliding the window one step right simply **adds** the new right element and **removes** the old left element, so each update is **O(1)**.

### Algorithm
1. **Edge case**: If \`n < k\`, no complete window exists — return \`0\`.
2. **First window**: Compute \`windowSum = nums[0] + ... + nums[k-1]\`. Set \`maxSum = windowSum\`.
3. **Slide**: For each \`i\` from \`k\` to \`n-1\`:
   - \`windowSum += nums[i] - nums[i - k]\`
   - Update \`maxSum = max(maxSum, windowSum)\`
4. Return \`maxSum\`.

> **Why not initialize \`maxSum = 0\`?**  
> If all values are negative the best valid sum is still negative. Seeding from the first window avoids a spurious \`0\` result.

### Worked Example
\`\`\`
nums = [2, 1, 5, 1, 3, 2], k = 3
window [2,1,5]   → sum = 8,  maxSum = 8
window [1,5,1]   → sum = 7,  maxSum = 8
window [5,1,3]   → sum = 9,  maxSum = 9  ← answer
window [1,3,2]   → sum = 6,  maxSum = 9
\`\`\`

### Complexity
| | |
|---|---|
| **Time** | O(n) — single pass |
| **Space** | O(1) — only scalar variables |`,
};

export default problem;
