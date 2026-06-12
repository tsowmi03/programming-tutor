import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "group-counts-return-the-k-most-frequent-elements",
  title: "Top K Frequent Elements",
  difficulty: "medium",
  category: "arrays-hashing",
  order: 1053,
  description: `Given an integer array \`nums\` and an integer \`k\`, return the **k most frequent elements**.

You may return the answer in **any order**.

It is guaranteed that the answer is unique — no two elements just outside the top \`k\` share the same frequency as the k-th most frequent element.

**Example 1:**
\`\`\`text
Input:  nums = [1, 1, 1, 2, 2, 3], k = 2
Output: [1, 2]
Explanation: 1 appears 3 times (most frequent),
             2 appears 2 times. The top 2 are {1, 2}.
\`\`\`

**Example 2:**
\`\`\`text
Input:  nums = [1, 2, 2, 3, 3, 3], k = 2
Output: [2, 3]
Explanation: 3 -> 3 times, 2 -> 2 times, 1 -> 1 time.
             The top 2 most frequent elements are 3 and 2.
\`\`\`

**Constraints:**
- \`1 <= nums.length <= 10^4\`
- \`-10^4 <= nums[i] <= 10^4\`
- \`1 <= k <= number of distinct elements in nums\`
- The answer is guaranteed to be unique.`,
  hints: [
    `Build a frequency map: iterate through \`nums\` and count how many times each element appears.`,
    `Once you have the frequencies, think about how to extract the top k. Sorting the distinct elements by their frequency in descending order and taking the first k works.`,
    `Since frequencies are integers in [1, n], bucket sort lets you collect the top k in O(n) total time.`,
    `A min-heap of size k is another clean approach: push (freq, element) pairs and pop the minimum whenever the heap exceeds size k.`,
  ],
  signature: {
    "name": "topKFrequent",
    "params": [
      {
        "name": "nums",
        "type": "int[]"
      },
      {
        "name": "k",
        "type": "int"
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
          1,
          1,
          2,
          2,
          3
        ],
        2
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
        ],
        1
      ],
      "expected": [
        1
      ],
      "hidden": false
    },
    {
      "input": [
        [
          1,
          2,
          2,
          3,
          3,
          3
        ],
        2
      ],
      "expected": [
        2,
        3
      ],
      "hidden": false
    },
    {
      "input": [
        [
          4,
          4,
          4,
          2,
          2,
          1
        ],
        1
      ],
      "expected": [
        4
      ],
      "hidden": true
    },
    {
      "input": [
        [
          -1,
          -1,
          0,
          1,
          1,
          1
        ],
        2
      ],
      "expected": [
        -1,
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
          1,
          2,
          1
        ],
        1
      ],
      "expected": [
        1
      ],
      "hidden": true
    },
    {
      "input": [
        [
          7,
          7,
          7,
          7,
          3,
          3,
          3,
          2,
          2,
          1
        ],
        3
      ],
      "expected": [
        2,
        3,
        7
      ],
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
          3
        ],
        3
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
          1,
          1,
          2,
          2,
          2,
          3,
          3,
          4
        ],
        2
      ],
      "expected": [
        1,
        2
      ],
      "hidden": true
    }
  ],
  starterCode: {
    python: `def top_kfrequent(nums, k):
    # TODO: implement
    return []
`,
    javascript: `function topKFrequent(nums, k) {
    // TODO: implement
    return [];
}
`,
    typescript: `function topKFrequent(nums: number[], k: number): number[] {
    // TODO: implement
    return [];
}`,
    java: `class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        // TODO: implement
        return new int[]{};
    }
}
`,
    csharp: `using System.Collections.Generic;

public class Solution {
    public int[] TopKFrequent(int[] nums, int k) {
        // TODO: implement
        return new int[]{};
    }
}`,
    c: `int* topKFrequent(int* nums, int numsSize, int k, int* returnSize) {
    // TODO: implement
    *returnSize = 0;
    return NULL;
}
`,
    cpp: `class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        // TODO: implement
        return {};
    }
};`,
  },
  solutions: {
    python: `from collections import Counter

def top_kfrequent(nums, k):
    count = Counter(nums)
    return [x for x, _ in count.most_common(k)]
`,
    javascript: `function topKFrequent(nums, k) {
    const count = new Map();
    for (const n of nums) {
        count.set(n, (count.get(n) || 0) + 1);
    }
    return [...count.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, k)
        .map(([num]) => num);
}
`,
    typescript: `function topKFrequent(nums: number[], k: number): number[] {
    const count = new Map<number, number>();
    for (const n of nums) {
        count.set(n, (count.get(n) || 0) + 1);
    }
    return [...count.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, k)
        .map(([num]) => num);
}`,
    java: `class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        java.util.Map<Integer, Integer> count = new java.util.HashMap<>();
        for (int n : nums) count.merge(n, 1, Integer::sum);
        java.util.List<java.util.Map.Entry<Integer, Integer>> entries =
            new java.util.ArrayList<>(count.entrySet());
        entries.sort((a, b) -> b.getValue() - a.getValue());
        int[] result = new int[k];
        for (int i = 0; i < k; i++) result[i] = entries.get(i).getKey();
        return result;
    }
}
`,
    csharp: `using System.Collections.Generic;

public class Solution {
    public int[] TopKFrequent(int[] nums, int k) {
        Dictionary<int, int> count = new Dictionary<int, int>();
        foreach (int n in nums) {
            if (count.ContainsKey(n)) count[n]++;
            else count[n] = 1;
        }
        List<KeyValuePair<int, int>> entries = new List<KeyValuePair<int, int>>(count);
        entries.Sort((a, b) => b.Value - a.Value);
        int[] result = new int[k];
        for (int i = 0; i < k; i++) result[i] = entries[i].Key;
        return result;
    }
}`,
    c: `#include <stdlib.h>

int* topKFrequent(int* nums, int numsSize, int k, int* returnSize) {
    int* vals = (int*)malloc(numsSize * sizeof(int));
    int* cnts = (int*)malloc(numsSize * sizeof(int));
    int m = 0;
    for (int i = 0; i < numsSize; i++) {
        int found = 0;
        for (int j = 0; j < m; j++) {
            if (vals[j] == nums[i]) { cnts[j]++; found = 1; break; }
        }
        if (!found) { vals[m] = nums[i]; cnts[m] = 1; m++; }
    }
    /* selection sort descending by frequency */
    for (int i = 0; i < m - 1; i++) {
        int maxIdx = i;
        for (int j = i + 1; j < m; j++) {
            if (cnts[j] > cnts[maxIdx]) maxIdx = j;
        }
        int tmp = vals[i]; vals[i] = vals[maxIdx]; vals[maxIdx] = tmp;
        tmp = cnts[i]; cnts[i] = cnts[maxIdx]; cnts[maxIdx] = tmp;
    }
    int* result = (int*)malloc(k * sizeof(int));
    for (int i = 0; i < k; i++) result[i] = vals[i];
    *returnSize = k;
    free(vals);
    free(cnts);
    return result;
}
`,
    cpp: `class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int, int> count;
        for (int n : nums) count[n]++;
        vector<pair<int, int>> entries(count.begin(), count.end());
        sort(entries.begin(), entries.end(), [](const pair<int,int>& a, const pair<int,int>& b) {
            return b.second < a.second;
        });
        vector<int> result;
        for (int i = 0; i < k; i++) result.push_back(entries[i].first);
        return result;
    }
};`,
  },
  editorial: `## Approach: Frequency Map + Sort

### Step 1 – Build a frequency map
Iterate through \`nums\` once, tallying how often each element appears. This costs **O(n)** time and **O(d)** space, where \`d\` is the number of distinct elements.

### Step 2 – Sort by frequency
Collect the distinct \`(element, count)\` pairs and sort them in **descending** order of count. Since \`d ≤ n\`, this costs **O(d log d) ⊆ O(n log n)**.

### Step 3 – Take the first k
Return the first \`k\` elements from the sorted list.

**Overall:** O(n log n) time, O(n) space.

---

### O(n) Alternative — Bucket Sort

Because every frequency is an integer in \`[1, n]\`, create \`n + 1\` buckets where \`bucket[f]\` holds all elements whose frequency is exactly \`f\`. After populating buckets in one pass, scan from index \`n\` down to \`1\` and collect elements until \`k\` are gathered.

This achieves **O(n)** time with **O(n)** space.

---

| Approach | Time | Space |
|---|---|---|
| Frequency map + sort | O(n log n) | O(n) |
| Frequency map + bucket sort | O(n) | O(n) |
`,
};

export default problem;
