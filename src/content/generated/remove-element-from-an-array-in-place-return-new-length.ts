import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "remove-element-from-an-array-in-place-return-new-length",
  title: "Remove Element In-Place",
  difficulty: "easy",
  category: "two-pointers",
  order: 1065,
  description: `Given an integer array \`nums\` and an integer \`val\`, remove all occurrences of \`val\` from \`nums\` **in-place** and return the number of elements that are **not equal to** \`val\`.

The relative order of the remaining elements may change. Values beyond the returned length do not matter.

\`\`\`text
Example 1:
Input:  nums = [3,2,2,3], val = 3
Output: 2
Explanation: Two elements (both 2) remain after removing all 3s.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [0,1,2,2,3,0,4,2], val = 2
Output: 5
Explanation: Five elements remain: [0,1,3,0,4] in some order.
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 100\`
- \`0 <= nums[i] <= 50\`
- \`0 <= val <= 50\``,
  hints: [
    `Think about a 'write' pointer that tracks where the next kept element should be placed.`,
    `Scan the array with a 'read' pointer; whenever nums[read] != val, copy it to the write position and advance the write pointer.`,
    `The final value of the write pointer is exactly the count of non-val elements.`,
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
    "returns": "int"
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
        [],
        3
      ],
      "expected": 0,
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
          4,
          5,
          4,
          4,
          6,
          4
        ],
        4
      ],
      "expected": 2,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def remove_element(nums, val):
    # TODO: use two pointers to remove val in-place
    return 0
`,
    javascript: `function removeElement(nums, val) {
    // TODO: use two pointers to remove val in-place
    return 0;
}
`,
    java: `class Solution {
    public int removeElement(int[] nums, int val) {
        // TODO: use two pointers to remove val in-place
        return 0;
    }
}
`,
    c: `int removeElement(int* nums, int numsSize, int val) {
    // TODO: use two pointers to remove val in-place
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
  editorial: `## Two-Pointer Approach

We use two pointers:
- **Read pointer** \`i\` scans every element from left to right.
- **Write pointer** \`k\` tracks the next position to place a kept element, starting at 0.

For each element:
- If \`nums[i] != val\`, copy it to \`nums[k]\` and increment \`k\`.
- Otherwise, advance \`i\` and leave \`k\` unchanged.

At the end, \`k\` equals the number of elements not equal to \`val\`.

\`\`\`
nums = [0,1,2,2,3,0,4,2], val = 2

i=0: 0≠2 → nums[0]=0, k=1
i=1: 1≠2 → nums[1]=1, k=2
i=2: 2==2 → skip
i=3: 2==2 → skip
i=4: 3≠2 → nums[2]=3, k=3
i=5: 0≠2 → nums[3]=0, k=4
i=6: 4≠2 → nums[4]=4, k=5
i=7: 2==2 → skip
return 5
\`\`\`

**Complexity:**
- Time: O(n) — single pass through the array.
- Space: O(1) — modification is done in-place with no extra storage.`,
};

export default problem;
