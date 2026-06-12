import type { CodeProblemDef } from "../types";

const problem: CodeProblemDef = {
  type: "code",
  slug: "daily-temperatures-days-until-a-warmer-temperature",
  title: "Daily Temperatures",
  difficulty: "medium",
  category: "stack",
  order: 1078,
  description: `Given an array \`temperatures\` where \`temperatures[i]\` is the temperature on day \`i\`, return an array \`answer\` such that \`answer[i]\` is the number of days you have to wait **after** day \`i\` to get a strictly warmer temperature. If there is no future day with a higher temperature, set \`answer[i] = 0\`.

\`\`\`text
Example 1:
Input:  temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]
Explanation:
  Day 0 (73): next warmer is day 1 (74) → wait 1
  Day 1 (74): next warmer is day 2 (75) → wait 1
  Day 2 (75): next warmer is day 6 (76) → wait 4
  Day 3 (71): next warmer is day 5 (72) → wait 2
  Day 4 (69): next warmer is day 5 (72) → wait 1
  Day 5 (72): next warmer is day 6 (76) → wait 1
  Day 6 (76): no warmer future day   → 0
  Day 7 (73): no warmer future day   → 0
\`\`\`

\`\`\`text
Example 2:
Input:  temperatures = [30,40,50,60]
Output: [1,1,1,0]
\`\`\`

**Constraints:**
- \`1 <= temperatures.length <= 10^5\`
- \`30 <= temperatures[i] <= 100\``,
  hints: [
    `As you scan left to right, you need to remember indices of days whose 'next warmer day' you haven't determined yet.`,
    `When you encounter a temperature higher than a previous unsettled day, you can immediately compute the wait for that day. Which data structure naturally gives you the most-recent unsettled day first?`,
    `A monotonic (non-increasing) stack of day indices works: pop and answer any index whose temperature is beaten by the current day, then push the current index.`,
  ],
  signature: {
    "name": "dailyTemperatures",
    "params": [
      {
        "name": "temperatures",
        "type": "int[]"
      }
    ],
    "returns": "int[]",
    "ordered": true
  },
  testCases: [
    {
      "input": [
        [
          73,
          74,
          75,
          71,
          69,
          72,
          76,
          73
        ]
      ],
      "expected": [
        1,
        1,
        4,
        2,
        1,
        1,
        0,
        0
      ],
      "hidden": false
    },
    {
      "input": [
        [
          30,
          40,
          50,
          60
        ]
      ],
      "expected": [
        1,
        1,
        1,
        0
      ],
      "hidden": false
    },
    {
      "input": [
        [
          30,
          60,
          90
        ]
      ],
      "expected": [
        1,
        1,
        0
      ],
      "hidden": false
    },
    {
      "input": [
        [
          90,
          80,
          70,
          60
        ]
      ],
      "expected": [
        0,
        0,
        0,
        0
      ],
      "hidden": true
    },
    {
      "input": [
        [
          70
        ]
      ],
      "expected": [
        0
      ],
      "hidden": true
    },
    {
      "input": [
        [
          70,
          70,
          70
        ]
      ],
      "expected": [
        0,
        0,
        0
      ],
      "hidden": true
    },
    {
      "input": [
        [
          55,
          38,
          53,
          81,
          61,
          93,
          97,
          32,
          43,
          78
        ]
      ],
      "expected": [
        3,
        1,
        1,
        2,
        1,
        1,
        0,
        1,
        1,
        0
      ],
      "hidden": true
    },
    {
      "input": [
        [
          50,
          60,
          50,
          60,
          50,
          60
        ]
      ],
      "expected": [
        1,
        0,
        1,
        0,
        1,
        0
      ],
      "hidden": true
    }
  ],
  starterCode: {
    python: `def daily_temperatures(temperatures):
    # TODO
    return []
`,
    javascript: `function dailyTemperatures(temperatures) {
    // TODO
    return [];
}
`,
    typescript: `function dailyTemperatures(temperatures: number[]): number[] {
    // TODO
    return [];
}`,
    java: `class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        // TODO
        return new int[]{};
    }
}
`,
    csharp: `public class Solution {
    public int[] DailyTemperatures(int[] temperatures) {
        // TODO
        return new int[]{};
    }
}`,
    c: `int* dailyTemperatures(int* temperatures, int temperaturesSize, int* returnSize) {
    *returnSize = 0;
    return NULL;
}
`,
    cpp: `class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        // TODO
        return {};
    }
};`,
  },
  solutions: {
    python: `def daily_temperatures(temperatures):
    n = len(temperatures)
    result = [0] * n
    stack = []  # stores indices
    for i in range(n):
        while stack and temperatures[i] > temperatures[stack[-1]]:
            idx = stack.pop()
            result[idx] = i - idx
        stack.append(i)
    return result
`,
    javascript: `function dailyTemperatures(temperatures) {
    const n = temperatures.length;
    const result = new Array(n).fill(0);
    const stack = [];
    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const idx = stack.pop();
            result[idx] = i - idx;
        }
        stack.push(i);
    }
    return result;
}
`,
    typescript: `function dailyTemperatures(temperatures: number[]): number[] {
    const n = temperatures.length;
    const result = new Array(n).fill(0);
    const stack: number[] = [];
    for (let i = 0; i < n; i++) {
        while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const idx = stack.pop()!;
            result[idx] = i - idx;
        }
        stack.push(i);
    }
    return result;
}`,
    java: `class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] result = new int[n];
        int[] stack = new int[n];
        int top = -1;
        for (int i = 0; i < n; i++) {
            while (top >= 0 && temperatures[i] > temperatures[stack[top]]) {
                int idx = stack[top--];
                result[idx] = i - idx;
            }
            stack[++top] = i;
        }
        return result;
    }
}
`,
    csharp: `public class Solution {
    public int[] DailyTemperatures(int[] temperatures) {
        int n = temperatures.Length;
        int[] result = new int[n];
        int[] stack = new int[n];
        int top = -1;
        for (int i = 0; i < n; i++) {
            while (top >= 0 && temperatures[i] > temperatures[stack[top]]) {
                int idx = stack[top--];
                result[idx] = i - idx;
            }
            stack[++top] = i;
        }
        return result;
    }
}`,
    c: `#include <stdlib.h>
int* dailyTemperatures(int* temperatures, int temperaturesSize, int* returnSize) {
    *returnSize = temperaturesSize;
    int* result = (int*)malloc(temperaturesSize * sizeof(int));
    int* stack  = (int*)malloc(temperaturesSize * sizeof(int));
    int top = -1;
    for (int i = 0; i < temperaturesSize; i++) result[i] = 0;
    for (int i = 0; i < temperaturesSize; i++) {
        while (top >= 0 && temperatures[i] > temperatures[stack[top]]) {
            int idx = stack[top--];
            result[idx] = i - idx;
        }
        stack[++top] = i;
    }
    free(stack);
    return result;
}
`,
    cpp: `class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        int n = temperatures.size();
        vector<int> result(n, 0);
        vector<int> stack;
        for (int i = 0; i < n; i++) {
            while (!stack.empty() && temperatures[i] > temperatures[stack.back()]) {
                int idx = stack.back();
                stack.pop_back();
                result[idx] = i - idx;
            }
            stack.push_back(i);
        }
        return result;
    }
};`,
  },
  editorial: `## Approach: Monotonic Decreasing Stack

### Intuition
As we scan left to right, we want to answer "when is the next warmer day?" for each index. We can't answer day \`i\` immediately because its warmer day might come later. Instead, we *defer* the answer by keeping a stack of unsettled indices, maintaining the invariant that their temperatures are **non-increasing** from bottom to top.

### Algorithm
1. Initialise \`result\` to all zeros and an empty stack of indices.
2. For each day \`i\`:
   - While the stack is non-empty **and** \`temperatures[i] > temperatures[stack.top]\`:
     - Pop \`j\` from the stack.
     - Set \`result[j] = i - j\` (found the next warmer day for \`j\`).
   - Push \`i\` onto the stack.
3. Any index remaining in the stack has no warmer future day; its answer stays \`0\`.

### Example trace for \`[73,74,75,71,69,72,76,73]\`
\`\`\`
i=0 push 0          stack=[0]
i=1 74>73 pop→ans[0]=1, push 1    stack=[1]
i=2 75>74 pop→ans[1]=1, push 2    stack=[2]
i=3 71<75 push 3    stack=[2,3]
i=4 69<71 push 4    stack=[2,3,4]
i=5 72>69 pop→ans[4]=1, 72>71 pop→ans[3]=2, 72<75 push 5  stack=[2,5]
i=6 76>72 pop→ans[5]=1, 76>75 pop→ans[2]=4, push 6  stack=[6]
i=7 73<76 push 7    stack=[6,7]  → ans[6]=ans[7]=0
Result: [1,1,4,2,1,1,0,0]
\`\`\`

### Complexity
- **Time:** O(n) — each index is pushed and popped at most once.
- **Space:** O(n) — stack and result array.`,
};

export default problem;
