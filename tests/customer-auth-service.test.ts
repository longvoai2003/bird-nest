import { beforeEach, describe, expect, mock, test } from "bun:test";
import type { RegisterInput, SignInInput } from "@/server/validation/auth";

const defaultPublicCustomer = (customer: { id: string; fullName: string; phone: string; email: string }) => ({
  id: customer.id,
  fullName: customer.fullName,
  phone: customer.phone,
  email: customer.email,
});

const customers = {
  findCustomerByEmail: mock(async () => null),
  insertCustomer: mock(async (customer) => ({ id: "customer-123", ...customer })),
  toPublicCustomer: mock(defaultPublicCustomer),
};

const sessions = {
  deleteSession: mock(async () => undefined),
  findCustomerBySessionToken: mock(async () => null),
  insertSession: mock(async () => undefined),
};

const bcrypt = {
  default: {
    hash: mock(async () => "hashed-secret123"),
    compare: mock(async () => true),
  },
};

mock.module("@/server/repositories/customers", () => customers);
mock.module("@/server/repositories/sessions", () => sessions);
mock.module("bcryptjs", () => bcrypt);

const signupInput: RegisterInput = {
  fullName: "Nguyen Van A",
  phone: "0901234567",
  email: "customer@example.com",
  password: "secret123",
};

const loginInput: SignInInput = {
  email: "customer@example.com",
  password: "secret123",
};

beforeEach(() => {
  customers.findCustomerByEmail.mockClear();
  customers.insertCustomer.mockClear();
  customers.toPublicCustomer.mockClear();
  sessions.deleteSession.mockClear();
  sessions.findCustomerBySessionToken.mockClear();
  sessions.insertSession.mockClear();
  customers.findCustomerByEmail.mockImplementation(async () => null);
  customers.insertCustomer.mockImplementation(async (customer) => ({ id: "customer-123", ...customer }));
  customers.toPublicCustomer.mockImplementation(defaultPublicCustomer);
  sessions.deleteSession.mockImplementation(async () => undefined);
  sessions.findCustomerBySessionToken.mockImplementation(async () => null);
  sessions.insertSession.mockImplementation(async () => undefined);
  bcrypt.default.hash.mockClear();
  bcrypt.default.compare.mockClear();
  bcrypt.default.hash.mockImplementation(async () => "hashed-secret123");
  bcrypt.default.compare.mockImplementation(async () => true);
});

describe("registerCustomer", () => {
  test("hashes the password and creates a customer session", async () => {
    const { registerCustomer } = await import("@/server/services/auth");

    const result = await registerCustomer(signupInput);

    expect(customers.findCustomerByEmail).toHaveBeenCalledWith(signupInput.email);
    expect(bcrypt.default.hash).toHaveBeenCalledWith(signupInput.password, 12);
    expect(customers.insertCustomer).toHaveBeenCalledWith({
      fullName: signupInput.fullName,
      phone: signupInput.phone,
      email: signupInput.email,
      passwordHash: "hashed-secret123",
    });
    expect(sessions.insertSession).toHaveBeenCalledTimes(1);
    expect(sessions.insertSession.mock.calls[0][0].customerId).toBe("customer-123");
    expect(sessions.insertSession.mock.calls[0][0].token).toBeString();
    expect(sessions.insertSession.mock.calls[0][0].expiresAt).toBeInstanceOf(Date);

    expect(result).toEqual({
      customer: { id: "customer-123", fullName: signupInput.fullName, phone: signupInput.phone, email: signupInput.email },
      session: {
        token: expect.any(String),
        expiresAt: expect.any(Date),
      },
    });
  });

  test("rejects duplicate customer emails", async () => {
    customers.findCustomerByEmail.mockResolvedValue({ id: "existing-customer" });
    const { AuthInputError, registerCustomer } = await import("@/server/services/auth");

    await expect(registerCustomer(signupInput)).rejects.toThrow(AuthInputError);
    expect(customers.insertCustomer).not.toHaveBeenCalled();
    expect(sessions.insertSession).not.toHaveBeenCalled();
  });
});

describe("signInCustomer", () => {
  test("verifies the password and creates a customer session", async () => {
    customers.findCustomerByEmail.mockResolvedValue({
      id: "customer-123",
      fullName: "Nguyen Van A",
      phone: "0901234567",
      email: loginInput.email,
      passwordHash: "hashed-secret123",
    });
    const { signInCustomer } = await import("@/server/services/auth");

    const result = await signInCustomer(loginInput);

    expect(customers.findCustomerByEmail).toHaveBeenCalledWith(loginInput.email);
    expect(bcrypt.default.compare).toHaveBeenCalledWith(loginInput.password, "hashed-secret123");
    expect(sessions.insertSession.mock.calls[0][0].customerId).toBe("customer-123");

    expect(result).toEqual({
      customer: { id: "customer-123", fullName: "Nguyen Van A", phone: "0901234567", email: loginInput.email },
      session: {
        token: expect.any(String),
        expiresAt: expect.any(Date),
      },
    });
  });

  test("rejects unknown customers", async () => {
    const { AuthInputError, signInCustomer } = await import("@/server/services/auth");

    await expect(signInCustomer(loginInput)).rejects.toThrow(AuthInputError);
    expect(sessions.insertSession).not.toHaveBeenCalled();
  });

  test("rejects invalid passwords without creating a session", async () => {
    customers.findCustomerByEmail.mockResolvedValue({
      id: "customer-123",
      fullName: "Nguyen Van A",
      phone: "0901234567",
      email: loginInput.email,
      passwordHash: "hashed-secret123",
    });
    bcrypt.default.compare.mockResolvedValue(false);
    const { AuthInputError, signInCustomer } = await import("@/server/services/auth");

    await expect(signInCustomer(loginInput)).rejects.toThrow(AuthInputError);
    expect(sessions.insertSession).not.toHaveBeenCalled();
  });
});
