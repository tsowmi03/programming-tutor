import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "find-the-leftmost-index-of-a-target-in-a-sorted-array-with-duplicates",
  title: "Leftmost Target Index",
  difficulty: "easy",
  category: "binary-search",
  order: 1088,
  description: `Given a **sorted** (non-decreasing) integer array \`nums\` and an integer \`target\`, return the **leftmost index** (0-indexed) at which \`target\` appears. If \`target\` is not present in the array, return \`-1\`.

You must use **binary search** with O(log n) time complexity.

\`\`\`text
Example 1:
Input:  nums = [1, 2, 2, 2, 3, 4], target = 2
Output: 1
Explanation: The first occurrence of 2 is at index 1.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [1, 3, 5, 7, 9], target = 5
Output: 2
Explanation: 5 appears exactly once, at index 2.
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [1, 3, 5, 7, 9], target = 4
Output: -1
Explanation: 4 is not in the array.
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 10^5\`
- \`-10^9 <= nums[i], target <= 10^9\`
- \`nums\` is sorted in non-decreasing order.`,
  hints: [
    `Standard binary search finds *a* occurrence of target; how can you modify it to always land on the *leftmost* one?`,
    `When nums[mid] == target, don't stop — keep searching the left half by setting hi = mid (not mid - 1) and tracking a candidate answer.`,
    `At the end, check whether the candidate index actually holds target (to handle the case where target is absent).`,
  ],
  signature: {
    "name": "leftmostIndex",
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
    "returns": "int",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        [
          1,
          2,
          2,
          2,
          3,
          4
        ],
        2
      ],
      "expected": 1,
      "hidden": false
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
        5
      ],
      "expected": 2,
      "hidden": false
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
        4
      ],
      "expected": -1,
      "hidden": false
    },
    {
      "input": [
        [
          5,
          5,
          5,
          5,
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
          1
        ],
        2
      ],
      "expected": -1,
      "hidden": true
    },
    {
      "input": [
        [
          -5,
          -3,
          -3,
          -1,
          0,
          2
        ],
        -3
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
          5,
          6,
          7,
          8,
          9,
          10
        ],
        10
      ],
      "expected": 9,
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
        1
      ],
      "expected": 0,
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
          3
        ],
        3
      ],
      "expected": 6,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def leftmost_index(nums: list[int], target: int) -> int:
    # TODO: implement binary search for leftmost occurrence
    return -1
`,
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function leftmostIndex(nums, target) {
    // TODO: implement binary search for leftmost occurrence
    return -1;
}
`,
    typescript: `function leftmostIndex(nums: number[], target: number): number {
    // TODO: implement binary search for leftmost occurrence
    return -1;
}`,
    java: `class Solution {
    public int leftmostIndex(int[] nums, int target) {
        // TODO: implement binary search for leftmost occurrence
        return -1;
    }
}
`,
    csharp: `public class Solution {
    public int LeftmostIndex(int[] nums, int target) {
        // TODO: implement binary search for leftmost occurrence
        return -1;
    }
}`,
    c: `int leftmostIndex(int* nums, int numsSize, int target) {
    // TODO: implement binary search for leftmost occurrence
    return -1;
}
`,
    cpp: `class Solution {
public:
    int leftmostIndex(vector<int>& nums, int target) {
        // TODO: implement binary search for leftmost occurrence
        return -1;
    }
};`,
  },
  solutions: {
    python: `def leftmost_index(nums: list[int], target: int) -> int:
    lo, hi = 0, len(nums) - 1
    result = -1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            result = mid
            hi = mid - 1  # keep searching left
        elif nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return result
`,
    javascript: `function leftmostIndex(nums, target) {
    let lo = 0, hi = nums.length - 1;
    let result = -1;
    while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        if (nums[mid] === target) {
            result = mid;
            hi = mid - 1; // keep searching left
        } else if (nums[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    return result;
}
`,
    typescript: `function leftmostIndex(nums: number[], target: number): number {
    let lo = 0, hi = nums.length - 1;
    let result = -1;
    while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        if (nums[mid] === target) {
            result = mid;
            hi = mid - 1; // keep searching left
        } else if (nums[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    return result;
}`,
    java: `class Solution {
    public int leftmostIndex(int[] nums, int target) {
        int lo = 0, hi = nums.length - 1;
        int result = -1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] == target) {
                result = mid;
                hi = mid - 1; // keep searching left
            } else if (nums[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return result;
    }
}
`,
    csharp: `public class Solution {
    public int LeftmostIndex(int[] nums, int target) {
        int lo = 0, hi = nums.Length - 1;
        int result = -1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] == target) {
                result = mid;
                hi = mid - 1; // keep searching left
            } else if (nums[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return result;
    }
}`,
    c: `int leftmostIndex(int* nums, int numsSize, int target) {
    int lo = 0, hi = numsSize - 1;
    int result = -1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] == target) {
            result = mid;
            hi = mid - 1; /* keep searching left */
        } else if (nums[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    return result;
}
`,
    cpp: `class Solution {
public:
    int leftmostIndex(vector<int>& nums, int target) {
        int lo = 0, hi = (int)nums.size() - 1;
        int result = -1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] == target) {
                result = mid;
                hi = mid - 1; // keep searching left
            } else if (nums[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return result;
    }
};`,
  },
  editorial: `## Approach: Modified Binary Search

### Idea
A standard binary search stops as soon as it finds \`target\`. To find the **leftmost** occurrence, we keep searching the left half even after a match.

### Algorithm
1. Maintain \`lo = 0\`, \`hi = n - 1\`, and \`result = -1\`.
2. At each step compute \`mid = lo + (hi - lo) / 2\`.
   - If \`nums[mid] == target\`: record \`result = mid\` and continue left by setting \`hi = mid - 1\`.
   - If \`nums[mid] < target\`: search right — \`lo = mid + 1\`.
   - If \`nums[mid] > target\`: search left — \`hi = mid - 1\`.
3. Return \`result\` (still \`-1\` if target was never found).

### Why it works
Every time we find a match we don't give up; we narrow the window to \`[lo, mid-1]\` forcing the search to look for an even earlier occurrence. The loop terminates with \`result\` holding the smallest valid index, or \`-1\`.

### Complexity
- **Time:** O(log n) — the search space halves each iteration.
- **Space:** O(1) — no extra memory used.`,
};

export default problem;
