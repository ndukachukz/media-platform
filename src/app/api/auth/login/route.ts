import { ErrorCode, Exception } from "@/lib/errorException";
import { prisma } from "@/lib/prisma";
import { loginFormSchema } from "@/lib/validations/auth.schemas";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = loginFormSchema.parse(body);

    const userQuery = prisma.profile.findUnique({
      where: {
        email_or_phone: validatedData.email_or_phone,
      },
    });

    if (!userQuery) new Exception(ErrorCode.BadRequest);

    const hash = await prisma.user.findFirst({
      where: {
        password: "validatedData.password",
      },
    });

    if (!hash || !hash.password) new Exception(ErrorCode.BadRequest);

    const compared = bcrypt.compare("validatedData.password", hash!.password);

    if (!compared) new Exception(ErrorCode.BadRequest);

    return NextResponse.json({ user: userQuery }, { status: 200 });
  } catch (error) {}
}
