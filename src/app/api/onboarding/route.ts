import { prisma } from "@/lib/prisma";
import { createPostFormSchema } from "@/lib/validations/post.schemas";

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const validatedData = createPostFormSchema.parse(body);

    const post = prisma.post.create({
      data: {
        ...validatedData,
        tags: { create: validatedData.tags },
        creator: { connect: { id: body.user_id } },
      },
    });

    return Response.json({ post }, { status: 201 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
