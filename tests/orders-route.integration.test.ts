import { afterAll, beforeAll, beforeEach, describe, expect, test } from "bun:test";
import { POST } from "@/app/api/orders/route";
import { closeDatabase, ensureSchema, getTestSql, hasTestDatabase, resetDatabase } from "@/tests/helpers/test-db";

const describeIntegration = hasTestDatabase ? describe : describe.skip;

describeIntegration("POST /api/orders integration", () => {
  const validPayload = {
    customer: {
      fullName: "Nguyen Van A",
      phone: "0901234567",
      email: "customer@example.com",
      deliveryAddress: "123 Nguyen Van Linh, Da Nang",
    },
    items: [
      { productId: "yen-dao-cu-lao-cham", quantity: 1 },
      { productId: "to-yen-chung-nguyen-chat", quantity: 2, packagingId: "cylinder-blue-lotus" },
    ],
    notes: "Please call before delivery.",
  };

  beforeAll(async () => {
    await ensureSchema();
  });

  beforeEach(async () => {
    await resetDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  test("writes an order and packaging snapshot to postgres", async () => {
    const testSql = getTestSql();

    const request = new Request("http://localhost/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validPayload),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.status).toBe("received");
    expect(typeof body.orderId).toBe("string");
    expect(body.orderId.length).toBeGreaterThan(0);
    expect(body.subtotalVnd).toBe(4_340_000);
    expect(body.estimatedTotalVnd).toBe(4_340_000);

    const orders = await testSql<{
      id: string;
      customer_name: string;
      packaging_status: string;
      subtotal_vnd: number;
      estimated_total_vnd: number;
      notes: string | null;
      status: string;
    }[]>`
      select id, customer_name, packaging_status, subtotal_vnd, estimated_total_vnd, notes, status
      from orders
      order by created_at desc
      limit 1
    `;

    expect(orders).toHaveLength(1);
    expect(orders[0]).toEqual({
      id: body.orderId,
      customer_name: validPayload.customer.fullName,
      packaging_status: "selected",
      subtotal_vnd: 4_340_000,
      estimated_total_vnd: 4_340_000,
      notes: validPayload.notes,
      status: "received",
    });

    const orderItems = await testSql<{
      product_id: string;
      packaging_id: string | null;
      packaging_family_name: string | null;
      packaging_variant_name: string | null;
      packaging_name: string | null;
      packaging_color: string | null;
      packaging_pattern_name: string | null;
      packaging_fee_vnd: number;
      quantity: number;
      subtotal_vnd: number;
    }[]>`
      select product_id, packaging_id, packaging_family_name, packaging_variant_name, packaging_name, packaging_color, packaging_pattern_name, packaging_fee_vnd, quantity, subtotal_vnd
      from order_items
      order by product_id asc
    `;

    expect(Array.from(orderItems)).toEqual([
      {
        product_id: "to-yen-chung-nguyen-chat",
        packaging_id: "cylinder-blue-lotus",
        packaging_family_name: "Cylinder package",
        packaging_variant_name: "Cylinder Blue Hoa sen",
        packaging_name: "Cylinder package - Blue - Hoa sen",
        packaging_color: "Blue",
        packaging_pattern_name: "Hoa sen",
        packaging_fee_vnd: 120_000,
        quantity: 2,
        subtotal_vnd: 1_140_000,
      },
      {
        product_id: "yen-dao-cu-lao-cham",
        packaging_id: null,
        packaging_family_name: null,
        packaging_variant_name: null,
        packaging_name: null,
        packaging_color: null,
        packaging_pattern_name: null,
        packaging_fee_vnd: 0,
        quantity: 1,
        subtotal_vnd: 3_200_000,
      },
    ]);
  });
});
