import knex, { Knex } from "knex";
import knexConfig from "../knexfile";

export interface DbClient extends knex.Knex<any, unknown[]> {}
