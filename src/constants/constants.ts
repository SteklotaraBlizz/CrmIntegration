import path from "path";

export const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
export const CREDENTIALS_PATH = path.resolve(
  process.env.GOOGLE_APPLICATION_CREDENTIALS || "./service-account-key.json"
);
