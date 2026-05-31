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
                        {detailedLines.map((line) => {
                            const selectedPackaging = packagingOptions.find((item) => item.id === line.packagingId);
                            const unitPrice = line.product.price + (selectedPackaging?.price ?? 0);

                            return (
                                <article className="card cartItem" key={`${line.productId}-${line.packagingId ?? "default"}`}>
                                    <div className="cartItemMedia">
                                        <Image src={selectedPackaging?.image ?? line.product.image} alt={line.product.name} width={96} height={96} />
                                    </div>
                                    <div className="cartItemBody">
                                        <div className="cartItemInfo">
                                            <h2>{line.product.name}</h2>
                                            <p className="cartItemUnitPrice">{formatCurrency(unitPrice)}</p>
                                            {selectedPackaging ? (
                                                <p className="cartItemPackaging">
                                                    Hộp quà: {selectedPackaging.family.name} - {selectedPackaging.name}
                                                </p>
                                            ) : null}
                                        </div>
                                        <div className="cartItemFooter">
                                            <div className="quantityControls">
                                                <button onClick={() => updateQuantity(line.productId, line.quantity - 1, line.packagingId)}>-</button>
                                                <span>{line.quantity}</span>
                                                <button onClick={() => updateQuantity(line.productId, line.quantity + 1, line.packagingId)}>+</button>
                                            </div>
                                            <strong className="cartItemTotal">{formatCurrency(unitPrice * line.quantity)}</strong>
                                            <button className="removeButton" onClick={() => removeItem(line.productId, line.packagingId)}>Xóa</button>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
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
