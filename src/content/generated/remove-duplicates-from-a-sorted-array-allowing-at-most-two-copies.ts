import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "remove-duplicates-from-a-sorted-array-allowing-at-most-two-copies",
  title: "Remove Duplicates Keeping At Most Two Copies",
  difficulty: "medium",
  category: "two-pointers",
  order: 1017,
  description: `Given a **sorted** integer array \`nums\`, remove duplicates **in-place** so that each unique element appears **at most twice**. Return the number of elements \`k\` that remain after removal.

The first \`k\` elements of \`nums\` must hold the result in their original relative order. The elements beyond index \`k - 1\` do not matter.

> **In-place means:** use O(1) extra space. You may modify \`nums\` directly.

\`\`\`text
Example 1:
Input:  nums = [1, 1, 1, 2, 2, 3]
Output: 5
Explanation: The first 5 elements become [1, 1, 2, 2, 3].
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [0, 0, 1, 1, 1, 1, 2, 3, 3]
Output: 7
Explanation: The first 7 elements become [0, 0, 1, 1, 2, 3, 3].
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [1, 1, 1, 1, 1]
Output: 2
Explanation: The first 2 elements become [1, 1].
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 30 000\`
- \`-10^4 <= nums[i] <= 10^4\`
- \`nums\` is sorted in non-decreasing order.

**Note:** The judge validates your answer by checking the returned value \`k\` and verifying that the first \`k\` elements of the modified array match the expected result. For this problem the test cases encode the **returned integer \`k\`** as the expected value.`,
  hints: [
    `Use a write pointer that tracks where the next valid element should be placed. An element at index \`i\` is valid if it differs from the element two positions behind the write pointer.`,
    `Since the array is sorted, checking \`nums[i] != nums[write - 2]\` is sufficient to allow at most two copies of any value.`,
    `Start the write pointer at 2 (the first two elements are always kept as-is), then iterate from index 2 onward.`,
  ],
  guidance: [
    {
      "title": "Identify the invariant",
      "body": "Think about what condition makes an element 'safe' to keep. In a sorted array where you're building a result array with at most two of each value, a new element is safe to append whenever it is **different from the second-to-last element already written**.",
      "level": "nudge"
    },
    {
      "title": "Two-pointer setup",
      "body": "Maintain a **write pointer** `k` (the length of the valid prefix so far) and a **read pointer** `i` that scans the whole array.\n\n- Initialize `k = 2` (the first two elements always belong in the result).\n- For each `i` from `2` to `n-1`: if `nums[i] != nums[k-2]`, write `nums[k] = nums[i]` and increment `k`.\n- Return `k`.",
      "level": "strategy"
    },
    {
      "title": "Edge cases to watch",
      "body": "- Arrays of length 1 or 2: return the length immediately (or let `k` start at `min(2, n)` and skip the loop).\n- All elements identical: only 2 should remain, so `k` should end at 2.\n- No duplicates at all: every element passes the check, so `k` equals `n`.",
      "level": "pitfall"
    },
    {
      "title": "Implementation shape",
      "body": "```\nfunction removeDuplicatesKeepTwo(nums):\n    n = length(nums)\n    if n <= 2: return n\n    k = 2\n    for i from 2 to n-1:\n        if nums[i] != nums[k - 2]:\n            nums[k] = nums[i]\n            k += 1\n    return k\n```",
      "level": "pseudocode"
    }
  ],

  signature: {
    "name": "removeDuplicatesKeepTwo",
    "params": [
      {
        "name": "nums",
        "type": "int[]"
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
          1,
          1,
          2,
          2,
          3
        ]
      ],
      "expected": 5,
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
          1,
          2,
          3,
          3
        ]
      ],
      "expected": 7,
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
        ]
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        [
          1
        ]
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2
        ]
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          1
        ]
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        [
          -3,
          -3,
          -3,
          -1,
          0,
          0,
          0,
          2,
          2,
          2,
          5
        ]
      ],
      "expected": 8,
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
          -10000,
          -10000,
          -10000,
          10000,
          10000,
          10000
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
          2,
          3,
          3,
          4,
          4
        ]
      ],
      "expected": 8,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def remove_duplicates_keep_two(nums: list[int]) -> int:
    # TODO: implement in-place removal keeping at most two copies
    pass
