import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "decode-string-expand-k-encoded-string-notation",
  title: "Decode String",
  difficulty: "medium",
  category: "stack",
  order: 1081,
  description: `Given an encoded string, return its decoded string.

The encoding rule is: \`k[encoded_string]\`, where the \`encoded_string\` inside the square brackets is repeated exactly \`k\` times. You may assume the input is always valid — no extra white spaces, square brackets are well-formed, and digits only appear before \`[\`.

Note:
- \`k\` is always a positive integer.
- The encoded string may contain nested encodings.
- The original string contains only lowercase English letters.

\`\`\`text
Example 1:
Input:  s = "3[a]"
Output: "aaa"
\`\`\`

\`\`\`text
Example 2:
Input:  s = "2[ab]"
Output: "abab"
Explanation: 2[ab] means repeat "ab" 2 times → "abab".
\`\`\`

\`\`\`text
Example 3:
Input:  s = "3[a2[b]]"
Output: "abbabbabb"
Explanation: Inner 2[b] = "bb", so 3[a2[b]] = 3[abb] = "abbabbabb".
\`\`\`

\`\`\`text
Example 4:
Input:  s = "2[abc]3[cd]ef"
Output: "abcabccdcdcdef"
\`\`\`

**Constraints:**
- \`1 <= s.length <= 30\`
- \`s\` consists of lowercase English letters, digits, and square brackets \`[\` and \`]\`.
- It is guaranteed that \`k\` is in the range \`[1, 300]\`.
- Nesting depth is at most 5.`,
  hints: [
    `Think about what happens when you encounter a \`[\`: you need to remember what you've built so far and start fresh for the inside portion.`,
    `Use a stack to save the current string and the current repeat count when you see \`[\`, then restore and repeat when you see \`]\`.`,
    `When you encounter a digit, there may be multiple digits in a row (e.g. \`10[a]\`), so accumulate them into a number before pushing.`,
    `When you hit \`]\`, pop the saved string and count, repeat the current segment \`count\` times, and append it to the saved string.`,
  ],
  signature: {
    "name": "decodeString",
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
        "3[a]"
      ],
      "expected": "aaa",
      "hidden": false
    },
    {
      "input": [
        "2[ab]"
      ],
      "expected": "abab",
      "hidden": false
    },
    {
      "input": [
        "3[a2[b]]"
      ],
      "expected": "abbabbabb",
      "hidden": false
    },
    {
      "input": [
        "2[abc]3[cd]ef"
      ],
      "expected": "abcabccdcdcdef",
      "hidden": true
    },
    {
      "input": [
        "10[a]"
      ],
      "expected": "aaaaaaaaaa",
      "hidden": true
    },
    {
      "input": [
        "1[b]"
      ],
      "expected": "b",
      "hidden": true
    },
    {
      "input": [
        "abc"
      ],
      "expected": "abc",
      "hidden": true
    },
    {
      "input": [
        "2[3[x]y]"
      ],
      "expected": "xxxyxxxy",
      "hidden": true
    },
    {
      "input": [
        "3[z]2[2[y]q]"
      ],
      "expected": "zzzyyqyyq",
      "hidden": true
    },
    {
      "input": [
        "4[ab2[c]]"
      ],
      "expected": "abccabccabccabcc",
      "hidden": true
    }
  ],
  starterCode: {
    python: `def decode_string(s: str) -> str:
    # TODO: implement using a stack
    return ""
`,
    javascript: `/**
 * @param {string} s
 * @return {string}
 */
function decodeString(s) {
    // TODO: implement using a stack
    return "";
}
`,
    typescript: `function decodeString(s: string): string {
    // TODO: implement using a stack
    return "";
}`,
    java: `class Solution {
    public String decodeString(String s) {
        // TODO: implement using a stack
        return "";
    }
}
`,
    csharp: `using System.Collections.Generic;

public class Solution {
    public string DecodeString(string s) {
        // TODO: implement using a stack
        return "";
    }
}`,
    c: `#include <stdlib.h>
#include <string.h>
char* decodeString(char* s) {
    // TODO: implement using a stack
    return "";
}
`,
    cpp: `class Solution {
public:
    string decodeString(string s) {
        // TODO: implement using a stack
        return "";
    }
};`,
  },
  solutions: {
    python: `def decode_string(s: str) -> str:
    count_stack = []
    string_stack = []
    current = ""
    k = 0
    for ch in s:
        if ch.isdigit():
            k = k * 10 + int(ch)
        elif ch == '[':
            count_stack.append(k)
            string_stack.append(current)
            current = ""
            k = 0
        elif ch == ']':
            repeat = count_stack.pop()
            prev = string_stack.pop()
            current = prev + current * repeat
        else:
            current += ch
    return current
`,
    javascript: `function decodeString(s) {
    const countStack = [];
    const stringStack = [];
    let current = "";
    let k = 0;
    for (const ch of s) {
        if (ch >= '0' && ch <= '9') {
            k = k * 10 + parseInt(ch);
        } else if (ch === '[') {
            countStack.push(k);
            stringStack.push(current);
            current = "";
            k = 0;
        } else if (ch === ']') {
            const repeat = countStack.pop();
            const prev = stringStack.pop();
            current = prev + current.repeat(repeat);
        } else {
            current += ch;
        }
    }
    return current;
}
`,
    typescript: `function decodeString(s: string): string {
    const countStack: number[] = [];
    const stringStack: string[] = [];
    let current = "";
    let k = 0;
    for (const ch of s) {
        if (ch >= '0' && ch <= '9') {
            k = k * 10 + parseInt(ch);
        } else if (ch === '[') {
            countStack.push(k);
            stringStack.push(current);
            current = "";
            k = 0;
        } else if (ch === ']') {
            const repeat = countStack.pop()!;
            const prev = stringStack.pop()!;
            current = prev + current.repeat(repeat);
        } else {
            current += ch;
        }
    }
    return current;
}`,
    java: `class Solution {
    public String decodeString(String s) {
        java.util.Deque<Integer> countStack = new java.util.ArrayDeque<>();
        java.util.Deque<StringBuilder> stringStack = new java.util.ArrayDeque<>();
        StringBuilder current = new StringBuilder();
        int k = 0;
        for (char ch : s.toCharArray()) {
            if (Character.isDigit(ch)) {
                k = k * 10 + (ch - '0');
            } else if (ch == '[') {
                countStack.push(k);
                stringStack.push(current);
                current = new StringBuilder();
                k = 0;
            } else if (ch == ']') {
                int repeat = countStack.pop();
                StringBuilder prev = stringStack.pop();
                String seg = current.toString();
                for (int i = 0; i < repeat; i++) {
                    prev.append(seg);
                }
                current = prev;
            } else {
                current.append(ch);
            }
        }
        return current.toString();
    }
}
`,
    csharp: `using System.Collections.Generic;
using System.Text;

public class Solution {
    public string DecodeString(string s) {
        Stack<int> countStack = new Stack<int>();
        Stack<StringBuilder> stringStack = new Stack<StringBuilder>();
        StringBuilder current = new StringBuilder();
        int k = 0;
        foreach (char ch in s) {
            if (char.IsDigit(ch)) {
                k = k * 10 + (ch - '0');
            } else if (ch == '[') {
                countStack.Push(k);
                stringStack.Push(current);
                current = new StringBuilder();
                k = 0;
            } else if (ch == ']') {
                int repeat = countStack.Pop();
                StringBuilder prev = stringStack.Pop();
                string seg = current.ToString();
                for (int i = 0; i < repeat; i++) {
                    prev.Append(seg);
                }
                current = prev;
            } else {
                current.Append(ch);
            }
        }
        return current.ToString();
    }
}`,
    c: `#include <stdlib.h>
#include <string.h>
#include <ctype.h>

char* decodeString(char* s) {
    int len = (int)strlen(s);
    int MAXBUF = 100000;

    char** strStack = (char**)malloc(32 * sizeof(char*));
    int* cntStack = (int*)malloc(32 * sizeof(int));
    int top = 0;

    for (int i = 0; i < 32; i++) {
        strStack[i] = (char*)calloc(MAXBUF, 1);
    }

    char* current = (char*)calloc(MAXBUF, 1);
    int k = 0;

    for (int i = 0; i < len; i++) {
        char ch = s[i];
        if (isdigit((unsigned char)ch)) {
            k = k * 10 + (ch - '0');
        } else if (ch == '[') {
            strcpy(strStack[top], current);
            cntStack[top] = k;
            top++;
            current[0] = '\\0';
            k = 0;
        } else if (ch == ']') {
            top--;
            int repeat = cntStack[top];
            char* prev = strStack[top];
            int segLen = (int)strlen(current);
            char* seg = (char*)malloc(segLen + 1);
            strcpy(seg, current);
            int prevLen = (int)strlen(prev);
            strcpy(current, prev);
            for (int r = 0; r < repeat; r++) {
                memcpy(current + prevLen + r * segLen, seg, segLen);
            }
            current[prevLen + repeat * segLen] = '\\0';
            free(seg);
        } else {
            int clen = (int)strlen(current);
            current[clen] = ch;
            current[clen + 1] = '\\0';
        }
    }

    char* result = (char*)malloc(strlen(current) + 1);
    strcpy(result, current);

    free(current);
    for (int i = 0; i < 32; i++) free(strStack[i]);
    free(strStack);
    free(cntStack);

    return result;
}
`,
    cpp: `class Solution {
public:
    string decodeString(string s) {
        stack<int> countStack;
        stack<string> stringStack;
        string current = "";
        int k = 0;
        for (char ch : s) {
            if (isdigit(ch)) {
                k = k * 10 + (ch - '0');
            } else if (ch == '[') {
                countStack.push(k);
                stringStack.push(current);
                current = "";
                k = 0;
            } else if (ch == ']') {
                int repeat = countStack.top();
                countStack.pop();
                string prev = stringStack.top();
                stringStack.pop();
                string seg = current;
                current = prev;
                for (int i = 0; i < repeat; i++) {
                    current += seg;
                }
            } else {
                current += ch;
            }
        }
        return current;
    }
};`,
  },
  editorial: `## Approach: Stack-based Decoding

### Intuition
When we encounter a \`[\`, we need to remember the string built so far and the repeat count, then process the inner content fresh. When we hit \`]\`, we combine. This is naturally handled with a stack.

### Algorithm
1. Maintain two stacks: one for repeat counts (\`countStack\`) and one for previously built strings (\`stringStack\`).
2. Track the \`current\` string being built and the current number \`k\`.
3. For each character:
   - **Digit**: accumulate into \`k\` (handles multi-digit numbers like \`10\`).
   - **\`[\`**: push \`k\` and \`current\` onto their stacks, reset both.
   - **\`]\`**: pop \`repeat\` and \`prev\`, set \`current = prev + current * repeat\`.
   - **Letter**: append to \`current\`.
4. Return \`current\` at the end.

### Example Trace for \`3[a2[b]]\`
\`\`\`
ch='3': k=3
ch='[': push(3, ""), current="", k=0
ch='a': current="a"
ch='2': k=2
ch='[': push(2, "a"), current="", k=0
ch='b': current="b"
ch=']': repeat=2, prev="a", current="a"+"b"*2="abb"
ch=']': repeat=3, prev="", current=""+"abb"*3="abbabbabb"
Result: "abbabbabb"
\`\`\`

### Complexity
- **Time**: O(output length) — each character of the final decoded string is produced once.
- **Space**: O(depth * max_segment_length) for the stacks.`,
};

export default problem;
