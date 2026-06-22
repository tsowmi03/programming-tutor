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
import { normalizeGuidance } from "@/lib/guidance";
import { courseAiGuidanceRequestSchema } from "@/lib/validation";

export const maxDuration = 30;

/** Runtime AI guidance for one course exercise attempt. */
export async function POST(req: Request) {
  try {
    await requireUser();
    const body = courseAiGuidanceRequestSchema.parse(await req.json());

    const course = getCourse(body.courseSlug);
    if (!course) throw new NotFoundError(`No course named "${body.courseSlug}"`);

    const lesson = getLesson(course, body.lessonSlug);
    if (!lesson) throw new NotFoundError("Lesson not found");

    const exercise = getExercise(course, body.lessonSlug, body.exerciseId);
    if (!exercise) throw new NotFoundError("Exercise not found");

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI guidance is not configured. Set ANTHROPIC_API_KEY." },
        { status: 503 },
      );
    }

    const visibleTests = exercise.tests.filter((test) => !test.hidden);
    const problem: AiGuidanceProblemContext = {
      title: exercise.title,
      difficulty: "course exercise",
      category: course.title,
      description: `Course: ${course.title}
Lesson: ${lesson.title}

${exercise.prompt}`,
      guidance: normalizeGuidance(exercise.guidance, exercise.hints),
      signature: exercise.signature,
      visibleTests,
      hiddenTestCount: exercise.tests.length - visibleTests.length,
    };

    const guidance = await requestAiGuidance({
      client: new Anthropic({ apiKey }),
      model: process.env.AI_GUIDANCE_MODEL ?? DEFAULT_AI_GUIDANCE_MODEL,
      problem,
      language: course.language,
      code: body.code,
      mode: body.mode,
      latestOutcome: body.latestOutcome ?? null,
      runError: body.runError ?? null,
    });

    return NextResponse.json({ guidance });
  } catch (err) {
    return toErrorResponse(err);
  }
}
