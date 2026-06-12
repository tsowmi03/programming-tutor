import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "find-the-maximum-pair-sum-where-one-pointer-starts-from-each-end",
  title: "Maximum Pair Sum Not Exceeding Target",
  difficulty: "medium",
  category: "two-pointers",
  order: 1072,
  description: `Given an array of positive integers \`nums\` and a positive integer \`target\`, return the **maximum sum** of any pair \`nums[i] + nums[j]\` (where \`i != j\`) such that the pair sum is **less than or equal to** \`target\`.

If no such pair exists, return \`-1\`.

\`\`\`text
Example 1:
Input: nums = [2, 5, 3, 7], target = 8
Output: 8
Explanation: Valid pairs and sums: (2+5)=7, (2+3)=5, (5+3)=8.
             Pairs (2+7), (5+7), (3+7) all exceed 8.
             The maximum valid pair sum is 8.
\`\`\`

\`\`\`text
Example 2:
Input: nums = [3, 1, 4, 1, 5, 9, 2, 6], target = 10
Output: 10
Explanation: Pairs (1+9)=10 and (4+6)=10 both achieve
             the maximum valid sum of 10.
\`\`\`

**Constraints:**
- \`2 <= nums.length <= 10^5\`
- \`1 <= nums[i] <= 10^6\`
- \`1 <= target <= 2 * 10^6\``,
  hints: [
    `Try sorting the array first. How does knowing the order of elements help you systematically explore candidate pairs?`,
    `Place one pointer at the beginning (smallest element) and one at the end (largest element). What does their sum immediately tell you?`,
    `If the current sum exceeds the target, it is too large — decrease it by moving the right pointer left. If the current sum is within the target, it is a valid candidate — try finding a larger valid sum by moving the left pointer right.`,
  ],
  signature: {
    "name": "maxPairSum",
    "params": [
      {
        "name": "nums",
        "type": "int[]"
      },
      {
        "name": "target",
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
          5,
          3,
          7
        ],
        8
      ],
      "expected": 8,
      "hidden": false
    },
    {
      "input": [
        [
          3,
          1,
          4,
          1,
          5,
          9,
          2,
          6
        ],
        10
      ],
      "expected": 10,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          2,
          3,
          4
        ],
        100
      ],
      "expected": 7,
      "hidden": false
    },
    {
      "input": [
        [
          5,
          5,
          5
        ],
        9
      ],
      "expected": -1,
      "hidden": true
    },
    {
      "input": [
        [
          10,
          20,
          30
        ],
        5
      ],
      "expected": -1,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          1,
          1,
          1
        ],
        2
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        [
          4,
          7,
          3,
          9,
          1
        ],
        11
      ],
      "expected": 11,
      "hidden": true
    },
    {
      "input": [
        [
          100,
          200
        ],
        200
      ],
      "expected": -1,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          6
        ],
        7
      ],
      "expected": 7,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2
        ],
        5
      ],
      "expected": 3,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def max_pair_sum(nums, target):
    # TODO
    return -1
`,
    javascript: `function maxPairSum(nums, target) {
    // TODO
    return -1;
}
`,
    java: `class Solution {
    public int maxPairSum(int[] nums, int target) {
        // TODO
        return -1;
    }
}
`,
    c: `int maxPairSum(int* nums, int numsSize, int target) {
    // TODO
    return -1;
}
`,
  },
  solutions: {
    python: `def max_pair_sum(nums, target):
    nums.sort()
    left, right = 0, len(nums) - 1
    max_sum = -1
    while left < right:
        s = nums[left] + nums[right]
        if s <= target:
            if s > max_sum:
                max_sum = s
            left += 1
        else:
            right -= 1
    return max_sum
`,
    javascript: `function maxPairSum(nums, target) {
    nums.sort((a, b) => a - b);
    let left = 0, right = nums.length - 1;
    let maxSum = -1;
    while (left < right) {
        const s = nums[left] + nums[right];
        if (s <= target) {
            if (s > maxSum) maxSum = s;
            left++;
        } else {
            right--;
        }
    }
    return maxSum;
}
`,
    java: `class Solution {
    public int maxPairSum(int[] nums, int target) {
        java.util.Arrays.sort(nums);
        int left = 0, right = nums.length - 1;
        int maxSum = -1;
        while (left < right) {
            int s = nums[left] + nums[right];
            if (s <= target) {
                if (s > maxSum) maxSum = s;
                left++;
            } else {
                right--;
            }
        }
        return maxSum;
    }
}
`,
    c: `#include <stdlib.h>

static int cmp(const void *a, const void *b) {
    int x = *(const int*)a, y = *(const int*)b;
    if (x < y) return -1;
    if (x > y) return  1;
    return 0;
}

int maxPairSum(int* nums, int numsSize, int target) {
    qsort(nums, numsSize, sizeof(int), cmp);
    int left = 0, right = numsSize - 1;
    int maxSum = -1;
    while (left < right) {
        int s = nums[left] + nums[right];
        if (s <= target) {
            if (s > maxSum) maxSum = s;
            left++;
        } else {
            right--;
        }
    }
    return maxSum;
}
`,
  },
  editorial: `## Approach: Sort + Two Pointers

**Intuition:** After sorting, the smallest and largest elements sit at opposite ends. Starting one pointer at each end lets us reason about every relevant pair in a single linear pass.

**Algorithm:**
1. Sort \`nums\` in non-decreasing order.
2. Initialise \`left = 0\`, \`right = n − 1\`, \`maxSum = −1\`.
3. While \`left < right\`:
   - Compute \`s = nums[left] + nums[right]\`.
   - If \`s <= target\`: valid candidate — update \`maxSum = max(maxSum, s)\` and advance \`left++\` to try a potentially larger sum.
   - Otherwise: sum too large — retreat \`right--\` to lower it.
4. Return \`maxSum\` (still \`−1\` if no valid pair was found).

**Why it works:** When \`s <= target\`, \`nums[left] + nums[right]\` is the *best* achievable sum with \`nums[right]\` as the larger element and any index ≤ \`left\` as the smaller. We record it and advance \`left\` to explore larger left-side values. When \`s > target\`, \`nums[right]\` is too large to pair with *any* element from the left side without exceeding the target, so we must reduce \`right\`.

**Complexity:**
- **Time:** O(n log n) for sorting + O(n) for the two-pointer scan = **O(n log n)**
- **Space:** O(1) extra (ignoring the O(log n) sort call stack)`,
};

export default problem;
