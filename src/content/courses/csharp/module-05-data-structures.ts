import type { CourseModule } from "../types";

export const csharpDataStructures: CourseModule = {
  slug: "data-structures",
  title: "Core Data Structures",
  description:
    "The standard library ships the structures you reach for daily — Stack<T>, Queue<T>, LinkedList<T>. Learn their C# APIs and when each one's access pattern is the right tool.",
  lessons: [
    {
      slug: "stack-and-queue",
      title: "Stack<T> and Queue<T>",
      summary: "LIFO and FIFO, and the bracket-matching pattern.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Two access disciplines

\`Stack<T>\` and \`Queue<T>\` are both linear collections; they differ only in *which end* you take from.

**\`Stack<T>\` — Last In, First Out.** The most recently pushed item is the next one out. Think of a call stack, an undo history, or matching nested brackets.

\`\`\`csharp
var stack = new Stack<int>();
stack.Push(1);
stack.Push(2);
int top = stack.Peek();   // 2 — look without removing
int x = stack.Pop();      // 2 — remove and return
int count = stack.Count;  // 1
\`\`\`

**\`Queue<T>\` — First In, First Out.** The earliest enqueued item is the next out. Think of a print queue, or breadth-first traversal.

\`\`\`csharp
var queue = new Queue<int>();
queue.Enqueue(1);
queue.Enqueue(2);
int front = queue.Peek();    // 1
int y = queue.Dequeue();     // 1 — remove and return
\`\`\`

Both are O(1) for their push/pop operations. Calling \`Pop\`/\`Dequeue\`/\`Peek\` on an empty collection throws — guard with \`.Count > 0\` (or \`TryPop\`/\`TryDequeue\`).`,
        },
        {
          kind: "prose",
          markdown: `## The canonical stack problem: balanced brackets

Matching nested brackets is *the* example where a stack is obviously right. Scan left to right:

- An **opening** bracket → push the matching **closing** bracket you expect to see.
- A **closing** bracket → it's valid only if it matches what's on top of the stack; pop and continue.

At the end, the stack must be empty (everything was closed).

\`\`\`csharp
// For "([])": push ')', push ']', see ']' matches top, see ')' matches top -> valid
// For "([)]": push ')', push ']', see ')' but top is ']' -> invalid
\`\`\`

The reason a stack fits: the **most recently opened** bracket must be the **first one closed** — that's LIFO exactly.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "valid-brackets",
            title: "Valid parentheses",
            prompt: `Given a string \`s\` of only the characters \`(\`, \`)\`, \`[\`, \`]\`, \`{\`, \`}\`, return \`true\` if every bracket is closed by the correct type **in the correct order**.

\`\`\`text
IsValid("()[]{}") -> true
IsValid("([])")   -> true
IsValid("(]")     -> false
IsValid("([)]")   -> false
\`\`\`

Push the *expected closer* when you see an opener; when you see a closer, it must equal what you pop. If the stack is empty when you need to pop, or non-empty at the end, it's invalid.`,
            signature: {
              name: "isValid",
              params: [{ name: "s", type: "string" }],
              returns: "bool",
            },
            tests: [
              { input: ["()[]{}"], expected: true },
              { input: ["([])"], expected: true },
              { input: ["(]"], expected: false },
              { input: ["([)]"], expected: false },
              { input: [""], expected: true, hidden: true },
              { input: ["("], expected: false, hidden: true },
              { input: ["]"], expected: false, hidden: true },
              { input: ["{[()]}"], expected: true, hidden: true },
              { input: ["(("], expected: false, hidden: true },
            ],
            starterCode: `using System.Collections.Generic;

public class Solution {
    public bool IsValid(string s) {
        // Use a Stack<char> of the closing brackets you expect.
    }
}`,
            solution: `using System.Collections.Generic;

public class Solution {
    public bool IsValid(string s) {
        var stack = new Stack<char>();
        foreach (char c in s) {
            if (c == '(') stack.Push(')');
            else if (c == '[') stack.Push(']');
            else if (c == '{') stack.Push('}');
            else {
                // c is a closing bracket
                if (stack.Count == 0 || stack.Pop() != c) {
                    return false;
                }
            }
        }
        return stack.Count == 0;
    }
}`,
            hints: [
              "On an opening bracket, push the *closer* you expect to see later.",
              "On a closing bracket, fail if the stack is empty or its top doesn't match.",
              "After the loop, a valid string leaves the stack empty.",
            ],
          },
        },
      ],
    },
    {
      slug: "linked-lists",
      title: "Linked lists",
      summary: "LinkedList<T>, building your own node, and the relink mindset.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Nodes and pointers

A **linked list** stores each element in a node that also holds a reference to the next node. Unlike an array, the elements aren't contiguous in memory — you follow references from one to the next.

The trade-off versus an array:

| Operation | Array | Linked list |
|---|---|---|
| Access by index | **O(1)** | O(n) — must walk from the head |
| Insert/remove at a known node | O(n) — shift elements | **O(1)** — relink references |
| Memory | compact | a reference per node |

C# ships a doubly-linked \`LinkedList<T>\`:

\`\`\`csharp
var list = new LinkedList<int>();
list.AddLast(1);
list.AddLast(2);
list.AddFirst(0);          // 0 -> 1 -> 2
LinkedListNode<int> head = list.First;
int v = head.Value;        // 0
LinkedListNode<int> next = head.Next;
\`\`\`

In practice you rarely use \`LinkedList<T>\` for everyday lists (\`List<T>\` wins on cache locality). But the *node-with-a-next-reference* idea underpins many interview problems, so it's worth building one by hand.`,
        },
        {
          kind: "prose",
          markdown: `## Rolling your own node

A singly-linked node is just a class that references another instance of itself:

\`\`\`csharp
public class ListNode {
    public int Value;
    public ListNode Next;   // null marks the end of the list
    public ListNode(int value) { Value = value; }
}
\`\`\`

Walking it is a \`while\` loop that follows \`Next\` until \`null\`:

\`\`\`csharp
ListNode current = head;
while (current != null) {
    // do something with current.Value
    current = current.Next;
}
\`\`\`

**Reversing** a linked list is the quintessential pointer exercise: walk the list, and at each node, flip its \`Next\` to point at the node you just came from. You track three references — previous, current, and the saved next — and march forward. The same "save next, relink, advance" rhythm shows up across linked-list problems. The exercise below practises that index-walking mindset on a plain array first.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "reverse-array",
            title: "Reverse in place",
            prompt: `Return a new array containing the elements of \`nums\` in **reverse order**. Do it by hand with index arithmetic — don't call \`Array.Reverse\` — to practise the pointer-walking that linked-list reversal generalises.

\`\`\`text
Reverse([1, 2, 3, 4]) -> [4, 3, 2, 1]
Reverse([42])         -> [42]
\`\`\`

The clean approach: read \`nums\` from the back while writing the result from the front (or swap two pointers moving inward).`,
            signature: {
              name: "reverse",
              params: [{ name: "nums", type: "int[]" }],
              returns: "int[]",
            },
            tests: [
              { input: [[1, 2, 3, 4]], expected: [4, 3, 2, 1] },
              { input: [[42]], expected: [42] },
              { input: [[]], expected: [], hidden: true },
              { input: [[1, 2]], expected: [2, 1], hidden: true },
              {
                input: [[5, 4, 3, 2, 1]],
                expected: [1, 2, 3, 4, 5],
                hidden: true,
              },
            ],
            starterCode: `public class Solution {
    public int[] Reverse(int[] nums) {
        // Build the reversed array yourself (no Array.Reverse).
    }
}`,
            solution: `public class Solution {
    public int[] Reverse(int[] nums) {
        int n = nums.Length;
        int[] result = new int[n];
        for (int i = 0; i < n; i++) {
            result[i] = nums[n - 1 - i];
        }
        return result;
    }
}`,
            hints: [
              "Allocate a result array the same length as `nums`.",
              "Element `i` of the result is element `n - 1 - i` of the input.",
              "Alternatively, swap `nums[left]` and `nums[right]` while moving the two indices toward the middle.",
            ],
          },
        },
      ],
    },
  ],
};
