import type { ExplanationProblemDef } from "../types";

export const arraysVsLinkedLists: ExplanationProblemDef = {
  type: "explanation",
  slug: "arrays-vs-linked-lists",
  title: "Arrays vs Linked Lists",
  difficulty: "easy",
  category: "linked-lists",
  order: 1,
  description: `Compare **arrays** and **singly linked lists** as ways of storing a sequence.

Your answer should cover:

1. How each is laid out in memory, and what that layout makes cheap or expensive.
2. The Big-O cost of: indexing (get the k-th element), search, insertion/deletion at the front, and insertion/deletion in the middle (in both structures).
3. Why arrays are usually faster in practice even for operations with the same Big-O (mention CPU caches).
4. One scenario where a linked list is genuinely the better choice.
`,
  hints: [
    "Start from memory layout — every other difference follows from it.",
    "For middle insertion in a linked list, be careful: the insertion itself is O(1), but how did you *get* there?",
  ],
  modelAnswer: `**Memory layout is the root difference.** An array is one **contiguous block**; element k lives at a computable address (base + k × element size). A singly linked list is a chain of separately allocated nodes, each holding a value and a pointer to the next node — neighbours in the list can be anywhere in memory.

**Operation costs:**

| Operation | Array | Linked list |
|---|---|---|
| Index (k-th element) | **O(1)** — address arithmetic | O(n) — walk k links |
| Search (unsorted) | O(n) | O(n) |
| Insert/delete at front | O(n) — shift everything | **O(1)** — repoint the head |
| Insert/delete in middle | O(n) — shift the tail | O(1) *splice*, but **O(n) to get there** |

The linked-list middle-insertion claim of "O(1)" deserves suspicion: rewiring two pointers is O(1) **only once you already hold a reference to the predecessor node**. If you must search for the position first, the operation is O(n) overall. Linked lists shine specifically when an algorithm naturally *already has* a handle on the insertion point.

**Why arrays win in practice even at equal Big-O.** CPUs fetch memory in cache lines (~64 bytes) and prefetch sequential accesses. Scanning an array streams through warm cache; scanning a linked list chases pointers to scattered addresses, taking a potential cache miss *per node* — easily 10–100× slower per element, plus per-node allocation overhead and pointer storage. Both scans are "O(n)", but the constants differ wildly. This is why standard libraries (Python \`list\`, Java \`ArrayList\`, C++ \`vector\`) default to array-backed storage and why dynamic arrays' amortised O(1) append makes the "arrays can't grow" objection mostly obsolete.

**Where linked lists genuinely win:** when you hold stable references to nodes and need O(1) splice/removal *without invalidating other references* — an LRU cache (hash map pointing at doubly-linked-list nodes; move-to-front and evict-last are O(1)), OS run queues, or undo systems. Note the pattern: the list is paired with another structure that supplies the node references.
`,
  keyPoints: [
    "Array = contiguous memory, computable addresses; linked list = scattered nodes connected by pointers",
    "Array: O(1) index, O(n) front insert. List: O(n) index, O(1) front insert",
    "Middle insertion in a list is O(1) only with a reference in hand — finding the spot is O(n)",
    "Cache locality: pointer chasing causes a cache miss per node, so arrays dominate at equal Big-O",
    "Valid linked-list use case, e.g. LRU cache with stored node references",
  ],
};
