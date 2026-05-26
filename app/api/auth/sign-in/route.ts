import { sessionCookie } from "@/app/api/auth/cookies";
import { AuthInputError, signInCustomer } from "@/server/services/auth";
import { signInSchema } from "@/server/validation/auth";
import { formatZodIssues } from "@/server/validation/common";

export async function POST(request: Request) {
    let body: unknown;

    try {
        body = await request.json();
    } catch {
        return Response.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    const parsed = signInSchema.safeParse(body);

    if (!parsed.success) {
        return Response.json({ error: "Invalid sign-in payload", issues: formatZodIssues(parsed.error) }, { status: 400 });
    }

    try {
        const result = await signInCustomer(parsed.data);
        return Response.json({ customer: result.customer }, { status: 200, headers: { "Set-Cookie": sessionCookie(result.session.token) } });
    } catch (error) {
        if (error instanceof AuthInputError) {
            return Response.json({ error: error.message }, { status: 401 });
        }

        console.error("Sign in customer failed", error);
        return Response.json({ error: "Unable to sign in" }, { status: 500 });
    }
}
