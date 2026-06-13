import { NextResponse } from "next/server";
import { setLessonCompletion } from "@/lib/courses";
import { getCourse, getLesson } from "@/content/courses";
import { lessonProgressSchema } from "@/lib/validation";
import { requireUser } from "@/lib/auth";
import { NotFoundError, toErrorResponse } from "@/lib/api";

/** Mark a lesson complete or incomplete for the current user. */
export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const { courseSlug, lessonSlug, completed } = lessonProgressSchema.parse(
      await req.json(),
    );

    const course = getCourse(courseSlug);
    if (!course || !getLesson(course, lessonSlug)) {
      throw new NotFoundError("Lesson not found");
    }

    await setLessonCompletion(user.id, courseSlug, lessonSlug, completed);
    return NextResponse.json({ completed });
  } catch (err) {
    return toErrorResponse(err);
  }
}
