import { sessionCookie } from "@/app/api/auth/cookies";
import { createAuthRequestId, getSafeErrorDetail } from "@/app/api/auth/errors";
import { jsonWithCors, preflightResponse } from "@/app/api/cors";
import { AuthInputError, signInCustomer } from "@/server/services/auth";
import { signInSchema } from "@/server/validation/auth";
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

    const parsed = signInSchema.safeParse(body);

    if (!parsed.success) {
        return jsonWithCors(request, { error: "Invalid sign-in payload", issues: formatZodIssues(parsed.error) }, { status: 400 });
    }

    try {
        const result = await signInCustomer(parsed.data);
        return jsonWithCors(request, { customer: result.customer }, { status: 200, headers: { "Set-Cookie": sessionCookie(result.session.token) } });
    } catch (error) {
        if (error instanceof AuthInputError) {
            return jsonWithCors(request, { error: error.message }, { status: 401 });
        }

        const requestId = createAuthRequestId("signin");
        const detail = getSafeErrorDetail(error);

        console.error("Sign in customer failed", { requestId, detail, error });

        return jsonWithCors(
            request,
            {
                error: "Unable to sign in",
                detail,
                requestId,
            },
            { status: 500 },
        );
    }
}
