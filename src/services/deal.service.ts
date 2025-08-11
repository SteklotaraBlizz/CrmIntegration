import { Deal, Contact } from "../models/index.js";
import { DealData } from "../types/index.js";

export class DealsService {
  constructor(
    private readonly dealModel: typeof Deal,
    private readonly contactModel: typeof Contact
  ) {}

  async createDeal(dealData: DealData): Promise<Deal> {
    const exists = await this.dealModel.findOne({
      where: { amoDealId: dealData.amo_deal_id },
    });
    if (exists) throw new Error("Deal already exists");

    let contactInstance;
    if (dealData.contact) {
      const contactExists = await this.contactModel.findOne({
        where: { phone: dealData.contact.phone },
      });
      if (contactExists)
        throw new Error("Contact with this phone already exists");

      contactInstance = await this.contactModel.create({
        amoContactId: dealData.contact.amo_contact_id,
        name: dealData.contact.name,
        phone: dealData.contact.phone,
      });
    }

    return await this.dealModel.create({
      amoDealId: dealData.amo_deal_id,
      title: dealData.title,
      status: dealData.status,
    });
  }
}
