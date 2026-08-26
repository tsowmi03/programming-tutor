import { prisma } from "../src/lib/prisma";

const FUNNEL_EVENTS = [
  "onboarding_completed",
  "course_overview_viewed",
  "lesson_started",
  "program_checked",
  "first_program_passed",
  "lesson_mastered",
  "checkpoint_submitted",
] as const;

async function main() {
  const beginnerUsers = await prisma.user.findMany({
    where: { programmingExperience: "beginner" },
    select: { id: true },
  });
  const userIds = beginnerUsers.map((user) => user.id);
  const events = await prisma.learningEvent.findMany({
    where: {
      userId: { in: userIds },
      eventName: { in: [...FUNNEL_EVENTS] },
    },
    select: { userId: true, eventName: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  const cohortSize = beginnerUsers.length;
  console.log("Beginner activation funnel");
  console.log(`Cohort: ${cohortSize} learners who selected completely new`);
  for (const eventName of FUNNEL_EVENTS) {
    const learners = new Set(
      events
        .filter((event) => event.eventName === eventName)
        .map((event) => event.userId),
    ).size;
    const rate = cohortSize === 0 ? 0 : Math.round((learners / cohortSize) * 100);
    console.log(`${eventName.padEnd(28)} ${String(learners).padStart(4)}  ${String(rate).padStart(3)}%`);
  }

  const onboardingByUser = new Map<string, Date>();
  const activationByUser = new Map<string, Date>();
  for (const event of events) {
    if (event.eventName === "onboarding_completed" && !onboardingByUser.has(event.userId)) {
      onboardingByUser.set(event.userId, event.createdAt);
    }
    if (event.eventName === "first_program_passed" && !activationByUser.has(event.userId)) {
      activationByUser.set(event.userId, event.createdAt);
    }
  }
  const activationMinutes = [...activationByUser].flatMap(([userId, activatedAt]) => {
    const startedAt = onboardingByUser.get(userId);
    return startedAt
      ? [(activatedAt.getTime() - startedAt.getTime()) / 60_000]
      : [];
  });
  if (activationMinutes.length > 0) {
    const average = activationMinutes.reduce((sum, value) => sum + value, 0) / activationMinutes.length;
    console.log(`Average onboarding → first program passed: ${average.toFixed(1)} minutes`);
  } else {
    console.log("Average onboarding → first program passed: no completed activations yet");
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
