import { prisma } from "@/lib/prisma";

export function POST(req: Request, res: Response) {
  try {
    const posts = prisma.post.findMany();
    return Response.json({ posts }, { status: 200 });
  } catch (error) {
    return Response.json({ error });
  }
}
