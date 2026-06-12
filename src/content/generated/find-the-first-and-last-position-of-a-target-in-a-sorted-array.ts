import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "find-the-first-and-last-position-of-a-target-in-a-sorted-array",
  title: "First and Last Position of Target in Sorted Array",
  difficulty: "medium",
  category: "binary-search",
  order: 1089,
  description: `Given a sorted integer array \`nums\` and an integer \`target\`, return the **first** and **last** index (0-based) at which \`target\` appears in \`nums\`. If \`target\` is not found, return \`[-1, -1]\`.

You must implement an algorithm with **O(log n)** runtime complexity.

\`\`\`text
Example 1:
Input:  nums = [5, 7, 7, 8, 8, 10], target = 8
Output: [3, 4]
Explanation: 8 first appears at index 3 and last appears at index 4.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [5, 7, 7, 8, 8, 10], target = 6
Output: [-1, -1]
Explanation: 6 is not present in the array.
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [1, 1, 1, 1, 1], target = 1
Output: [0, 4]
Explanation: 1 spans the entire array.
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 10^5\`
- \`-10^9 <= nums[i] <= 10^9\`
- \`nums\` is sorted in non-decreasing order.
- \`-10^9 <= target <= 10^9\``,
  hints: [
    `Can you write a helper that finds the leftmost index where nums[i] == target using binary search?`,
    `Use the same binary search idea, but this time find the rightmost index. Think about how to bias the mid-point search toward the right.`,
    `For the left boundary, when nums[mid] == target, record the position and continue searching left (hi = mid - 1). For the right boundary, continue searching right (lo = mid + 1).`,
  ],
  signature: {
    "name": "searchRange",
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
    "returns": "int[]",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        [
          5,
          7,
          7,
          8,
          8,
          10
        ],
        8
      ],
      "expected": [
        3,
        4
      ],
      "hidden": false
    },
    {
      "input": [
        [
          5,
          7,
          7,
          8,
          8,
          10
        ],
        6
      ],
      "expected": [
        -1,
        -1
      ],
      "hidden": false
    },
    {
      "input": [
        [
          1,
          1,
          1,
          1,
          1
        ],
        1
      ],
      "expected": [
        0,
        4
      ],
      "hidden": false
    },
    {
      "input": [
        [],
        0
      ],
      "expected": [
        -1,
        -1
      ],
      "hidden": true
    },
    {
      "input": [
        [
          1
        ],
        1
      ],
      "expected": [
        0,
        0
      ],
      "hidden": true
    },
    {
      "input": [
        [
          1
        ],
        2
      ],
      "expected": [
        -1,
        -1
      ],
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
      "expected": [
        0,
        0
      ],
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
      "expected": [
        4,
        4
      ],
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
          0,
          2
        ],
        -3
      ],
      "expected": [
        1,
        2
      ],
      "hidden": true
    },
    {
      "input": [
        [
          2,
          2,
          2,
          2
        ],
        2
      ],
      "expected": [
        0,
        3
      ],
      "hidden": true
    }
  ],
  starterCode: {
    python: `def search_range(nums, target):
    # TODO: implement using binary search
    return [-1, -1]
`,
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function searchRange(nums, target) {
    // TODO: implement using binary search
    return [-1, -1];
}
`,
    typescript: `function searchRange(nums: number[], target: number): number[] {
    // TODO: implement using binary search
    return [-1, -1];
}`,
    java: `class Solution {
    public int[] searchRange(int[] nums, int target) {
        // TODO: implement using binary search
        return new int[]{-1, -1};
    }
}
`,
    csharp: `public class Solution {
    public int[] SearchRange(int[] nums, int target) {
        // TODO: implement using binary search
        return new int[]{-1, -1};
    }
}`,
    c: `/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* searchRange(int* nums, int numsSize, int target, int* returnSize) {
    // TODO: implement using binary search
    *returnSize = 2;
    int* result = (int*)malloc(2 * sizeof(int));
    result[0] = -1;
    result[1] = -1;
    return result;
}
`,
    cpp: `class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        // TODO: implement using binary search
        return {-1, -1};
    }
};`,
  },
  solutions: {
    python: `def search_range(nums, target):
    def find_first(nums, target):
        lo, hi, idx = 0, len(nums) - 1, -1
        while lo <= hi:
            mid = (lo + hi) // 2
            if nums[mid] == target:
                idx = mid
                hi = mid - 1
            elif nums[mid] < target:
                lo = mid + 1
            else:
                hi = mid - 1
        return idx

    def find_last(nums, target):
        lo, hi, idx = 0, len(nums) - 1, -1
        while lo <= hi:
            mid = (lo + hi) // 2
            if nums[mid] == target:
                idx = mid
                lo = mid + 1
            elif nums[mid] < target:
                lo = mid + 1
            else:
                hi = mid - 1
        return idx

    return [find_first(nums, target), find_last(nums, target)]
