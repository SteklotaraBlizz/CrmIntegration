import * as dotenv from "dotenv";
import axios from "axios";
import { IRawTariff } from "../models";

dotenv.config({ path: "../../.env" });

const WB_API_URL = process.env.WB_API_URL || "";
const token = process.env.TOKEN;

export class WbApiService {
  async getTarrifs(date: string): Promise<IRawTariff> {
    try {
      const response = await axios.get(`${WB_API_URL}?date:${date}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.response.data;
    } catch (error) {
      console.error("Error fetching tariffs from WB:", error);
      throw error;
    }
  }
}
