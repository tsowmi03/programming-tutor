import type { ExplanationProblemDef } from "../types";

const problem: ExplanationProblemDef = {
  type: "explanation",
  slug: "when-to-prefer-a-linked-list-over-an-array",
  title: "When to Prefer a Linked List Over an Array",
  difficulty: "easy",
  category: "linked-lists",
  order: 1108,
  description: `## Linked Lists vs. Arrays: Choosing the Right Tool

Both **arrays** and **linked lists** are fundamental data structures used to store sequences of elements. However, they have very different performance characteristics depending on the operation.

**Your task:** Explain the key differences between arrays and linked lists, and describe **specific scenarios** where you would prefer a linked list over an array. Make sure to address:

1. How memory is laid out for each structure.
2. The time complexity of common operations (access, insertion, deletion) for both.
3. At least **two concrete real-world or algorithmic scenarios** where a linked list is the better choice.
4. Any disadvantages of linked lists you should be aware of.`,
  hints: [
    `Think about what happens physically in memory when you insert an element at the very beginning of each structure — how many other elements are affected?`,
    `Consider a situation where you don't know in advance how many elements you'll need to store. How does each structure handle growing beyond its current capacity?`,
    `Modern CPUs load data in cache lines from contiguous memory addresses. How might this affect the real-world speed of traversing each structure, even when Big-O complexity looks the same?`,
    `Think about abstract data structures like queues or stacks — which operations do they rely on most heavily (front insertions/removals vs. indexed access), and which underlying structure supports those operations more efficiently?`,
  ],
  modelAnswer: `## Linked Lists vs. Arrays: A Detailed Comparison

### Memory Layout

- **Array:** Elements are stored in a **contiguous block of memory**. Element \`i\` lives at address \`base + i * element_size\`, enabling direct, O(1) index-based access.
- **Linked List:** Elements (nodes) are **scattered throughout memory**. Each node stores its data *and* a pointer (or reference) to the next node. There is no guaranteed physical adjacency.

---

### Time Complexity of Common Operations

| Operation | Array | Linked List (Singly) |
|---|---|---|
| Access by index | **O(1)** | O(n) |
| Search (unsorted) | O(n) | O(n) |
| Insert at beginning | O(n) (shift elements) | **O(1)** |
| Insert at end | O(1) amortized\\* | O(n) or O(1) with tail pointer |
| Insert in middle | O(n) (shift elements) | O(n) to find + **O(1)** to link |
| Delete at beginning | O(n) (shift elements) | **O(1)** |
| Delete in middle | O(n) (shift elements) | O(n) to find + **O(1)** to unlink |

\\*Dynamic arrays (like Python lists) occasionally resize, but amortize to O(1).

---

### When to Prefer a Linked List

#### 1. Frequent Insertions and Deletions at the Front or Middle
If your application constantly adds or removes elements at the **beginning** of a sequence, an array must shift every subsequent element — O(n) per operation. A linked list simply rewires a pointer — O(1). 

> **Example:** Implementing a **queue** (FIFO) where you enqueue at the tail and dequeue from the head. Dequeuing from the front of an array requires shifting all remaining elements; with a linked list it's a single pointer update.

#### 2. Unknown or Highly Variable Size
Arrays (especially static arrays in C/Java) require you to declare a fixed maximum size upfront, or pay the cost of periodic resizing and copying. Linked lists **grow and shrink dynamically** one node at a time with no wasted capacity and no bulk copying.

> **Example:** A **real-time event log** where events arrive unpredictably and you cannot pre-allocate a safe maximum buffer. Each new event gets its own node, and old events are removed cheaply.

#### 3. Implementing Certain Abstract Data Structures
Linked lists are the natural backing structure for **stacks**, **queues**, and more advanced structures like **adjacency lists** for graphs, because their pointer-based nature directly models chaining and branching.

#### 4. Frequent Splicing or Merging of Sequences
Combining two linked lists requires only updating a couple of pointers — O(1). Concatenating two arrays requires copying one into the other — O(n).

---

### Disadvantages of Linked Lists to Keep in Mind

- **No O(1) random access.** You must traverse from the head to reach element \`i\`, taking O(n) time.
- **Extra memory overhead.** Each node stores a pointer in addition to the data (8 bytes on 64-bit systems). For small data types (e.g., \`int\`), this can double memory usage.
- **Poor cache performance.** Because nodes are scattered in memory, traversal causes many **cache misses**, making linked lists slower in practice even when asymptotic complexity is the same as an array.
- **No binary search** without converting to an array first, even if the list is sorted.

---

### Quick Decision Guide

- Need fast **random access** by index? → **Array**
- Need fast **insertions/deletions at the front**? → **Linked List**
- Working with a **fixed, known size**? → **Array**
- Need **dynamic growth** with frequent structural changes? → **Linked List**`,
  keyPoints: [
    `Arrays store elements contiguously; linked lists use scattered nodes connected by pointers`,
    `Arrays offer O(1) random access; linked lists require O(n) traversal to reach index i`,
    `Linked lists offer O(1) insertion/deletion at the head (or any known node), while arrays require O(n) shifting`,
    `Linked lists grow and shrink dynamically without bulk resizing or copying`,
    `Identifies a concrete scenario: front-heavy queue or deque operations`,
    `Identifies a concrete scenario: unpredictable/variable-size collections`,
    `Acknowledges linked list drawbacks: pointer overhead, poor cache locality, no binary search`,
  ],
};

export default problem;
