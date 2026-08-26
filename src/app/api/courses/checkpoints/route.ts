import { NextResponse } from "next/server";
import { getCourse, getModule } from "@/content/courses";
import { answerIsAccepted, getCourseMasterySnapshot } from "@/lib/course-mastery";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NotFoundError, toErrorResponse } from "@/lib/api";
import { courseCheckpointSubmitSchema } from "@/lib/validation";
import { recordLearningEvent } from "@/lib/learning-events";

function buildForm(
  courseModule: NonNullable<ReturnType<typeof getModule>>,
  attemptNumber: number,
) {
  const checkpoint = courseModule.checkpoint;
  if (!checkpoint) throw new NotFoundError("Checkpoint not found");
  const questions = checkpoint.slots.map((slot, slotIndex) => {
    const variant =
      slot.variants[(attemptNumber - 1 + slotIndex) % slot.variants.length];
    return {
      objectiveId: slot.objectiveId,
      format: slot.format,
      prompt: variant.prompt,
      choices: variant.choices,
      variantId: variant.id,
    };
  });
  return {
    checkpoint,
    questions,
    formId: questions.map((question) => question.variantId).join("."),
  };
}

async function resolveContext(userId: string, courseSlug: string, moduleSlug: string) {
  const course = getCourse(courseSlug);
  if (!course) throw new NotFoundError("Course not found");
  const courseModule = getModule(course, moduleSlug);
  if (!courseModule?.checkpoint) throw new NotFoundError("Checkpoint not found");
  const mastery = await getCourseMasterySnapshot(userId, course);
  const state = mastery.modules.find((item) => item.slug === moduleSlug);
  if (!state) throw new NotFoundError("Module not found");
  return { course, courseModule, state };
}

export async function GET(req: Request) {
  try {
    const user = await requireUser();
    const url = new URL(req.url);
    const courseSlug = url.searchParams.get("courseSlug") ?? "";
    const moduleSlug = url.searchParams.get("moduleSlug") ?? "";
    const { courseModule, state } = await resolveContext(
      user.id,
      courseSlug,
      moduleSlug,
    );
    if (!state.checkpointUnlocked) {
      return NextResponse.json({ error: "Complete the module lessons first." }, { status: 409 });
    }
    if (!state.remediationComplete) {
      return NextResponse.json(
        {
          error: "Complete the assigned review activities before retrying.",
          remediationObjectiveIds: state.remediationObjectiveIds,
        },
        { status: 409 },
      );
    }
    const form = buildForm(courseModule, state.attempts + 1);
    return NextResponse.json({
      checkpointId: form.checkpoint.id,
      title: form.checkpoint.title,
      passingScore: form.checkpoint.passingScore,
      attemptNumber: state.attempts + 1,
      questions: form.questions,
    });
  } catch (err) {
    return toErrorResponse(err);
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const body = courseCheckpointSubmitSchema.parse(await req.json());
    const { course, courseModule, state } = await resolveContext(
      user.id,
      body.courseSlug,
      body.moduleSlug,
    );
    if (!state.checkpointUnlocked || !state.remediationComplete) {
      return NextResponse.json({ error: "Checkpoint is not available." }, { status: 409 });
    }
    if (state.checkpointPassed) {
      return NextResponse.json({ error: "This checkpoint is already mastered." }, { status: 409 });
    }

    const attemptNumber = state.attempts + 1;
    const form = buildForm(courseModule, attemptNumber);
    let score = 0;
    const missedObjectiveIds: string[] = [];
    const results = form.questions.map((question, index) => {
      const slot = form.checkpoint.slots[index];
      const variant = slot.variants.find(
        (item) => item.id === question.variantId,
      )!;
      const correct = answerIsAccepted(
        body.answers[question.objectiveId] ?? "",
        variant.acceptedAnswers,
      );
      if (correct) score += 1;
      else missedObjectiveIds.push(question.objectiveId);
      return {
        objectiveId: question.objectiveId,
        correct,
        explanation: variant.explanation,
        remediationLessonSlug: slot.remediationLessonSlug,
      };
    });
    const passed = score >= form.checkpoint.passingScore;
    await prisma.courseCheckpointAttempt.create({
      data: {
        userId: user.id,
        courseSlug: course.slug,
        moduleSlug: courseModule.slug,
        checkpointId: form.checkpoint.id,
        attemptNumber,
        formId: form.formId,
        answers: JSON.stringify(body.answers),
        score,
        maxScore: form.questions.length,
        passed,
        missedObjectiveIds: JSON.stringify(missedObjectiveIds),
      },
    });
    await recordLearningEvent(user.id, {
      eventName: "checkpoint_submitted",
      courseSlug: course.slug,
      properties: {
        moduleSlug: courseModule.slug,
        score,
        maxScore: form.questions.length,
        passed,
        attemptNumber,
      },
    });
    return NextResponse.json({
      score,
      maxScore: form.questions.length,
      passed,
      results,
    });
  } catch (err) {
    return toErrorResponse(err);
  }
}
