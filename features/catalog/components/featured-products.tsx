"use client";

import { useCart } from "@/features/cart/context/cart-context";
import { ProductCard } from "@/features/catalog/components/product-card";
import type { Product } from "@/shared/catalog/products";

export function FeaturedProducts({ products }: { products: Product[] }) {
    const { customerTier } = useCart();

    return (
        <div className="grid3">
            {products.map((product) => <ProductCard key={product.id} product={product} customerTier={customerTier} />)}
        </div>
    );
}
