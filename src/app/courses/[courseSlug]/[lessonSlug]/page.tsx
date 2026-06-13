import { notFound } from "next/navigation";
import { getLessonView } from "@/lib/courses";
import { getCourse, getLesson } from "@/content/courses";
import { requireUserPage } from "@/lib/auth";
import { LessonView } from "@/components/courses/LessonView";
import type { ClientBlock } from "@/components/courses/types";
import type { LessonBlock } from "@/content/courses";

export const dynamic = "force-dynamic";

/** Strip hidden test expectations before sending an exercise to the client. */
function toClientBlocks(blocks: LessonBlock[]): ClientBlock[] {
  return blocks.map((block) => {
    if (block.kind === "prose") {
      return { kind: "prose", markdown: block.markdown };
    }
    const ex = block.exercise;
    return {
      kind: "exercise",
      exercise: {
        id: ex.id,
        title: ex.title,
        prompt: ex.prompt,
        signature: ex.signature,
        visibleTests: ex.tests.filter((t) => !t.hidden),
        hiddenTestCount: ex.tests.filter((t) => t.hidden).length,
        starterCode: ex.starterCode,
        solution: ex.solution,
        hints: ex.hints,
      },
    };
  });
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
}) {
  const user = await requireUserPage();
  const { courseSlug, lessonSlug } = await params;
  const view = await getLessonView(courseSlug, lessonSlug, user.id);
  if (!view) notFound();

  const { course, lesson, completed, prevSlug, nextSlug, position, total } =
    view;

  // Locate the module title for the breadcrumb.
  const moduleTitle =
    course.modules.find((m) => m.lessons.some((l) => l.slug === lesson.slug))
      ?.title ?? course.title;

  return (
    <LessonView
      courseSlug={course.slug}
      courseTitle={course.title}
      language={course.language}
      lessonSlug={lesson.slug}
      lessonTitle={lesson.title}
      moduleTitle={moduleTitle}
      blocks={toClientBlocks(lesson.blocks)}
      initialCompleted={completed}
      prevSlug={prevSlug}
      nextSlug={nextSlug}
      position={position}
      total={total}
    />
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
}) {
  const { courseSlug, lessonSlug } = await params;
  const course = getCourse(courseSlug);
  const lesson = course ? getLesson(course, lessonSlug) : undefined;
  return { title: lesson?.title ?? "Lesson" };
}
