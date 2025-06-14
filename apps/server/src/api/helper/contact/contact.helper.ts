import Contact, { IContact } from "../../models/contact.model";

export const createContact = async (contactData: IContact): Promise<void> => {
    try {
        await Contact.findOneAndUpdate(
            {
                $or: [
                    { email: contactData.email },   // Match by email
                    { phoneNo: contactData.phoneNo } // Match by phone number
                ]
            },
            contactData, // Update with new data
            { upsert: true, new: true } // Upsert: insert if not exists
        );
    } catch (error) {
        console.error("Error creating contact:", error);
        throw new Error("Unable to create contact");
    }
};
export const getContacts = async (): Promise<IContact[]> => {
    try {
        return await Contact.find({});
    } catch (error) {
        console.error("Error creating contact:", error);
        throw new Error("Unable to create contact");
    }
};
