import type { ProblemDef } from "./types";

// Coding problems
import { fizzbuzz } from "./problems/fizzbuzz";
import { twoSum } from "./problems/two-sum";
import { containsDuplicate } from "./problems/contains-duplicate";
import { validAnagram } from "./problems/valid-anagram";
import { validPalindrome } from "./problems/valid-palindrome";
import { moveZeroes } from "./problems/move-zeroes";
import { containerWithMostWater } from "./problems/container-with-most-water";
import { validParentheses } from "./problems/valid-parentheses";
import { binarySearch } from "./problems/binary-search";
import { findMinRotated } from "./problems/find-min-rotated";
import { longestSubstring } from "./problems/longest-substring";
import { climbingStairs } from "./problems/climbing-stairs";
import { coinChange } from "./problems/coin-change";
import { numberOfIslands } from "./problems/number-of-islands";

// Explanation problems
import { bigOBasics } from "./problems/big-o-basics";
import { analyzingLoops } from "./problems/analyzing-loops";
import { arraysVsLinkedLists } from "./problems/arrays-vs-linked-lists";
import { linkedListOperations } from "./problems/linked-list-operations";
import { hashMapsUnderTheHood } from "./problems/hash-maps-under-the-hood";
import { stacksAndQueues } from "./problems/stacks-and-queues";
import { bfsVsDfs } from "./problems/bfs-vs-dfs";
import { memoizationVsTabulation } from "./problems/memoization-vs-tabulation";
import { whenBinarySearchApplies } from "./problems/when-binary-search-applies";

export const ALL_PROBLEMS: ProblemDef[] = [
  // Foundations & complexity
  fizzbuzz,
  bigOBasics,
  analyzingLoops,
  // Arrays & hashing
  twoSum,
  containsDuplicate,
  validAnagram,
  hashMapsUnderTheHood,
  // Two pointers
  validPalindrome,
  moveZeroes,
  containerWithMostWater,
  // Stack
  validParentheses,
  stacksAndQueues,
  // Binary search
  binarySearch,
  findMinRotated,
  whenBinarySearchApplies,
  // Sliding window
  longestSubstring,
  // Linked lists
  arraysVsLinkedLists,
  linkedListOperations,
  // Trees & graphs
  numberOfIslands,
  bfsVsDfs,
  // Recursion & DP
  climbingStairs,
  coinChange,
  memoizationVsTabulation,
];

export { CATEGORIES, CATEGORY_LIST } from "./categories";
export type { ProblemDef, CodeProblemDef, ExplanationProblemDef } from "./types";