`,
    javascript: `function searchRange(nums, target) {
    function findFirst(nums, target) {
        let lo = 0, hi = nums.length - 1, idx = -1;
        while (lo <= hi) {
            const mid = Math.floor((lo + hi) / 2);
            if (nums[mid] === target) {
                idx = mid;
                hi = mid - 1;
            } else if (nums[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return idx;
    }

    function findLast(nums, target) {
        let lo = 0, hi = nums.length - 1, idx = -1;
        while (lo <= hi) {
            const mid = Math.floor((lo + hi) / 2);
            if (nums[mid] === target) {
                idx = mid;
                lo = mid + 1;
            } else if (nums[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return idx;
    }

    return [findFirst(nums, target), findLast(nums, target)];
}
`,
    typescript: `function searchRange(nums: number[], target: number): number[] {
    function findFirst(nums: number[], target: number): number {
        let lo = 0, hi = nums.length - 1, idx = -1;
        while (lo <= hi) {
            const mid = Math.floor((lo + hi) / 2);
            if (nums[mid] === target) {
                idx = mid;
                hi = mid - 1;
            } else if (nums[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return idx;
    }

    function findLast(nums: number[], target: number): number {
        let lo = 0, hi = nums.length - 1, idx = -1;
        while (lo <= hi) {
            const mid = Math.floor((lo + hi) / 2);
            if (nums[mid] === target) {
                idx = mid;
                lo = mid + 1;
            } else if (nums[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return idx;
    }

    return [findFirst(nums, target), findLast(nums, target)];
}`,
    java: `class Solution {
    public int[] searchRange(int[] nums, int target) {
        return new int[]{findFirst(nums, target), findLast(nums, target)};
    }

    private int findFirst(int[] nums, int target) {
        int lo = 0, hi = nums.length - 1, idx = -1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] == target) {
                idx = mid;
                hi = mid - 1;
            } else if (nums[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return idx;
    }

    private int findLast(int[] nums, int target) {
        int lo = 0, hi = nums.length - 1, idx = -1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] == target) {
                idx = mid;
                lo = mid + 1;
            } else if (nums[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return idx;
    }
}
`,
    csharp: `public class Solution {
    public int[] SearchRange(int[] nums, int target) {
        return new int[]{FindFirst(nums, target), FindLast(nums, target)};
    }

    private int FindFirst(int[] nums, int target) {
        int lo = 0, hi = nums.Length - 1, idx = -1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] == target) {
                idx = mid;
                hi = mid - 1;
            } else if (nums[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return idx;
    }

    private int FindLast(int[] nums, int target) {
        int lo = 0, hi = nums.Length - 1, idx = -1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] == target) {
                idx = mid;
                lo = mid + 1;
            } else if (nums[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return idx;
    }
}`,
    c: `#include <stdlib.h>

static int findFirst(int* nums, int numsSize, int target) {
    int lo = 0, hi = numsSize - 1, idx = -1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] == target) {
            idx = mid;
            hi = mid - 1;
        } else if (nums[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    return idx;
}

static int findLast(int* nums, int numsSize, int target) {
    int lo = 0, hi = numsSize - 1, idx = -1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] == target) {
            idx = mid;
            lo = mid + 1;
        } else if (nums[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    return idx;
}

int* searchRange(int* nums, int numsSize, int target, int* returnSize) {
    *returnSize = 2;
    int* result = (int*)malloc(2 * sizeof(int));
    result[0] = findFirst(nums, numsSize, target);
    result[1] = findLast(nums, numsSize, target);
    return result;
}
`,
    cpp: `class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        return {findFirst(nums, target), findLast(nums, target)};
    }

private:
    int findFirst(vector<int>& nums, int target) {
        int lo = 0, hi = (int)nums.size() - 1, idx = -1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] == target) {
                idx = mid;
                hi = mid - 1;
            } else if (nums[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return idx;
    }

    int findLast(vector<int>& nums, int target) {
        int lo = 0, hi = (int)nums.size() - 1, idx = -1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] == target) {
                idx = mid;
                lo = mid + 1;
            } else if (nums[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return idx;
    }
};`,
  },
  editorial: `## Approach: Two Binary Searches

The key insight is that finding the first and last position of a target are two independent binary search problems. We can solve each with a modified binary search.

### Finding the First (Left) Boundary

Run a standard binary search. When \`nums[mid] == target\`, **don't stop** — record the position and continue searching to the **left** by setting \`hi = mid - 1\`. This ensures we find the leftmost occurrence.

### Finding the Last (Right) Boundary

Similarly, when \`nums[mid] == target\`, record the position but continue searching to the **right** by setting \`lo = mid + 1\`. This finds the rightmost occurrence.

### Pseudocode
\`\`\`
function findFirst(nums, target):
    lo, hi, result = 0, n-1, -1
    while lo <= hi:
        mid = (lo + hi) / 2
        if nums[mid] == target: result = mid; hi = mid - 1
        elif nums[mid] < target: lo = mid + 1
        else: hi = mid - 1
    return result

function findLast(nums, target):
    lo, hi, result = 0, n-1, -1
    while lo <= hi:
        mid = (lo + hi) / 2
        if nums[mid] == target: result = mid; lo = mid + 1
        elif nums[mid] < target: lo = mid + 1
        else: hi = mid - 1
    return result
\`\`\`

### Complexity
- **Time:** O(log n) — two independent binary searches, each O(log n).
- **Space:** O(1) — only a constant number of variables used.

This is optimal since any algorithm must examine at least Ω(log n) elements to locate the target in a sorted array.`,
};

export default problem;
