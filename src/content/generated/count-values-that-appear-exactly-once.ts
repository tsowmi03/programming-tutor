import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-values-that-appear-exactly-once",
  title: "Count Values That Appear Exactly Once",
  difficulty: "easy",
  category: "arrays-hashing",
  order: 1007,
  description: `Given an integer array \`nums\`, return the count of values that appear **exactly once** in the array.

\`\`\`text
Example 1:
Input:  nums = [1, 2, 3, 2, 4, 3]
Output: 2
Explanation: 1 appears once, 4 appears once → count = 2
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [5, 5, 5]
Output: 0
Explanation: 5 appears three times, so no value appears exactly once → count = 0
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [7]
Output: 1
Explanation: 7 appears exactly once → count = 1
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 10^5\`
- \`-10^5 <= nums[i] <= 10^5\``,
  hints: [
    `Count how many times each value appears — a frequency table (hash map or array) is useful here.`,
    `After building the frequency table, iterate over the entries and count how many have a frequency of exactly 1.`,
  ],
  guidance: [
    {
      "title": "Start with a frequency count",
      "body": "Loop through `nums` and record how many times each distinct value appears. A dictionary / hash map keyed by value works well.",
      "level": "nudge"
    },
    {
      "title": "Filter on frequency == 1",
      "body": "Once you have the frequency map, a second pass over its entries — keeping only those whose count equals 1 — gives you the answer directly.",
      "level": "strategy"
    },
    {
      "title": "One-liner with built-ins",
      "body": "```\nfreq = buildFrequencyMap(nums)\nresult = 0\nfor each (value, count) in freq:\n    if count == 1:\n        result += 1\nreturn result\n```",
      "level": "pseudocode"
    }
  ],

  signature: {
    "name": "countSingles",
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
          1,
          2,
          3,
          2,
          4,
          3
        ]
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        [
          5,
          5,
          5
        ]
      ],
      "expected": 0,
      "hidden": false
    },
    {
      "input": [
        [
          7
        ]
      ],
      "expected": 1,
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
      "expected": 5,
      "hidden": true
    },
    {
      "input": [
        [
          1,
          1,
          2,
          2,
          3,
          3
        ]
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          -1,
          -2,
          -1,
          3
        ]
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        [
          0,
          0,
          0,
          0
        ]
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          10,
          20,
          10,
          30,
          20,
          40
        ]
      ],
      "expected": 2,
      "hidden": true
    },
    {
      "input": [
        [
          -100000,
          100000,
          -100000
        ]
      ],
      "expected": 1,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_singles(nums: list[int]) -> int:
    # TODO: implement
    return 0
`,
    javascript: `function countSingles(nums) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function countSingles(nums: number[]): number {
    // TODO: implement
    return 0;
}
`,
    java: `class Solution {
    public int countSingles(int[] nums) {
        // TODO: implement
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int CountSingles(int[] nums) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int countSingles(int* nums, int numsSize) {
    // TODO: implement
    return 0;
}
`,
    cpp: `class Solution {
public:
    int countSingles(vector<int>& nums) {
        // TODO: implement
        return 0;
    }
};
`,
  },
  solutions: {
    python: `def count_singles(nums: list[int]) -> int:
    from collections import Counter
    freq = Counter(nums)
    return sum(1 for v in freq.values() if v == 1)
`,
    javascript: `function countSingles(nums) {
    const freq = new Map();
    for (const n of nums) {
        freq.set(n, (freq.get(n) || 0) + 1);
    }
    let count = 0;
    for (const v of freq.values()) {
        if (v === 1) count++;
    }
    return count;
}
`,
    typescript: `function countSingles(nums: number[]): number {
    const freq = new Map<number, number>();
    for (const n of nums) {
        freq.set(n, (freq.get(n) ?? 0) + 1);
    }
    let count = 0;
    for (const v of freq.values()) {
        if (v === 1) count++;
    }
    return count;
}
`,
    java: `class Solution {
    public int countSingles(int[] nums) {
        java.util.HashMap<Integer, Integer> freq = new java.util.HashMap<>();
        for (int n : nums) {
            freq.put(n, freq.getOrDefault(n, 0) + 1);
        }
        int count = 0;
        for (int v : freq.values()) {
            if (v == 1) count++;
        }
        return count;
    }
}
`,
    csharp: `public class Solution {
    public int CountSingles(int[] nums) {
        var freq = new System.Collections.Generic.Dictionary<int, int>();
        foreach (int n in nums) {
            if (freq.ContainsKey(n)) freq[n]++;
            else freq[n] = 1;
        }
        int count = 0;
        foreach (int v in freq.Values) {
            if (v == 1) count++;
        }
        return count;
    }
}
`,
    c: `int countSingles(int* nums, int numsSize) {
    int result = 0;
    for (int i = 0; i < numsSize; i++) {
        int cnt = 0;
        for (int j = 0; j < numsSize; j++) {
            if (nums[j] == nums[i]) cnt++;
        }
        if (cnt == 1) result++;
    }
    return result;
}
`,
    cpp: `class Solution {
public:
    int countSingles(vector<int>& nums) {
        unordered_map<int, int> freq;
        for (int n : nums) freq[n]++;
        int count = 0;
        for (auto& p : freq) {
            if (p.second == 1) count++;
        }
        return count;
    }
};
`,
  },
  editorial: `## Approach: Frequency Map

### Intuition
We need to know how many times each value appears. A hash map (or dictionary) lets us record these frequencies in a single pass, then a second pass over the map counts entries with frequency exactly 1.

### Algorithm
1. **Build frequency map** — iterate over \`nums\`; for each value increment its count in the map.
2. **Count singles** — iterate over the map values; accumulate entries where the count equals 1.
3. Return the accumulated count.

### Complexity
- **Time:** O(n) — two linear passes (building the map + scanning values).
- **Space:** O(k) where k is the number of distinct values (at most n).

### Note on the C solution
Because C lacks a standard hash map, the reference solution uses a brute-force O(n²) double-loop which is acceptable given the constraint \`n ≤ 10^5\` for a simple judge. In production you would use a sorted array or a hand-rolled hash table.`,
};

export default problem;
