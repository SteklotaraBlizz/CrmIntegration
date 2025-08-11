import express from "express";
import { config } from "dotenv";
config();

import { container } from "./container/container.js";
import { sequelize } from "./config/database.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/api/deals", container.dealsController.createDeal);
app.post("/api/contacts", container.contactsController.createContact);
app.post("/api/webhooks", container.webhooksController.handleWebhook);

(async () => {
  try {
    await sequelize.authenticate();
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("ERROR", err);
    process.exit(1);
  }
})();
