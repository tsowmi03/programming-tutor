import type { ExplanationProblemDef } from "../types";

const problem: ExplanationProblemDef = {
  type: "explanation",
  slug: "explain-how-recursion-depth-affects-space-complexity",
  title: "Recursion Depth and Space Complexity",
  difficulty: "medium",
  category: "complexity",
  order: 1057,
  description: `## How Does Recursion Depth Affect Space Complexity?

When analyzing the space complexity of a recursive algorithm, most students focus only on the data structures they explicitly create. However, **recursion itself consumes memory** through the call stack.

In your explanation, address **all** of the following:

1. **What is the call stack?** Explain what information gets pushed onto the call stack each time a function calls itself.
2. **How recursion depth maps to space usage.** If a recursive function reaches a maximum depth of \`d\`, what is the space consumed by the call stack alone?
3. **Worked examples.** Walk through at least two contrasting examples:
   - A function with \`O(n)\` recursion depth (e.g., linear recursion over a list or a skewed binary tree traversal).
   - A function with \`O(log n)\` recursion depth (e.g., binary search or balanced tree traversal).
4. **Hidden space costs.** Explain why a naive recursive solution can silently cause a stack overflow on large inputs even when the algorithm seems efficient in terms of time complexity.
5. **Tail recursion and iterative conversion.** Briefly describe how tail-call optimization or converting recursion to iteration can reduce the space cost to \`O(1)\` (or a smaller footprint).

Use concrete examples with small values to illustrate your points.`,
  hints: [
    `Think about what information the computer needs to 'remember' while it waits for a recursive call to return — where does that information live?`,
    `How many recursive calls can be 'in-flight' (not yet returned) at the same time? That number determines the stack depth.`,
    `Compare an algorithm that cuts the problem in half each step versus one that reduces it by one each step — how does that affect depth?`,
  ],
  guidance: [
    {
      "title": "Start with the call stack concept",
      "body": "Before diving into big-O, ground your answer in what physically happens: every function call allocates a **stack frame**. Describe what's in a frame (parameters, locals, return address) and note that these frames accumulate until the base case is reached.",
      "level": "nudge"
    },
    {
      "title": "Connect depth to space",
      "body": "The key insight is that **only frames that haven't returned yet** occupy memory simultaneously. Trace a simple example — like `sum(4)` calling `sum(3)` calling `sum(2)` — and count how many frames are live at the deepest point. That maximum live count is the depth `d`, and space = O(d).",
      "level": "strategy"
    },
    {
      "title": "Choose contrasting examples deliberately",
      "body": "Pick one example where depth scales with `n` (linear: skewed tree, recursive list sum) and one where depth scales with `log n` (binary search, balanced tree). For each, show the call chain with a small concrete value (e.g., n=8) so the depth is visible.",
      "level": "strategy"
    },
    {
      "title": "Don't forget the pitfall: implicit space can still overflow",
      "body": "Students often think 'I'm not allocating any arrays, so my space complexity is O(1).' Make sure to address how a function with no explicit allocations but O(n) recursion depth can still cause a stack overflow — the call stack is real memory with a finite limit (often 1–8 MB by default).",
      "level": "pitfall"
    },
    {
      "title": "Tail recursion: shape of the argument",
      "body": "Show the transformation from non-tail to tail-recursive form using an accumulator, then to an iterative loop:\n\n```\n// Non-tail\nf(n) = n + f(n-1)\n\n// Tail-recursive (accumulator pattern)\nf(n, acc) = f(n-1, acc + n)   // nothing to do after the call\n\n// Iterative (always O(1) stack regardless of language)\nacc = 0\nwhile n > 0: acc += n; n -= 1\nreturn acc\n```\n\nNote which languages support TCO and which require the iterative version.",
      "level": "pseudocode"
    }
  ],

  modelAnswer: `## Recursion Depth and Space Complexity

### 1. The Call Stack

Every time a function calls itself recursively, the runtime pushes a **stack frame** onto the call stack. Each frame stores:
- The **return address** (where to jump when this call finishes)
- **Local variables** declared inside the function
- **Parameters** passed to the function
- Possibly **saved registers** (compiler/runtime dependent)

Because each frame takes a roughly constant amount of memory (proportional to the number of local variables and parameters in that call), the **total stack memory** is proportional to the **number of frames alive at once** — which equals the **maximum recursion depth**.

---

### 2. Recursion Depth → Space Usage

If a recursive function reaches a maximum call-stack depth of \`d\`, the space consumed by the call stack is:

\`\`\`
O(d)
\`\`\`

This space is **auxiliary** — it exists on top of any extra data structures you explicitly allocate. Even if your algorithm allocates no arrays or hash maps, it still uses \`O(d)\` space implicitly.

---

### 3. Worked Examples

#### Example A — O(n) Depth: Summing a Linked List / Skewed Tree

\`\`\`text
function sumList(node):
    if node is null: return 0
    return node.value + sumList(node.next)
\`\`\`

For a list of length \`n\`, the call chain is:
\`\`\`
sumList(node_1)
  → sumList(node_2)
      → sumList(node_3)
          → ... (n levels deep)
              → sumList(null)  ← base case
\`\`\`
All \`n\` frames are alive simultaneously while waiting for the deepest call to return. **Space complexity: O(n)**.

Same situation for traversing a maximally skewed binary tree (every node has only a right child).

#### Example B — O(log n) Depth: Binary Search

\`\`\`text
function binarySearch(arr, lo, hi, target):
    if lo > hi: return -1
    mid = (lo + hi) / 2
    if arr[mid] == target: return mid
    if arr[mid] < target:  return binarySearch(arr, mid+1, hi, target)
    else:                  return binarySearch(arr, lo, mid-1, target)
\`\`\`

Each call halves the search range. For \`n = 16\`:
\`\`\`
depth 1: lo=0, hi=15
depth 2: lo=0, hi=7   (or mid+1..15)
depth 3: lo=0, hi=3
depth 4: lo=0, hi=1
depth 5: base case
\`\`\`
Maximum depth ≈ log₂(n). **Space complexity: O(log n)**.

Same applies to traversing a **balanced** binary tree — depth is O(log n).

---

### 4. Hidden Space Costs (Silent Stack Overflows)

Consider a recursive Fibonacci:
\`\`\`text
function fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)
\`\`\`

The **time** complexity is exponential O(2ⁿ), but the **space** complexity is often overlooked. The maximum stack depth at any moment is \`O(n)\` (the deepest chain is \`fib(n) → fib(n-1) → fib(n-2) → ...\`). For \`n = 10,000\`, this alone can overflow the default call stack (commonly 1–8 MB), causing a **stack overflow error** — not because of an explicit data structure, but because of the implicit stack frames.

This is why a seemingly "small" recursive algorithm can crash on large inputs: **the recursion depth is the hidden variable that determines stack memory usage**.

---

### 5. Tail Recursion and Iterative Conversion

**Tail recursion** occurs when the recursive call is the very last operation in the function — no pending work remains after the call returns.

\`\`\`text
// NON-tail-recursive (addition pending after the call)
function sum(n):
    if n == 0: return 0
    return n + sum(n-1)   ← must remember n to add later

// Tail-recursive (accumulator carries the state)
function sumTail(n, acc):
    if n == 0: return acc
    return sumTail(n-1, acc + n)   ← nothing pending after call
\`\`\`

With **tail-call optimization (TCO)**, a compiler/runtime can **reuse** the current stack frame instead of pushing a new one, reducing stack space to \`O(1)\`.

⚠️ **Not all languages implement TCO.** Python, Java, and JavaScript (in most engines) do **not** optimize tail calls. You must manually convert to an iterative loop to guarantee O(1) stack space:

\`\`\`text
function sumIterative(n):
    acc = 0
    while n > 0:
        acc += n
        n -= 1
    return acc
\`\`\`

This achieves the same result with **O(1) space** regardless of \`n\`.

---

### Summary Table

| Algorithm | Recursion Depth | Stack Space |
|---|---|---|
| Linear list/skewed tree traversal | O(n) | O(n) |
| Balanced tree traversal | O(log n) | O(log n) |
| Binary search | O(log n) | O(log n) |
| Merge sort | O(log n) | O(log n) |
| Naive recursive Fibonacci | O(n) | O(n) |
| Tail-recursive (with TCO) | O(n) calls, O(1) frames | O(1) |
| Iterative equivalent | — | O(1) |`,
  keyPoints: [
    `Each recursive call pushes a stack frame with local variables, parameters, and return address`,
    `Total call-stack space = O(maximum recursion depth)`,
    `Linear recursion (e.g., summing a list) has O(n) depth → O(n) space`,
    `Divide-and-conquer (e.g., binary search, balanced tree) has O(log n) depth → O(log n) space`,
    `Deep recursion can cause stack overflow even when no large data structures are allocated`,
    `Tail recursion allows the runtime to reuse the current stack frame (TCO), achieving O(1) stack space`,
    `Languages like Python and Java do not implement TCO, requiring manual conversion to iteration for O(1) space`,
  ],
};

export default problem;
