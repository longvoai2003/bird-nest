import { sessionCookie } from "@/app/api/auth/cookies";
import { createAuthRequestId, getSafeErrorDetail } from "@/app/api/auth/errors";
import { jsonWithCors, preflightResponse } from "@/app/api/cors";
import { AuthInputError, registerCustomer } from "@/server/services/auth";
import { registerSchema } from "@/server/validation/auth";
import { formatZodIssues } from "@/server/validation/common";

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

    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
        return jsonWithCors(request, { error: "Invalid registration payload", issues: formatZodIssues(parsed.error) }, { status: 400 });
    }

    try {
        const result = await registerCustomer(parsed.data);
        return jsonWithCors(request, { customer: result.customer }, { status: 201, headers: { "Set-Cookie": sessionCookie(result.session.token) } });
    } catch (error) {
        if (error instanceof AuthInputError) {
            return jsonWithCors(request, { error: error.message }, { status: 400 });
        }

        const requestId = createAuthRequestId("register");
        const detail = getSafeErrorDetail(error);

        console.error("Register customer failed", { requestId, detail, error });

        return jsonWithCors(
            request,
            {
                error: "Unable to register",
                detail,
                requestId,
            },
            { status: 500 },
        );
    }
}
