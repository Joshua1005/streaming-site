import { CredentialsSignin, NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";
import db from "./lib/db";
import bcryptjs from "bcryptjs";

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
