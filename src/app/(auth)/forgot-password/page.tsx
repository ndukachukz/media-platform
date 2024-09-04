import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ForgotPasswordForm from "@/components/shared/forgot-password-form";

export default function ForgotPassword() {
  return (
    <div className="h-screen grid justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your information to receive a password reset link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
          <div className="mt-4 text-center text-sm">
            <Link href="/login" className="underline">
              go back
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
