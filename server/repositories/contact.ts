import { getSql } from "@/server/db/client";

export type ContactInsert = {
    customerId?: string;
    fullName: string;
    phone: string;
    email: string;
    message: string;
    requestType?: string;
    relatedProduct?: string;
    appointmentDate?: string;
    appointmentTime?: string;
    consultationMethod?: string;
};

function optionalValue(value?: string) {
    return value?.trim() || null;
}

export async function insertContactRequest(input: ContactInsert) {
    const sql = getSql();

    const [contact] = await sql<{ id: string }[]>`
    insert into contact_requests (
      customer_id,
      full_name,
      phone,
      email,
      message,
      request_type,
      related_product,
      appointment_date,
      appointment_time,
      consultation_method
    )
    values (
      ${input.customerId || null},
      ${input.fullName},
      ${input.phone},
      ${input.email},
      ${input.message},
      ${optionalValue(input.requestType)},
      ${optionalValue(input.relatedProduct)},
      ${optionalValue(input.appointmentDate)},
      ${optionalValue(input.appointmentTime)},
      ${optionalValue(input.consultationMethod)}
    )
    returning id
  `;

    return { contactId: contact.id };
}
