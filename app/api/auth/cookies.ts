import { sessionCookieName } from "@/server/repositories/sessions";
import { sessionMaxAgeSeconds } from "@/server/services/auth";

const secureCookie = process.env.NODE_ENV === "production" ? "; Secure" : "";

export function getSessionToken(request: Request) {
    const cookie = request.headers.get("cookie") ?? "";
    const match = cookie.match(new RegExp(`(?:^|; )${sessionCookieName}=([^;]+)`));

    return match ? decodeURIComponent(match[1]) : null;
}

export function sessionCookie(token: string) {
    return `${sessionCookieName}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${sessionMaxAgeSeconds}${secureCookie}`;
}

export function expiredSessionCookie() {
    return `${sessionCookieName}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secureCookie}`;
}
