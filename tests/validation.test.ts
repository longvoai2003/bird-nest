import { describe, expect, test } from "bun:test";
import { createContactSchema } from "@/server/validation/contact";
import { createOrderSchema } from "@/server/validation/orders";

const validOrder = {
  customer: {
    fullName: "Nguyen Van A",
    phone: "0901234567",
    email: "customer@example.com",
    deliveryAddress: "123 Nguyen Van Linh, Da Nang",
  },
  items: [{ productId: "yen-dao-cu-lao-cham", quantity: 2 }],
  notes: "Please call before delivery.",
};

describe("createOrderSchema", () => {
  test("accepts a valid order payload", () => {
    expect(createOrderSchema.safeParse(validOrder).success).toBe(true);
  });

  test("rejects invalid customer fields", () => {
    const result = createOrderSchema.safeParse({
      ...validOrder,
      customer: { ...validOrder.customer, fullName: "A", phone: "abc", email: "bad", deliveryAddress: "short" },
    });

    expect(result.success).toBe(false);
  });

  test("rejects empty items and invalid quantities", () => {
    expect(createOrderSchema.safeParse({ ...validOrder, items: [] }).success).toBe(false);
    expect(createOrderSchema.safeParse({ ...validOrder, items: [{ productId: "yen-dao-cu-lao-cham", quantity: 0 }] }).success).toBe(false);
    expect(createOrderSchema.safeParse({ ...validOrder, items: [{ productId: "yen-dao-cu-lao-cham", quantity: 100 }] }).success).toBe(false);
  });

  test("accepts optional packaging per item", () => {
    expect(createOrderSchema.safeParse({
      ...validOrder,
      items: [{ productId: "to-yen-chung-nguyen-chat", quantity: 1, packagingId: "hexagon-blue-lotus" }],
    }).success).toBe(true);
  });
});

describe("createContactSchema", () => {
  const validContact = {
    fullName: "Nguyen Van A",
    phone: "0901234567",
    email: "customer@example.com",
    message: "I would like to ask about premium bird nest products.",
  };

  test("accepts a valid contact payload", () => {
    expect(createContactSchema.safeParse(validContact).success).toBe(true);
  });

  test("accepts contact appointment details", () => {
    expect(createContactSchema.safeParse({
      ...validContact,
      requestType: "Tư vấn thiết kế hộp quà",
      relatedProduct: "Tổ yến chưng nguyên chất",
      appointmentDate: "2026-06-10",
      appointmentTime: "14:00-16:00",
      consultationMethod: "Gọi điện",
    }).success).toBe(true);
  });

  test("rejects invalid contact fields", () => {
    const result = createContactSchema.safeParse({
      fullName: "A",
      phone: "invalid",
      email: "bad",
      message: "too short",
      appointmentDate: "10/06/2026",
    });

    expect(result.success).toBe(false);
  });
});
