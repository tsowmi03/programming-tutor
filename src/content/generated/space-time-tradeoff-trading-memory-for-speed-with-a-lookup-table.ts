import type { ExplanationProblemDef } from "../types";

const problem: ExplanationProblemDef = {
  type: "explanation",
  slug: "space-time-tradeoff-trading-memory-for-speed-with-a-lookup-table",
  title: "Space-Time Tradeoff: Trading Memory for Speed with a Lookup Table",
  difficulty: "medium",
  category: "complexity",
  order: 1038,
  description: `## The Space-Time Tradeoff

Consider two different implementations of a function that counts the number of set bits (1s) in the binary representation of an integer:

**Approach A – Compute on the fly:**
\`\`\`text
function countBits(n):
    count = 0
    while n > 0:
        count += n & 1
        n >>= 1
    return count
\`\`\`

**Approach B – Precomputed lookup table:**
\`\`\`text
# At program startup, build a table for all 8-bit values (0–255)
table[0..255] = [countBits(i) for i in 0..255]

function countBitsLookup(n):
    # Split n into 8-bit chunks, look each up in the table
    return table[n & 0xFF] + table[(n >> 8) & 0xFF] +
           table[(n >> 16) & 0xFF] + table[(n >> 24) & 0xFF]
\`\`\`

Using these two approaches as a concrete anchor, **explain the concept of the space-time tradeoff**. Your answer should address:

1. What is a space-time tradeoff in general, and why does it arise?
2. How does the lookup-table technique embody this tradeoff?
3. What are the time and space complexities of both approaches above, and how do they compare?
4. In what real-world scenarios is spending extra memory to gain speed beneficial, and when is it not?
5. What are the practical limits of the lookup-table strategy?`,
  hints: [
    `Think about what changes between the two approaches: one does the same arithmetic every call, while the other does it once and stores the result. What does that imply about the per-call cost?`,
    `Consider what 'preprocessing' means for Big-O analysis. If you spend O(256) time building the table once and then answer each query in O(1), how does that amortize across many queries compared to O(log n) per query with no preprocessing?`,
    `Ask yourself: what would happen if you tried to build a lookup table for *all* 32-bit integers instead of splitting into 8-bit chunks? Why do engineers often split inputs into smaller chunks for lookup tables?`,
    `Think about CPU cache sizes (L1 is typically 32–64 KB). How does table size interact with cache performance? Is a bigger table always faster?`,
  ],
  modelAnswer: `## Space-Time Tradeoff: Trading Memory for Speed with a Lookup Table

### 1. What is a Space-Time Tradeoff?

A **space-time tradeoff** is a situation in algorithm design where you can reduce the *time* an algorithm takes by using *more memory*, or conversely, reduce memory usage at the cost of more computation. The tradeoff arises because computation and storage are both limited, finite resources, and optimizing one often comes at the expense of the other.

The underlying idea is: **if you are going to need the same result more than once, compute it once, store it, and retrieve it cheaply later.** This shifts work from repeated runtime computation into a one-time (or amortized) preprocessing step.

---

### 2. The Lookup Table as a Space-Time Tradeoff

A **lookup table (LUT)** is the canonical embodiment of this tradeoff.

- **Pre-computation phase:** Before any queries arrive, you solve the problem for *every possible input* in the domain and store the results in an array (or hash map).
- **Query phase:** For any input, you simply index into the table — O(1) per query — instead of re-running the computation.

In the bit-counting example:
- We precompute \`countBits\` for all 256 possible 8-bit values (0–255) and store them in a 256-element array.
- For a 32-bit integer, we split it into four 8-bit chunks and sum four table lookups. Each lookup is a single array access — O(1) — instead of a loop.

---

### 3. Complexity Comparison

| | Approach A (compute) | Approach B (lookup table) |
|---|---|---|
| **Preprocessing time** | O(1) | O(2⁸) = O(256) ≈ O(1) amortized |
| **Preprocessing space** | O(1) | O(256) = O(1) (constant, domain-bound) |
| **Per-query time** | O(log n) — loops over each bit | O(1) — four array accesses |
| **Per-query space** | O(1) | O(1) |

For a 32-bit integer, Approach A iterates up to 32 times; Approach B does exactly 4 additions and 4 lookups — a constant-factor speedup. If \`countBits\` is called billions of times (e.g., in a tight inner loop), this matters enormously.

> **Key insight:** We traded a small, one-time memory cost (256 bytes) for a permanent reduction in per-query work.

---

### 4. When Is the Tradeoff Beneficial?

**Worth it when:**
- The function is called very frequently (hot path in a loop).
- The input domain is small and finite (e.g., bytes, small integers, ASCII characters).
- The precomputation cost is paid once and amortized over many queries.
- The memory cost is acceptable relative to available RAM.
- Examples: trigonometric function tables in embedded systems, CRC checksums, chess endgame tablebases, DNS caches, memoized Fibonacci.

**Not worth it when:**
- The function is called rarely — precomputation overhead isn't recovered.
- The input domain is huge or unbounded — the table would consume too much memory.
- Memory is extremely constrained (e.g., microcontrollers with kilobytes of RAM).
- Cache pressure: a very large lookup table may not fit in CPU cache, causing cache misses that actually *slow down* access vs. direct computation.

---

### 5. Practical Limits of the Lookup-Table Strategy

1. **Domain size explosion:** If we tried a 32-bit lookup table instead of splitting into 8-bit chunks, we'd need 2³² ≈ 4 billion entries — roughly 4 GB of memory just for this table. Splitting into 8-bit chunks is a common workaround, but it requires a decomposition step.

2. **Cache effects:** Modern CPUs have L1 caches of 32–64 KB. A 256-entry byte table fits easily; a 65,536-entry table may not. Beyond a certain size, cache misses outweigh computational savings.

3. **Initialization cost:** If your program runs very briefly, spending time building the table may cost more than it saves.

4. **Multidimensional inputs:** Lookup tables work best with one or two parameters. For many parameters, the table size grows exponentially.

5. **Memoization as a generalization:** When the domain is large but only a subset of inputs are actually queried at runtime, a hash map (dictionary) used for **memoization** is a more flexible version of the same idea — you pay memory only for values you actually compute.

---

### Summary

The space-time tradeoff is a foundational principle: **precompute and store to answer queries faster.** Lookup tables are the simplest and most direct realization of this principle. They are most powerful when the domain is small, queries are frequent, and memory is available. Understanding this tradeoff helps engineers make conscious, context-aware decisions about when to spend memory budget for performance gains.`,
  keyPoints: [
    `Define space-time tradeoff: reducing time by using more memory (or vice versa)`,
    `Explain that a lookup table precomputes all results once and stores them for O(1) retrieval`,
    `Correctly state that Approach A is O(log n) per query and Approach B is O(1) per query`,
    `Identify that the tradeoff is beneficial when queries are frequent and the domain is small/finite`,
    `Recognize that precomputation cost is amortized over many queries`,
    `Describe practical limits: domain-size explosion, cache effects, and memory constraints`,
    `Mention memoization as a related, more flexible generalization of the lookup-table idea`,
  ],
};

export default problem;
