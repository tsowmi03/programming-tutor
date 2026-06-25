import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "longest-binary-subarray-after-deleting-one-element",
  title: "Longest Binary Subarray After Deleting One Element",
  difficulty: "medium",
  category: "sliding-window",
  order: 1033,
  description: `Given a binary array \`nums\`, you must delete **exactly one** element from it.

Return the size of the longest non-empty subarray containing only \`1\`s **after** the deletion.

If no such subarray exists, return \`0\`.

\`\`\`text
Example 1:
Input:  nums = [1,1,0,1]
Output: 3
Explanation: Delete the 0 at index 2. The remaining array is [1,1,1], length 3.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [0,1,1,1,0,1,1,0,1]
Output: 5
Explanation: Delete one 0 (e.g. index 4). The window [1,1,1,0,1,1] after deletion is [1,1,1,1,1], length 5.
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [1,1,1]
Output: 2
Explanation: You must delete exactly one element, so the best you can get is 2.
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 10^5\`
- \`nums[i]\` is either \`0\` or \`1\`.`,
  hints: [
    `Think of a sliding window where you allow at most one \`0\` inside it. The length of valid \`1\`s after deleting that \`0\` is \`(window size - 1)\`.`,
    `Expand the right pointer freely; when the number of zeros in the window exceeds 1, shrink from the left until you have at most one \`0\` again.`,
    `The answer is the maximum value of \`(right - left)\` across all valid windows (subtracting 1 for the mandatory deletion).`,
  ],
  guidance: [
    {
      "title": "Reframe the problem",
      "body": "Deleting exactly one element and keeping only `1`s is equivalent to finding the longest window that contains **at most one `0`**, then subtracting 1 from its length (to account for the mandatory deletion).",
      "level": "nudge"
    },
    {
      "title": "Sliding window strategy",
      "body": "Maintain two pointers `left` and `right`. Track `zeros`, the count of `0`s in the current window. Advance `right`; if `zeros > 1`, advance `left` until `zeros <= 1`. At each step, candidate answer = `right - left` (window size minus 1 for the deleted element).",
      "level": "strategy"
    },
    {
      "title": "Why `right - left` and not `right - left + 1`?",
      "body": "The window `[left, right]` (inclusive) has size `right - left + 1`. Subtracting the one deleted element gives `right - left + 1 - 1 = right - left`. Use this value to update the maximum.",
      "level": "pitfall"
    },
    {
      "title": "Edge cases",
      "body": "• All `1`s: the window covers the whole array but you still delete one, so the answer is `n - 1`.\n• All `0`s: every window of size 1 has one `0`; after deletion the subarray of `1`s is empty, so the answer is `0`.\n• Single element: you must delete it, leaving nothing — return `0`.",
      "level": "pitfall"
    },
    {
      "title": "Pseudocode shape",
      "body": "```\nleft = 0, zeros = 0, best = 0\nfor right in 0..n-1:\n    if nums[right] == 0: zeros += 1\n    while zeros > 1:\n        if nums[left] == 0: zeros -= 1\n        left += 1\n    best = max(best, right - left)   # window_size - 1\nreturn best\n```",
      "level": "pseudocode"
    }
  ],

  signature: {
    "name": "longestSubarray",
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
          1,
          0,
          1
        ]
      ],
      "expected": 3,
      "hidden": false
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
        ]
      ],
      "expected": 5,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          1,
          1
        ]
      ],
      "expected": 2,
      "hidden": false
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
          1
        ]
      ],
      "expected": 4,
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
      "expected": 0,
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
          0
        ]
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          0,
          1,
          1,
          0,
          1,
          1,
          1
        ]
      ],
      "expected": 5,
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
          1
        ]
      ],
      "expected": 7,
      "hidden": true
    },
    {
      "input": [
        [
          0,
          1
        ]
      ],
      "expected": 1,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def longest_subarray(nums):
    # TODO: implement using a sliding window
    return 0
`,
    javascript: `function longestSubarray(nums) {
    // TODO: implement using a sliding window
    return 0;
}
`,
    typescript: `function longestSubarray(nums: number[]): number {
    // TODO: implement using a sliding window
    return 0;
}
`,
    java: `class Solution {
    public int longestSubarray(int[] nums) {
        // TODO: implement using a sliding window
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int LongestSubarray(int[] nums) {
        // TODO: implement using a sliding window
        return 0;
    }
}
`,
    c: `int longestSubarray(int* nums, int numsSize) {
    // TODO: implement using a sliding window
    return 0;
}
`,
    cpp: `class Solution {
public:
    int longestSubarray(vector<int>& nums) {
        // TODO: implement using a sliding window
        return 0;
    }
};
`,
  },
  solutions: {
    python: `def longest_subarray(nums):
    left = 0
    zeros = 0
    best = 0
    for right in range(len(nums)):
        if nums[right] == 0:
            zeros += 1
        while zeros > 1:
            if nums[left] == 0:
                zeros -= 1
            left += 1
        candidate = right - left
        if candidate > best:
            best = candidate
    return best
`,
    javascript: `function longestSubarray(nums) {
    let left = 0, zeros = 0, best = 0;
    for (let right = 0; right < nums.length; right++) {
        if (nums[right] === 0) zeros++;
        while (zeros > 1) {
            if (nums[left] === 0) zeros--;
            left++;
        }
        const candidate = right - left;
        if (candidate > best) best = candidate;
    }
    return best;
}
`,
    typescript: `function longestSubarray(nums: number[]): number {
    let left = 0, zeros = 0, best = 0;
    for (let right = 0; right < nums.length; right++) {
        if (nums[right] === 0) zeros++;
        while (zeros > 1) {
            if (nums[left] === 0) zeros--;
            left++;
        }
        const candidate = right - left;
        if (candidate > best) best = candidate;
    }
    return best;
}
`,
    java: `class Solution {
    public int longestSubarray(int[] nums) {
        int left = 0, zeros = 0, best = 0;
        for (int right = 0; right < nums.length; right++) {
            if (nums[right] == 0) zeros++;
            while (zeros > 1) {
                if (nums[left] == 0) zeros--;
                left++;
            }
            int candidate = right - left;
            if (candidate > best) best = candidate;
        }
        return best;
    }
}
`,
    csharp: `public class Solution {
    public int LongestSubarray(int[] nums) {
        int left = 0, zeros = 0, best = 0;
        for (int right = 0; right < nums.Length; right++) {
            if (nums[right] == 0) zeros++;
            while (zeros > 1) {
                if (nums[left] == 0) zeros--;
                left++;
            }
            int candidate = right - left;
            if (candidate > best) best = candidate;
        }
        return best;
    }
}
`,
    c: `int longestSubarray(int* nums, int numsSize) {
    int left = 0, zeros = 0, best = 0;
    for (int right = 0; right < numsSize; right++) {
        if (nums[right] == 0) zeros++;
        while (zeros > 1) {
            if (nums[left] == 0) zeros--;
            left++;
        }
        int candidate = right - left;
        if (candidate > best) best = candidate;
    }
    return best;
}
`,
    cpp: `class Solution {
public:
    int longestSubarray(vector<int>& nums) {
        int left = 0, zeros = 0, best = 0;
        for (int right = 0; right < (int)nums.size(); right++) {
            if (nums[right] == 0) zeros++;
            while (zeros > 1) {
                if (nums[left] == 0) zeros--;
                left++;
            }
            int candidate = right - left;
            if (candidate > best) best = candidate;
        }
        return best;
    }
};
`,
  },
  editorial: `## Approach: Sliding Window with At-Most-One-Zero

### Intuition

Deleting exactly one element and counting consecutive \`1\`s is equivalent to finding the longest subarray (contiguous window) that contains **at most one \`0\`**, then subtracting 1 from its length (to account for the mandatory deletion).

For a window \`[left, right]\` of size \`right - left + 1\` containing exactly one \`0\`, after deleting that \`0\` we get \`right - left\` ones. If the window contains no \`0\`s (all ones), we still must delete one \`1\`, leaving \`right - left\` ones. In both cases the candidate answer is \`right - left\`.

### Algorithm

\`\`\`
left = 0, zeros = 0, best = 0
for right in 0..n-1:
    if nums[right] == 0: zeros += 1
    while zeros > 1:
        if nums[left] == 0: zeros -= 1
        left += 1
    best = max(best, right - left)
return best
\`\`\`

### Correctness on Edge Cases

| Input | Window behavior | Answer |
|---|---|---|
| All \`1\`s e.g. \`[1,1,1]\` | Window grows to full array; \`zeros=0\`; \`right-left\` = n-1 | n-1 ✓ |
| All \`0\`s e.g. \`[0,0,0]\` | Window is always size 1 with 1 zero; \`right-left\` = 0 | 0 ✓ |
| Single element | \`right=left=0\`; \`right-left\` = 0 | 0 ✓ |

### Complexity

- **Time:** O(n) — each element is added and removed from the window at most once.
- **Space:** O(1) — only a few integer variables.`,
};

export default problem;
