import { z } from "zod";
import { userSchema } from "./user.schema";

// const sessionCreateSchema = z.object({
//   email: z.string(),
//   password: z.string(),
// });

const sessionCreateSchema = userSchema.pick({ email: true, password: true });

export { sessionCreateSchema };
