import { z } from "zod";

const envSchema = z.object({
  PORT: z
    .string()
    .default("3030")
    .transform((value) => Number(value)),
  NODE_ENV: z.string().default("development"),
  POSTGRES_URL: z
    .string()
    .default("postgres://postgres:postgres@localhost:5432/postgres"),
  APP_DIR: z.string().default(process.cwd()),
  REDIS_HOST: z.string().default("localhost"),
});

export default envSchema.parse(process.env);
