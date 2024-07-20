"use client";

import { signInSchema, signUpSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FormFieldWrapper } from "@/components/wrapper/formfield-wrapper";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { AuthMessage } from "./auth-message";
import { useSignIn } from "@/hooks/use-signin";

function SignInForm() {
  const { mutate, status, error } = useSignIn();
  const form = useForm<Zod.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => mutate(values))}
        className={"grid gap-2"}
      >
        <FormFieldWrapper
          control={form.control}
          name={"email"}
          type={"email"}
          placeholder={"foobar@example.com"}
        />
        <FormFieldWrapper
          control={form.control}
          name={"password"}
          type={"password"}
        />
        <AuthMessage status={status} message={error?.message} />
        <Button disabled={status === "pending"} type={"submit"}>
          Continue
        </Button>
      </form>
    </Form>
  );
}

export { SignInForm };
