import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "maximum-average-subarray-of-exactly-size-k-return-integer-floor",
  title: "Maximum Average Subarray (Floor)",
  difficulty: "easy",
  category: "sliding-window",
  order: 1098,
  description: `Given an integer array \`nums\` and an integer \`k\`, find the contiguous subarray of **exactly** length \`k\` that has the maximum average value. Return the **floor** (integer part, rounding toward negative infinity) of that maximum average.

\`\`\`text
Example 1:
Input:  nums = [1, 12, -5, -6, 50, 3], k = 4
Subarrays of size 4 and their sums:
  [1, 12, -5, -6]  -> sum =  2, avg =  0.5
  [12, -5, -6, 50] -> sum = 51, avg = 12.75
  [-5, -6, 50, 3]  -> sum = 42, avg = 10.5
Maximum average = 12.75  -> floor = 12
Output: 12
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [5, 5, 5, 5], k = 2
All subarrays of size 2 have sum 10, avg 5.0
Output: 5
\`\`\`

**Constraints:**
- \`1 <= k <= nums.length <= 10^4\`
- \`-10^4 <= nums[i] <= 10^4\`
- It is guaranteed that \`k <= nums.length\`.`,
  hints: [
    `Compute the sum of the first window of size k, then slide the window one step at a time by adding the new element and removing the old one.`,
    `Keep track of the maximum window sum seen so far. At the end, use integer floor division (sum / k) to get the answer.`,
    `Be careful with floor division for negative numbers: in Python use math.floor or //, in Java use Math.floorDiv, and in C handle negatives manually.`,
  ],
  signature: {
    "name": "maxAverageFloor",
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
          1,
          12,
          -5,
          -6,
          50,
          3
        ],
        4
      ],
      "expected": 12,
      "hidden": false
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
      "expected": 5,
      "hidden": false
    },
    {
      "input": [
        [
          3
        ],
        1
      ],
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        [
          -1,
          -2,
          -3,
          -4,
          -5
        ],
        2
      ],
      "expected": -2,
      "hidden": true
    },
    {
      "input": [
        [
          0,
          0,
          0,
          0
        ],
        3
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          10000,
          10000,
          10000
        ],
        3
      ],
      "expected": 10000,
      "hidden": true
    },
    {
      "input": [
        [
          -10000,
          -10000,
          -10000
        ],
        2
      ],
      "expected": -10000,
      "hidden": true
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
          9,
          10
        ],
        3
      ],
      "expected": 9,
      "hidden": true
    },
    {
      "input": [
        [
          4,
          -1,
          4,
          -1,
          4
        ],
        3
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        [
          -5,
          1,
          2,
          -1,
          3,
          -2,
          4
        ],
        2
      ],
      "expected": 1,
      "hidden": true
    }
  ],
  starterCode: {
    python: `from typing import List

def max_average_floor(nums: List[int], k: int) -> int:
    # TODO: implement using a sliding window
    pass
`,
    javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function maxAverageFloor(nums, k) {
    // TODO: implement using a sliding window
}
`,
    java: `class Solution {
    public int maxAverageFloor(int[] nums, int k) {
        // TODO: implement using a sliding window
        return 0;
    }
}
`,
    c: `#include <stdlib.h>

int maxAverageFloor(int* nums, int numsSize, int k) {
    // TODO: implement using a sliding window
    return 0;
}
`,
  },
  solutions: {
    python: `from typing import List
import math

def max_average_floor(nums: List[int], k: int) -> int:
    window_sum = sum(nums[:k])
    max_sum = window_sum
    for i in range(k, len(nums)):
        window_sum += nums[i] - nums[i - k]
        if window_sum > max_sum:
            max_sum = window_sum
    return math.floor(max_sum / k)
`,
    javascript: `function maxAverageFloor(nums, k) {
    let windowSum = 0;
    for (let i = 0; i < k; i++) {
        windowSum += nums[i];
    }
    let maxSum = windowSum;
    for (let i = k; i < nums.length; i++) {
        windowSum += nums[i] - nums[i - k];
        if (windowSum > maxSum) maxSum = windowSum;
    }
    return Math.floor(maxSum / k);
}
`,
    java: `class Solution {
    public int maxAverageFloor(int[] nums, int k) {
        long windowSum = 0;
        for (int i = 0; i < k; i++) {
            windowSum += nums[i];
        }
        long maxSum = windowSum;
        for (int i = k; i < nums.length; i++) {
            windowSum += nums[i] - nums[i - k];
            if (windowSum > maxSum) maxSum = windowSum;
        }
        return (int) Math.floorDiv(maxSum, (long) k);
    }
}
`,
    c: `#include <stdlib.h>

int maxAverageFloor(int* nums, int numsSize, int k) {
    long long windowSum = 0;
    int i;
    for (i = 0; i < k; i++) {
        windowSum += nums[i];
    }
    long long maxSum = windowSum;
    for (i = k; i < numsSize; i++) {
        windowSum += nums[i] - nums[i - k];
        if (windowSum > maxSum) maxSum = windowSum;
    }
    /* floor division for negative numbers */
    if (maxSum >= 0) {
        return (int)(maxSum / k);
    } else {
        return (int)((maxSum - k + 1) / k);
    }
}
`,
  },
  editorial: `## Approach: Sliding Window

### Intuition
Instead of recomputing the sum of every subarray of size \`k\` from scratch (which would be O(n·k)), we maintain a running window sum. When we slide the window one position to the right, we:
- **add** the new element entering on the right, and
- **subtract** the element leaving on the left.

This makes each slide an O(1) operation.

### Algorithm
1. Compute the sum of the first \`k\` elements — the initial window sum.
2. Set \`max_sum = window_sum\`.
3. For each index \`i\` from \`k\` to \`n-1\`:
   - Update \`window_sum += nums[i] - nums[i - k]\`
   - Update \`max_sum = max(max_sum, window_sum)\`
4. Return \`floor(max_sum / k)\`.

### Floor Division Note
Floor division rounds toward **negative infinity**, not toward zero. For a negative sum like \`-7\` divided by \`4\`: truncation gives \`-1\` (toward zero), but floor division gives \`-2\`. Use \`math.floor\` in Python, \`Math.floor\` in JavaScript, \`Math.floorDiv\` in Java, and a manual correction \`(sum - k + 1) / k\` in C.

### Complexity
- **Time:** O(n) — one pass through the array.
- **Space:** O(1) — only a few variables are used.`,
};

export default problem;
