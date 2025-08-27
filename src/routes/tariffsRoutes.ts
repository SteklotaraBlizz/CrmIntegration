import { Router } from "express";
import { saveDataToDb } from "../controllers";

const tariffsRouter = Router();

tariffsRouter.get("/", saveDataToDb);

export default tariffsRouter;
