import type { CodeProblemDef } from "../types";

export const findMinRotated: CodeProblemDef = {
  type: "code",
  slug: "find-minimum-in-rotated-sorted-array",
  title: "Find Minimum in Rotated Sorted Array",
  difficulty: "medium",
  category: "binary-search",
  order: 2,
  description: `An ascending sorted array of **distinct** integers has been **rotated** between 1 and n times. For example, \`[0,1,2,4,5,6,7]\` rotated 4 times becomes \`[4,5,6,7,0,1,2]\`.

Given the rotated array \`nums\`, return its **minimum element** in **O(log n)** time.

**Example 1**

\`\`\`text
Input: nums = [3,4,5,1,2]
Output: 1
\`\`\`

**Example 2**

\`\`\`text
Input: nums = [4,5,6,7,0,1,2]
Output: 0
\`\`\`

**Example 3**

\`\`\`text
Input: nums = [11,13,15,17]
Output: 11
Explanation: rotating n times leaves the array sorted.
\`\`\`

**Constraints**

- \`1 <= nums.length <= 5000\`
- All integers are distinct.
`,
  hints: [
    `A linear scan is O(n). The array is two sorted runs glued together — binary search can still work, but the test at \`mid\` changes.`,
    `Compare \`nums[mid]\` with \`nums[hi]\`. If \`nums[mid] > nums[hi]\`, where must the minimum be? What if \`nums[mid] < nums[hi]\`?`,
    `If \`nums[mid] > nums[hi]\` the “break” (and the minimum) lies strictly right of mid: \`lo = mid + 1\`. Otherwise the minimum is at mid or left of it: \`hi = mid\`. Note \`mid\` stays a candidate in that branch.`,
  ],
  signature: {
    "name": "findMin",
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
          3,
          4,
          5,
          1,
          2
        ]
      ],
      "expected": 1
    },
    {
      "input": [
        [
          4,
          5,
          6,
          7,
          0,
          1,
          2
        ]
      ],
      "expected": 0
    },
    {
      "input": [
        [
          11,
          13,
          15,
          17
        ]
      ],
      "expected": 11
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
          5,
          1,
          2,
          3,
          4
        ]
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          2,
          3,
          4,
          5,
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
      "expected": 1,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def find_min(nums):
    """Return the minimum element of the rotated sorted array."""
    # Your code here
    pass
`,
    javascript: `/**
 * @param {number[]} nums rotated sorted array, distinct values
 * @return {number} the minimum element
 */
function findMin(nums) {
  // Your code here
}
`,
    typescript: `/**
 * @param {number[]} nums rotated sorted array, distinct values
 * @return {number} the minimum element
 */
function findMin(nums: number[]): number {
  // Your code here
  return -1;
}`,
    java: `class Solution {
    public int findMin(int[] nums) {
        // Your code here
        return -1;
    }
}
`,
    csharp: `public class Solution {
    public int FindMin(int[] nums) {
        // Your code here
        return -1;
    }
}`,
    c: `int findMin(int* nums, int numsSize) {
    // Your code here
    return -1;
}
`,
    cpp: `class Solution {
public:
    int findMin(vector<int>& nums) {
        // Your code here
        return -1;
    }
};`,
  },
  solutions: {
    python: `def find_min(nums):
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] > nums[hi]:
            lo = mid + 1
        else:
            hi = mid
    return nums[lo]
`,
    javascript: `function findMin(nums) {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (nums[mid] > nums[hi]) lo = mid + 1;
    else hi = mid;
  }
  return nums[lo];
}
`,
    typescript: `function findMin(nums: number[]): number {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (nums[mid] > nums[hi]) lo = mid + 1;
    else hi = mid;
  }
  return nums[lo];
}`,
    java: `class Solution {
    public int findMin(int[] nums) {
        int lo = 0, hi = nums.length - 1;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] > nums[hi]) lo = mid + 1;
            else hi = mid;
        }
        return nums[lo];
    }
}
`,
    csharp: `public class Solution {
    public int FindMin(int[] nums) {
        int lo = 0, hi = nums.Length - 1;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] > nums[hi]) lo = mid + 1;
            else hi = mid;
        }
        return nums[lo];
    }
}`,
    c: `int findMin(int* nums, int numsSize) {
    int lo = 0, hi = numsSize - 1;
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] > nums[hi]) lo = mid + 1;
        else hi = mid;
    }
    return nums[lo];
}
`,
    cpp: `class Solution {
public:
    int findMin(vector<int>& nums) {
        int lo = 0, hi = (int)nums.size() - 1;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] > nums[hi]) lo = mid + 1;
            else hi = mid;
        }
        return nums[lo];
    }
};`,
  },
  editorial: `## Approach: binary search on the rotation break

A rotated sorted array is two ascending runs, with the minimum at the start
of the second run. Binary search still applies — what changes is the
question you ask at \`mid\`. Comparing against \`nums[hi]\` is the reliable
probe:

- \`nums[mid] > nums[hi]\` — the break is strictly **right** of mid (a
  sorted array could never have mid greater than a later element), so the
  minimum is too: \`lo = mid + 1\`.
- \`nums[mid] < nums[hi]\` — the run from mid to hi is sorted, so the
  minimum is at mid **or to its left**: \`hi = mid\` (mid stays a
  candidate — this is why the loop condition is \`lo < hi\`, not \`<=\`).

When \`lo == hi\`, that index holds the minimum.

Why compare with \`nums[hi]\` and not \`nums[lo]\`? When the array isn't
rotated at all (\`[1,2,3,4,5]\`), \`nums[mid] > nums[lo]\` would wrongly
send you right; the \`hi\` comparison handles that case for free.

**Complexity:** O(log n) time, O(1) space.

This generalises to a powerful idea: binary search doesn't need a sorted
array — it needs a **monotonic predicate** (here, "is this element ≤ the
last element?", false…false,true…true). Finding the first \`true\` is
exactly this loop shape.
`,
};
