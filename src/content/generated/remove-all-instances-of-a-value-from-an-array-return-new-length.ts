import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "remove-all-instances-of-a-value-from-an-array-return-new-length",
  title: "Remove Element",
  difficulty: "easy",
  category: "foundations",
  order: 1019,
  description: `Given an integer array \`nums\` and an integer \`val\`, remove all occurrences of \`val\` from \`nums\` **in-place**. The relative order of the remaining elements may change.

Return \`k\` — the number of elements in \`nums\` that are **not** equal to \`val\`. The first \`k\` positions of \`nums\` should contain elements not equal to \`val\` after your modification. Elements beyond index \`k\` do not matter.

\`\`\`text
Example 1:
Input:  nums = [3, 2, 2, 3], val = 3
Output: 2
Explanation: After removal, the first 2 elements are [2, 2].
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [0, 1, 2, 2, 3, 0, 4, 2], val = 2
Output: 5
Explanation: After removal, the first 5 elements are [0, 1, 3, 0, 4].
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 100\`
- \`0 <= nums[i] <= 50\`
- \`0 <= val <= 50\``,
  hints: [
    `Try using two pointers: a read pointer that moves through every element, and a write pointer that only advances when a keeper element is found.`,
    `When the element at the read pointer is NOT equal to val, copy it to the position at the write pointer, then advance the write pointer.`,
    `At the end of the loop, the write pointer's value tells you exactly how many elements were kept.`,
  ],
  signature: {
    "name": "removeElement",
    "params": [
      {
        "name": "nums",
        "type": "int[]"
      },
      {
        "name": "val",
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
          3,
          2,
          2,
          3
        ],
        3
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        [
          0,
          1,
          2,
          2,
          3,
          0,
          4,
          2
        ],
        2
      ],
      "expected": 5,
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
      "hidden": false
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
        6
      ],
      "expected": 5,
      "hidden": true
    },
    {
      "input": [
        [
          7,
          7,
          7,
          7
        ],
        7
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          3
        ],
        2
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        [],
        5
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          1,
          2,
          1,
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
          2,
          2,
          2,
          2,
          2
        ],
        2
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          1,
          2,
          1,
          2
        ],
        1
      ],
      "expected": 3,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def remove_element(nums, val):
    # TODO: remove all occurrences of val in-place and return the new length
    return 0
`,
    javascript: `function removeElement(nums, val) {
    // TODO: remove all occurrences of val in-place and return the new length
    return 0;
}
`,
    java: `class Solution {
    public int removeElement(int[] nums, int val) {
        // TODO: remove all occurrences of val in-place and return the new length
        return 0;
    }
}
`,
    c: `int removeElement(int* nums, int numsSize, int val) {
    /* TODO: remove all occurrences of val in-place and return the new length */
    return 0;
}
`,
  },
  solutions: {
    python: `def remove_element(nums, val):
    k = 0
    for i in range(len(nums)):
        if nums[i] != val:
            nums[k] = nums[i]
            k += 1
    return k
`,
    javascript: `function removeElement(nums, val) {
    let k = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== val) {
            nums[k] = nums[i];
            k++;
        }
    }
    return k;
}
`,
    java: `class Solution {
    public int removeElement(int[] nums, int val) {
        int k = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != val) {
                nums[k] = nums[i];
                k++;
            }
        }
        return k;
    }
}
`,
    c: `int removeElement(int* nums, int numsSize, int val) {
    int k = 0;
    for (int i = 0; i < numsSize; i++) {
        if (nums[i] != val) {
            nums[k] = nums[i];
            k++;
        }
    }
    return k;
}
`,
  },
  editorial: `## Two-Pointer (Read/Write) Approach

Maintain two indices into \`nums\`:
- **Write pointer** \`k\` — points to the next slot available for a kept element (starts at \`0\`).
- **Read pointer** \`i\` — iterates over every element in the array.

For each element:
- If \`nums[i] == val\`: skip it (do not advance \`k\`).
- If \`nums[i] != val\`: copy it into \`nums[k]\` and increment \`k\`.

After the loop, the first \`k\` positions of \`nums\` hold all elements that are not equal to \`val\`, and \`k\` is the answer.

\`\`\`
nums = [3, 2, 2, 3], val = 3

i=0: nums[0]=3 == val  → skip,       k=0
i=1: nums[1]=2 != val  → nums[0]=2,  k=1
i=2: nums[2]=2 != val  → nums[1]=2,  k=2
i=3: nums[3]=3 == val  → skip,       k=2

Return 2
\`\`\`

**Complexity:**
- Time: O(n) — single pass through the array.
- Space: O(1) — modification is done in-place with no extra storage.`,
};

export default problem;
