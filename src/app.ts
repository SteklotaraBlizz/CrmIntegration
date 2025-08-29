import { scopePerRequest } from "awilix-express";
import express from "express";
import cron from "node-cron";
import container, { db } from "./container/di-container";
import tariffsRouter from "./routes/tariffsRoutes";
import "reflect-metadata";
import { GoogleService, TariffsService, WbApiService } from "./services";
import { TariffsRepository } from "./repositories/tariffs.repository";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(scopePerRequest(container));

app.use("/api", tariffsRouter);

cron.schedule("0 * * * *", async () => {
  console.log("Running hourly sync...");
  try {
    const googleService = new GoogleService(
      new TariffsService(new TariffsRepository(db, new WbApiService()))
    );
    await googleService.sendDataToSheet();
  } catch (error) {
    console.error("Error in scheduled sync:", error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
