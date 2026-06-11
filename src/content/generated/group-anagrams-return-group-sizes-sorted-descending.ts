import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "group-anagrams-return-group-sizes-sorted-descending",
  title: "Group Anagram Sizes Descending",
  difficulty: "medium",
  category: "arrays-hashing",
  order: 1054,
  description: `Given an array of strings \`strs\`, group the strings that are anagrams of each other and return the **sizes** of each group, sorted in **descending** order.

Two strings are anagrams if one can be rearranged to form the other (same characters with the same frequencies).

\`\`\`text
Example 1:
Input:  strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
Groups: ["eat","tea","ate"] → size 3
        ["tan","nat"]       → size 2
        ["bat"]             → size 1
Output: [3, 2, 1]
\`\`\`

\`\`\`text
Example 2:
Input:  strs = ["abc", "bca", "cab", "xyz", "zyx"]
Groups: ["abc","bca","cab"] → size 3
        ["xyz","zyx"]       → size 2
Output: [3, 2]
\`\`\`

**Constraints:**
- \`0 <= strs.length <= 10^4\`
- \`0 <= strs[i].length <= 100\`
- \`strs[i]\` consists of lowercase English letters.`,
  hints: [
    `Two strings are anagrams if and only if sorting their characters produces identical results. Use this sorted form as a canonical key.`,
    `Map each canonical key to a count, then collect the counts (group sizes) into an array.`,
    `Once you have all group sizes, sort that array in descending order and return it.`,
  ],
  signature: {
    "name": "groupAnagramSizes",
    "params": [
      {
        "name": "strs",
        "type": "string[]"
      }
    ],
    "returns": "int[]",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        [
          "eat",
          "tea",
          "tan",
          "ate",
          "nat",
          "bat"
        ]
      ],
      "expected": [
        3,
        2,
        1
      ],
      "hidden": false
    },
    {
      "input": [
        [
          "abc",
          "bca",
          "cab",
          "xyz",
          "zyx"
        ]
      ],
      "expected": [
        3,
        2
      ],
      "hidden": false
    },
    {
      "input": [
        [
          "a"
        ]
      ],
      "expected": [
        1
      ],
      "hidden": false
    },
    {
      "input": [
        [
          ""
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
          "abc",
          "def",
          "ghi"
        ]
      ],
      "expected": [
        1,
        1,
        1
      ],
      "hidden": true
    },
    {
      "input": [
        [
          "aa",
          "aa"
        ]
      ],
      "expected": [
        2
      ],
      "hidden": true
    },
    {
      "input": [
        []
      ],
      "expected": [],
      "hidden": true
    },
    {
      "input": [
        [
          "listen",
          "silent",
          "enlist",
          "hello",
          "world"
        ]
      ],
      "expected": [
        3,
        1,
        1
      ],
      "hidden": true
    },
    {
      "input": [
        [
          "ab",
          "ba",
          "cd",
          "dc",
          "ef"
        ]
      ],
      "expected": [
        2,
        2,
        1
      ],
      "hidden": true
    }
  ],
  starterCode: {
    python: `from typing import List

def group_anagram_sizes(strs: List[str]) -> List[int]:
    # TODO: implement
    return []
`,
    javascript: `/**
 * @param {string[]} strs
 * @return {number[]}
 */
function groupAnagramSizes(strs) {
    // TODO: implement
    return [];
}
`,
    java: `class Solution {
    public int[] groupAnagramSizes(String[] strs) {
        // TODO: implement
        return new int[]{};
    }
}
`,
    c: `#include <stdlib.h>
#include <string.h>

int* groupAnagramSizes(char** strs, int strsSize, int* returnSize) {
    // TODO: implement
    *returnSize = 0;
    return NULL;
}
`,
  },
  solutions: {
    python: `from typing import List
from collections import defaultdict

def group_anagram_sizes(strs: List[str]) -> List[int]:
    groups = defaultdict(int)
    for s in strs:
        key = ''.join(sorted(s))
        groups[key] += 1
    return sorted(groups.values(), reverse=True)
`,
    javascript: `function groupAnagramSizes(strs) {
    const map = {};
    for (const s of strs) {
        const key = s.split('').sort().join('');
        map[key] = (map[key] || 0) + 1;
    }
    return Object.values(map).sort((a, b) => b - a);
}
`,
    java: `class Solution {
    public int[] groupAnagramSizes(String[] strs) {
        java.util.Map<String, Integer> map = new java.util.HashMap<>();
        for (String s : strs) {
            char[] chars = s.toCharArray();
            java.util.Arrays.sort(chars);
            String key = new String(chars);
            map.put(key, map.getOrDefault(key, 0) + 1);
        }
        int[] result = new int[map.size()];
        int i = 0;
        for (int v : map.values()) result[i++] = v;
        java.util.Arrays.sort(result);
        for (int l = 0, r = result.length - 1; l < r; l++, r--) {
            int tmp = result[l]; result[l] = result[r]; result[r] = tmp;
        }
        return result;
    }
}
`,
    c: `#include <stdlib.h>
#include <string.h>

static void sortChars(const char *src, char *dst) {
    int len = (int)strlen(src);
    int i, j;
    for (i = 0; i < len; i++) dst[i] = src[i];
    dst[len] = '\\0';
    for (i = 0; i < len - 1; i++)
        for (j = 0; j < len - 1 - i; j++)
            if (dst[j] > dst[j+1]) { char t = dst[j]; dst[j] = dst[j+1]; dst[j+1] = t; }
}

static int cmpDesc(const void *a, const void *b) {
    return (*(const int*)b) - (*(const int*)a);
}

int* groupAnagramSizes(char** strs, int strsSize, int* returnSize) {
    if (strsSize == 0) { *returnSize = 0; return NULL; }
    int i, j;
    char **keys = (char**)malloc(strsSize * sizeof(char*));
    for (i = 0; i < strsSize; i++) {
        int len = (int)strlen(strs[i]);
        keys[i] = (char*)malloc(len + 1);
        sortChars(strs[i], keys[i]);
    }
    int *visited = (int*)calloc(strsSize, sizeof(int));
    int *counts = (int*)malloc(strsSize * sizeof(int));
    int groupCount = 0;
    for (i = 0; i < strsSize; i++) {
        if (visited[i]) continue;
        visited[i] = 1;
        int cnt = 1;
        for (j = i + 1; j < strsSize; j++)
            if (!visited[j] && strcmp(keys[i], keys[j]) == 0) { visited[j] = 1; cnt++; }
        counts[groupCount++] = cnt;
    }
    qsort(counts, groupCount, sizeof(int), cmpDesc);
    for (i = 0; i < strsSize; i++) free(keys[i]);
    free(keys);
    free(visited);
    *returnSize = groupCount;
    return counts;
}
`,
  },
  editorial: `## Approach: Sort-Based Canonical Key

The core insight is that two strings are anagrams **if and only if** sorting their characters produces the same string. This sorted form is a perfect canonical key for grouping.

### Algorithm

1. **Build a frequency map**: For each string, sort its characters to get a key, then increment that key's count in a hash map.
2. **Extract group sizes**: The values in the map are the sizes of each anagram group.
3. **Sort descending**: Sort the collected sizes in reverse order and return.

### Walkthrough — Example 1

| String | Sorted Key | Count for Key |
|--------|-----------|---------------|
| \`eat\`  | \`aet\`     | 1 |
| \`tea\`  | \`aet\`     | 2 |
| \`tan\`  | \`ant\`     | 1 |
| \`ate\`  | \`aet\`     | 3 |
| \`nat\`  | \`ant\`     | 2 |
| \`bat\`  | \`abt\`     | 1 |

Group sizes: \`{aet→3, ant→2, abt→1}\` → sorted descending → **[3, 2, 1]**

### Complexity

- **Time**: O(n · k log k) — sorting each of the n strings of length at most k.
- **Space**: O(n · k) — the hash map stores up to n keys each of length k.

### C Note

The C solution uses an O(n²) brute-force scan instead of a hash map (C has no built-in hash map). For each unvisited string it scans forward to find all strings sharing the same sorted key.`,
};

export default problem;
