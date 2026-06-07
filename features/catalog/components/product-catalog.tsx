"use client";

import { useCart } from "@/features/cart/context/cart-context";
import { ProductCard } from "@/features/catalog/components/product-card";
import { customerTiers } from "@/shared/customer-tiers";
import type { Product } from "@/shared/catalog/products";

export function ProductCatalog({ products }: { products: Product[] }) {
    const { customerTier, setCustomerTier } = useCart();

    return (
        <>
            <div className="tierInlineSelector card">
                <div>
                    <strong>Hạng khách hàng</strong>
                    <span>Giá sản phẩm thay đổi theo SILVER, GOLD và PREMIUM.</span>
                </div>
                <div className="tierInlineButtons" role="radiogroup" aria-label="Chọn hạng khách hàng">
                    {customerTiers.map((tier) => (
                        <button
                            className={customerTier === tier.id ? "active" : ""}
                            key={tier.id}
                            onClick={() => setCustomerTier(tier.id)}
                            type="button"
                            role="radio"
                            aria-checked={customerTier === tier.id}
                        >
                            {tier.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="productGrid">
                {products.map((product) => <ProductCard key={product.id} product={product} customerTier={customerTier} />)}
            </div>
        </>
    );
}
