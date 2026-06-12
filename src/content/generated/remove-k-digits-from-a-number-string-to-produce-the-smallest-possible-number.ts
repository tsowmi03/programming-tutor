import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "remove-k-digits-from-a-number-string-to-produce-the-smallest-possible-number",
  title: "Remove K Digits to Form Smallest Number",
  difficulty: "medium",
  category: "stack",
  order: 1083,
  description: `Given a string \`num\` representing a non-negative integer and an integer \`k\`, remove exactly \`k\` digits from \`num\` so that the remaining digits form the **smallest possible** number. Return the result as a string **without leading zeros**. If the result is empty, return \`"0"\`.

\`\`\`text
Example 1:
Input:  num = "1432219", k = 3
Output: "1219"
Explanation: Remove 4, 3, and 2 (the first 2) → "1219"
\`\`\`

\`\`\`text
Example 2:
Input:  num = "10200", k = 1
Output: "200"
Explanation: Removing the 1 gives "0200" → strip leading zeros → "200"
\`\`\`

\`\`\`text
Example 3:
Input:  num = "10", k = 2
Output: "0"
Explanation: Removing both digits → empty → return "0"
\`\`\`

**Constraints:**
- \`1 <= num.length <= 500\`
- \`0 <= k <= num.length\`
- \`num\` consists of digits \`0\`–\`9\` only
- \`num\` does not have leading zeros except for \`"0"\` itself`,
  hints: [
    `Think greedily: to make the number as small as possible, you want smaller digits to appear as early as possible.`,
    `Use a monotonic stack. For each digit, pop the stack while the top is larger than the current digit AND you still have removals left (k > 0).`,
    `After processing all digits, if k > 0 still, remove from the end of the stack (those are the largest remaining digits in the suffix).`,
    `After building the result, strip leading zeros. If the result is empty, return "0".`,
  ],
  signature: {
    "name": "removeKdigits",
    "params": [
      {
        "name": "num",
        "type": "string"
      },
      {
        "name": "k",
        "type": "int"
      }
    ],
    "returns": "string"
  },
  testCases: [
    {
      "input": [
        "1432219",
        3
      ],
      "expected": "1219",
      "hidden": false
    },
    {
      "input": [
        "10200",
        1
      ],
      "expected": "200",
      "hidden": false
    },
    {
      "input": [
        "10",
        2
      ],
      "expected": "0",
      "hidden": false
    },
    {
      "input": [
        "9",
        1
      ],
      "expected": "0",
      "hidden": true
    },
    {
      "input": [
        "112",
        1
      ],
      "expected": "11",
      "hidden": true
    },
    {
      "input": [
        "1234567890",
        9
      ],
      "expected": "0",
      "hidden": true
    },
    {
      "input": [
        "5337",
        2
      ],
      "expected": "33",
      "hidden": true
    },
    {
      "input": [
        "100",
        1
      ],
      "expected": "0",
      "hidden": true
    },
    {
      "input": [
        "10001",
        3
      ],
      "expected": "0",
      "hidden": true
    },
    {
      "input": [
        "987654321",
        5
      ],
      "expected": "4321",
      "hidden": true
    }
  ],
  starterCode: {
    python: `def remove_kdigits(num: str, k: int) -> str:
    # TODO: implement
    return "0"
`,
    javascript: `/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
function removeKdigits(num, k) {
    // TODO: implement
    return "0";
}
`,
    typescript: `function removeKdigits(num: string, k: number): string {
    // TODO: implement
    return "0";
}`,
    java: `class Solution {
    public String removeKdigits(String num, int k) {
        // TODO: implement
        return "0";
    }
}
`,
    csharp: `public class Solution {
    public string RemoveKdigits(string num, int k) {
        // TODO: implement
        return "0";
    }
}`,
    c: `#include <stdlib.h>
#include <string.h>
char* removeKdigits(char* num, int k) {
    // TODO: implement
    return "0";
}
`,
    cpp: `class Solution {
public:
    string removeKdigits(string num, int k) {
        // TODO: implement
        return "0";
    }
};`,
  },
  solutions: {
    python: `def remove_kdigits(num: str, k: int) -> str:
    stack = []
    for ch in num:
        while k > 0 and stack and stack[-1] > ch:
            stack.pop()
            k -= 1
        stack.append(ch)
    # If k > 0 still, remove from the end
    if k > 0:
        stack = stack[:-k]
    # Strip leading zeros
    result = ''.join(stack).lstrip('0')
    return result if result else '0'
`,
    javascript: `function removeKdigits(num, k) {
    const stack = [];
    for (const ch of num) {
        while (k > 0 && stack.length > 0 && stack[stack.length - 1] > ch) {
            stack.pop();
            k--;
        }
        stack.push(ch);
    }
    if (k > 0) {
        stack.splice(stack.length - k, k);
    }
    // Strip leading zeros
    let i = 0;
    while (i < stack.length - 1 && stack[i] === '0') i++;
    const result = stack.slice(i).join('');
    return result === '' ? '0' : result;
}
`,
    typescript: `function removeKdigits(num: string, k: number): string {
    const stack: string[] = [];
    for (const ch of num) {
        while (k > 0 && stack.length > 0 && stack[stack.length - 1] > ch) {
            stack.pop();
            k--;
        }
        stack.push(ch);
    }
    if (k > 0) {
        stack.splice(stack.length - k, k);
    }
    // Strip leading zeros
    let i = 0;
    while (i < stack.length - 1 && stack[i] === '0') i++;
    const result = stack.slice(i).join('');
    return result === '' ? '0' : result;
}`,
    java: `class Solution {
    public String removeKdigits(String num, int k) {
        StringBuilder stack = new StringBuilder();
        for (char ch : num.toCharArray()) {
            while (k > 0 && stack.length() > 0 && stack.charAt(stack.length() - 1) > ch) {
                stack.deleteCharAt(stack.length() - 1);
                k--;
            }
            stack.append(ch);
        }
        if (k > 0) {
            stack.delete(stack.length() - k, stack.length());
        }
        // Strip leading zeros
        int start = 0;
        while (start < stack.length() - 1 && stack.charAt(start) == '0') {
            start++;
        }
        if (stack.length() == 0) return "0";
        String result = stack.substring(start);
        return result.isEmpty() ? "0" : result;
    }
}
`,
    csharp: `using System.Text;

public class Solution {
    public string RemoveKdigits(string num, int k) {
        StringBuilder stack = new StringBuilder();
        foreach (char ch in num) {
            while (k > 0 && stack.Length > 0 && stack[stack.Length - 1] > ch) {
                stack.Remove(stack.Length - 1, 1);
                k--;
            }
            stack.Append(ch);
        }
        if (k > 0) {
            stack.Remove(stack.Length - k, k);
        }
        // Strip leading zeros
        int start = 0;
        while (start < stack.Length - 1 && stack[start] == '0') {
            start++;
        }
        if (stack.Length == 0) return "0";
        string result = stack.ToString().Substring(start);
        return result == "" ? "0" : result;
    }
}`,
    c: `#include <stdlib.h>
#include <string.h>
char* removeKdigits(char* num, int k) {
    int n = (int)strlen(num);
    char* stack = (char*)malloc((n + 1) * sizeof(char));
    int top = 0;
    for (int i = 0; i < n; i++) {
        while (k > 0 && top > 0 && stack[top - 1] > num[i]) {
            top--;
            k--;
        }
        stack[top++] = num[i];
    }
    if (k > 0) {
        top -= k;
        if (top < 0) top = 0;
    }
    stack[top] = '\\0';
    // Strip leading zeros
    int start = 0;
    while (start < top - 1 && stack[start] == '0') {
        start++;
    }
    int len = top - start;
    char* result = (char*)malloc((len + 2) * sizeof(char));
    if (len <= 0) {
        result[0] = '0';
        result[1] = '\\0';
    } else {
        strncpy(result, stack + start, len);
        result[len] = '\\0';
    }
    free(stack);
    return result;
}
`,
    cpp: `class Solution {
public:
    string removeKdigits(string num, int k) {
        string stack = "";
        for (char ch : num) {
            while (k > 0 && !stack.empty() && stack.back() > ch) {
                stack.pop_back();
                k--;
            }
            stack.push_back(ch);
        }
        if (k > 0) {
            stack.resize(stack.size() - k);
        }
        // Strip leading zeros
        int start = 0;
        while (start < (int)stack.size() - 1 && stack[start] == '0') {
            start++;
        }
        if (stack.empty()) return "0";
        string result = stack.substr(start);
        return result.empty() ? "0" : result;
    }
};`,
  },
  editorial: `## Approach: Greedy with Monotonic Stack

### Intuition
To produce the smallest number, we want smaller digits as early (leftmost) as possible. Whenever we encounter a digit **smaller** than the previous digit and we still have removals left, it's always better to remove the previous larger digit.

### Algorithm
1. Iterate through each character in \`num\`.
2. Maintain a stack. Before pushing the current digit, pop the top while:
   - \`k > 0\` (removals remain)
   - Stack is non-empty
   - Top element is **greater** than the current digit
3. Push the current digit.
4. After processing all digits, if \`k > 0\`, remove the last \`k\` digits (they form a non-decreasing suffix, so the last are largest).
5. Strip leading zeros; return \`"0"\` if result is empty.

### Example Walkthrough (\`"1432219"\`, k=3)
- \`1\` → stack: \`[1]\`
- \`4\` (4>1, no pop) → \`[1,4]\`
- \`3\` < \`4\`, pop \`4\` (k=2), push \`3\` → \`[1,3]\`
- \`2\` < \`3\`, pop \`3\` (k=1), push \`2\` → \`[1,2]\`
- \`2\` == top, push → \`[1,2,2]\`
- \`1\` < \`2\`, pop \`2\` (k=0), push \`1\` → \`[1,2,1]\`
- \`9\` → \`[1,2,1,9]\`
- k=0, done → \`"1219"\`

### Complexity
- **Time:** O(n) — each digit is pushed and popped at most once.
- **Space:** O(n) — stack stores at most n digits.`,
};

export default problem;
