import { createContainer, asClass, asValue } from "awilix";
import { TariffsRepository } from "../repositories/tariffs.repository";
import { TariffsService, WbApiService } from "../services";
import { db } from "../database/connection";

const container = createContainer();

container.register({
  db: asValue(db),
  tariffsRepository: asClass(TariffsRepository).singleton(),
  tariffsService: asClass(TariffsService).singleton(),
  wbApiService: asClass(WbApiService).singleton(),
});

export default container;
