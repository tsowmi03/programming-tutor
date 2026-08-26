import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { toErrorResponse } from "@/lib/api";
import { clientLearningEventSchema } from "@/lib/validation";
import { recordLearningEvent } from "@/lib/learning-events";

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const event = clientLearningEventSchema.parse(await req.json());
    await recordLearningEvent(user.id, event);
    return NextResponse.json({ recorded: true });
  } catch (error) {
    return toErrorResponse(error);
  }
}
