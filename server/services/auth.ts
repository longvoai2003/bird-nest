import { randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";
import { insertCustomer, findCustomerByEmail, toPublicCustomer } from "@/server/repositories/customers";
import { deleteSession, findCustomerBySessionToken, insertSession } from "@/server/repositories/sessions";
import type { RegisterInput, SignInInput } from "@/server/validation/auth";

export const sessionMaxAgeSeconds = 60 * 60 * 24 * 30;
const passwordSaltRounds = 12;

export class AuthInputError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "AuthInputError";
    }
}

function createSessionToken() {
    return randomBytes(32).toString("base64url");
}

async function createSession(customerId: string) {
    const token = createSessionToken();
    const expiresAt = new Date(Date.now() + sessionMaxAgeSeconds * 1000);

    await insertSession({ customerId, token, expiresAt });

    return { token, expiresAt };
}

export async function registerCustomer(input: RegisterInput) {
    const existingCustomer = await findCustomerByEmail(input.email);

    if (existingCustomer) {
        throw new AuthInputError("Email is already registered");
    }

    const passwordHash = await bcrypt.hash(input.password, passwordSaltRounds);
    const customer = await insertCustomer({
        fullName: input.fullName,
        phone: input.phone,
        email: input.email,
        passwordHash,
    });
    const session = await createSession(customer.id);

    return { customer: toPublicCustomer(customer), session };
}

export async function signInCustomer(input: SignInInput) {
    const customer = await findCustomerByEmail(input.email);

    if (!customer || !(await bcrypt.compare(input.password, customer.passwordHash))) {
        throw new AuthInputError("Email or password is incorrect");
    }

    const session = await createSession(customer.id);

    return { customer: toPublicCustomer(customer), session };
}

export async function signOutCustomer(token?: string | null) {
    if (token) {
        await deleteSession(token);
    }
}

export async function getCustomerForSession(token?: string | null) {
    if (!token) {
        return null;
    }

    return findCustomerBySessionToken(token);
}
