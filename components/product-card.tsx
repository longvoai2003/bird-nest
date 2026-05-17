"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/cart-context";
import { formatCurrency, type Product } from "@/data/products";
import { Button } from "@/components/button";

export function ProductCard({ product }: { product: Product }) {
    const { addItem } = useCart();
    const [added, setAdded] = useState(false);

    return (
        <article className="productCard">
            <div className="imageWrap">
                <Image src={product.image} alt={product.name} width={640} height={360} />
                <span>{product.badge}</span>
            </div>
            <div className="productBody">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="productMeta">
                    <strong>{formatCurrency(product.price)}</strong>
                    <Button
                        onClick={() => {
                            addItem(product.id);
                            setAdded(true);
                            window.setTimeout(() => setAdded(false), 1200);
                        }}
                    >
                        {added ? "Đã thêm" : "Thêm vào giỏ"}
                    </Button>
                </div>
            </div>
        </article>
    );
}
