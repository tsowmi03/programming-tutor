import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "find-the-peak-element-index",
  title: "Find Peak Element Index",
  difficulty: "medium",
  category: "binary-search",
  order: 1091,
  description: `A **peak element** is an element that is strictly greater than its neighbors.

Given a **0-indexed** integer array \`nums\`, find and return the index of **any** peak element. You may assume that \`nums[-1]\` and \`nums[n]\` are both negative infinity (i.e., elements at the boundary only need to be greater than their single neighbor).

You **must** write an algorithm that runs in **O(log n)** time.

\`\`\`text
Example 1:
Input:  nums = [1, 2, 3, 1]
Output: 2
Explanation: nums[2] = 3 is a peak because nums[1] = 2 < 3 > 1 = nums[3].
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [1, 2, 1, 3, 5, 6, 4]
Output: 5
Explanation: nums[5] = 6 is a peak because nums[4] = 5 < 6 > 4 = nums[6].
             (Index 1 is also valid: 1 < 2 > 1.)
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [1]
Output: 0
Explanation: The single element is trivially a peak.
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 1000\`
- \`-2^31 <= nums[i] <= 2^31 - 1\`
- \`nums[i] != nums[i + 1]\` for all valid \`i\`.

**Note:** The judge accepts any valid peak index, but for determinism the reference solutions all return the **leftmost** peak index found by the binary-search procedure. The test cases have been chosen so there is only one valid answer.`,
  hints: [
    `Think about what it means when nums[mid] < nums[mid+1]. Which half must contain a peak?`,
    `If you're on an ascending slope (nums[mid] < nums[mid+1]), a peak must exist to the right (including mid+1). Use this to cut the search space in half.`,
    `When lo == hi, you've narrowed down to exactly one element — that element must be a peak.`,
  ],
  signature: {
    "name": "findPeakElement",
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
          2,
          3,
          1
        ]
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          2,
          1,
          3,
          5,
          6,
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
      "expected": 0,
      "hidden": false
    },
    {
      "input": [
        [
          3,
          1
        ]
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          3
        ]
      ],
      "expected": 1,
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
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        [
          5,
          4,
          3,
          2,
          1
        ]
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          3,
          2,
          4,
          1
        ]
      ],
      "expected": 3,
      "hidden": true
    },
    {
      "input": [
        [
          -3,
          -2,
          -1,
          -4
        ]
      ],
      "expected": 2,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def find_peak_element(nums):
    # TODO: implement binary search for a peak element
    return 0
`,
    javascript: `function findPeakElement(nums) {
    // TODO: implement binary search for a peak element
    return 0;
}
`,
    java: `class Solution {
    public int findPeakElement(int[] nums) {
        // TODO: implement binary search for a peak element
        return 0;
    }
}
`,
    c: `int findPeakElement(int* nums, int numsSize) {
    // TODO: implement binary search for a peak element
    return 0;
}
`,
  },
  solutions: {
    python: `def find_peak_element(nums):
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] < nums[mid + 1]:
            lo = mid + 1
        else:
            hi = mid
    return lo
`,
    javascript: `function findPeakElement(nums) {
    let lo = 0, hi = nums.length - 1;
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (nums[mid] < nums[mid + 1]) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    return lo;
}
`,
    java: `class Solution {
    public int findPeakElement(int[] nums) {
        int lo = 0, hi = nums.length - 1;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (nums[mid] < nums[mid + 1]) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }
}
`,
    c: `int findPeakElement(int* nums, int numsSize) {
    int lo = 0, hi = numsSize - 1;
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] < nums[mid + 1]) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    return lo;
}
`,
  },
  editorial: `## Approach: Binary Search on Slope

### Intuition

Because the array boundaries are treated as \`-∞\`, a peak is guaranteed to exist. At any midpoint \`mid\` we can reason about which half **must** contain a peak:

- If \`nums[mid] < nums[mid + 1]\`, the values are **ascending** at \`mid\`. The element \`mid + 1\` is larger than \`mid\`, so either \`mid + 1\` is itself a peak (if \`nums[mid+2] < nums[mid+1]\`), or the ascending trend continues and eventually peaks somewhere to the **right**. Either way, the right half \`[mid+1 … hi]\` contains a peak → set \`lo = mid + 1\`.
- Otherwise \`nums[mid] >= nums[mid + 1]\` (descending or single). By symmetric reasoning, a peak lies in \`[lo … mid]\` → set \`hi = mid\`.

When \`lo == hi\`, a single candidate remains and it must be a peak.

### Algorithm

\`\`\`
lo = 0, hi = n - 1
while lo < hi:
    mid = (lo + hi) / 2
    if nums[mid] < nums[mid+1]:
        lo = mid + 1
    else:
        hi = mid
return lo
\`\`\`

### Complexity

- **Time:** O(log n) — the search space halves each iteration.
- **Space:** O(1) — only a constant amount of extra memory used.
`,
};

export default problem;
