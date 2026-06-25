import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "sum-values-at-odd-indices-in-an-integer-array",
  title: "Sum Values at Odd Indices",
  difficulty: "easy",
  category: "foundations",
  order: 1003,
  description: `Given an integer array \`nums\`, return the sum of all elements located at **odd indices** (0-indexed).

An index is odd if it is not divisible by 2 (i.e., indices 1, 3, 5, …).

\`\`\`text
Example 1:
Input:  nums = [1, 2, 3, 4, 5]
Odd indices: index 1 → 2, index 3 → 4
Output: 6
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [10, 20, 30, 40]
Odd indices: index 1 → 20, index 3 → 40
Output: 60
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [7]
Odd indices: (none)
Output: 0
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 10^4\`
- \`-10^5 <= nums[i] <= 10^5\``,
  hints: [
    `Iterate through the array and check whether each index is odd before adding its value.`,
    `An index \`i\` is odd when \`i % 2 == 1\`. Start your loop at index 1 and step by 2 to visit only odd indices.`,
  ],
  guidance: [
    {
      "title": "Identify the right indices",
      "body": "Remember that indices are 0-based. The first odd index is 1, then 3, 5, and so on. You don't need to touch elements at even indices (0, 2, 4, …) at all.",
      "level": "nudge"
    },
    {
      "title": "Loop strategy",
      "body": "You can either loop over every index and check `i % 2 == 1`, or start at index 1 and increment by 2 each step. Both are O(n); the second avoids the modulo check.",
      "level": "strategy"
    },
    {
      "title": "Watch out for empty or single-element arrays",
      "body": "If `nums` has only one element, there are no odd indices, so the answer is 0. Make sure your loop handles this without going out of bounds.",
      "level": "pitfall"
    },
    {
      "title": "Pseudocode shape",
      "body": "```\ntotal = 0\nfor i from 1 to len(nums)-1, step 2:\n    total += nums[i]\nreturn total\n```",
      "level": "pseudocode"
    }
  ],

  signature: {
    "name": "sumOddIndexValues",
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
      "expected": 6,
      "hidden": false
    },
    {
      "input": [
        [
          10,
          20,
          30,
          40
        ]
      ],
      "expected": 60,
      "hidden": false
    },
    {
      "input": [
        [
          7
        ]
      ],
      "expected": 0,
      "hidden": false
    },
    {
      "input": [
        [
          5,
          3
        ]
      ],
      "expected": 3,
      "hidden": true
    },
    {
      "input": [
        [
          -1,
          -2,
          -3,
          -4
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
          100,
          200,
          300,
          400,
          500,
          600
        ]
      ],
      "expected": 1200,
      "hidden": true
    },
    {
      "input": [
        [
          -10,
          5,
          -10,
          5,
          -10,
          5
        ]
      ],
      "expected": 15,
      "hidden": true
    },
    {
      "input": [
        [
          42
        ]
      ],
      "expected": 0,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def sum_odd_index_values(nums: list[int]) -> int:
    # TODO: return the sum of elements at odd indices
    return 0
`,
    javascript: `function sumOddIndexValues(nums) {
    // TODO: return the sum of elements at odd indices
    return 0;
}
`,
    typescript: `function sumOddIndexValues(nums: number[]): number {
    // TODO: return the sum of elements at odd indices
    return 0;
}
`,
    java: `class Solution {
    public int sumOddIndexValues(int[] nums) {
        // TODO: return the sum of elements at odd indices
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int SumOddIndexValues(int[] nums) {
        // TODO: return the sum of elements at odd indices
        return 0;
    }
}
`,
    c: `int sumOddIndexValues(int* nums, int numsSize) {
    // TODO: return the sum of elements at odd indices
    return 0;
}
`,
    cpp: `class Solution {
public:
    int sumOddIndexValues(vector<int>& nums) {
        // TODO: return the sum of elements at odd indices
        return 0;
    }
};
`,
  },
  solutions: {
    python: `def sum_odd_index_values(nums: list[int]) -> int:
    total = 0
    for i in range(1, len(nums), 2):
        total += nums[i]
    return total
`,
    javascript: `function sumOddIndexValues(nums) {
    let total = 0;
    for (let i = 1; i < nums.length; i += 2) {
        total += nums[i];
    }
    return total;
}
`,
    typescript: `function sumOddIndexValues(nums: number[]): number {
    let total = 0;
    for (let i = 1; i < nums.length; i += 2) {
        total += nums[i];
    }
    return total;
}
`,
    java: `class Solution {
    public int sumOddIndexValues(int[] nums) {
        int total = 0;
        for (int i = 1; i < nums.length; i += 2) {
            total += nums[i];
        }
        return total;
    }
}
`,
    csharp: `public class Solution {
    public int SumOddIndexValues(int[] nums) {
        int total = 0;
        for (int i = 1; i < nums.Length; i += 2) {
            total += nums[i];
        }
        return total;
    }
}
`,
    c: `int sumOddIndexValues(int* nums, int numsSize) {
    int total = 0;
    for (int i = 1; i < numsSize; i += 2) {
        total += nums[i];
    }
    return total;
}
`,
    cpp: `class Solution {
public:
    int sumOddIndexValues(vector<int>& nums) {
        int total = 0;
        for (int i = 1; i < (int)nums.size(); i += 2) {
            total += nums[i];
        }
        return total;
    }
};
`,
  },
  editorial: `## Approach: Single Pass Over Odd Indices

### Intuition
We only care about elements at positions 1, 3, 5, … so we can skip even-indexed elements entirely by starting at index 1 and stepping by 2.

### Algorithm
1. Initialise \`total = 0\`.
2. Loop \`i\` from \`1\` to \`len(nums) - 1\` (inclusive), incrementing by \`2\` each step.
3. Add \`nums[i]\` to \`total\`.
4. Return \`total\`.

If the array has fewer than 2 elements (e.g., length 1), the loop body never executes and we correctly return 0.

### Complexity
- **Time:** O(n) — we visit roughly half the elements, which is still linear.
- **Space:** O(1) — only a single accumulator variable is used.`,
};

export default problem;
