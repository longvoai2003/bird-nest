import { getSql } from "@/server/db/client";
import { ensureSchema } from "@/server/db/ensure-schema";

export type Customer = {
    id: string;
    fullName: string;
    phone: string;
    email: string;
    passwordHash: string;
};

export type PublicCustomer = Omit<Customer, "passwordHash">;

type CustomerRow = {
    id: string;
    full_name: string;
    phone: string;
    email: string;
    password_hash: string;
};

function mapCustomer(row: CustomerRow): Customer {
    return {
        id: row.id,
        fullName: row.full_name,
        phone: row.phone,
        email: row.email,
        passwordHash: row.password_hash,
    };
}

export function toPublicCustomer(customer: Customer): PublicCustomer {
    return {
        id: customer.id,
        fullName: customer.fullName,
        phone: customer.phone,
        email: customer.email,
    };
}

export async function findCustomerByEmail(email: string) {
    await ensureSchema();
    const sql = getSql();
    const [customer] = await sql<CustomerRow[]>`
        select id, full_name, phone, email, password_hash
        from customers
        where email = lower(${email})
        limit 1
    `;

    return customer ? mapCustomer(customer) : null;
}

export async function findCustomerById(id: string) {
    await ensureSchema();
    const sql = getSql();
    const [customer] = await sql<CustomerRow[]>`
        select id, full_name, phone, email, password_hash
        from customers
        where id = ${id}
        limit 1
    `;

    return customer ? mapCustomer(customer) : null;
}

export async function insertCustomer(input: { fullName: string; phone: string; email: string; passwordHash: string }) {
    await ensureSchema();
    const sql = getSql();
    const [customer] = await sql<CustomerRow[]>`
        insert into customers (full_name, phone, email, password_hash)
        values (${input.fullName}, ${input.phone}, lower(${input.email}), ${input.passwordHash})
        returning id, full_name, phone, email, password_hash
    `;

    return mapCustomer(customer);
}
