import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "three-sum-all-unique-triplets-that-sum-to-zero-return-count",
  title: "Three Sum Count",
  difficulty: "medium",
  category: "two-pointers",
  order: 1067,
  description: `Given an integer array \`nums\`, return the **count** of all unique triplets \`[nums[i], nums[j], nums[k]]\` such that \`i\`, \`j\`, and \`k\` are pairwise distinct indices and \`nums[i] + nums[j] + nums[k] == 0\`.

Two triplets are considered the **same** if they contain the same multiset of values.

\`\`\`text
Example 1:
Input:  nums = [-1, 0, 1, 2, -1, -4]
Output: 2
Explanation: The unique zero-sum triplets are [-1, -1, 2] and [-1, 0, 1].
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [0, 0, 0]
Output: 1
Explanation: The only unique triplet is [0, 0, 0].
\`\`\`

\`\`\`text
Example 3:
Input:  nums = []
Output: 0
Explanation: No triplets can be formed.
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 3000\`
- \`-10^5 <= nums[i] <= 10^5\``,
  hints: [
    `Sorting the array first lets you efficiently skip duplicate values and enables the two-pointer technique.`,
    `Fix one element at index i; then use two pointers (left = i+1, right = n-1) to find pairs in the remaining subarray that sum to -nums[i].`,
    `When you find a valid triplet, advance both pointers and skip over any repeated values to avoid counting the same triplet more than once.`,
    `If the three-element sum is less than 0, move the left pointer right to increase the sum; if greater than 0, move the right pointer left to decrease it.`,
  ],
  signature: {
    "name": "threeSumCount",
    "params": [
      {
        "name": "nums",
        "type": "int[]"
      }
    ],
    "returns": "int"
  },
  testCases: [
    {
      "input": [
        [
          -1,
          0,
          1,
          2,
          -1,
          -4
        ]
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        [
          0,
          0,
          0
        ]
      ],
      "expected": 1,
      "hidden": false
    },
    {
      "input": [
        []
      ],
      "expected": 0,
      "hidden": false
    },
    {
      "input": [
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
        [
          0
        ]
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          -2,
          0,
          0,
          2,
          2
        ]
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          -1,
          0,
          1
        ]
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          0,
          0,
          0,
          0
        ]
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          -4,
          -1,
          -1,
          0,
          1,
          2
        ]
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        [
          -2,
          -1,
          0,
          1,
          2,
          3
        ]
      ],
      "expected": 3,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def three_sum_count(nums):
    # TODO: implement
    return 0
