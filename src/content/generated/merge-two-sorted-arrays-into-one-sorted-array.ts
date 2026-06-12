import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "merge-two-sorted-arrays-into-one-sorted-array",
  title: "Merge Two Sorted Arrays",
  difficulty: "easy",
  category: "two-pointers",
  order: 1062,
  description: `Given two integer arrays \`nums1\` and \`nums2\`, both sorted in **non-decreasing** order, merge them into a single sorted array in non-decreasing order and return it.

\`\`\`text
Example 1:
Input:  nums1 = [1, 3, 5], nums2 = [2, 4, 6]
Output: [1, 2, 3, 4, 5, 6]
Explanation: At each step pick the smaller front element from either array.
             1 < 2 → take 1, then 2 < 3 → take 2, etc.
\`\`\`

\`\`\`text
Example 2:
Input:  nums1 = [1, 2, 3], nums2 = [4, 5, 6]
Output: [1, 2, 3, 4, 5, 6]
Explanation: Every element of nums1 is smaller, so they all come first,
             followed by all elements of nums2.
\`\`\`

**Constraints:**
- \`0 <= nums1.length, nums2.length <= 1000\`
- \`-10^4 <= nums1[i], nums2[i] <= 10^4\`
- \`nums1\` and \`nums2\` are each sorted in non-decreasing order.`,
  hints: [
    `Keep one index for each array. At every step compare the two current elements and advance the pointer of whichever was smaller.`,
    `When one array is fully consumed, what should you do with the leftover elements of the other array?`,
    `The merged result always has exactly nums1.length + nums2.length elements — you can allocate that space upfront.`,
  ],
  signature: {
    "name": "mergeSortedArrays",
    "params": [
      {
        "name": "nums1",
        "type": "int[]"
      },
      {
        "name": "nums2",
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
          3,
          5
        ],
        [
          2,
          4,
          6
        ]
      ],
      "expected": [
        1,
        2,
        3,
        4,
        5,
        6
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
        [
          4,
          5,
          6
        ]
      ],
      "expected": [
        1,
        2,
        3,
        4,
        5,
        6
      ],
      "hidden": false
    },
    {
      "input": [
        [
          4,
          5,
          6
        ],
        [
          1,
          2,
          3
        ]
      ],
      "expected": [
        1,
        2,
        3,
        4,
        5,
        6
      ],
      "hidden": true
    },
    {
      "input": [
        [],
        [
          1,
          2,
          3
        ]
      ],
      "expected": [
        1,
        2,
        3
      ],
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          3
        ],
        []
      ],
      "expected": [
        1,
        2,
        3
      ],
      "hidden": true
    },
    {
      "input": [
        [],
        []
      ],
      "expected": [],
      "hidden": true
    },
    {
      "input": [
        [
          1,
          1,
          2
        ],
        [
          1,
          2,
          3
        ]
      ],
      "expected": [
        1,
        1,
        1,
        2,
        2,
        3
      ],
      "hidden": true
    },
    {
      "input": [
        [
          -3,
          -1,
          0
        ],
        [
          -2,
          2,
          4
        ]
      ],
      "expected": [
        -3,
        -2,
        -1,
        0,
        2,
        4
      ],
      "hidden": true
    },
    {
      "input": [
        [
          5
        ],
        [
          5
        ]
      ],
      "expected": [
        5,
        5
      ],
      "hidden": true
    },
    {
      "input": [
        [
          1
        ],
        [
          2
        ]
      ],
      "expected": [
        1,
        2
      ],
      "hidden": true
    }
  ],
  starterCode: {
    python: `def merge_sorted_arrays(nums1, nums2):
    # TODO: use two pointers to merge
    return []
`,
    javascript: `function mergeSortedArrays(nums1, nums2) {
    // TODO: use two pointers to merge
    return [];
}
`,
    typescript: `function mergeSortedArrays(nums1: number[], nums2: number[]): number[] {
    // TODO: use two pointers to merge
    return [];
}`,
    java: `class Solution {
    public int[] mergeSortedArrays(int[] nums1, int[] nums2) {
        // TODO: use two pointers to merge
        return new int[]{};
    }
}
`,
    csharp: `public class Solution {
    public int[] MergeSortedArrays(int[] nums1, int[] nums2) {
        // TODO: use two pointers to merge
        return new int[]{};
    }
}`,
    c: `int* mergeSortedArrays(int* nums1, int nums1Size, int* nums2, int nums2Size, int* returnSize) {
    // TODO: use two pointers to merge
    *returnSize = 0;
    return NULL;
}
`,
    cpp: `class Solution {
public:
    vector<int> mergeSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        // TODO: use two pointers to merge
        return {};
    }
};`,
  },
  solutions: {
    python: `def merge_sorted_arrays(nums1, nums2):
    result = []
    i, j = 0, 0
    while i < len(nums1) and j < len(nums2):
        if nums1[i] <= nums2[j]:
            result.append(nums1[i])
            i += 1
        else:
            result.append(nums2[j])
            j += 1
    result.extend(nums1[i:])
    result.extend(nums2[j:])
    return result
`,
    javascript: `function mergeSortedArrays(nums1, nums2) {
    const result = [];
    let i = 0, j = 0;
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] <= nums2[j]) {
            result.push(nums1[i++]);
        } else {
            result.push(nums2[j++]);
        }
    }
    while (i < nums1.length) result.push(nums1[i++]);
    while (j < nums2.length) result.push(nums2[j++]);
    return result;
}
`,
    typescript: `function mergeSortedArrays(nums1: number[], nums2: number[]): number[] {
    const result: number[] = [];
    let i = 0, j = 0;
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] <= nums2[j]) {
            result.push(nums1[i++]);
        } else {
            result.push(nums2[j++]);
        }
    }
    while (i < nums1.length) result.push(nums1[i++]);
    while (j < nums2.length) result.push(nums2[j++]);
    return result;
}`,
    java: `class Solution {
    public int[] mergeSortedArrays(int[] nums1, int[] nums2) {
        int[] result = new int[nums1.length + nums2.length];
        int i = 0, j = 0, k = 0;
        while (i < nums1.length && j < nums2.length) {
            if (nums1[i] <= nums2[j]) {
                result[k++] = nums1[i++];
            } else {
                result[k++] = nums2[j++];
            }
        }
        while (i < nums1.length) result[k++] = nums1[i++];
        while (j < nums2.length) result[k++] = nums2[j++];
        return result;
    }
}
`,
    csharp: `public class Solution {
    public int[] MergeSortedArrays(int[] nums1, int[] nums2) {
        int[] result = new int[nums1.Length + nums2.Length];
        int i = 0, j = 0, k = 0;
        while (i < nums1.Length && j < nums2.Length) {
            if (nums1[i] <= nums2[j]) {
                result[k++] = nums1[i++];
            } else {
                result[k++] = nums2[j++];
            }
        }
        while (i < nums1.Length) result[k++] = nums1[i++];
        while (j < nums2.Length) result[k++] = nums2[j++];
        return result;
    }
}`,
    c: `#include <stdlib.h>

int* mergeSortedArrays(int* nums1, int nums1Size, int* nums2, int nums2Size, int* returnSize) {
    *returnSize = nums1Size + nums2Size;
    int* result = (int*)malloc((*returnSize + 1) * sizeof(int));
    int i = 0, j = 0, k = 0;
    while (i < nums1Size && j < nums2Size) {
        if (nums1[i] <= nums2[j]) {
            result[k++] = nums1[i++];
        } else {
            result[k++] = nums2[j++];
        }
    }
    while (i < nums1Size) result[k++] = nums1[i++];
    while (j < nums2Size) result[k++] = nums2[j++];
    return result;
}
`,
    cpp: `class Solution {
public:
    vector<int> mergeSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        vector<int> result;
        int i = 0, j = 0;
        while (i < (int)nums1.size() && j < (int)nums2.size()) {
            if (nums1[i] <= nums2[j]) {
                result.push_back(nums1[i++]);
            } else {
                result.push_back(nums2[j++]);
            }
        }
        while (i < (int)nums1.size()) result.push_back(nums1[i++]);
        while (j < (int)nums2.size()) result.push_back(nums2[j++]);
        return result;
    }
};`,
  },
  editorial: `## Approach: Two Pointers

Because both input arrays are already sorted, we can build the merged result in a single linear pass without any extra sorting.

**Algorithm:**
1. Initialize pointer \`i = 0\` for \`nums1\` and \`j = 0\` for \`nums2\`.
2. While both pointers are in bounds, compare \`nums1[i]\` vs \`nums2[j]\`:
   - Append the smaller value to the result and advance that pointer.
3. Once either array is exhausted, append all remaining elements of the other array directly (they are already sorted).

**Why it works:** At every step we greedily choose the globally smallest remaining element across both arrays, which guarantees the output is non-decreasing.

**Complexity:**
- **Time:** O(m + n) — each element is visited exactly once.
- **Space:** O(m + n) for the output array.`,
};

export default problem;
