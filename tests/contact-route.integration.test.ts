import { afterAll, beforeAll, beforeEach, describe, expect, test } from "bun:test";
import { POST } from "@/app/api/contact/route";
import { closeDatabase, ensureSchema, getTestSql, hasTestDatabase, resetDatabase } from "@/tests/helpers/test-db";

const describeIntegration = hasTestDatabase ? describe : describe.skip;

describeIntegration("POST /api/contact integration", () => {
  const validPayload = {
    fullName: "Nguyen Van A",
    phone: "0901234567",
    email: "customer@example.com",
    requestType: "Tư vấn thiết kế hộp quà",
    relatedProduct: "Tổ yến chưng nguyên chất",
    appointmentDate: "2026-06-10",
    appointmentTime: "14:00-16:00",
    consultationMethod: "Gọi điện",
    message: "I would like to ask about premium bird nest products.",
  };

  beforeAll(async () => {
    await ensureSchema();
  });

  beforeEach(async () => {
    await resetDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  test("writes a contact request to postgres", async () => {
    const testSql = getTestSql();

    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validPayload),
    });

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.status).toBe("received");
    expect(typeof body.contactId).toBe("string");
    expect(body.contactId.length).toBeGreaterThan(0);

    const rows = await testSql<{
      id: string;
      full_name: string;
      phone: string;
      email: string;
      message: string;
      request_type: string;
      related_product: string;
      appointment_date: string;
      appointment_time: string;
      consultation_method: string;
      status: string;
    }[]>`
      select id, full_name, phone, email, message, request_type, related_product, appointment_date::text, appointment_time, consultation_method, status
      from contact_requests
      order by created_at desc
      limit 1
    `;

    expect(rows).toHaveLength(1);
    expect(rows[0]).toEqual({
      id: body.contactId,
      full_name: validPayload.fullName,
      phone: validPayload.phone,
      email: validPayload.email,
      message: validPayload.message,
      request_type: validPayload.requestType,
      related_product: validPayload.relatedProduct,
      appointment_date: validPayload.appointmentDate,
      appointment_time: validPayload.appointmentTime,
      consultation_method: validPayload.consultationMethod,
      status: "received",
    });
  });
});
