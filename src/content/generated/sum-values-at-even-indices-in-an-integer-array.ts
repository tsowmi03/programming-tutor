import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "sum-values-at-even-indices-in-an-integer-array",
  title: "Sum of Even-Index Values",
  difficulty: "easy",
  category: "foundations",
  order: 1002,
  description: `Given an integer array \`nums\`, return the **sum of all elements at even indices** (0-indexed).

An index is even if it is divisible by 2 (i.e., indices 0, 2, 4, …).

\`\`\`text
Example 1:
Input:  nums = [3, 1, 4, 1, 5]
Output: 12
Explanation: nums[0] + nums[2] + nums[4] = 3 + 4 + 5 = 12
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [10, 20, 30]
Output: 40
Explanation: nums[0] + nums[2] = 10 + 30 = 40
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [7]
Output: 7
Explanation: Only index 0 exists, which is even.
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 10^4\`
- \`-10^5 <= nums[i] <= 10^5\``,
  hints: [
    `Iterate through the array and check whether the current index is divisible by 2.`,
    `You can step through the array with a step size of 2, starting at index 0, to visit only even indices.`,
  ],
  guidance: [
    {
      "title": "Identify the even indices",
      "body": "Even indices are 0, 2, 4, 6, … — every other position starting from the beginning of the array.",
      "level": "nudge"
    },
    {
      "title": "Loop strategy",
      "body": "Use a loop that starts at `i = 0` and increments by 2 each iteration (`i += 2`). This visits exactly the even indices without needing an `if` check.",
      "level": "strategy"
    },
    {
      "title": "Accumulate the sum",
      "body": "Keep a running total initialized to 0. Add `nums[i]` to the total inside the loop, then return the total after the loop ends.",
      "level": "strategy"
    },
    {
      "title": "Pseudocode shape",
      "body": "```\ntotal = 0\nfor i from 0 to len(nums)-1 step 2:\n    total += nums[i]\nreturn total\n```",
      "level": "pseudocode"
    }
  ],

  signature: {
    "name": "sumEvenIndexValues",
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
          5
        ]
      ],
      "expected": 12,
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
      "expected": 40,
      "hidden": false
    },
    {
      "input": [
        [
          7
        ]
      ],
      "expected": 7,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          2,
          3,
          4,
          5,
          6
        ]
      ],
      "expected": 9,
      "hidden": true
    },
    {
      "input": [
        [
          -5,
          10,
          -3,
          7,
          2
        ]
      ],
      "expected": -6,
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
          100000,
          -100000,
          100000,
          -100000,
          100000
        ]
      ],
      "expected": 300000,
      "hidden": true
    },
    {
      "input": [
        [
          4,
          4
        ]
      ],
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        [
          -1,
          -2,
          -3,
          -4,
          -5,
          -6,
          -7
        ]
      ],
      "expected": -16,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def sum_even_index_values(nums):
    # TODO: sum elements at even indices
    pass`,
    javascript: `function sumEvenIndexValues(nums) {
    // TODO: sum elements at even indices
}`,
    typescript: `function sumEvenIndexValues(nums: number[]): number {
    // TODO: sum elements at even indices
    return 0;
}`,
    java: `class Solution {
    public int sumEvenIndexValues(int[] nums) {
        // TODO: sum elements at even indices
        return 0;
    }
}`,
    csharp: `public class Solution {
    public int SumEvenIndexValues(int[] nums) {
        // TODO: sum elements at even indices
        return 0;
    }
}`,
    c: `int sumEvenIndexValues(int* nums, int numsSize) {
    // TODO: sum elements at even indices
    return 0;
}`,
    cpp: `class Solution {
public:
    int sumEvenIndexValues(vector<int>& nums) {
        // TODO: sum elements at even indices
        return 0;
    }
};`,
  },
  solutions: {
    python: `def sum_even_index_values(nums):
    total = 0
    for i in range(0, len(nums), 2):
        total += nums[i]
    return total`,
    javascript: `function sumEvenIndexValues(nums) {
    let total = 0;
    for (let i = 0; i < nums.length; i += 2) {
        total += nums[i];
    }
    return total;
}`,
    typescript: `function sumEvenIndexValues(nums: number[]): number {
    let total = 0;
    for (let i = 0; i < nums.length; i += 2) {
        total += nums[i];
    }
    return total;
}`,
    java: `class Solution {
    public int sumEvenIndexValues(int[] nums) {
        int total = 0;
        for (int i = 0; i < nums.length; i += 2) {
            total += nums[i];
        }
        return total;
    }
}`,
    csharp: `public class Solution {
    public int SumEvenIndexValues(int[] nums) {
        int total = 0;
        for (int i = 0; i < nums.Length; i += 2) {
            total += nums[i];
        }
        return total;
    }
}`,
    c: `int sumEvenIndexValues(int* nums, int numsSize) {
    int total = 0;
    for (int i = 0; i < numsSize; i += 2) {
        total += nums[i];
    }
    return total;
}`,
    cpp: `class Solution {
public:
    int sumEvenIndexValues(vector<int>& nums) {
        int total = 0;
        for (int i = 0; i < (int)nums.size(); i += 2) {
            total += nums[i];
        }
        return total;
    }
};`,
  },
  editorial: `## Approach: Single Pass with Step-2 Loop

### Intuition
We only want elements at indices 0, 2, 4, … — every other element starting from the first. Instead of visiting every index and filtering, we can loop with a step of 2, visiting only even indices directly.

### Algorithm
1. Initialize \`total = 0\`.
2. Loop \`i\` from \`0\` to \`len(nums) - 1\`, incrementing by \`2\` each step.
3. Add \`nums[i]\` to \`total\`.
4. Return \`total\`.

### Complexity
- **Time:** O(n) — we visit roughly n/2 elements, which is O(n).
- **Space:** O(1) — only a single accumulator variable is used.`,
};

export default problem;
