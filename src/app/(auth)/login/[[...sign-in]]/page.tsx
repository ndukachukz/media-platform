import { Metadata } from "next";
import Image from "next/image";
import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login | Media Platform",
  description:
    "Log in to your account on the media platform, access exclusive content, and share your creations with the world.",
  openGraph: {
    type: "website",
    url: "https://media-platform.com/login",
    title: "Login | Media Platform",
    description:
      "Log in to your account on the media platform, access exclusive content, and share your creations with the world.",
    images: [
      {
        url: "https://res.cloudinary.com/dj753bxhx/image/upload/v1724868172/txclxlhg6dujojtbigfh.svg",
        width: 1200,
        height: 630,
        alt: "Login Image",
      },
    ],
  },
  twitter: {
    title: "Login | Nairaland Media Platform",
  },
};

export default async function LoginPage() {
  const { userId } = auth();

  if (userId) return redirect("/dashboard");

  return (
    <div className="h-screen overflow-y-scroll w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12 mx-auto">
        <SignIn signUpUrl="/register" />
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="https://res.cloudinary.com/dj753bxhx/image/upload/v1724868172/txclxlhg6dujojtbigfh.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          priority
        />
      </div>
    </div>
  );
}
