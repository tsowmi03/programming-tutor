import type { ExplanationProblemDef } from "../types";

const problem: ExplanationProblemDef = {
  type: "explanation",
  slug: "explain-why-hash-table-lookup-is-average-o-1-but-not-guaranteed",
  title: "Why Hash Table Lookup is Average O(1) But Not Guaranteed",
  difficulty: "medium",
  category: "complexity",
  order: 1056,
  description: `## Hash Table Lookup Complexity

A hash table (also called a hash map or dictionary) is one of the most widely used data structures in software engineering, largely because of its reputation for fast lookups.

You will often hear that hash table lookup is **O(1)**. But this claim comes with an important asterisk: it is only **average-case** O(1), not **worst-case** O(1).

**Your task:** Explain, in your own words, *why* hash table lookup averages O(1), and *why* this guarantee can break down in the worst case. Your explanation should cover:

1. How a hash table works at a high level (hashing keys to bucket indices).
2. What a **collision** is, and how it affects lookup time.
3. Why, on average (with a good hash function and reasonable load factor), lookup is O(1).
4. A concrete worst-case scenario that degrades lookup to O(n).
5. How real-world implementations (e.g., Python's \`dict\`, Java's \`HashMap\`) try to mitigate worst-case behavior.

Focus on building intuition and use concrete examples or analogies where helpful.`,
  hints: [
    `Think about what happens when multiple keys are assigned to the same bucket — how does lookup handle them?`,
    `Consider what 'average case' means statistically: what assumption about the hash function makes the expected chain length constant?`,
    `Can you construct a concrete set of keys that all hash to the same bucket? What would lookup look like then?`,
    `Think about what Python and Java do differently in their hash map implementations to defend against the worst case.`,
  ],
  guidance: [
    {
      "title": "Start with the mechanics",
      "body": "Before discussing complexity, make sure you can describe what physically happens during a lookup: the hash is computed, an array index is derived, and then something happens at that index. What is stored there, and what work might be needed?",
      "level": "nudge"
    },
    {
      "title": "Define 'average case' precisely",
      "body": "Average O(1) is not the same as 'usually fast.' It means the **expected** number of operations is bounded by a constant, under some probability model. Ask yourself: what is the random variable here — is it the input keys, or the hash function? How does the load factor connect to the expected work per lookup?",
      "level": "strategy"
    },
    {
      "title": "Construct the worst case concretely",
      "body": "The worst case isn't just theoretical. Try to describe a concrete set of keys and a concrete (bad or adversarial) hash function that forces all keys into one bucket. Then trace through what a lookup looks like — how many comparisons are needed?",
      "level": "strategy"
    },
    {
      "title": "Watch out for conflating average and amortized",
      "body": "Average-case O(1) (expected over input/hash randomness) is different from amortized O(1) (averaged over a sequence of operations, like resizing cost). Hash table lookup is average-case O(1); insertion is often described as amortized O(1) due to occasional O(n) resize. Be careful not to mix these two concepts.",
      "level": "pitfall"
    },
    {
      "title": "Real-world mitigations to cover",
      "body": "Structure your mitigation discussion around three layers:\n```\n1. Hash function quality\n   - Spread keys uniformly across buckets\n   - Python: randomized seed per process (hash randomization)\n   - Java: bit-mixing of hashCode()\n\n2. Load factor control\n   - Resize when (entries / buckets) > threshold (e.g. 0.75)\n   - After resize, expected chain length resets to ~O(1)\n\n3. Fallback data structures\n   - Java: linked list chain → red-black tree when chain > 8\n   - Caps per-bucket worst case at O(log n) instead of O(n)\n```",
      "level": "pseudocode"
    }
  ],

  modelAnswer: `## Why Hash Table Lookup is Average O(1) But Not Guaranteed

### 1. How a Hash Table Works

A hash table stores key-value pairs in an internal array of **buckets** (slots). When you insert or look up a key, a **hash function** maps that key to an integer index:

\`\`\`
bucket_index = hash(key) % num_buckets
\`\`\`

Ideally, each key lands in a unique bucket, so lookup is just: compute the hash, jump to that index, and read the value — all constant-time steps regardless of how many entries exist.

---

### 2. What is a Collision?

Two different keys can produce the **same bucket index**. This is called a **collision**.

Example:
- \`hash("apple") % 8 = 3\`
- \`hash("mango") % 8 = 3\`

Both want bucket 3. Common strategies to handle this:
- **Chaining**: Each bucket holds a linked list (or dynamic array) of all entries that hash there. Lookup scans the list.
- **Open addressing**: If a bucket is taken, probe neighboring buckets (linear probing, quadratic probing, etc.).

Collisions introduce extra work during lookup because you must scan through multiple entries in the same bucket.

---

### 3. Why Average-Case is O(1)

The key insight is the concept of **load factor (α)**:

\`\`\`
α = number_of_entries / number_of_buckets
\`\`\`

With a good (uniform) hash function, entries distribute roughly evenly across buckets. With chaining, the **expected length of any one chain** is α. If the hash table maintains a bounded load factor — typically by **resizing** (doubling the number of buckets) when α exceeds a threshold like 0.75 — then:

- Each chain stays short on average (length ≈ α = constant)
- Expected comparisons per lookup = O(1)

This is why lookup is **amortized / average O(1)**:
- Compute hash → O(1)
- Jump to bucket → O(1)
- Scan chain of expected length O(1) → O(1)

Analogy: Imagine 1000 students randomly assigned to 1000 lockers. On average each locker has ~1 student. Finding your stuff takes constant time. But if 100 students randomly end up in locker #7, that locker is slow to search.

---

### 4. The Worst Case: O(n)

Worst case occurs when **all n keys hash to the same bucket**. The bucket's chain becomes a length-n list, and lookup degenerates to a linear scan: **O(n)**.

This can happen:
- With a **bad hash function** that maps many keys to the same index.
- Through a **hash collision attack**: an adversary who knows your hash function deliberately chooses inputs that all collide, degrading your server's performance (a real denial-of-service vector).

Example of a naive hash: \`hash(key) = len(key) % 8\`. All strings of length 8, 16, 24... collide at index 0. Searching among 1000 such strings is O(1000) = O(n).

---

### 5. How Real Implementations Mitigate This

**Python \`dict\`:**
- Uses a carefully engineered hash function with perturbation (not just \`%\`) to spread collisions.
- Since Python 3.6+, uses **compact table** with open addressing.
- Since Python 3.3+, applies **hash randomization** (a random seed per process startup) so an attacker cannot predict collision patterns. You can observe this: \`hash("hello")\` returns a different value each time you start a new Python process.

**Java \`HashMap\`:**
- Since Java 8, when a bucket's chain grows beyond **8 entries**, it converts the chain from a linked list into a **balanced binary search tree (red-black tree)**. This caps worst-case per-bucket lookup at O(log n) instead of O(n).
- Also applies hash spreading (\`(h = key.hashCode()) ^ (h >>> 16)\`) to reduce collisions from poor user-defined \`hashCode()\` implementations.

**General strategies:**
- **Universal hashing**: Choose the hash function randomly from a family of functions, so no adversary can guarantee collisions.
- **Dynamic resizing**: Keep load factor below a threshold to maintain short chains.
- **Cryptographic hashing** (rare in standard maps, but used in security contexts): Harder to reverse-engineer for collision attacks.

---

### Summary Table

| Scenario | Lookup Complexity |
|---|---|
| Average case (good hash, low load) | O(1) |
| Worst case (all keys collide) | O(n) |
| Java 8+ worst case (tree buckets) | O(log n) |

The O(1) claim holds **in expectation** under reasonable assumptions. It is an average over the randomness of the hash function and/or the input distribution — not a hard guarantee for every possible input.`,
  keyPoints: [
    `Hash function maps keys to bucket indices in constant time`,
    `Collisions occur when two keys map to the same bucket index`,
    `Load factor (entries / buckets) determines average chain length`,
    `With bounded load factor and uniform hash, expected chain length is O(1)`,
    `Resizing the table keeps the load factor from growing unboundedly`,
    `Worst case: all keys collide into one bucket → O(n) lookup`,
    `Hash collision attacks are a real denial-of-service vector`,
    `Python uses per-process hash randomization to prevent collision attacks`,
    `Java 8+ converts long chains to red-black trees, bounding worst case at O(log n)`,
    `O(1) average is a probabilistic/amortized claim, not a worst-case guarantee`,
  ],
};

export default problem;
