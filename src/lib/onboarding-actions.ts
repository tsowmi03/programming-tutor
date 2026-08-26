"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireUserPage } from "./auth";
import { experiencedStartPath } from "./auth-utils";
import { prisma } from "./prisma";
import { onboardingSchema } from "./validation";
import { recordLearningEvent } from "./learning-events";

export async function completeOnboarding(formData: FormData): Promise<void> {
  const user = await requireUserPage();
  const parsed = onboardingSchema.safeParse({
    experience: formData.get("experience"),
  });
  if (!parsed.success) redirect("/onboarding");

  await prisma.user.update({
    where: { id: user.id },
    data: {
      programmingExperience: parsed.data.experience,
      onboardingCompletedAt: new Date(),
    },
  });
  await recordLearningEvent(user.id, {
    eventName: "onboarding_completed",
    properties: { experience: parsed.data.experience },
  });
  revalidatePath("/", "layout");

  if (parsed.data.experience === "beginner") {
    redirect("/courses/programming-foundations-python");
  }

  redirect(experiencedStartPath(formData.get("next")));
}
