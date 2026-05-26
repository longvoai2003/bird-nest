import { describe, expect, test } from "bun:test";
import { registerSchema, signInSchema } from "@/server/validation/auth";

const validSignup = {
  fullName: "Nguyen Van A",
  phone: "0901234567",
  email: "customer@example.com",
  password: "secret123",
};

describe("registerSchema", () => {
  test("accepts a valid lightweight customer signup payload", () => {
    expect(registerSchema.safeParse(validSignup).success).toBe(true);
  });

  test("trims customer identity fields", () => {
    const result = registerSchema.parse({
      fullName: "  Nguyen Van A  ",
      phone: "  0901234567  ",
      email: "  customer@example.com  ",
      password: "secret123",
    });

    expect(result.fullName).toBe("Nguyen Van A");
    expect(result.phone).toBe("0901234567");
    expect(result.email).toBe("customer@example.com");
  });

  test("rejects invalid signup fields", () => {
    const result = registerSchema.safeParse({
      fullName: "A",
      phone: "invalid",
      email: "bad",
      password: "short",
    });

    expect(result.success).toBe(false);
  });
});

describe("signInSchema", () => {
  test("accepts a valid lightweight customer login payload", () => {
    expect(signInSchema.safeParse({ email: "customer@example.com", password: "secret123" }).success).toBe(true);
  });

  test("rejects invalid email and missing password", () => {
    const result = signInSchema.safeParse({ email: "bad", password: "" });

    expect(result.success).toBe(false);
  });
});
