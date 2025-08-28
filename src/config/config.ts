import dotenv from "dotenv";

dotenv.config();

interface IConfig {
  DB_HOST: string;
  DB_PORT: number;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_USER: string;
  WB_API_URL: string;
  TOKEN: string;
  GOOGLE_SHEETS_KEY_FILE: string;
  GOOGLE_SHEETS_ID: string;
  NODE_ENV: string;
}

export const appConfig = process.env as Partial<IConfig>;
