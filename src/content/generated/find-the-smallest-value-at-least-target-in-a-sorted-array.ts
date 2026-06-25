import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "find-the-smallest-value-at-least-target-in-a-sorted-array",
  title: "Smallest Value At Least Target",
  difficulty: "medium",
  category: "binary-search",
  order: 1029,
  description: `Given a **sorted** (non-decreasing) array of integers \`nums\` and an integer \`target\`, return the **smallest value** in \`nums\` that is **greater than or equal to** \`target\`.

If no such value exists, return \`-1\`.

\`\`\`text
Example 1:
Input:  nums = [1, 3, 5, 7, 9], target = 4
Output: 5
Explanation: 5 is the smallest value >= 4.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [2, 4, 6, 8], target = 6
Output: 6
Explanation: 6 is present and is the smallest value >= 6.
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [1, 2, 3], target = 10
Output: -1
Explanation: No value in the array is >= 10.
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 10^5\`
- \`-10^9 <= nums[i] <= 10^9\`
- \`-10^9 <= target <= 10^9\`
- \`nums\` is sorted in non-decreasing order.`,
  hints: [
    `Since the array is sorted, you can use binary search to efficiently find the position where target would be inserted.`,
    `After binary search, check if the element at the found position is valid (i.e., the position is within bounds). What should you return if it's out of bounds?`,
  ],
  guidance: [
    {
      "title": "Identify the Pattern",
      "body": "This is a classic **lower bound** problem: find the first index `i` such that `nums[i] >= target`. Binary search is perfect here since the array is sorted.",
      "level": "nudge"
    },
    {
      "title": "Binary Search Setup",
      "body": "Maintain `lo = 0` and `hi = nums.length - 1`. At each step, check the midpoint. If `nums[mid] < target`, move `lo` up; otherwise, move `hi` down. After the loop, `lo` will be the index of the first element >= target.",
      "level": "strategy"
    },
    {
      "title": "Boundary Check",
      "body": "After the binary search loop, `lo` might equal `nums.length`, which means every element is less than `target`. In that case, return `-1`. Otherwise, return `nums[lo]`.",
      "level": "pitfall"
    },
    {
      "title": "Pseudocode Shape",
      "body": "```\nlo = 0, hi = n - 1\nwhile lo <= hi:\n    mid = (lo + hi) / 2\n    if nums[mid] < target:\n        lo = mid + 1\n    else:\n        hi = mid - 1\nif lo < n:\n    return nums[lo]\nreturn -1\n```",
      "level": "pseudocode"
    }
  ],

  signature: {
    "name": "smallestAtLeastTarget",
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
          3,
          5,
          7,
          9
        ],
        4
      ],
      "expected": 5,
      "hidden": false
    },
    {
      "input": [
        [
          2,
          4,
          6,
          8
        ],
        6
      ],
      "expected": 6,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          2,
          3
        ],
        10
      ],
      "expected": -1,
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
        1
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
          7,
          9
        ],
        9
      ],
      "expected": 9,
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
      "expected": -1,
      "hidden": true
    },
    {
      "input": [
        [
          -10,
          -5,
          0,
          5,
          10
        ],
        -3
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          -10,
          -5,
          0,
          5,
          10
        ],
        -10
      ],
      "expected": -10,
      "hidden": true
    },
    {
      "input": [
        [
          7
        ],
        7
      ],
      "expected": 7,
      "hidden": true
    },
    {
      "input": [
        [
          7
        ],
        8
      ],
      "expected": -1,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def smallest_at_least_target(nums: list[int], target: int) -> int:
    # TODO: implement binary search
    return -1
`,
    javascript: `function smallestAtLeastTarget(nums, target) {
    // TODO: implement binary search
    return -1;
}
`,
    typescript: `function smallestAtLeastTarget(nums: number[], target: number): number {
    // TODO: implement binary search
    return -1;
}
`,
    java: `class Solution {
    public int smallestAtLeastTarget(int[] nums, int target) {
        // TODO: implement binary search
        return -1;
    }
}
`,
    csharp: `public class Solution {
    public int SmallestAtLeastTarget(int[] nums, int target) {
        // TODO: implement binary search
        return -1;
    }
}
`,
    c: `int smallestAtLeastTarget(int* nums, int numsSize, int target) {
    // TODO: implement binary search
    return -1;
}
`,
    cpp: `class Solution {
public:
    int smallestAtLeastTarget(vector<int>& nums, int target) {
        // TODO: implement binary search
        return -1;
    }
};
`,
  },
  solutions: {
    python: `def smallest_at_least_target(nums: list[int], target: int) -> int:
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    if lo < len(nums):
        return nums[lo]
    return -1
`,
    javascript: `function smallestAtLeastTarget(nums, target) {
    let lo = 0, hi = nums.length - 1;
    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (nums[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    if (lo < nums.length) {
        return nums[lo];
    }
    return -1;
}
`,
    typescript: `function smallestAtLeastTarget(nums: number[], target: number): number {
    let lo = 0, hi = nums.length - 1;
    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (nums[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    if (lo < nums.length) {
        return nums[lo];
    }
    return -1;
}
`,
    java: `class Solution {
    public int smallestAtLeastTarget(int[] nums, int target) {
        int lo = 0, hi = nums.length - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        if (lo < nums.length) {
            return nums[lo];
        }
        return -1;
    }
}
`,
    csharp: `public class Solution {
    public int SmallestAtLeastTarget(int[] nums, int target) {
        int lo = 0, hi = nums.Length - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        if (lo < nums.Length) {
            return nums[lo];
        }
        return -1;
    }
}
`,
    c: `int smallestAtLeastTarget(int* nums, int numsSize, int target) {
    int lo = 0, hi = numsSize - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    if (lo < numsSize) {
        return nums[lo];
    }
    return -1;
}
`,
    cpp: `class Solution {
public:
    int smallestAtLeastTarget(vector<int>& nums, int target) {
        int lo = 0, hi = (int)nums.size() - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        if (lo < (int)nums.size()) {
            return nums[lo];
        }
        return -1;
    }
};
`,
  },
  editorial: `## Approach: Binary Search (Lower Bound)

### Intuition
Because the array is sorted in non-decreasing order, we can use binary search to locate the **first index** where the element is \`>= target\`. This is the classic **lower bound** operation.

### Algorithm
1. Initialize \`lo = 0\`, \`hi = n - 1\`.
2. While \`lo <= hi\`:
   - Compute \`mid = lo + (hi - lo) / 2\`.
   - If \`nums[mid] < target\`, the answer must be to the right: \`lo = mid + 1\`.
   - Otherwise, \`nums[mid]\` is a candidate but a smaller one might exist to the left: \`hi = mid - 1\`.
3. After the loop, \`lo\` is the index of the first element \`>= target\`.
4. If \`lo == n\`, every element was smaller than \`target\`, so return \`-1\`. Otherwise return \`nums[lo]\`.

### Correctness
- The invariant maintained is: every element at index \`< lo\` is \`< target\`, and every element at index \`> hi\` is \`>= target\`.
- When the loop ends, \`lo > hi\`, so \`lo\` is the first position where an element could be \`>= target\`.

### Complexity
- **Time:** O(log n) — the search space halves each iteration.
- **Space:** O(1) — only a constant number of variables used.`,
};

export default problem;
