import { z } from "zod";
import { baseSchema } from "./base.schema";
import { detailCreateSchema, detailSchema } from "./detail.schema";

const userSchema = baseSchema.extend({
  username: z.string().min(3).max(255),
  email: z.string().email().max(255),
  password: z.string(),
  admin: z.boolean().default(false),
  detail: detailSchema.nullish(),
});

const userCreateSchema = userSchema
  .omit({ id: true })
  .extend({ detail: detailCreateSchema });

const userUpdateSchema = userCreateSchema.partial();

const userReturnSchema = userSchema.omit({ password: true });

export { userCreateSchema, userReturnSchema, userSchema, userUpdateSchema };
