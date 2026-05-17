"use client";

import Link from "next/link";
import Image from "next/image";
import { LinkButton } from "@/components/button";
import { useCart } from "@/context/cart-context";
import { formatCurrency } from "@/data/products";

export default function CartPage() {
  const { detailedLines, subtotal, updateQuantity, removeItem } = useCart();

  if (detailedLines.length === 0) {
    return (
      <section className="section">
        <div className="container emptyCart card">
          <p className="eyebrow">Giỏ hàng</p>
          <h1>Your cart is empty.</h1>
          <p>Explore bird-nest products and add your favorites before checkout.</p>
          <LinkButton href="/products">View products</LinkButton>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container cartLayout">
        <div>
          <p className="eyebrow">Giỏ hàng</p>
          <h1 className="pageTitle">Review your order</h1>
          <div className="cartList">
            {detailedLines.map((line) => (
              <article className="card cartItem" key={line.productId}>
                <Image src={line.product.image} alt={line.product.name} width={96} height={96} />
                <div>
                  <h2>{line.product.name}</h2>
                  <p>{formatCurrency(line.product.price)}</p>
                </div>
                <div className="quantityControls">
                  <button onClick={() => updateQuantity(line.productId, line.quantity - 1)}>-</button>
                  <span>{line.quantity}</span>
                  <button onClick={() => updateQuantity(line.productId, line.quantity + 1)}>+</button>
                </div>
                <strong>{formatCurrency(line.product.price * line.quantity)}</strong>
                <button className="removeButton" onClick={() => removeItem(line.productId)}>Remove</button>
              </article>
            ))}
          </div>
        </div>
        <aside className="card cartTotals">
          <h2>Cart total</h2>
          <div><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></div>
          <p>Packaging is selected during checkout.</p>
          <LinkButton href="/checkout">Proceed to checkout</LinkButton>
          <Link className="continueLink" href="/products">Continue shopping</Link>
        </aside>
      </div>
    </section>
  );
}
