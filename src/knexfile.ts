import * as dotenv from "dotenv";
import { Knex } from "knex";

dotenv.config({ path: "../.env" });
const knexConfig: Knex.Config = {
  client: "postgresql",
  connection: {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    database: process.env.DB_NAME || "database",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "admin",
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
