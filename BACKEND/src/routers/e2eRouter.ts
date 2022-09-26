import { Router } from "express";
import { clear } from "../controllers/e2eController";

const testRouter = Router();

testRouter.post("/e2e/reset", clear);

export default testRouter;
