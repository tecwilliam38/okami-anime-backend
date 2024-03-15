import { z } from "zod";

export const registerSchema = z.object({
  user_name: z.string({
    required_error: "Username is required",
  }),
  user_email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Email não encontrado",
    }),
    user_birthday: z
    .string({
      required_error: "Aniversário is required",
    }),    
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
});

export const loginSchema = z.object({
  user_email: z.string().email(),
  password: z.string().min(6),
});
