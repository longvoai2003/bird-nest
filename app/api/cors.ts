const allowedOrigins = (process.env.API_ALLOWED_ORIGINS ?? "*")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

function getAllowedOrigin(request: Request) {
    const requestOrigin = request.headers.get("origin");

    if (allowedOrigins.includes("*")) {
        return "*";
    }

    if (requestOrigin && allowedOrigins.includes(requestOrigin)) {
        return requestOrigin;
    }

    return allowedOrigins[0] ?? "*";
}

export function corsHeaders(request: Request) {
    return {
        "Access-Control-Allow-Origin": getAllowedOrigin(request),
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
    };
}

export function preflightResponse(request: Request) {
    return new Response(null, { status: 204, headers: corsHeaders(request) });
}

export function jsonWithCors(request: Request, body: unknown, init?: ResponseInit) {
    return Response.json(body, {
        ...init,
        headers: {
            ...corsHeaders(request),
            ...init?.headers,
        },
    });
}
