import { describe, expect, it } from "vitest";
import { beginnerPythonCourse } from "@/content/courses/beginner-python";
import { toClientCourseBlocks } from "./course-client";

describe("course client serialization", () => {
  it("removes accepted knowledge answers and hidden script expectations", () => {
    const lesson = beginnerPythonCourse.modules[0].lessons[0];
    const clientBlocks = toClientCourseBlocks(lesson.blocks);
    const serialized = JSON.stringify(clientBlocks);

    expect(serialized).not.toContain("acceptedAnswers");
    expect(serialized).not.toContain('"hidden":true');
    expect(serialized).not.toContain("Sam");
    expect(serialized).not.toContain('"solution"');
    expect(serialized).not.toContain("workedStart");
    expect(serialized).not.toContain("Add the final step here");
    expect(
      clientBlocks.some(
        (block) =>
          block.kind === "exercise" && block.exercise.mode === "script",
      ),
    ).toBe(true);
  });
});
