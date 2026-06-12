import type { CodeProblemDef } from "../types";

export const binarySearch: CodeProblemDef = {
  type: "code",
  slug: "binary-search",
  title: "Binary Search",
  difficulty: "easy",
  category: "binary-search",
  order: 1,
  description: `Given a **sorted (ascending)** array of distinct integers \`nums\` and an integer \`target\`, return the index of \`target\`, or \`-1\` if it is not present.

Your algorithm must run in **O(log n)** time.

**Example 1**

\`\`\`text
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
\`\`\`

**Example 2**

\`\`\`text
Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
\`\`\`

**Constraints**

- \`1 <= nums.length <= 100000\`
- All elements are distinct and sorted ascending.
`,
  hints: [
    `Compare the target with the middle element: that single comparison rules out half the array.`,
    `Maintain \`lo\` and \`hi\` as the inclusive bounds of where the target could still be, and loop while \`lo <= hi\`.`,
    `Compute the midpoint as \`lo + (hi - lo) / 2\` — in fixed-width languages \`(lo + hi) / 2\` can overflow, and getting the habit right matters.`,
  ],
  signature: {
    "name": "search",
    "params": [
      {
        "name": "nums",
        "type": "int[]"
      },
      {
        "name": "target",
        "type": "int"
      }
    ],
    "returns": "int"
  },
  testCases: [
    {
      "input": [
        [
          -1,
          0,
          3,
          5,
          9,
          12
        ],
        9
      ],
      "expected": 4
    },
    {
      "input": [
        [
          -1,
          0,
          3,
          5,
          9,
          12
        ],
        2
      ],
      "expected": -1
    },
    {
      "input": [
        [
          5
        ],
        5
      ],
      "expected": 0
    },
    {
      "input": [
        [
          5
        ],
        -5
      ],
      "expected": -1,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          3
        ],
        3
      ],
      "expected": 1,
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
        ],
        1
      ],
      "expected": 0,
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
        ],
        10
      ],
      "expected": 9,
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
        ],
        11
      ],
      "expected": -1,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def search(nums, target):
    """Return the index of target in sorted nums, or -1."""
    # Your code here
    pass
`,
    javascript: `/**
 * @param {number[]} nums sorted ascending
 * @param {number} target
 * @return {number} index of target, or -1
 */
function search(nums, target) {
  // Your code here
}
`,
    typescript: `/**
 * @param {number[]} nums sorted ascending
 * @param {number} target
 * @return {number} index of target, or -1
 */
function search(nums: number[], target: number): number {
  // Your code here
  return -1;
}`,
    java: `class Solution {
    public int search(int[] nums, int target) {
        // Your code here
        return -1;
    }
}
`,
    csharp: `public class Solution {
    public int Search(int[] nums, int target) {
        // Your code here
        return -1;
    }
}`,
    c: `int search(int* nums, int numsSize, int target) {
    // Your code here
    return -1;
}
`,
    cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        // Your code here
        return -1;
    }
};`,
  },
  solutions: {
    python: `def search(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1
`,
    javascript: `function search(nums, target) {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
`,
    typescript: `function search(nums: number[], target: number): number {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,
    java: `class Solution {
    public int search(int[] nums, int target) {
        int lo = 0, hi = nums.length - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return -1;
    }
}
`,
    csharp: `public class Solution {
    public int Search(int[] nums, int target) {
        int lo = 0, hi = nums.Length - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return -1;
    }
}`,
    c: `int search(int* nums, int numsSize, int target) {
    int lo = 0, hi = numsSize - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}
`,
    cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        int lo = 0, hi = (int)nums.size() - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return -1;
    }
};`,
  },
  editorial: `## Approach: halve the search space

Because the array is sorted, comparing \`target\` with the **middle** element
tells you which half could contain it — the other half is gone in one
comparison. Repeating this halves the candidates each round, giving
O(log n) comparisons.

Keep an inclusive window \`[lo, hi]\` of indices where the target may still
live:

- \`nums[mid] == target\` → done.
- \`nums[mid] < target\` → target can only be right of mid: \`lo = mid + 1\`.
- \`nums[mid] > target\` → \`hi = mid - 1\`.

When \`lo > hi\` the window is empty and the target isn't there.

### The classic bugs

- **Off-by-one:** using \`lo < hi\` with inclusive bounds skips a final
  candidate; \`lo <= hi\` is correct for this formulation.
- **Forgetting ±1:** setting \`lo = mid\` or \`hi = mid\` can loop forever —
  the window must strictly shrink.
- **Midpoint overflow:** in C/Java, \`(lo + hi) / 2\` can overflow for huge
  arrays; \`lo + (hi - lo) / 2\` cannot.

**Complexity:** O(log n) time, O(1) space.
`,
};
