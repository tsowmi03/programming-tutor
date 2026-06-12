import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "longest-consecutive-sequence-in-an-unsorted-array",
  title: "Longest Consecutive Sequence",
  difficulty: "medium",
  category: "arrays-hashing",
  order: 1054,
  description: `Given an unsorted array of integers \`nums\`, return the length of the longest consecutive elements sequence.

A **consecutive sequence** is a sequence of numbers where each element is exactly 1 greater than the previous (e.g., \`3, 4, 5, 6\`). Duplicate values do not extend a sequence.

\`\`\`text
Example 1:
Input:  nums = [100, 4, 200, 1, 3, 2]
Output: 4
Explanation: The longest consecutive sequence is [1, 2, 3, 4], length = 4.

Example 2:
Input:  nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]
Output: 9
Explanation: The longest consecutive sequence is [0,1,2,3,4,5,6,7,8], length = 9.

Example 3:
Input:  nums = [10, 20, 30]
Output: 1
Explanation: No two numbers are consecutive; the best sequence has length 1.
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 10^5\`
- \`-10^9 <= nums[i] <= 10^9\`
- The array may contain duplicates.`,
  hints: [
    `Think about what makes a number the *start* of a consecutive sequence. A number \`n\` is a start if \`n - 1\` does not appear in the array.`,
    `If you store all numbers in a hash set, you can check membership in O(1). Only start counting from sequence-starting numbers to avoid redundant work.`,
    `For each sequence start, walk forward (\`n+1\`, \`n+2\`, …) checking the set until the chain breaks, tracking the longest streak found.`,
    `Alternatively, sort the array first and do a single linear scan — skip duplicates, extend the streak on consecutive values, and reset otherwise.`,
  ],
  signature: {
    "name": "longestConsecutive",
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
          100,
          4,
          200,
          1,
          3,
          2
        ]
      ],
      "expected": 4,
      "hidden": false
    },
    {
      "input": [
        [
          0,
          3,
          7,
          2,
          5,
          8,
          4,
          6,
          0,
          1
        ]
      ],
      "expected": 9,
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
        ]
      ],
      "expected": 5,
      "hidden": false
    },
    {
      "input": [
        []
      ],
      "expected": 0,
      "hidden": true
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
          1,
          1,
          1
        ]
      ],
      "expected": 1,
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
          10,
          20,
          30
        ]
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          3,
          5,
          2,
          4
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
      "expected": 5,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def longest_consecutive(nums):
    # TODO: implement
    return 0
`,
    javascript: `function longestConsecutive(nums) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function longestConsecutive(nums: number[]): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int longestConsecutive(int[] nums) {
        // TODO: implement
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int LongestConsecutive(int[] nums) {
        // TODO: implement
        return 0;
    }
}`,
    c: `int longestConsecutive(int* nums, int numsSize) {
    // TODO: implement
    return 0;
}
`,
    cpp: `class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        // TODO: implement
        return 0;
    }
};`,
  },
  solutions: {
    python: `def longest_consecutive(nums):
    num_set = set(nums)
    best = 0
    for n in num_set:
        if n - 1 not in num_set:  # n is the start of a sequence
            curr = n
            streak = 1
            while curr + 1 in num_set:
                curr += 1
                streak += 1
            best = max(best, streak)
    return best
`,
    javascript: `function longestConsecutive(nums) {
    const numSet = new Set(nums);
    let best = 0;
    for (const n of numSet) {
        if (!numSet.has(n - 1)) {
            let curr = n;
            let streak = 1;
            while (numSet.has(curr + 1)) {
                curr++;
                streak++;
            }
            best = Math.max(best, streak);
        }
    }
    return best;
}
`,
    typescript: `function longestConsecutive(nums: number[]): number {
    const numSet = new Set(nums);
    let best = 0;
    for (const n of numSet) {
        if (!numSet.has(n - 1)) {
            let curr = n;
            let streak = 1;
            while (numSet.has(curr + 1)) {
                curr++;
                streak++;
            }
            best = Math.max(best, streak);
        }
    }
    return best;
}`,
    java: `class Solution {
    public int longestConsecutive(int[] nums) {
        if (nums.length == 0) return 0;
        java.util.Arrays.sort(nums);
        int best = 1, streak = 1;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] == nums[i - 1]) continue;
            if (nums[i] == nums[i - 1] + 1) {
                streak++;
                if (streak > best) best = streak;
            } else {
                streak = 1;
            }
        }
        return best;
    }
}
`,
    csharp: `using System;
using System.Collections.Generic;

public class Solution {
    public int LongestConsecutive(int[] nums) {
        if (nums.Length == 0) return 0;
        Array.Sort(nums);
        int best = 1, streak = 1;
        for (int i = 1; i < nums.Length; i++) {
            if (nums[i] == nums[i - 1]) continue;
            if (nums[i] == nums[i - 1] + 1) {
                streak++;
                if (streak > best) best = streak;
            } else {
                streak = 1;
            }
        }
        return best;
    }
}`,
    c: `#include <stdlib.h>

static int cmp(const void* a, const void* b) {
    int x = *(int*)a, y = *(int*)b;
    if (x < y) return -1;
    if (x > y) return  1;
    return 0;
}

int longestConsecutive(int* nums, int numsSize) {
    if (numsSize == 0) return 0;
    qsort(nums, numsSize, sizeof(int), cmp);
    int best = 1, streak = 1;
    for (int i = 1; i < numsSize; i++) {
        if (nums[i] == nums[i - 1]) continue;
        if (nums[i] == nums[i - 1] + 1) {
            streak++;
            if (streak > best) best = streak;
        } else {
            streak = 1;
        }
    }
    return best;
}
`,
    cpp: `class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        if (nums.empty()) return 0;
        sort(nums.begin(), nums.end());
        int best = 1, streak = 1;
        for (int i = 1; i < (int)nums.size(); i++) {
            if (nums[i] == nums[i - 1]) continue;
            if (nums[i] == nums[i - 1] + 1) {
                streak++;
                if (streak > best) best = streak;
            } else {
                streak = 1;
            }
        }
        return best;
    }
};`,
  },
  editorial: `## Approach: Hash Set with Sequence-Start Detection (Python/JS) or Sort Scan (Java/C)

### Key Insight
A number \`n\` is the **start** of a consecutive sequence if and only if \`n - 1\` is **not** in the collection. By only walking forward from sequence starts, each element is touched at most twice total — O(n) overall.

### Hash Set Algorithm (Python, JavaScript)
1. Insert all numbers into a hash set.
2. For each \`n\` in the set, skip if \`n - 1\` is also present (not a start).
3. From each start, count forward while \`n+1\`, \`n+2\`, … exist in the set.
4. Track and return the maximum streak.

\`\`\`text
nums = [100, 4, 200, 1, 3, 2]
set  = {100, 4, 200, 1, 3, 2}

n=100: 99 not in set → walk: 100       → streak=1
n=4:   3 in set      → skip
n=200: 199 not in set → walk: 200      → streak=1
n=1:   0 not in set  → walk: 1,2,3,4  → streak=4  ← best

Answer: 4
\`\`\`

**Complexity:** O(n) time, O(n) space.

### Sort-Based Algorithm (Java, C)
1. Sort the array.
2. Scan left to right, skipping duplicate values.
3. Extend the streak when \`nums[i] == nums[i-1] + 1\`; reset otherwise.
4. Return the maximum streak seen.

**Complexity:** O(n log n) time, O(1) extra space.`,
};

export default problem;
