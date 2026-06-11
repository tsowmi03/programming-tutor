import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "check-if-an-array-is-sorted-in-ascending-order",
  title: "Check if Array is Sorted in Ascending Order",
  difficulty: "easy",
  category: "foundations",
  order: 1009,
  description: `Given an integer array \`nums\`, return \`true\` if the array is sorted in **non-decreasing** (ascending) order, or \`false\` otherwise.

An array is in non-decreasing order when every element is less than or equal to the element that follows it.

**Examples:**

\`\`\`text
Input:  nums = [1, 2, 3, 4, 5]
Output: true
Explanation: 1 ≤ 2 ≤ 3 ≤ 4 ≤ 5 — fully non-decreasing.
\`\`\`

\`\`\`text
Input:  nums = [5, 3, 1]
Output: false
Explanation: 5 > 3, which violates non-decreasing order.
\`\`\`

\`\`\`text
Input:  nums = [1, 1, 2, 3]
Output: true
Explanation: Equal consecutive elements are allowed: 1 ≤ 1 ≤ 2 ≤ 3.
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 10^4\`
- \`-10^5 <= nums[i] <= 10^5\``,
  hints: [
    `Try looking at each pair of adjacent elements. What condition would tell you the array is *not* sorted?`,
    `If \`nums[i] < nums[i-1]\` for any index \`i\`, the array is not sorted. Stop and return false immediately.`,
    `Think about the base cases: what should you return for an empty array or one with a single element?`,
  ],
  signature: {
    "name": "isSortedAscending",
    "params": [
      {
        "name": "nums",
        "type": "int[]"
      }
    ],
    "returns": "bool"
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
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        [
          5,
          3,
          1
        ]
      ],
      "expected": false,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          1,
          2,
          3
        ]
      ],
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        []
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          7
        ]
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          2,
          2,
          2
        ]
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          3,
          2
        ]
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        [
          -3,
          -1,
          0,
          5
        ]
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          3,
          3,
          3,
          2
        ]
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          1,
          2
        ]
      ],
      "expected": false,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def is_sorted_ascending(nums):
    # TODO: implement
    return False
`,
    javascript: `function isSortedAscending(nums) {
    // TODO: implement
    return false;
}
`,
    java: `class Solution {
    public boolean isSortedAscending(int[] nums) {
        // TODO: implement
        return false;
    }
}
`,
    c: `#include <stdbool.h>
bool isSortedAscending(int* nums, int numsSize) {
    // TODO: implement
    return false;
}
`,
  },
  solutions: {
    python: `def is_sorted_ascending(nums):
    for i in range(1, len(nums)):
        if nums[i] < nums[i - 1]:
            return False
    return True
`,
    javascript: `function isSortedAscending(nums) {
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] < nums[i - 1]) return false;
    }
    return true;
}
`,
    java: `class Solution {
    public boolean isSortedAscending(int[] nums) {
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] < nums[i - 1]) return false;
        }
        return true;
    }
}
`,
    c: `#include <stdbool.h>
bool isSortedAscending(int* nums, int numsSize) {
    for (int i = 1; i < numsSize; i++) {
        if (nums[i] < nums[i - 1]) return false;
    }
    return true;
}
`,
  },
  editorial: `## Approach: Single Linear Scan

### Intuition
An array is in non-decreasing order when no element is *greater* than the element that follows it. We only need to find one violation to know the answer is \`false\`.

### Algorithm
1. Iterate from index \`1\` to \`n-1\`.
2. At each position \`i\`, compare \`nums[i]\` with \`nums[i-1]\`.
3. If \`nums[i] < nums[i-1]\`, the order is broken — return \`false\`.
4. If the loop completes without finding a violation, return \`true\`.

**Edge cases:** An empty array or a single-element array has no pairs to compare, so the loop body never executes and we correctly return \`true\`.

### Complexity
- **Time:** O(n) — we visit each element at most once.
- **Space:** O(1) — no extra storage needed.

\`\`\`python
for i in range(1, len(nums)):
    if nums[i] < nums[i - 1]:   # violation found
        return False
return True                      # no violation
\`\`\``,
};

export default problem;
