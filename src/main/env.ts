import { z } from "zod";

const envSchema = z.object({
  PORT: z
    .string()
    .default("3030")
    .transform((value) => Number(value)),
});

export default envSchema.parse(process.env);
