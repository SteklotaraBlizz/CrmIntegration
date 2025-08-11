// services/contacts.service.ts
import { Contact } from "../models/index.js";
import { ContactData } from "../types/index.js";

export class ContactsService {
  constructor(private readonly contactModel: typeof Contact) {}

  async createContact(contactData: ContactData): Promise<Contact> {
    const exists = await this.contactModel.findOne({
      where: { phone: contactData.phone },
    });
    if (exists) throw new Error("Contact already exists");

    return await this.contactModel.create({
      amoContactId: contactData.amo_contact_id,
      name: contactData.name,
      phone: contactData.phone,
    });
  }
}
