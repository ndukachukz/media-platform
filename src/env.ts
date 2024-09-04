import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DB_URL: z.string().url(),
    DB_HOST: z.string(),
    DB_PORT: z.string(),
    DIRECT_NEON_DATABASE_URL: z.string().url(),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_SSL_MODE: z.string(),
    DB_NAME: z.string(),
    DATABASE_URL: z.string().url(),
    PULSE_API_KEY: z.string(),
    SMTP_PASSWORD: z.string().min(1),
    SMTP_FROM: z.string().min(1),
    SMTP_HOST: z.string().min(1),
    SMTP_PORT: z.string().min(1),
    SMTP_USER: z.string().min(1),
    AUTH_RESEND_KEY: z.string().min(5),
    CLERK_SECRET_KEY: z.string(),
  },
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY: z.string(),
    NEXT_PUBLIC_SUPABASE_JWT_SECRET: z.string(),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  runtimeEnv: {
    DB_URL: process.env.DB_URL,
    DB_HOST: process.env.DB_HOST,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_SSL_MODE: process.env.DB_SSL_MODE,
    DIRECT_NEON_DATABASE_URL: process.env.DIRECT_NEON_DATABASE_URL,
    DB_NAME: process.env.DB_NAME,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY,
    NEXT_PUBLIC_SUPABASE_JWT_SECRET:
      process.env.NEXT_PUBLIC_SUPABASE_JWT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    PULSE_API_KEY: process.env.PULSE_API_KEY,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_FROM: process.env.SMTP_FROM,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    AUTH_RESEND_KEY: process.env.AUTH_RESEND_KEY,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  // experimental__runtimeEnv: {
  //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  // }
});
