import { createContainer, asClass, asValue, InjectionMode } from "awilix";
import { TariffsRepository } from "../repositories/tariffs.repository";
import { TariffsService, WbApiService } from "../services";
import knex, { Knex } from "knex";
import knexConfig from "../knexfile";

const container = createContainer();
export const db: Knex = knex(knexConfig);

container.options = {
  injectionMode: InjectionMode.PROXY,
};

container.register({
  db: asValue(db),
  TariffsService: asClass(TariffsService).singleton(),
  TariffsRepository: asClass(TariffsRepository).singleton(),
  WbApiService: asClass(WbApiService).singleton(),
});

export default container;
