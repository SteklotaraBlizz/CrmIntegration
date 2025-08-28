import axios from "axios";
import { IRawTariff } from "../models";
import { appConfig } from "../config";

export class WbApiService {
  async getTarrifs(date: string): Promise<IRawTariff> {
    try {
      const response = await axios.get(`${appConfig.WB_API_URL}?date=${date}`, {
        headers: {
          Authorization: `Bearer ${appConfig.TOKEN}`,
        },
      });
      return response.data.response.data;
    } catch (error) {
      console.error("Error fetching tariffs from WB:", error);
      throw error;
    }
  }
}
