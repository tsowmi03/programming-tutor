import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-numbers-with-an-even-number-of-digits",
  title: "Count Numbers with an Even Number of Digits",
  difficulty: "easy",
  category: "foundations",
  order: 3010,
  description: `Given an array of non-negative integers, return how many numbers contain an even number of decimal digits.

\`\`\`text
Example 1:
Input:  nums = [12,345,2,6,7896]
Output: 2

Example 2:
Input:  nums = [0,10,100,1000]
Output: 2
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 1000\`
- \`0 <= nums[i] <= 1000000\``,
  hints: [
    `Count decimal digits for each number.`,
    `\`0\` has one digit.`,
  ],

  signature: {
    "name": "countEvenDigitNumbers",
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
          12,
          345,
          2,
          6,
          7896
        ]
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        [
          0,
          10,
          100,
          1000
        ]
      ],
      "expected": 2,
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
          7
        ]
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          11,
          22,
          3333
        ]
      ],
      "expected": 3,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_even_digit_numbers(nums: list[int]) -> int:
    # TODO: implement
    return 0
`,
    javascript: `function countEvenDigitNumbers(nums) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function countEvenDigitNumbers(nums: number[]): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int countEvenDigitNumbers(int[] nums) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int countEvenDigitNumbers(int* nums, int numsSize) {
    // TODO: implement
    return 0;
}
`,
  },
  solutions: {
    python: `def count_even_digit_numbers(nums: list[int]) -> int:
    count = 0
    for value in nums:
        digits = 1 if value == 0 else 0
        x = value
        while x > 0:
            digits += 1
            x //= 10
        if digits % 2 == 0:
            count += 1
    return count
`,
    javascript: `function countEvenDigitNumbers(nums) {
    let count = 0;
    for (const value of nums) {
        let digits = value === 0 ? 1 : 0;
        let x = value;
        while (x > 0) { digits++; x = Math.floor(x / 10); }
        if (digits % 2 === 0) count++;
    }
    return count;
}
`,
    typescript: `function countEvenDigitNumbers(nums: number[]): number {
    let count = 0;
    for (const value of nums) {
        let digits = value === 0 ? 1 : 0;
        let x = value;
        while (x > 0) { digits++; x = Math.floor(x / 10); }
        if (digits % 2 === 0) count++;
    }
    return count;
}`,
    java: `class Solution {
    public int countEvenDigitNumbers(int[] nums) {
        int count = 0;
        for (int value : nums) {
            int digits = value == 0 ? 1 : 0;
            int x = value;
            while (x > 0) { digits++; x /= 10; }
            if (digits % 2 == 0) count++;
        }
        return count;
    }
}
`,
    c: `int countEvenDigitNumbers(int* nums, int numsSize) {
    int count = 0;
    for (int i = 0; i < numsSize; i++) {
        int digits = nums[i] == 0 ? 1 : 0;
        int x = nums[i];
        while (x > 0) { digits++; x /= 10; }
        if (digits % 2 == 0) count++;
    }
    return count;
}
`,
  },
  editorial: `Count digits with repeated division by ten and increment the answer when the digit count is even.`,
};

export default problem;
