"use server";

import db from "@/lib/db";
import bcryptjs from "bcryptjs";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { signInSchema, signUpSchema } from "@/lib/zod";

async function signUp(values: Zod.infer<typeof signUpSchema>) {
  try {
    const { success, error, data } = signUpSchema.safeParse(values);

    if (!success) throw new Error(error.issues[0].message);

    const { name, email, password } = data;

    const foundEmail = await db.user.findUnique({
      where: { email },
      select: { email: true },
    });

    if (foundEmail) throw new Error("Email is already registered.");

    const hashedPassword = await bcryptjs.hash(password, 10);

    const { id: userId } = await db.user.create({
      data: { name, email, password: hashedPassword },
      select: { id: true },
    });

    await db.account.create({
      data: {
        userId,
        provider: "credentials",
        type: "credentials",
        providerAccountId: userId,
      },
    });

    return { message: "You have successfully created an account." };
  } catch (error) {
    throw error;
  }
}

async function credentialsSignIn(values: Zod.infer<typeof signInSchema>) {
  try {
    const { success, error, data } = signInSchema.safeParse(values);

    if (!success) throw new Error(error.issues[0].message);

    const { email, password } = data;

    await signIn("credentials", {
      email,
      password,
      redirect: true,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      console.log({ message: error.message });
      const errorToThrow =
        error.cause?.err?.message ||
        "Something went wrong. Please try again later.";

      switch (error.type) {
        case "CallbackRouteError":
          throw new Error(errorToThrow);
        case "AccessDenied":
          throw new Error(errorToThrow);
        default:
          throw new Error("Unhandled error type.");
      }
    }
    throw error;
  }
}

export { signUp, credentialsSignIn };
