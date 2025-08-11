// models/contact.model.ts
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export class Contact extends Model {
  declare id: number;
  declare amoContactId: number;
  declare name: string;
  declare phone: string;
}

Contact.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    amoContactId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      field: "amo_contact_id",
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "contacts",
    sequelize,
    modelName: "Contact",
  }
);
