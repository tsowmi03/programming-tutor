import type { Course } from "../types";
import { csharpEssentials } from "./module-01-essentials";
import { csharpLanguageDepth } from "./module-02-language-depth";
import { csharpCollections } from "./module-02-collections";
import { csharpStringsLinq } from "./module-03-strings-linq";
import { csharpCustomTypes } from "./module-04-custom-types";
import { csharpObjectDesign } from "./module-06-object-design";
import { csharpPracticalDotNet } from "./module-07-practical-dotnet";
import { csharpAdvancedCollections } from "./module-08-advanced-collections";
import { csharpDataStructures } from "./module-05-data-structures";
import { csharpAlgorithms } from "./module-06-algorithms";
import { csharpAlgorithmPatterns } from "./module-11-algorithm-patterns";

export const csharpCourse: Course = {
  slug: "csharp-for-developers",
  title: "C# for Developers",
  language: "csharp",
  tagline:
    "Build complete C# fluency, from the type system to production .NET patterns.",
  description: `A comprehensive C# course for people who **already know how to program**. It begins with the language rules that differ from other ecosystems, then develops practical fluency across collections, LINQ, object-oriented design, error handling, files and serialization, async/await, testing, data structures, and algorithm patterns.

Most lessons include a coding activity judged against real test cases using the same engine as the problem set. Longer platform topics also include applied tracing and design activities where a tiny isolated method would teach the wrong lesson.

By the end you will be able to explain C#'s value and reference semantics, design clear type and method contracts, choose and implement collection strategies, coordinate asynchronous work, keep I/O at testable boundaries, and solve common algorithmic problems idiomatically in C#.`,
  modules: [
    csharpEssentials,
    csharpLanguageDepth,
    csharpCollections,
    csharpStringsLinq,
    csharpCustomTypes,
    csharpObjectDesign,
    csharpPracticalDotNet,
    csharpAdvancedCollections,
    csharpDataStructures,
    csharpAlgorithms,
    csharpAlgorithmPatterns,
  ],
};
