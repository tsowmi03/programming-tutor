import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "find-the-missing-number-in-an-array-containing-0-through-n-with-one-missing",
  title: "Missing Number (0 to N)",
  difficulty: "medium",
  category: "foundations",
  order: 1026,
  description: `Given an array \`nums\` containing \`n\` **distinct** integers chosen from the range \`[0, n]\`, return the only number in that range which is missing from the array.

**Example 1:**
\`\`\`text
Input:  nums = [3, 0, 1]
Output: 2
Explanation: n = 3, so the full range is {0, 1, 2, 3}.
             The value 2 is absent.
\`\`\`

**Example 2:**
\`\`\`text
Input:  nums = [9, 6, 4, 2, 3, 5, 7, 0, 1]
Output: 8
Explanation: n = 9, so the full range is {0, 1, ..., 9}.
             The value 8 is absent.
\`\`\`

**Constraints:**
- \`n == nums.length\`
- \`1 <= n <= 10^4\`
- \`0 <= nums[i] <= n\`
- All values in \`nums\` are **unique**.`,
  hints: [
    `If every number from 0 to n were present, what would their total sum equal?`,
    `The expected sum of integers 0 through n is n*(n+1)/2. The gap between that and the actual sum reveals the missing value.`,
    `There is also a neat XOR-based approach: XOR all indices 0..n together with all array values — paired duplicates cancel, leaving only the missing number.`,
  ],
  signature: {
    "name": "missingNumber",
    "params": [
      {
        "name": "nums",
        "type": "int[]"
      }
    ],
    "returns": "int"
  },
  testCases: [
    {
      "input": [
        [
          3,
          0,
          1
        ]
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        [
          0,
          1
        ]
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        [
          9,
          6,
          4,
          2,
          3,
          5,
          7,
          0,
          1
        ]
      ],
      "expected": 8,
      "hidden": false
    },
    {
      "input": [
        [
          0
        ]
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          1
        ]
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          0,
          1,
          3,
          4
        ]
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10
        ]
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          8,
          9,
          10
        ]
      ],
      "expected": 7,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def missing_number(nums):
    # TODO: implement
    return 0`,
    javascript: `function missingNumber(nums) {
    // TODO: implement
    return 0;
}`,
    typescript: `function missingNumber(nums: number[]): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int missingNumber(int[] nums) {
        // TODO: implement
        return 0;
    }
}`,
    csharp: `public class Solution {
    public int MissingNumber(int[] nums) {
        // TODO: implement
        return 0;
    }
}`,
    c: `int missingNumber(int* nums, int numsSize) {
    /* TODO: implement */
    return 0;
}`,
    cpp: `class Solution {
public:
    int missingNumber(vector<int>& nums) {
        // TODO: implement
        return 0;
    }
};`,
  },
  solutions: {
    python: `def missing_number(nums):
    n = len(nums)
    expected = n * (n + 1) // 2
    return expected - sum(nums)`,
    javascript: `function missingNumber(nums) {
    const n = nums.length;
    const expected = n * (n + 1) / 2;
    const actual = nums.reduce((acc, val) => acc + val, 0);
    return expected - actual;
}`,
    typescript: `function missingNumber(nums: number[]): number {
    const n = nums.length;
    const expected = n * (n + 1) / 2;
    const actual = nums.reduce((acc, val) => acc + val, 0);
    return expected - actual;
}`,
    java: `class Solution {
    public int missingNumber(int[] nums) {
        int n = nums.length;
        int expected = n * (n + 1) / 2;
        int actual = 0;
        for (int num : nums) {
            actual += num;
        }
        return expected - actual;
    }
}`,
    csharp: `public class Solution {
    public int MissingNumber(int[] nums) {
        int n = nums.Length;
        int expected = n * (n + 1) / 2;
        int actual = 0;
        foreach (int num in nums) {
            actual += num;
        }
        return expected - actual;
    }
}`,
    c: `int missingNumber(int* nums, int numsSize) {
    int expected = numsSize * (numsSize + 1) / 2;
    int actual = 0;
    int i;
    for (i = 0; i < numsSize; i++) {
        actual += nums[i];
    }
    return expected - actual;
}`,
    cpp: `class Solution {
public:
    int missingNumber(vector<int>& nums) {
        int n = nums.size();
        int expected = n * (n + 1) / 2;
        int actual = 0;
        for (int num : nums) {
            actual += num;
        }
        return expected - actual;
    }
};`,
  },
  editorial: `## Approach: Gauss Sum Formula

### Intuition
The array holds \`n\` values from \`{0, 1, …, n}\` with exactly one absent. If nothing were missing, the total would equal the **triangular number** \`n*(n+1)/2\` (Gauss's formula). The missing value is simply the difference between that expected total and the actual sum of the array.

### Algorithm
1. Let \`n = nums.length\`.
2. Compute \`expected = n * (n + 1) / 2\`.
3. Compute \`actual = sum of all elements in nums\`.
4. Return \`expected − actual\`.

### Complexity
- **Time:** O(n) — single pass to accumulate the sum.
- **Space:** O(1) — only two integer variables needed.

### Bonus: XOR approach
Initialise \`xor = 0\`, then XOR every index \`0..n\` and every element of \`nums\` into \`xor\`. Because \`x XOR x = 0\` and \`x XOR 0 = x\`, every value that appears as both an index and an array element cancels, leaving only the missing number. Same O(n) / O(1) complexity and avoids any overflow risk for very large \`n\`.`,
};

export default problem;
