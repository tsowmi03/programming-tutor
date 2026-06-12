import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "check-if-a-string-is-a-palindrome-ignoring-case-and-non-letters",
  title: "Valid Palindrome (Letters Only)",
  difficulty: "easy",
  category: "two-pointers",
  order: 1061,
  description: `Given a string \`s\`, return \`true\` if it is a **palindrome** after:
- Removing all non-letter characters (keep only \`a\`–\`z\` and \`A\`–\`Z\`), and
- Converting all remaining letters to lowercase.

Otherwise return \`false\`.

A **palindrome** reads the same forward and backward.

\`\`\`text
Example 1:
Input:  s = "A man, a plan, a canal: Panama"
Output: true
Explanation: After filtering → "amanaplanacanalpanama", which is a palindrome.
\`\`\`

\`\`\`text
Example 2:
Input:  s = "race a car"
Output: false
Explanation: After filtering → "raceacar", which is NOT a palindrome.
\`\`\`

\`\`\`text
Example 3:
Input:  s = ""
Output: true
Explanation: An empty filtered string is considered a palindrome.
\`\`\`

**Constraints:**
- \`0 <= s.length <= 200\`
- \`s\` consists of printable ASCII characters.`,
  hints: [
    `First, build a new collection containing only the alphabetic characters from \`s\`, all converted to lowercase.`,
    `Then use two pointers — one starting at the left end and one at the right end of your filtered collection — and advance them toward each other, comparing characters at each step.`,
    `If any pair of characters doesn't match, the string is not a palindrome. If the pointers meet or cross without a mismatch, it is.`,
  ],
  signature: {
    "name": "isPalindrome",
    "params": [
      {
        "name": "s",
        "type": "string"
      }
    ],
    "returns": "bool"
  },
  testCases: [
    {
      "input": [
        "A man, a plan, a canal: Panama"
      ],
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        "race a car"
      ],
      "expected": false,
      "hidden": false
    },
    {
      "input": [
        ""
      ],
      "expected": true,
      "hidden": false
    },
    {
      "input": [
        " "
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        "Was it a car or a cat I saw?"
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        "No 'x' in Nixon"
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        "a"
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        "Aa"
      ],
      "expected": true,
      "hidden": true
    },
    {
      "input": [
        "hello"
      ],
      "expected": false,
      "hidden": true
    },
    {
      "input": [
        "ab"
      ],
      "expected": false,
      "hidden": true
    }
  ],
  starterCode: {
    python: `def is_palindrome(s: str) -> bool:
    # TODO: implement using two pointers
    return False
`,
    javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isPalindrome(s) {
    // TODO: implement using two pointers
    return false;
}
`,
    typescript: `function isPalindrome(s: string): boolean {
    // TODO: implement using two pointers
    return false;
}`,
    java: `class Solution {
    public boolean isPalindrome(String s) {
        // TODO: implement using two pointers
        return false;
    }
}
`,
    csharp: `public class Solution {
    public bool IsPalindrome(string s) {
        // TODO: implement using two pointers
        return false;
    }
}`,
    c: `#include <stdbool.h>
#include <string.h>
#include <ctype.h>

bool isPalindrome(char* s) {
    // TODO: implement using two pointers
    return false;
}
`,
    cpp: `class Solution {
public:
    bool isPalindrome(string s) {
        // TODO: implement using two pointers
        return false;
    }
};`,
  },
  solutions: {
    python: `def is_palindrome(s: str) -> bool:
    filtered = [c.lower() for c in s if c.isalpha()]
    left, right = 0, len(filtered) - 1
    while left < right:
        if filtered[left] != filtered[right]:
            return False
        left += 1
        right -= 1
    return True
`,
    javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isPalindrome(s) {
    const filtered = s.toLowerCase().split('').filter(c => /[a-z]/.test(c));
    let left = 0, right = filtered.length - 1;
    while (left < right) {
        if (filtered[left] !== filtered[right]) return false;
        left++;
        right--;
    }
    return true;
}
`,
    typescript: `function isPalindrome(s: string): boolean {
    const filtered = s.toLowerCase().split('').filter(c => /[a-z]/.test(c));
    let left = 0, right = filtered.length - 1;
    while (left < right) {
        if (filtered[left] !== filtered[right]) return false;
        left++;
        right--;
    }
    return true;
}`,
    java: `class Solution {
    public boolean isPalindrome(String s) {
        String filtered = s.toLowerCase().replaceAll("[^a-z]", "");
        int left = 0, right = filtered.length() - 1;
        while (left < right) {
            if (filtered.charAt(left) != filtered.charAt(right)) return false;
            left++;
            right--;
        }
        return true;
    }
}
`,
    csharp: `using System.Text.RegularExpressions;

public class Solution {
    public bool IsPalindrome(string s) {
        string filtered = Regex.Replace(s.ToLower(), "[^a-z]", "");
        int left = 0, right = filtered.Length - 1;
        while (left < right) {
            if (filtered[left] != filtered[right]) return false;
            left++;
            right--;
        }
        return true;
    }
}`,
    c: `#include <stdbool.h>
#include <string.h>
#include <ctype.h>

bool isPalindrome(char* s) {
    int n = (int)strlen(s);
    char filtered[201];
    int len = 0;
    for (int i = 0; i < n; i++) {
        if (isalpha((unsigned char)s[i])) {
            filtered[len++] = (char)tolower((unsigned char)s[i]);
        }
    }
    int left = 0, right = len - 1;
    while (left < right) {
        if (filtered[left] != filtered[right]) return false;
        left++;
        right--;
    }
    return true;
}
`,
    cpp: `class Solution {
public:
    bool isPalindrome(string s) {
        string filtered;
        for (char c : s) {
            if (isalpha((unsigned char)c)) {
                filtered += (char)tolower((unsigned char)c);
            }
        }
        int left = 0, right = (int)filtered.size() - 1;
        while (left < right) {
            if (filtered[left] != filtered[right]) return false;
            left++;
            right--;
        }
        return true;
    }
};`,
  },
  editorial: `## Approach: Filter Then Two Pointers

### Intuition
A palindrome reads the same forwards and backwards. Since we only care about letters (case-insensitive), we first strip everything else, then check symmetry with two pointers.

### Steps
1. **Filter & normalize** – iterate through \`s\` and collect only alphabetic characters, lowercased, into an auxiliary array or string.
2. **Two-pointer check** – place pointer \`left\` at index \`0\` and pointer \`right\` at the last index of the filtered collection. Advance them toward each other:
   - If \`filtered[left] != filtered[right]\` → return \`false\`.
   - Otherwise, move \`left\` forward and \`right\` backward.
3. If the loop finishes without a mismatch, return \`true\`.

### Edge Cases
- Empty string or a string with no letters → filtered collection is empty → trivially a palindrome → \`true\`.
- Single letter → \`left == right\` immediately, loop never runs → \`true\`.

### Complexity
| | Value |
|---|---|
| Time | O(n) — single pass to filter, single pass to check |
| Space | O(n) — auxiliary filtered array of at most \`n\` characters |

where \`n = s.length\`.`,
};

export default problem;
