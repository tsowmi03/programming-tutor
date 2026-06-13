import type { CourseModule } from "../types";

export const pythonDataStructures: CourseModule = {
  slug: "data-structures",
  title: "Data Structures from the stdlib",
  description:
    "Python's list doubles as a stack, and the `collections` module hands you a queue, a counter, and a defaulting dict. Learn which tool fits which access pattern.",
  lessons: [
    {
      slug: "stacks-and-queues",
      title: "Stacks and queues",
      summary: "list as a stack, collections.deque as a queue, and bracket matching.",
      blocks: [
        {
          kind: "prose",
          markdown: `## A list is already a stack

A **stack** is Last-In-First-Out. Python doesn't need a special type — a \`list\` with \`append\` and \`pop\` *is* a stack, both O(1):

\`\`\`python
stack = []
stack.append(1)      # push
stack.append(2)
stack[-1]            # 2 — peek at the top
stack.pop()          # 2 — remove and return the top
len(stack)           # 1
\`\`\`

Popping an empty list raises \`IndexError\`, so guard with \`if stack:\` (an empty list is falsy).

## Use a deque for a queue

A **queue** is First-In-First-Out. Don't use a list for this — \`list.pop(0)\` is O(n) because every other element shifts. Instead use \`collections.deque\` (double-ended queue), which is O(1) at both ends:

\`\`\`python
from collections import deque

queue = deque()
queue.append(1)        # enqueue at the back
queue.append(2)
queue.popleft()        # 1 — dequeue from the front, O(1)
\`\`\`

\`deque\` is the right structure for breadth-first search and any FIFO processing.`,
        },
        {
          kind: "prose",
          markdown: `## The canonical stack problem: balanced brackets

Matching nested brackets is *the* example where a stack is obviously right. Scan left to right:

- An **opening** bracket → push the matching **closing** bracket you expect to see.
- A **closing** bracket → it's valid only if it matches the top of the stack; pop and continue.

At the end the stack must be empty (everything was closed).

A dict mapping openers to their closers keeps this tidy in Python:

\`\`\`python
pairs = {"(": ")", "[": "]", "{": "}"}
# For "([])": push ')', push ']', see ']' matches top, see ')' matches top -> valid
# For "([)]": push ')', push ']', see ')' but top is ']' -> invalid
\`\`\`

The reason a stack fits: the **most recently opened** bracket must be the **first one closed** — LIFO exactly.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "valid-brackets",
            title: "Valid parentheses",
            prompt: `Given a string \`s\` of only the characters \`(\`, \`)\`, \`[\`, \`]\`, \`{\`, \`}\`, return \`True\` if every bracket is closed by the correct type **in the correct order**.

\`\`\`text
is_valid("()[]{}") -> True
is_valid("([])")   -> True
is_valid("(]")     -> False
is_valid("([)]")   -> False
\`\`\`

Use a list as a stack. On an opener, push its expected closer; on a closer, it must equal what you pop. If the stack is empty when you need to pop, or non-empty at the end, it's invalid.`,
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
            starterCode: `def is_valid(s):
    # Use a list as a stack of the closing brackets you expect.
    pass
`,
            solution: `def is_valid(s):
    pairs = {"(": ")", "[": "]", "{": "}"}
    stack = []
    for c in s:
        if c in pairs:
            stack.append(pairs[c])
        elif not stack or stack.pop() != c:
            return False
    return not stack
`,
            hints: [
              "Map each opener to its closer in a dict; on an opener, push the expected closer.",
              "On a closing bracket, fail if the stack is empty (`not stack`) or its popped top doesn't match.",
              "After the loop, a valid string leaves the stack empty — `return not stack`.",
            ],
          },
        },
      ],
    },
    {
      slug: "counter-and-defaultdict",
      title: "Counter, defaultdict, and reversing",
      summary: "collections shortcuts and the Pythonic way to reverse.",
      blocks: [
        {
          kind: "prose",
          markdown: `## collections makes counting trivial

The \`collections\` module has purpose-built dict variants that erase boilerplate.

**\`Counter\`** counts hashable items in one call and supports handy queries:

\`\`\`python
from collections import Counter

freq = Counter(nums)          # {value: count}, in one line
freq.most_common(2)           # the 2 most frequent (value, count) pairs
freq["x"]                     # 0 for a missing key (doesn't raise)
\`\`\`

**\`defaultdict\`** supplies a default for missing keys, so you can append/increment without checking first:

\`\`\`python
from collections import defaultdict

groups = defaultdict(list)
for word in words:
    groups[len(word)].append(word)   # no "if key not in groups" needed
\`\`\`

These two replace the most common hand-written dict patterns. Reach for \`Counter\` whenever you'd write a frequency loop, and \`defaultdict(list)\` whenever you're grouping.`,
        },
        {
          kind: "prose",
          markdown: `## Reversing, the Pythonic way

Reversing a sequence is a one-liner in Python — slicing with a step of \`-1\`:

\`\`\`python
nums[::-1]            # a new reversed list
"".join(reversed(s))  # reversed() works on any sequence, yields an iterator
list(reversed(nums))  # same as nums[::-1]
\`\`\`

It's worth knowing what the slick version hides, though. The manual, in-place version uses **two pointers** moving inward and swapping — the same technique behind reversing a linked list and many two-pointer problems:

\`\`\`python
left, right = 0, len(nums) - 1
while left < right:
    nums[left], nums[right] = nums[right], nums[left]  # swap via unpacking
    left += 1
    right -= 1
\`\`\`

The exercise below accepts either approach. Use the slice for real code; try the two-pointer version once to feel the pattern.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "reverse",
            title: "Reverse a list",
            prompt: `Return a new list containing the elements of \`nums\` in **reverse order**.

\`\`\`text
reverse([1, 2, 3, 4]) -> [4, 3, 2, 1]
reverse([42])         -> [42]
\`\`\`

The Pythonic answer is the slice \`nums[::-1]\`. For practice, you can also build it with a two-pointer swap or by appending while walking the input backwards — the judge only checks the result.`,
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
              { input: [[5, 4, 3, 2, 1]], expected: [1, 2, 3, 4, 5], hidden: true },
            ],
            starterCode: `def reverse(nums):
    # Return the reversed list.
    pass
`,
            solution: `def reverse(nums):
    return nums[::-1]
`,
            hints: [
              "Slicing with a negative step reverses: `nums[::-1]`.",
              "`list(reversed(nums))` is equivalent.",
              "To do it manually, swap `nums[left]` and `nums[right]` while moving the two indices toward the middle.",
            ],
          },
        },
      ],
    },
  ],
};
