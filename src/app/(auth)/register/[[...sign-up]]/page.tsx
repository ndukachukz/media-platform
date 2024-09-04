import { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Register | Nairaland Media Platform",
};

export default function RegisterPage() {
  return (
    <div className="h-screen grid justify-center items-center pt-10 mb-10">
      <SignUp
        signInUrl="/login"
        fallbackRedirectUrl={"/onboarding"}
        forceRedirectUrl={"/onboarding"}
      />
    </div>
  );
}
