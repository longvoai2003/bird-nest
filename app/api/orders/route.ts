import { getSessionToken } from "@/app/api/auth/cookies";
import { jsonWithCors, preflightResponse } from "@/app/api/cors";
import { getCustomerForSession } from "@/server/services/auth";
import { createOrder, OrderInputError } from "@/server/services/orders";
import { formatZodIssues } from "@/server/validation/common";
import { createOrderSchema } from "@/server/validation/orders";

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

    const parsed = createOrderSchema.safeParse(body);

    if (!parsed.success) {
        return jsonWithCors(
            request,
            { error: "Invalid order payload", issues: formatZodIssues(parsed.error) },
            { status: 400 },
        );
    }

    try {
        const customer = await getCustomerForSession(getSessionToken(request));
        const order = await createOrder(parsed.data, customer?.id);
        return jsonWithCors(request, order, { status: 201 });
    } catch (error) {
        if (error instanceof OrderInputError) {
            return jsonWithCors(request, { error: error.message }, { status: 400 });
        }

        console.error("Create order failed", error);
        return jsonWithCors(request, { error: "Unable to create order" }, { status: 500 });
    }
}
