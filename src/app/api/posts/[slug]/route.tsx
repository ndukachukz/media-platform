import { ErrorCode, Exception } from "@/lib/errorException";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;

    const slug = params.get("slug");
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
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
