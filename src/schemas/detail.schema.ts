import { z } from "zod";
import { baseSchema } from "./base.schema";

const detailSchema = baseSchema.extend({
  address: z.string().nullish(),
  phone: z.string().nullish(),
  bio: z.string().nullish(),
});

const detailCreateSchema = detailSchema.omit({ id: true }).nullish();

export { detailCreateSchema, detailSchema };
