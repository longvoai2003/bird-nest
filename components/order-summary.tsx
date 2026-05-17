import { formatCurrency } from "@/data/products";
import type { Packaging } from "@/data/packaging";
import type { CartLine } from "@/context/cart-context";
import type { Product } from "@/data/products";

type OrderSummaryProps = {
  lines: Array<CartLine & { product: Product }>;
  subtotal: number;
  packaging?: Packaging;
};

export function OrderSummary({ lines, subtotal, packaging }: OrderSummaryProps) {
  const packagingFee = packaging?.price ?? 0;
  const total = subtotal + packagingFee;

  return (
    <aside className="card orderSummary">
      <h2>Order summary</h2>
      {lines.map((line) => (
        <div className="summaryLine" key={line.productId}>
          <span>{line.product.name} x {line.quantity}</span>
          <strong>{formatCurrency(line.product.price * line.quantity)}</strong>
        </div>
      ))}
      <div className="summaryLine"><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></div>
      <div className="summaryLine"><span>{packaging ? packaging.name : "Packaging not selected"}</span><strong>{formatCurrency(packagingFee)}</strong></div>
      <div className="summaryTotal"><span>Estimated total</span><strong>{formatCurrency(total)}</strong></div>
    </aside>
  );
}
