"use client";

import Image from "next/image";
import Link from "next/link";
import { LinkButton } from "@/components/ui/button";
import { type Product } from "@/shared/catalog/products";
import { getCustomerTierInfo, getTierPrice, type CustomerTier } from "@/shared/customer-tiers";
import { formatCurrency } from "@/shared/utils/currency";

export function ProductCard({ product, customerTier = "standard" }: { product: Product; customerTier?: CustomerTier }) {
  const tierInfo = getCustomerTierInfo(customerTier);
  const tierPrice = getTierPrice(product.price, customerTier);

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
          <div className="tierPriceBlock">
            {tierInfo.discountRate > 0 ? <span>{formatCurrency(product.price)}</span> : null}
            <strong>{formatCurrency(tierPrice)}</strong>
            {tierInfo.discountRate > 0 ? <small>{tierInfo.label} giảm {Math.round(tierInfo.discountRate * 100)}%</small> : null}
          </div>
          <LinkButton href={`/products/${product.slug}`} variant="secondary">Xem chi tiết</LinkButton>
        </div>
      </div>
      </article>
    </Link>
  );
}
