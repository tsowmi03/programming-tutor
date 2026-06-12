import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "reverse-an-array-in-place-with-two-pointers",
  title: "Reverse Array In Place",
  difficulty: "easy",
  category: "two-pointers",
  order: 1060,
  description: `Given an integer array \`nums\`, reverse the array **in place** using two pointers and return the reversed array.

Your solution must use the two-pointer technique: place one pointer at the start and one at the end, swap the pointed-to elements, then move both pointers inward until they meet.

**Example 1:**
\`\`\`text
Input:  nums = [1, 2, 3, 4, 5]
Output: [5, 4, 3, 2, 1]
Explanation:
  Swap index 0 and 4 → [5, 2, 3, 4, 1]
  Swap index 1 and 3 → [5, 4, 3, 2, 1]
  Pointers meet at index 2 — done.
\`\`\`

**Example 2:**
\`\`\`text
Input:  nums = [1, 2]
Output: [2, 1]
Explanation: Swap index 0 and 1 → [2, 1]. Pointers cross — done.
\`\`\`

**Example 3:**
\`\`\`text
Input:  nums = [7]
Output: [7]
Explanation: Single element; nothing to swap.
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 1000\`
- \`-10^4 <= nums[i] <= 10^4\``,
  hints: [
    `Place one pointer (\`left\`) at index 0 and another (\`right\`) at the last index.`,
    `While \`left < right\`, swap \`nums[left]\` with \`nums[right]\`, then increment \`left\` and decrement \`right\`.`,
    `Stop as soon as the pointers meet or cross — every element has been visited exactly once.`,
  ],
  signature: {
    "name": "reverseArray",
    "params": [
      {
        "name": "nums",
        "type": "int[]"
      }
    ],
    "returns": "int[]",
    "ordered": true
  },
  testCases: [
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
      "expected": [
        5,
        4,
        3,
        2,
        1
      ],
      "hidden": false
    },
    {
      "input": [
        [
          1,
          2
        ]
      ],
      "expected": [
        2,
        1
      ],
      "hidden": false
    },
    {
      "input": [
        [
          7
        ]
      ],
      "expected": [
        7
      ],
      "hidden": false
    },
    {
      "input": [
        []
      ],
      "expected": [],
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          3,
          4
        ]
      ],
      "expected": [
        4,
        3,
        2,
        1
      ],
      "hidden": true
    },
    {
      "input": [
        [
          -1,
          -2,
          -3
        ]
      ],
      "expected": [
        -3,
        -2,
        -1
      ],
      "hidden": true
    },
    {
      "input": [
        [
          5,
          5,
          5
        ]
      ],
      "expected": [
        5,
        5,
        5
      ],
      "hidden": true
    },
    {
      "input": [
        [
          100,
          -100,
          0
        ]
      ],
      "expected": [
        0,
        -100,
        100
      ],
      "hidden": true
    },
    {
      "input": [
        [
          3,
          1,
          4,
          1,
          5,
          9,
          2,
          6
        ]
      ],
      "expected": [
        6,
        2,
        9,
        5,
        1,
        4,
        1,
        3
      ],
      "hidden": true
    }
  ],
  starterCode: {
    python: `def reverse_array(nums):
    # TODO: use two pointers to reverse nums in place
    return []
`,
    javascript: `function reverseArray(nums) {
    // TODO: use two pointers to reverse nums in place
    return [];
}
`,
    typescript: `function reverseArray(nums: number[]): number[] {
    // TODO: use two pointers to reverse nums in place
    return [];
}`,
    java: `class Solution {
    public int[] reverseArray(int[] nums) {
        // TODO: use two pointers to reverse nums in place
        return new int[]{};
    }
}
`,
    csharp: `public class Solution {
    public int[] ReverseArray(int[] nums) {
        // TODO: use two pointers to reverse nums in place
        return new int[]{};
    }
}`,
    c: `int* reverseArray(int* nums, int numsSize, int* returnSize) {
    // TODO: use two pointers to reverse nums in place
    *returnSize = 0;
    return NULL;
}
`,
    cpp: `class Solution {
public:
    vector<int> reverseArray(vector<int>& nums) {
        // TODO: use two pointers to reverse nums in place
        return {};
    }
};`,
  },
  solutions: {
    python: `def reverse_array(nums):
    left, right = 0, len(nums) - 1
    while left < right:
        nums[left], nums[right] = nums[right], nums[left]
        left += 1
        right -= 1
    return nums
`,
    javascript: `function reverseArray(nums) {
    let left = 0, right = nums.length - 1;
    while (left < right) {
        const tmp = nums[left];
        nums[left] = nums[right];
        nums[right] = tmp;
        left++;
        right--;
    }
    return nums;
}
`,
    typescript: `function reverseArray(nums: number[]): number[] {
    let left = 0, right = nums.length - 1;
    while (left < right) {
        const tmp = nums[left];
        nums[left] = nums[right];
        nums[right] = tmp;
        left++;
        right--;
    }
    return nums;
}`,
    java: `class Solution {
    public int[] reverseArray(int[] nums) {
        int left = 0, right = nums.length - 1;
        while (left < right) {
            int tmp = nums[left];
            nums[left] = nums[right];
            nums[right] = tmp;
            left++;
            right--;
        }
        return nums;
    }
}
`,
    csharp: `public class Solution {
    public int[] ReverseArray(int[] nums) {
        int left = 0, right = nums.Length - 1;
        while (left < right) {
            int tmp = nums[left];
            nums[left] = nums[right];
            nums[right] = tmp;
            left++;
            right--;
        }
        return nums;
    }
}`,
    c: `#include <stdlib.h>
int* reverseArray(int* nums, int numsSize, int* returnSize) {
    *returnSize = numsSize;
    if (numsSize == 0) return NULL;
    int* result = (int*)malloc(numsSize * sizeof(int));
    for (int i = 0; i < numsSize; i++) result[i] = nums[i];
    int left = 0, right = numsSize - 1;
    while (left < right) {
        int tmp = result[left];
        result[left] = result[right];
        result[right] = tmp;
        left++;
        right--;
    }
    return result;
}
`,
    cpp: `class Solution {
public:
    vector<int> reverseArray(vector<int>& nums) {
        int left = 0, right = (int)nums.size() - 1;
        while (left < right) {
            int tmp = nums[left];
            nums[left] = nums[right];
            nums[right] = tmp;
            left++;
            right--;
        }
        return nums;
    }
};`,
  },
  editorial: `## Approach: Two Pointers

We maintain two indices — \`left\` starting at \`0\` and \`right\` starting at \`n - 1\`. On each iteration we swap the elements at these positions and move the pointers toward each other.

\`\`\`
left → [1, 2, 3, 4, 5] ← right
         swap(1, 5)
        [5, 2, 3, 4, 1]
            ↑       ↑
         swap(2, 4)
        [5, 4, 3, 2, 1]
               ↑
           left == right → stop
\`\`\`

Every pair of symmetric elements is visited exactly once, so each element is touched at most once.

### Complexity

| | |
|---|---|
| **Time** | O(n) — one pass over half the array |
| **Space** | O(1) — swaps happen in place (extra O(n) copy only in the C solution to satisfy the return-by-pointer convention) |

### Key insight

The loop invariant is: after \`k\` iterations, the first \`k\` and last \`k\` elements are in their final reversed positions. The loop terminates after ⌊n/2⌋ iterations, correctly handling both odd-length arrays (middle element stays put) and even-length arrays.`,
};

export default problem;
