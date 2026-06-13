import type { Course } from "../types";
import { pythonEssentials } from "./module-01-essentials";
import { pythonCollections } from "./module-02-collections";
import { pythonStringsComprehensions } from "./module-03-strings-comprehensions";
import { pythonFunctionsIdioms } from "./module-04-functions-idioms";
import { pythonDataStructures } from "./module-05-data-structures";
import { pythonAlgorithms } from "./module-06-algorithms";

export const pythonCourse: Course = {
  slug: "python-for-developers",
  title: "Python for Developers",
  language: "python",
  tagline: "Already code? Learn Python through data structures and algorithms.",
  description: `A fast, practical path into Python for people who **already know how to program**. We skip "what is a variable" and focus on what makes Python *Python*: indentation as structure, the built-in containers, comprehensions, and the idioms that turn verbose loops into a single readable line.

Every lesson ends with a coding exercise judged against real test cases — the same engine that powers the problem set — so you're writing and running Python from the first lesson, not just reading about it.

By the end you'll reach naturally for \`dict\`, \`set\`, and \`collections\`; write comprehensions and key-based sorts without thinking; and implement the classic algorithms (binary search, Kadane's, bottom-up DP) the way a fluent Python developer would.`,
  modules: [
    pythonEssentials,
    pythonCollections,
    pythonStringsComprehensions,
    pythonFunctionsIdioms,
    pythonDataStructures,
    pythonAlgorithms,
  ],
};
