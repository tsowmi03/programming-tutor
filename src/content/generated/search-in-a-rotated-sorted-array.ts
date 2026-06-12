import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "search-in-a-rotated-sorted-array",
  title: "Search in a Rotated Sorted Array",
  difficulty: "medium",
  category: "binary-search",
  order: 1090,
  description: `You are given an integer array \`nums\` sorted in ascending order, which has been **rotated** at some unknown pivot index \`k\` (0 ≤ k < nums.length). For example, \`[0,1,2,4,5,6,7]\` might become \`[4,5,6,7,0,1,2]\`.

Given the array \`nums\` after the rotation and an integer \`target\`, return the **index** of \`target\` if it is in \`nums\`, or \`-1\` if it is not.

You must write an algorithm with **O(log n)** runtime complexity.

**All values in \`nums\` are unique.**

\`\`\`text
Example 1:
Input:  nums = [4,5,6,7,0,1,2], target = 0
Output: 4
Explanation: 0 is at index 4.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [4,5,6,7,0,1,2], target = 3
Output: -1
Explanation: 3 is not present in the array.
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [1], target = 0
Output: -1
\`\`\`

**Constraints:**
- 1 ≤ nums.length ≤ 5000
- -10^4 ≤ nums[i] ≤ 10^4
- All values in \`nums\` are unique.
- \`nums\` is an ascending array rotated at some pivot.
- -10^4 ≤ target ≤ 10^4`,
  hints: [
    `Even after rotation, one half of the array (left or right of mid) is always sorted. Can you determine which half is sorted by comparing nums[mid] with nums[left]?`,
    `Once you know which half is sorted, check whether the target falls within that sorted half's range. If yes, search that half; otherwise search the other half.`,
    `Handle the edge cases: when left == mid (single element on the left side) and when the array has not been rotated at all.`,
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
          4,
          5,
          6,
          7,
          0,
          1,
          2
        ],
        0
      ],
      "expected": 4,
      "hidden": false
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
        ],
        3
      ],
      "expected": -1,
      "hidden": false
    },
    {
      "input": [
        [
          1
        ],
        0
      ],
      "expected": -1,
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
          3,
          1
        ],
        1
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          5,
          6,
          7,
          8,
          1,
          2,
          3
        ],
        8
      ],
      "expected": 3,
      "hidden": true
    },
    {
      "input": [
        [
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          1
        ],
        1
      ],
      "expected": 7,
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
          7
        ],
        4
      ],
      "expected": 3,
      "hidden": true
    },
    {
      "input": [
        [
          -4,
          -3,
          -2,
          -1,
          -9999
        ],
        -9999
      ],
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        [
          6,
          7,
          8,
          9,
          10,
          1,
          2,
          3,
          4,
          5
        ],
        7
      ],
      "expected": 1,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def search(nums: list[int], target: int) -> int:
    # TODO: implement binary search on rotated sorted array
    return -1
`,
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {
    // TODO: implement binary search on rotated sorted array
    return -1;
}
`,
    typescript: `function search(nums: number[], target: number): number {
    // TODO: implement binary search on rotated sorted array
    return -1;
}`,
    java: `class Solution {
    public int search(int[] nums, int target) {
        // TODO: implement binary search on rotated sorted array
        return -1;
    }
}
`,
    csharp: `public class Solution {
    public int Search(int[] nums, int target) {
        // TODO: implement binary search on rotated sorted array
        return -1;
    }
}`,
    c: `int search(int* nums, int numsSize, int target) {
    // TODO: implement binary search on rotated sorted array
    return -1;
}
`,
    cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        // TODO: implement binary search on rotated sorted array
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
        # Left half is sorted
        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:
            # Right half is sorted
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    return -1
`,
    javascript: `function search(nums, target) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) return mid;
        // Left half is sorted
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            // Right half is sorted
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
}
`,
    typescript: `function search(nums: number[], target: number): number {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) return mid;
        // Left half is sorted
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            // Right half is sorted
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
}`,
    java: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            // Left half is sorted
            if (nums[left] <= nums[mid]) {
                if (nums[left] <= target && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                // Right half is sorted
                if (nums[mid] < target && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
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
            // Left half is sorted
            if (nums[left] <= nums[mid]) {
                if (nums[left] <= target && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                // Right half is sorted
                if (nums[mid] < target && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        return -1;
    }
}`,
    c: `int search(int* nums, int numsSize, int target) {
    int left = 0, right = numsSize - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        /* Left half is sorted */
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            /* Right half is sorted */
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
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
            // Left half is sorted
            if (nums[left] <= nums[mid]) {
                if (nums[left] <= target && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                // Right half is sorted
                if (nums[mid] < target && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        return -1;
    }
};`,
  },
  editorial: `## Approach: Modified Binary Search

### Key Insight

Even though the array is rotated, **one of the two halves around \`mid\` is always fully sorted**. We can exploit this to decide which half to discard.

### Algorithm

1. Maintain \`left\` and \`right\` pointers.
2. Compute \`mid = left + (right - left) / 2\`.
3. If \`nums[mid] == target\`, return \`mid\`.
4. **Determine the sorted half:**
   - If \`nums[left] <= nums[mid]\`, the left half \`[left, mid]\` is sorted.
     - If \`target\` is in \`[nums[left], nums[mid])\`, search left: \`right = mid - 1\`.
     - Otherwise search right: \`left = mid + 1\`.
   - Else, the right half \`[mid, right]\` is sorted.
     - If \`target\` is in \`(nums[mid], nums[right]]\`, search right: \`left = mid + 1\`.
     - Otherwise search left: \`right = mid - 1\`.
5. If the loop ends without finding \`target\`, return \`-1\`.

### Complexity

- **Time:** O(log n) — we halve the search space each iteration.
- **Space:** O(1) — only a constant number of variables used.

### Example Walkthrough

\`\`\`
nums = [4,5,6,7,0,1,2], target = 0
left=0, right=6, mid=3  → nums[3]=7 ≠ 0
  nums[0]=4 <= nums[3]=7 → left half sorted [4,5,6,7]
  target 0 not in [4,7) → left = 4
left=4, right=6, mid=5  → nums[5]=1 ≠ 0
  nums[4]=0 > nums[5]=1 → right half sorted [1,2]
  target 0 not in (1,2] → right = 4
left=4, right=4, mid=4  → nums[4]=0 == 0 → return 4
\`\`\``,
};

export default problem;