`,
    javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function removeDuplicatesKeepTwo(nums) {
    // TODO: implement in-place removal keeping at most two copies
}
`,
    typescript: `function removeDuplicatesKeepTwo(nums: number[]): number {
    // TODO: implement in-place removal keeping at most two copies
    return 0;
}
`,
    java: `class Solution {
    public int removeDuplicatesKeepTwo(int[] nums) {
        // TODO: implement in-place removal keeping at most two copies
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int RemoveDuplicatesKeepTwo(int[] nums) {
        // TODO: implement in-place removal keeping at most two copies
        return 0;
    }
}
`,
    c: `#include <stdlib.h>
int removeDuplicatesKeepTwo(int* nums, int numsSize) {
    // TODO: implement in-place removal keeping at most two copies
    return 0;
}
`,
    cpp: `class Solution {
public:
    int removeDuplicatesKeepTwo(vector<int>& nums) {
        // TODO: implement in-place removal keeping at most two copies
        return 0;
    }
};
`,
  },
  solutions: {
    python: `def remove_duplicates_keep_two(nums: list[int]) -> int:
    n = len(nums)
    if n <= 2:
        return n
    k = 2
    for i in range(2, n):
        if nums[i] != nums[k - 2]:
            nums[k] = nums[i]
            k += 1
    return k
`,
    javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function removeDuplicatesKeepTwo(nums) {
    const n = nums.length;
    if (n <= 2) return n;
    let k = 2;
    for (let i = 2; i < n; i++) {
        if (nums[i] !== nums[k - 2]) {
            nums[k] = nums[i];
            k++;
        }
    }
    return k;
}
`,
    typescript: `function removeDuplicatesKeepTwo(nums: number[]): number {
    const n = nums.length;
    if (n <= 2) return n;
    let k = 2;
    for (let i = 2; i < n; i++) {
        if (nums[i] !== nums[k - 2]) {
            nums[k] = nums[i];
            k++;
        }
    }
    return k;
}
`,
    java: `class Solution {
    public int removeDuplicatesKeepTwo(int[] nums) {
        int n = nums.length;
        if (n <= 2) return n;
        int k = 2;
        for (int i = 2; i < n; i++) {
            if (nums[i] != nums[k - 2]) {
                nums[k] = nums[i];
                k++;
            }
        }
        return k;
    }
}
`,
    csharp: `public class Solution {
    public int RemoveDuplicatesKeepTwo(int[] nums) {
        int n = nums.Length;
        if (n <= 2) return n;
        int k = 2;
        for (int i = 2; i < n; i++) {
            if (nums[i] != nums[k - 2]) {
                nums[k] = nums[i];
                k++;
            }
        }
        return k;
    }
}
`,
    c: `#include <stdlib.h>
int removeDuplicatesKeepTwo(int* nums, int numsSize) {
    if (numsSize <= 2) return numsSize;
    int k = 2;
    for (int i = 2; i < numsSize; i++) {
        if (nums[i] != nums[k - 2]) {
            nums[k] = nums[i];
            k++;
        }
    }
    return k;
}
`,
    cpp: `class Solution {
public:
    int removeDuplicatesKeepTwo(vector<int>& nums) {
        int n = (int)nums.size();
        if (n <= 2) return n;
        int k = 2;
        for (int i = 2; i < n; i++) {
            if (nums[i] != nums[k - 2]) {
                nums[k] = nums[i];
                k++;
            }
        }
        return k;
    }
};
`,
  },
  editorial: `## Approach: Two Pointers

### Intuition

We maintain a **write pointer** \`k\` that tracks the length of the valid result prefix. For each element \`nums[i]\` read by the scan pointer, we ask: *should this element be kept?*

Since the array is sorted, duplicates are contiguous. An element is safe to keep if and only if it is **different from \`nums[k-2]\`** — the element two slots behind the write head. If the current element equals \`nums[k-2]\`, it would become a third (or more) consecutive copy, violating the constraint.

### Algorithm

1. If \`n <= 2\`, return \`n\` immediately — no work needed.
2. Initialize \`k = 2\` (the first two positions are always valid).
3. For each \`i\` from \`2\` to \`n-1\`:
   - If \`nums[i] != nums[k-2]\`, copy \`nums[i]\` to \`nums[k]\` and increment \`k\`.
4. Return \`k\`.

### Example Trace

\`\`\`
nums = [1, 1, 1, 2, 2, 3], k starts at 2

i=2: nums[2]=1, nums[k-2]=nums[0]=1 → equal, skip
i=3: nums[3]=2, nums[k-2]=nums[0]=1 → different, nums[2]=2, k=3
i=4: nums[4]=2, nums[k-2]=nums[1]=1 → different, nums[3]=2, k=4
i=5: nums[5]=3, nums[k-2]=nums[2]=2 → different, nums[4]=3, k=5

Result: [1, 1, 2, 2, 3, ...], k=5 ✓
\`\`\`

### Complexity

- **Time:** O(n) — single pass through the array.
- **Space:** O(1) — in-place modification, no extra data structures.

This same pattern generalizes elegantly: to allow at most \`m\` copies, compare \`nums[i]\` with \`nums[k - m]\` instead of \`nums[k - 2]\`.`,
};

export default problem;
