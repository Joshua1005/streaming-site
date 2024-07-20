"use client";

import { signUpSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { FormFieldWrapper } from "@/components/wrapper/formfield-wrapper";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { AuthMessage } from "./auth-message";
import { useSignUp } from "@/hooks/use-signup";

function SignUpForm() {
  const { mutate, status, data, error } = useSignUp(() => form.reset());
  const form = useForm<Zod.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => mutate(values))}
        className={"grid grid-cols-2 gap-2"}
      >
        <FormFieldWrapper
          control={form.control}
          name={"name"}
          placeholder={"John Doe"}
          className={"col-span-2"}
        />
        <FormFieldWrapper
          control={form.control}
          name={"email"}
          type={"email"}
          placeholder={"foobar@example.com"}
          className={"col-span-2"}
        />
        <FormFieldWrapper
          control={form.control}
          name={"password"}
          type={"password"}
        />
        <FormFieldWrapper
          control={form.control}
          name={"confirmPassword"}
          type={"password"}
        />
        <AuthMessage
          message={data?.message || error?.message}
          status={status}
          className={"col-span-2"}
        />
        <Button
          disabled={status === "pending"}
          type={"submit"}
          className={"col-span-2"}
        >
          Continue
        </Button>
      </form>
    </Form>
  );
}

export { SignUpForm };
