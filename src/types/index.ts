export interface DealData {
  amo_deal_id: number;
  title: string;
  status: string;
  contact?: ContactData;
}

export interface ContactData {
  amo_contact_id: number;
  name: string;
  phone: string;
}

export interface WebhookPayload {
  type: "deal_created" | "deal_updated" | "contact_created" | "contact_updated";
  object: {
    id: number;
    [key: string]: any;
  };
}
