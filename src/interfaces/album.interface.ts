import { z } from "zod";
import {
  albumCreateSchema,
  albumReturnSchema,
  albumUpdateSchema,
} from "../schemas";

type AlbumCreate = z.infer<typeof albumCreateSchema>;
type AlbumUpdate = z.infer<typeof albumUpdateSchema>;
type AlbumReturn = z.infer<typeof albumReturnSchema>;

export { AlbumCreate, AlbumReturn, AlbumUpdate };
