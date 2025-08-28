import { TariffsService, WbApiService } from "../services";
import { Request, Response, NextFunction } from "express";
import { db } from "../container/di-container";
import { TariffsRepository } from "../repositories/tariffs.repository";

export const saveDataToDb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const wbApiService = new WbApiService();
    const tariffsRepository = new TariffsRepository(db, wbApiService);
    const tariffsService = new TariffsService(tariffsRepository);
    const date = req.query.date as string;

    await tariffsService.saveData(date);

    res.status(201).json({ message: "success" });
  } catch (err) {
    next(err);
  }
};
