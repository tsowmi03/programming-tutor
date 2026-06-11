import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "reorder-list-l0-ln-l1-ln-1-pattern-array-representation",
  title: "Reorder List (Array Representation)",
  difficulty: "medium",
  category: "linked-lists",
  order: 1118,
  description: `Given an array representing a singly linked list, reorder it in-place following the pattern:

\`\`\`
L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → …
\`\`\`

Specifically, after reordering, element at index 0 is followed by the last element, then the second element, then the second-to-last element, and so on.

Return the reordered array.

**Example 1:**
\`\`\`text
Input:  [1, 2, 3, 4]
Output: [1, 4, 2, 3]
Explanation: L0=1, L1=2, L2=3, L3=4
  → 1 → 4 → 2 → 3
\`\`\`

**Example 2:**
\`\`\`text
Input:  [1, 2, 3, 4, 5]
Output: [1, 5, 2, 4, 3]
Explanation: L0=1, L1=2, L2=3, L3=4, L4=5
  → 1 → 5 → 2 → 4 → 3
\`\`\`

**Example 3:**
\`\`\`text
Input:  [1, 2]
Output: [1, 2]
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 10^4\`
- \`-10^5 <= nums[i] <= 10^5\``,
  hints: [
    `Think about where each element ends up. The first half of the original list stays in ascending index order, while the second half is interleaved in reverse.`,
    `Try splitting the array at the midpoint, reversing the second half, then merging the two halves alternately.`,
    `For merging: take one from the first half, then one from the (reversed) second half, and repeat until both halves are consumed.`,
  ],
  signature: {
    "name": "reorderList",
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
          3,
          4
        ]
      ],
      "expected": [
        1,
        4,
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
          3,
          4,
          5
        ]
      ],
      "expected": [
        1,
        5,
        2,
        4,
        3
      ],
      "hidden": false
    },
    {
      "input": [
        [
          1,
          2
        ]
      ],
      "expected": [
        1,
        2
      ],
      "hidden": false
    },
    {
      "input": [
        [
          1
        ]
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
          3
        ]
      ],
      "expected": [
        1,
        3,
        2
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
          5,
          6
        ]
      ],
      "expected": [
        1,
        6,
        2,
        5,
        3,
        4
      ],
      "hidden": true
    },
    {
      "input": [
        [
          -1,
          -2,
          -3,
          -4
        ]
      ],
      "expected": [
        -1,
        -4,
        -2,
        -3
      ],
      "hidden": true
    },
    {
      "input": [
        [
          5,
          5,
          5,
          5,
          5
        ]
      ],
      "expected": [
        5,
        5,
        5,
        5,
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
          5,
          6,
          7
        ]
      ],
      "expected": [
        1,
        7,
        2,
        6,
        3,
        5,
        4
      ],
      "hidden": true
    },
    {
      "input": [
        [
          10,
          20,
          30,
          40,
          50,
          60,
          70,
          80
        ]
      ],
      "expected": [
        10,
        80,
        20,
        70,
        30,
        60,
        40,
        50
      ],
      "hidden": true
    }
  ],
  starterCode: {
    python: `def reorder_list(nums: list[int]) -> list[int]:
    # TODO: implement reorder
    return []
`,
    javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function reorderList(nums) {
    // TODO: implement reorder
    return [];
}
`,
    java: `class Solution {
    public int[] reorderList(int[] nums) {
        // TODO: implement reorder
        return new int[]{};
    }
}
`,
    c: `#include <stdlib.h>
int* reorderList(int* nums, int numsSize, int* returnSize) {
    // TODO: implement reorder
    *returnSize = 0;
    return NULL;
}
`,
  },
  solutions: {
    python: `def reorder_list(nums: list[int]) -> list[int]:
    n = len(nums)
    if n <= 2:
        return nums[:]
    mid = n // 2
    first = nums[:mid]
    second = nums[mid:][::-1]
    result = []
    i, j = 0, 0
    while i < len(first) and j < len(second):
        result.append(first[i])
        result.append(second[j])
        i += 1
        j += 1
    while i < len(first):
        result.append(first[i])
        i += 1
    while j < len(second):
        result.append(second[j])
        j += 1
    return result
`,
    javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function reorderList(nums) {
    const n = nums.length;
    if (n <= 2) return nums.slice();
    const mid = Math.floor(n / 2);
    const first = nums.slice(0, mid);
    const second = nums.slice(mid).reverse();
    const result = [];
    let i = 0, j = 0;
    while (i < first.length && j < second.length) {
        result.push(first[i++]);
        result.push(second[j++]);
    }
    while (i < first.length) result.push(first[i++]);
    while (j < second.length) result.push(second[j++]);
    return result;
}
`,
    java: `class Solution {
    public int[] reorderList(int[] nums) {
        int n = nums.length;
        if (n <= 2) {
            int[] copy = new int[n];
            for (int i = 0; i < n; i++) copy[i] = nums[i];
            return copy;
        }
        int mid = n / 2;
        int[] first = new int[mid];
        int secondLen = n - mid;
        int[] second = new int[secondLen];
        for (int i = 0; i < mid; i++) first[i] = nums[i];
        for (int i = 0; i < secondLen; i++) second[i] = nums[mid + i];
        // reverse second
        for (int i = 0, j = secondLen - 1; i < j; i++, j--) {
            int tmp = second[i]; second[i] = second[j]; second[j] = tmp;
        }
        int[] result = new int[n];
        int ri = 0, i = 0, j = 0;
        while (i < mid && j < secondLen) {
            result[ri++] = first[i++];
            result[ri++] = second[j++];
        }
        while (i < mid) result[ri++] = first[i++];
        while (j < secondLen) result[ri++] = second[j++];
        return result;
    }
}
`,
    c: `#include <stdlib.h>
int* reorderList(int* nums, int numsSize, int* returnSize) {
    *returnSize = numsSize;
    int* result = (int*)malloc(numsSize * sizeof(int));
    if (numsSize <= 2) {
        for (int i = 0; i < numsSize; i++) result[i] = nums[i];
        return result;
    }
    int mid = numsSize / 2;
    int secondLen = numsSize - mid;
    int* first = (int*)malloc(mid * sizeof(int));
    int* second = (int*)malloc(secondLen * sizeof(int));
    for (int i = 0; i < mid; i++) first[i] = nums[i];
    for (int i = 0; i < secondLen; i++) second[i] = nums[mid + i];
    /* reverse second */
    for (int i = 0, j = secondLen - 1; i < j; i++, j--) {
        int tmp = second[i]; second[i] = second[j]; second[j] = tmp;
    }
    int ri = 0, i = 0, j = 0;
    while (i < mid && j < secondLen) {
        result[ri++] = first[i++];
        result[ri++] = second[j++];
    }
    while (i < mid) result[ri++] = first[i++];
    while (j < secondLen) result[ri++] = second[j++];
    free(first);
    free(second);
    return result;
}
`,
  },
  editorial: `## Approach: Split, Reverse Second Half, Merge

### Intuition
The reorder pattern \`L0 → Ln → L1 → Ln-1 → …\` is equivalent to:
1. Splitting the array into two halves.
2. Reversing the second half.
3. Merging the two halves by alternating elements.

### Steps
1. **Find midpoint**: \`mid = n // 2\`. The first half is \`nums[0..mid-1]\`, the second half is \`nums[mid..n-1]\`.
2. **Reverse the second half**: this brings the last element to the front of the second segment.
3. **Interleave**: take one element from \`first\`, then one from \`second\`, and repeat.

### Example
\`\`\`
nums = [1, 2, 3, 4, 5]  →  mid = 2
first  = [1, 2]
second = [3, 4, 5]  →  reversed: [5, 4, 3]
merge: 1,5, 2,4, then leftover from second: 3
result = [1, 5, 2, 4, 3]  ✓
\`\`\`

### Why does this work for odd vs even lengths?
- **Even** (\`n=4\`): \`first=[1,2]\`, \`second=[3,4]\` reversed \`[4,3]\`. Merge: \`1,4,2,3\`. ✓
- **Odd** (\`n=5\`): \`first=[1,2]\`, \`second=[3,4,5]\` reversed \`[5,4,3]\`. After equal interleave we have \`[1,5,2,4]\` with \`3\` left over from \`second\`. The middle element lands at the end. ✓

### Complexity
- **Time**: O(n) — one pass to split, one to reverse, one to merge.
- **Space**: O(n) — we store copies of both halves and the result array.`,
};

export default problem;
