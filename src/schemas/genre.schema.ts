import { z } from "zod";
import { baseSchema } from "./base.schema";

const genreSchema = baseSchema.extend({
  name: z.string().min(1).max(255),
});

const genreCreateSchema = genreSchema.omit({ id: true });
const genreReturnSchema = genreSchema
  .extend({
    albums: z
      .object({ owner: z.object({ email: z.string().email() }) })
      .array(),
  })
  .transform(({ albums, ...payload }) => {
    const owner = albums.map((album) => album.owner.email).at(0);
    return { ...payload, owner };
  });

/**
 * {
 *    "id": "1",
 *    "name": "Indie",
 *    "owner": "cauan@mail.com"
 * }
 */

export { genreCreateSchema, genreReturnSchema, genreSchema };
