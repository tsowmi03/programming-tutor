import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-pairs-with-equal-values-in-an-array",
  title: "Count Equal Pairs",
  difficulty: "easy",
  category: "arrays-hashing",
  order: 1050,
  description: `Given an integer array \`nums\`, return the number of pairs \`(i, j)\` where \`i < j\` and \`nums[i] == nums[j]\`.

\`\`\`text
Example 1:
Input:  nums = [1, 2, 3, 1, 2, 1]
Output: 4
Explanation:
  Value 1 appears 3 times → C(3,2) = 3 pairs: (0,3), (0,5), (3,5)
  Value 2 appears 2 times → C(2,2) = 1 pair:  (1,4)
  Total = 4
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [1, 1, 1, 1]
Output: 6
Explanation:
  Value 1 appears 4 times → C(4,2) = 6 pairs.
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 1000\`
- \`-10^4 <= nums[i] <= 10^4\``,
  hints: [
    `How many pairs can you form from k identical elements? Think combinations.`,
    `If a value appears k times, the number of valid pairs is k*(k-1)/2.`,
    `Count the frequency of each distinct value first, then apply the formula to each frequency.`,
  ],
  signature: {
    "name": "countEqualPairs",
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
          1,
          2,
          1
        ]
      ],
      "expected": 4,
      "hidden": false
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
      "expected": 6,
      "hidden": false
    },
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
          5
        ]
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          3,
          3
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
          2,
          2,
          3,
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
          -1,
          0,
          0,
          1
        ]
      ],
      "expected": 2,
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
      "expected": 10,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          1,
          2,
          1,
          2
        ]
      ],
      "expected": 6,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_equal_pairs(nums):
    # TODO: implement
    return 0
`,
    javascript: `function countEqualPairs(nums) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function countEqualPairs(nums: number[]): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int countEqualPairs(int[] nums) {
        // TODO: implement
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int CountEqualPairs(int[] nums) {
        // TODO: implement
        return 0;
    }
}`,
    c: `int countEqualPairs(int* nums, int numsSize) {
    // TODO: implement
    return 0;
}
`,
    cpp: `class Solution {
public:
    int countEqualPairs(vector<int>& nums) {
        // TODO: implement
        return 0;
    }
};`,
  },
  solutions: {
    python: `def count_equal_pairs(nums):
    freq = {}
    for n in nums:
        freq[n] = freq.get(n, 0) + 1
    result = 0
    for f in freq.values():
        result += f * (f - 1) // 2
    return result
`,
    javascript: `function countEqualPairs(nums) {
    const freq = {};
    for (const n of nums) {
        freq[n] = (freq[n] || 0) + 1;
    }
    let result = 0;
    for (const f of Object.values(freq)) {
        result += f * (f - 1) / 2;
    }
    return result;
}
`,
    typescript: `function countEqualPairs(nums: number[]): number {
    const freq: {[key: number]: number} = {};
    for (const n of nums) {
        freq[n] = (freq[n] || 0) + 1;
    }
    let result = 0;
    for (const f of Object.values(freq)) {
        result += f * (f - 1) / 2;
    }
    return result;
}`,
    java: `class Solution {
    public int countEqualPairs(int[] nums) {
        int[] freq = new int[20001];
        for (int n : nums) {
            freq[n + 10000]++;
        }
        int result = 0;
        for (int f : freq) {
            result += f * (f - 1) / 2;
        }
        return result;
    }
}
`,
    csharp: `using System.Collections.Generic;

public class Solution {
    public int CountEqualPairs(int[] nums) {
        int[] freq = new int[20001];
        foreach (int n in nums) {
            freq[n + 10000]++;
        }
        int result = 0;
        foreach (int f in freq) {
            result += f * (f - 1) / 2;
        }
        return result;
    }
}`,
    c: `int countEqualPairs(int* nums, int numsSize) {
    int result = 0;
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[i] == nums[j]) {
                result++;
            }
        }
    }
    return result;
}
`,
    cpp: `class Solution {
public:
    int countEqualPairs(vector<int>& nums) {
        int freq[20001] = {0};
        for (int n : nums) {
            freq[n + 10000]++;
        }
        int result = 0;
        for (int f : freq) {
            result += f * (f - 1) / 2;
        }
        return result;
    }
};`,
  },
  editorial: `## Approach: Frequency Counting

**Key insight:** If a particular value appears \`k\` times in the array, the number of pairs \`(i, j)\` with \`i < j\` that share that value is the combination C(k, 2) = k*(k-1)/2. Count frequencies first, then apply this formula to each distinct value.

**Algorithm:**
1. Build a frequency map over \`nums\`.
2. For each frequency \`f\`, add \`f*(f-1)/2\` to the answer.
3. Return the total.

**Example trace for \`[1, 2, 3, 1, 2, 1]\`:**
- freq: {1→3, 2→2, 3→1}
- Contributions: 3*2/2 = 3, 2*1/2 = 1, 1*0/2 = 0
- Total = **4**

**Complexity:**
- Time: O(n) — one pass to count, one pass over distinct values.
- Space: O(n) — frequency map holds at most n entries.

The Java solution uses an array of size 20001 (shifting by 10000 to handle negatives) to avoid needing HashMap imports. The C solution uses a straightforward O(n²) brute-force double loop, which is correct and efficient enough for n ≤ 1000.`,
};

export default problem;
