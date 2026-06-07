import { z } from "zod";
import { phoneSchema } from "./common";

const optionalTrimmedString = (maxLength: number) => z.string().trim().max(maxLength).optional().or(z.literal(""));

export const createContactSchema = z.object({
    fullName: z.string().trim().min(2, "Full name is required").max(100),
    phone: z.string().trim().regex(phoneSchema, "Phone number is invalid"),
    email: z.string().trim().email("Email address is invalid").max(254),
    message: z.string().trim().min(10, "Message is too short").max(2000),
    requestType: optionalTrimmedString(100),
    relatedProduct: optionalTrimmedString(150),
    appointmentDate: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/, "Appointment date is invalid").optional().or(z.literal("")),
    appointmentTime: optionalTrimmedString(50),
    consultationMethod: optionalTrimmedString(80),
});

export type CreateContactInput = z.infer<typeof createContactSchema>;
