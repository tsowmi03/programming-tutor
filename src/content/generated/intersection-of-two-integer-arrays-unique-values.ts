import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "intersection-of-two-integer-arrays-unique-values",
  title: "Intersection of Two Arrays",
  difficulty: "easy",
  category: "arrays-hashing",
  order: 1046,
  description: `Given two integer arrays \`nums1\` and \`nums2\`, return an array of their **intersection**. Each element in the result must appear **exactly once**, and the result may be returned in **any order**.

\`\`\`text
Example 1:
Input:  nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2]
Explanation: 2 appears in both arrays. Even though it appears multiple times
             in each, it is included only once in the result.
\`\`\`

\`\`\`text
Example 2:
Input:  nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [4,9]  (any order is acceptable)
Explanation: Both 4 and 9 appear in both arrays.
\`\`\`

**Constraints:**
- \`0 <= nums1.length, nums2.length <= 1000\`
- \`-1000 <= nums1[i], nums2[i] <= 1000\``,
  hints: [
    `How can you quickly check whether a value from one array exists in the other? Think about a data structure that supports O(1) average-time lookups.`,
    `Convert one array into a hash set, then iterate over the other array testing membership.`,
    `To guarantee uniqueness in the output, store intermediate results in a set before converting to an array.`,
    `In C you can avoid a hash map entirely: use a nested loop to test membership and a second loop to skip duplicates already added to the result.`,
  ],
  signature: {
    "name": "intersection",
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
          2,
          1
        ],
        [
          2,
          2
        ]
      ],
      "expected": [
        2
      ],
      "hidden": false
    },
    {
      "input": [
        [
          4,
          9,
          5
        ],
        [
          9,
          4,
          9,
          8,
          4
        ]
      ],
      "expected": [
        4,
        9
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
      "expected": [],
      "hidden": false
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
        1
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
          3,
          4,
          5,
          6,
          7
        ]
      ],
      "expected": [
        3,
        4,
        5
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
      "expected": [],
      "hidden": true
    },
    {
      "input": [
        [
          1
        ],
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
          -1,
          -2,
          -3
        ],
        [
          -2,
          -3,
          -4
        ]
      ],
      "expected": [
        -2,
        -3
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
        ],
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
        2,
        3,
        4,
        5,
        6
      ],
      "hidden": true
    }
  ],
  starterCode: {
    python: `def intersection(nums1, nums2):
    # TODO: return the intersection of nums1 and nums2 (unique values only)
    return []
`,
    javascript: `function intersection(nums1, nums2) {
    // TODO: return the intersection of nums1 and nums2 (unique values only)
    return [];
}
`,
    typescript: `function intersection(nums1: number[], nums2: number[]): number[] {
    // TODO: return the intersection of nums1 and nums2 (unique values only)
    return [];
}`,
    java: `class Solution {
    public int[] intersection(int[] nums1, int[] nums2) {
        // TODO: return the intersection of nums1 and nums2 (unique values only)
        return new int[]{};
    }
}
`,
    csharp: `using System.Collections.Generic;

public class Solution {
    public int[] Intersection(int[] nums1, int[] nums2) {
        // TODO: return the intersection of nums1 and nums2 (unique values only)
        return new int[]{};
    }
}`,
    c: `#include <stdlib.h>

int* intersection(int* nums1, int nums1Size, int* nums2, int nums2Size, int* returnSize) {
    // TODO: return the intersection of nums1 and nums2 (unique values only)
    *returnSize = 0;
    return NULL;
}
`,
    cpp: `class Solution {
public:
    vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {
        // TODO: return the intersection of nums1 and nums2 (unique values only)
        return {};
    }
};`,
  },
  solutions: {
    python: `def intersection(nums1, nums2):
    return list(set(nums1) & set(nums2))
`,
    javascript: `function intersection(nums1, nums2) {
    const set1 = new Set(nums1);
    const set2 = new Set(nums2);
    return [...set1].filter(x => set2.has(x));
}
`,
    typescript: `function intersection(nums1: number[], nums2: number[]): number[] {
    const set1 = new Set(nums1);
    const set2 = new Set(nums2);
    return [...set1].filter(x => set2.has(x));
}`,
    java: `class Solution {
    public int[] intersection(int[] nums1, int[] nums2) {
        java.util.Set<Integer> set1 = new java.util.HashSet<>();
        for (int n : nums1) set1.add(n);
        java.util.Set<Integer> resultSet = new java.util.HashSet<>();
        for (int n : nums2) {
            if (set1.contains(n)) resultSet.add(n);
        }
        int[] arr = new int[resultSet.size()];
        int i = 0;
        for (int n : resultSet) arr[i++] = n;
        return arr;
    }
}
`,
    csharp: `using System.Collections.Generic;

public class Solution {
    public int[] Intersection(int[] nums1, int[] nums2) {
        HashSet<int> set1 = new HashSet<int>();
        foreach (int n in nums1) set1.Add(n);
        HashSet<int> resultSet = new HashSet<int>();
        foreach (int n in nums2) {
            if (set1.Contains(n)) resultSet.Add(n);
        }
        int[] arr = new int[resultSet.Count];
        int i = 0;
        foreach (int n in resultSet) arr[i++] = n;
        return arr;
    }
}`,
    c: `#include <stdlib.h>

int* intersection(int* nums1, int nums1Size, int* nums2, int nums2Size, int* returnSize) {
    int* result = (int*)malloc((nums1Size + 1) * sizeof(int));
    int count = 0;
    for (int i = 0; i < nums1Size; i++) {
        int inNums2 = 0;
        for (int j = 0; j < nums2Size; j++) {
            if (nums1[i] == nums2[j]) { inNums2 = 1; break; }
        }
        if (!inNums2) continue;
        int duplicate = 0;
        for (int k = 0; k < count; k++) {
            if (result[k] == nums1[i]) { duplicate = 1; break; }
        }
        if (!duplicate) result[count++] = nums1[i];
    }
    *returnSize = count;
    return result;
}
`,
    cpp: `class Solution {
public:
    vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {
        unordered_set<int> set1(nums1.begin(), nums1.end());
        unordered_set<int> resultSet;
        for (int n : nums2) {
            if (set1.count(n)) resultSet.insert(n);
        }
        return vector<int>(resultSet.begin(), resultSet.end());
    }
};`,
  },
  editorial: `## Approach: Hash Set Intersection

**Core Idea:**
Convert one array into a hash set for O(1) average-time membership tests. Iterate through the second array, adding matching elements to a *result set* so duplicates are eliminated automatically. Finally, convert the result set to an array.

**Steps:**
1. Insert every element of \`nums1\` into \`set1\`.
2. For each element \`x\` in \`nums2\`, if \`x ∈ set1\`, add \`x\` to \`resultSet\`.
3. Convert \`resultSet\` → array and return it.

\`\`\`python
def intersection(nums1, nums2):
    return list(set(nums1) & set(nums2))
\`\`\`

The built-in set intersection operator handles both steps in one line.

**Complexity:**
- **Time:** O(n + m) — one pass to build \`set1\`, one pass over \`nums2\`.
- **Space:** O(n) for \`set1\`, O(k) for the result where k ≤ min(n, m).

**C Note:** Standard C has no hash map, so the reference solution uses nested loops: for each element of \`nums1\` it scans \`nums2\` for a match (O(m)), then scans the result buffer for duplicates (O(k)). Overall O(n·(m + n)), which is comfortably within limits for n, m ≤ 1000.`,
};

export default problem;
