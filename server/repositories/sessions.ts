import { getSql } from "@/server/db/client";
import { ensureSchema } from "@/server/db/ensure-schema";

export const sessionCookieName = "bird_nest_session";

export type SessionCustomer = {
    id: string;
    fullName: string;
    phone: string;
    email: string;
};

type SessionCustomerRow = {
    id: string;
    full_name: string;
    phone: string;
    email: string;
};

export async function insertSession(input: { customerId: string; token: string; expiresAt: Date }) {
    await ensureSchema();
    const sql = getSql();

    await sql`
        insert into customer_sessions (customer_id, token, expires_at)
        values (${input.customerId}, ${input.token}, ${input.expiresAt})
    `;
}

export async function deleteSession(token: string) {
    await ensureSchema();
    const sql = getSql();

    await sql`delete from customer_sessions where token = ${token}`;
}

export async function findCustomerBySessionToken(token: string) {
    await ensureSchema();
    const sql = getSql();
    const [customer] = await sql<SessionCustomerRow[]>`
        select c.id, c.full_name, c.phone, c.email
        from customer_sessions s
        join customers c on c.id = s.customer_id
        where s.token = ${token}
          and s.expires_at > now()
        limit 1
    `;

    if (!customer) {
        return null;
    }

    return {
        id: customer.id,
        fullName: customer.full_name,
        phone: customer.phone,
        email: customer.email,
    };
}
