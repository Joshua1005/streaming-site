import { z } from "zod";

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;

const signUpSchema = z
  .object({
    name: z.string().min(1, "First name is required."),
    email: z
      .string()
      .min(6, "Email must have atleast 6 characters.")
      .email("Invalid email format."),
    password: z
      .string()
      .min(8, "Password must have atleast 8 characters.")
      .regex(
        passwordRegex,
        "Password must contain atleast uppercase, lowercase, a number, and a special character."
      ),
    confirmPassword: z.string(),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Confirm password must matched with the password.",
    path: ["confirmPassword"],
  });

const signInSchema = z.object({
  email: z
    .string()
    .min(6, "Email must have atleast 6 characters.")
    .email("Invalid email format."),
  password: z.string().min(1, "Password is required."),
});

const uploadVideoSchema = z.object({
  title: z.string().min(1, "Title is required."),
  description: z.string().optional(),
  video: z.string().min(1, "Video is required."),
});

export { signUpSchema, signInSchema, uploadVideoSchema };
