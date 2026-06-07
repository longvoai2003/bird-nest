import { getSessionToken } from "@/app/api/auth/cookies";
import { jsonWithCors, preflightResponse } from "@/app/api/cors";
import { getCustomerForSession } from "@/server/services/auth";

export function OPTIONS(request: Request) {
    return preflightResponse(request);
}

export async function GET(request: Request) {
    const customer = await getCustomerForSession(getSessionToken(request));

    return jsonWithCors(request, { customer });
}
