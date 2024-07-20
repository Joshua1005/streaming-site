"use client";

import { signUp } from "@/actions/auth";
import { signUpSchema } from "@/lib/zod";
import { useMutation } from "@tanstack/react-query";

function useSignUp(cb: () => void) {
  const { mutate, status, data, error } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (values: Zod.infer<typeof signUpSchema>) =>
      await signUp(values),
    onSuccess: cb,
  });

  return { mutate, status, data, error };
}

export { useSignUp };
