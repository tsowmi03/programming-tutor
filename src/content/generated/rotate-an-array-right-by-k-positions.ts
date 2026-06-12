import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "rotate-an-array-right-by-k-positions",
  title: "Rotate Array Right",
  difficulty: "easy",
  category: "foundations",
  order: 1011,
  description: `Given an integer array \`nums\` and a non-negative integer \`k\`, rotate the array to the **right** by \`k\` positions and return the resulting array.

Rotating right by 1 step moves the **last** element to the **front** of the array.

\`\`\`text
Example 1:
Input:  nums = [1, 2, 3, 4, 5], k = 2
Output: [4, 5, 1, 2, 3]
Explanation: After 1 right rotation -> [5, 1, 2, 3, 4]
             After 2 right rotations -> [4, 5, 1, 2, 3]
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [1, 2, 3], k = 1
Output: [3, 1, 2]
Explanation: The last element (3) wraps around to the front.
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 1000\`
- \`-10^4 <= nums[i] <= 10^4\`
- \`0 <= k <= 10^4\``,
  hints: [
    `What should happen when k equals the length of the array? Try a few small examples by hand.`,
    `When k >= n, rotating by k is the same as rotating by k % n. Use the modulo operator to reduce k.`,
    `After a right rotation by k steps, the last k elements appear at the front. Can you split the array into two parts and concatenate them in swapped order?`,
  ],
  signature: {
    "name": "rotateArray",
    "params": [
      {
        "name": "nums",
        "type": "int[]"
      },
      {
        "name": "k",
        "type": "int"
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
          3,
          4,
          5
        ],
        2
      ],
      "expected": [
        4,
        5,
        1,
        2,
        3
      ],
      "hidden": false
    },
    {
      "input": [
        [
          1,
          2,
          3
        ],
        1
      ],
      "expected": [
        3,
        1,
        2
      ],
      "hidden": false
    },
    {
      "input": [
        [
          1,
          2,
          3
        ],
        0
      ],
      "expected": [
        1,
        2,
        3
      ],
      "hidden": false
    },
    {
      "input": [
        [
          1
        ],
        5
      ],
      "expected": [
        1
      ],
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
        ],
        5
      ],
      "expected": [
        1,
        2,
        3,
        4,
        5
      ],
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
        ],
        7
      ],
      "expected": [
        4,
        5,
        1,
        2,
        3
      ],
      "hidden": true
    },
    {
      "input": [
        [
          -1,
          -2,
          -3,
          -4,
          -5
        ],
        3
      ],
      "expected": [
        -3,
        -4,
        -5,
        -1,
        -2
      ],
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2
        ],
        3
      ],
      "expected": [
        2,
        1
      ],
      "hidden": true
    },
    {
      "input": [
        [],
        3
      ],
      "expected": [],
      "hidden": true
    }
  ],
  starterCode: {
    python: `def rotate_array(nums, k):
    # TODO: rotate nums to the right by k positions
    return []
`,
    javascript: `function rotateArray(nums, k) {
    // TODO: rotate nums to the right by k positions
    return [];
}
`,
    typescript: `function rotateArray(nums: number[], k: number): number[] {
    // TODO: rotate nums to the right by k positions
    return [];
}`,
    java: `class Solution {
    public int[] rotateArray(int[] nums, int k) {
        // TODO: rotate nums to the right by k positions
        return new int[0];
    }
}
`,
    csharp: `public class Solution {
    public int[] RotateArray(int[] nums, int k) {
        // TODO: rotate nums to the right by k positions
        return new int[0];
    }
}`,
    c: `int* rotateArray(int* nums, int numsSize, int k, int* returnSize) {
    // TODO: rotate nums to the right by k positions
    *returnSize = 0;
    return NULL;
}
`,
    cpp: `class Solution {
public:
    vector<int> rotateArray(vector<int>& nums, int k) {
        // TODO: rotate nums to the right by k positions
        return {};
    }
};`,
  },
  solutions: {
    python: `def rotate_array(nums, k):
    n = len(nums)
    if n == 0:
        return []
    k = k % n
    if k == 0:
        return nums[:]
    return nums[n - k:] + nums[:n - k]
`,
    javascript: `function rotateArray(nums, k) {
    const n = nums.length;
    if (n === 0) return [];
    k = k % n;
    if (k === 0) return nums.slice();
    return [...nums.slice(n - k), ...nums.slice(0, n - k)];
}
`,
    typescript: `function rotateArray(nums: number[], k: number): number[] {
    const n = nums.length;
    if (n === 0) return [];
    k = k % n;
    if (k === 0) return nums.slice();
    return [...nums.slice(n - k), ...nums.slice(0, n - k)];
}`,
    java: `class Solution {
    public int[] rotateArray(int[] nums, int k) {
        int n = nums.length;
        if (n == 0) return new int[0];
        k = k % n;
        int[] result = new int[n];
        for (int i = 0; i < n; i++) {
            result[(i + k) % n] = nums[i];
        }
        return result;
    }
}
`,
    csharp: `public class Solution {
    public int[] RotateArray(int[] nums, int k) {
        int n = nums.Length;
        if (n == 0) return new int[0];
        k = k % n;
        int[] result = new int[n];
        for (int i = 0; i < n; i++) {
            result[(i + k) % n] = nums[i];
        }
        return result;
    }
}`,
    c: `#include <stdlib.h>
int* rotateArray(int* nums, int numsSize, int k, int* returnSize) {
    *returnSize = numsSize;
    if (numsSize == 0) return NULL;
    k = k % numsSize;
    int* result = (int*)malloc(numsSize * sizeof(int));
    for (int i = 0; i < numsSize; i++) {
        result[(i + k) % numsSize] = nums[i];
    }
    return result;
}
`,
    cpp: `class Solution {
public:
    vector<int> rotateArray(vector<int>& nums, int k) {
        int n = nums.size();
        if (n == 0) return {};
        k = k % n;
        vector<int> result(n);
        for (int i = 0; i < n; i++) {
            result[(i + k) % n] = nums[i];
        }
        return result;
    }
};`,
  },
  editorial: `## Approach: Slice and Concatenate (or Index Mapping)

**Key Insight:** After rotating right by \`k\` steps, the last \`k % n\` elements move to the front and the remaining \`n - (k % n)\` elements shift to the back. When \`k >= n\`, a full revolution returns the array to its original state, so reducing \`k\` with modulo handles all large values.

**Algorithm (slice approach, Python/JS):**
1. Handle the empty array edge case.
2. Compute \`k = k % n\`. If \`k == 0\`, return a copy of the original array.
3. Return the concatenation of \`nums[n-k:]\` and \`nums[:n-k]\`.

**Example:** \`nums = [1,2,3,4,5]\`, \`k = 7\`
- Reduced: \`k = 7 % 5 = 2\`
- Tail slice: \`[4, 5]\`
- Head slice: \`[1, 2, 3]\`
- Result: \`[4, 5, 1, 2, 3]\`

**Alternative (index mapping, Java/C):** Element at original index \`i\` lands at index \`(i + k) % n\` in the result:
\`\`\`
result[(i + k) % n] = nums[i]
\`\`\`

**Complexity:**
- Time: O(n) — each element is placed exactly once.
- Space: O(n) — a new output array of size n is allocated.`,
};

export default problem;
