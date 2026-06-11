import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "sum-of-array",
  title: "Sum of an Array",
  difficulty: "easy",
  category: "foundations",
  order: 1000,
  description: `Given an integer array \`nums\`, return the **sum** of all its elements.

If the array is empty, return \`0\`.

\`\`\`text
Example 1:
Input:  nums = [1, 2, 3, 4, 5]
Output: 15
Explanation: 1 + 2 + 3 + 4 + 5 = 15
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [-1, -2, -3]
Output: -6
Explanation: (-1) + (-2) + (-3) = -6
\`\`\`

\`\`\`text
Example 3:
Input:  nums = []
Output: 0
Explanation: No elements to add; return 0.
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 1000\`
- \`-10^6 <= nums[i] <= 10^6\``,
  hints: [
    `Start with a variable initialized to 0 and add each element one by one.`,
    `In Python you can use the built-in \`sum()\` function directly. In other languages a simple \`for\` loop does the job.`,
    `Don't forget to handle the edge case where the array is empty — your loop body simply never executes, so the initial value of 0 is returned automatically.`,
  ],
  signature: {
    "name": "arraySum",
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
          4,
          5
        ]
      ],
      "expected": 15,
      "hidden": false
    },
    {
      "input": [
        [
          -1,
          -2,
          -3
        ]
      ],
      "expected": -6,
      "hidden": false
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
          10
        ]
      ],
      "expected": 10,
      "hidden": true
    },
    {
      "input": [
        [
          100,
          200,
          300
        ]
      ],
      "expected": 600,
      "hidden": true
    },
    {
      "input": [
        [
          -5,
          5
        ]
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1
        ]
      ],
      "expected": 10,
      "hidden": true
    },
    {
      "input": [
        [
          -1000000,
          1000000
        ]
      ],
      "expected": 0,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def array_sum(nums: list[int]) -> int:
    # TODO: return the sum of all elements in nums
    return 0
`,
    javascript: `function arraySum(nums) {
    // TODO: return the sum of all elements in nums
    return 0;
}
`,
    java: `class Solution {
    public int arraySum(int[] nums) {
        // TODO: return the sum of all elements in nums
        return 0;
    }
}
`,
    c: `int arraySum(int* nums, int numsSize) {
    /* TODO: return the sum of all elements in nums */
    return 0;
}
`,
  },
  solutions: {
    python: `def array_sum(nums: list[int]) -> int:
    total = 0
    for x in nums:
        total += x
    return total
`,
    javascript: `function arraySum(nums) {
    let total = 0;
    for (let i = 0; i < nums.length; i++) {
        total += nums[i];
    }
    return total;
}
`,
    java: `class Solution {
    public int arraySum(int[] nums) {
        int total = 0;
        for (int x : nums) {
            total += x;
        }
        return total;
    }
}
`,
    c: `int arraySum(int* nums, int numsSize) {
    int total = 0;
    for (int i = 0; i < numsSize; i++) {
        total += nums[i];
    }
    return total;
}
`,
  },
  editorial: `## Approach: Single-Pass Accumulation

The simplest correct solution iterates through every element once, maintaining a running total.

### Algorithm
1. Initialize \`total = 0\`.
2. For each element \`x\` in \`nums\`, add \`x\` to \`total\`.
3. Return \`total\`.

When the array is empty the loop body never executes, so \`0\` is returned automatically — no special case needed.

### Complexity
- **Time:** O(n) — each element is visited exactly once.
- **Space:** O(1) — only a single accumulator variable is used.

### Language notes
- **Python** also accepts the one-liner \`return sum(nums)\` which delegates to the same O(n) loop internally.
- **C** receives the array length as a separate \`numsSize\` parameter since C arrays do not carry their own length.`,
};

export default problem;
