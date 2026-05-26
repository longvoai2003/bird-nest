import { z } from "zod";
import { phoneSchema } from "./common";

export const registerSchema = z.object({
    fullName: z.string().trim().min(2, "Full name is required").max(100),
    phone: z.string().trim().regex(phoneSchema, "Phone number is invalid"),
    email: z.string().trim().email("Email address is invalid").max(254),
    password: z.string().min(8, "Password must be at least 8 characters").max(128),
});

export const signInSchema = z.object({
    email: z.string().trim().email("Email address is invalid").max(254),
    password: z.string().min(1, "Password is required").max(128),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
