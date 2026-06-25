import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "merge-two-strings-by-alternating-characters",
  title: "Merge Strings Alternately",
  difficulty: "easy",
  category: "two-pointers",
  order: 1013,
  description: `Given two strings \`word1\` and \`word2\`, merge them by alternating their characters, starting with \`word1\`. If one string is longer than the other, append the remaining characters of the longer string at the end.

Return the merged string.

\`\`\`text
Example 1:
Input:  word1 = "abc", word2 = "pqr"
Output: "apbqcr"
Explanation: Characters alternate: a,p,b,q,c,r
\`\`\`

\`\`\`text
Example 2:
Input:  word1 = "ab", word2 = "pqrs"
Output: "apbqrs"
Explanation: After alternating a,p,b,q the remaining "rs" from word2 is appended.
\`\`\`

\`\`\`text
Example 3:
Input:  word1 = "abcd", word2 = "pq"
Output: "apbqcd"
Explanation: After alternating a,p,b,q the remaining "cd" from word1 is appended.
\`\`\`

**Constraints:**
- \`1 <= word1.length, word2.length <= 100\`
- \`word1\` and \`word2\` consist of lowercase English letters only.`,
  hints: [
    `Use two pointers, one for each string, and advance them together one step at a time.`,
    `When one pointer goes out of bounds, just append the rest of the other string.`,
  ],
  guidance: [
    {
      "title": "Start with two pointers",
      "body": "Initialize pointer `i = 0` for `word1` and `j = 0` for `word2`. Advance both together in a loop.",
      "level": "nudge"
    },
    {
      "title": "Loop until both are exhausted",
      "body": "Run the loop while `i < len(word1) OR j < len(word2)`. Inside, append `word1[i]` if `i` is valid, then append `word2[j]` if `j` is valid, then increment both.",
      "level": "strategy"
    },
    {
      "title": "Avoid index-out-of-bounds",
      "body": "Always guard each index access with a bounds check before reading the character.",
      "level": "pitfall"
    },
    {
      "title": "Implementation shape",
      "body": "```\nresult = []\ni, j = 0, 0\nwhile i < len(word1) or j < len(word2):\n    if i < len(word1): result.append(word1[i]); i++\n    if j < len(word2): result.append(word2[j]); j++\nreturn join(result)\n```",
      "level": "pseudocode"
    }
  ],

  signature: {
    "name": "mergeAlternately",
    "params": [
      {
        "name": "word1",
        "type": "string"
      },
      {
        "name": "word2",
        "type": "string"
      }
    ],
    "returns": "string",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        "abc",
        "pqr"
      ],
      "expected": "apbqcr",
      "hidden": false
    },
    {
      "input": [
        "ab",
        "pqrs"
      ],
      "expected": "apbqrs",
      "hidden": false
    },
    {
      "input": [
        "abcd",
        "pq"
      ],
      "expected": "apbqcd",
      "hidden": false
    },
    {
      "input": [
        "a",
        "b"
      ],
      "expected": "ab",
      "hidden": true
    },
    {
      "input": [
        "a",
        "bcd"
      ],
      "expected": "abcd",
      "hidden": true
    },
    {
      "input": [
        "abc",
        "d"
      ],
      "expected": "adbc",
      "hidden": true
    },
    {
      "input": [
        "z",
        "z"
      ],
      "expected": "zz",
      "hidden": true
    },
    {
      "input": [
        "aaa",
        "bbb"
      ],
      "expected": "ababab",
      "hidden": true
    },
    {
      "input": [
        "hello",
        "world"
      ],
      "expected": "hweolrllod",
      "hidden": true
    }
  ],
  starterCode: {
    python: `def merge_alternately(word1: str, word2: str) -> str:
    # TODO: implement
    return ""
`,
    javascript: `function mergeAlternately(word1, word2) {
    // TODO: implement
    return "";
}
`,
    typescript: `function mergeAlternately(word1: string, word2: string): string {
    // TODO: implement
    return "";
}
`,
    java: `class Solution {
    public String mergeAlternately(String word1, String word2) {
        // TODO: implement
        return "";
    }
}
`,
    csharp: `public class Solution {
    public string MergeAlternately(string word1, string word2) {
        // TODO: implement
        return "";
    }
}
`,
    c: `#include <stdlib.h>
#include <string.h>
char* mergeAlternately(char* word1, char* word2) {
    // TODO: implement
    return "";
}
`,
    cpp: `class Solution {
public:
    string mergeAlternately(string word1, string word2) {
        // TODO: implement
        return "";
    }
};
`,
  },
  solutions: {
    python: `def merge_alternately(word1: str, word2: str) -> str:
    result = []
    i, j = 0, 0
    while i < len(word1) or j < len(word2):
        if i < len(word1):
            result.append(word1[i])
            i += 1
        if j < len(word2):
            result.append(word2[j])
            j += 1
    return ''.join(result)
`,
    javascript: `function mergeAlternately(word1, word2) {
    let result = '';
    let i = 0, j = 0;
    while (i < word1.length || j < word2.length) {
        if (i < word1.length) result += word1[i++];
        if (j < word2.length) result += word2[j++];
    }
    return result;
}
`,
    typescript: `function mergeAlternately(word1: string, word2: string): string {
    let result = '';
    let i = 0, j = 0;
    while (i < word1.length || j < word2.length) {
        if (i < word1.length) result += word1[i++];
        if (j < word2.length) result += word2[j++];
    }
    return result;
}
`,
    java: `class Solution {
    public String mergeAlternately(String word1, String word2) {
        StringBuilder sb = new StringBuilder();
        int i = 0, j = 0;
        while (i < word1.length() || j < word2.length()) {
            if (i < word1.length()) sb.append(word1.charAt(i++));
            if (j < word2.length()) sb.append(word2.charAt(j++));
        }
        return sb.toString();
    }
}
`,
    csharp: `public class Solution {
    public string MergeAlternately(string word1, string word2) {
        System.Text.StringBuilder sb = new System.Text.StringBuilder();
        int i = 0, j = 0;
        while (i < word1.Length || j < word2.Length) {
            if (i < word1.Length) sb.Append(word1[i++]);
            if (j < word2.Length) sb.Append(word2[j++]);
        }
        return sb.ToString();
    }
}
`,
    c: `#include <stdlib.h>
#include <string.h>
char* mergeAlternately(char* word1, char* word2) {
    int len1 = (int)strlen(word1);
    int len2 = (int)strlen(word2);
    int total = len1 + len2;
    char* result = (char*)malloc((total + 1) * sizeof(char));
    int i = 0, j = 0, k = 0;
    while (i < len1 || j < len2) {
        if (i < len1) result[k++] = word1[i++];
        if (j < len2) result[k++] = word2[j++];
    }
    result[k] = '\\0';
    return result;
}
`,
    cpp: `class Solution {
public:
    string mergeAlternately(string word1, string word2) {
        string result;
        int i = 0, j = 0;
        while (i < (int)word1.size() || j < (int)word2.size()) {
            if (i < (int)word1.size()) result += word1[i++];
            if (j < (int)word2.size()) result += word2[j++];
        }
        return result;
    }
};
`,
  },
  editorial: `## Approach: Two Pointers

We maintain two pointers \`i\` and \`j\`, one for each string. In each iteration we advance both by one, appending \`word1[i]\` (if valid) then \`word2[j]\` (if valid) to the result. The loop continues until both pointers are exhausted.

### Why it works
- Each iteration places at most one character from each string, in the correct alternating order.
- Bounds guards (\`if i < len\`) naturally handle the case where one string is longer — once the shorter string is used up its pointer fails the guard and only the longer string's characters are appended.

### Complexity
- **Time:** O(m + n) where m = \`len(word1)\` and n = \`len(word2)\` — each character is visited exactly once.
- **Space:** O(m + n) for the result string.`,
};

export default problem;
