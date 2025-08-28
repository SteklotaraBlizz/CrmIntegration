import { Knex } from "knex";
import { WbApiService } from "../services";
import { ITariff } from "../models";
import { DbClient } from "../database/connection";

export class TariffsRepository {
  constructor(
    private readonly db: DbClient,
    private readonly wbApiService: WbApiService
  ) {}

  async saveDataFromWb(date: string): Promise<void> {
    const data = await this.prepareDataForSaving(date);

    await this.db.transaction(async (trx) => {
      await trx<ITariff>("stocks_koefs").where("date", date).delete();
      await trx<ITariff>("stocks_koefs").insert(data);
    });
  }

  async getRecordsWithSpecifiedDate(date: string): Promise<ITariff[]> {
    return this.db("stocks_koef").where("date", date).select("*");
  }

  private async prepareDataForSaving(date: string) {
    const data = await this.wbApiService.getTarrifs(date);
    const { dtNextBox, dtTillMax } = data;

    let processedData = [];
    for (const warehouse of data.warehouseList) {
      processedData.push({
        ...warehouse,
        dtNextBox,
        dtTillMax,
        date,
      });
    }

    const sortedData = [...processedData].sort(
      (a, b) => Number(a.boxDeliveryCoefExpr) - Number(b.boxDeliveryCoefExpr)
    );

    return sortedData;
  }
}
