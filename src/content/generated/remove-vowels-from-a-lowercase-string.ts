import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "remove-vowels-from-a-lowercase-string",
  title: "Remove Vowels from a Lowercase String",
  difficulty: "easy",
  category: "two-pointers",
  order: 1014,
  description: `Given a lowercase string \`s\`, return a new string with all vowels (\`'a'\`, \`'e'\`, \`'i'\`, \`'o'\`, \`'u'\`) removed.

You may use a two-pointer / in-place write approach: maintain a write pointer that advances only when the current character is **not** a vowel.

\`\`\`text
Example 1:
Input:  s = "leetcode"
Output: "ltcd"

Example 2:
Input:  s = "aeiou"
Output: ""

Example 3:
Input:  s = "rhythm"
Output: "rhythm"
\`\`\`

**Constraints:**
- \`0 <= s.length <= 1000\`
- \`s\` consists of lowercase English letters only.`,
  hints: [
    `Iterate through each character and ask: is this character a vowel? If not, keep it.`,
    `Try maintaining a write index that only increments when the current character is a consonant — this mirrors the classic two-pointer in-place pattern.`,
  ],
  guidance: [
    {
      "title": "Identify vowels",
      "body": "Create a set (or constant string) containing `{'a','e','i','o','u'}` so you can check membership in O(1).",
      "level": "nudge"
    },
    {
      "title": "Two-pointer in-place write",
      "body": "Use a read pointer `r` and a write pointer `w`, both starting at 0. When `s[r]` is not a vowel, copy it to position `w` and increment `w`. Always increment `r`. After the loop, the result is the first `w` characters.",
      "level": "strategy"
    },
    {
      "title": "Building a new string instead",
      "body": "Alternatively, iterate once and append non-vowel characters to a result buffer, then join. This is simpler to code in most languages and still O(n).",
      "level": "strategy"
    },
    {
      "title": "Pseudocode",
      "body": "```\nvowels = set('aeiou')\nresult = []\nfor ch in s:\n    if ch not in vowels:\n        result.append(ch)\nreturn join(result)\n```",
      "level": "pseudocode"
    }
  ],

  signature: {
    "name": "removeVowels",
    "params": [
      {
        "name": "s",
        "type": "string"
      }
    ],
    "returns": "string",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        "leetcode"
      ],
      "expected": "ltcd",
      "hidden": false
    },
    {
      "input": [
        "aeiou"
      ],
      "expected": "",
      "hidden": false
    },
    {
      "input": [
        "rhythm"
      ],
      "expected": "rhythm",
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
      "expected": "",
      "hidden": true
    },
    {
      "input": [
        "b"
      ],
      "expected": "b",
      "hidden": true
    },
    {
      "input": [
        "programming"
      ],
      "expected": "prgrmmng",
      "hidden": true
    },
    {
      "input": [
        "aaabbbccc"
      ],
      "expected": "bbbccc",
      "hidden": true
    },
    {
      "input": [
        "hello world"
      ],
      "expected": "hll wrld",
      "hidden": true
    }
  ],
  starterCode: {
    python: `def remove_vowels(s: str) -> str:
    # TODO: implement
    return ""
`,
    javascript: `/**
 * @param {string} s
 * @return {string}
 */
function removeVowels(s) {
    // TODO: implement
    return "";
}
`,
    typescript: `function removeVowels(s: string): string {
    // TODO: implement
    return "";
}
`,
    java: `class Solution {
    public String removeVowels(String s) {
        // TODO: implement
        return "";
    }
}
`,
    csharp: `public class Solution {
    public string RemoveVowels(string s) {
        // TODO: implement
        return "";
    }
}
`,
    c: `char* removeVowels(char* s) {
    // TODO: implement
    return "";
}
`,
    cpp: `class Solution {
public:
    string removeVowels(string s) {
        // TODO: implement
        return "";
    }
};
`,
  },
  solutions: {
    python: `def remove_vowels(s: str) -> str:
    vowels = set('aeiou')
    return ''.join(ch for ch in s if ch not in vowels)
`,
    javascript: `/**
 * @param {string} s
 * @return {string}
 */
function removeVowels(s) {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    let result = '';
    for (const ch of s) {
        if (!vowels.has(ch)) result += ch;
    }
    return result;
}
`,
    typescript: `function removeVowels(s: string): string {
    const vowels = new Set<string>(['a', 'e', 'i', 'o', 'u']);
    let result = '';
    for (const ch of s) {
        if (!vowels.has(ch)) result += ch;
    }
    return result;
}
`,
    java: `class Solution {
    public String removeVowels(String s) {
        String vowels = "aeiou";
        StringBuilder sb = new StringBuilder();
        for (char ch : s.toCharArray()) {
            if (vowels.indexOf(ch) == -1) {
                sb.append(ch);
            }
        }
        return sb.toString();
    }
}
`,
    csharp: `public class Solution {
    public string RemoveVowels(string s) {
        var vowels = new System.Collections.Generic.HashSet<char> {'a','e','i','o','u'};
        var sb = new System.Text.StringBuilder();
        foreach (char ch in s) {
            if (!vowels.Contains(ch)) sb.Append(ch);
        }
        return sb.ToString();
    }
}
`,
    c: `#include <stdlib.h>
#include <string.h>

char* removeVowels(char* s) {
    int n = (int)strlen(s);
    char* result = (char*)malloc(n + 1);
    int w = 0;
    for (int r = 0; r < n; r++) {
        char ch = s[r];
        if (ch != 'a' && ch != 'e' && ch != 'i' && ch != 'o' && ch != 'u') {
            result[w++] = ch;
        }
    }
    result[w] = '\\0';
    return result;
}
`,
    cpp: `class Solution {
public:
    string removeVowels(string s) {
        string vowels = "aeiou";
        string result = "";
        for (char ch : s) {
            if (vowels.find(ch) == string::npos) {
                result += ch;
            }
        }
        return result;
    }
};
`,
  },
  editorial: `## Approach: Single Pass with Write Pointer (Two-Pointer Style)

### Intuition
We want to keep only the non-vowel characters. The two-pointer pattern uses a **read** pointer that scans every character and a **write** pointer that only advances when we decide to keep a character.

### Algorithm
1. Create a set of vowels \`{a, e, i, o, u}\` for O(1) lookup.
2. Iterate through the string with a read index \`r\`.
3. Whenever \`s[r]\` is **not** a vowel, append it to the result.
4. Return the result.

In many languages it is most natural to build a new string/buffer rather than mutate in place, but the logic is identical.

### Complexity
- **Time:** O(n) — one pass through the string.
- **Space:** O(n) — the output string in the worst case (no vowels).

### Example walkthrough
\`\`\`
s = "leetcode"
r=0  'l' → consonant → keep  → "l"
r=1  'e' → vowel    → skip
r=2  'e' → vowel    → skip
r=3  't' → consonant → keep  → "lt"
r=4  'c' → consonant → keep  → "ltc"
r=5  'o' → vowel    → skip
r=6  'd' → consonant → keep  → "ltcd"
r=7  'e' → vowel    → skip
Result: "ltcd"
\`\`\``,
};

export default problem;
