import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "average-of-an-array-returned-as-an-int-floor",
  title: "Average of an Array",
  difficulty: "easy",
  category: "foundations",
  order: 1008,
  description: `Given an array of non-negative integers \`nums\`, return its **floor average**: the sum of all elements divided by the number of elements, rounded down to the nearest integer (integer/floor division).

\`\`\`text
Example 1:
Input:  nums = [1, 2, 3]
Output: 2
Explanation: (1 + 2 + 3) / 3 = 6 / 3 = 2 (exact)
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [1, 2, 3, 4]
Output: 2
Explanation: (1 + 2 + 3 + 4) / 4 = 10 / 4 = 2.5 → floor = 2
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [10, 20, 30]
Output: 20
Explanation: (10 + 20 + 30) / 3 = 60 / 3 = 20 (exact)
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 10^4\`
- \`0 <= nums[i] <= 10^4\``,
  hints: [
    `Start by computing the total sum of all elements in the array.`,
    `Divide the sum by the number of elements using integer (floor) division — no floats needed.`,
    `In most languages, dividing two integers already performs truncation toward zero, which equals floor for non-negative numbers.`,
  ],
  signature: {
    "name": "averageArray",
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
          3
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
          3,
          4
        ]
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        [
          10,
          20,
          30
        ]
      ],
      "expected": 20,
      "hidden": false
    },
    {
      "input": [
        [
          5
        ]
      ],
      "expected": 5,
      "hidden": true
    },
    {
      "input": [
        [
          7
        ]
      ],
      "expected": 7,
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
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2
        ]
      ],
      "expected": 1,
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
          100,
          200,
          300,
          400
        ]
      ],
      "expected": 250,
      "hidden": true
    },
    {
      "input": [
        [
          3,
          3,
          3,
          3
        ]
      ],
      "expected": 3,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def average_array(nums):
    # TODO: return the floor average of nums
    return 0
`,
    javascript: `function averageArray(nums) {
    // TODO: return the floor average of nums
    return 0;
}
`,
    java: `class Solution {
    public int averageArray(int[] nums) {
        // TODO: return the floor average of nums
        return 0;
    }
}
`,
    c: `int averageArray(int* nums, int numsSize) {
    // TODO: return the floor average of nums
    return 0;
}
`,
  },
  solutions: {
    python: `def average_array(nums):
    return sum(nums) // len(nums)
`,
    javascript: `function averageArray(nums) {
    const total = nums.reduce((acc, val) => acc + val, 0);
    return Math.floor(total / nums.length);
}
`,
    java: `class Solution {
    public int averageArray(int[] nums) {
        int sum = 0;
        for (int n : nums) sum += n;
        return sum / nums.length;
    }
}
`,
    c: `int averageArray(int* nums, int numsSize) {
    int sum = 0;
    for (int i = 0; i < numsSize; i++) sum += nums[i];
    return sum / numsSize;
}
`,
  },
  editorial: `## Approach: Single Pass Sum

### Intuition
The floor average of an array is simply the total sum divided by the element count, discarding any fractional part.

### Algorithm
1. Iterate through \`nums\`, accumulating a running \`sum\`.
2. Return \`sum / length\` using integer (floor) division.

Because all values are non-negative, integer division (truncation toward zero) equals floor division, so all four languages give the same result.

### Complexity
- **Time:** O(n) — one pass to sum all elements.
- **Space:** O(1) — only a single accumulator variable.

### Example Walkthrough
\`\`\`
nums = [1, 2, 3, 4]
sum  = 1 + 2 + 3 + 4 = 10
length = 4
result = 10 / 4 = 2  (floor)
\`\`\``,
};

export default problem;
