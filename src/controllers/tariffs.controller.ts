import { GET, route } from "awilix-express";
import { TariffsService, WbApiService } from "../services";
import { Request, Response, NextFunction } from "express";
import container from "../container/di-container";
import { TariffsRepository } from "../repositories/tariffs.repository";
import { db } from "../database/connection";

export const saveDataToDb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const tariffsService = container.resolve<TariffsService>("TariffsService");
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
