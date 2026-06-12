import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "sort-an-array-of-0s-1s-and-2s-in-place-dutch-national-flag",
  title: "Sort Colors",
  difficulty: "medium",
  category: "two-pointers",
  order: 1070,
  description: `Given an array \`nums\` containing only \`0\`s, \`1\`s, and \`2\`s, sort the array **in-place** in non-decreasing order and return it.

Use the **Dutch National Flag algorithm** — a single-pass, O(1)-space approach with three pointers — rather than a standard library sort.

\`\`\`text
Example 1:
Input:  nums = [2, 0, 2, 1, 1, 0]
Output: [0, 0, 1, 1, 2, 2]

Example 2:
Input:  nums = [2, 0, 1]
Output: [0, 1, 2]
\`\`\`

**Constraints:**
- \`0 <= nums.length <= 300\`
- Each \`nums[i]\` is \`0\`, \`1\`, or \`2\``,
  hints: [
    `Divide the array conceptually into four regions: confirmed 0s | confirmed 1s | unexplored | confirmed 2s. Maintain three pointers \`low\`, \`mid\`, \`high\` as region boundaries.`,
    `Walk \`mid\` from left to right while \`mid <= high\`. When \`nums[mid]\` is 0, swap it with \`nums[low]\` and advance both \`low\` and \`mid\`. When it is 1, just advance \`mid\`.`,
    `When \`nums[mid]\` is 2, swap it with \`nums[high]\` and decrement \`high\` only — do NOT advance \`mid\`, because the element that just arrived at \`mid\` is still unexplored.`,
  ],
  signature: {
    "name": "sortColors",
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
          2,
          0,
          2,
          1,
          1,
          0
        ]
      ],
      "expected": [
        0,
        0,
        1,
        1,
        2,
        2
      ],
      "hidden": false
    },
    {
      "input": [
        [
          2,
          0,
          1
        ]
      ],
      "expected": [
        0,
        1,
        2
      ],
      "hidden": false
    },
    {
      "input": [
        [
          0
        ]
      ],
      "expected": [
        0
      ],
      "hidden": true
    },
    {
      "input": [
        [
          1,
          1,
          1
        ]
      ],
      "expected": [
        1,
        1,
        1
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
          2,
          2,
          2
        ]
      ],
      "expected": [
        2,
        2,
        2
      ],
      "hidden": true
    },
    {
      "input": [
        [
          1,
          0
        ]
      ],
      "expected": [
        0,
        1
      ],
      "hidden": true
    },
    {
      "input": [
        [
          0,
          1,
          2,
          0,
          1,
          2
        ]
      ],
      "expected": [
        0,
        0,
        1,
        1,
        2,
        2
      ],
      "hidden": true
    },
    {
      "input": [
        [
          2,
          1,
          0
        ]
      ],
      "expected": [
        0,
        1,
        2
      ],
      "hidden": true
    },
    {
      "input": [
        []
      ],
      "expected": [],
      "hidden": true
    }
  ],
  starterCode: {
    python: `def sort_colors(nums):
    # TODO: implement the Dutch National Flag algorithm
    return []
`,
    javascript: `function sortColors(nums) {
    // TODO: implement the Dutch National Flag algorithm
    return [];
}
`,
    typescript: `function sortColors(nums: number[]): number[] {
    // TODO: implement the Dutch National Flag algorithm
    return [];
}`,
    java: `class Solution {
    public int[] sortColors(int[] nums) {
        // TODO: implement the Dutch National Flag algorithm
        return new int[]{};
    }
}
`,
    csharp: `public class Solution {
    public int[] SortColors(int[] nums) {
        // TODO: implement the Dutch National Flag algorithm
        return new int[]{};
    }
}`,
    c: `int* sortColors(int* nums, int numsSize, int* returnSize) {
    // TODO: implement the Dutch National Flag algorithm
    *returnSize = 0;
    return NULL;
}
`,
    cpp: `class Solution {
public:
    vector<int> sortColors(vector<int>& nums) {
        // TODO: implement the Dutch National Flag algorithm
        return {};
    }
};`,
  },
  solutions: {
    python: `def sort_colors(nums):
    low, mid, high = 0, 0, len(nums) - 1
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1
    return nums
`,
    javascript: `function sortColors(nums) {
    let low = 0, mid = 0, high = nums.length - 1;
    while (mid <= high) {
        if (nums[mid] === 0) {
            let tmp = nums[low];
            nums[low] = nums[mid];
            nums[mid] = tmp;
            low++;
            mid++;
        } else if (nums[mid] === 1) {
            mid++;
        } else {
            let tmp = nums[mid];
            nums[mid] = nums[high];
            nums[high] = tmp;
            high--;
        }
    }
    return nums;
}
`,
    typescript: `function sortColors(nums: number[]): number[] {
    let low = 0, mid = 0, high = nums.length - 1;
    while (mid <= high) {
        if (nums[mid] === 0) {
            let tmp = nums[low];
            nums[low] = nums[mid];
            nums[mid] = tmp;
            low++;
            mid++;
        } else if (nums[mid] === 1) {
            mid++;
        } else {
            let tmp = nums[mid];
            nums[mid] = nums[high];
            nums[high] = tmp;
            high--;
        }
    }
    return nums;
}`,
    java: `class Solution {
    public int[] sortColors(int[] nums) {
        int low = 0, mid = 0, high = nums.length - 1;
        while (mid <= high) {
            if (nums[mid] == 0) {
                int tmp = nums[low];
                nums[low] = nums[mid];
                nums[mid] = tmp;
                low++;
                mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                int tmp = nums[mid];
                nums[mid] = nums[high];
                nums[high] = tmp;
                high--;
            }
        }
        return nums;
    }
}
`,
    csharp: `public class Solution {
    public int[] SortColors(int[] nums) {
        int low = 0, mid = 0, high = nums.Length - 1;
        while (mid <= high) {
            if (nums[mid] == 0) {
                int tmp = nums[low];
                nums[low] = nums[mid];
                nums[mid] = tmp;
                low++;
                mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                int tmp = nums[mid];
                nums[mid] = nums[high];
                nums[high] = tmp;
                high--;
            }
        }
        return nums;
    }
}`,
    c: `#include <stdlib.h>
int* sortColors(int* nums, int numsSize, int* returnSize) {
    *returnSize = numsSize;
    if (numsSize == 0) {
        return NULL;
    }
    int low = 0, mid = 0, high = numsSize - 1;
    while (mid <= high) {
        if (nums[mid] == 0) {
            int tmp = nums[low];
            nums[low] = nums[mid];
            nums[mid] = tmp;
            low++;
            mid++;
        } else if (nums[mid] == 1) {
            mid++;
        } else {
            int tmp = nums[mid];
            nums[mid] = nums[high];
            nums[high] = tmp;
            high--;
        }
    }
    int* result = (int*)malloc(numsSize * sizeof(int));
    for (int i = 0; i < numsSize; i++) result[i] = nums[i];
    return result;
}
`,
    cpp: `class Solution {
public:
    vector<int> sortColors(vector<int>& nums) {
        int low = 0, mid = 0, high = (int)nums.size() - 1;
        while (mid <= high) {
            if (nums[mid] == 0) {
                int tmp = nums[low];
                nums[low] = nums[mid];
                nums[mid] = tmp;
                low++;
                mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                int tmp = nums[mid];
                nums[mid] = nums[high];
                nums[high] = tmp;
                high--;
            }
        }
        return nums;
    }
};`,
  },
  editorial: `## Dutch National Flag Algorithm

### Approach

Maintain three pointers that partition the array into four zones:

\`\`\`
[ 0s | 1s | unexplored | 2s ]
       ^   ^             ^
      low mid           high
\`\`\`

Initialise \`low = mid = 0\`, \`high = n − 1\`. Iterate while \`mid <= high\`:

| \`nums[mid]\` | Action |
|---|---|
| \`0\` | Swap \`nums[low]\` ↔ \`nums[mid]\`, then \`low++\`, \`mid++\` |
| \`1\` | \`mid++\` |
| \`2\` | Swap \`nums[mid]\` ↔ \`nums[high]\`, then \`high--\` (do **not** advance \`mid\`) |

When we swap a \`2\` with \`high\`, the element arriving at \`mid\` came from the unexplored region and must still be examined.

### Worked trace — \`[2, 0, 2, 1, 1, 0]\`

\`\`\`
low mid high  array
 0   0   5    [2,0,2,1,1,0]  nums[0]=2 → swap(0,5), high=4  → [0,0,2,1,1,2]
 0   0   4    [0,0,2,1,1,2]  nums[0]=0 → swap(0,0), low=1,mid=1
 1   1   4    [0,0,2,1,1,2]  nums[1]=0 → swap(1,1), low=2,mid=2
 2   2   4    [0,0,2,1,1,2]  nums[2]=2 → swap(2,4), high=3  → [0,0,1,1,2,2]
 2   2   3    [0,0,1,1,2,2]  nums[2]=1 → mid=3
 2   3   3    [0,0,1,1,2,2]  nums[3]=1 → mid=4  (mid>high → stop)
\`\`\`

Result: \`[0, 0, 1, 1, 2, 2]\`

### Complexity

- **Time:** O(n) — each element is visited at most once.
- **Space:** O(1) — fully in-place.`,
};

export default problem;
