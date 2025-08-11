// controllers/webhooks.controller.ts
import { Request, Response } from "express";
import { WebhooksService } from "../services/webhook.service.js";

export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  handleWebhook = async (req: Request, res: Response): Promise<void> => {
    try {
      const payload = req.body;
      await this.webhooksService.logWebhookEvent(payload);
      res.status(200).send("OK");
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
