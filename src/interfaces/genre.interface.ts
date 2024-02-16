import { z } from "zod";
import { genreCreateSchema, genreReturnSchema } from "../schemas";

type GenreCreate = z.infer<typeof genreCreateSchema>;
type GenreReturn = z.infer<typeof genreReturnSchema>;

export { GenreCreate, GenreReturn };
