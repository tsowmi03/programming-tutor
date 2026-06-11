import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "union-of-two-integer-arrays-unique-values",
  title: "Union of Two Arrays",
  difficulty: "easy",
  category: "arrays-hashing",
  order: 1049,
  description: `Given two integer arrays \`nums1\` and \`nums2\`, return a **sorted** array of all **unique** integers that appear in either \`nums1\` or \`nums2\` (the mathematical union of the two sets).

Each value must appear **exactly once** in the result, and the result must be in **ascending order**.

\`\`\`text
Example 1:
Input:  nums1 = [1, 2, 3], nums2 = [2, 3, 4]
Output: [1, 2, 3, 4]
Explanation: Every unique value from either array — 1, 2, 3, and 4.
\`\`\`

\`\`\`text
Example 2:
Input:  nums1 = [1, 1, 2], nums2 = [2, 2, 3]
Output: [1, 2, 3]
Explanation: Duplicates within each array are removed; each value appears once.
\`\`\`

**Constraints:**
- \`0 <= nums1.length, nums2.length <= 1000\`
- \`-10^4 <= nums1[i], nums2[i] <= 10^4\``,
  hints: [
    `What data structure stores only unique values automatically?`,
    `Try inserting all elements from both arrays into a set, then converting back to an array.`,
    `After collecting unique values, remember to sort them before returning.`,
    `In C (no built-in set): concatenate both arrays, sort, then do one linear pass to skip repeated consecutive values.`,
  ],
  signature: {
    "name": "arrayUnion",
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
    "ordered": false
  },
  testCases: [
    {
      "input": [
        [
          1,
          2,
          3
        ],
        [
          2,
          3,
          4
        ]
      ],
      "expected": [
        1,
        2,
        3,
        4
      ],
      "hidden": false
    },
    {
      "input": [
        [
          1,
          1,
          2
        ],
        [
          2,
          2,
          3
        ]
      ],
      "expected": [
        1,
        2,
        3
      ],
      "hidden": false
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
        5
      ],
      "hidden": false
    },
    {
      "input": [
        [],
        [
          1,
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
          -3,
          -1,
          0
        ],
        [
          -1,
          2,
          5
        ]
      ],
      "expected": [
        -3,
        -1,
        0,
        2,
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
          5
        ],
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
        2,
        3,
        4,
        5
      ],
      "hidden": true
    },
    {
      "input": [
        [
          100,
          -100,
          0
        ],
        [
          50,
          -50,
          0
        ]
      ],
      "expected": [
        -100,
        -50,
        0,
        50,
        100
      ],
      "hidden": true
    }
  ],
  starterCode: {
    python: `def array_union(nums1, nums2):
    # TODO: implement
    return []
`,
    javascript: `function arrayUnion(nums1, nums2) {
    // TODO: implement
    return [];
}
`,
    java: `class Solution {
    public int[] arrayUnion(int[] nums1, int[] nums2) {
        // TODO: implement
        return new int[]{};
    }
}
`,
    c: `#include <stdlib.h>
int* arrayUnion(int* nums1, int nums1Size, int* nums2, int nums2Size, int* returnSize) {
    // TODO: implement
    *returnSize = 0;
    return (int*)malloc(sizeof(int));
}
`,
  },
  solutions: {
    python: `def array_union(nums1, nums2):
    return sorted(set(nums1) | set(nums2))
`,
    javascript: `function arrayUnion(nums1, nums2) {
    const seen = new Set([...nums1, ...nums2]);
    return Array.from(seen).sort((a, b) => a - b);
}
`,
    java: `class Solution {
    public int[] arrayUnion(int[] nums1, int[] nums2) {
        java.util.Set<Integer> set = new java.util.HashSet<>();
        for (int n : nums1) set.add(n);
        for (int n : nums2) set.add(n);
        int[] result = new int[set.size()];
        int i = 0;
        for (int n : set) result[i++] = n;
        java.util.Arrays.sort(result);
        return result;
    }
}
`,
    c: `#include <stdlib.h>
static int cmpInt(const void* a, const void* b) {
    return (*(int*)a - *(int*)b);
}
int* arrayUnion(int* nums1, int nums1Size, int* nums2, int nums2Size, int* returnSize) {
    int totalSize = nums1Size + nums2Size;
    if (totalSize == 0) {
        *returnSize = 0;
        return (int*)malloc(sizeof(int));
    }
    int* combined = (int*)malloc(totalSize * sizeof(int));
    int i;
    for (i = 0; i < nums1Size; i++) combined[i] = nums1[i];
    for (i = 0; i < nums2Size; i++) combined[nums1Size + i] = nums2[i];
    qsort(combined, totalSize, sizeof(int), cmpInt);
    int* result = (int*)malloc(totalSize * sizeof(int));
    int count = 0;
    for (i = 0; i < totalSize; i++) {
        if (i == 0 || combined[i] != combined[i - 1]) {
            result[count++] = combined[i];
        }
    }
    free(combined);
    *returnSize = count;
    return result;
}
`,
  },
  editorial: `## Approach: Hash Set + Sort

The union of two arrays is the collection of all distinct elements that appear in either array. The key insight is that a **hash set** automatically discards duplicates as we insert elements.

### Steps
1. **Insert all elements** from both \`nums1\` and \`nums2\` into a hash set.
2. **Convert** the set to an array and **sort** it in ascending order.
3. Return the sorted array.

### C (no built-in set)
Concatenate both arrays into one, sort with \`qsort\`, then do a single linear pass — whenever the current element differs from the previous one, include it in the result. This deduplicates in O(n) after the sort.

### Complexity
- **Time:** O((n + m) log(n + m)) — dominated by sorting, where n = \`nums1.length\` and m = \`nums2.length\`.
- **Space:** O(n + m) for the set/combined array and the result.

\`\`\`python
# Python — one-liner using set union operator
def array_union(nums1, nums2):
    return sorted(set(nums1) | set(nums2))
\`\`\``,
};

export default problem;
