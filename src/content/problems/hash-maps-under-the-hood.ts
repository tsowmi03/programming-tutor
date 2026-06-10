import type { ExplanationProblemDef } from "../types";

export const hashMapsUnderTheHood: ExplanationProblemDef = {
  type: "explanation",
  slug: "hash-maps-under-the-hood",
  title: "Hash Maps Under the Hood",
  difficulty: "medium",
  category: "arrays-hashing",
  order: 4,
  description: `Hash maps (Python \`dict\`, Java \`HashMap\`, JS \`Map\`) promise O(1) average lookups. Explain **how they actually work**.

Your answer should cover:

1. The journey from a key to a storage location (hash function, buckets).
2. What a **collision** is, why collisions are unavoidable, and one strategy for handling them.
3. What the **load factor** is and why hash maps resize themselves.
4. Why lookups are O(1) "on average" but O(n) in the worst case.
5. Why keys usually must be immutable / why mutating a key after insertion breaks things.
`,
  hints: [
    "Follow one `put(key, value)` call end to end: hash → index → bucket.",
    "Pigeonhole principle: more possible keys than buckets means…?",
    "What goes wrong if a key's hash changes while it sits in the table?",
  ],
  modelAnswer: `**From key to location.** A hash map is, underneath, an **array of buckets**. Storing \`put(key, value)\`:

1. A **hash function** condenses the key into an integer — deterministically, so the same key always hashes alike — with output spread as uniformly as possible.
2. The integer is mapped into the array's range, typically \`index = hash mod capacity\`.
3. The pair is stored in the bucket at that index.

Lookup repeats the same computation and lands in the same bucket — **no searching**, which is the whole trick: arithmetic replaces scanning.

**Collisions.** Two different keys can land in the same bucket. With vastly more possible keys than buckets this is a pigeonhole-principle certainty, not bad luck. The classic handling strategy is **separate chaining**: each bucket holds a small list of entries; lookups scan only that bucket's few entries, comparing actual keys. (The main alternative, **open addressing**, probes other slots in the array itself; Python's dict does this.)

**Load factor and resizing.** Load factor = entries ÷ buckets. As it climbs, chains lengthen and O(1) decays towards O(n). So implementations resize past a threshold (e.g. 0.75 in Java's HashMap): allocate roughly double the buckets and **rehash every entry** into its new position. A single resize is expensive, but doubling means it happens geometrically rarely — insertion stays **amortised O(1)** (same argument as dynamic array growth).

**Average vs worst case.** With a decent hash function and bounded load factor, the *expected* bucket holds O(1) entries — hence O(1) average operations. Worst case: every key collides into one bucket and the map degrades to a linked list — O(n). This isn't only theoretical: adversaries who can choose keys can engineer collisions (a real DoS vector — languages randomise string hashes to counter it), and a custom key type with a bad \`hashCode\` does it to you accidentally.

**Key immutability.** The bucket index is computed from the hash *at insertion time*. Mutate a key afterwards and its hash changes, but the entry stays in the old bucket — lookups now compute the *new* index and miss it. The entry isn't gone; it's *unfindable*, which is worse. Hence dict keys in Python must be immutable types, and mutating an object used as a HashMap key is a well-known Java footgun.
`,
  keyPoints: [
    "Bucket array + hash function + modulo: arithmetic replaces searching",
    "Collisions are guaranteed by pigeonhole; chaining (or open addressing) resolves them",
    "Load factor triggers resize + rehash; doubling keeps insertion amortised O(1)",
    "O(1) is an average under good hashing; adversarial or bad hashing degrades to O(n)",
    "Mutating a stored key strands its entry in the wrong bucket — why keys must be immutable",
  ],
};
