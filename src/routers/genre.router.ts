import { Router } from "express";
import { GenreController } from "../controller";
import { ensure } from "../middlewares";

export const genreRouter = Router();

const controller = new GenreController();

genreRouter.get("", controller.read);

genreRouter.use("/:genreId", ensure.paramsGenreIdExists);

genreRouter.delete("/:genreId", controller.delete);
