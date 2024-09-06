import { EMAIL_PHONE_REGEX } from "@/constants";
import { UserRole } from "@prisma/client";
import { z } from "zod";

export const email_or_phone = z
  .string()
  .trim()
  .refine((val): val is string => EMAIL_PHONE_REGEX.test(val), {
    message: "Must be a valid email or phone number",
  });

export const password = z.string().trim().min(8);

export const registerFormSchema = z
  .object({
    first_name: z.string().trim().min(1),
    last_name: z.string().trim().min(1),
    email_or_phone,
    password,
    confirm_password: password,
    terms: z.boolean(),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords must match",
  });

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;

export const sendEmailSchema = z.object({
  recipient: z.string().trim().min(1),
});

export type SendEmailSchema = z.infer<typeof sendEmailSchema>;

export const generateOTPSchema = z.object({
  recipient: z.string().trim().min(1),
  length: z.number(),
});

export type GenerateOTPSchema = z.infer<typeof generateOTPSchema>;

export const loginFormSchema = z.object({
  email_or_phone,
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

export const forgotPasswordFormSchema = z.object({
  email_or_phone,
});

export type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordFormSchema>;
