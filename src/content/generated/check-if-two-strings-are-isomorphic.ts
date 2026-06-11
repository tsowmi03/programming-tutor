import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "check-if-two-strings-are-isomorphic",
  title: "Isomorphic Strings",
  difficulty: "medium",
  category: "arrays-hashing",
  order: 1056,
  description: `Two strings \`s\` and \`t\` are **isomorphic** if the characters in \`s\` can be replaced to get \`t\`, following these rules:

- Every occurrence of a character in \`s\` must map to the **same** character in \`t\`.
- No two different characters in \`s\` may map to the **same** character in \`t\`.
- A character may map to itself.

Given two strings \`s\` and \`t\` of equal length, return \`true\` if they are isomorphic, and \`false\` otherwise.

\`\`\`text
Example 1:
Input:  s = "egg", t = "add"
Output: true
Explanation: 'e' -> 'a', 'g' -> 'd'. Consistent one-to-one mapping.
\`\`\`

\`\`\`text
Example 2:
Input:  s = "foo", t = "bar"
Output: false
Explanation: 'o' maps to both 'a' and 'r', which is invalid.
\`\`\`

\`\`\`text
Example 3:
Input:  s = "paper", t = "title"
Output: true
Explanation: 'p'->'t', 'a'->'i', 'e'->'l', 'r'->'e'. Consistent mapping.
\`\`\`

\`\`\`text
Example 4:
Input:  s = "ab", t = "aa"
Output: false
Explanation: 'a'->'a' and 'b'->'a' — two characters in s map to the same character in t.
\`\`\`

**Constraints:**
- \`1 <= s.length == t.length <= 500\`
- \`s\` and \`t\` consist of printable ASCII characters.`,
  hints: [
    `Think about maintaining two mappings: one from s→t and one from t→s. Why do you need both?`,
    `For each position i, check if s[i] already has a mapping. If it does, it must map to t[i]. If it doesn't, ensure t[i] isn't already mapped to by a different character.`,
    `Using arrays of size 128 (ASCII) instead of hash maps can simplify the C solution and speed up all solutions.`,
  ],
  signature: {
    "name": "isIsomorphic",
    "params": [
      {
        "name": "s",
        "type": "string"
      },
      {
        "name": "t",
        "type": "string"
      }
    ],
    "returns": "bool",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        "egg",
        "add"
      ],
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        "foo",
        "bar"
      ],
      "expected": false,
      "hidden": false
    },
    {
      "input": [
        "paper",
        "title"
      ],
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        "ab",
        "aa"
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        "a",
        "a"
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        "a",
        "b"
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        "abab",
        "cdcd"
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        "abcd",
        "aabb"
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        "bbbaaaba",
        "aaabbbba"
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        "aaeaa",
        "uuiuu"
      ],
      "expected": true,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def is_isomorphic(s: str, t: str) -> bool:
    # TODO: implement
    return False
`,
    javascript: `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isIsomorphic(s, t) {
    // TODO: implement
    return false;
}
`,
    java: `class Solution {
    public boolean isIsomorphic(String s, String t) {
        // TODO: implement
        return false;
    }
}
`,
    c: `#include <stdbool.h>
#include <string.h>

bool isIsomorphic(char* s, char* t) {
    // TODO: implement
    return false;
}
`,
  },
  solutions: {
    python: `def is_isomorphic(s: str, t: str) -> bool:
    s_to_t = {}
    t_to_s = {}
    for cs, ct in zip(s, t):
        if cs in s_to_t:
            if s_to_t[cs] != ct:
                return False
        else:
            if ct in t_to_s:
                return False
            s_to_t[cs] = ct
            t_to_s[ct] = cs
    return True
`,
    javascript: `function isIsomorphic(s, t) {
    const sToT = new Map();
    const tToS = new Map();
    for (let i = 0; i < s.length; i++) {
        const cs = s[i], ct = t[i];
        if (sToT.has(cs)) {
            if (sToT.get(cs) !== ct) return false;
        } else {
            if (tToS.has(ct)) return false;
            sToT.set(cs, ct);
            tToS.set(ct, cs);
        }
    }
    return true;
}
`,
    java: `class Solution {
    public boolean isIsomorphic(String s, String t) {
        int[] sToT = new int[128];
        int[] tToS = new int[128];
        // Use 0 as 'unmapped'; store (mapped char index + 1) to distinguish from 0
        for (int i = 0; i < s.length(); i++) {
            int cs = s.charAt(i);
            int ct = t.charAt(i);
            if (sToT[cs] == 0 && tToS[ct] == 0) {
                sToT[cs] = ct + 1;
                tToS[ct] = cs + 1;
            } else if (sToT[cs] != ct + 1 || tToS[ct] != cs + 1) {
                return false;
            }
        }
        return true;
    }
}
`,
    c: `#include <stdbool.h>
#include <string.h>

bool isIsomorphic(char* s, char* t) {
    // sToT[c] stores (mapped t-char + 1), 0 means unmapped
    int sToT[128] = {0};
    int tToS[128] = {0};
    int len = (int)strlen(s);
    for (int i = 0; i < len; i++) {
        unsigned char cs = (unsigned char)s[i];
        unsigned char ct = (unsigned char)t[i];
        if (sToT[cs] == 0 && tToS[ct] == 0) {
            sToT[cs] = ct + 1;
            tToS[ct] = cs + 1;
        } else if (sToT[cs] != ct + 1 || tToS[ct] != cs + 1) {
            return false;
        }
    }
    return true;
}
`,
  },
  editorial: `## Approach: Bidirectional Character Mapping

### Intuition
A valid isomorphic mapping requires a **bijection** between characters of \`s\` and characters of \`t\`. This means:
1. Each character in \`s\` always maps to the **same** character in \`t\` (consistency).
2. No two distinct characters in \`s\` map to the **same** character in \`t\` (injectivity).

To enforce both conditions simultaneously, maintain **two maps**: \`s→t\` and \`t→s\`.

### Algorithm
1. Iterate through paired characters \`(cs, ct)\` at each index.
2. If \`cs\` is already mapped:
   - It must map to \`ct\`. If not, return \`false\`.
3. If \`cs\` is not yet mapped:
   - If \`ct\` is already mapped to by some other character, return \`false\`.
   - Otherwise, record \`s→t: cs→ct\` and \`t→s: ct→cs\`.
4. If the loop completes without conflict, return \`true\`.

### Complexity
- **Time:** O(n) where n = length of the strings.
- **Space:** O(1) — the mapping arrays/maps are bounded by the ASCII character set size (128 or 256), not the input size.

### Key Insight for C/Java
Instead of a hash map, use an integer array of size 128 indexed by ASCII value. To distinguish "unmapped" (0) from "mapped to character 0 (null byte)", store \`char_value + 1\` in the array. This trick avoids the need for a separate boolean array.`,
};

export default problem;
