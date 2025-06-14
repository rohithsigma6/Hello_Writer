import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { createContactService, getContactsService } from "../services/contact/contact.service";

const createContact = asyncHandler(async (req: Request, res: Response) => {
    const { firstName, lastName, phoneNo, email, message } = req.body;
    try {
        await createContactService({ firstName, lastName, phoneNo, email, message });
        res.status(201).json({ success: true, message: "Contact created successfully" });
    } catch (error) {
        console.error("Error creating contact:", error);
        res.status(500).json({ success: false, message: "An error occurred while creating the contact" });
    }
});
const getContacts = asyncHandler(async (req: Request, res: Response) => {
    try {
        const contacts = await getContactsService();
        res.status(200).json({ success: true, message: "Contact created successfully", contacts });
    } catch (error) {
        console.error("Error creating contact:", error);
        res.status(500).json({ success: false, message: "An error occurred while fatching the contact" });
    }
});

export default {
    createContact,
    getContacts
};
