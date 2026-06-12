import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "find-the-insert-position-of-a-target-in-a-sorted-array",
  title: "Search Insert Position",
  difficulty: "easy",
  category: "binary-search",
  order: 1085,
  description: `Given a sorted array of distinct integers \`nums\` and a target value \`target\`, return the index where \`target\` is found. If \`target\` is not found, return the index where it **would be inserted** to keep the array sorted.

You must write an algorithm with **O(log n)** runtime complexity.

\`\`\`text
Example 1:
Input:  nums = [1, 3, 5, 6], target = 5
Output: 2
Explanation: 5 is at index 2.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [1, 3, 5, 6], target = 2
Output: 1
Explanation: 2 is not in the array; it would be inserted at index 1 to keep the array sorted.
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [1, 3, 5, 6], target = 7
Output: 4
Explanation: 7 is not in the array; it would be inserted at the end (index 4).
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 10^4\`
- \`-10^4 <= nums[i] <= 10^4\`
- \`nums\` contains **distinct** values sorted in ascending order.
- \`-10^4 <= target <= 10^4\``,
  hints: [
    `Think about the classic binary search loop: maintain a left and right pointer and narrow the search range by half each iteration.`,
    `When the target is not found, where do \`left\` and \`right\` end up relative to where the target should be inserted?`,
    `After the loop exits (left > right), the \`left\` pointer will be exactly the insertion position.`,
  ],
  signature: {
    "name": "searchInsert",
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
          6
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
          6
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
          6
        ],
        7
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
          6
        ],
        0
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
        0
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
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          -10,
          -3,
          0,
          5,
          9
        ],
        -3
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          -10,
          -3,
          0,
          5,
          9
        ],
        1
      ],
      "expected": 3,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          3,
          5,
          6
        ],
        6
      ],
      "expected": 3,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def search_insert(nums: list[int], target: int) -> int:
    # TODO: implement binary search to find insert position
    return 0
`,
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function searchInsert(nums, target) {
    // TODO: implement binary search to find insert position
    return 0;
}
`,
    typescript: `function searchInsert(nums: number[], target: number): number {
    // TODO: implement binary search to find insert position
    return 0;
}`,
    java: `class Solution {
    public int searchInsert(int[] nums, int target) {
        // TODO: implement binary search to find insert position
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int SearchInsert(int[] nums, int target) {
        // TODO: implement binary search to find insert position
        return 0;
    }
}`,
    c: `int searchInsert(int* nums, int numsSize, int target) {
    // TODO: implement binary search to find insert position
    return 0;
}
`,
    cpp: `class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        // TODO: implement binary search to find insert position
        return 0;
    }
};`,
  },
  solutions: {
    python: `def search_insert(nums: list[int], target: int) -> int:
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return left
`,
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function searchInsert(nums, target) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return left;
}
`,
    typescript: `function searchInsert(nums: number[], target: number): number {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return left;
}`,
    java: `class Solution {
    public int searchInsert(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return left;
    }
}
`,
    csharp: `public class Solution {
    public int SearchInsert(int[] nums, int target) {
        int left = 0, right = nums.Length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return left;
    }
}`,
    c: `int searchInsert(int* nums, int numsSize, int target) {
    int left = 0, right = numsSize - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return left;
}
`,
    cpp: `class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int left = 0, right = (int)nums.size() - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return left;
    }
};`,
  },
  editorial: `## Approach: Binary Search

### Intuition
Since the array is sorted and contains distinct elements, we can use binary search to locate the target in O(log n) time. If the target is found, we return its index. If not found, the left pointer naturally ends up at the correct insertion position.

### Algorithm
1. Initialize \`left = 0\` and \`right = nums.length - 1\`.
2. While \`left <= right\`:
   - Compute \`mid = left + (right - left) / 2\` (avoids integer overflow).
   - If \`nums[mid] == target\`, return \`mid\`.
   - If \`nums[mid] < target\`, move \`left = mid + 1\` (target is in the right half).
   - Otherwise, move \`right = mid - 1\` (target is in the left half).
3. When the loop ends, \`left > right\`. The variable \`left\` is the first index where \`nums[left] >= target\`, which is exactly where we would insert \`target\`. Return \`left\`.

### Why \`left\` is the answer
At termination, every index \`< left\` has a value strictly less than \`target\`, and every index \`> right\` (i.e., \`>= left\`) has a value strictly greater than \`target\`. So inserting at \`left\` maintains sorted order.

### Complexity
- **Time:** O(log n) — the search range halves each iteration.
- **Space:** O(1) — only a constant number of variables are used.`,
};

export default problem;
