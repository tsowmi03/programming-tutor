import type { Course } from "../types";
import { pythonEssentials } from "./module-01-essentials";
import { pythonLanguageDepth } from "./module-02-language-depth";
import { pythonCollections } from "./module-02-collections";
import { pythonStringsComprehensions } from "./module-03-strings-comprehensions";
import { pythonFunctionsIdioms } from "./module-04-functions-idioms";
import { pythonPythonicDesign } from "./module-06-pythonic-design";
import { pythonPracticalPython } from "./module-07-practical-python";
import { pythonAdvancedStdlib } from "./module-08-advanced-stdlib";
import { pythonDataStructures } from "./module-05-data-structures";
import { pythonAlgorithms } from "./module-06-algorithms";
import { pythonAlgorithmPatterns } from "./module-11-algorithm-patterns";

export const pythonCourse: Course = {
  slug: "python-for-developers",
  title: "Python for Developers",
  language: "python",
  level: "intermediate",
  audience: "Programmers with prior experience",
  prerequisiteCourseSlugs: ["programming-foundations-python"],
  progression: "open",
  tagline:
    "Build complete Python fluency, from object semantics to practical projects and algorithms.",
  description: `A comprehensive Python course for people who **already know how to program**. It begins with syntax and core containers, then develops deeper fluency across Python's object model, mutability, exceptions, type hints, dataclasses, decorators, modules, environments, files, JSON, async work, testing, standard-library tools, and algorithm patterns.

Most lessons include a coding activity judged against real test cases using the same engine as the problem set. Longer platform topics also include applied inspection and design activities where an isolated function would teach the wrong lesson.

By the end you will be able to explain Python's name/object model, avoid aliasing and mutation traps, design clear APIs, choose the right built-in or standard-library collection, keep I/O at testable boundaries, coordinate async work, and solve common algorithmic problems idiomatically in Python.`,
  modules: [
    pythonEssentials,
    pythonLanguageDepth,
    pythonCollections,
    pythonStringsComprehensions,
    pythonFunctionsIdioms,
    pythonPythonicDesign,
    pythonPracticalPython,
    pythonAdvancedStdlib,
    pythonDataStructures,
    pythonAlgorithms,
    pythonAlgorithmPatterns,
  ],
};
