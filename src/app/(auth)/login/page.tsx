import { z } from "zod";
import { useForm } from "react-hook-form";

import Image from "next/image";
import Link from "next/link";

import LoginForm from "@/components/shared/login-form";

export default function LoginPage() {
  const formSchema = z.object({
    email_or_number: z.string().trim().min(2).max(50),
    password: z.string().min(2).max(50),
  });
  return (
    <div className="h-screen overflow-y-scroll w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <LoginForm />
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="https://res.cloudinary.com/dj753bxhx/image/upload/v1724868172/txclxlhg6dujojtbigfh.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
