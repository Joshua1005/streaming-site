import { CredentialsSignin, NextAuthConfig, DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";
import db from "./lib/db";
import bcryptjs from "bcryptjs";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      emailVerified: Date | null;
      email: string;
      name: string;
      password?: string | null;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}

export default {
  providers: [
    GoogleProvider,
    CredentialsProvider({
      authorize: async (values: Partial<Zod.infer<typeof signInSchema>>) => {
        try {
          const { success, error, data } = signInSchema.safeParse(values);

          if (!success) throw new CredentialsSignin(error.issues[0].message);

          const { email, password } = data;

          const foundUser = await db.user.findUnique({
            where: { email },
            include: {
              accounts: {
                select: {
                  provider: true,
                },
              },
            },
          });

          if (!foundUser)
            throw new CredentialsSignin("Email is not yet registered.");

          if (!foundUser.password)
            throw new CredentialsSignin(
              `User is using ${foundUser.accounts[0].provider} as a log in method.`
            );

          const matchedPassword = await bcryptjs.compare(
            password,
            foundUser.password
          );

          if (!matchedPassword)
            throw new CredentialsSignin("Invalid credentials.");

          const { accounts, password: _, ...user } = foundUser;

          return user;
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
