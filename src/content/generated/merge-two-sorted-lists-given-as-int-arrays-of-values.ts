import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "merge-two-sorted-lists-given-as-int-arrays-of-values",
  title: "Merge Two Sorted Lists",
  difficulty: "medium",
  category: "linked-lists",
  order: 1115,
  description: `You are given two integer arrays \`list1\` and \`list2\`, each representing the values of a sorted linked list in order from head to tail.

Merge the two sorted lists into one sorted list and return it as an integer array.

The merged list should be made by splicing together the nodes of the two lists (i.e., interleaving their values in non-decreasing order).

\`\`\`text
Example 1:
Input:  list1 = [1, 2, 4],  list2 = [1, 3, 5]
Output: [1, 1, 2, 3, 4, 5]
\`\`\`

\`\`\`text
Example 2:
Input:  list1 = [],  list2 = [0]
Output: [0]
\`\`\`

\`\`\`text
Example 3:
Input:  list1 = [2, 5, 9],  list2 = [1, 3, 7, 10]
Output: [1, 2, 3, 5, 7, 9, 10]
\`\`\`

**Constraints:**
- \`0 <= list1.length, list2.length <= 1000\`
- \`-10^4 <= list1[i], list2[i] <= 10^4\`
- Both \`list1\` and \`list2\` are sorted in non-decreasing order.`,
  hints: [
    `Use two pointers, one for each list, and always pick the smaller of the two current elements.`,
    `After one list is exhausted, append all remaining elements from the other list.`,
    `Think about how the classic merge step of merge sort works — this is exactly that step.`,
  ],
  signature: {
    "name": "mergeTwoSortedLists",
    "params": [
      {
        "name": "list1",
        "type": "int[]"
      },
      {
        "name": "list2",
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
          4
        ],
        [
          1,
          3,
          5
        ]
      ],
      "expected": [
        1,
        1,
        2,
        3,
        4,
        5
      ],
      "hidden": false
    },
    {
      "input": [
        [],
        [
          0
        ]
      ],
      "expected": [
        0
      ],
      "hidden": false
    },
    {
      "input": [
        [
          2,
          5,
          9
        ],
        [
          1,
          3,
          7,
          10
        ]
      ],
      "expected": [
        1,
        2,
        3,
        5,
        7,
        9,
        10
      ],
      "hidden": false
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
    },
    {
      "input": [
        [
          5
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
        5
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
          -5,
          -2,
          4
        ]
      ],
      "expected": [
        -5,
        -3,
        -2,
        -1,
        0,
        4
      ],
      "hidden": true
    },
    {
      "input": [
        [
          1,
          1,
          1
        ],
        [
          1,
          1,
          1
        ]
      ],
      "expected": [
        1,
        1,
        1,
        1,
        1,
        1
      ],
      "hidden": true
    },
    {
      "input": [
        [
          1,
          3,
          5,
          7,
          9
        ],
        [
          2,
          4,
          6,
          8,
          10
        ]
      ],
      "expected": [
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
      "hidden": true
    }
  ],
  starterCode: {
    python: `def merge_two_sorted_lists(list1: list[int], list2: list[int]) -> list[int]:
    # TODO: implement
    return []
`,
    javascript: `function mergeTwoSortedLists(list1, list2) {
    // TODO: implement
    return [];
}
`,
    java: `class Solution {
    public int[] mergeTwoSortedLists(int[] list1, int[] list2) {
        // TODO: implement
        return new int[0];
    }
}
`,
    c: `#include <stdlib.h>

int* mergeTwoSortedLists(int* list1, int list1Size, int* list2, int list2Size, int* returnSize) {
    // TODO: implement
    *returnSize = 0;
    return NULL;
}
`,
  },
  solutions: {
    python: `def merge_two_sorted_lists(list1: list[int], list2: list[int]) -> list[int]:
    result = []
    i, j = 0, 0
    while i < len(list1) and j < len(list2):
        if list1[i] <= list2[j]:
            result.append(list1[i])
            i += 1
        else:
            result.append(list2[j])
            j += 1
    while i < len(list1):
        result.append(list1[i])
        i += 1
    while j < len(list2):
        result.append(list2[j])
        j += 1
    return result
`,
    javascript: `function mergeTwoSortedLists(list1, list2) {
    const result = [];
    let i = 0, j = 0;
    while (i < list1.length && j < list2.length) {
        if (list1[i] <= list2[j]) {
            result.push(list1[i++]);
        } else {
            result.push(list2[j++]);
        }
    }
    while (i < list1.length) result.push(list1[i++]);
    while (j < list2.length) result.push(list2[j++]);
    return result;
}
`,
    java: `class Solution {
    public int[] mergeTwoSortedLists(int[] list1, int[] list2) {
        int n1 = list1.length, n2 = list2.length;
        int[] result = new int[n1 + n2];
        int i = 0, j = 0, k = 0;
        while (i < n1 && j < n2) {
            if (list1[i] <= list2[j]) {
                result[k++] = list1[i++];
            } else {
                result[k++] = list2[j++];
            }
        }
        while (i < n1) result[k++] = list1[i++];
        while (j < n2) result[k++] = list2[j++];
        return result;
    }
}
`,
    c: `#include <stdlib.h>

int* mergeTwoSortedLists(int* list1, int list1Size, int* list2, int list2Size, int* returnSize) {
    int total = list1Size + list2Size;
    *returnSize = total;
    if (total == 0) return NULL;
    int* result = (int*)malloc(total * sizeof(int));
    int i = 0, j = 0, k = 0;
    while (i < list1Size && j < list2Size) {
        if (list1[i] <= list2[j]) {
            result[k++] = list1[i++];
        } else {
            result[k++] = list2[j++];
        }
    }
    while (i < list1Size) result[k++] = list1[i++];
    while (j < list2Size) result[k++] = list2[j++];
    return result;
}
`,
  },
  editorial: `## Approach: Two-Pointer Merge

This is the classic **merge step** from merge sort, applied directly to two sorted arrays.

### Idea
Maintain two pointers \`i\` and \`j\`, initially pointing to the start of \`list1\` and \`list2\` respectively. At each step:
1. Compare \`list1[i]\` and \`list2[j]\`.
2. Append the smaller value to the result and advance that pointer.
3. Repeat until one list is exhausted.
4. Append all remaining elements from the non-exhausted list.

### Why it works
Since both input arrays are already sorted, the two-pointer approach always picks the globally smallest remaining element, guaranteeing the output is sorted.

### Complexity
- **Time:** O(n + m) where n = \`list1.length\` and m = \`list2.length\` — each element is visited exactly once.
- **Space:** O(n + m) for the output array (not counting input).

### Example walkthrough
\`\`\`
list1 = [1, 2, 4],  list2 = [1, 3, 5]

i=0,j=0: 1 <= 1 → pick list1[0]=1,  i=1
i=1,j=0: 2 >  1 → pick list2[0]=1,  j=1
i=1,j=1: 2 <= 3 → pick list1[1]=2,  i=2
i=2,j=1: 4 >  3 → pick list2[1]=3,  j=2
i=2,j=2: 4 <= 5 → pick list1[2]=4,  i=3  (list1 exhausted)
Append remaining list2: 5

Result: [1, 1, 2, 3, 4, 5] ✓
\`\`\``,
};

export default problem;
