import type { CodeProblemDef } from "../types";

export const validPalindrome: CodeProblemDef = {
  type: "code",
  slug: "valid-palindrome",
  title: "Valid Palindrome",
  difficulty: "easy",
  category: "two-pointers",
  order: 1,
  description: `A phrase is a **palindrome** if, after converting all uppercase letters to lowercase and removing every character that is not a letter or digit, it reads the same forwards and backwards.

Given a string \`s\`, return \`true\` if it is a palindrome.

**Example 1**

\`\`\`text
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
\`\`\`

**Example 2**

\`\`\`text
Input: s = "race a car"
Output: false
\`\`\`

**Constraints**

- \`1 <= s.length <= 200000\`
- \`s\` consists of printable ASCII characters.
`,
  hints: [
    "You could build a cleaned-up copy of the string and compare it with its reverse — that works, but uses O(n) extra space.",
    "Try two pointers: one starting at each end, moving towards the middle.",
    "When a pointer lands on a non-alphanumeric character, just skip past it. Compare lowercased characters when both pointers are on valid ones.",
  ],
  signature: {
    name: "isPalindrome",
    params: [{ name: "s", type: "string" }],
    returns: "bool",
  },
  testCases: [
    { input: ["A man, a plan, a canal: Panama"], expected: true },
    { input: ["race a car"], expected: false },
    { input: [" "], expected: true },
    { input: ["0P"], expected: false, hidden: true },
    { input: ["a."], expected: true, hidden: true },
    { input: ["ab_a"], expected: true, hidden: true },
    { input: ["No 'x' in Nixon"], expected: true, hidden: true },
    { input: ["palindrome"], expected: false, hidden: true },
  ],
  starterCode: {
    python: `def is_palindrome(s):
    """Return True if s is a palindrome, ignoring case and
    non-alphanumeric characters."""
    # Your code here
    pass
`,
    javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isPalindrome(s) {
  // Your code here
}
`,
    java: `class Solution {
    public boolean isPalindrome(String s) {
        // Your code here
        return false;
    }
}
`,
    c: `#include <ctype.h>

bool isPalindrome(char* s) {
    // Your code here (isalnum() and tolower() are handy)
    return false;
}
`,
  },
  solutions: {
    python: `def is_palindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
        if s[left].lower() != s[right].lower():
            return False
        left += 1
        right -= 1
    return True
`,
    javascript: `function isPalindrome(s) {
  const isAlnum = (c) => /[a-z0-9]/i.test(c);
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    while (left < right && !isAlnum(s[left])) left++;
    while (left < right && !isAlnum(s[right])) right--;
    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
    left++;
    right--;
  }
  return true;
}
`,
    java: `class Solution {
    public boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;
            if (Character.toLowerCase(s.charAt(left))
                    != Character.toLowerCase(s.charAt(right))) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}
`,
    c: `#include <ctype.h>

bool isPalindrome(char* s) {
    int left = 0;
    int right = (int)strlen(s) - 1;
    while (left < right) {
        while (left < right && !isalnum((unsigned char)s[left])) left++;
        while (left < right && !isalnum((unsigned char)s[right])) right--;
        if (tolower((unsigned char)s[left]) != tolower((unsigned char)s[right])) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}
`,
  },
  editorial: `## Approach: two pointers from the ends

A palindrome mirrors around its centre, which suggests comparing the first
valid character with the last, the second with the second-last, and so on.

Keep two indices, \`left\` starting at 0 and \`right\` at the end:

1. Advance \`left\` past non-alphanumeric characters; retreat \`right\` the
   same way.
2. Compare the two characters case-insensitively. Any mismatch → not a
   palindrome.
3. Move both pointers inward and repeat until they cross.

The pointers only ever move towards each other, so the scan is a single
O(n) pass with **O(1) extra space** — the advantage over building a cleaned
copy and reversing it.

Watch out for \`"0P"\`: digits and letters never match each other, and a
correct case-insensitive comparison must not accidentally map \`'0'\` and
\`'P'\` together (some bit-twiddling lowercase tricks do!).

**Complexity:** O(n) time, O(1) space.
`,
};
