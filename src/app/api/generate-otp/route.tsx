import { NextRequest, NextResponse } from "next/server";
import { generateOTPSchema } from "@/lib/validations/auth.schemas";
import { GenerateOTPValidator } from "@/lib/validations/validators";
import { prisma } from "@/lib/prisma";
import { generateOTP } from "@/lib/utils";
import { tokenExpires } from "@/constants";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const validatedData = generateOTPSchema.parse(body);

    const errors = GenerateOTPValidator({
      length: validatedData.length,
      recipient: validatedData.recipient,
    });

    if (errors.length > 0) {
      return NextResponse.json({ errors: errors }, { status: 400 });
    }

    const userQuery = await prisma.profile.findFirst({
      where: { email_or_phone: validatedData.recipient, email_verified: null },
    });

    const otp = generateOTP();

    if (!userQuery) {
      throw NextResponse.json({ errors: "user not found" }, { status: 404 });
    }

    const verificationToken = prisma.verificationToken.create({
      data: {
        expires: tokenExpires,
        identifier: userQuery?.id,
        token: otp,
      },
    });

    console.log("GEN OTP => ", otp);

    return NextResponse.json(
      { message: "Success", user: userQuery, otp: verificationToken },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "send email otp error", error },
      { status: 500 }
    );
  }
}
