import knex, { Knex } from "knex";
import knexConfig from "../knexfile";

export const db: Knex = knex(knexConfig);

// Проверка подключения
export const testConnection = async (): Promise<boolean> => {
  try {
    await db.raw("SELECT 1");
    console.log("Database connected successfully");
    return true;
  } catch (error) {
    console.error("Database connection failed:", error);
    return false;
  }
};
