import { getSql } from "@/server/db/client";

export type ContactInsert = {
    fullName: string;
    phone: string;
    email: string;
    message: string;
};

export async function insertContactRequest(input: ContactInsert) {
    const sql = getSql();

    const [contact] = await sql<{ id: string }[]>`
    insert into contact_requests (full_name, phone, email, message)
    values (${input.fullName}, ${input.phone}, ${input.email}, ${input.message})
    returning id
  `;

    return { contactId: contact.id };
}
