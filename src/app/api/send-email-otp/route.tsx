import { NextRequest, NextResponse } from "next/server";
import EmailOTPTemplate from "@/lib/emails/email-otp";
import { render } from "@react-email/render";
import { handleEmailFire } from "@/lib/nodemailer";
import { sendEmailSchema } from "@/lib/validations/auth.schemas";
import { SendEmailValidator } from "@/lib/validations/validators";

export async function POST(req: NextRequest, res: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = sendEmailSchema.parse(body);

    const errors = SendEmailValidator({
      recipient: validatedData.recipient,
    });

    if (errors.length > 0) {
      return NextResponse.json({ errors: errors }, { status: 400 });
    }

    const response = await fetch("http://localhost:3000/api/generate-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipient: validatedData.recipient, length: 4 }),
    });

    if (!response.ok) {
      console.log("GENERATE OTP OK => ", await response.json());
      const errorMessage = await response.text();
      return NextResponse.json(
        { error: `Failed to generate OTP: ${errorMessage}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (data) {
      console.log("GEN OTP DATA => ", data);
    }

    await handleEmailFire({
      recipient: validatedData.recipient,
      subject: "Email OTP Validation",
      html: await render(
        <EmailOTPTemplate otpCode={data.otp} user={validatedData.recipient} />
      ),
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
