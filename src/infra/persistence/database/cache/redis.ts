import type { KeyValueDatabase } from "@/infra/persistence/common";
import env from "@/main/env";
import { Redis } from "ioredis";

class RedisDB implements KeyValueDatabase {
  private static instance: RedisDB;
  private redis: Redis;

  private constructor() {
    this.redis = new Redis({
      host: env.REDIS_HOST,
      port: 6379,
    });
  }

  async get(key: string): Promise<string | null> {
    return await this.redis.get(key);
  }

  async set(key: string, value: string): Promise<void> {
    await this.redis.set(key, value);
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(key);
  }

  public static getInstance(): RedisDB {
    if (!RedisDB.instance) {
      RedisDB.instance = new RedisDB();
    }

    return RedisDB.instance;
  }
}

export default RedisDB.getInstance();
