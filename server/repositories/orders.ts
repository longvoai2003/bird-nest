import { getSql } from "@/server/db/client";
import { ensureSchema } from "@/server/db/ensure-schema";

export type OrderItemInsert = {
    productId: string;
    sku: string;
    productName: string;
    unit: string;
    unitPriceVnd: number;
    quantity: number;
    packagingId?: string;
    packagingFamilyName?: string;
    packagingVariantName?: string;
    packagingName?: string;
    packagingColor?: string;
    packagingPatternName?: string;
    packagingFeeVnd: number;
    subtotalVnd: number;
};

export type OrderInsert = {
    customerId?: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    deliveryAddress: string;
    packagingStatus: "not_required" | "optional_available" | "selected";
    subtotalVnd: number;
    estimatedTotalVnd: number;
    notes?: string;
    items: OrderItemInsert[];
};

export async function insertOrder(input: OrderInsert) {
    await ensureSchema();
    const sql = getSql();

    return sql.begin(async (tx) => {
        const [order] = await tx<{ id: string }[]>`
      insert into orders (
        customer_id,
        customer_name,
        customer_phone,
        customer_email,
        delivery_address,
        packaging_status,
        subtotal_vnd,
        estimated_total_vnd,
        notes
      ) values (
        ${input.customerId || null},
        ${input.customerName},
        ${input.customerPhone},
        ${input.customerEmail},
        ${input.deliveryAddress},
        ${input.packagingStatus},
        ${input.subtotalVnd},
        ${input.estimatedTotalVnd},
        ${input.notes || null}
      )
      returning id
    `;

        for (const item of input.items) {
            await tx`
        insert into order_items (
          order_id,
          product_id,
          sku,
          product_name,
          unit,
          unit_price_vnd,
          packaging_id,
          packaging_family_name,
          packaging_variant_name,
          packaging_name,
          packaging_color,
          packaging_pattern_name,
          packaging_fee_vnd,
          quantity,
          subtotal_vnd
        ) values (
          ${order.id},
          ${item.productId},
          ${item.sku},
          ${item.productName},
          ${item.unit},
          ${item.unitPriceVnd},
          ${item.packagingId || null},
          ${item.packagingFamilyName || null},
          ${item.packagingVariantName || null},
          ${item.packagingName || null},
          ${item.packagingColor || null},
          ${item.packagingPatternName || null},
          ${item.packagingFeeVnd},
          ${item.quantity},
          ${item.subtotalVnd}
        )
      `;
        }

        return { orderId: order.id };
    });
}
