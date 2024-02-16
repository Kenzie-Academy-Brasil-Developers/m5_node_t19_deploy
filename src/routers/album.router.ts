import { Router } from "express";
import { ensure } from "../middlewares";
import { albumCreateSchema } from "../schemas";
import { AlbumController } from "../controller";

export const albumRouter = Router();

const controller = new AlbumController();

albumRouter.post(
  "",
  ensure.validBody(albumCreateSchema),
  ensure.bodyOwnerIdExists,
  controller.create
);
albumRouter.get("", controller.read);

albumRouter.use("/:albumId", ensure.paramsAlbumIdExists);

albumRouter.get("/:albumId", controller.retrieve)
albumRouter.delete("/:albumId", controller.delete)
