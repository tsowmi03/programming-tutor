import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "find-all-pairs-in-an-array-that-sum-to-a-target-return-count-of-unique-pairs",
  title: "Count Unique Pairs with Target Sum",
  difficulty: "medium",
  category: "foundations",
  order: 1029,
  description: `Given an integer array \`nums\` and an integer \`target\`, return the **count of unique value pairs** \`(a, b)\` where \`a ≤ b\`, such that \`a + b == target\` and both values come from **distinct indices** in the array.

Two pairs are considered identical if they contain the same values. Even if a pair can be formed from multiple index combinations, it still counts as **one pair**.

\`\`\`text
Example 1:
Input:  nums = [1, 2, 3, 4], target = 5
Output: 2
Explanation: The unique pairs are (1, 4) and (2, 3).
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [1, 1, 2, 3], target = 4
Output: 1
Explanation: Only one unique pair exists: (1, 3).
             Even though there are two 1s, the pair is counted only once.
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [1, 1, 1, 1], target = 2
Output: 1
Explanation: (1, 1) is the only unique pair. Having four 1s does not
             create multiple distinct pairs.
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 10^4\`
- \`-10^5 <= nums[i] <= 10^5\`
- \`-2 * 10^5 <= target <= 2 * 10^5\``,
  hints: [
    `What if you sorted the array first? A sorted array makes it much easier to systematically find all pairs summing to the target.`,
    `With a sorted array, try a two-pointer approach: one pointer at the leftmost element and one at the rightmost. If their sum equals the target you found a pair; if it's too small move left forward; if too large move right backward.`,
    `After recording a valid pair, how do you skip over consecutive duplicate values on each side to avoid counting the same value pair more than once?`,
    `Pay special attention to pairs where both values are equal (e.g., target = 2, pair = (1, 1)). At least two copies of that value must exist in the array for the pair to be valid — and the two-pointer approach handles this naturally.`,
  ],
  signature: {
    "name": "countUniquePairs",
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
          1,
          2,
          3,
          4
        ],
        5
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          1,
          2,
          3
        ],
        4
      ],
      "expected": 1,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          2,
          3,
          4,
          3,
          2,
          1
        ],
        5
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        [],
        5
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          5
        ],
        5
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          0,
          0,
          0
        ],
        0
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          -1,
          1,
          0,
          2,
          -2
        ],
        0
      ],
      "expected": 2,
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
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          5,
          7,
          -1,
          5
        ],
        6
      ],
      "expected": 2,
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
        11
      ],
      "expected": 5,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_unique_pairs(nums, target):
    # TODO: implement your solution
    return 0
`,
    javascript: `function countUniquePairs(nums, target) {
    // TODO: implement your solution
    return 0;
}
`,
    java: `class Solution {
    public int countUniquePairs(int[] nums, int target) {
        // TODO: implement your solution
        return 0;
    }
}
`,
    c: `int countUniquePairs(int* nums, int numsSize, int target) {
    /* TODO: implement your solution */
    return 0;
}
`,
  },
  solutions: {
    python: `def count_unique_pairs(nums, target):
    nums.sort()
    left, right = 0, len(nums) - 1
    count = 0
    while left < right:
        s = nums[left] + nums[right]
        if s == target:
            count += 1
            while left < right and nums[left] == nums[left + 1]:
                left += 1
            while left < right and nums[right] == nums[right - 1]:
                right -= 1
            left += 1
            right -= 1
        elif s < target:
            left += 1
        else:
            right -= 1
    return count
`,
    javascript: `function countUniquePairs(nums, target) {
    nums.sort((a, b) => a - b);
    let left = 0, right = nums.length - 1;
    let count = 0;
    while (left < right) {
        const s = nums[left] + nums[right];
        if (s === target) {
            count++;
            while (left < right && nums[left] === nums[left + 1]) left++;
            while (left < right && nums[right] === nums[right - 1]) right--;
            left++;
            right--;
        } else if (s < target) {
            left++;
        } else {
            right--;
        }
    }
    return count;
}
`,
    java: `class Solution {
    public int countUniquePairs(int[] nums, int target) {
        java.util.Arrays.sort(nums);
        int left = 0, right = nums.length - 1;
        int count = 0;
        while (left < right) {
            int s = nums[left] + nums[right];
            if (s == target) {
                count++;
                while (left < right && nums[left] == nums[left + 1]) left++;
                while (left < right && nums[right] == nums[right - 1]) right--;
                left++;
                right--;
            } else if (s < target) {
                left++;
            } else {
                right--;
            }
        }
        return count;
    }
}
`,
    c: `#include <stdlib.h>

static int cmp(const void* a, const void* b) {
    int x = *(int*)a, y = *(int*)b;
    return (x > y) - (x < y);
}

int countUniquePairs(int* nums, int numsSize, int target) {
    if (numsSize < 2) return 0;
    qsort(nums, numsSize, sizeof(int), cmp);
    int left = 0, right = numsSize - 1;
    int count = 0;
    while (left < right) {
        int s = nums[left] + nums[right];
        if (s == target) {
            count++;
            while (left < right && nums[left] == nums[left + 1]) left++;
            while (left < right && nums[right] == nums[right - 1]) right--;
            left++;
            right--;
        } else if (s < target) {
            left++;
        } else {
            right--;
        }
    }
    return count;
}
`,
  },
  editorial: `## Approach: Sort + Two Pointers

### Intuition

Sort the array so we can use two pointers — one at each end — to efficiently find all pairs.

- If \`nums[left] + nums[right] == target\`, we've found a new unique pair.
- If the sum is **too small**, advance \`left\` to increase it.
- If the sum is **too large**, retreat \`right\` to decrease it.

The tricky part is counting each unique value-pair **exactly once** when duplicates exist.

### Handling Duplicates

After recording a valid pair \`(nums[left], nums[right])\`, any adjacent elements equal to \`nums[left]\` or \`nums[right]\` would recreate the same pair. We skip past them before moving the pointers inward:

\`\`\`
while left < right and nums[left] == nums[left+1]:   left++
while left < right and nums[right] == nums[right-1]: right--
left++; right--
\`\`\`

### Walkthrough — \`nums = [1, 1, 2, 3]\`, \`target = 4\`

\`\`\`
Sorted: [1, 1, 2, 3]
         L        R    → 1+3=4 ✓  count=1
                        skip left dup: nums[0]==nums[1] → L=1
                        no right dup
                        L=2, R=2  → stop (L not < R)
Result: 1
\`\`\`

### Complexity

| | |
|---|---|
| **Time** | O(n log n) — dominated by sorting; the two-pointer scan is O(n) |
| **Space** | O(1) auxiliary (O(log n) sorting stack) |`,
};

export default problem;
