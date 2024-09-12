import { prisma } from "@/lib/prisma";

export async function GET(req: Request, res: Response) {
  try {
    const posts = await prisma.post.findMany({
      include: { tags: true, creator: { include: { profile: true } } },
    });
    return Response.json({ posts }, { status: 200 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
