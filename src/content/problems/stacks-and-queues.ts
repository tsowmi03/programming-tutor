import type { ExplanationProblemDef } from "../types";

export const stacksAndQueues: ExplanationProblemDef = {
  type: "explanation",
  slug: "stacks-and-queues-in-practice",
  title: "Stacks and Queues in Practice",
  difficulty: "easy",
  category: "stack",
  order: 2,
  description: `Explain the difference between a **stack** and a **queue**, and where each shows up in real systems.

Your answer should cover:

1. The access discipline of each (LIFO vs FIFO) and their core operations.
2. Two real examples where a stack is the natural fit, and *why* the problem demands LIFO.
3. Two real examples where a queue is the natural fit, and *why* the problem demands FIFO.
4. How each can be implemented efficiently (what structure underneath, and what can go wrong naively).
`,
  hints: [
    "Don't just define them — for each example, point to the property of the problem that *forces* that access order.",
    "For implementation: what's wrong with using a plain array/list as a queue?",
  ],
  modelAnswer: `**The disciplines.** Both are sequences with restricted access:

- **Stack — LIFO** (last in, first out): \`push\` and \`pop\` at the same end. The newest element is the only one reachable.
- **Queue — FIFO** (first in, first out): \`enqueue\` at the back, \`dequeue\` at the front. The *oldest* element leaves first.

The restriction is the value: it encodes an ordering guarantee directly into the data structure, making code self-documenting and O(1) per operation.

**Stacks fit problems with nesting — the most recent unfinished thing finishes first:**

- **The call stack.** A function call can't complete until its callees do; returns happen in exact reverse order of calls. Recursion *is* a stack, which is also why any recursive algorithm can be rewritten with an explicit one.
- **Undo (and bracket matching, and DFS).** Ctrl+Z must revert the *most recent* edit; an opening bracket is matched by the *most recently* unclosed closer. Whenever the problem says "most recent first," that's LIFO.

**Queues fit problems demanding fairness or arrival order:**

- **Task/message queues** (print jobs, web server request backlogs, message brokers). Work should be served in arrival order — both for fairness and predictable latency; processing the newest first would starve old requests.
- **Breadth-first search.** BFS must explore all nodes at distance k before any at distance k+1. A queue delivers exactly that ordering — swap it for a stack and the same loop becomes DFS. The container choice *is* the algorithm.

**Implementation.** A stack is trivially a dynamic array (push/pop at the end, amortised O(1)). A queue is the one with a trap: dequeuing from an array's *front* shifts every remaining element — O(n) per dequeue (e.g. Python's \`list.pop(0)\`). Efficient options: a **ring buffer** (two indices wrapping around a fixed array), a doubly-ended structure like Python's \`collections.deque\` or Java's \`ArrayDeque\`, or a linked list with head and tail pointers — all O(1) at both ends.
`,
  keyPoints: [
    "Stack = LIFO (push/pop one end); queue = FIFO (enqueue back, dequeue front)",
    "Stack examples tied to nesting/most-recent-first: call stack, undo, DFS, bracket matching",
    "Queue examples tied to arrival order/fairness: task queues, BFS level order",
    "Queue vs stack choice literally turns BFS into DFS — container encodes the algorithm",
    "Naive array-as-queue dequeues in O(n); ring buffer / deque achieve O(1) at both ends",
  ],
};
