"use client";

import { useState } from "react";
import Image from "next/image";
import { Button, LinkButton } from "@/components/ui/button";
import { useCart } from "@/features/cart/context/cart-context";
import { PackagingSelector } from "@/features/checkout/components/packaging-selector";
import { packagingOptions } from "@/shared/catalog/packaging";
import { type Product } from "@/shared/catalog/products";
import { getCustomerTierInfo, getTierPrice } from "@/shared/customer-tiers";
import { formatCurrency } from "@/shared/utils/currency";

const defaultPackagingId = "suitcase-green-lotus";
const customDesignProductId = "to-yen-chung-nguyen-chat";

type ProductDetailProps = {
    product: Product;
};

export function ProductDetail({ product }: ProductDetailProps) {
    const { addItem, customerTier } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [selectedPackagingId, setSelectedPackagingId] = useState(product.supportsPackaging ? defaultPackagingId : "");
    const [added, setAdded] = useState(false);

    const selectedPackaging = packagingOptions.find((item) => item.id === selectedPackagingId);
    const tierInfo = getCustomerTierInfo(customerTier);
    const discountedProductPrice = getTierPrice(product.price, customerTier);
    const displayImage = selectedPackaging?.image ?? product.image;
    const displayPrice = discountedProductPrice + (selectedPackaging?.price ?? 0);
    const supportsCustomDesignRequest = product.id === customDesignProductId;

    function submitAddToCart() {
        for (let index = 0; index < quantity; index += 1) {
            addItem(product.id, selectedPackaging?.id);
        }

        setAdded(true);
        window.setTimeout(() => setAdded(false), 1200);
    }

    return (
        <section className="section productDetailPage">
            <div className="container productDetailLayout">
                <div className="productDetailMedia card">
                    <Image alt={product.name} className="productDetailImage" height={720} src={displayImage} width={720} />
                </div>
                <div className="productDetailContent">
                    <p className="eyebrow">Sản phẩm</p>
                    <h1 className="pageTitle">{product.name}</h1>
                    {product.supportsPackaging ? (
                        <div className="productPackagingSection">
                            <div className="productPackagingHeader">
                                <h2>Tùy chọn hộp quà</h2>
                            </div>
                            <PackagingSelector
                                onSelect={setSelectedPackagingId}
                                selectedPackagingId={selectedPackagingId}
                            />
                            <button className="packagingResetButton" onClick={() => setSelectedPackagingId("")} type="button">
                                Dùng hình ảnh gốc của sản phẩm
                            </button>
                        </div>
                    ) : null}


                    {supportsCustomDesignRequest ? (
                        <div className="productCustomDesignCard card">
                            <div className="productCustomDesignIcon" aria-hidden="true" />
                            <div className="productCustomDesignContent">
                                <span className="productCustomDesignLabel">Thiết kế riêng</span>
                                <h2>Chưa tìm thấy mẫu hộp ưng ý?</h2>
                                <p>Gửi ý tưởng về màu sắc, lời chúc, dịp tặng hoặc số lượng. Cửa hàng sẽ tư vấn phương án đóng gói riêng để món quà trông đúng gu hơn.</p>
                                <div className="productCustomDesignTags" aria-label="Các nội dung có thể tùy chỉnh">
                                    <span>Màu sắc</span>
                                    <span>Lời chúc</span>
                                    <span>Concept quà tặng</span>
                                </div>
                            </div>
                            <LinkButton className="productCustomDesignButton" href="/contact?topic=custom-design&product=to-yen-chung-nguyen-chat">
                                Nhận tư vấn thiết kế riêng
                            </LinkButton>
                        </div>
                    ) : null}
                    <span className="productDetailBadge">{product.badge}</span>
                    <p className="productDetailDescription">{product.description}</p>
                    <div className="productDetailFacts card">
                        <div><span>Đơn vị</span><strong>{product.unit}</strong></div>
                        <div><span>Tình trạng</span><strong>{product.availability === "preorder" ? "Đặt trước" : "Còn hàng"}</strong></div>
                        <div>
                            <span>Giá hiện tại</span>
                            <strong>
                                {tierInfo.discountRate > 0 ? <span className="priceWas">{formatCurrency(product.price + (selectedPackaging?.price ?? 0))}</span> : null}
                                {formatCurrency(displayPrice)}
                            </strong>
                        </div>
                    </div>

                    {tierInfo.discountRate > 0 ? (
                        <p className="tierDiscountText">
                            {tierInfo.label} đang giảm {Math.round(tierInfo.discountRate * 100)}% trên giá sản phẩm.
                        </p>
                    ) : null}

                    {selectedPackaging ? (
                        <div className="productPriceBreakdown card">
                            <div><span>Giá sản phẩm</span><strong>{formatCurrency(discountedProductPrice)}</strong></div>
                            <div><span>Phí hộp quà</span><strong>+{formatCurrency(selectedPackaging.price)}</strong></div>
                        </div>
                    ) : product.supportsPackaging ? (
                        <p className="productPackagingNote card">
                            Có thể chọn hộp quà ở bên trên, phí hộp quà sẽ được cộng vào giá sản phẩm.
                        </p>
                    ) : null}


                    <div className="productPurchaseCard card">
                        <div className="quantityPicker">
                            <span>Số lượng</span>
                            <div className="quantityControls">
                                <button onClick={() => setQuantity((current) => Math.max(1, current - 1))} type="button">-</button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity((current) => Math.min(99, current + 1))} type="button">+</button>
                            </div>
                        </div>
                        <div className="productPurchaseActions">
                            <Button onClick={submitAddToCart} type="button">{added ? "Đã thêm vào giỏ" : "Thêm vào giỏ"}</Button>
                            <LinkButton href="/cart" variant="secondary">Xem giỏ hàng</LinkButton>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
