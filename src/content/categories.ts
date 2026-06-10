import type { CategoryId } from "./types";

export interface CategoryInfo {
  id: CategoryId;
  label: string;
  description: string;
  order: number;
}

export const CATEGORIES: Record<CategoryId, CategoryInfo> = {
  foundations: {
    id: "foundations",
    label: "Foundations",
    description: "Warm-up problems to get comfortable with the workflow.",
    order: 1,
  },
  complexity: {
    id: "complexity",
    label: "Complexity Analysis",
    description: "Big-O notation and reasoning about time and space.",
    order: 2,
  },
  "arrays-hashing": {
    id: "arrays-hashing",
    label: "Arrays & Hashing",
    description: "The bread and butter: arrays, hash maps, and sets.",
    order: 3,
  },
  "two-pointers": {
    id: "two-pointers",
    label: "Two Pointers",
    description: "Walking pointers from both ends or in tandem.",
    order: 4,
  },
  stack: {
    id: "stack",
    label: "Stack & Queue",
    description: "LIFO and FIFO structures and where they shine.",
    order: 5,
  },
  "binary-search": {
    id: "binary-search",
    label: "Binary Search",
    description: "Halving the search space on sorted or monotonic data.",
    order: 6,
  },
  "sliding-window": {
    id: "sliding-window",
    label: "Sliding Window",
    description: "Maintaining a moving range over arrays and strings.",
    order: 7,
  },
  "linked-lists": {
    id: "linked-lists",
    label: "Linked Lists",
    description: "Nodes, pointers, and trade-offs versus arrays.",
    order: 8,
  },
  "trees-graphs": {
    id: "trees-graphs",
    label: "Trees & Graphs",
    description: "Hierarchies, grids, and graph traversal.",
    order: 9,
  },
  "recursion-dp": {
    id: "recursion-dp",
    label: "Recursion & DP",
    description: "Self-similar problems, memoization, and dynamic programming.",
    order: 10,
  },
};

export const CATEGORY_LIST = Object.values(CATEGORIES).sort(
  (a, b) => a.order - b.order,
);
