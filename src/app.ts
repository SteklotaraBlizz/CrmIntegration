import { scopePerRequest } from "awilix-express";
import express from "express";
// import { syncTariffs } from './controllers/tariffController';
import cron from "node-cron";
import container from "./container/di-container";
import tariffsRouter from "./routes/tariffsRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(scopePerRequest(container));

app.use("/api", tariffsRouter);

// cron.schedule("0 * * * *", async () => {
//   console.log("Running hourly sync...");
//   try {
//     // await syncTariffs({} as any, {} as any);
//   } catch (error) {
//     console.error("Error in scheduled sync:", error);
//   }
// });

// Запуск приложения
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
