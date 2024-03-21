import env from "@/main/env";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

export class Postgres {
  private static client: pg.Pool;

  private constructor() {}

  static getInstance() {
    if (!Postgres.client) {
      Postgres.client = new pg.Pool({
        connectionString: env.POSTGRES_URL,
      });

      console.log("Postgres: Connecting to database...");

      Postgres.client.connect();

      console.log(Postgres.client !== undefined);
    }

    return Postgres.client;
  }
}

export default drizzle(Postgres.getInstance());
