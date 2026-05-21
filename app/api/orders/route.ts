import { createOrder, OrderInputError } from "@/server/services/orders";
import { formatZodIssues } from "@/server/validation/common";
import { createOrderSchema } from "@/server/validation/orders";

export async function POST(request: Request) {
    let body: unknown;

    try {
        body = await request.json();
    } catch {
        return Response.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    const parsed = createOrderSchema.safeParse(body);

    if (!parsed.success) {
        return Response.json(
            { error: "Invalid order payload", issues: formatZodIssues(parsed.error) },
            { status: 400 },
        );
    }

    try {
        const order = await createOrder(parsed.data);
        return Response.json(order, { status: 201 });
    } catch (error) {
        if (error instanceof OrderInputError) {
            return Response.json({ error: error.message }, { status: 400 });
        }

        console.error("Create order failed", error);
        return Response.json({ error: "Unable to create order" }, { status: 500 });
    }
}
