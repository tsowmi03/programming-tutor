import { NextResponse } from "next/server";
import { getProblemRecord } from "@/lib/problems";
import { NotFoundError, toErrorResponse } from "@/lib/api";

/**
 * Reference solutions / model answers are fetched on demand (when the user
 * opens the Solution tab) rather than shipped with the problem payload, so
 * the answer isn't sitting in the network response before they've tried.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const record = await getProblemRecord(slug);
    if (!record) throw new NotFoundError(`No problem named "${slug}"`);

    if (record.type === "code") {
      return NextResponse.json({
        solutions: record.solutions ? JSON.parse(record.solutions) : null,
        editorial: record.editorial,
      });
    }
    return NextResponse.json({
      modelAnswer: record.modelAnswer,
      keyPoints: record.keyPoints ? JSON.parse(record.keyPoints) : [],
    });
  } catch (err) {
    return toErrorResponse(err);
  }
}
