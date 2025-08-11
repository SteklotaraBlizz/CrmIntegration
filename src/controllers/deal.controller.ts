// controllers/deals.controller.ts
import { Request, Response } from "express";
import { DealsService } from "../services/deal.service.js";

export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  createDeal = async (req: Request, res: Response): Promise<void> => {
    try {
      const dealData = req.body;
      const result = await this.dealsService.createDeal(dealData);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}
