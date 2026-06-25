import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "check-whether-two-arrays-have-the-same-multiset-of-values",
  title: "Same Multiset",
  difficulty: "medium",
  category: "arrays-hashing",
  order: 1011,
  description: `Given two integer arrays \`nums1\` and \`nums2\`, return \`true\` if they contain the **same multiset** of values (i.e., every value appears the same number of times in both arrays), or \`false\` otherwise.

Two arrays are considered to have the same multiset if and only if:
- They have the same length.
- Every element that appears \`k\` times in \`nums1\` also appears exactly \`k\` times in \`nums2\`, and vice-versa.

\`\`\`text
Example 1:
Input:  nums1 = [1, 2, 2, 3], nums2 = [3, 2, 1, 2]
Output: true
Explanation: Both contain {1×1, 2×2, 3×1}.
\`\`\`

\`\`\`text
Example 2:
Input:  nums1 = [1, 2, 3], nums2 = [1, 2, 2]
Output: false
Explanation: nums1 has one 3 and no duplicate 2, but nums2 has two 2s and no 3.
\`\`\`

\`\`\`text
Example 3:
Input:  nums1 = [4, 4, 4], nums2 = [4, 4]
Output: false
Explanation: Different lengths — cannot be the same multiset.
\`\`\`

**Constraints:**
- \`1 <= nums1.length, nums2.length <= 10^4\`
- \`-10^5 <= nums1[i], nums2[i] <= 10^5\``,
  hints: [
    `If the two arrays have different lengths, you already know the answer.`,
    `Try counting how many times each value appears in each array and then compare those counts.`,
    `A hash map (dictionary) keyed by value with frequency as the value works well here. Alternatively, sorting both arrays and comparing element-by-element is an O(n log n) alternative.`,
  ],
  guidance: [
    {
      "title": "Start with length check",
      "body": "Two arrays can only be the same multiset if they have the same total number of elements. Handle that early to avoid unnecessary work.",
      "level": "nudge"
    },
    {
      "title": "Frequency counting strategy",
      "body": "Build a frequency map for `nums1`, then iterate over `nums2` decrementing counts. If any count goes negative or a key is missing, return `false`. If all counts reach zero, return `true`.",
      "level": "strategy"
    },
    {
      "title": "Watch out for missing keys",
      "body": "When decrementing counts for `nums2`, a value that never appeared in `nums1` has no entry in your map — treat a missing key the same as a count of zero (and immediately return `false`).",
      "level": "pitfall"
    },
    {
      "title": "Alternative: sort both arrays",
      "body": "Sort both arrays in-place, then do a single pass comparing `nums1[i]` with `nums2[i]`. Any mismatch means the multisets differ. This is O(n log n) time and O(1) extra space (ignoring sort overhead).",
      "level": "strategy"
    },
    {
      "title": "Pseudocode outline",
      "body": "```\nif len(nums1) != len(nums2): return false\n\nfreq = {}\nfor v in nums1:\n    freq[v] = freq.get(v, 0) + 1\n\nfor v in nums2:\n    if freq.get(v, 0) == 0: return false\n    freq[v] -= 1\n\nreturn true\n```",
      "level": "pseudocode"
    }
  ],

  signature: {
    "name": "sameMultiset",
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
    "returns": "bool",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        [
          1,
          2,
          2,
          3
        ],
        [
          3,
          2,
          1,
          2
        ]
      ],
      "expected": true,
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
          1,
          2,
          2
        ]
      ],
      "expected": false,
      "hidden": false
    },
    {
      "input": [
        [
          4,
          4,
          4
        ],
        [
          4,
          4
        ]
      ],
      "expected": false,
      "hidden": false
    },
    {
      "input": [
        [
          7
        ],
        [
          7
        ]
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          1,
          1,
          1
        ],
        [
          1,
          1,
          1,
          1
        ]
      ],
      "expected": true,
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
          -3,
          -2,
          -1
        ]
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          -1,
          2,
          -3
        ],
        [
          -1,
          -2,
          3
        ]
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        [
          0,
          0,
          0
        ],
        [
          0,
          0,
          1
        ]
      ],
      "expected": false,
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
          5,
          4,
          3,
          2,
          1
        ]
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        [
          100000,
          -100000
        ],
        [
          -100000,
          100000
        ]
      ],
      "expected": true,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def same_multiset(nums1: list[int], nums2: list[int]) -> bool:
    # TODO: implement
    return False
`,
    javascript: `function sameMultiset(nums1, nums2) {
    // TODO: implement
    return false;
}
`,
    typescript: `function sameMultiset(nums1: number[], nums2: number[]): boolean {
    // TODO: implement
    return false;
}
`,
    java: `class Solution {
    public boolean sameMultiset(int[] nums1, int[] nums2) {
        // TODO: implement
        return false;
    }
}
`,
    csharp: `public class Solution {
    public bool SameMultiset(int[] nums1, int[] nums2) {
        // TODO: implement
        return false;
    }
}
`,
    c: `#include <stdlib.h>
