import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { getCourse, getExercise, getLesson } from "@/content/courses";
import { NotFoundError, toErrorResponse } from "@/lib/api";
import { requireUser } from "@/lib/auth";
import {
  DEFAULT_AI_GUIDANCE_MODEL,
  requestAiGuidance,
  type AiGuidanceProblemContext,
} from "@/lib/ai-guidance";
import {
  aiGuidanceUsageResponse,
  refundAiGuidanceUsage,
  reserveAiGuidanceUsage,
} from "@/lib/ai-guidance-limit";
import { normalizeGuidance } from "@/lib/guidance";
import { courseAiGuidanceRequestSchema } from "@/lib/validation";
import { courseLessonIsUnlocked } from "@/lib/course-mastery";
import { prisma } from "@/lib/prisma";

export const maxDuration = 30;

/** Runtime AI guidance for one course exercise attempt. */
export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const body = courseAiGuidanceRequestSchema.parse(await req.json());

    const course = getCourse(body.courseSlug);
    if (!course) throw new NotFoundError(`No course named "${body.courseSlug}"`);

    const lesson = getLesson(course, body.lessonSlug);
    if (!lesson) throw new NotFoundError("Lesson not found");

    const exercise = getExercise(course, body.lessonSlug, body.exerciseId);
    if (!exercise) throw new NotFoundError("Exercise not found");
    if (!(await courseLessonIsUnlocked(user.id, course, body.lessonSlug))) {
      return NextResponse.json({ error: "This lesson is locked." }, { status: 409 });
    }
    if (course.progression === "mastery") {
      const attempts = await prisma.courseExerciseSubmission.count({
        where: {
          userId: user.id,
          courseSlug: course.slug,
          lessonSlug: body.lessonSlug,
          exerciseId: body.exerciseId,
        },
      });
      if (attempts === 0) {
        return NextResponse.json(
          { error: "Run or submit your own attempt before requesting AI guidance." },
          { status: 409 },
        );
      }
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI guidance is not configured. Set ANTHROPIC_API_KEY." },
        { status: 503 },
      );
    }

    const visibleTestCount = exercise.tests.filter((test) => !test.hidden).length;
    const problem: AiGuidanceProblemContext = {
      title: exercise.title,
      difficulty: "course exercise",
      category: course.title,
      description: `Course: ${course.title}
Lesson: ${lesson.title}

${exercise.prompt}`,
      guidance: normalizeGuidance(exercise.guidance, exercise.hints),
      ...(exercise.mode === "script"
        ? {
            sampleCasesText: exercise.tests
              .filter((test) => !test.hidden)
              .slice(0, 4)
              .map((test, index) =>
                `Case ${index + 1}: stdin=${JSON.stringify(test.input)} expected stdout=${JSON.stringify(test.expectedOutput)}`,
              )
              .join("\n"),
          }
        : {
            signature: exercise.signature,
            visibleTests: exercise.tests.filter((test) => !test.hidden),
          }),
      hiddenTestCount: exercise.tests.length - visibleTestCount,
    };

    const usage = await reserveAiGuidanceUsage(user.id);
    let guidance: string;
    try {
      guidance = await requestAiGuidance({
        client: new Anthropic({ apiKey }),
        model: process.env.AI_GUIDANCE_MODEL ?? DEFAULT_AI_GUIDANCE_MODEL,
        problem,
        language: course.language,
        code: body.code,
        mode: body.mode,
        latestOutcome: body.latestOutcome ?? null,
        runError: body.runError ?? null,
      });
    } catch (err) {
      await refundAiGuidanceUsage(user.id, usage).catch((refundErr) => {
        console.error("Failed to refund AI guidance quota:", refundErr);
      });
      throw err;
    }

    return NextResponse.json({ guidance, usage: aiGuidanceUsageResponse(usage) });
  } catch (err) {
    return toErrorResponse(err);
  }
}
