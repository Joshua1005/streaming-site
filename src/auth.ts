import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "./lib/db";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  events: {
    signIn: async ({ isNewUser, user, account }) => {
      const { email } = user;

      if (!email) throw new Error("Email is not defined.");

      if (!account) throw new Error("Account is not defined.");

      if (!isNewUser) return;

      switch (account.provider) {
        case "google":
          await db.user.update({
            where: { email },
            data: { emailVerified: new Date() },
          });
          break;
        case "credentials":
          break;
        default:
          break;
        // Todo: Send an email if the ip address is new.
      }
    },
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      if (!account) return false;
      const { provider } = account;
      const { emailVerified, email } = user;

      if (!email) return false;

      switch (provider) {
        case "credentials":
          if (!emailVerified)
            throw new Error(
              "Email is not yet verified. Kindly check email to verify."
            );

          return true;
        case "google":
          return true;
        default:
          throw new Error("Unhandled provider.");
      }
    },
  },
  pages: {
    signIn: "./signin",
  },
  ...authConfig,
});
