import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "find-the-single-number-that-appears-once-when-all-others-appear-twice",
  title: "Single Number",
  difficulty: "easy",
  category: "arrays-hashing",
  order: 1045,
  description: `Given a **non-empty** array of integers \`nums\`, every element appears **exactly twice** except for one element which appears **exactly once**. Find and return the single element.

Your solution should ideally run in **O(n)** time and use **O(1)** extra space.

\`\`\`text
Example 1:
Input:  nums = [2, 2, 1]
Output: 1
Explanation: 1 is the only element that does not have a pair.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [4, 1, 2, 1, 2]
Output: 4
Explanation: 4 appears once; 1 and 2 each appear twice.
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 3 * 10^4\`
- \`-3 * 10^4 <= nums[i] <= 3 * 10^4\`
- \`nums.length\` is always odd.
- Exactly one element appears once; all others appear exactly twice.`,
  hints: [
    `Think about a bitwise operation that evaluates to 0 when applied to two equal values.`,
    `Recall that XOR satisfies: \`a ^ a = 0\` and \`a ^ 0 = a\`. What happens if you XOR every number in the array together?`,
    `Since every pair cancels out (n ^ n = 0), XOR-ing all elements leaves only the single unpaired number.`,
    `Alternatively, you could use a hash map to count occurrences and return the element whose count is 1 — though this uses O(n) extra space.`,
  ],
  signature: {
    "name": "singleNumber",
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
          2,
          2,
          1
        ]
      ],
      "expected": 1,
      "hidden": false
    },
    {
      "input": [
        [
          4,
          1,
          2,
          1,
          2
        ]
      ],
      "expected": 4,
      "hidden": false
    },
    {
      "input": [
        [
          1
        ]
      ],
      "expected": 1,
      "hidden": false
    },
    {
      "input": [
        [
          0,
          1,
          0
        ]
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          -1,
          -1,
          2
        ]
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        [
          3,
          3,
          5,
          5,
          7
        ]
      ],
      "expected": 7,
      "hidden": true
    },
    {
      "input": [
        [
          100,
          100,
          200,
          200,
          300
        ]
      ],
      "expected": 300,
      "hidden": true
    },
    {
      "input": [
        [
          -5,
          1,
          1,
          -5,
          9,
          9,
          3
        ]
      ],
      "expected": 3,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def single_number(nums):
    # TODO: implement
    return 0`,
    javascript: `function singleNumber(nums) {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int singleNumber(int[] nums) {
        // TODO: implement
        return 0;
    }
}`,
    c: `int singleNumber(int* nums, int numsSize) {
    /* TODO: implement */
    return 0;
}`,
  },
  solutions: {
    python: `def single_number(nums):
    result = 0
    for n in nums:
        result ^= n
    return result`,
    javascript: `function singleNumber(nums) {
    let result = 0;
    for (const n of nums) {
        result ^= n;
    }
    return result;
}`,
    java: `class Solution {
    public int singleNumber(int[] nums) {
        int result = 0;
        for (int n : nums) {
            result ^= n;
        }
        return result;
    }
}`,
    c: `int singleNumber(int* nums, int numsSize) {
    int result = 0;
    for (int i = 0; i < numsSize; i++) {
        result ^= nums[i];
    }
    return result;
}`,
  },
  editorial: `## Approach 1: XOR Bit Manipulation (Optimal)

**Key insight:** The XOR operation has two useful properties:
- \`n ^ n = 0\` — a number XOR-ed with itself is zero.
- \`n ^ 0 = n\` — a number XOR-ed with zero is itself.

Because XOR is commutative and associative, XOR-ing all elements causes every *pair* to cancel to 0, leaving only the single unpaired element.

\`\`\`
[4, 1, 2, 1, 2]
0 ^ 4 = 4
4 ^ 1 = 5
5 ^ 2 = 7
7 ^ 1 = 6
6 ^ 2 = 4   ← the single number
\`\`\`

**Complexity:** O(n) time, O(1) space.

---

## Approach 2: Hash Map Counting

Iterate through the array, counting occurrences in a hash map. Return the key whose value equals 1.

**Complexity:** O(n) time, O(n) space — worse on space than Approach 1.`,
};

export default problem;
