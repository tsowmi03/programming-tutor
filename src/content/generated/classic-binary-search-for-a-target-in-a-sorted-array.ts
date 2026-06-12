import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "classic-binary-search-for-a-target-in-a-sorted-array",
  title: "Binary Search for Target",
  difficulty: "easy",
  category: "binary-search",
  order: 1084,
  description: `Given a **sorted** (ascending) array of distinct integers \`nums\` and an integer \`target\`, return the **index** of \`target\` in \`nums\`. If \`target\` does not exist in the array, return \`-1\`.

You must implement an algorithm with **O(log n)** runtime complexity.

\`\`\`text
Example 1:
Input:  nums = [-1, 0, 3, 5, 9, 12], target = 9
Output: 4
Explanation: 9 exists in nums at index 4.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [-1, 0, 3, 5, 9, 12], target = 2
Output: -1
Explanation: 2 does not exist in nums, so return -1.
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [5], target = 5
Output: 0
Explanation: 5 exists at index 0.
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 10^4\`
- \`-10^4 <= nums[i], target <= 10^4\`
- All integers in \`nums\` are **distinct**.
- \`nums\` is sorted in ascending order.`,
  hints: [
    `Maintain two pointers, \`left\` and \`right\`, representing the current search range. Start with \`left = 0\` and \`right = nums.length - 1\`.`,
    `At each step, compute the midpoint \`mid = (left + right) / 2\`. Compare \`nums[mid]\` with \`target\` and decide which half to discard.`,
    `If \`nums[mid] == target\` you've found the answer. If \`nums[mid] < target\`, the target must be in the right half; otherwise it's in the left half.`,
  ],
  signature: {
    "name": "search",
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
          -1,
          0,
          3,
          5,
          9,
          12
        ],
        9
      ],
      "expected": 4,
      "hidden": false
    },
    {
      "input": [
        [
          -1,
          0,
          3,
          5,
          9,
          12
        ],
        2
      ],
      "expected": -1,
      "hidden": false
    },
    {
      "input": [
        [
          5
        ],
        5
      ],
      "expected": 0,
      "hidden": false
    },
    {
      "input": [
        [
          5
        ],
        3
      ],
      "expected": -1,
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
          -10,
          -5,
          0,
          5,
          10
        ],
        -10
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
        0
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        [
          2,
          4,
          6,
          8,
          10,
          12,
          14
        ],
        7
      ],
      "expected": -1,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          3,
          5,
          7,
          9,
          11,
          13,
          15
        ],
        13
      ],
      "expected": 6,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def search(nums: list[int], target: int) -> int:
    # TODO: implement binary search
    return -1
`,
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {
    // TODO: implement binary search
    return -1;
}
`,
    typescript: `function search(nums: number[], target: number): number {
    // TODO: implement binary search
    return -1;
}`,
    java: `class Solution {
    public int search(int[] nums, int target) {
        // TODO: implement binary search
        return -1;
    }
}
`,
    csharp: `public class Solution {
    public int Search(int[] nums, int target) {
        // TODO: implement binary search
        return -1;
    }
}`,
    c: `#include <stdlib.h>

int search(int* nums, int numsSize, int target) {
    // TODO: implement binary search
    return -1;
}
`,
    cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        // TODO: implement binary search
        return -1;
    }
};`,
  },
  solutions: {
    python: `def search(nums: list[int], target: int) -> int:
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
`,
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
`,
    typescript: `function search(nums: number[], target: number): number {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
    java: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
}
`,
    csharp: `public class Solution {
    public int Search(int[] nums, int target) {
        int left = 0, right = nums.Length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
}`,
    c: `#include <stdlib.h>

int search(int* nums, int numsSize, int target) {
    int left = 0, right = numsSize - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
`,
    cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0, right = (int)nums.size() - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
};`,
  },
  editorial: `## Approach: Classic Binary Search

### Intuition
Because the array is sorted, we can repeatedly halve the search space. We maintain two boundary pointers \`left\` and \`right\`. At each step we look at the middle element:
- If it equals \`target\`, we return its index.
- If it is smaller than \`target\`, the target can only lie in the **right** half, so we move \`left\` up.
- If it is larger than \`target\`, the target can only lie in the **left** half, so we move \`right\` down.

If the loop ends without finding the target, it doesn't exist → return \`-1\`.

### Complexity
- **Time:** O(log n) — we halve the search space each iteration.
- **Space:** O(1) — only a constant number of variables are used.

### Key detail
Compute the midpoint as \`left + (right - left) / 2\` instead of \`(left + right) / 2\` to avoid integer overflow in languages like Java and C when indices are large.`,
};

export default problem;
