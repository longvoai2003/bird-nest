"use client";

import { useCart } from "@/features/cart/context/cart-context";
import { customerTiers, getCustomerTierInfo, type CustomerTier } from "@/shared/customer-tiers";

export default function AccountPage() {
    const { customerTier, setCustomerTier } = useCart();
    const activeTier = getCustomerTierInfo(customerTier);

    return (
        <section className="section accountPage">
            <div className="container accountLayout">
                <div className="accountIntro">
                    <p className="eyebrow">Tài khoản</p>
                    <h1 className="pageTitle">Hạng thành viên khách hàng</h1>
                    <p>
                        Chọn hạng khách hàng để xem giao diện giá ưu đãi SILVER, GOLD hoặc PREMIUM. Đây là phần demo UI,
                        lựa chọn được lưu trong localStorage của trình duyệt.
                    </p>
                </div>

                <div className={`membershipCard membershipCard-${activeTier.id}`}>
                    <div>
                        <span className="membershipSymbol">{activeTier.symbol}</span>
                        <p>Yến Sào Tiên Sa</p>
                        <h2>{activeTier.label}</h2>
                    </div>
                    <div className="membershipDiscount">
                        <span>Ưu đãi hiện tại</span>
                        <strong>{Math.round(activeTier.discountRate * 100)}%</strong>
                    </div>
                </div>

                <div className="card tierSelectorCard">
                    <h2>Chọn hạng khách hàng</h2>
                    <div className="tierGrid" role="radiogroup" aria-label="Chọn hạng khách hàng">
                        {customerTiers.map((tier) => (
                            <button
                                className={customerTier === tier.id ? "tierOption active" : "tierOption"}
                                key={tier.id}
                                onClick={() => setCustomerTier(tier.id as CustomerTier)}
                                type="button"
                                role="radio"
                                aria-checked={customerTier === tier.id}
                            >
                                <span>{tier.symbol}</span>
                                <strong>{tier.label}</strong>
                                <small>{tier.discountRate > 0 ? `Giảm ${Math.round(tier.discountRate * 100)}%` : "Giá niêm yết"}</small>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="card tierBenefitCard">
                    <p className="eyebrow">Quyền lợi demo</p>
                    <h2>{activeTier.description}</h2>
                    <p>{activeTier.benefit}</p>
                    <p className="tierNote">Giảm giá chỉ hiển thị trong UI website, chưa gửi hoặc lưu vào backend đơn hàng.</p>
                </div>
            </div>
        </section>
    );
}
