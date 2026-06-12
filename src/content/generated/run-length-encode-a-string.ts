import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "run-length-encode-a-string",
  title: "Run-Length Encode a String",
  difficulty: "medium",
  category: "foundations",
  order: 1023,
  description: `Given a string \`s\` consisting of lowercase English letters, return its **run-length encoding**.

The encoding replaces each maximal consecutive run of the same character with that character followed by the number of times it appears consecutively. A run of length 1 is still written with its count (e.g., a single \`'b'\` becomes \`"b1"\`).

\`\`\`text
Example 1:
Input:  s = "aaabbc"
Output: "a3b2c1"
Explanation: 'a' x3, 'b' x2, 'c' x1.

Example 2:
Input:  s = "abcd"
Output: "a1b1c1d1"
Explanation: Every character appears exactly once consecutively.

Example 3:
Input:  s = "aaa"
Output: "a3"
\`\`\`

**Constraints:**
- \`0 <= s.length <= 10^4\`
- \`s\` consists of lowercase English letters only.`,
  hints: [
    `Iterate through the string while keeping a running count of how many times the current character has appeared consecutively.`,
    `When you encounter a character different from the previous one, append the previous character and its count to the result, then reset the counter to 1.`,
    `After the loop finishes, there is always one pending group left — don't forget to flush it.`,
    `Test on an empty string and a single-character string to catch off-by-one errors.`,
  ],
  signature: {
    "name": "runLengthEncode",
    "params": [
      {
        "name": "s",
        "type": "string"
      }
    ],
    "returns": "string"
  },
  testCases: [
    {
      "input": [
        "aaabbc"
      ],
      "expected": "a3b2c1",
      "hidden": false
    },
    {
      "input": [
        "abcd"
      ],
      "expected": "a1b1c1d1",
      "hidden": false
    },
    {
      "input": [
        "aaa"
      ],
      "expected": "a3",
      "hidden": false
    },
    {
      "input": [
        ""
      ],
      "expected": "",
      "hidden": true
    },
    {
      "input": [
        "a"
      ],
      "expected": "a1",
      "hidden": true
    },
    {
      "input": [
        "aabbccdd"
      ],
      "expected": "a2b2c2d2",
      "hidden": true
    },
    {
      "input": [
        "zzzzz"
      ],
      "expected": "z5",
      "hidden": true
    },
    {
      "input": [
        "aabbbbcccc"
      ],
      "expected": "a2b4c4",
      "hidden": true
    },
    {
      "input": [
        "abba"
      ],
      "expected": "a1b2a1",
      "hidden": true
    },
    {
      "input": [
        "aaaaaaaaaa"
      ],
      "expected": "a10",
      "hidden": true
    }
  ],
  starterCode: {
    python: `def run_length_encode(s):
    # TODO: implement run-length encoding
    return ""
`,
    javascript: `function runLengthEncode(s) {
    // TODO: implement run-length encoding
    return "";
}
`,
    typescript: `function runLengthEncode(s: string): string {
    // TODO: implement run-length encoding
    return "";
}`,
    java: `class Solution {
    public String runLengthEncode(String s) {
        // TODO: implement run-length encoding
        return "";
    }
}
`,
    csharp: `public class Solution {
    public string RunLengthEncode(string s) {
        // TODO: implement run-length encoding
        return "";
    }
}`,
    c: `char* runLengthEncode(char* s) {
    // TODO: implement run-length encoding
    return "";
}
`,
    cpp: `class Solution {
public:
    string runLengthEncode(string s) {
        // TODO: implement run-length encoding
        return "";
    }
};`,
  },
  solutions: {
    python: `def run_length_encode(s):
    if not s:
        return ""
    result = []
    count = 1
    for i in range(1, len(s)):
        if s[i] == s[i - 1]:
            count += 1
        else:
            result.append(s[i - 1] + str(count))
            count = 1
    result.append(s[-1] + str(count))
    return "".join(result)
`,
    javascript: `function runLengthEncode(s) {
    if (s.length === 0) return "";
    let result = "";
    let count = 1;
    for (let i = 1; i < s.length; i++) {
        if (s[i] === s[i - 1]) {
            count++;
        } else {
            result += s[i - 1] + String(count);
            count = 1;
        }
    }
    result += s[s.length - 1] + String(count);
    return result;
}
`,
    typescript: `function runLengthEncode(s: string): string {
    if (s.length === 0) return "";
    let result = "";
    let count = 1;
    for (let i = 1; i < s.length; i++) {
        if (s[i] === s[i - 1]) {
            count++;
        } else {
            result += s[i - 1] + String(count);
            count = 1;
        }
    }
    result += s[s.length - 1] + String(count);
    return result;
}`,
    java: `class Solution {
    public String runLengthEncode(String s) {
        if (s.isEmpty()) return "";
        StringBuilder sb = new StringBuilder();
        int count = 1;
        for (int i = 1; i < s.length(); i++) {
            if (s.charAt(i) == s.charAt(i - 1)) {
                count++;
            } else {
                sb.append(s.charAt(i - 1));
                sb.append(count);
                count = 1;
            }
        }
        sb.append(s.charAt(s.length() - 1));
        sb.append(count);
        return sb.toString();
    }
}
`,
    csharp: `using System.Text;

public class Solution {
    public string RunLengthEncode(string s) {
        if (s.Length == 0) return "";
        StringBuilder sb = new StringBuilder();
        int count = 1;
        for (int i = 1; i < s.Length; i++) {
            if (s[i] == s[i - 1]) {
                count++;
            } else {
                sb.Append(s[i - 1]);
                sb.Append(count);
                count = 1;
            }
        }
        sb.Append(s[s.Length - 1]);
        sb.Append(count);
        return sb.ToString();
    }
}`,
    c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char* runLengthEncode(char* s) {
    int n = (int)strlen(s);
    if (n == 0) {
        char* result = (char*)malloc(1);
        result[0] = '\\0';
        return result;
    }
    /* Worst case: each char followed by up to 5-digit count */
    char* result = (char*)malloc(12 * n + 1);
    int pos = 0;
    int count = 1;
    int i;
    for (i = 1; i < n; i++) {
        if (s[i] == s[i - 1]) {
            count++;
        } else {
            result[pos++] = s[i - 1];
            pos += sprintf(result + pos, "%d", count);
            count = 1;
        }
    }
    result[pos++] = s[n - 1];
    pos += sprintf(result + pos, "%d", count);
    result[pos] = '\\0';
    return result;
}
`,
    cpp: `class Solution {
public:
    string runLengthEncode(string s) {
        if (s.empty()) return "";
        string result = "";
        int count = 1;
        for (int i = 1; i < (int)s.length(); i++) {
            if (s[i] == s[i - 1]) {
                count++;
            } else {
                result += s[i - 1];
                result += to_string(count);
                count = 1;
            }
        }
        result += s[s.length() - 1];
        result += to_string(count);
        return result;
    }
};`,
  },
  editorial: `## Approach: Single-Pass Linear Scan

Walk through the string once, maintaining a \`count\` of consecutive occurrences of the current character.

**Algorithm:**
1. Return \`""\` immediately for an empty string.
2. Initialize \`count = 1\`.
3. For each index \`i\` from \`1\` to \`n-1\`:
   - If \`s[i] == s[i-1]\`, increment \`count\`.
   - Otherwise, emit \`s[i-1]\` + \`count\` to the result buffer, then reset \`count = 1\`.
4. After the loop, emit the final pending group (one group always remains unflushed inside the loop).

**Why one group is always pending:** The flush step fires when we see a *change*, so the last run never triggers a flush inside the loop — it must be handled explicitly afterward.

**Complexity:**
- **Time:** O(n) — single pass.
- **Space:** O(n) — the output is at most \`2n\` characters (all unique characters, each followed by \`"1"\`).`,
};

export default problem;
