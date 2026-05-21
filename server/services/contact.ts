import { insertContactRequest } from "@/server/repositories/contact";
import type { ContactInsert } from "@/server/repositories/contact";
import type { CreateContactInput } from "@/server/validation/contact";

type ContactRepository = (input: ContactInsert) => Promise<{ contactId: string }>;

export async function createContactRequest(input: CreateContactInput, repository?: ContactRepository) {
    const persistContactRequest = repository ?? insertContactRequest;

    const { contactId } = await persistContactRequest(input);

    return {
        contactId,
        status: "received" as const
    }

}

