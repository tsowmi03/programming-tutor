import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "find-the-first-one-in-a-sorted-binary-array",
  title: "First One in Sorted Binary Array",
  difficulty: "easy",
  category: "binary-search",
  order: 1024,
  description: `You are given a **sorted** binary array \`nums\` containing only \`0\`s and \`1\`s, where all \`0\`s appear before all \`1\`s.

Return the **index** of the first \`1\` in the array. If there is no \`1\`, return \`-1\`.

You must solve this in **O(log n)** time.

\`\`\`text
Example 1:
Input:  nums = [0, 0, 0, 1, 1, 1]
Output: 3
Explanation: The first 1 appears at index 3.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [0, 0, 0, 0, 0]
Output: -1
Explanation: There are no 1s in the array.
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [1, 1, 1]
Output: 0
Explanation: The first 1 appears at index 0.
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 10^5\`
- \`nums[i]\` is either \`0\` or \`1\`
- \`nums\` is sorted in non-decreasing order`,
  hints: [
    `Since the array is sorted (all 0s then all 1s), binary search can efficiently find the boundary.`,
    `Think about what condition moves your search left vs right: if nums[mid] == 1, the answer could be mid or something earlier; if nums[mid] == 0, the answer must be to the right.`,
  ],
  guidance: [
    {
      "title": "Recognize the search target",
      "body": "You are looking for the leftmost position where the value changes from 0 to 1. Binary search works well when you can eliminate half the search space at each step based on a comparison.",
      "level": "nudge"
    },
    {
      "title": "Decide how to move the boundaries",
      "body": "Use `lo` and `hi` pointers. At each step:\n- If `nums[mid] == 0`, the first 1 must be to the **right**, so move `lo = mid + 1`.\n- If `nums[mid] == 1`, this could be the first 1, or there might be an earlier one, so move `hi = mid`.",
      "level": "strategy"
    },
    {
      "title": "Termination and result",
      "body": "Loop while `lo < hi`. When the loop ends, `lo == hi`. Check if `nums[lo] == 1` — if yes, return `lo`; otherwise return `-1`.",
      "level": "strategy"
    },
    {
      "title": "Pitfall: out-of-bounds",
      "body": "If the array is all zeros, `lo` will end up at `nums.length - 1` and `nums[lo]` will be `0`, so the `-1` fallback handles this case correctly without any special logic.",
      "level": "pitfall"
    }
  ],

  signature: {
    "name": "firstOne",
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
          0,
          0,
          0,
          1,
          1,
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
          0,
          0,
          0,
          0
        ]
      ],
      "expected": -1,
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
      "expected": 0,
      "hidden": false
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
      "expected": -1,
      "hidden": true
    },
    {
      "input": [
        [
          0,
          0,
          0,
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
          1,
          1,
          1,
          1
        ]
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          0,
          0,
          1,
          1,
          1,
          1,
          1,
          1
        ]
      ],
      "expected": 2,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def first_one(nums):
    # TODO: implement binary search to find first 1
    pass`,
    javascript: `function firstOne(nums) {
    // TODO: implement binary search to find first 1
}`,
    typescript: `function firstOne(nums: number[]): number {
    // TODO: implement binary search to find first 1
    return -1;
}`,
    java: `class Solution {
    public int firstOne(int[] nums) {
        // TODO: implement binary search to find first 1
        return -1;
    }
}`,
    csharp: `public class Solution {
    public int FirstOne(int[] nums) {
        // TODO: implement binary search to find first 1
        return -1;
    }
}`,
    c: `int firstOne(int* nums, int numsSize) {
    // TODO: implement binary search to find first 1
    return -1;
}`,
    cpp: `class Solution {
public:
    int firstOne(vector<int>& nums) {
        // TODO: implement binary search to find first 1
        return -1;
    }
};`,
  },
  solutions: {
    python: `def first_one(nums):
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] == 0:
            lo = mid + 1
        else:
            hi = mid
    return lo if nums[lo] == 1 else -1`,
    javascript: `function firstOne(nums) {
    let lo = 0, hi = nums.length - 1;
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (nums[mid] === 0) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    return nums[lo] === 1 ? lo : -1;
}`,
    typescript: `function firstOne(nums: number[]): number {
    let lo = 0, hi = nums.length - 1;
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (nums[mid] === 0) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    return nums[lo] === 1 ? lo : -1;
}`,
    java: `class Solution {
    public int firstOne(int[] nums) {
        int lo = 0, hi = nums.length - 1;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (nums[mid] == 0) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return nums[lo] == 1 ? lo : -1;
    }
}`,
    csharp: `public class Solution {
    public int FirstOne(int[] nums) {
        int lo = 0, hi = nums.Length - 1;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (nums[mid] == 0) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return nums[lo] == 1 ? lo : -1;
    }
}`,
    c: `int firstOne(int* nums, int numsSize) {
    int lo = 0, hi = numsSize - 1;
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        if (nums[mid] == 0) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    return nums[lo] == 1 ? lo : -1;
}`,
    cpp: `class Solution {
public:
    int firstOne(vector<int>& nums) {
        int lo = 0, hi = (int)nums.size() - 1;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (nums[mid] == 0) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return nums[lo] == 1 ? lo : -1;
    }
};`,
  },
  editorial: `## Approach: Binary Search on the Boundary

### Intuition
Because the array is sorted — all \`0\`s come before all \`1\`s — there is a single boundary index where values switch from \`0\` to \`1\`. Binary search can locate this boundary in **O(log n)** time.

### Algorithm
1. Initialize \`lo = 0\`, \`hi = n - 1\`.
2. While \`lo < hi\`:
   - Compute \`mid = (lo + hi) / 2\`.
   - If \`nums[mid] == 0\`, the first \`1\` must be strictly to the right: set \`lo = mid + 1\`.
   - Otherwise (\`nums[mid] == 1\`), this could be the first \`1\` or there may be an earlier one: set \`hi = mid\`.
3. After the loop, \`lo == hi\`. Check \`nums[lo]\`:
   - If it is \`1\`, return \`lo\`.
   - Otherwise, no \`1\` exists — return \`-1\`.

### Why it works
- Each iteration either moves \`lo\` right or \`hi\` left (or both), so the loop always terminates.
- We never exclude a position that could be the answer: setting \`hi = mid\` (not \`mid - 1\`) preserves the candidate.
- Edge cases are handled automatically: all-zeros arrays end with \`lo\` pointing at a \`0\`, triggering the \`-1\` return; all-ones arrays immediately converge to index \`0\`.

### Complexity
- **Time:** O(log n) — the search space halves each iteration.
- **Space:** O(1) — only a constant number of pointers are used.`,
};

export default problem;
