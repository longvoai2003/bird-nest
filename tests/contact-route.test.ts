import { describe, expect, test } from "bun:test";
import { POST } from "@/app/api/contact/route";

describe("POST /api/contact", () => {
  const invalidPayload = {
    fullName: "A",
    phone: "bad",
    email: "bad",
    message: "short",
  };

  test("returns 400 for invalid JSON body", async () => {
    const request = new Request("http://localhost/api/contact", {
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
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invalidPayload),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe("Invalid contact payload");
    expect(Array.isArray(body.issues)).toBe(true);
    expect(body.issues.length).toBeGreaterThan(0);
  });
});
