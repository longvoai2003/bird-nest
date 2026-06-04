import type { CartLine } from "@/features/cart/context/cart-context";
import { packagingOptions } from "@/shared/catalog/packaging";
import type { Product } from "@/shared/catalog/products";
import { formatCurrency } from "@/shared/utils/currency";

type OrderSummaryProps = {
  lines: Array<CartLine & { product: Product }>;
  subtotal: number;
};

export function OrderSummary({ lines, subtotal }: OrderSummaryProps) {
  return (
    <aside className="card orderSummary">
      <h2>Tóm tắt đơn hàng</h2>
      {lines.map((line) => {
        const packaging = packagingOptions.find((item) => item.id === line.packagingId);

        return (
          <div className="summaryGroup" key={`${line.productId}-${line.packagingId ?? "default"}`}>
            <div className="summaryLine">
              <span>{line.product.name} x {line.quantity}</span>
              <strong>{formatCurrency(line.product.price * line.quantity)}</strong>
            </div>
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
      <div className="summaryLine"><span>Tạm tính</span><strong>{formatCurrency(subtotal)}</strong></div>
      <div className="summaryTotal"><span>Tổng dự kiến</span><strong>{formatCurrency(subtotal)}</strong></div>
    </aside>
  );
}
