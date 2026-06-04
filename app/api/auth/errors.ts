export function createAuthRequestId(prefix: string) {
    return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function getSafeErrorDetail(error: unknown) {
    if (error instanceof Error) {
        return `${error.name}: ${error.message}`;
    }

    return "Unknown error";
}
