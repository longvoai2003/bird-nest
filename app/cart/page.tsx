"use client";

import Link from "next/link";
import Image from "next/image";
import { LinkButton } from "@/components/ui/button";
import { useCart } from "@/features/cart/context/cart-context";
import { packagingOptions } from "@/shared/catalog/packaging";
import { formatCurrency } from "@/shared/utils/currency";

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
              <article className="card cartItem" key={`${line.productId}-${line.packagingId ?? "default"}`}>
                <Image
                  src={packagingOptions.find((item) => item.id === line.packagingId)?.image ?? line.product.image}
                  alt={line.product.name}
                  width={96}
                  height={96}
                />
                <div>
                  <h2>{line.product.name}</h2>
                  <p>{formatCurrency(line.product.price + (packagingOptions.find((item) => item.id === line.packagingId)?.price ?? 0))}</p>
                  {line.packagingId ? (
                    <p>
                      Hộp quà: {packagingOptions.find((item) => item.id === line.packagingId)?.family.name} - {packagingOptions.find((item) => item.id === line.packagingId)?.name}
                    </p>
                  ) : null}
                </div>
                <div className="quantityControls">
                  <button onClick={() => updateQuantity(line.productId, line.quantity - 1, line.packagingId)}>-</button>
                  <span>{line.quantity}</span>
                  <button onClick={() => updateQuantity(line.productId, line.quantity + 1, line.packagingId)}>+</button>
                </div>
                <strong>{formatCurrency((line.product.price + (packagingOptions.find((item) => item.id === line.packagingId)?.price ?? 0)) * line.quantity)}</strong>
                <button className="removeButton" onClick={() => removeItem(line.productId, line.packagingId)}>Xóa</button>
              </article>
            ))}
          </div>
        </div>
        <aside className="card cartTotals">
          <h2>Tổng giỏ hàng</h2>
          <div><span>Tạm tính</span><strong>{formatCurrency(subtotal)}</strong></div>
          <p>Hộp quà được chọn trực tiếp tại trang chi tiết sản phẩm.</p>
          <LinkButton href="/checkout">Tiến hành đặt hàng</LinkButton>
          <Link className="continueLink" href="/products">Tiếp tục mua sắm</Link>
        </aside>
      </div>
    </section>
  );
}
