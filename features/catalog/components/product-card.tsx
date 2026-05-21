"use client";

import Image from "next/image";
import Link from "next/link";
import { LinkButton } from "@/components/ui/button";
import { type Product } from "@/shared/catalog/products";
import { formatCurrency } from "@/shared/utils/currency";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link className="productCardLink" href={`/products/${product.slug}`}>
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
          <LinkButton href={`/products/${product.slug}`} variant="secondary">Xem chi tiết</LinkButton>
        </div>
      </div>
      </article>
    </Link>
  );
}
