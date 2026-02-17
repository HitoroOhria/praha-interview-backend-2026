import type { MySql2Database } from "drizzle-orm/mysql2";
import type { DbContext, Repositories } from "@/domain/repository/DbContext.js";
import { dbClient } from "@/infrastructure/cilent/DBClient.js";
import { DbContextImpl } from "@/infrastructure/repositoryImpl/DbContextImpl.js";

export function createDbContext<Repos extends Repositories>(
	repoFactory: (db: MySql2Database) => Repos,
): DbContext<Repos> {
	return new DbContextImpl(dbClient, repoFactory);
}
