"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type AuthApiError = {
    error?: string;
    detail?: string;
    requestId?: string;
    issues?: Array<{ path: string; message: string }>;
};

function formatAuthError(body: AuthApiError | null) {
    const messages = body?.issues?.map((issue) => issue.message).filter(Boolean) ?? [];

    if (body?.error) {
        messages.unshift(body.error);
    }

    if (body?.detail) {
        messages.push(body.detail);
    }

    if (body?.requestId) {
        messages.push(`Mã lỗi: ${body.requestId}`);
    }

    return messages.join(" ") || "Không thể đăng ký. Vui lòng thử lại hoặc liên hệ hỗ trợ.";
}

export default function RegisterPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    async function submit(formData: FormData) {
        setError(null);
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.fromEntries(formData)),
        });

        if (!response.ok) {
            const body = (await response.json().catch(() => null)) as AuthApiError | null;
            setError(formatAuthError(body));
            return;
        }

        router.push("/");
        router.refresh();
    }

    return (
        <section className="section authPage">
            <div className="container authContainer formCard surface">
                <p className="eyebrow">Tài khoản khách hàng</p>
                <h1>Đăng ký</h1>
                <form action={submit} className="formCard">
                    <label>Họ và tên<input name="fullName" required minLength={2} maxLength={100} /></label>
                    <label>Số điện thoại<input name="phone" required /></label>
                    <label>Email<input name="email" type="email" required maxLength={254} /></label>
                    <label>Mật khẩu<input name="password" type="password" required minLength={8} maxLength={128} /></label>
                    {error ? <p className="errorText">{error}</p> : null}
                    <button className="button" type="submit">Tạo tài khoản</button>
                </form>
                <p className="authSwitch">Đã có tài khoản? <Link href="/sign-in">Đăng nhập</Link></p>
            </div>
        </section>
    );
}
