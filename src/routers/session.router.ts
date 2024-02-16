import { Router } from "express";
import { SessionController } from "../controller";
import { ensure } from "../middlewares";
import { sessionCreateSchema } from "../schemas";

export const sessionRouter = Router();
const controller = new SessionController();

sessionRouter.post(
  "/login",
  ensure.validBody(sessionCreateSchema),
  controller.login
);
