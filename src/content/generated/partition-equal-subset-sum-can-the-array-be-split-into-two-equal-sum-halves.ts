import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "partition-equal-subset-sum-can-the-array-be-split-into-two-equal-sum-halves",
  title: "Partition Equal Subset Sum",
  difficulty: "medium",
  category: "recursion-dp",
  order: 1155,
  description: `Given an integer array \`nums\`, return \`true\` if you can partition the array into two subsets such that the sum of elements in both subsets is equal, or \`false\` otherwise.

A **subset** here means any selection of elements from the array (not necessarily contiguous), and every element must belong to exactly one subset.

\`\`\`text
Example 1:
Input:  nums = [1, 5, 11, 5]
Output: true
Explanation: [1, 5, 5] and [11] both sum to 11.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [1, 2, 3, 5]
Output: false
Explanation: No way to split into two equal-sum subsets.
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [2, 2]
Output: true
Explanation: [2] and [2] both sum to 2.
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 200\`
- \`1 <= nums[i] <= 100\``,
  hints: [
    `If the total sum is odd, it is immediately impossible. Otherwise, you just need to find a subset that sums to exactly total/2.`,
    `Think of this as a 0/1 knapsack: can you pick a subset of elements that add up to the target?`,
    `Use a boolean DP array \`dp\` of size \`target+1\` where \`dp[j]\` means 'can we achieve sum j'. Iterate elements and update in reverse order.`,
    `Start with \`dp[0] = true\`. For each number \`n\`, iterate \`j\` from \`target\` down to \`n\` and set \`dp[j] |= dp[j - n]\`.`,
  ],
  signature: {
    "name": "canPartition",
    "params": [
      {
        "name": "nums",
        "type": "int[]"
      }
    ],
    "returns": "bool",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        [
          1,
          5,
          11,
          5
        ]
      ],
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          2,
          3,
          5
        ]
      ],
      "expected": false,
      "hidden": false
    },
    {
      "input": [
        [
          2,
          2
        ]
      ],
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        [
          1
        ]
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        [
          3,
          3,
          3,
          4,
          5
        ]
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          5
        ]
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        [
          100,
          100
        ]
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          1,
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
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          2,
          2,
          2,
          2,
          2,
          2,
          2,
          2,
          2,
          2,
          2
        ]
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        [
          14,
          9,
          8,
          4,
          3,
          2
        ]
      ],
      "expected": true,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def can_partition(nums):
    # TODO: implement partition equal subset sum
    return False
`,
    javascript: `function canPartition(nums) {
    // TODO: implement partition equal subset sum
    return false;
}
`,
    java: `class Solution {
    public boolean canPartition(int[] nums) {
        // TODO: implement partition equal subset sum
        return false;
    }
}
`,
    c: `bool canPartition(int* nums, int numsSize) {
    // TODO: implement partition equal subset sum
    return false;
}
`,
  },
  solutions: {
    python: `def can_partition(nums):
    total = sum(nums)
    if total % 2 != 0:
        return False
    target = total // 2
    dp = [False] * (target + 1)
    dp[0] = True
    for n in nums:
        for j in range(target, n - 1, -1):
            dp[j] = dp[j] or dp[j - n]
    return dp[target]
`,
    javascript: `function canPartition(nums) {
    const total = nums.reduce((a, b) => a + b, 0);
    if (total % 2 !== 0) return false;
    const target = total / 2;
    const dp = new Array(target + 1).fill(false);
    dp[0] = true;
    for (const n of nums) {
        for (let j = target; j >= n; j--) {
            dp[j] = dp[j] || dp[j - n];
        }
    }
    return dp[target];
}
`,
    java: `class Solution {
    public boolean canPartition(int[] nums) {
        int total = 0;
        for (int n : nums) total += n;
        if (total % 2 != 0) return false;
        int target = total / 2;
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;
        for (int n : nums) {
            for (int j = target; j >= n; j--) {
                dp[j] = dp[j] || dp[j - n];
            }
        }
        return dp[target];
    }
}
`,
    c: `#include <stdbool.h>
#include <string.h>
bool canPartition(int* nums, int numsSize) {
    int total = 0;
    for (int i = 0; i < numsSize; i++) total += nums[i];
    if (total % 2 != 0) return false;
    int target = total / 2;
    bool dp[10001];
    memset(dp, 0, sizeof(dp));
    dp[0] = true;
    for (int i = 0; i < numsSize; i++) {
        int n = nums[i];
        for (int j = target; j >= n; j--) {
            if (dp[j - n]) dp[j] = true;
        }
    }
    return dp[target];
}
`,
  },
  editorial: `## Approach: 0/1 Knapsack DP

### Key Insight
Partitioning into two equal-sum subsets is equivalent to finding **one subset whose sum equals \`total / 2\`**. If the total is odd, it's immediately impossible.

### Algorithm
1. Compute \`total = sum(nums)\`. If odd, return \`false\`.
2. Set \`target = total / 2\`.
3. Maintain a boolean DP array \`dp[0..target]\` where \`dp[j]\` means "can we pick some elements that sum to exactly \`j\`?"
4. Initialize \`dp[0] = true\` (empty subset sums to 0).
5. For each number \`n\`, iterate \`j\` from \`target\` down to \`n\`:
   - \`dp[j] |= dp[j - n]\`
   - (Reverse order prevents using the same element twice.)
6. Return \`dp[target]\`.

### Why Reverse Iteration?
Iterating \`j\` from high to low ensures each element is only used once. If we iterated forward, we might pick the same element multiple times (0/1 vs unbounded knapsack).

### Complexity
- **Time:** O(n × target) = O(n × sum/2)
- **Space:** O(target) = O(sum/2)

With \`n ≤ 200\` and each value ≤ 100, \`sum ≤ 20000\`, so \`target ≤ 10000\` — well within limits.`,
};

export default problem;
