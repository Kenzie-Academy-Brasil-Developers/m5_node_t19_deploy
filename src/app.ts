import cors from "cors";
import express, { Application, json } from "express";
import "express-async-errors";
import helmet from "helmet";
import { handleErrors } from "./middlewares";
import { albumRouter, genreRouter, sessionRouter, userRouter } from "./routers";

export const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(json());

app.use("/api/users", userRouter);
app.use("/api/albums", albumRouter);
app.use("/api/genres", genreRouter);
app.use("/api/auth", sessionRouter);

app.use(handleErrors);
