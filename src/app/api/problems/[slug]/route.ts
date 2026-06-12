import { NextResponse } from "next/server";
import { getProblemDetail } from "@/lib/problems";
import { requireUser } from "@/lib/auth";
import { NotFoundError, toErrorResponse } from "@/lib/api";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const user = await requireUser();
    const { slug } = await params;
    const problem = await getProblemDetail(slug, user.id);
    if (!problem) throw new NotFoundError(`No problem named "${slug}"`);
    return NextResponse.json({ problem });
  } catch (err) {
    return toErrorResponse(err);
  }
}
