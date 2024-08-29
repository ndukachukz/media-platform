import { EMAIL_PHONE_REGEX } from "@/constants";
import { z } from "zod";

export const email_or_number = z
  .string()
  .trim()
  .refine((val): val is string => EMAIL_PHONE_REGEX.test(val), {
    message: "Must be a valid email or phone number",
  });
export const password = z.string().min(8);

export const registerFormSchema = z
  .object({
    first_name: z.string().trim().min(1),
    last_name: z.string().trim().min(1),
    email_or_number,
    password,
    confirm_password: password,
    terms: z.boolean().default(false),
  })
  .refine((data) => data.password === data.confirm_password);

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;

export const loginFormSchema = z.object({
  email_or_number,
  password,
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
