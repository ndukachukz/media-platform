import { prisma } from "@/lib/prisma";
import { ProfileValidator } from "@/lib/validations/validators";
import { profileCreateSchema } from "@/types/user.type";

export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();
    const validatedData = profileCreateSchema.parse(body);

    const profile = await prisma.profile.update({
      where: { user_id: body.userId },
      data: {
        ...validatedData,
        user: {
          update: {
            role: validatedData.role,
          },
        },
      },
      include: { user: true },
    });

    const postValidatorErrors = ProfileValidator(validatedData);

    if (postValidatorErrors.length > 0) {
      return Response.json({ errors: postValidatorErrors }, { status: 400 });
    }

    return Response.json({ profile }, { status: 201 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
