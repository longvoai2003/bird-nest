import { z } from "zod";
import { phoneSchema } from "./common";

export const createContactSchema = z.object({
    fullName: z.string().trim().min(2, "Full name is required").max(100),
    phone: z.string().trim().regex(phoneSchema, "Phone number is invalid"),
    email: z.string().trim().email("Email address is invalid").max(254),
    message: z.string().trim().min(10, "Message is too short").max(2000),
});

export type CreateContactInput = z.infer<typeof createContactSchema>;
