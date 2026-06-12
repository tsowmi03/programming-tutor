import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "minimum-size-subarray-sum-at-least-target",
  title: "Minimum Size Subarray Sum",
  difficulty: "medium",
  category: "sliding-window",
  order: 1102,
  description: `Given an array of **positive integers** \`nums\` and a positive integer \`target\`, return the **minimum length** of a contiguous subarray whose sum is **greater than or equal to** \`target\`. If no such subarray exists, return \`0\`.

\`\`\`text
Example 1:
Input:  target = 7, nums = [2, 3, 1, 2, 4, 3]
Output: 2
Explanation: The subarray [4, 3] has sum 7 and length 2.
\`\`\`

\`\`\`text
Example 2:
Input:  target = 4, nums = [1, 4, 4]
Output: 1
Explanation: Either single-element subarray [4] satisfies sum >= 4.
\`\`\`

\`\`\`text
Example 3:
Input:  target = 11, nums = [1, 1, 1, 1, 1, 1, 1, 1]
Output: 0
Explanation: The total sum is 8 < 11, so no valid subarray exists.
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 10^5\`
- \`1 <= nums[i] <= 10^4\`
- \`1 <= target <= 10^9\``,
  hints: [
    `Think about maintaining a window with two pointers: a left pointer and a right pointer. Expand the window by moving right, and shrink it by moving left.`,
    `Keep a running sum of the current window. When the sum meets or exceeds the target, record the window size and try to shrink from the left to see if a smaller window also works.`,
    `Keep track of the minimum window length found so far, and update it every time the current window's sum is >= target before shrinking.`,
  ],
  signature: {
    "name": "minSubarrayLen",
    "params": [
      {
        "name": "target",
        "type": "int"
      },
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
        7,
        [
          2,
          3,
          1,
          2,
          4,
          3
        ]
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        4,
        [
          1,
          4,
          4
        ]
      ],
      "expected": 1,
      "hidden": false
    },
    {
      "input": [
        11,
        [
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1
        ]
      ],
      "expected": 0,
      "hidden": false
    },
    {
      "input": [
        15,
        [
          1,
          2,
          3,
          4,
          5
        ]
      ],
      "expected": 5,
      "hidden": true
    },
    {
      "input": [
        6,
        [
          2,
          3,
          1,
          2,
          4,
          3
        ]
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        100,
        [
          10,
          10,
          10,
          10,
          10,
          10,
          10,
          10,
          10,
          10
        ]
      ],
      "expected": 10,
      "hidden": true
    },
    {
      "input": [
        1,
        [
          1
        ]
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        1000000000,
        [
          1,
          2,
          3
        ]
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        5,
        [
          5
        ]
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        8,
        [
          3,
          1,
          7,
          1,
          2
        ]
      ],
      "expected": 2,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def min_subarray_len(target: int, nums: list[int]) -> int:
    # TODO: implement sliding window
    return 0
`,
    javascript: `/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
function minSubarrayLen(target, nums) {
    // TODO: implement sliding window
    return 0;
}
`,
    typescript: `function minSubarrayLen(target: number, nums: number[]): number {
    // TODO: implement sliding window
    return 0;
}`,
    java: `class Solution {
    public int minSubarrayLen(int target, int[] nums) {
        // TODO: implement sliding window
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int MinSubarrayLen(int target, int[] nums) {
        // TODO: implement sliding window
        return 0;
    }
}`,
    c: `int minSubarrayLen(int target, int* nums, int numsSize) {
    // TODO: implement sliding window
    return 0;
}
`,
    cpp: `class Solution {
public:
    int minSubarrayLen(int target, vector<int>& nums) {
        // TODO: implement sliding window
        return 0;
    }
};`,
  },
  solutions: {
    python: `def min_subarray_len(target: int, nums: list[int]) -> int:
    left = 0
    current_sum = 0
    min_len = float('inf')
    for right in range(len(nums)):
        current_sum += nums[right]
        while current_sum >= target:
            min_len = min(min_len, right - left + 1)
            current_sum -= nums[left]
            left += 1
    return 0 if min_len == float('inf') else min_len
`,
    javascript: `function minSubarrayLen(target, nums) {
    let left = 0;
    let currentSum = 0;
    let minLen = Infinity;
    for (let right = 0; right < nums.length; right++) {
        currentSum += nums[right];
        while (currentSum >= target) {
            minLen = Math.min(minLen, right - left + 1);
            currentSum -= nums[left];
            left++;
        }
    }
    return minLen === Infinity ? 0 : minLen;
}
`,
    typescript: `function minSubarrayLen(target: number, nums: number[]): number {
    let left = 0;
    let currentSum = 0;
    let minLen = Infinity;
    for (let right = 0; right < nums.length; right++) {
        currentSum += nums[right];
        while (currentSum >= target) {
            minLen = Math.min(minLen, right - left + 1);
            currentSum -= nums[left];
            left++;
        }
    }
    return minLen === Infinity ? 0 : minLen;
}`,
    java: `class Solution {
    public int minSubarrayLen(int target, int[] nums) {
        int left = 0;
        long currentSum = 0;
        int minLen = Integer.MAX_VALUE;
        for (int right = 0; right < nums.length; right++) {
            currentSum += nums[right];
            while (currentSum >= target) {
                minLen = Math.min(minLen, right - left + 1);
                currentSum -= nums[left];
                left++;
            }
        }
        return minLen == Integer.MAX_VALUE ? 0 : minLen;
    }
}
`,
    csharp: `using System;

public class Solution {
    public int MinSubarrayLen(int target, int[] nums) {
        int left = 0;
        long currentSum = 0;
        int minLen = int.MaxValue;
        for (int right = 0; right < nums.Length; right++) {
            currentSum += nums[right];
            while (currentSum >= target) {
                int len = right - left + 1;
                if (len < minLen) minLen = len;
                currentSum -= nums[left];
                left++;
            }
        }
        return minLen == int.MaxValue ? 0 : minLen;
    }
}`,
    c: `int minSubarrayLen(int target, int* nums, int numsSize) {
    int left = 0;
    long long currentSum = 0;
    int minLen = numsSize + 1;
    for (int right = 0; right < numsSize; right++) {
        currentSum += nums[right];
        while (currentSum >= (long long)target) {
            int len = right - left + 1;
            if (len < minLen) minLen = len;
            currentSum -= nums[left];
            left++;
        }
    }
    return minLen == numsSize + 1 ? 0 : minLen;
}
`,
    cpp: `class Solution {
public:
    int minSubarrayLen(int target, vector<int>& nums) {
        int left = 0;
        long long currentSum = 0;
        int minLen = INT_MAX;
        for (int right = 0; right < (int)nums.size(); right++) {
            currentSum += nums[right];
            while (currentSum >= (long long)target) {
                int len = right - left + 1;
                if (len < minLen) minLen = len;
                currentSum -= nums[left];
                left++;
            }
        }
        return minLen == INT_MAX ? 0 : minLen;
    }
};`,
  },
  editorial: `## Approach: Sliding Window (Two Pointers)

### Intuition
Because all values in \`nums\` are positive, extending the window (moving \`right\` forward) always increases the sum, and shrinking the window (moving \`left\` forward) always decreases it. This monotonic property lets us use a classic two-pointer sliding window.

### Algorithm
1. Maintain \`left\`, \`right\` pointers both starting at index 0, and a \`currentSum\` starting at 0.
2. Expand the window by adding \`nums[right]\` to \`currentSum\`.
3. While \`currentSum >= target\`:
   - Update \`minLen\` with the current window size \`right - left + 1\`.
   - Shrink from the left: subtract \`nums[left]\` from \`currentSum\` and increment \`left\`.
4. After iterating all elements, return \`minLen\` (or \`0\` if never updated).

### Why it works
Every time the window satisfies the condition we record its length and aggressively shrink it — there's no benefit in keeping a longer window if we already know the current length. Since each element is added and removed at most once, the algorithm is linear.

### Complexity
- **Time:** O(n) — each element enters and leaves the window at most once.
- **Space:** O(1) — only a constant number of variables are used.`,
};

export default problem;
