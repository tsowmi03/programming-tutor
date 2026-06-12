import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "minimum-in-a-rotated-sorted-array",
  title: "Minimum in a Rotated Sorted Array",
  difficulty: "medium",
  category: "binary-search",
  order: 1092,
  description: `A sorted array of **distinct** integers was rotated at an unknown pivot index. For example, \`[1,2,3,4,5]\` might become \`[3,4,5,1,2]\`.

Given the rotated array \`nums\`, return the **minimum** element.

You must write an algorithm that runs in **O(log n)** time.

\`\`\`text
Example 1:
Input:  nums = [3,4,5,1,2]
Output: 1
Explanation: The original sorted array was [1,2,3,4,5] rotated at index 3.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [4,5,6,7,0,1,2]
Output: 0
Explanation: The original sorted array was [0,1,2,4,5,6,7] rotated at index 4.
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [1]
Output: 1
Explanation: A single-element array is already sorted; the minimum is that element.
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 5000\`
- \`-5000 <= nums[i] <= 5000\`
- All integers in \`nums\` are **distinct**.
- \`nums\` is sorted and rotated between \`1\` and \`n\` times.`,
  hints: [
    `Think about how binary search can determine which half of the array contains the rotation point.`,
    `If nums[mid] > nums[right], the minimum must be in the right half. Otherwise, it is in the left half (including mid).`,
    `Keep narrowing the search window until left == right — that index holds the minimum.`,
  ],
  signature: {
    "name": "findMin",
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
          3,
          4,
          5,
          1,
          2
        ]
      ],
      "expected": 1,
      "hidden": false
    },
    {
      "input": [
        [
          4,
          5,
          6,
          7,
          0,
          1,
          2
        ]
      ],
      "expected": 0,
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
          2,
          1
        ]
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
          5
        ]
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          5,
          1,
          2,
          3,
          4
        ]
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          -1,
          0,
          2,
          4,
          -5
        ]
      ],
      "expected": -5,
      "hidden": true
    },
    {
      "input": [
        [
          11,
          13,
          15,
          17
        ]
      ],
      "expected": 11,
      "hidden": true
    },
    {
      "input": [
        [
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          1,
          2
        ]
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          -5,
          -4,
          -3,
          -2,
          -1
        ]
      ],
      "expected": -5,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def find_min(nums):
    # TODO: implement binary search
    pass
`,
    javascript: `function findMin(nums) {
    // TODO: implement binary search
}
`,
    typescript: `function findMin(nums: number[]): number {
    // TODO: implement binary search
    return 0;
}`,
    java: `class Solution {
    public int findMin(int[] nums) {
        // TODO: implement binary search
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int FindMin(int[] nums) {
        // TODO: implement binary search
        return 0;
    }
}`,
    c: `int findMin(int* nums, int numsSize) {
    // TODO: implement binary search
    return 0;
}
`,
    cpp: `class Solution {
public:
    int findMin(vector<int>& nums) {
        // TODO: implement binary search
        return 0;
    }
};`,
  },
  solutions: {
    python: `def find_min(nums):
    left, right = 0, len(nums) - 1
    while left < right:
        mid = (left + right) // 2
        if nums[mid] > nums[right]:
            left = mid + 1
        else:
            right = mid
    return nums[left]
`,
    javascript: `function findMin(nums) {
    let left = 0, right = nums.length - 1;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return nums[left];
}
`,
    typescript: `function findMin(nums: number[]): number {
    let left = 0, right = nums.length - 1;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return nums[left];
}`,
    java: `class Solution {
    public int findMin(int[] nums) {
        int left = 0, right = nums.length - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] > nums[right]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return nums[left];
    }
}
`,
    csharp: `public class Solution {
    public int FindMin(int[] nums) {
        int left = 0, right = nums.Length - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] > nums[right]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return nums[left];
    }
}`,
    c: `int findMin(int* nums, int numsSize) {
    int left = 0, right = numsSize - 1;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return nums[left];
}
`,
    cpp: `class Solution {
public:
    int findMin(vector<int>& nums) {
        int left = 0, right = (int)nums.size() - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] > nums[right]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return nums[left];
    }
};`,
  },
  editorial: `## Approach: Binary Search on the Rotation Point

### Key Insight
In a rotated sorted array, the minimum element is right at the **rotation point** — the only place where the order "resets" from a larger value back to a smaller one.

We can find it with binary search by comparing \`nums[mid]\` with \`nums[right]\`:

- **If \`nums[mid] > nums[right]\`**: the array is not sorted in \`[mid, right]\`, so the minimum lies in the right half → \`left = mid + 1\`.
- **Otherwise (\`nums[mid] <= nums[right]\`)**: the right half is fully sorted, so the minimum is somewhere in \`[left, mid]\` → \`right = mid\`.

When \`left == right\`, we've found the minimum.

### Example Walkthrough
\`nums = [4, 5, 6, 7, 0, 1, 2]\`, indices 0–6.

| Iteration | left | right | mid | nums[mid] | nums[right] | Action |
|-----------|------|-------|-----|-----------|-------------|--------|
| 1 | 0 | 6 | 3 | 7 | 2 | 7 > 2 → left = 4 |
| 2 | 4 | 6 | 5 | 1 | 2 | 1 ≤ 2 → right = 5 |
| 3 | 4 | 5 | 4 | 0 | 1 | 0 ≤ 1 → right = 4 |
| Done | 4 | 4 | — | — | — | return nums[4] = **0** |

### Complexity
- **Time**: O(log n) — the search window halves each iteration.
- **Space**: O(1) — only pointer variables are used.`,
};

export default problem;
