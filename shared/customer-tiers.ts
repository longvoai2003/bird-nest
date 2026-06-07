export type CustomerTier = "standard" | "silver" | "gold" | "premium";

export type CustomerTierInfo = {
    id: CustomerTier;
    label: string;
    symbol: string;
    discountRate: number;
    description: string;
    benefit: string;
};

export const customerTiers: CustomerTierInfo[] = [
    {
        id: "standard",
        label: "Thường",
        symbol: "STD",
        discountRate: 0,
        description: "Giá niêm yết cho khách hàng mới.",
        benefit: "Bắt đầu mua sắm và nâng hạng thành viên sau các đơn hàng tiếp theo.",
    },
    {
        id: "silver",
        label: "SILVER",
        symbol: "SLV",
        discountRate: 0.1,
        description: "Ưu đãi nhẹ cho khách hàng quay lại.",
        benefit: "Giảm 10% trên giá sản phẩm trong giao diện demo.",
    },
    {
        id: "gold",
        label: "GOLD",
        symbol: "GLD",
        discountRate: 0.15,
        description: "Ưu đãi tốt hơn cho khách hàng thân thiết.",
        benefit: "Giảm 15% trên giá sản phẩm trong giao diện demo.",
    },
    {
        id: "premium",
        label: "PREMIUM",
        symbol: "PRM",
        discountRate: 0.2,
        description: "Hạng cao nhất cho khách hàng VIP.",
        benefit: "Giảm 20% trên giá sản phẩm trong giao diện demo.",
    },
];

export function getCustomerTierInfo(tier: CustomerTier) {
    return customerTiers.find((item) => item.id === tier) ?? customerTiers[0];
}

export function getTierPrice(price: number, tier: CustomerTier) {
    const { discountRate } = getCustomerTierInfo(tier);
    return Math.round(price * (1 - discountRate));
}

export function getTierSavings(price: number, tier: CustomerTier) {
    return price - getTierPrice(price, tier);
}

export function isCustomerTier(value: string | null): value is CustomerTier {
    return customerTiers.some((tier) => tier.id === value);
}
