import { z } from "zod";
import { baseSchema } from "./base.schema";
import { userReturnSchema, userSchema } from "./user.schema";
import { genreCreateSchema, genreSchema } from "./genre.schema";

const albumSchema = baseSchema.extend({
  title: z.string().min(3).max(255),
  band: z.string().min(1).max(255),
  // gt -> greater then -> maior que
  year: z.number().positive().gt(1500),

  genres: genreSchema.array(),
  owner: userSchema,
});

const albumCreateSchema = albumSchema
  .omit({ id: true, owner: true })
  .extend({
    ownerId: z.number().positive(),
    genres: genreCreateSchema.array(),
  });

const albumUpdateSchema = albumCreateSchema.omit({ ownerId: true }).partial();
const albumReturnSchema = albumSchema.extend({ owner: userReturnSchema });

export { albumCreateSchema, albumReturnSchema, albumSchema, albumUpdateSchema };
