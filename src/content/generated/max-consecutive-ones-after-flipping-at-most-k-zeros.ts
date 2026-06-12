import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "max-consecutive-ones-after-flipping-at-most-k-zeros",
  title: "Max Consecutive Ones After Flipping At Most K Zeros",
  difficulty: "medium",
  category: "sliding-window",
  order: 1106,
  description: `Given a binary array \`nums\` and an integer \`k\`, return the maximum number of consecutive \`1\`s in the array if you can flip at most \`k\` \`0\`s to \`1\`s.

\`\`\`text
Example 1:
Input:  nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
Output: 6
Explanation: The longest subarray with at most 2 zeros is
             nums[3..9] = [0,0,0,1,1,1,1] — no wait,
             nums[4..9] (flip indices 4,5) gives length 6,
             or nums[0..5] with 3 zeros is invalid.
             Best valid window has length 6.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3
Output: 10
Explanation: Flip three 0s; the best window spans indices 4..13 (length 10).
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 10^5\`
- \`nums[i]\` is either \`0\` or \`1\`
- \`0 <= k <= nums.length\``,
  hints: [
    `Think of the problem as: find the longest subarray that contains at most k zeros.`,
    `Use two pointers (left and right) to maintain a sliding window. Expand right, and shrink left whenever the number of zeros in the window exceeds k.`,
    `Track the count of zeros inside the current window. When zeros > k, move the left pointer until zeros <= k again, then update the maximum window length.`,
  ],
  signature: {
    "name": "longestOnes",
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
    "returns": "int",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        [
          1,
          1,
          1,
          0,
          0,
          0,
          1,
          1,
          1,
          1,
          0
        ],
        2
      ],
      "expected": 6,
      "hidden": false
    },
    {
      "input": [
        [
          0,
          0,
          1,
          1,
          0,
          0,
          1,
          1,
          1,
          0,
          1,
          1,
          0,
          0,
          0,
          1,
          1,
          1,
          1
        ],
        3
      ],
      "expected": 10,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          1,
          1,
          1,
          1
        ],
        0
      ],
      "expected": 5,
      "hidden": false
    },
    {
      "input": [
        [
          0,
          0,
          0,
          0
        ],
        4
      ],
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        [
          0,
          0,
          0,
          0
        ],
        0
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          1
        ],
        0
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          0
        ],
        1
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0,
          1,
          0
        ],
        3
      ],
      "expected": 7,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          1,
          0,
          0,
          1,
          1,
          1,
          0,
          1,
          1
        ],
        1
      ],
      "expected": 6,
      "hidden": true
    },
    {
      "input": [
        [
          0,
          1,
          1,
          1,
          0,
          1,
          1,
          0,
          1
        ],
        2
      ],
      "expected": 8,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def longest_ones(nums: list[int], k: int) -> int:
    # TODO: implement sliding window
    return 0
`,
    javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function longestOnes(nums, k) {
    // TODO: implement sliding window
    return 0;
}
`,
    java: `class Solution {
    public int longestOnes(int[] nums, int k) {
        // TODO: implement sliding window
        return 0;
    }
}
`,
    c: `int longestOnes(int* nums, int numsSize, int k) {
    // TODO: implement sliding window
    return 0;
}
`,
  },
  solutions: {
    python: `def longest_ones(nums: list[int], k: int) -> int:
    left = 0
    zeros = 0
    best = 0
    for right in range(len(nums)):
        if nums[right] == 0:
            zeros += 1
        while zeros > k:
            if nums[left] == 0:
                zeros -= 1
            left += 1
        best = max(best, right - left + 1)
    return best
`,
    javascript: `function longestOnes(nums, k) {
    let left = 0, zeros = 0, best = 0;
    for (let right = 0; right < nums.length; right++) {
        if (nums[right] === 0) zeros++;
        while (zeros > k) {
            if (nums[left] === 0) zeros--;
            left++;
        }
        best = Math.max(best, right - left + 1);
    }
    return best;
}
`,
    java: `class Solution {
    public int longestOnes(int[] nums, int k) {
        int left = 0, zeros = 0, best = 0;
        for (int right = 0; right < nums.length; right++) {
            if (nums[right] == 0) zeros++;
            while (zeros > k) {
                if (nums[left] == 0) zeros--;
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}
`,
    c: `int longestOnes(int* nums, int numsSize, int k) {
    int left = 0, zeros = 0, best = 0;
    for (int right = 0; right < numsSize; right++) {
        if (nums[right] == 0) zeros++;
        while (zeros > k) {
            if (nums[left] == 0) zeros--;
            left++;
        }
        int len = right - left + 1;
        if (len > best) best = len;
    }
    return best;
}
`,
  },
  editorial: `## Approach: Sliding Window (Two Pointers)

### Intuition
The problem reduces to: **find the longest contiguous subarray containing at most \`k\` zeros**. We maintain a window \`[left, right]\` and track how many zeros it contains.

### Algorithm
1. Initialize \`left = 0\`, \`zeros = 0\`, \`best = 0\`.
2. Iterate \`right\` from \`0\` to \`n-1\`:
   - If \`nums[right] == 0\`, increment \`zeros\`.
   - While \`zeros > k\`, shrink the window from the left:
     - If \`nums[left] == 0\`, decrement \`zeros\`.
     - Increment \`left\`.
   - Update \`best = max(best, right - left + 1)\`.
3. Return \`best\`.

### Why it works
At every step the window \`[left, right]\` is the longest valid window ending at \`right\` (at most \`k\` zeros). We never need to shrink it to less than the current best, so the answer is always captured.

### Complexity
- **Time:** O(n) — each element is visited at most twice (once by \`right\`, once by \`left\`).
- **Space:** O(1) — only a handful of integer variables.`,
};

export default problem;
