import type { CartLine } from "@/features/cart/context/cart-context";
import { packagingOptions } from "@/shared/catalog/packaging";
import type { Product } from "@/shared/catalog/products";
import { getCustomerTierInfo, getTierPrice, getTierSavings, type CustomerTier } from "@/shared/customer-tiers";
import { formatCurrency } from "@/shared/utils/currency";

type OrderSummaryProps = {
  lines: Array<CartLine & { product: Product }>;
  subtotal: number;
  customerTier: CustomerTier;
};

export function OrderSummary({ lines, subtotal, customerTier }: OrderSummaryProps) {
  const tierInfo = getCustomerTierInfo(customerTier);
  const totalSavings = lines.reduce((total, line) => total + getTierSavings(line.product.price, customerTier) * line.quantity, 0);

  return (
    <aside className="card orderSummary">
      <h2>Tóm tắt đơn hàng</h2>
      {lines.map((line) => {
        const packaging = packagingOptions.find((item) => item.id === line.packagingId);

        return (
          <div className="summaryGroup" key={`${line.productId}-${line.packagingId ?? "default"}`}>
            <div className="summaryLine">
              <span>{line.product.name} x {line.quantity}</span>
              <strong>{formatCurrency(getTierPrice(line.product.price, customerTier) * line.quantity)}</strong>
            </div>
            {tierInfo.discountRate > 0 ? (
              <div className="summaryLine summaryPackagingLine">
                <span>{tierInfo.label} discount</span>
                <strong>-{formatCurrency(getTierSavings(line.product.price, customerTier) * line.quantity)}</strong>
              </div>
            ) : null}
            {packaging ? (
              <div className="summaryLine summaryPackagingLine">
                <span>
                  Hộp quà: {packaging.family.name} - {packaging.name} x {line.quantity}
                </span>
                <strong>{formatCurrency(packaging.price * line.quantity)}</strong>
              </div>
            ) : null}
          </div>
        );
      })}
      {tierInfo.discountRate > 0 ? <div className="summaryLine"><span>Tổng ưu đãi {tierInfo.label}</span><strong>-{formatCurrency(totalSavings)}</strong></div> : null}
      <div className="summaryLine"><span>Tạm tính</span><strong>{formatCurrency(subtotal)}</strong></div>
      <div className="summaryTotal"><span>Tổng dự kiến</span><strong>{formatCurrency(subtotal)}</strong></div>
    </aside>
  );
}
