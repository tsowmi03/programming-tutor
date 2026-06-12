import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "simplify-a-unix-style-file-path-string",
  title: "Simplify Unix File Path",
  difficulty: "medium",
  category: "stack",
  order: 1082,
  description: `Given a string \`path\` representing an **absolute** Unix-style file path, simplify it to its **canonical** form.

Rules:
- The path starts with a \`/\`.
- Multiple consecutive slashes \`//\` are treated as a single slash \`/\`.
- A single dot \`.\` refers to the current directory and can be ignored.
- A double dot \`..\` moves up one directory level (if already at root \`/\`, stay at root).
- Any other component (letters, digits, dashes, underscores, etc.) is a valid directory/file name.
- The canonical path must:
  - Start with a single \`/\`.
  - **Not** end with a trailing \`/\` (unless it is the root itself).
  - **Not** contain \`.\` or \`..\` components.
  - **Not** contain multiple consecutive slashes.

Return the simplified canonical path as a string.

\`\`\`text
Example 1:
Input:  path = "/home//foo/"
Output: "/home/foo"
Explanation: Double slash and trailing slash are removed.
\`\`\`

\`\`\`text
Example 2:
Input:  path = "/a/./b/../../c/"
Output: "/c"
Explanation:
  /a          -> stack: ["a"]
  /a/.        -> stack: ["a"]       (. = current dir, ignored)
  /a/./b      -> stack: ["a", "b"]
  /a/./b/..   -> stack: ["a"]       (.. = go up)
  /a/./b/../.. -> stack: []          (.. at "a" pops it)
  /a/./b/../../c -> stack: ["c"]
  Result: "/c"
\`\`\`

\`\`\`text
Example 3:
Input:  path = "/../"
Output: "/"
Explanation: Cannot go above root; .. at root stays at root.
\`\`\`

**Constraints:**
- \`1 <= path.length <= 3000\`
- \`path\` consists of English letters, digits, \`'.'\`, \`'/'\`, \`'-'\`, and \`'_'\`.
- \`path\` is guaranteed to start with \`'/'\`.`,
  hints: [
    `Split the path by '/' to extract individual components, then process each one.`,
    `Use a stack to track the current directory hierarchy. Push valid names, pop on '..', and ignore '.' and empty strings.`,
    `After processing all components, join the stack with '/' and prepend a single '/' to form the canonical path.`,
  ],
  signature: {
    "name": "simplifyPath",
    "params": [
      {
        "name": "path",
        "type": "string"
      }
    ],
    "returns": "string"
  },
  testCases: [
    {
      "input": [
        "/home//foo/"
      ],
      "expected": "/home/foo",
      "hidden": false
    },
    {
      "input": [
        "/a/./b/../../c/"
      ],
      "expected": "/c",
      "hidden": false
    },
    {
      "input": [
        "/../"
      ],
      "expected": "/",
      "hidden": false
    },
    {
      "input": [
        "/home/user/Documents/../Pictures"
      ],
      "expected": "/home/user/Pictures",
      "hidden": true
    },
    {
      "input": [
        "/"
      ],
      "expected": "/",
      "hidden": true
    },
    {
      "input": [
        "/.../a/../b/c"
      ],
      "expected": "/.../b/c",
      "hidden": true
    },
    {
      "input": [
        "/a//b////c/d"
      ],
      "expected": "/a/b/c/d",
      "hidden": true
    },
    {
      "input": [
        "/abc/def/ghi"
      ],
      "expected": "/abc/def/ghi",
      "hidden": true
    },
    {
      "input": [
        "/a/../../.."
      ],
      "expected": "/",
      "hidden": true
    },
    {
      "input": [
        "/foo/bar/.."
      ],
      "expected": "/foo",
      "hidden": true
    }
  ],
  starterCode: {
    python: `def simplify_path(path: str) -> str:
    # TODO: implement using a stack
    pass
`,
    javascript: `/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function(path) {
    // TODO: implement using a stack
};
`,
    typescript: `function simplifyPath(path: string): string {
    // TODO: implement using a stack
    return "";
}`,
    java: `class Solution {
    public String simplifyPath(String path) {
        // TODO: implement using a stack
        return "";
    }
}
`,
    csharp: `public class Solution {
    public string SimplifyPath(string path) {
        // TODO: implement using a stack
        return "";
    }
}`,
    c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char* simplifyPath(char* path) {
    // TODO: implement using a stack
    return "";
}
`,
    cpp: `class Solution {
public:
    string simplifyPath(string path) {
        // TODO: implement using a stack
        return "";
    }
};`,
  },
  solutions: {
    python: `def simplify_path(path: str) -> str:
    stack = []
    parts = path.split('/')
    for part in parts:
        if part == '' or part == '.':
            continue
        elif part == '..':
            if stack:
                stack.pop()
        else:
            stack.append(part)
    return '/' + '/'.join(stack)
`,
    javascript: `var simplifyPath = function(path) {
    const stack = [];
    const parts = path.split('/');
    for (const part of parts) {
        if (part === '' || part === '.') {
            continue;
        } else if (part === '..') {
            if (stack.length > 0) {
                stack.pop();
            }
        } else {
            stack.push(part);
        }
    }
    return '/' + stack.join('/');
};
`,
    typescript: `function simplifyPath(path: string): string {
    const stack: string[] = [];
    const parts = path.split('/');
    for (const part of parts) {
        if (part === '' || part === '.') {
            continue;
        } else if (part === '..') {
            if (stack.length > 0) {
                stack.pop();
            }
        } else {
            stack.push(part);
        }
    }
    return '/' + stack.join('/');
}`,
    java: `class Solution {
    public String simplifyPath(String path) {
        java.util.Deque<String> stack = new java.util.ArrayDeque<>();
        String[] parts = path.split("/");
        for (String part : parts) {
            if (part.equals("") || part.equals(".")) {
                continue;
            } else if (part.equals("..")) {
                if (!stack.isEmpty()) {
                    stack.pop();
                }
            } else {
                stack.push(part);
            }
        }
        StringBuilder sb = new StringBuilder();
        String[] arr = stack.toArray(new String[0]);
        for (int i = arr.length - 1; i >= 0; i--) {
            sb.append('/').append(arr[i]);
        }
        return sb.length() == 0 ? "/" : sb.toString();
    }
}
`,
    csharp: `using System.Collections.Generic;

public class Solution {
    public string SimplifyPath(string path) {
        Stack<string> stack = new Stack<string>();
        string[] parts = path.Split('/');
        foreach (string part in parts) {
            if (part == "" || part == ".") {
                continue;
            } else if (part == "..") {
                if (stack.Count > 0) {
                    stack.Pop();
                }
            } else {
                stack.Push(part);
            }
        }
        string[] arr = stack.ToArray();
        System.Text.StringBuilder sb = new System.Text.StringBuilder();
        for (int i = arr.Length - 1; i >= 0; i--) {
            sb.Append('/').Append(arr[i]);
        }
        return sb.Length == 0 ? "/" : sb.ToString();
    }
}`,
    c: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char* simplifyPath(char* path) {
    int len = (int)strlen(path);
    char** stack = (char**)malloc((len + 1) * sizeof(char*));
    int top = 0;

    char* buf = (char*)malloc((len + 1) * sizeof(char));
    strcpy(buf, path);

    char* token = strtok(buf, "/");
    while (token != NULL) {
        if (strcmp(token, "..") == 0) {
            if (top > 0) top--;
        } else if (strcmp(token, ".") != 0 && strlen(token) > 0) {
            stack[top++] = token;
        }
        token = strtok(NULL, "/");
    }

    char* result = (char*)malloc((len + 2) * sizeof(char));
    if (top == 0) {
        strcpy(result, "/");
    } else {
        int pos = 0;
        for (int i = 0; i < top; i++) {
            result[pos++] = '/';
            int slen = (int)strlen(stack[i]);
            memcpy(result + pos, stack[i], slen);
            pos += slen;
        }
        result[pos] = '\\0';
    }

    free(stack);
    free(buf);
    return result;
}
`,
    cpp: `class Solution {
public:
    string simplifyPath(string path) {
        vector<string> stack;
        stringstream ss(path);
        string part;
        while (getline(ss, part, '/')) {
            if (part == "" || part == ".") {
                continue;
            } else if (part == "..") {
                if (!stack.empty()) {
                    stack.pop_back();
                }
            } else {
                stack.push_back(part);
            }
        }
        if (stack.empty()) return "/";
        string result = "";
        for (const string& s : stack) {
            result += '/' + s;
        }
        return result;
    }
};`,
  },
  editorial: `## Approach: Stack-Based Path Simplification

### Intuition
A Unix path is navigated component by component. We can split the path on \`'/'\` and process each piece:
- **Empty string or \`'.'\`** → ignore (no movement).
- **\`'..'\`** → go up one level (pop from stack if non-empty).
- **Anything else** → a valid name, push onto stack.

After processing all components, the stack (read bottom-to-top) represents the simplified path.

### Algorithm
1. Split \`path\` by \`'/'\`.
2. Iterate over each part:
   - Skip empty parts and \`'.'\`.
   - On \`'..'\`, pop from the stack if it is non-empty.
   - Otherwise push the part.
3. Join the stack with \`'/'\` and prepend \`'/'\`. If the stack is empty, return \`"/"\`.

### Example trace for \`/a/./b/../../c/\`
\`\`\`
parts: ["", "a", ".", "b", "..", "..", "c", ""]
stack after each step:
  ""  -> skip
  "a" -> ["a"]
  "." -> ["a"]
  "b" -> ["a", "b"]
  ".."-> ["a"]
  ".."-> []
  "c" -> ["c"]
  ""  -> skip
Result: "/" + "c" = "/c"
\`\`\`

### Complexity
- **Time:** O(n) where n = length of path (splitting + one pass over parts).
- **Space:** O(n) for the stack and parts array.

### Note on \`'...'\` (three dots)
Three dots is treated as a **valid** directory name (not a special symbol), so it is pushed onto the stack as-is. Only exactly \`'.'\` and \`'..'\` are special.`,
};

export default problem;
