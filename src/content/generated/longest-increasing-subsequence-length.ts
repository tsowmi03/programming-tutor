import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "longest-increasing-subsequence-length",
  title: "Longest Increasing Subsequence Length",
  difficulty: "medium",
  category: "recursion-dp",
  order: 1146,
  description: `Given an integer array \`nums\`, return the length of the **longest strictly increasing subsequence**.

A **subsequence** is a sequence derived from the array by deleting some (or no) elements without changing the order of the remaining elements.

\`\`\`text
Example 1:
Input:  nums = [10, 9, 2, 5, 3, 7, 101, 18]
Output: 4
Explanation: The longest increasing subsequence is [2, 3, 7, 101], length 4.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [0, 1, 0, 3, 2, 3]
Output: 4
Explanation: One LIS is [0, 1, 2, 3], length 4.
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [7, 7, 7, 7]
Output: 1
Explanation: All elements are equal; the only strictly increasing subsequence has length 1.
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 2500\`
- \`-10^4 <= nums[i] <= 10^4\``,
  hints: [
    `Try defining dp[i] as the length of the longest increasing subsequence that ends at index i. What is the base case?`,
    `For each index i, look at all previous indices j where nums[j] < nums[i]. You can extend any of those subsequences by one.`,
    `The answer is the maximum value across all dp[i]. Can you compute this in O(n^2) time?`,
  ],
  signature: {
    "name": "lengthOfLIS",
    "params": [
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
        [
          10,
          9,
          2,
          5,
          3,
          7,
          101,
          18
        ]
      ],
      "expected": 4,
      "hidden": false
    },
    {
      "input": [
        [
          0,
          1,
          0,
          3,
          2,
          3
        ]
      ],
      "expected": 4,
      "hidden": false
    },
    {
      "input": [
        [
          7,
          7,
          7,
          7
        ]
      ],
      "expected": 1,
      "hidden": false
    },
    {
      "input": [
        [
          1
        ]
      ],
      "expected": 1,
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
        ]
      ],
      "expected": 5,
      "hidden": true
    },
    {
      "input": [
        [
          5,
          4,
          3,
          2,
          1
        ]
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          3,
          10,
          2,
          1,
          20
        ]
      ],
      "expected": 3,
      "hidden": true
    },
    {
      "input": [
        [
          -3,
          -2,
          -1,
          0,
          1
        ]
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
          1,
          3
        ]
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          3,
          6,
          7,
          9,
          4,
          10,
          5,
          6
        ]
      ],
      "expected": 6,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def length_of_lis(nums):
    # TODO: implement this function
    return 0
`,
    javascript: `function lengthOfLIS(nums) {
    // TODO: implement this function
    return 0;
}
`,
    typescript: `function lengthOfLIS(nums: number[]): number {
    // TODO: implement this function
    return 0;
}`,
    java: `class Solution {
    public int lengthOfLIS(int[] nums) {
        // TODO: implement this function
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int LengthOfLIS(int[] nums) {
        // TODO: implement this function
        return 0;
    }
}`,
    c: `int lengthOfLIS(int* nums, int numsSize) {
    // TODO: implement this function
    return 0;
}
`,
    cpp: `class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        // TODO: implement this function
        return 0;
    }
};`,
  },
  solutions: {
    python: `def length_of_lis(nums):
    n = len(nums)
    if n == 0:
        return 0
    dp = [1] * n
    for i in range(1, n):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)
`,
    javascript: `function lengthOfLIS(nums) {
    const n = nums.length;
    if (n === 0) return 0;
    const dp = new Array(n).fill(1);
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    return Math.max(...dp);
}
`,
    typescript: `function lengthOfLIS(nums: number[]): number {
    const n = nums.length;
    if (n === 0) return 0;
    const dp = new Array(n).fill(1);
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    return Math.max(...dp);
}`,
    java: `class Solution {
    public int lengthOfLIS(int[] nums) {
        int n = nums.length;
        if (n == 0) return 0;
        int[] dp = new int[n];
        for (int i = 0; i < n; i++) dp[i] = 1;
        int best = 1;
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
            best = Math.max(best, dp[i]);
        }
        return best;
    }
}
`,
    csharp: `using System;

public class Solution {
    public int LengthOfLIS(int[] nums) {
        int n = nums.Length;
        if (n == 0) return 0;
        int[] dp = new int[n];
        for (int i = 0; i < n; i++) dp[i] = 1;
        int best = 1;
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    dp[i] = Math.Max(dp[i], dp[j] + 1);
                }
            }
            best = Math.Max(best, dp[i]);
        }
        return best;
    }
}`,
    c: `int lengthOfLIS(int* nums, int numsSize) {
    if (numsSize == 0) return 0;
    int dp[2500];
    for (int i = 0; i < numsSize; i++) dp[i] = 1;
    int best = 1;
    for (int i = 1; i < numsSize; i++) {
        for (int j = 0; j < i; j++) {
            if (nums[j] < nums[i] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
            }
        }
        if (dp[i] > best) best = dp[i];
    }
    return best;
}
`,
    cpp: `class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        int n = nums.size();
        if (n == 0) return 0;
        vector<int> dp(n, 1);
        int best = 1;
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i] && dp[j] + 1 > dp[i]) {
                    dp[i] = dp[j] + 1;
                }
            }
            if (dp[i] > best) best = dp[i];
        }
        return best;
    }
};`,
  },
  editorial: `## Approach: Dynamic Programming (O(n²))

### Intuition
Define \`dp[i]\` as the length of the longest strictly increasing subsequence that **ends at index \`i\`**.

- **Base case:** Every single element is an increasing subsequence of length 1, so \`dp[i] = 1\` for all \`i\`.
- **Transition:** For each index \`i\`, scan all previous indices \`j < i\`. If \`nums[j] < nums[i]\`, the subsequence ending at \`j\` can be extended by \`nums[i]\`, giving length \`dp[j] + 1\`. Take the maximum over all valid \`j\`.

\`\`\`
dp[i] = 1 + max(dp[j]) for all j < i where nums[j] < nums[i]
\`\`\`

- **Answer:** \`max(dp[0], dp[1], ..., dp[n-1])\`

### Complexity
- **Time:** O(n²) — two nested loops over the array.
- **Space:** O(n) — the \`dp\` array.

### Example walkthrough
For \`nums = [10, 9, 2, 5, 3, 7, 101, 18]\`:

| i | nums[i] | dp[i] | Extending from |
|---|---------|-------|----------------|
| 0 | 10      | 1     | —              |
| 1 | 9       | 1     | —              |
| 2 | 2       | 1     | —              |
| 3 | 5       | 2     | j=2 (2<5)      |
| 4 | 3       | 2     | j=2 (2<3)      |
| 5 | 7       | 3     | j=4 (3<7)      |
| 6 | 101     | 4     | j=5 (7<101)    |
| 7 | 18      | 4     | j=5 (7<18)     |

Answer = max(dp) = **4**.

### Note
An O(n log n) solution using binary search on a patience-sorting "tails" array exists but the O(n²) DP is the natural recursive/DP approach and works well within the given constraints (n ≤ 2500).`,
};

export default problem;
