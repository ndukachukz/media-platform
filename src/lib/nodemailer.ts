import nodemailer from "nodemailer";
import { env } from "@/env";

export type Payload = {
  recipient: string;
  subject: string;
  html: string;
};

const smtpConfig = {
  service: "gmail",
  host: env.SMTP_HOST,
  port: parseInt(env.SMTP_PORT),
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
};

export const handleEmailFire = async (data: Payload) => {
  const transporter = nodemailer.createTransport({
    ...smtpConfig,
  });

  return await transporter.sendMail({
    from: env.SMTP_FROM,
    ...data,
  });
};
