import { ITariff } from "../models";
import { TariffsRepository } from "../repositories/tariffs.repository";

export class TariffsService {
  constructor(private readonly tariffsRepository: TariffsRepository) {}

  async saveData(date: string): Promise<void> {
    await this.tariffsRepository.saveDataFromWb(date);
  }

  async findDataForSpecifiedDate(date: string): Promise<ITariff[]> {
    return this.tariffsRepository.getRecordsWithSpecifiedDate(date);
  }
}
