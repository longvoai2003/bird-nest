"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    async function submit(formData: FormData) {
        setError(null);
        const response = await fetch("/api/auth/sign-in", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.fromEntries(formData)),
        });

        if (!response.ok) {
            const body = await response.json().catch(() => null);
            setError(body?.error ?? "Không thể đăng nhập");
            return;
        }

        router.push("/");
        router.refresh();
    }

    return (
        <section className="section authPage">
            <div className="container authContainer formCard surface">
                <p className="eyebrow">Tài khoản khách hàng</p>
                <h1>Đăng nhập</h1>
                <form action={submit} className="formCard">
                    <label>Email<input name="email" type="email" required maxLength={254} /></label>
                    <label>Mật khẩu<input name="password" type="password" required maxLength={128} /></label>
                    {error ? <p className="errorText">{error}</p> : null}
                    <button className="button" type="submit">Đăng nhập</button>
                </form>
                <p className="authSwitch">Chưa có tài khoản? <Link href="/register">Đăng ký</Link></p>
            </div>
        </section>
    );
}
