import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-pairs-in-an-array-with-absolute-difference-equal-to-k",
  title: "Count Pairs With Absolute Difference K",
  difficulty: "easy",
  category: "two-pointers",
  order: 1066,
  description: `Given an integer array \`nums\` and a non-negative integer \`k\`, return the number of pairs \`(i, j)\` where \`0 <= i < j < nums.length\` and \`|nums[i] - nums[j]| == k\`.

**Examples:**

\`\`\`text
Input: nums = [1, 2, 2, 1], k = 1
Output: 4
Explanation: Pairs with |difference| == 1:
  (0,1): |1-2| = 1  ✓
  (0,2): |1-2| = 1  ✓
  (1,3): |2-1| = 1  ✓
  (2,3): |2-1| = 1  ✓
\`\`\`

\`\`\`text
Input: nums = [1, 3, 5, 7], k = 2
Output: 3
Explanation: Pairs with |difference| == 2:
  (0,1): |1-3| = 2  ✓
  (1,2): |3-5| = 2  ✓
  (2,3): |5-7| = 2  ✓
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 200\`
- \`0 <= nums[i] <= 100\`
- \`0 <= k <= 100\``,
  hints: [
    `Try iterating over all pairs (i, j) with i < j and checking whether |nums[i] - nums[j]| equals k.`,
    `If you sort the array first, then for any i < j we know nums[j] >= nums[i], so |nums[i] - nums[j]| = nums[j] - nums[i]. Can two pointers efficiently find all valid pairs?`,
  ],
  signature: {
    "name": "countKdifference",
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
    "returns": "int"
  },
  testCases: [
    {
      "input": [
        [
          1,
          2,
          2,
          1
        ],
        1
      ],
      "expected": 4,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          3,
          5,
          7
        ],
        2
      ],
      "expected": 3,
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
        1
      ],
      "expected": 4,
      "hidden": false
    },
    {
      "input": [
        [
          1
        ],
        1
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          1,
          1
        ],
        0
      ],
      "expected": 3,
      "hidden": true
    },
    {
      "input": [
        [
          3,
          2,
          1,
          5,
          4
        ],
        2
      ],
      "expected": 3,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          5,
          3,
          4,
          2
        ],
        3
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
          5
        ],
        10
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
          5
        ],
        0
      ],
      "expected": 6,
      "hidden": true
    },
    {
      "input": [
        [
          0,
          100
        ],
        100
      ],
      "expected": 1,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_kdifference(nums, k):
    # TODO: implement
    return 0`,
    javascript: `function countKdifference(nums, k) {
    // TODO: implement
    return 0;
}`,
    typescript: `function countKdifference(nums: number[], k: number): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int countKdifference(int[] nums, int k) {
        // TODO: implement
        return 0;
    }
}`,
    csharp: `public class Solution {
    public int CountKdifference(int[] nums, int k) {
        // TODO: implement
        return 0;
    }
}`,
    c: `int countKdifference(int* nums, int numsSize, int k) {
    // TODO: implement
    return 0;
}`,
    cpp: `class Solution {
public:
    int countKdifference(vector<int>& nums, int k) {
        // TODO: implement
        return 0;
    }
};`,
  },
  solutions: {
    python: `def count_kdifference(nums, k):
    count = 0
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):
            if abs(nums[i] - nums[j]) == k:
                count += 1
    return count`,
    javascript: `function countKdifference(nums, k) {
    let count = 0;
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (Math.abs(nums[i] - nums[j]) === k) {
                count++;
            }
        }
    }
    return count;
}`,
    typescript: `function countKdifference(nums: number[], k: number): number {
    let count = 0;
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (Math.abs(nums[i] - nums[j]) === k) {
                count++;
            }
        }
    }
    return count;
}`,
    java: `class Solution {
    public int countKdifference(int[] nums, int k) {
        int count = 0;
        int n = nums.length;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (Math.abs(nums[i] - nums[j]) == k) {
                    count++;
                }
            }
        }
        return count;
    }
}`,
    csharp: `using System;

public class Solution {
    public int CountKdifference(int[] nums, int k) {
        int count = 0;
        int n = nums.Length;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (Math.Abs(nums[i] - nums[j]) == k) {
                    count++;
                }
            }
        }
        return count;
    }
}`,
    c: `int countKdifference(int* nums, int numsSize, int k) {
    int count = 0;
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            int diff = nums[i] - nums[j];
            if (diff < 0) diff = -diff;
            if (diff == k) count++;
        }
    }
    return count;
}`,
    cpp: `class Solution {
public:
    int countKdifference(vector<int>& nums, int k) {
        int count = 0;
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int diff = nums[i] - nums[j];
                if (diff < 0) diff = -diff;
                if (diff == k) count++;
            }
        }
        return count;
    }
};`,
  },
  editorial: `## Approach 1: Brute Force — O(n²)

Check every pair \`(i, j)\` with \`i < j\`. If \`|nums[i] - nums[j]| == k\`, increment the counter.

\`\`\`python
def count_kdifference(nums, k):
    count = 0
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if abs(nums[i] - nums[j]) == k:
                count += 1
    return count
\`\`\`

With \`n <= 200\`, the at most ~20 000 pair checks are trivially fast.

**Time:** O(n²) &nbsp; **Space:** O(1)

---

## Approach 2: Sort + Two Pointers — O(n log n)

1. **Sort** \`nums\`. For any \`i < j\` in the sorted array, \`nums[j] - nums[i] >= 0\`, so the absolute difference simplifies to \`nums[j] - nums[i]\`.
2. Use a left pointer \`l = 0\` and right pointer \`r = 1\`.
3. While \`r < n\`:
   - If \`nums[r] - nums[l] < k\`: advance \`r\` to widen the gap.
   - If \`nums[r] - nums[l] > k\`: advance \`l\` to shrink the gap (if \`l\` reaches \`r\`, also advance \`r\`).
   - If equal: count it, then advance \`r\`.

The two pointers scan the sorted array in O(n) time after the sort.

**Time:** O(n log n) &nbsp; **Space:** O(1)`,
};

export default problem;
