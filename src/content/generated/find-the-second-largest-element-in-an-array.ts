import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "find-the-second-largest-element-in-an-array",
  title: "Second Largest Element",
  difficulty: "easy",
  category: "foundations",
  order: 1010,
  description: `Given an integer array \`nums\`, return the **second largest** distinct value in the array — that is, the largest value that is **strictly less than** the maximum.

If no such value exists (e.g., the array is empty, has only one element, or all elements are equal), return \`-1\`.

**Examples**

\`\`\`text
Input:  nums = [3, 1, 4, 1, 5, 9, 2, 6]
Output: 6
Explanation: The maximum is 9. The largest value strictly below 9 is 6.
\`\`\`

\`\`\`text
Input:  nums = [5, 5, 5]
Output: -1
Explanation: All values are equal; there is no second distinct largest value.
\`\`\`

\`\`\`text
Input:  nums = [-1, -2, -3]
Output: -2
Explanation: The maximum is -1. The second largest distinct value is -2.
\`\`\`

**Constraints**
- \`0 <= nums.length <= 10^4\`
- \`-10^4 <= nums[i] <= 10^4\``,
  hints: [
    `Can you find the answer in a single pass without sorting? Try tracking two variables: the current maximum and the current best candidate for second place.`,
    `When you encounter a value greater than your current maximum, update both variables. Otherwise, check if it could replace your second-place candidate.`,
    `Be careful with duplicates: a value equal to the maximum should not become the second largest.`,
  ],
  signature: {
    "name": "secondLargest",
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
      "expected": 6,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          2
        ]
      ],
      "expected": 1,
      "hidden": false
    },
    {
      "input": [
        [
          5,
          5,
          5
        ]
      ],
      "expected": -1,
      "hidden": false
    },
    {
      "input": [
        [
          1
        ]
      ],
      "expected": -1,
      "hidden": true
    },
    {
      "input": [
        []
      ],
      "expected": -1,
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
      "expected": -2,
      "hidden": true
    },
    {
      "input": [
        [
          10,
          10,
          9
        ]
      ],
      "expected": 9,
      "hidden": true
    },
    {
      "input": [
        [
          2,
          1
        ]
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          100,
          1,
          100,
          50
        ]
      ],
      "expected": 50,
      "hidden": true
    },
    {
      "input": [
        [
          7,
          7
        ]
      ],
      "expected": -1,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def second_largest(nums):
    # TODO: implement
    return -1
`,
    javascript: `function secondLargest(nums) {
    // TODO: implement
    return -1;
}
`,
    java: `class Solution {
    public int secondLargest(int[] nums) {
        // TODO: implement
        return -1;
    }
}
`,
    c: `int secondLargest(int* nums, int numsSize) {
    /* TODO: implement */
    return -1;
}
`,
  },
  solutions: {
    python: `def second_largest(nums):
    if len(nums) < 2:
        return -1
    first = second = float('-inf')
    for n in nums:
        if n > first:
            second = first
            first = n
        elif n < first and n > second:
            second = n
    return second if second != float('-inf') else -1
`,
    javascript: `function secondLargest(nums) {
    if (nums.length < 2) return -1;
    let first = -Infinity, second = -Infinity;
    for (const n of nums) {
        if (n > first) {
            second = first;
            first = n;
        } else if (n < first && n > second) {
            second = n;
        }
    }
    return second === -Infinity ? -1 : second;
}
`,
    java: `class Solution {
    public int secondLargest(int[] nums) {
        if (nums.length < 2) return -1;
        int first = Integer.MIN_VALUE, second = Integer.MIN_VALUE;
        for (int n : nums) {
            if (n > first) {
                second = first;
                first = n;
            } else if (n < first && n > second) {
                second = n;
            }
        }
        return second == Integer.MIN_VALUE ? -1 : second;
    }
}
`,
    c: `#include <limits.h>

int secondLargest(int* nums, int numsSize) {
    if (numsSize < 2) return -1;
    int first = -10001, second = -10001;
    int firstSet = 0, secondSet = 0;
    for (int i = 0; i < numsSize; i++) {
        if (!firstSet || nums[i] > first) {
            second = first;
            secondSet = firstSet;
            first = nums[i];
            firstSet = 1;
        } else if (nums[i] < first && (!secondSet || nums[i] > second)) {
            second = nums[i];
            secondSet = 1;
        }
    }
    return secondSet ? second : -1;
}
`,
  },
  editorial: `## Approach: Single-Pass with Two Trackers

Instead of sorting (O(n log n)), we scan the array once while maintaining two variables:
- \`first\` — the largest value seen so far.
- \`second\` — the largest value seen that is **strictly less than** \`first\`.

### Algorithm
1. If the array has fewer than 2 elements, immediately return \`-1\`.
2. Initialize both \`first\` and \`second\` to negative infinity.
3. For each element \`n\`:
   - If \`n > first\`: the new maximum is found. Demote the old \`first\` to \`second\`, update \`first = n\`.
   - Else if \`n < first\` and \`n > second\`: \`n\` is a better candidate for \`second\`, so update \`second = n\`.
   - Equal-to-\`first\` values are ignored — they do not qualify as a distinct second largest.
4. If \`second\` was never updated from its initial sentinel, no valid second largest exists — return \`-1\`.

### Example Trace — \`[100, 1, 100, 50]\`
| n   | first | second |
|-----|-------|--------|
| 100 | 100   | −∞     |
| 1   | 100   | 1      |
| 100 | 100   | 1      | ← duplicate, skipped |
| 50  | 100   | 50     | ← 50 > 1, update second |

Result: **50** ✓

### Complexity
- **Time:** O(n) — one pass through the array.
- **Space:** O(1) — only two extra variables used.`,
};

export default problem;
