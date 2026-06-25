import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "count-values-that-appear-more-than-once",
  title: "Count Duplicate Values",
  difficulty: "easy",
  category: "arrays-hashing",
  order: 1008,
  description: `Given an integer array \`nums\`, return the number of **distinct** values that appear **more than once** in the array.

\`\`\`text
Example 1:
Input:  nums = [1, 2, 3, 2, 4, 3, 5]
Output: 2
Explanation: 2 appears twice and 3 appears twice, so there are 2 distinct duplicate values.
\`\`\`

\`\`\`text
Example 2:
Input:  nums = [7, 7, 7, 1, 2]
Output: 1
Explanation: Only 7 appears more than once.
\`\`\`

\`\`\`text
Example 3:
Input:  nums = [1, 2, 3]
Output: 0
Explanation: No value appears more than once.
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 10^5\`
- \`-10^9 <= nums[i] <= 10^9\``,
  hints: [
    `Try counting how many times each value appears. A hash map is a natural fit.`,
    `Once you have the counts, iterate over them and tally how many have a count greater than 1.`,
  ],
  guidance: [
    {
      "title": "Think about frequency counting",
      "body": "You need to know how many times each distinct value appears. What data structure lets you look up a value and retrieve its count efficiently?",
      "level": "nudge"
    },
    {
      "title": "Two-pass strategy",
      "body": "1. First pass: build a frequency map — for each element in `nums`, increment its count.\n2. Second pass: iterate over the frequency map and count entries whose value is greater than 1.",
      "level": "strategy"
    },
    {
      "title": "Watch out for repeated duplicates",
      "body": "If a value appears 5 times it still counts as **one** duplicate value. Make sure you count *distinct* values with frequency > 1, not the total number of extra occurrences.",
      "level": "pitfall"
    },
    {
      "title": "Implementation shape",
      "body": "```\nfreq = empty map\nfor x in nums:\n    freq[x] += 1\n\nresult = 0\nfor count in freq.values():\n    if count > 1:\n        result += 1\nreturn result\n```",
      "level": "pseudocode"
    }
  ],

  signature: {
    "name": "countDuplicates",
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
          3,
          5
        ]
      ],
      "expected": 2,
      "hidden": false
    },
    {
      "input": [
        [
          7,
          7,
          7,
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
          1,
          2,
          3
        ]
      ],
      "expected": 0,
      "hidden": false
    },
    {
      "input": [
        [
          5
        ]
      ],
      "expected": 0,
      "hidden": true
    },
    {
      "input": [
        [
          4,
          4,
          4,
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
          -1,
          2,
          2,
          3
        ]
      ],
      "expected": 2,
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
          3,
          4,
          4
        ]
      ],
      "expected": 4,
      "hidden": true
    },
    {
      "input": [
        [
          0,
          0,
          0,
          1,
          1,
          2
        ]
      ],
      "expected": 2,
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
          10,
          20,
          30,
          40,
          50
        ]
      ],
      "expected": 5,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def count_duplicates(nums: list[int]) -> int:
    # TODO: implement
    return 0
`,
    javascript: `function countDuplicates(nums) {
    // TODO: implement
    return 0;
}
`,
    typescript: `function countDuplicates(nums: number[]): number {
    // TODO: implement
    return 0;
}
`,
    java: `class Solution {
    public int countDuplicates(int[] nums) {
        // TODO: implement
        return 0;
    }
}
`,
    csharp: `public class Solution {
    public int CountDuplicates(int[] nums) {
        // TODO: implement
        return 0;
    }
}
`,
    c: `int countDuplicates(int* nums, int numsSize) {
    // TODO: implement
    return 0;
}
`,
    cpp: `class Solution {
public:
    int countDuplicates(vector<int>& nums) {
        // TODO: implement
        return 0;
    }
};
`,
  },
  solutions: {
    python: `def count_duplicates(nums: list[int]) -> int:
    from collections import Counter
    freq = Counter(nums)
    return sum(1 for count in freq.values() if count > 1)
`,
    javascript: `function countDuplicates(nums) {
    const freq = new Map();
    for (const x of nums) {
        freq.set(x, (freq.get(x) || 0) + 1);
    }
    let result = 0;
    for (const count of freq.values()) {
        if (count > 1) result++;
    }
    return result;
}
`,
    typescript: `function countDuplicates(nums: number[]): number {
    const freq = new Map<number, number>();
    for (const x of nums) {
        freq.set(x, (freq.get(x) || 0) + 1);
    }
    let result = 0;
    for (const count of freq.values()) {
        if (count > 1) result++;
    }
    return result;
}
`,
    java: `class Solution {
    public int countDuplicates(int[] nums) {
        java.util.HashMap<Integer, Integer> freq = new java.util.HashMap<>();
        for (int x : nums) {
            freq.put(x, freq.getOrDefault(x, 0) + 1);
        }
        int result = 0;
        for (int count : freq.values()) {
            if (count > 1) result++;
        }
        return result;
    }
}
`,
    csharp: `using System.Collections.Generic;
public class Solution {
    public int CountDuplicates(int[] nums) {
        var freq = new Dictionary<int, int>();
        foreach (int x in nums) {
            if (freq.ContainsKey(x)) freq[x]++;
            else freq[x] = 1;
        }
        int result = 0;
        foreach (int count in freq.Values) {
            if (count > 1) result++;
        }
        return result;
    }
}
`,
    c: `#include <stdlib.h>

int countDuplicates(int* nums, int numsSize) {
    int* visited = (int*)calloc(numsSize, sizeof(int));
    int result = 0;
    for (int i = 0; i < numsSize; i++) {
        if (visited[i]) continue;
        int cnt = 1;
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[j] == nums[i]) {
                cnt++;
                visited[j] = 1;
            }
        }
        if (cnt > 1) result++;
    }
    free(visited);
    return result;
}
`,
    cpp: `class Solution {
public:
    int countDuplicates(vector<int>& nums) {
        unordered_map<int, int> freq;
        for (int x : nums) freq[x]++;
        int result = 0;
        for (auto& p : freq) {
            if (p.second > 1) result++;
        }
        return result;
    }
};
`,
  },
  editorial: `## Approach: Frequency Map

We count how many times each distinct value appears, then count how many distinct values have a frequency greater than 1.

### Steps
1. **Build a frequency map**: Iterate through \`nums\`. For each element, increment its count in a hash map.
2. **Count duplicates**: Iterate over the map's values. For each count greater than 1, increment the answer by 1.

### Why it works
A hash map gives O(1) average-time lookups and insertions. After one pass we have the frequency of every distinct value, and a second pass over the map (which has at most \`n\` entries) tallies the answer.

### Complexity
- **Time:** O(n) — one pass to build the map, one pass over at most n entries.
- **Space:** O(n) — the frequency map stores at most n entries.

### Edge cases
- A single element → no duplicates, return 0.
- All elements identical → exactly one distinct duplicate value, return 1.
- All elements distinct → return 0.
- Negative numbers are handled naturally by the hash map.`,
};

export default problem;
