import { expiredSessionCookie, getSessionToken } from "@/app/api/auth/cookies";
import { signOutCustomer } from "@/server/services/auth";

export async function POST(request: Request) {
    await signOutCustomer(getSessionToken(request));

    return Response.json({ status: "signed_out" }, { headers: { "Set-Cookie": expiredSessionCookie() } });
}
