import { drizzle } from "drizzle-orm/mysql2";
import { testEnv } from "@/config/testEnv.js";

export const testDbClient = drizzle(testEnv.TEST_DATABASE_URL);
