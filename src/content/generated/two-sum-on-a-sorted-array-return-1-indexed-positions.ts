import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "two-sum-on-a-sorted-array-return-1-indexed-positions",
  title: "Two Sum on a Sorted Array",
  difficulty: "easy",
  category: "two-pointers",
  order: 1063,
  description: `Given a **1-indexed**, sorted (non-decreasing) array of integers \`nums\` and an integer \`target\`, find two numbers that add up to \`target\` and return their indices as \`[index1, index2]\` where \`1 <= index1 < index2 <= nums.length\`.

There is **exactly one** valid solution. You may not use the same element twice.

\`\`\`text
Example 1:
Input:  nums = [2, 7, 11, 15], target = 9
Output: [1, 2]
Explanation: nums[1] + nums[2] = 2 + 7 = 9  (1-indexed)
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [2, 3, 4], target = 6
Output: [1, 3]
Explanation: nums[1] + nums[3] = 2 + 4 = 6  (1-indexed)
\`\`\`

**Constraints:**
- \`2 <= nums.length <= 10^4\`
- \`-10^9 <= nums[i] <= 10^9\`
- \`-10^9 <= target <= 10^9\`
- \`nums\` is sorted in non-decreasing order
- Exactly one valid solution exists`,
  hints: [
    `Place one pointer at the very beginning of the array and another at the very end. What can you conclude when their sum is too big or too small?`,
    `If the current sum is less than target, you need a larger value — move the left pointer right. If the sum is greater, move the right pointer left. The sorted order guarantees you will always converge on the answer.`,
  ],
  signature: {
    "name": "twoSumSorted",
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
    "returns": "int[]",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        [
          2,
          7,
          11,
          15
        ],
        9
      ],
      "expected": [
        1,
        2
      ],
      "hidden": false
    },
    {
      "input": [
        [
          2,
          3,
          4
        ],
        6
      ],
      "expected": [
        1,
        3
      ],
      "hidden": false
    },
    {
      "input": [
        [
          -1,
          0
        ],
        -1
      ],
      "expected": [
        1,
        2
      ],
      "hidden": false
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
        9
      ],
      "expected": [
        4,
        5
      ],
      "hidden": true
    },
    {
      "input": [
        [
          1,
          3,
          5,
          7,
          9
        ],
        10
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
          -10,
          -5,
          0,
          3,
          7
        ],
        -2
      ],
      "expected": [
        2,
        4
      ],
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
      "expected": [
        1,
        2
      ],
      "hidden": true
    },
    {
      "input": [
        [
          1,
          5,
          8,
          10
        ],
        13
      ],
      "expected": [
        2,
        3
      ],
      "hidden": true
    },
    {
      "input": [
        [
          3,
          3
        ],
        6
      ],
      "expected": [
        1,
        2
      ],
      "hidden": true
    }
  ],
  starterCode: {
    python: `def two_sum_sorted(nums, target):
    # TODO: use two pointers to find the pair
    return []
`,
    javascript: `function twoSumSorted(nums, target) {
    // TODO: use two pointers to find the pair
    return [];
}
`,
    typescript: `function twoSumSorted(nums: number[], target: number): number[] {
    // TODO: use two pointers to find the pair
    return [];
}`,
    java: `class Solution {
    public int[] twoSumSorted(int[] nums, int target) {
        // TODO: use two pointers to find the pair
        return new int[]{};
    }
}
`,
    csharp: `public class Solution {
    public int[] TwoSumSorted(int[] nums, int target) {
        // TODO: use two pointers to find the pair
        return new int[]{};
    }
}`,
    c: `int* twoSumSorted(int* nums, int numsSize, int target, int* returnSize) {
    // TODO: use two pointers to find the pair
    *returnSize = 0;
    return NULL;
}
`,
    cpp: `class Solution {
public:
    vector<int> twoSumSorted(vector<int>& nums, int target) {
        // TODO: use two pointers to find the pair
        return {};
    }
};`,
  },
  solutions: {
    python: `def two_sum_sorted(nums, target):
    left, right = 0, len(nums) - 1
    while left < right:
        s = nums[left] + nums[right]
        if s == target:
            return [left + 1, right + 1]
        elif s < target:
            left += 1
        else:
            right -= 1
    return []
`,
    javascript: `function twoSumSorted(nums, target) {
    let left = 0, right = nums.length - 1;
    while (left < right) {
        const s = nums[left] + nums[right];
        if (s === target) return [left + 1, right + 1];
        else if (s < target) left++;
        else right--;
    }
    return [];
}
`,
    typescript: `function twoSumSorted(nums: number[], target: number): number[] {
    let left = 0, right = nums.length - 1;
    while (left < right) {
        const s = nums[left] + nums[right];
        if (s === target) return [left + 1, right + 1];
        else if (s < target) left++;
        else right--;
    }
    return [];
}`,
    java: `class Solution {
    public int[] twoSumSorted(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left < right) {
            int s = nums[left] + nums[right];
            if (s == target) return new int[]{left + 1, right + 1};
            else if (s < target) left++;
            else right--;
        }
        return new int[]{};
    }
}
`,
    csharp: `public class Solution {
    public int[] TwoSumSorted(int[] nums, int target) {
        int left = 0, right = nums.Length - 1;
        while (left < right) {
            int s = nums[left] + nums[right];
            if (s == target) return new int[]{left + 1, right + 1};
            else if (s < target) left++;
            else right--;
        }
        return new int[]{};
    }
}`,
    c: `#include <stdlib.h>
int* twoSumSorted(int* nums, int numsSize, int target, int* returnSize) {
    int* result = (int*)malloc(2 * sizeof(int));
    int left = 0, right = numsSize - 1;
    while (left < right) {
        int s = nums[left] + nums[right];
        if (s == target) {
            result[0] = left + 1;
            result[1] = right + 1;
            *returnSize = 2;
            return result;
        } else if (s < target) {
            left++;
        } else {
            right--;
        }
    }
    *returnSize = 0;
    return result;
}
`,
    cpp: `class Solution {
public:
    vector<int> twoSumSorted(vector<int>& nums, int target) {
        int left = 0, right = (int)nums.size() - 1;
        while (left < right) {
            int s = nums[left] + nums[right];
            if (s == target) return {left + 1, right + 1};
            else if (s < target) left++;
            else right--;
        }
        return {};
    }
};`,
  },
  editorial: `## Approach: Two Pointers

Because the array is sorted, we can use two pointers starting at opposite ends and converge toward the answer in a single pass.

**Algorithm:**
1. Set \`left = 0\`, \`right = n - 1\`.
2. While \`left < right\`:
   - Compute \`sum = nums[left] + nums[right]\`.
   - If \`sum == target\` → return \`[left + 1, right + 1]\` (1-indexed).
   - If \`sum < target\` → the current sum is too small; increment \`left\` to increase the sum.
   - If \`sum > target\` → the current sum is too large; decrement \`right\` to decrease the sum.
3. A solution is guaranteed to exist, so the loop will always find it.

**Why it's correct:** At every step, the only pairs not yet eliminated are those with indices in \`[left, right]\`. Advancing \`left\` safely discards all pairs \`(left, j)\` for \`j < right\` because they would be even smaller; similarly, decrementing \`right\` discards all pairs \`(i, right)\` for \`i > left\`.

**Complexity:**
- **Time:** O(n) — each pointer moves at most n steps total.
- **Space:** O(1) — only two integer pointers are used.`,
};

export default problem;
