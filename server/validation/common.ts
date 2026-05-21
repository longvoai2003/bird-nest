import type { ZodError } from "zod";

export const phoneSchema = /^[+\d][\d\s().-]{7,19}$/;

export function formatZodIssues(error: ZodError) {
    return error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
    }));
}
