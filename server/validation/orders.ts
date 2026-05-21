import { z } from "zod";
import { phoneSchema } from "./common";

export const createOrderSchema = z.object({
    customer: z.object({
        fullName: z.string().trim().min(2, "Full name is required").max(100),
        phone: z.string().trim().regex(phoneSchema, "Phone number is invalid"),
        email: z.string().trim().email("Email address is invalid").max(254),
        deliveryAddress: z.string().trim().min(8, "Delivery address is too short").max(500),
    }),
    items: z
        .array(
            z.object({
                productId: z.string().trim().min(1, "Product is required"),
                quantity: z.number().int().min(1).max(99),
                packagingId: z.string().trim().min(1).optional(),
            }),
        )
        .min(1, "At least one item is required")
        .max(50),
    notes: z.string().trim().max(1000).optional().or(z.literal("")),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
