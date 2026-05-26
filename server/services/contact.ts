import { insertContactRequest } from "@/server/repositories/contact";
import type { ContactInsert } from "@/server/repositories/contact";
import type { CreateContactInput } from "@/server/validation/contact";

type ContactRepository = (input: ContactInsert) => Promise<{ contactId: string }>;

export async function createContactRequest(input: CreateContactInput, customerIdOrRepository?: string | ContactRepository, repository?: ContactRepository) {
    const customerId = typeof customerIdOrRepository === "string" ? customerIdOrRepository : undefined;
    const persistContactRequest = repository ?? (typeof customerIdOrRepository === "function" ? customerIdOrRepository : insertContactRequest);

    const { contactId } = await persistContactRequest({ ...input, customerId });

    return {
        contactId,
        status: "received" as const
    }

}
