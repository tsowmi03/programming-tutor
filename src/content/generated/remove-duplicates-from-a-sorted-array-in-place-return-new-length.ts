import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "remove-duplicates-from-a-sorted-array-in-place-return-new-length",
  title: "Remove Duplicates from Sorted Array",
  difficulty: "medium",
  category: "two-pointers",
  order: 1068,
  description: `Given an integer array \`nums\` sorted in **non-decreasing** order, remove the duplicates **in-place** so that each unique element appears exactly once. The relative order of the elements must be preserved.

Place the result in the **first part** of the array: if there are \`k\` unique elements after deduplication, the first \`k\` positions of \`nums\` must hold those values in order. Return \`k\`.

**Example 1:**
\`\`\`text
Input:  nums = [1, 1, 2]
Output: 2
Explanation: Two unique elements — 1 and 2.
             nums becomes [1, 2, ...] (rest doesn't matter).
\`\`\`

**Example 2:**
\`\`\`text
Input:  nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
Output: 5
Explanation: Five unique elements — 0, 1, 2, 3, 4.
             nums becomes [0, 1, 2, 3, 4, ...]
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 30000\`
- \`-100 <= nums[i] <= 100\`
- \`nums\` is sorted in non-decreasing order.`,
  hints: [
    `Since the array is sorted, all copies of the same value are adjacent. When does a brand-new unique value begin?`,
    `Use two pointers: a 'read' pointer that scans every element and a 'write' pointer that marks where the next unique element belongs.`,
    `The write pointer only advances when the read pointer finds a value different from the element just written. Compare nums[read] with nums[write - 1].`,
  ],
  signature: {
    "name": "removeDuplicates",
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
          1,
          1,
          2
        ]
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        [
          0,
          0,
          1,
          1,
          1,
          2,
          2,
          3,
          3,
          4
        ]
      ],
      "expected": 5,
      "hidden": false
    },
    {
      "input": [
        [
          1
        ]
      ],
      "expected": 1,
      "hidden": false
    },
    {
      "input": [
        []
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
          5
        ]
      ],
      "expected": 5,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          1,
          1,
          1,
          1
        ]
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          -3,
          -1,
          -1,
          0,
          0,
          2
        ]
      ],
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          1,
          2,
          3,
          3,
          4,
          5,
          5
        ]
      ],
      "expected": 5,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def remove_duplicates(nums):
    # TODO: use two pointers to remove duplicates in-place
    return 0
`,
    javascript: `function removeDuplicates(nums) {
    // TODO: use two pointers to remove duplicates in-place
    return 0;
}
`,
    java: `class Solution {
    public int removeDuplicates(int[] nums) {
        // TODO: use two pointers to remove duplicates in-place
        return 0;
    }
}
`,
    c: `int removeDuplicates(int* nums, int numsSize) {
    // TODO: use two pointers to remove duplicates in-place
    return 0;
}
`,
  },
  solutions: {
    python: `def remove_duplicates(nums):
    if not nums:
        return 0
    k = 1
    for i in range(1, len(nums)):
        if nums[i] != nums[k - 1]:
            nums[k] = nums[i]
            k += 1
    return k
`,
    javascript: `function removeDuplicates(nums) {
    if (nums.length === 0) return 0;
    let k = 1;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== nums[k - 1]) {
            nums[k] = nums[i];
            k++;
        }
    }
    return k;
}
`,
    java: `class Solution {
    public int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;
        int k = 1;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] != nums[k - 1]) {
                nums[k] = nums[i];
                k++;
            }
        }
        return k;
    }
}
`,
    c: `int removeDuplicates(int* nums, int numsSize) {
    if (numsSize == 0) return 0;
    int k = 1;
    for (int i = 1; i < numsSize; i++) {
        if (nums[i] != nums[k - 1]) {
            nums[k] = nums[i];
            k++;
        }
    }
    return k;
}
`,
  },
  editorial: `## Two-Pointer Approach

**Intuition:** Because the array is sorted, every group of duplicate values is contiguous. A *write pointer* \`k\` tracks where the next unique value should be placed, while a *read pointer* \`i\` scans forward looking for new values.

**Algorithm:**
1. If \`nums\` is empty, return \`0\`.
2. Set \`k = 1\` — the element at index 0 is trivially unique.
3. For each \`i\` from \`1\` to \`n − 1\`:
   - If \`nums[i] != nums[k − 1]\`, a new unique element is found: copy it to \`nums[k]\` and increment \`k\`.
4. Return \`k\`.

**Trace** on \`[0, 0, 1, 1, 2]\`:

| i | nums[i] | nums[k-1] | action     | k |
|---|---------|-----------|------------|---|
| 1 | 0       | 0         | skip       | 1 |
| 2 | 1       | 0         | write, k++ | 2 |
| 3 | 1       | 1         | skip       | 2 |
| 4 | 2       | 1         | write, k++ | 3 |

Return \`3\`.

**Complexity:**
- **Time:** O(n) — single linear pass.
- **Space:** O(1) — in-place modification, no extra allocation.`,
};

export default problem;
