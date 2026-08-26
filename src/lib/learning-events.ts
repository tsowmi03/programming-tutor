import { prisma } from "./prisma";
import type { LearningEventName } from "./learning-event-types";

interface LearningEventInput {
  eventName: LearningEventName;
  courseSlug?: string;
  lessonSlug?: string;
  activityId?: string;
  properties?: Record<string, string | number | boolean | null>;
}

function eventData(userId: string, input: LearningEventInput) {
  return {
    userId,
    eventName: input.eventName,
    courseSlug: input.courseSlug,
    lessonSlug: input.lessonSlug,
    activityId: input.activityId,
    properties: JSON.stringify(input.properties ?? {}),
  };
}

/** Analytics must never block the learning action it measures. */
export async function recordLearningEvent(
  userId: string,
  input: LearningEventInput,
): Promise<void> {
  try {
    await prisma.learningEvent.create({ data: eventData(userId, input) });
  } catch (error) {
    console.error("Learning event recording failed:", error);
  }
}

export async function recordLearningEventOnce(
  userId: string,
  input: LearningEventInput,
): Promise<void> {
  try {
    const existing = await prisma.learningEvent.findFirst({
      where: {
        userId,
        eventName: input.eventName,
        courseSlug: input.courseSlug,
        lessonSlug: input.lessonSlug,
        activityId: input.activityId,
      },
      select: { id: true },
    });
    if (!existing) {
      await prisma.learningEvent.create({ data: eventData(userId, input) });
    }
  } catch (error) {
    console.error("Learning event recording failed:", error);
  }
}
