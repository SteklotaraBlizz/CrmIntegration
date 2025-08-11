// models/webhook_event.model.ts
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export class WebhookEvent extends Model {
  declare id: number;
  declare eventType: string;
  declare entityId: number;
  declare data: object;
}

WebhookEvent.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    eventType: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "event_type",
    },
    entityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "entity_id",
    },
    data: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    tableName: "webhook_events",
    sequelize,
    modelName: "WebhookEvent",
  }
);
