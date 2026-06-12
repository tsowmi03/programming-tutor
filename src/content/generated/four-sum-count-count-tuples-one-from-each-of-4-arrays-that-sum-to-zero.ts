import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "four-sum-count-count-tuples-one-from-each-of-4-arrays-that-sum-to-zero",
  title: "Four Sum Count",
  difficulty: "medium",
  category: "arrays-hashing",
  order: 1055,
  description: `Given four integer arrays \`nums1\`, \`nums2\`, \`nums3\`, and \`nums4\`, each of length \`n\`, return the number of tuples \`(i, j, k, l)\` such that:

- \`0 <= i, j, k, l < n\`
- \`nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0\`

\`\`\`text
Example 1:
Input:  nums1 = [1, 2], nums2 = [-2, -1], nums3 = [-1, 2], nums4 = [0, 2]
Output: 2
Explanation:
  (i=0,j=0,k=0,l=1): 1 + (-2) + (-1) + 2 = 0
  (i=1,j=1,k=0,l=0): 2 + (-1) + (-1) + 0 = 0
\`\`\`

\`\`\`text
Example 2:
Input:  nums1 = [0], nums2 = [0], nums3 = [0], nums4 = [0]
Output: 1
\`\`\`

**Constraints:**
- \`1 <= n <= 200\`
- \`nums1.length == nums2.length == nums3.length == nums4.length == n\`
- \`-100 <= nums1[i], nums2[i], nums3[i], nums4[i] <= 100\``,
  hints: [
    `A brute-force O(n^4) pass over all tuples is too slow for n = 200. Can you split the problem into two pairs of arrays?`,
    `Precompute all pairwise sums from nums1 × nums2 and store their frequencies in a hash map. Then for each pair (c, d) from nums3 × nums4, look up how many times -(c + d) appears in that map.`,
    `If a sum \`s\` appears \`x\` times among (nums1, nums2) pairs and \`-s\` appears \`y\` times among (nums3, nums4) pairs, those combinations contribute \`x * y\` valid tuples.`,
  ],
  signature: {
    "name": "fourSumCount",
    "params": [
      {
        "name": "nums1",
        "type": "int[]"
      },
      {
        "name": "nums2",
        "type": "int[]"
      },
      {
        "name": "nums3",
        "type": "int[]"
      },
      {
        "name": "nums4",
        "type": "int[]"
      }
    ],
    "returns": "int"
  },
  testCases: [
    {
      "input": [
        [
          1,
          2
        ],
        [
          -2,
          -1
        ],
        [
          -1,
          2
        ],
        [
          0,
          2
        ]
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        [
          0
        ],
        [
          0
        ],
        [
          0
        ],
        [
          0
        ]
      ],
      "expected": 1,
      "hidden": false
    },
    {
      "input": [
        [
          1,
          -1
        ],
        [
          1,
          -1
        ],
        [
          1,
          -1
        ],
        [
          1,
          -1
        ]
      ],
      "expected": 6,
      "hidden": false
    },
    {
      "input": [
        [
          0,
          1,
          -1
        ],
        [
          0,
          1,
          -1
        ],
        [
          0,
          1,
          -1
        ],
        [
          0,
          1,
          -1
        ]
      ],
      "expected": 19,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          2,
          3
        ],
        [
          -1,
          -2,
          -3
        ],
        [
          1,
          2,
          3
        ],
        [
          -1,
          -2,
          -3
        ]
      ],
      "expected": 19,
      "hidden": true
    },
    {
      "input": [
        [
          1
        ],
        [
          2
        ],
        [
          3
        ],
        [
          4
        ]
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          -1,
          -1
        ],
        [
          1,
          1
        ],
        [
          1,
          1
        ],
        [
          -1,
          -1
        ]
      ],
      "expected": 16,
      "hidden": true
    },
    {
      "input": [
        [
          -2
        ],
        [
          -2
        ],
        [
          2
        ],
        [
          2
        ]
      ],
      "expected": 1,
      "hidden": true
    },
    {
      "input": [
        [
          -1,
          -2
        ],
        [
          1,
          2
        ],
        [
          0,
          -1
        ],
        [
          0,
          1
        ]
      ],
      "expected": 6,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def four_sum_count(nums1, nums2, nums3, nums4):
    # TODO: implement
    return 0`,
    javascript: `function fourSumCount(nums1, nums2, nums3, nums4) {
    // TODO: implement
    return 0;
}`,
    typescript: `function fourSumCount(nums1: number[], nums2: number[], nums3: number[], nums4: number[]): number {
    // TODO: implement
    return 0;
}`,
    java: `class Solution {
    public int fourSumCount(int[] nums1, int[] nums2, int[] nums3, int[] nums4) {
        // TODO: implement
        return 0;
    }
}`,
    csharp: `using System.Collections.Generic;

public class Solution {
    public int FourSumCount(int[] nums1, int[] nums2, int[] nums3, int[] nums4) {
        // TODO: implement
        return 0;
    }
}`,
    c: `int fourSumCount(int* nums1, int nums1Size, int* nums2, int nums2Size,
                 int* nums3, int nums3Size, int* nums4, int nums4Size) {
    // TODO: implement
    return 0;
}`,
    cpp: `class Solution {
public:
    int fourSumCount(vector<int>& nums1, vector<int>& nums2, vector<int>& nums3, vector<int>& nums4) {
        // TODO: implement
        return 0;
    }
};`,
  },
  solutions: {
    python: `from collections import defaultdict

def four_sum_count(nums1, nums2, nums3, nums4):
    freq = defaultdict(int)
    for a in nums1:
        for b in nums2:
            freq[a + b] += 1
    result = 0
    for c in nums3:
        for d in nums4:
            result += freq[-(c + d)]
    return result`,
    javascript: `function fourSumCount(nums1, nums2, nums3, nums4) {
    const map = new Map();
    for (const a of nums1) {
        for (const b of nums2) {
            const s = a + b;
            map.set(s, (map.get(s) || 0) + 1);
        }
    }
    let result = 0;
    for (const c of nums3) {
        for (const d of nums4) {
            result += (map.get(-(c + d)) || 0);
        }
    }
    return result;
}`,
    typescript: `function fourSumCount(nums1: number[], nums2: number[], nums3: number[], nums4: number[]): number {
    const map = new Map<number, number>();
    for (const a of nums1) {
        for (const b of nums2) {
            const s = a + b;
            map.set(s, (map.get(s) || 0) + 1);
        }
    }
    let result = 0;
    for (const c of nums3) {
        for (const d of nums4) {
            result += (map.get(-(c + d)) || 0);
        }
    }
    return result;
}`,
    java: `class Solution {
    public int fourSumCount(int[] nums1, int[] nums2, int[] nums3, int[] nums4) {
        java.util.Map<Integer, Integer> map = new java.util.HashMap<>();
        for (int a : nums1) {
            for (int b : nums2) {
                map.merge(a + b, 1, Integer::sum);
            }
        }
        int result = 0;
        for (int c : nums3) {
            for (int d : nums4) {
                result += map.getOrDefault(-(c + d), 0);
            }
        }
        return result;
    }
}`,
    csharp: `using System.Collections.Generic;

public class Solution {
    public int FourSumCount(int[] nums1, int[] nums2, int[] nums3, int[] nums4) {
        Dictionary<int, int> map = new Dictionary<int, int>();
        foreach (int a in nums1) {
            foreach (int b in nums2) {
                int s = a + b;
                if (map.ContainsKey(s)) {
                    map[s]++;
                } else {
                    map[s] = 1;
                }
            }
        }
        int result = 0;
        foreach (int c in nums3) {
            foreach (int d in nums4) {
                int key = -(c + d);
                if (map.ContainsKey(key)) {
                    result += map[key];
                }
            }
        }
        return result;
    }
}`,
    c: `int fourSumCount(int* nums1, int nums1Size, int* nums2, int nums2Size,
                 int* nums3, int nums3Size, int* nums4, int nums4Size) {
    /* Values in [-100,100] => pairwise sums in [-200,200], 401 buckets */
    int freq[401] = {0};
    int i, j, idx;
    for (i = 0; i < nums1Size; i++) {
        for (j = 0; j < nums2Size; j++) {
            freq[nums1[i] + nums2[j] + 200]++;
        }
    }
    int result = 0;
    for (i = 0; i < nums3Size; i++) {
        for (j = 0; j < nums4Size; j++) {
            idx = -(nums3[i] + nums4[j]) + 200;
            if (idx >= 0 && idx <= 400) {
                result += freq[idx];
            }
        }
    }
    return result;
}`,
    cpp: `class Solution {
public:
    int fourSumCount(vector<int>& nums1, vector<int>& nums2, vector<int>& nums3, vector<int>& nums4) {
        unordered_map<int, int> map;
        for (int a : nums1) {
            for (int b : nums2) {
                map[a + b]++;
            }
        }
        int result = 0;
        for (int c : nums3) {
            for (int d : nums4) {
                auto it = map.find(-(c + d));
                if (it != map.end()) {
                    result += it->second;
                }
            }
        }
        return result;
    }
};`,
  },
  editorial: `## Approach: Two-Pass Hash Map

### Intuition

Iterating over all O(n⁴) index tuples costs up to 1.6 × 10⁹ operations for n = 200 — far too slow. The key insight is to **split the four arrays into two pairs**. We precompute everything we need from the first pair, then query it while scanning the second pair.

### Algorithm

**Pass 1:** Enumerate every pair \`(a, b)\` from \`nums1 × nums2\` and store the frequency of each sum in a hash map.

**Pass 2:** Enumerate every pair \`(c, d)\` from \`nums3 × nums4\`. For each, look up \`-(c + d)\` in the map — this equals the number of first-pair combinations that complete a zero-sum tuple.

\`\`\`
for each (a, b) in nums1 × nums2:
    freq[a + b]++

for each (c, d) in nums3 × nums4:
    result += freq[-(c + d)]
\`\`\`

### Why It Works

We need \`a + b + c + d = 0\`, which rearranges to \`a + b = -(c + d)\`. By counting \`a + b\` frequencies first, each \`(c, d)\` pair harvests all matching \`(a, b)\` pairs in O(1).

### Complexity

| | Time | Space |
|---|---|---|
| Pass 1 | O(n²) | O(n²) |
| Pass 2 | O(n²) | O(1) extra |
| **Total** | **O(n²)** | **O(n²)** |

### C Implementation Note

Since values are bounded to \`[-100, 100]\`, pairwise sums fall in \`[-200, 200]\` — only 401 distinct values. We replace the hash map with a 401-element integer array using \`sum + 200\` as the index, avoiding dynamic allocation entirely.`,
};

export default problem;
