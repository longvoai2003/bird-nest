import { getSessionToken } from "@/app/api/auth/cookies";
import { jsonWithCors, preflightResponse } from "@/app/api/cors";
import { getCustomerForSession } from "@/server/services/auth";
import { createContactRequest } from "@/server/services/contact";
import { formatZodIssues } from "@/server/validation/common";
import { createContactSchema } from "@/server/validation/contact";

export function OPTIONS(request: Request) {
    return preflightResponse(request);
}

export async function POST(request: Request) {
    let body: unknown;

    try {
        body = await request.json();
    } catch {
        return jsonWithCors(request, { error: "Invalid JSON payload" }, { status: 400 });
    }

    const parsed = createContactSchema.safeParse(body);

    if (!parsed.success) {
        return jsonWithCors(
            request,
            { error: "Invalid contact payload", issues: formatZodIssues(parsed.error) },
            { status: 400 },
        );
    }

    try {
        const customer = await getCustomerForSession(getSessionToken(request));
        const contact = await createContactRequest(parsed.data, customer?.id);
        return jsonWithCors(request, contact, { status: 201 });
    } catch (error) {
        console.error("Create contact request failed", error);
        return jsonWithCors(request, { error: "Unable to submit contact request" }, { status: 500 });
    }
}
