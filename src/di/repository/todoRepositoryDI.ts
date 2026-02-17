import type { MySql2Database } from "drizzle-orm/mysql2";
import type { TodoRepository } from "@/domain/repository/TodoRepository.js";
import { TodoRepositoryImpl } from "@/infrastructure/repositoryImpl/TodoRepositoryImpl.js";

export function createTodoRepository(db: MySql2Database): TodoRepository {
	return new TodoRepositoryImpl(db);
}
