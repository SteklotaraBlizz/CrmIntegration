// models/deal.model.ts
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export class Deal extends Model {
  declare id: number;
  declare amoDealId: number;
  declare title: string;
  declare status: string;
}

Deal.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    amoDealId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      field: "amo_deal_id",
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "deals",
    sequelize,
    modelName: "Deal",
  }
);
