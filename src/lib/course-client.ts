import type { ClientBlock } from "@/components/courses/types";
import type { LessonBlock } from "@/content/courses";
import { guidanceBodies, normalizeGuidance } from "./guidance";

/** Build browser-safe lesson data without knowledge-check answers or hidden cases. */
export function toClientCourseBlocks(blocks: LessonBlock[]): ClientBlock[] {
  return blocks.map((block) => {
    if (block.kind === "prose") {
      return { kind: "prose", markdown: block.markdown };
    }
    if (block.kind === "knowledge_check") {
      return {
        kind: "knowledge_check",
        check: {
          id: block.check.id,
          format: block.check.format,
          prompt: block.check.prompt,
          choices: block.check.choices,
          objectiveId: block.check.objectiveId,
          required: block.check.required !== false,
        },
      };
    }

    const exercise = block.exercise;
    const guidance = normalizeGuidance(exercise.guidance, exercise.hints);
    const common = {
      id: exercise.id,
      title: exercise.title,
      prompt: exercise.prompt,
      hiddenTestCount: exercise.tests.filter((test) => test.hidden).length,
      starterCode: exercise.starterCode,
      guidance,
      hints: guidanceBodies(guidance),
      required: exercise.required !== false,
    };
    return {
      kind: "exercise",
      exercise:
        exercise.mode === "script"
          ? {
              ...common,
              mode: "script" as const,
              visibleTests: exercise.tests.filter((test) => !test.hidden),
            }
          : {
              ...common,
              mode: "function" as const,
              signature: exercise.signature,
              visibleTests: exercise.tests.filter((test) => !test.hidden),
            },
    };
  });
}
