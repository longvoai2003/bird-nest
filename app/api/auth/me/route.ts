import { getSessionToken } from "@/app/api/auth/cookies";
import { getCustomerForSession } from "@/server/services/auth";

export async function GET(request: Request) {
    const customer = await getCustomerForSession(getSessionToken(request));

    return Response.json({ customer });
}
