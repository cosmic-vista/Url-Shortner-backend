import { z } from "zod";

const signupSchema = z.object({
  name: z.string().min(3).max(30),
  email: z.email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export { signupSchema, loginSchema };
