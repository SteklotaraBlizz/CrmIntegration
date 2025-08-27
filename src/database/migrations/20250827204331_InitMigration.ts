import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("stocks_koefs", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("date").notNullable();
    table.string("dtNextBox").notNullable();
    table.string("dtTillMax").notNullable();
    table.string("boxDeliveryBase").notNullable();
    table.string("boxDeliveryCoefExpr").notNullable();
    table.string("boxDeliveryLiter").notNullable();
    table.string("boxDeliveryMarketplaceBase").notNullable();
    table.string("boxDeliveryMarketplaceCoefExpr").notNullable();
    table.string("boxDeliveryMarketplaceLiter").notNullable();
    table.string("boxStorageBase").notNullable();
    table.string("boxStorageCoefExpr").notNullable();
    table.string("boxStorageLiter").notNullable();
    table.string("geoName").notNullable();
    table.string("warehouseName").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("stocks_koefs");
}
