import { describe, expect, test } from "bun:test";
import { POST } from "@/app/api/orders/route";

describe("POST /api/orders", () => {
  test("returns 400 for invalid JSON body", async () => {
    const request = new Request("http://localhost/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: "{ bad json",
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toEqual({ error: "Invalid JSON payload" });
  });

  test("returns 400 for invalid payload", async () => {
    const request = new Request("http://localhost/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer: {
          fullName: "A",
          phone: "bad",
          email: "bad",
          deliveryAddress: "short",
        },
        items: [],
      }),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("Invalid order payload");
    expect(Array.isArray(body.issues)).toBe(true);
    expect(body.issues.length).toBeGreaterThan(0);
  });

  test("returns 400 for unknown packaging", async () => {
    const request = new Request("http://localhost/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer: {
          fullName: "Nguyen Van A",
          phone: "0901234567",
          email: "customer@example.com",
          deliveryAddress: "123 Nguyen Van Linh, Da Nang",
        },
        items: [{ productId: "to-yen-chung-nguyen-chat", quantity: 1, packagingId: "missing" }],
        notes: "Please call before delivery.",
      }),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toEqual({ error: "Selected packaging is not available" });
  });

  test("returns 400 when unsupported product uses packaging", async () => {
    const request = new Request("http://localhost/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer: {
          fullName: "Nguyen Van A",
          phone: "0901234567",
          email: "customer@example.com",
          deliveryAddress: "123 Nguyen Van Linh, Da Nang",
        },
        items: [{ productId: "yen-dao-cu-lao-cham", quantity: 1, packagingId: "hexagon-teal-gold" }],
        notes: "Please call before delivery.",
      }),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toEqual({ error: "Yến đảo Cù Lao Chàm does not support packaging selection" });
  });
});
