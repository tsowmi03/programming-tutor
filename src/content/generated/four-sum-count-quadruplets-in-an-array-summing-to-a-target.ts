import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "four-sum-count-quadruplets-in-an-array-summing-to-a-target",
  title: "Four Sum Count",
  difficulty: "medium",
  category: "two-pointers",
  order: 1157,
  description: `Given an integer array \`nums\` and an integer \`target\`, return the number of **unique** quadruplets \`(nums[i], nums[j], nums[k], nums[l])\` such that:

- \`i < j < k < l\`
- \`nums[i] + nums[j] + nums[k] + nums[l] == target\`
- No two quadruplets contain the same combination of values (duplicates in the array do not produce duplicate quadruplets).

\`\`\`text
Example 1:
Input:  nums = [1, 0, -1, 0, -2, 2], target = 0
Output: 3
Explanation: The unique quadruplets are [-2,-1,1,2], [-2,0,0,2], [-1,0,0,1].
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [2, 2, 2, 2, 2], target = 8
Output: 1
Explanation: Only one unique quadruplet: [2,2,2,2].
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 200\`
- \`-10^9 <= nums[i] <= 10^9\`
- \`-10^9 <= target <= 10^9\``,
  hints: [
    `Sort the array first. Sorting lets you skip duplicate values and use two pointers for the inner loop.`,
    `Fix the first two indices \`i\` and \`j\` with nested loops, then use two pointers \`left\` and \`right\` on the remaining subarray — the same technique as 3Sum.`,
    `Skip duplicates at each level: after picking \`nums[i]\`, skip any \`nums[i+1] == nums[i]\`. Do the same for \`j\`, and after each matched pair, advance both pointers past duplicates.`,
    `Watch out for integer overflow when summing four large values — use a 64-bit integer (long in Java/C).`,
  ],
  signature: {
    name: "fourSum",
    params: [
      { name: "nums", type: "int[]" },
      { name: "target", type: "int" },
    ],
    returns: "int",
  },
  testCases: [
    {
      input: [[1, 0, -1, 0, -2, 2], 0],
      expected: 3,
      hidden: false,
    },
    {
      input: [[2, 2, 2, 2, 2], 8],
      expected: 1,
      hidden: false,
    },
    {
      input: [[0, 0, 0, 0], 0],
      expected: 1,
      hidden: false,
    },
    {
      input: [[], 0],
      expected: 0,
      hidden: true,
    },
    {
      input: [[1, 2, 3], 6],
      expected: 0,
      hidden: true,
    },
    {
      input: [[1, 2, 3, 4], 100],
      expected: 0,
      hidden: true,
    },
    {
      input: [[-3, -2, -1, 0, 0, 1, 2, 3], 0],
      expected: 8,
      hidden: true,
    },
    {
      input: [[2, 2, 2, 2, 5], 11],
      expected: 1,
      hidden: true,
    },
    {
      input: [[-1, -1, 0, 0, 1, 1], 0],
      expected: 2,
      hidden: true,
    },
    {
      input: [[1, 2, 3, 4, 5], 14],
      expected: 1,
      hidden: true,
    },
  ],
  starterCode: {
    python: `def four_sum(nums, target):
    # TODO: implement
    return 0
`,
    javascript: `function fourSum(nums, target) {
    // TODO: implement
    return 0;
}
`,
    java: `class Solution {
    public int fourSum(int[] nums, int target) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int fourSum(int* nums, int numsSize, int target) {
    // TODO: implement
    return 0;
}
`,
  },
  solutions: {
    python: `def four_sum(nums, target):
    nums.sort()
    n = len(nums)
    count = 0
    for i in range(n - 3):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        for j in range(i + 1, n - 2):
            if j > i + 1 and nums[j] == nums[j - 1]:
                continue
            left, right = j + 1, n - 1
            while left < right:
                s = nums[i] + nums[j] + nums[left] + nums[right]
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
    javascript: `function fourSum(nums, target) {
    nums.sort((a, b) => a - b);
    const n = nums.length;
    let count = 0;
    for (let i = 0; i < n - 3; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        for (let j = i + 1; j < n - 2; j++) {
            if (j > i + 1 && nums[j] === nums[j - 1]) continue;
            let left = j + 1, right = n - 1;
            while (left < right) {
                const s = nums[i] + nums[j] + nums[left] + nums[right];
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
        }
    }
    return count;
}
`,
    java: `class Solution {
    public int fourSum(int[] nums, int target) {
        java.util.Arrays.sort(nums);
        int n = nums.length;
        int count = 0;
        for (int i = 0; i < n - 3; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            for (int j = i + 1; j < n - 2; j++) {
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;
                int left = j + 1, right = n - 1;
                while (left < right) {
                    long s = (long) nums[i] + nums[j] + nums[left] + nums[right];
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
            }
        }
        return count;
    }
}
`,
    c: `#include <stdlib.h>

static int cmp_int(const void *a, const void *b) {
    int x = *(int *)a, y = *(int *)b;
    return (x > y) - (x < y);
}

int fourSum(int* nums, int numsSize, int target) {
    qsort(nums, numsSize, sizeof(int), cmp_int);
    int count = 0;
    for (int i = 0; i < numsSize - 3; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        for (int j = i + 1; j < numsSize - 2; j++) {
            if (j > i + 1 && nums[j] == nums[j - 1]) continue;
            int left = j + 1, right = numsSize - 1;
            while (left < right) {
                long long s = (long long)nums[i] + nums[j] + nums[left] + nums[right];
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
        }
    }
    return count;
}
`,
  },
  editorial: `## Approach: Sort + Two Nested Loops + Two Pointers

This extends the classic **3Sum** pattern by one extra loop.

### Algorithm
1. **Sort** the array.
2. Fix the first element with index \`i\` (outer loop).
3. Fix the second element with index \`j\` (inner loop, starting at \`i+1\`).
4. Use **two pointers** \`left = j+1\` and \`right = n-1\` to find pairs that complete the target sum.
5. **Skip duplicates** at every level to avoid counting the same value combination twice.

\`\`\`text
nums = [-2,-1,0,0,1,2], target = 0
i=-2, j=-1: left=0,right=5 → -2-1+0+2=−1→left++ → -2-1+0+2=−1→left++ → -2-1+1+2=0 ✓
i=-2, j=0:  left=2,right=5 → -2+0+0+2=0 ✓
i=-1, j=0:  left=2,right=5 → -1+0+0+1=0 ✓
\`\`\`

### Complexity
- **Time:** O(n³) — two loops + one two-pointer scan each O(n)
- **Space:** O(1) extra (sort is in-place)

### Overflow
When summing four values near ±10⁹, the total can exceed 32-bit int range (≈ ±2×10⁹). Always accumulate into a 64-bit type (\`long\` in Java, \`long long\` in C).`,
};

export default problem;
