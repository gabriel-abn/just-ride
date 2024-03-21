import postgres, {
  Postgres,
} from "@/infra/persistence/database/relational/postgres";
import env from "@/main/env";
import { migrate } from "drizzle-orm/postgres-js/migrator";

const client = Postgres.getInstance();

await migrate(postgres, { migrationsFolder: `${env.APP_DIR}/drizzle` });

await client.end();
