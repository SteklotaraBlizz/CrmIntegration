import { WebhookEvent } from "../models/index.js";
import { WebhookPayload } from "../types/index.js";

export class WebhooksService {
  constructor(private readonly webhookEventModel: typeof WebhookEvent) {}

  async logWebhookEvent(payload: WebhookPayload): Promise<WebhookEvent> {
    return await this.webhookEventModel.create({
      eventType: payload.type,
      entityId: payload.object.id,
      data: payload.object,
    });
  }
}
