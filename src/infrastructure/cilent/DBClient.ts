import { drizzle } from "drizzle-orm/mysql2";
import { env } from "@/config/env.js";

export const dbClient = drizzle(env.DATABASE_URL, { casing: "snake_case" });
