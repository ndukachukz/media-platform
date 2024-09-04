"use server";
import { signIn } from "@/auth";
import { ErrorCode, Exception } from "@/lib/errorException";
import { PasswordFunctions } from "@/lib/utils";

export const handleGoogleSignIn = async () => {
  try {
    await signIn("google");
    return JSON.parse(JSON.stringify(null));
  } catch (error) {
    console.error(error);
  }
};
