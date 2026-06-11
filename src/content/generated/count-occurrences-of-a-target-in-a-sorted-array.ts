import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-occurrences-of-a-target-in-a-sorted-array",
  title: "Count Occurrences of Target in Sorted Array",
  difficulty: "easy",
  category: "binary-search",
  order: 1087,
  description: `Given a **sorted** (non-decreasing) integer array \`nums\` and an integer \`target\`, return the **number of times** \`target\` appears in \`nums\`.

You must solve it in **O(log n)** time using binary search.

\`\`\`text
Example 1:
Input:  nums = [1, 2, 2, 2, 3, 4], target = 2
Output: 3
Explanation: 2 appears at indices 1, 2, and 3.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [1, 1, 2, 3, 5, 5, 5], target = 5
Output: 3
Explanation: 5 appears at indices 4, 5, and 6.
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [1, 2, 3, 4], target = 6
Output: 0
Explanation: 6 is not in the array.
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 10^5\`
- \`-10^9 <= nums[i], target <= 10^9\`
- \`nums\` is sorted in non-decreasing order.`,
  hints: [
    `Think about finding the first position where \`target\` appears using binary search.`,
    `Similarly, find the last position where \`target\` appears. The count is \`last - first + 1\`.`,
    `If \`target\` is not found at all, return 0. You can check this by verifying that \`nums[first] == target\`.`,
  ],
  signature: {
    "name": "countOccurrences",
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
      "expected": 3,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          1,
          2,
          3,
          5,
          5,
          5
        ],
        5
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
          4
        ],
        6
      ],
      "expected": 0,
      "hidden": false
    },
    {
      "input": [
        [],
        1
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          7
        ],
        7
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          7
        ],
        3
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
          2
        ],
        2
      ],
      "expected": 5,
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
        1
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
        ],
        5
      ],
      "expected": 1,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_occurrences(nums, target):
    # TODO: use binary search to find first and last occurrence
    return 0
`,
    javascript: `function countOccurrences(nums, target) {
    // TODO: use binary search to find first and last occurrence
    return 0;
}
`,
    java: `class Solution {
    public int countOccurrences(int[] nums, int target) {
        // TODO: use binary search to find first and last occurrence
        return 0;
    }
}
`,
    c: `int countOccurrences(int* nums, int numsSize, int target) {
    // TODO: use binary search to find first and last occurrence
    return 0;
}
`,
  },
  solutions: {
    python: `import bisect

def count_occurrences(nums, target):
    left = bisect.bisect_left(nums, target)
    right = bisect.bisect_right(nums, target)
    return right - left
`,
    javascript: `function countOccurrences(nums, target) {
    function bisectLeft(arr, val) {
        let lo = 0, hi = arr.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (arr[mid] < val) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
    function bisectRight(arr, val) {
        let lo = 0, hi = arr.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (arr[mid] <= val) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
    return bisectRight(nums, target) - bisectLeft(nums, target);
}
`,
    java: `class Solution {
    public int countOccurrences(int[] nums, int target) {
        int first = bisectLeft(nums, target);
        int last = bisectRight(nums, target);
        return last - first;
    }

    private int bisectLeft(int[] nums, int target) {
        int lo = 0, hi = nums.length;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (nums[mid] < target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }

    private int bisectRight(int[] nums, int target) {
        int lo = 0, hi = nums.length;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (nums[mid] <= target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}
`,
    c: `int countOccurrences(int* nums, int numsSize, int target) {
    if (numsSize == 0) return 0;
    int lo = 0, hi = numsSize;
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] < target) lo = mid + 1;
        else hi = mid;
    }
    int first = lo;
    lo = 0; hi = numsSize;
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] <= target) lo = mid + 1;
        else hi = mid;
    }
    int last = lo;
    return last - first;
}
`,
  },
  editorial: `## Approach: Two Binary Searches

### Intuition
Since the array is sorted, all occurrences of \`target\` form a contiguous subarray. We can find the **left boundary** (first index where \`target\` could be inserted to keep order) and the **right boundary** (first index after all occurrences of \`target\`). The count is simply \`right - left\`.

### Algorithm
1. **bisect_left(target):** Use binary search to find the leftmost index \`i\` such that \`nums[i] >= target\`.  
2. **bisect_right(target):** Use binary search to find the leftmost index \`j\` such that \`nums[j] > target\`.  
3. Return \`j - i\`.

### Example Walkthrough
\`\`\`
nums = [1, 2, 2, 2, 3, 4], target = 2
bisect_left  → index 1  (first 2)
bisect_right → index 4  (first element > 2)
count = 4 - 1 = 3
\`\`\`

### Complexity
- **Time:** O(log n) — two binary searches each take O(log n).
- **Space:** O(1) — no extra storage needed.`,
};

export default problem;
