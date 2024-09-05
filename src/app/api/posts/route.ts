import { prisma } from "@/lib/prisma";

export async function GET(req: Request, res: Response) {
  try {
    const posts = await prisma.post.findMany();
    console.log({ posts });
    return Response.json({ posts }, { status: 200 });
  } catch (error) {
    return Response.json({ error });
  }
}