`,
    javascript: `function threeSumCount(nums) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function threeSumCount(nums: number[]): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int threeSumCount(int[] nums) {
        // TODO: implement
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int ThreeSumCount(int[] nums) {
        // TODO: implement
        return 0;
    }
}`,
    c: `int threeSumCount(int* nums, int numsSize) {
    // TODO: implement
    return 0;
}
`,
    cpp: `class Solution {
public:
    int threeSumCount(vector<int>& nums) {
        // TODO: implement
        return 0;
    }
};`,
  },
  solutions: {
    python: `def three_sum_count(nums):
    nums.sort()
    n = len(nums)
    count = 0
    for i in range(n - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        l, r = i + 1, n - 1
        while l < r:
            s = nums[i] + nums[l] + nums[r]
            if s == 0:
                count += 1
                while l < r and nums[l] == nums[l + 1]:
                    l += 1
                while l < r and nums[r] == nums[r - 1]:
                    r -= 1
                l += 1
                r -= 1
            elif s < 0:
                l += 1
            else:
                r -= 1
    return count
`,
    javascript: `function threeSumCount(nums) {
    nums.sort((a, b) => a - b);
    const n = nums.length;
    let count = 0;
    for (let i = 0; i < n - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        let l = i + 1, r = n - 1;
        while (l < r) {
            const s = nums[i] + nums[l] + nums[r];
            if (s === 0) {
                count++;
                while (l < r && nums[l] === nums[l + 1]) l++;
                while (l < r && nums[r] === nums[r - 1]) r--;
                l++; r--;
            } else if (s < 0) {
                l++;
            } else {
                r--;
            }
        }
    }
    return count;
}
`,
    typescript: `function threeSumCount(nums: number[]): number {
    nums.sort((a, b) => a - b);
    const n = nums.length;
    let count = 0;
    for (let i = 0; i < n - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        let l = i + 1, r = n - 1;
        while (l < r) {
            const s = nums[i] + nums[l] + nums[r];
            if (s === 0) {
                count++;
                while (l < r && nums[l] === nums[l + 1]) l++;
                while (l < r && nums[r] === nums[r - 1]) r--;
                l++; r--;
            } else if (s < 0) {
                l++;
            } else {
                r--;
            }
        }
    }
    return count;
}`,
    java: `class Solution {
    public int threeSumCount(int[] nums) {
        java.util.Arrays.sort(nums);
        int n = nums.length;
        int count = 0;
        for (int i = 0; i < n - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int l = i + 1, r = n - 1;
            while (l < r) {
                int s = nums[i] + nums[l] + nums[r];
                if (s == 0) {
                    count++;
                    while (l < r && nums[l] == nums[l + 1]) l++;
                    while (l < r && nums[r] == nums[r - 1]) r--;
                    l++; r--;
                } else if (s < 0) {
                    l++;
                } else {
                    r--;
                }
            }
        }
        return count;
    }
}
`,
    csharp: `using System;

public class Solution {
    public int ThreeSumCount(int[] nums) {
        Array.Sort(nums);
        int n = nums.Length;
        int count = 0;
        for (int i = 0; i < n - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int l = i + 1, r = n - 1;
            while (l < r) {
                int s = nums[i] + nums[l] + nums[r];
                if (s == 0) {
                    count++;
                    while (l < r && nums[l] == nums[l + 1]) l++;
                    while (l < r && nums[r] == nums[r - 1]) r--;
                    l++; r--;
                } else if (s < 0) {
                    l++;
                } else {
                    r--;
                }
            }
        }
        return count;
    }
}`,
    c: `#include <stdlib.h>
static int cmp(const void* a, const void* b) {
    int x = *(int*)a, y = *(int*)b;
    return (x > y) - (x < y);
}
int threeSumCount(int* nums, int numsSize) {
    qsort(nums, numsSize, sizeof(int), cmp);
    int count = 0;
    for (int i = 0; i < numsSize - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        int l = i + 1, r = numsSize - 1;
        while (l < r) {
            int s = nums[i] + nums[l] + nums[r];
            if (s == 0) {
                count++;
                while (l < r && nums[l] == nums[l + 1]) l++;
                while (l < r && nums[r] == nums[r - 1]) r--;
                l++; r--;
            } else if (s < 0) {
                l++;
            } else {
                r--;
            }
        }
    }
    return count;
}
`,
    cpp: `class Solution {
public:
    int threeSumCount(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        int count = 0;
        for (int i = 0; i < n - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int l = i + 1, r = n - 1;
            while (l < r) {
                int s = nums[i] + nums[l] + nums[r];
                if (s == 0) {
                    count++;
                    while (l < r && nums[l] == nums[l + 1]) l++;
                    while (l < r && nums[r] == nums[r - 1]) r--;
                    l++; r--;
                } else if (s < 0) {
                    l++;
                } else {
                    r--;
                }
            }
        }
        return count;
    }
};`,
  },
  editorial: `## Sort + Two Pointers — O(n²)

**Key Insight:** After sorting, for each fixed pivot at index \`i\`, the problem reduces to finding pairs in the subarray \`[i+1 .. n-1]\` that sum to \`-nums[i]\`. A sorted subarray allows two pointers to scan all pairs in O(n), giving O(n²) overall.

**Algorithm:**
1. Sort \`nums\` in non-decreasing order.
2. For \`i\` from \`0\` to \`n-3\`:
   - **Skip outer duplicates:** if \`i > 0\` and \`nums[i] == nums[i-1]\`, continue.
   - Set \`l = i+1\`, \`r = n-1\`.
   - While \`l < r\`:
     - Compute \`s = nums[i] + nums[l] + nums[r]\`.
     - \`s == 0\`: \`count++\`; advance \`l\` past equal values; retreat \`r\` past equal values; then \`l++\`, \`r--\`.
     - \`s < 0\`: too small → \`l++\`.
     - \`s > 0\`: too large → \`r--\`.
3. Return \`count\`.

**Why duplicate skipping works:** Because the array is sorted, equal values are adjacent. Skipping them after each match ensures each distinct value-multiset is counted exactly once.

**Complexity:**
- **Time:** O(n log n) for sorting + O(n²) for the two-pointer scan = **O(n²)**
- **Space:** O(1) extra (sort is in-place)`,
};

export default problem;
