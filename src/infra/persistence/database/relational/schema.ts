import { boolean, pgTable, varchar } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: varchar("id").primaryKey(),
  name: varchar("name").notNull().default(""),
  email: varchar("email").unique().notNull(),
  username: varchar("username").notNull(),
  password: varchar("password").notNull(),
  verified: boolean("verified").notNull().default(false),
  phone: varchar("phone").notNull().default(""),
  created_at: varchar("created_at").notNull().default("now()"),
  updated_at: varchar("updated_at").notNull().default("now()"),
});
