"use client";

import { credentialsSignIn } from "@/actions/auth";
import { signInSchema } from "@/lib/zod";
import { useMutation } from "@tanstack/react-query";

function useSignIn() {
  const { mutate, status, error } = useMutation({
    mutationKey: ["signin"],
    mutationFn: async (values: Zod.infer<typeof signInSchema>) =>
      await credentialsSignIn(values),
  });

  return { mutate, status, error };
}

export { useSignIn };
