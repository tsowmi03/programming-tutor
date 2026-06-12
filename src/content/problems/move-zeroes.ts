import type { CodeProblemDef } from "../types";

export const moveZeroes: CodeProblemDef = {
  type: "code",
  slug: "move-zeroes",
  title: "Move Zeroes",
  difficulty: "easy",
  category: "two-pointers",
  order: 2,
  description: `Given an integer array \`nums\`, move all \`0\`s to the end while keeping the **relative order of the non-zero elements**. Do this **in place**, then return the array.

**Example 1**

\`\`\`text
Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]
\`\`\`

**Example 2**

\`\`\`text
Input: nums = [0]
Output: [0]
\`\`\`

**Constraints**

- \`1 <= nums.length <= 10000\`
- \`-1000000 <= nums[i] <= 1000000\`

**Follow-up:** can you do it in a single pass, minimising the number of writes?
`,
  hints: [
    `Creating a new array of non-zeroes then padding with zeroes works, but the point of the exercise is to rearrange in place.`,
    `Use a slow/fast pointer pair: \`write\` marks where the next non-zero value belongs; \`read\` scans every element.`,
    `Whenever \`nums[read]\` is non-zero, swap it into position \`write\` and advance \`write\`. Everything before \`write\` is non-zero, everything between \`write\` and \`read\` is zero.`,
  ],
  signature: {
    "name": "moveZeroes",
    "params": [
      {
        "name": "nums",
        "type": "int[]"
      }
    ],
    "returns": "int[]"
  },
  testCases: [
    {
      "input": [
        [
          0,
          1,
          0,
          3,
          12
        ]
      ],
      "expected": [
        1,
        3,
        12,
        0,
        0
      ]
    },
    {
      "input": [
        [
          0
        ]
      ],
      "expected": [
        0
      ]
    },
    {
      "input": [
        [
          1,
          2,
          3
        ]
      ],
      "expected": [
        1,
        2,
        3
      ]
    },
    {
      "input": [
        [
          0,
          0,
          1
        ]
      ],
      "expected": [
        1,
        0,
        0
      ],
      "hidden": true
    },
    {
      "input": [
        [
          4,
          0,
          5,
          0,
          0,
          6
        ]
      ],
      "expected": [
        4,
        5,
        6,
        0,
        0,
        0
      ],
      "hidden": true
    },
    {
      "input": [
        [
          0,
          0,
          0
        ]
      ],
      "expected": [
        0,
        0,
        0
      ],
      "hidden": true
    },
    {
      "input": [
        [
          -1,
          0,
          -2,
          0,
          3
        ]
      ],
      "expected": [
        -1,
        -2,
        3,
        0,
        0
      ],
      "hidden": true
    }
  ],
  starterCode: {
    python: `def move_zeroes(nums):
    """Move all zeroes to the end in place, then return nums."""
    # Your code here
    return nums
`,
    javascript: `/**
 * @param {number[]} nums
 * @return {number[]} the same array, zeroes moved to the end
 */
function moveZeroes(nums) {
  // Your code here
  return nums;
}
`,
    typescript: `/**
 * @param {number[]} nums
 * @return {number[]} the same array, zeroes moved to the end
 */
function moveZeroes(nums: number[]): number[] {
  // Your code here
  return nums;
}`,
    java: `class Solution {
    public int[] moveZeroes(int[] nums) {
        // Your code here
        return nums;
    }
}
`,
    csharp: `public class Solution {
    public int[] MoveZeroes(int[] nums) {
        // Your code here
        return nums;
    }
}`,
    c: `/**
 * Rearrange nums in place and return it.
 * Set *returnSize to numsSize.
 */
int* moveZeroes(int* nums, int numsSize, int* returnSize) {
    // Your code here
    *returnSize = numsSize;
    return nums;
}
`,
    cpp: `class Solution {
public:
    vector<int> moveZeroes(vector<int>& nums) {
        // Your code here
        return nums;
    }
};`,
  },
  solutions: {
    python: `def move_zeroes(nums):
    write = 0
    for read in range(len(nums)):
        if nums[read] != 0:
            nums[write], nums[read] = nums[read], nums[write]
            write += 1
    return nums
`,
    javascript: `function moveZeroes(nums) {
  let write = 0;
  for (let read = 0; read < nums.length; read++) {
    if (nums[read] !== 0) {
      [nums[write], nums[read]] = [nums[read], nums[write]];
      write++;
    }
  }
  return nums;
}
`,
    typescript: `function moveZeroes(nums: number[]): number[] {
  let write = 0;
  for (let read = 0; read < nums.length; read++) {
    if (nums[read] !== 0) {
      [nums[write], nums[read]] = [nums[read], nums[write]];
      write++;
    }
  }
  return nums;
}`,
    java: `class Solution {
    public int[] moveZeroes(int[] nums) {
        int write = 0;
        for (int read = 0; read < nums.length; read++) {
            if (nums[read] != 0) {
                int tmp = nums[write];
                nums[write] = nums[read];
                nums[read] = tmp;
                write++;
            }
        }
        return nums;
    }
}
`,
    csharp: `public class Solution {
    public int[] MoveZeroes(int[] nums) {
        int write = 0;
        for (int read = 0; read < nums.Length; read++) {
            if (nums[read] != 0) {
                int tmp = nums[write];
                nums[write] = nums[read];
                nums[read] = tmp;
                write++;
            }
        }
        return nums;
    }
}`,
    c: `int* moveZeroes(int* nums, int numsSize, int* returnSize) {
    int write = 0;
    for (int read = 0; read < numsSize; read++) {
        if (nums[read] != 0) {
            int tmp = nums[write];
            nums[write] = nums[read];
            nums[read] = tmp;
            write++;
        }
    }
    *returnSize = numsSize;
    return nums;
}
`,
    cpp: `class Solution {
public:
    vector<int> moveZeroes(vector<int>& nums) {
        int write = 0;
        for (int read = 0; read < (int)nums.size(); read++) {
            if (nums[read] != 0) {
                int tmp = nums[write];
                nums[write] = nums[read];
                nums[read] = tmp;
                write++;
            }
        }
        return nums;
    }
};`,
  },
  editorial: `## Approach: slow/fast pointers (partition in place)

This is the classic **two-speed pointer** pattern:

- \`read\` visits every element once.
- \`write\` marks the boundary of the "non-zero prefix" built so far.

Whenever \`read\` finds a non-zero value, swap it down to \`write\` and
advance \`write\`. The invariant after each step:

- \`nums[0 .. write-1]\` — all the non-zero values seen so far, in order.
- \`nums[write .. read]\` — zeroes.

Because non-zero elements are only ever moved left, past zeroes, their
relative order is preserved — and the loop is a single pass.

**Complexity:** O(n) time, O(1) space.

The same partition idea powers quicksort's partitioning step and problems
like "remove element" or "sort colors" — it's well worth internalising.
`,
};
