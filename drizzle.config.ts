import env from "@/main/env";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/infra/persistence/database/relational/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: env.POSTGRES_URL!,
  },
} satisfies Config;
