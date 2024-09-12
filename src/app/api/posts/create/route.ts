import { prisma } from "@/lib/prisma";
import { createPostFormSchema } from "@/lib/validations/post.schemas";
import { CreatePostValidator } from "@/lib/validations/validators";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request, res: Response) {
  try {
    const { userId } = auth();
    if (!userId) return Response.redirect("/login", 401);

    const body = await req.json();
    const validatedData = createPostFormSchema.parse(body);

    console.log("user => ", userId);
    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const post = await prisma.post.create({
      data: {
        title: validatedData.title,
        content: validatedData.content,
        images: validatedData.images,
        creator: { connect: { id: userId } },
        tags: { create: validatedData.tags.map((tag) => ({ name: tag })) },
        slug: validatedData.slug.replace(" ", "-"),
      },
    });

    const postValidatorErrors = CreatePostValidator(validatedData);

    if (postValidatorErrors.length > 0) {
      return Response.json({ errors: postValidatorErrors }, { status: 400 });
    }

    return Response.json({ post }, { status: 201 });
  } catch (error) {
    console.log("ERROR Creating post => ", error);
    return Response.json({ error }, { status: 500 });
  }
}
