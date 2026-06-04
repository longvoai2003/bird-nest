import { sessionCookie } from "@/app/api/auth/cookies";
import { AuthInputError, registerCustomer } from "@/server/services/auth";
import { registerSchema } from "@/server/validation/auth";
import { formatZodIssues } from "@/server/validation/common";

export async function POST(request: Request) {
    let body: unknown;

    try {
        body = await request.json();
    } catch {
        return Response.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
        return Response.json({ error: "Invalid registration payload", issues: formatZodIssues(parsed.error) }, { status: 400 });
    }

    try {
        const result = await registerCustomer(parsed.data);
        return Response.json({ customer: result.customer }, { status: 201, headers: { "Set-Cookie": sessionCookie(result.session.token) } });
    } catch (error) {
        if (error instanceof AuthInputError) {
            return Response.json({ error: error.message }, { status: 400 });
        }

        console.error("Register customer failed", error);
        return Response.json({ error: "Unable to register" }, { status: 500 });
    }
}
