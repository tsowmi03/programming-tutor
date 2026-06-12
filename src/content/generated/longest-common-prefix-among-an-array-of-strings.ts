import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "longest-common-prefix-among-an-array-of-strings",
  title: "Longest Common Prefix",
  difficulty: "medium",
  category: "arrays-hashing",
  order: 1057,
  description: `Given an array of strings \`strs\`, find and return the **longest common prefix** string shared among **all** strings in the array.

If there is no common prefix, return an empty string \`""\`.

**Example 1:**
\`\`\`text
Input:  strs = ["flower","flow","flight"]
Output: "fl"
Explanation: "fl" is the longest prefix shared by all three strings.
\`\`\`

**Example 2:**
\`\`\`text
Input:  strs = ["dog","racecar","car"]
Output: ""
Explanation: No single character is shared as a leading prefix by all strings.
\`\`\`

**Example 3:**
\`\`\`text
Input:  strs = ["apple","application","apply"]
Output: "appl"
Explanation: The first four characters match across all three strings.
\`\`\`

**Constraints:**
- \`1 <= strs.length <= 200\`
- \`0 <= strs[i].length <= 200\`
- \`strs[i]\` consists of lowercase English letters only.`,
  hints: [
    `Pick one string (e.g., the first) as your starting candidate prefix. How does it change as you compare it against each subsequent string?`,
    `If the current string does not begin with the candidate prefix, shorten the prefix by removing its last character and check again. What happens when the prefix becomes empty?`,
    `Alternatively, think column by column: scan position 0 of every string, then position 1, and so on — stop the moment any string differs or runs out of characters.`,
  ],
  signature: {
    "name": "longestCommonPrefix",
    "params": [
      {
        "name": "strs",
        "type": "string[]"
      }
    ],
    "returns": "string"
  },
  testCases: [
    {
      "input": [
        [
          "flower",
          "flow",
          "flight"
        ]
      ],
      "expected": "fl",
      "hidden": false
    },
    {
      "input": [
        [
          "dog",
          "racecar",
          "car"
        ]
      ],
      "expected": "",
      "hidden": false
    },
    {
      "input": [
        [
          "apple",
          "application",
          "apply"
        ]
      ],
      "expected": "appl",
      "hidden": false
    },
    {
      "input": [
        [
          "a"
        ]
      ],
      "expected": "a",
      "hidden": true
    },
    {
      "input": [
        [
          "",
          "abc"
        ]
      ],
      "expected": "",
      "hidden": true
    },
    {
      "input": [
        [
          "abc",
          "abc",
          "abc"
        ]
      ],
      "expected": "abc",
      "hidden": true
    },
    {
      "input": [
        [
          "prefix",
          "pre",
          "prevent"
        ]
      ],
      "expected": "pre",
      "hidden": true
    },
    {
      "input": [
        [
          "xyz",
          "xylophone",
          "xylem"
        ]
      ],
      "expected": "xy",
      "hidden": true
    },
    {
      "input": [
        [
          "interview",
          "internal",
          "into"
        ]
      ],
      "expected": "int",
      "hidden": true
    },
    {
      "input": [
        [
          "ab",
          "a"
        ]
      ],
      "expected": "a",
      "hidden": true
    }
  ],
  starterCode: {
    python: `def longest_common_prefix(strs):
    # TODO: implement
    return ""
`,
    javascript: `function longestCommonPrefix(strs) {
    // TODO: implement
    return "";
}
`,
    typescript: `function longestCommonPrefix(strs: string[]): string {
    // TODO: implement
    return "";
}`,
    java: `class Solution {
    public String longestCommonPrefix(String[] strs) {
        // TODO: implement
        return "";
    }
}
`,
    csharp: `public class Solution {
    public string LongestCommonPrefix(string[] strs) {
        // TODO: implement
        return "";
    }
}`,
    c: `#include <string.h>
#include <stdlib.h>

char* longestCommonPrefix(char** strs, int strsSize) {
    // TODO: implement
    char* result = (char*)malloc(1);
    result[0] = '\\0';
    return result;
}
`,
    cpp: `class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        // TODO: implement
        return "";
    }
};`,
  },
  solutions: {
    python: `def longest_common_prefix(strs):
    if not strs:
        return ""
    prefix = strs[0]
    for s in strs[1:]:
        while not s.startswith(prefix):
            prefix = prefix[:-1]
            if not prefix:
                return ""
    return prefix
`,
    javascript: `function longestCommonPrefix(strs) {
    if (strs.length === 0) return "";
    let prefix = strs[0];
    for (let i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.slice(0, -1);
            if (prefix === "") return "";
        }
    }
    return prefix;
}
`,
    typescript: `function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) return "";
    let prefix = strs[0];
    for (let i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.slice(0, -1);
            if (prefix === "") return "";
        }
    }
    return prefix;
}`,
    java: `class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs.length == 0) return "";
        String prefix = strs[0];
        for (int i = 1; i < strs.length; i++) {
            while (!strs[i].startsWith(prefix)) {
                prefix = prefix.substring(0, prefix.length() - 1);
                if (prefix.isEmpty()) return "";
            }
        }
        return prefix;
    }
}
`,
    csharp: `public class Solution {
    public string LongestCommonPrefix(string[] strs) {
        if (strs.Length == 0) return "";
        string prefix = strs[0];
        for (int i = 1; i < strs.Length; i++) {
            while (!strs[i].StartsWith(prefix)) {
                prefix = prefix.Substring(0, prefix.Length - 1);
                if (prefix == "") return "";
            }
        }
        return prefix;
    }
}`,
    c: `#include <string.h>
#include <stdlib.h>

char* longestCommonPrefix(char** strs, int strsSize) {
    if (strsSize == 0) {
        char* result = (char*)malloc(1);
        result[0] = '\\0';
        return result;
    }
    int prefixLen = (int)strlen(strs[0]);
    for (int i = 1; i < strsSize; i++) {
        int j = 0;
        while (j < prefixLen && strs[i][j] != '\\0' && strs[i][j] == strs[0][j]) {
            j++;
        }
        prefixLen = j;
        if (prefixLen == 0) break;
    }
    char* result = (char*)malloc(prefixLen + 1);
    if (prefixLen > 0) strncpy(result, strs[0], prefixLen);
    result[prefixLen] = '\\0';
    return result;
}
`,
    cpp: `class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        if (strs.empty()) return "";
        string prefix = strs[0];
        for (int i = 1; i < (int)strs.size(); i++) {
            while (strs[i].find(prefix) != 0) {
                prefix = prefix.substr(0, prefix.length() - 1);
                if (prefix.empty()) return "";
            }
        }
        return prefix;
    }
};`,
  },
  editorial: `## Approach: Iterative Prefix Shrinking

### Idea
Use the first string as an initial candidate prefix. For each subsequent string, repeatedly trim one character from the right end of the prefix until that string starts with it — or the prefix empties out entirely.

### Algorithm
1. If the array is empty, return \`""\`.
2. Set \`prefix = strs[0]\`.
3. For each string \`s\` in \`strs[1:]\`:
   - While \`s\` does **not** start with \`prefix\`, remove the last character of \`prefix\`.
   - If \`prefix\` is now empty, return \`""\`.
4. Return \`prefix\`.

### Trace on Example 1
\`\`\`
strs = ["flower","flow","flight"]
prefix = "flower"
"flow" does not start with "flower" → prefix = "flowe"
"flow" does not start with "flowe"  → prefix = "flow"
"flow" starts with "flow" ✓
"flight" does not start with "flow" → prefix = "flo"
"flight" does not start with "flo"  → prefix = "fl"
"flight" starts with "fl" ✓
Return "fl"
\`\`\`

### Complexity
- **Time:** O(S), where S is the total number of characters across all strings. Each character is examined at most once before the prefix shrinks past it.
- **Space:** O(1) extra (excluding the output string).

### Why This Works
Any common prefix of all strings must also be a prefix of \`strs[0]\`. Starting from \`strs[0]\` and shrinking guarantees we never miss the longest valid answer, and we stop as soon as we find it.`,
};

export default problem;
