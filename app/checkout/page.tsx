"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, LinkButton } from "@/components/ui/button";
import { useCart } from "@/features/cart/context/cart-context";
import { OrderSummary } from "@/features/checkout/components/order-summary";

type ApiError = {
    error?: string;
    issues?: Array<{ path: string; message: string }>;
};

export default function CheckoutPage() {
    const router = useRouter();
    const { detailedLines, subtotal, clearCart } = useCart();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(event.currentTarget);

        try {
            const response = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customer: {
                        fullName: String(formData.get("fullName") ?? ""),
                        phone: String(formData.get("phone") ?? ""),
                        email: String(formData.get("email") ?? ""),
                        deliveryAddress: String(formData.get("deliveryAddress") ?? ""),
                    },
                    items: detailedLines.map((line) => ({
                        productId: line.productId,
                        quantity: line.quantity,
                        packagingId: line.packagingId,
                    })),
                    notes: String(formData.get("notes") ?? ""),
                }),
            });

            const data = (await response.json()) as (ApiError & { orderId?: string });

            if (!response.ok || !data.orderId) {
                const issueText = data.issues?.map((issue) => issue.message).join(" ");
                throw new Error(issueText || data.error || "Unable to submit order request");
            }

            clearCart();
            router.push(`/order-success?orderId=${encodeURIComponent(data.orderId)}`);
        } catch (submitError) {
            setError(submitError instanceof Error ? submitError.message : "Unable to submit order request");
        } finally {
            setIsSubmitting(false);
        }
    }

    if (detailedLines.length === 0) {
        return (
            <section className="section">
                <div className="container emptyCart card">
                    <p className="eyebrow">Thanh toán</p>
                    <h1>Giỏ hàng của bạn đang trống.</h1>
                    <p>Hãy thêm sản phẩm trước khi gửi yêu cầu đặt hàng.</p>
                    <LinkButton href="/products">Xem sản phẩm</LinkButton>
                </div>
            </section>
        );
    }

    return (
        <section className="section">
            <div className="container checkoutLayout">
                <form className="checkoutForm" onSubmit={submit}>
                    <p className="eyebrow">Thanh toán</p>
                    <h1 className="pageTitle">Thông tin khách hàng</h1>
                    <div className="card formCard">
                        <label>Họ và tên<input className="input" required name="fullName" /></label>
                        <label>Số điện thoại<input className="input" required name="phone" /></label>
                        <label>Email<input className="input" required type="email" name="email" /></label>
                        <label>Địa chỉ giao hàng<textarea className="input" required name="deliveryAddress" rows={3} /></label>
                        <label>Ghi chú đơn hàng<textarea className="input" name="notes" rows={3} /></label>
                    </div>

                    {error ? <p className="errorText">{error}</p> : null}
                    <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Đang gửi..." : "Gửi yêu cầu đặt hàng"}</Button>
                </form>
                <OrderSummary lines={detailedLines} subtotal={subtotal} />
            </div>
        </section>
    );
}
