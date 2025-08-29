import { google } from "googleapis";
import { formatDate } from "../utils";
import { TariffsService } from "./tariffs.service";
import { CREDENTIALS_PATH, SCOPES } from "../constants";
import * as fs from "fs";

export class GoogleService {
  constructor(private readonly tariffsService: TariffsService) {}

  private async getAuth() {
    const content = fs.readFileSync(CREDENTIALS_PATH, "utf8");
    const keys = JSON.parse(content);

    const auth = new google.auth.JWT({
      email: keys.client_email,
      key: keys.private_key,
      scopes: SCOPES,
    });
    await auth.authorize();
    return auth;
  }

  async sendDataToSheet() {
    const date = formatDate(new Date());
    const tariffs = await this.tariffsService.findDataForSpecifiedDate(date);

    const header = Object.keys(tariffs[0]);
    const rows = tariffs.map((tariff) => Object.values(tariff));

    const data = [header, ...rows];

    const auth = await this.getAuth();
    const sheets = google.sheets({ version: "v4", auth });

    // 4. Создаём новую Google Таблицу
    const createResponse = await sheets.spreadsheets.create({
      requestBody: {
        properties: {
          title: "Выгрузка тарифов",
        },
      },
    });

    const spreadsheetId = createResponse.data.spreadsheetId as
      | string
      | undefined;

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: "Sheet1",
      valueInputOption: "RAW",
      requestBody: {
        values: data,
      },
    });

    const shareableLink = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

    return { shareableLink, spreadsheetId };
  }
}
