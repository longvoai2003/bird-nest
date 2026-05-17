"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, LinkButton } from "@/components/button";
import { OrderSummary } from "@/components/order-summary";
import { useCart } from "@/context/cart-context";
import { packagingOptions } from "@/data/packaging";
import { formatCurrency } from "@/data/products";

export default function CheckoutPage() {
  const router = useRouter();
  const { detailedLines, subtotal, clearCart } = useCart();
  const [selectedPackagingId, setSelectedPackagingId] = useState(packagingOptions[0].id);
  const selectedPackaging = packagingOptions.find((item) => item.id === selectedPackagingId) ?? packagingOptions[0];

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearCart();
    router.push("/order-success");
  }

  if (detailedLines.length === 0) {
    return (
      <section className="section">
        <div className="container emptyCart card">
          <p className="eyebrow">Checkout</p>
          <h1>Your cart is empty.</h1>
          <p>Please add products before submitting an order request.</p>
          <LinkButton href="/products">View products</LinkButton>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container checkoutLayout">
        <form className="checkoutForm" onSubmit={submit}>
          <p className="eyebrow">Checkout</p>
          <h1 className="pageTitle">Customer and packaging details</h1>
          <div className="card formCard">
            <label>Full name<input className="input" required name="name" /></label>
            <label>Phone number<input className="input" required name="phone" /></label>
            <label>Email address<input className="input" required type="email" name="email" /></label>
            <label>Delivery address<textarea className="input" required name="address" rows={3} /></label>
            <label>Order notes<textarea className="input" name="notes" rows={3} /></label>
          </div>

          <div className="packagingBlock">
            <h2>Packaging service</h2>
            <div className="packagingGrid">
              {packagingOptions.map((option) => (
                <button
                  className={`packagingOption ${selectedPackagingId === option.id ? "selected" : ""}`}
                  key={option.id}
                  onClick={() => setSelectedPackagingId(option.id)}
                  type="button"
                >
                  <strong>{option.name}</strong>
                  <span>{option.description}</span>
                  <em>{formatCurrency(option.price)}</em>
                </button>
              ))}
            </div>
          </div>

          <Button type="submit">Submit order request</Button>
        </form>
        <OrderSummary lines={detailedLines} subtotal={subtotal} packaging={selectedPackaging} />
      </div>
    </section>
  );
}
