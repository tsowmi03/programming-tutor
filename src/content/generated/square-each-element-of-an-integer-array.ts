import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "square-each-element-of-an-integer-array",
  title: "Square Each Element",
  difficulty: "easy",
  category: "foundations",
  order: 1013,
  description: `Given an integer array \`nums\`, return a **new** array where each element is the **square** of the corresponding element in \`nums\`.

\`\`\`text
Example 1:
Input:  nums = [1, 2, 3]
Output: [1, 4, 9]
Explanation: 1²=1, 2²=4, 3²=9
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [-3, 0, 4]
Output: [9, 0, 16]
Explanation: (-3)²=9, 0²=0, 4²=16
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 1000\`
- \`-100 <= nums[i] <= 100\``,
  hints: [
    `Iterate through the array one element at a time.`,
    `Remember that squaring a negative number gives a positive result: (-3) × (-3) = 9.`,
    `Create a new output array of the same length as the input, then fill each position with the squared value.`,
  ],
  signature: {
    "name": "squareElements",
    "params": [
      {
        "name": "nums",
        "type": "int[]"
      }
    ],
    "returns": "int[]",
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
      "expected": [
        1,
        4,
        9
      ],
      "hidden": false
    },
    {
      "input": [
        [
          -3,
          0,
          4
        ]
      ],
      "expected": [
        9,
        0,
        16
      ],
      "hidden": false
    },
    {
      "input": [
        [
          5
        ]
      ],
      "expected": [
        25
      ],
      "hidden": false
    },
    {
      "input": [
        []
      ],
      "expected": [],
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
      "expected": [
        1,
        4,
        9
      ],
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
      "expected": [
        0,
        0,
        0
      ],
      "hidden": true
    },
    {
      "input": [
        [
          10,
          -10,
          7
        ]
      ],
      "expected": [
        100,
        100,
        49
      ],
      "hidden": true
    },
    {
      "input": [
        [
          1,
          1,
          1,
          1
        ]
      ],
      "expected": [
        1,
        1,
        1,
        1
      ],
      "hidden": true
    },
    {
      "input": [
        [
          -100,
          100
        ]
      ],
      "expected": [
        10000,
        10000
      ],
      "hidden": true
    }
  ],
  starterCode: {
    python: `def square_elements(nums):
    # TODO: return a new list where each element is squared
    return []`,
    javascript: `function squareElements(nums) {
    // TODO: return a new array where each element is squared
    return [];
}`,
    typescript: `function squareElements(nums: number[]): number[] {
    // TODO: return a new array where each element is squared
    return [];
}`,
    java: `class Solution {
    public int[] squareElements(int[] nums) {
        // TODO: return a new array where each element is squared
        return new int[0];
    }
}`,
    csharp: `public class Solution {
    public int[] SquareElements(int[] nums) {
        // TODO: return a new array where each element is squared
        return new int[0];
    }
}`,
    c: `int* squareElements(int* nums, int numsSize, int* returnSize) {
    // TODO: return a new array where each element is squared
    *returnSize = 0;
    return NULL;
}`,
    cpp: `class Solution {
public:
    vector<int> squareElements(vector<int>& nums) {
        // TODO: return a new vector where each element is squared
        return {};
    }
};`,
  },
  solutions: {
    python: `def square_elements(nums):
    return [x * x for x in nums]`,
    javascript: `function squareElements(nums) {
    return nums.map(x => x * x);
}`,
    typescript: `function squareElements(nums: number[]): number[] {
    return nums.map(x => x * x);
}`,
    java: `class Solution {
    public int[] squareElements(int[] nums) {
        int[] result = new int[nums.length];
        for (int i = 0; i < nums.length; i++) {
            result[i] = nums[i] * nums[i];
        }
        return result;
    }
}`,
    csharp: `public class Solution {
    public int[] SquareElements(int[] nums) {
        int[] result = new int[nums.Length];
        for (int i = 0; i < nums.Length; i++) {
            result[i] = nums[i] * nums[i];
        }
        return result;
    }
}`,
    c: `int* squareElements(int* nums, int numsSize, int* returnSize) {
    *returnSize = numsSize;
    if (numsSize == 0) return NULL;
    int* result = (int*)malloc(numsSize * sizeof(int));
    for (int i = 0; i < numsSize; i++) {
        result[i] = nums[i] * nums[i];
    }
    return result;
}`,
    cpp: `class Solution {
public:
    vector<int> squareElements(vector<int>& nums) {
        vector<int> result(nums.size());
        for (int i = 0; i < (int)nums.size(); i++) {
            result[i] = nums[i] * nums[i];
        }
        return result;
    }
};`,
  },
  editorial: `## Approach: Linear Scan

For each element in the input array, compute its square by multiplying it by itself, and store the result at the same index in a new output array.

### Key Insight
Multiplying any integer by itself always yields a non-negative result. Negative numbers square correctly without any special-casing: \`(-3) * (-3) = 9\`.

### Steps
1. Allocate a result array of the same length as \`nums\`.
2. For each index \`i\`, set \`result[i] = nums[i] * nums[i]\`.
3. Return the result array.

### Complexity
- **Time:** O(n) — one pass through the array.
- **Space:** O(n) — the output array has the same length as the input.`,
};

export default problem;
