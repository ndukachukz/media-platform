import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { UserValidator } from "@/lib/validations/validators";
import { registerFormSchema } from "@/lib/validations/auth.schemas";
import { EMAIL_REGEX, PHONE_REGEX } from "@/constants";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = registerFormSchema.parse(body);

    const existingUser = await prisma.profile.findUnique({
      where: {
        email_or_phone: validatedData.email_or_phone,
      },
    });

    if (existingUser)
      NextResponse.json(
        JSON.stringify({
          error: "User with this email or phone already exists",
        }),
        { status: 400 }
      );

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(validatedData.password, salt);

    const user = await prisma.user.create({
      data: {
        role: "USER",
        password: hash,
        profile: {
          create: {
            first_name: validatedData.first_name,
            last_name: validatedData.last_name,
            email_or_phone: validatedData.email_or_phone,
          },
        },
      },
      include: { profile: true },
    });

    const userErrors = UserValidator({
      email_or_phone: validatedData.email_or_phone,
      first_name: validatedData.first_name,
      last_name: validatedData.last_name,
      password: validatedData.password,
      confirm_password: validatedData.confirm_password,
      terms: validatedData.terms,
    });

    if (userErrors.length > 0) {
      return NextResponse.json({ errors: userErrors }, { status: 400 });
    }

    delete (user as { password?: string }).password;

    if (!user.profile?.email_verified) {
      if (EMAIL_REGEX.test(validatedData.email_or_phone)) {
        const response = await fetch(
          "http://localhost:3000/api/send-email-otp",
          {
            method: "POST",
            body: JSON.stringify({
              recipient: validatedData.email_or_phone,
              subject: "Email Verification OTP",
            }),
          }
        );

        console.log("REG EMAIL REPONSE => ", await response.json());
      } else if (PHONE_REGEX.test(validatedData.email_or_phone)) {
        await fetch("http://localhost:3000/api/send-phone-otp", {
          method: "POST",
          body: JSON.stringify({
            recipient: validatedData.email_or_phone,
            subject: "Verification OTP",
          }),
        });
      }
    }
    return NextResponse.json({ user: JSON.stringify(user) }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
