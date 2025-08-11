// controllers/contacts.controller.ts
import { Request, Response } from "express";
import { ContactsService } from "../services/contact.service.js";

export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  createContact = async (req: Request, res: Response): Promise<void> => {
    try {
      const contactData = req.body;
      const result = await this.contactsService.createContact(contactData);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}
