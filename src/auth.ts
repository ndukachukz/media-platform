import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Resend from "next-auth/providers/resend";

import { env } from "./env";
import { prisma } from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  providers: [
    Resend,
    Google({
      profile(profile) {
        return { role: profile.role ?? "user" };
      },
    }),
    Credentials({
      credentials: {
        email_or_phone: {},
        password: {},
      },
      async authorize(credentials) {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          body: JSON.stringify(credentials),
        });

        return await res.json();
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, user, token }) {
      session.user.role = token.role as any;
      return session;
    },
    redirect() {
      return "/login";
    },
  },
});
