import { Router } from "express";
import { auth, ensure, permission } from "../middlewares";
import { userCreateSchema, userUpdateSchema } from "../schemas";
import { UserController } from "../controller";

export const userRouter = Router();
const controller = new UserController();

userRouter.post(
  "",
  ensure.validBody(userCreateSchema),
  ensure.emailIsUnique,
  controller.create
);
userRouter.get("", auth.isAuthenticated, controller.read);

userRouter.use(
  "/:userId",
  ensure.paramsUserIdExists,
  auth.isAuthenticated,
  permission.isAdminOrOwnerUser
);

userRouter.patch(
  "/:userId",
  ensure.validBody(userUpdateSchema),
  ensure.emailIsUnique,
  controller.partialUpdate
);
