import * as dotenv from "dotenv";
import { Knex } from "knex";
import { appConfig } from "./config";

dotenv.config({ path: "../.env" });
const knexConfig: Knex.Config = {
  client: "postgresql",
  connection: {
    host: appConfig.DB_HOST || "localhost",
    port: appConfig.DB_PORT || 5432,
    database: appConfig.DB_NAME || "database",
    user: appConfig.DB_USER || "postgres",
    password: appConfig.DB_PASSWORD || "admin",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./database/migrations",
  },
  seeds: {
    directory: "./database/seeds",
  },
};

export default knexConfig;
