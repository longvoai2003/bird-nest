import { describe, expect, test } from "bun:test";
import { createContactRequest } from "@/server/services/contact";
import { CreateContactInput } from "@/server/validation/contact";


describe("createContactRequest", () => {
    const validInput = {
        fullName: "Nguyen Van A",
        phone: "0901234567",
        email: "customer@example.com",
        message: "I would like to ask about premium bird nest products.",
    }
    test("passes the validated contact payload to the repository", async () => {
        let capturedInput: CreateContactInput | undefined;
        await createContactRequest(validInput, async (repoInput) => {
            capturedInput = repoInput;
            return { contactId: "contact-123" }
        })

        expect(capturedInput).toEqual(validInput);
    });

    test("returns the created contact id with received status", async () => {
        const result = await createContactRequest(validInput, async () => {
            return { contactId: "contact-123" }
        })

        expect(result).toEqual({
            contactId: "contact-123",
            status: "received"
        })
    })

    test("rethrows repository errors", async () => {
        await expect(
            createContactRequest(validInput, async () => {
                throw new Error("database failed");
            }),
        ).rejects.toThrow("database failed");
    });

});
