import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "compute-the-range-width-of-an-integer-array",
  title: "Array Range Width",
  difficulty: "easy",
  category: "foundations",
  order: 1004,
  description: `Given an integer array \`nums\`, return the **range width** of the array, defined as the difference between the maximum and minimum values in the array.

\`\`\`text
Example 1:
Input:  nums = [3, 1, 7, 2, 5]
Output: 6
Explanation: max = 7, min = 1, range = 7 - 1 = 6
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [10, 10, 10]
Output: 0
Explanation: max = 10, min = 10, range = 10 - 10 = 0
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [-4, 0, 8, -10]
Output: 18
Explanation: max = 8, min = -10, range = 8 - (-10) = 18
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 10^5\`
- \`-10^9 <= nums[i] <= 10^9\``,
  hints: [
    `You need two pieces of information from the array: the largest value and the smallest value.`,
    `A single pass through the array is enough to track both the maximum and minimum simultaneously.`,
  ],
  guidance: [
    {
      "title": "What are you computing?",
      "body": "The range of an array is simply `max - min`. Your goal is to find both the maximum and minimum values efficiently.",
      "level": "nudge"
    },
    {
      "title": "Single-pass strategy",
      "body": "Initialize `minVal` and `maxVal` to the first element, then iterate through the rest of the array updating both values. At the end, return `maxVal - minVal`.",
      "level": "strategy"
    },
    {
      "title": "Watch out for negative numbers",
      "body": "If you initialize `minVal` to `0` instead of `nums[0]`, you may get the wrong answer when all numbers are positive or all negative. Always start from a value that is actually in the array.",
      "level": "pitfall"
    },
    {
      "title": "Implementation shape",
      "body": "```\nminVal = nums[0]\nmaxVal = nums[0]\nfor each x in nums:\n    if x < minVal: minVal = x\n    if x > maxVal: maxVal = x\nreturn maxVal - minVal\n```",
      "level": "pseudocode"
    }
  ],

  signature: {
    "name": "rangeWidth",
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
          7,
          2,
          5
        ]
      ],
      "expected": 6,
      "hidden": false
    },
    {
      "input": [
        [
          10,
          10,
          10
        ]
      ],
      "expected": 0,
      "hidden": false
    },
    {
      "input": [
        [
          -4,
          0,
          8,
          -10
        ]
      ],
      "expected": 18,
      "hidden": false
    },
    {
      "input": [
        [
          42
        ]
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          -1,
          -5,
          -3,
          -2
        ]
      ],
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        [
          1000000000,
          -1000000000
        ]
      ],
      "expected": 2000000000,
      "hidden": true
    },
    {
      "input": [
        [
          0,
          0,
          0,
          0
        ]
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          5,
          3,
          8,
          1,
          9,
          2,
          7,
          4,
          6
        ]
      ],
      "expected": 8,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def range_width(nums: list[int]) -> int:
    # TODO: return the difference between max and min
    pass
`,
    javascript: `function rangeWidth(nums) {
    // TODO: return the difference between max and min
}
`,
    typescript: `function rangeWidth(nums: number[]): number {
    // TODO: return the difference between max and min
}
`,
    java: `class Solution {
    public int rangeWidth(int[] nums) {
        // TODO: return the difference between max and min
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int RangeWidth(int[] nums) {
        // TODO: return the difference between max and min
        return 0;
    }
}
`,
    c: `int rangeWidth(int* nums, int numsSize) {
    // TODO: return the difference between max and min
    return 0;
}
`,
    cpp: `class Solution {
public:
    int rangeWidth(vector<int>& nums) {
        // TODO: return the difference between max and min
        return 0;
    }
};
`,
  },
  solutions: {
    python: `def range_width(nums: list[int]) -> int:
    min_val = nums[0]
    max_val = nums[0]
    for x in nums:
        if x < min_val:
            min_val = x
        if x > max_val:
            max_val = x
    return max_val - min_val
`,
    javascript: `function rangeWidth(nums) {
    let minVal = nums[0];
    let maxVal = nums[0];
    for (const x of nums) {
        if (x < minVal) minVal = x;
        if (x > maxVal) maxVal = x;
    }
    return maxVal - minVal;
}
`,
    typescript: `function rangeWidth(nums: number[]): number {
    let minVal = nums[0];
    let maxVal = nums[0];
    for (const x of nums) {
        if (x < minVal) minVal = x;
        if (x > maxVal) maxVal = x;
    }
    return maxVal - minVal;
}
`,
    java: `class Solution {
    public int rangeWidth(int[] nums) {
        int minVal = nums[0];
        int maxVal = nums[0];
        for (int x : nums) {
            if (x < minVal) minVal = x;
            if (x > maxVal) maxVal = x;
        }
        return maxVal - minVal;
    }
}
`,
    csharp: `public class Solution {
    public int RangeWidth(int[] nums) {
        int minVal = nums[0];
        int maxVal = nums[0];
        foreach (int x in nums) {
            if (x < minVal) minVal = x;
            if (x > maxVal) maxVal = x;
        }
        return maxVal - minVal;
    }
}
`,
    c: `int rangeWidth(int* nums, int numsSize) {
    int minVal = nums[0];
    int maxVal = nums[0];
    for (int i = 1; i < numsSize; i++) {
        if (nums[i] < minVal) minVal = nums[i];
        if (nums[i] > maxVal) maxVal = nums[i];
    }
    return maxVal - minVal;
}
`,
    cpp: `class Solution {
public:
    int rangeWidth(vector<int>& nums) {
        int minVal = nums[0];
        int maxVal = nums[0];
        for (int x : nums) {
            if (x < minVal) minVal = x;
            if (x > maxVal) maxVal = x;
        }
        return maxVal - minVal;
    }
};
`,
  },
  editorial: `## Approach: Single Pass

We need to find \`max(nums) - min(nums)\`. Rather than making two separate passes (one for max, one for min), we can find both in a single linear scan.

**Algorithm:**
1. Initialize \`minVal = maxVal = nums[0]\`.
2. Iterate through every element \`x\` in \`nums\`:
   - Update \`minVal = min(minVal, x)\`
   - Update \`maxVal = max(maxVal, x)\`
3. Return \`maxVal - minVal\`.

**Why start from \`nums[0]\`?** If we started from \`0\`, arrays like \`[3, 5, 7]\` (all positive) would produce a wrong minimum of \`0\`.

**Complexity:**
- Time: **O(n)** — one pass through the array.
- Space: **O(1)** — only two extra variables regardless of input size.

**Edge cases handled:**
- Single-element array → \`maxVal == minVal\`, result is \`0\`.
- All elements equal → result is \`0\`.
- Mix of negatives and positives → subtraction works correctly (e.g., \`8 - (-10) = 18\`).
- Large values near \`±10^9\` → the difference fits in a 32-bit signed integer since \`2 × 10^9 < 2^31 - 1 ≈ 2.147 × 10^9\`. The maximum possible answer is exactly \`2 × 10^9\`, which fits in \`int\`.`,
};

export default problem;
