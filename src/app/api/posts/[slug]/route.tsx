import { ErrorCode, Exception } from "@/lib/errorException";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { slug } }: { params: { slug: string } }
) {
  try {
    if (!slug) {
      throw new Exception(ErrorCode.BadRequest);
    }

    const post = await prisma.post.findFirst({
      where: { slug },
    });

    if (!post) {
      throw new Exception(ErrorCode.NotFound, { message: "post not found" });
    }

    return Response.json({ post }, { status: 200 });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: error.code });
  }
}
