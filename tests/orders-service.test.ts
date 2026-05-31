import { describe, expect, test } from "bun:test";
import { buildOrderInsert, createOrder, OrderInputError } from "@/server/services/orders";
import type { CreateOrderInput } from "@/server/validation/orders";

const validInput: CreateOrderInput = {
  customer: {
    fullName: "Nguyen Van A",
    phone: "0901234567",
    email: "customer@example.com",
    deliveryAddress: "123 Nguyen Van Linh, Da Nang",
  },
  items: [
    { productId: "yen-dao-cu-lao-cham", quantity: 1 },
    { productId: "to-yen-chung-nguyen-chat", quantity: 2, packagingId: "hexagon-blue" },
  ],
  notes: "Please call before delivery.",
};

describe("buildOrderInsert", () => {
  test("calculates totals from trusted catalog data", () => {
    const order = buildOrderInsert(validInput);

    expect(order.subtotalVnd).toBe(4_340_000);
    expect(order.estimatedTotalVnd).toBe(4_340_000);
    expect(order.packagingStatus).toBe("selected");
    expect(order.items).toHaveLength(2);
    expect(order.items[0].sku).toBe("YSTS-YDCLC-001");
    expect(order.items[1].packagingFamilyName).toBe("Hexagon package");
    expect(order.items[1].packagingVariantName).toBe("Hexagon Blue");
    expect(order.items[1].packagingName).toBe("Hexagon package - Hexagon Blue");
    expect(order.items[1].packagingFeeVnd).toBe(120_000);
  });

  test("merges duplicate product lines", () => {
    const order = buildOrderInsert({
      ...validInput,
      items: [
        { productId: "yen-dao-cu-lao-cham", quantity: 1 },
        { productId: "yen-dao-cu-lao-cham", quantity: 2 },
      ],
    });

    expect(order.items).toHaveLength(1);
    expect(order.items[0].quantity).toBe(3);
    expect(order.subtotalVnd).toBe(9_600_000);
  });

  test("keeps packaged and non-packaged lines separate", () => {
    const order = buildOrderInsert({
      ...validInput,
      items: [
        { productId: "to-yen-chung-nguyen-chat", quantity: 1 },
        { productId: "to-yen-chung-nguyen-chat", quantity: 1, packagingId: "hexagon-blue" },
      ],
    });

    expect(order.items).toHaveLength(2);
    expect(order.packagingStatus).toBe("selected");
  });

  test("marks packaging-eligible orders without a packaging choice as optional available", () => {
    const order = buildOrderInsert({
      ...validInput,
      items: [{ productId: "to-yen-chung-nguyen-chat", quantity: 1 }],
    });

    expect(order.packagingStatus).toBe("optional_available");
  });

  test("marks orders without packaging-eligible products as not required", () => {
    const order = buildOrderInsert({
      ...validInput,
      items: [{ productId: "yen-dao-cu-lao-cham", quantity: 1 }],
    });

    expect(order.packagingStatus).toBe("not_required");
  });

  test("rejects unknown products and packaging", () => {
    expect(() => buildOrderInsert({ ...validInput, items: [{ productId: "missing", quantity: 1 }] })).toThrow(OrderInputError);
    expect(() => buildOrderInsert({
      ...validInput,
      items: [{ productId: "to-yen-chung-nguyen-chat", quantity: 1, packagingId: "missing" }],
    })).toThrow(OrderInputError);
  });

  test("rejects packaging on unsupported products", () => {
    expect(() => buildOrderInsert({
      ...validInput,
      items: [{ productId: "yen-dao-cu-lao-cham", quantity: 1, packagingId: "hexagon-blue" }],
    })).toThrow(OrderInputError);
  });
});

describe("createOrder", () => {
  test("persists the calculated order through the repository", async () => {
    const result = await createOrder(validInput, async (order) => {
      expect(order.estimatedTotalVnd).toBe(4_340_000);
      expect(order.packagingStatus).toBe("selected");
      return { orderId: "order-123" };
    });

    expect(result).toEqual({
      orderId: "order-123",
      status: "received",
      subtotalVnd: 4_340_000,
      estimatedTotalVnd: 4_340_000,
    });
  });
});
