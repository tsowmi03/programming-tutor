import type { Course } from "../types";
import { csharpEssentials } from "./module-01-essentials";
import { csharpCollections } from "./module-02-collections";
import { csharpStringsLinq } from "./module-03-strings-linq";
import { csharpCustomTypes } from "./module-04-custom-types";
import { csharpDataStructures } from "./module-05-data-structures";
import { csharpAlgorithms } from "./module-06-algorithms";

export const csharpCourse: Course = {
  slug: "csharp-for-developers",
  title: "C# for Developers",
  language: "csharp",
  tagline: "Already code? Learn C# through data structures and algorithms.",
  description: `A fast, practical path into C# for people who **already know how to program**. We skip "what is a variable" and focus on what's actually different about C#: its type system, the standard collections, LINQ, and the idioms you'll use to solve data-structures-and-algorithms problems.

Every lesson ends with a coding exercise judged against real test cases — the same engine that powers the problem set — so you're writing and running C# from the first lesson, not just reading about it.

By the end you'll be comfortable reaching for \`Dictionary\`, \`HashSet\`, \`Stack\`, and LINQ; defining your own types; and implementing the classic algorithms (binary search, Kadane's, bottom-up DP) idiomatically in C#.`,
  modules: [
    csharpEssentials,
    csharpCollections,
    csharpStringsLinq,
    csharpCustomTypes,
    csharpDataStructures,
    csharpAlgorithms,
  ],
};
