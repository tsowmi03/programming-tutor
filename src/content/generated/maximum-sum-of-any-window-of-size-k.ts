import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "maximum-sum-of-any-window-of-size-k",
  title: "Maximum Sum Window of Size K",
  difficulty: "easy",
  category: "sliding-window",
  order: 1096,
  description: `Given an integer array \`nums\` and a positive integer \`k\`, return the **maximum sum** of any contiguous subarray of length exactly \`k\`.

If the array has fewer than \`k\` elements, return \`0\`.

\`\`\`text
Example 1:
Input:  nums = [2, 1, 5, 1, 3, 2], k = 3
Output: 9
Explanation: The subarray [5, 1, 3] has the largest sum of 9.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [1, 4, 2, 9, 7, 3], k = 2
Output: 16
Explanation: The subarray [9, 7] has the largest sum of 16.
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [4], k = 2
Output: 0
Explanation: The array has fewer than k=2 elements, so return 0.
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 10^5\`
- \`-10^4 <= nums[i] <= 10^4\`
- \`1 <= k <= 10^5\``,
  hints: [
    `Compute the sum of the first window of size k, then slide the window one step at a time by adding the new element and removing the leftmost element.`,
    `Keep track of the maximum sum seen so far as you slide the window across the array.`,
    `Remember to handle the edge case where the array length is less than k.`,
  ],
  signature: {
    "name": "maxSumWindow",
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
          1,
          4,
          2,
          9,
          7,
          3
        ],
        2
      ],
      "expected": 16,
      "hidden": false
    },
    {
      "input": [
        [
          4
        ],
        2
      ],
      "expected": 0,
      "hidden": false
    },
    {
      "input": [
        [],
        3
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          5,
          5,
          5,
          5,
          5
        ],
        1
      ],
      "expected": 5,
      "hidden": true
    },
    {
      "input": [
        [
          -3,
          -1,
          -2,
          -4,
          -5
        ],
        2
      ],
      "expected": -3,
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
        5
      ],
      "expected": 15,
      "hidden": true
    },
    {
      "input": [
        [
          10,
          -10,
          10,
          -10,
          10
        ],
        3
      ],
      "expected": 10,
      "hidden": true
    },
    {
      "input": [
        [
          3,
          3,
          3,
          3
        ],
        4
      ],
      "expected": 12,
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
    }
  ],
  starterCode: {
    python: `def max_sum_window(nums: list[int], k: int) -> int:
    # TODO: implement sliding window
    return 0
`,
    javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function maxSumWindow(nums, k) {
    // TODO: implement sliding window
    return 0;
}
`,
    typescript: `function maxSumWindow(nums: number[], k: number): number {
    // TODO: implement sliding window
    return 0;
}`,
    java: `class Solution {
    public int maxSumWindow(int[] nums, int k) {
        // TODO: implement sliding window
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int MaxSumWindow(int[] nums, int k) {
        // TODO: implement sliding window
        return 0;
    }
}`,
    c: `int maxSumWindow(int* nums, int numsSize, int k) {
    // TODO: implement sliding window
    return 0;
}
`,
    cpp: `class Solution {
public:
    int maxSumWindow(vector<int>& nums, int k) {
        // TODO: implement sliding window
        return 0;
    }
};`,
  },
  solutions: {
    python: `def max_sum_window(nums: list[int], k: int) -> int:
    n = len(nums)
    if n < k:
        return 0
    window_sum = sum(nums[:k])
    max_sum = window_sum
    for i in range(k, n):
        window_sum += nums[i] - nums[i - k]
        if window_sum > max_sum:
            max_sum = window_sum
    return max_sum
`,
    javascript: `function maxSumWindow(nums, k) {
    const n = nums.length;
    if (n < k) return 0;
    let windowSum = 0;
    for (let i = 0; i < k; i++) {
        windowSum += nums[i];
    }
    let maxSum = windowSum;
    for (let i = k; i < n; i++) {
        windowSum += nums[i] - nums[i - k];
        if (windowSum > maxSum) {
            maxSum = windowSum;
        }
    }
    return maxSum;
}
`,
    typescript: `function maxSumWindow(nums: number[], k: number): number {
    const n = nums.length;
    if (n < k) return 0;
    let windowSum = 0;
    for (let i = 0; i < k; i++) {
        windowSum += nums[i];
    }
    let maxSum = windowSum;
    for (let i = k; i < n; i++) {
        windowSum += nums[i] - nums[i - k];
        if (windowSum > maxSum) {
            maxSum = windowSum;
        }
    }
    return maxSum;
}`,
    java: `class Solution {
    public int maxSumWindow(int[] nums, int k) {
        int n = nums.length;
        if (n < k) return 0;
        int windowSum = 0;
        for (int i = 0; i < k; i++) {
            windowSum += nums[i];
        }
        int maxSum = windowSum;
        for (int i = k; i < n; i++) {
            windowSum += nums[i] - nums[i - k];
            if (windowSum > maxSum) {
                maxSum = windowSum;
            }
        }
        return maxSum;
    }
}
`,
    csharp: `public class Solution {
    public int MaxSumWindow(int[] nums, int k) {
        int n = nums.Length;
        if (n < k) return 0;
        int windowSum = 0;
        for (int i = 0; i < k; i++) {
            windowSum += nums[i];
        }
        int maxSum = windowSum;
        for (int i = k; i < n; i++) {
            windowSum += nums[i] - nums[i - k];
            if (windowSum > maxSum) {
                maxSum = windowSum;
            }
        }
        return maxSum;
    }
}`,
    c: `int maxSumWindow(int* nums, int numsSize, int k) {
    if (numsSize < k) return 0;
    int windowSum = 0;
    for (int i = 0; i < k; i++) {
        windowSum += nums[i];
    }
    int maxSum = windowSum;
    for (int i = k; i < numsSize; i++) {
        windowSum += nums[i] - nums[i - k];
        if (windowSum > maxSum) {
            maxSum = windowSum;
        }
    }
    return maxSum;
}
`,
    cpp: `class Solution {
public:
    int maxSumWindow(vector<int>& nums, int k) {
        int n = nums.size();
        if (n < k) return 0;
        int windowSum = 0;
        for (int i = 0; i < k; i++) {
            windowSum += nums[i];
        }
        int maxSum = windowSum;
        for (int i = k; i < n; i++) {
            windowSum += nums[i] - nums[i - k];
            if (windowSum > maxSum) {
                maxSum = windowSum;
            }
        }
        return maxSum;
    }
};`,
  },
  editorial: `## Approach: Sliding Window

### Intuition
A brute-force approach would recompute the sum of every subarray of length \`k\`, giving O(n·k) time. We can do better by observing that each consecutive window shares \`k-1\` elements with the previous one. Instead of recomputing the whole sum, we **add** the new element entering the window and **subtract** the element leaving it.

### Algorithm
1. **Edge case:** if \`len(nums) < k\`, return \`0\`.
2. **Initial window:** compute the sum of \`nums[0..k-1]\`. Set \`maxSum = windowSum\`.
3. **Slide:** for each index \`i\` from \`k\` to \`n-1\`:
   - \`windowSum += nums[i] - nums[i - k]\`
   - Update \`maxSum = max(maxSum, windowSum)\`.
4. Return \`maxSum\`.

### Complexity
- **Time:** O(n) — each element is added and removed exactly once.
- **Space:** O(1) — only a few integer variables are used.

### Example Walkthrough
\`\`\`
nums = [2, 1, 5, 1, 3, 2], k = 3
Initial window: 2+1+5 = 8,  maxSum = 8
i=3: 8 + 1 - 2 = 7,         maxSum = 8
i=4: 7 + 3 - 1 = 9,         maxSum = 9
i=5: 9 + 2 - 5 = 6,         maxSum = 9
Answer: 9
\`\`\``,
};

export default problem;
