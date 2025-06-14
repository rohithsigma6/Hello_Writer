import { createContact, getContacts } from "../../helper/contact/contact.helper";
import { IContact } from "../../models/contact.model";

export const createContactService = async (contactData: any): Promise<void> => {
    try {
        await createContact(contactData);
    } catch (error) {
        console.error("Error in createContactService:", error);
        throw new Error("Failed to process contact creation");
    }
};
export const getContactsService = async (): Promise<IContact[]> => {
    try {
        return await getContacts();
    } catch (error) {
        console.error("Error in createContactService:", error);
        throw new Error("Failed to process contact creation");
    }
};
