import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";
import { db } from "./lib/db";

export const { auth, handlers, signIn, signOut } = NextAuth({
  trustHost:true,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }) {
    //  console.log("signIn");
      return true;
    },
    async session({ token, session }) {
     // console.log("session",session,token);
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      return session;
    },
    async jwt({ token, user, profile }) {
     // console.log('jwt',{token});
      
      if (!token.sub) {
        return token;
      }

      const exsitingUser = await getUserById((token.sub));

      if (!exsitingUser) {
        return token;
      }

      token.name = exsitingUser.name;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