#include <stdbool.h>
bool sameMultiset(int* nums1, int nums1Size, int* nums2, int nums2Size) {
    // TODO: implement
    return false;
}
`,
    cpp: `class Solution {
public:
    bool sameMultiset(vector<int>& nums1, vector<int>& nums2) {
        // TODO: implement
        return false;
    }
};
`,
  },
  solutions: {
    python: `def same_multiset(nums1: list[int], nums2: list[int]) -> bool:
    if len(nums1) != len(nums2):
        return False
    freq = {}
    for v in nums1:
        freq[v] = freq.get(v, 0) + 1
    for v in nums2:
        if freq.get(v, 0) == 0:
            return False
        freq[v] -= 1
    return True
`,
    javascript: `function sameMultiset(nums1, nums2) {
    if (nums1.length !== nums2.length) return false;
    const freq = new Map();
    for (const v of nums1) {
        freq.set(v, (freq.get(v) || 0) + 1);
    }
    for (const v of nums2) {
        if (!freq.get(v)) return false;
        freq.set(v, freq.get(v) - 1);
    }
    return true;
}
`,
    typescript: `function sameMultiset(nums1: number[], nums2: number[]): boolean {
    if (nums1.length !== nums2.length) return false;
    const freq = new Map<number, number>();
    for (const v of nums1) {
        freq.set(v, (freq.get(v) ?? 0) + 1);
    }
    for (const v of nums2) {
        const cnt = freq.get(v) ?? 0;
        if (cnt === 0) return false;
        freq.set(v, cnt - 1);
    }
    return true;
}
`,
    java: `class Solution {
    public boolean sameMultiset(int[] nums1, int[] nums2) {
        if (nums1.length != nums2.length) return false;
        java.util.HashMap<Integer, Integer> freq = new java.util.HashMap<>();
        for (int v : nums1) {
            freq.put(v, freq.getOrDefault(v, 0) + 1);
        }
        for (int v : nums2) {
            int cnt = freq.getOrDefault(v, 0);
            if (cnt == 0) return false;
            freq.put(v, cnt - 1);
        }
        return true;
    }
}
`,
    csharp: `public class Solution {
    public bool SameMultiset(int[] nums1, int[] nums2) {
        if (nums1.Length != nums2.Length) return false;
        var freq = new System.Collections.Generic.Dictionary<int, int>();
        foreach (int v in nums1) {
            if (!freq.ContainsKey(v)) freq[v] = 0;
            freq[v]++;
        }
        foreach (int v in nums2) {
            if (!freq.ContainsKey(v) || freq[v] == 0) return false;
            freq[v]--;
        }
        return true;
    }
}
`,
    c: `#include <stdlib.h>
#include <stdbool.h>
#include <string.h>

static int cmpInt(const void* a, const void* b) {
    int ia = *(const int*)a;
    int ib = *(const int*)b;
    return (ia > ib) - (ia < ib);
}

bool sameMultiset(int* nums1, int nums1Size, int* nums2, int nums2Size) {
    if (nums1Size != nums2Size) return false;
    int* a = (int*)malloc(nums1Size * sizeof(int));
    int* b = (int*)malloc(nums2Size * sizeof(int));
    memcpy(a, nums1, nums1Size * sizeof(int));
    memcpy(b, nums2, nums2Size * sizeof(int));
    qsort(a, nums1Size, sizeof(int), cmpInt);
    qsort(b, nums2Size, sizeof(int), cmpInt);
    bool result = true;
    for (int i = 0; i < nums1Size; i++) {
        if (a[i] != b[i]) { result = false; break; }
    }
    free(a);
    free(b);
    return result;
}
`,
    cpp: `class Solution {
public:
    bool sameMultiset(vector<int>& nums1, vector<int>& nums2) {
        if (nums1.size() != nums2.size()) return false;
        unordered_map<int, int> freq;
        for (int v : nums1) freq[v]++;
        for (int v : nums2) {
            if (freq[v] == 0) return false;
            freq[v]--;
        }
        return true;
    }
};
`,
  },
  editorial: `## Approach: Frequency Counting

### Key Idea
Two arrays represent the same multiset if and only if every value appears the same number of times in both. We can verify this by:
1. Checking lengths are equal (necessary condition).
2. Building a frequency map from \`nums1\`.
3. Decrementing counts while iterating \`nums2\`; if any count would go below zero (or the key is absent), the multisets differ.

### Algorithm
\`\`\`
if len(nums1) != len(nums2): return false
build freq map from nums1
for each value v in nums2:
    if freq[v] == 0: return false
    freq[v] -= 1
return true
\`\`\`

### Complexity
- **Time:** O(n) — two linear passes plus O(1) hash map operations.
- **Space:** O(n) — the frequency map holds at most n distinct keys.

### Alternative: Sort and Compare
Sort both arrays in O(n log n) and do a single element-by-element comparison. Uses O(1) extra space (if in-place sort is allowed) but is slower than the hashing approach.

### Edge Cases
- Different lengths → immediately \`false\`.
- Negative numbers → hash maps handle them just as well as positives.
- All-same array (e.g., \`[5,5,5]\` vs \`[5,5,5]\`) → counts stay consistent, returns \`true\`.
- One element off (e.g., \`[0,0,0]\` vs \`[0,0,1]\`) → count for \`0\` runs out, returns \`false\`.`,
};

export default problem;
