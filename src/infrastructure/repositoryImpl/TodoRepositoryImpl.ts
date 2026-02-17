import { eq, type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import type { MySql2Database } from "drizzle-orm/mysql2";
import { todosTable } from "@/db/schema/todos.js";
import { DataMultipleFoundError } from "@/domain/error/DataMultipleFoundError.js";
import { DataNotFoundError } from "@/domain/error/DataNotFoundError.js";
import { DataReturningMultipleError } from "@/domain/error/DataReturningMultipleError.js";
import { Todo } from "@/domain/model/Todo.js";
import type { TodoRepository } from "@/domain/repository/TodoRepository.js";
import type { TodoId } from "@/domain/value/TodoId.js";

export class TodoRepositoryImpl implements TodoRepository {
	private readonly db: MySql2Database;

	constructor(db: MySql2Database) {
		this.db = db;
	}

	async create(todo: Todo): Promise<Todo> {
		const returning = await this.db
			.insert(todosTable)
			.values(this.convertTodoToRow(todo))
			.$returningId();

		if (returning.length === 0) {
			throw new DataReturningMultipleError("Todo created failed.");
		}

		return new Todo(returning[0].id, todo.name, todo.description);
	}

	async getAll(): Promise<Todo[]> {
		const todosRows = await this.db.select().from(todosTable);

		return todosRows.map(this.convertTodoFromRow);
	}

	async getById(todoId: TodoId): Promise<Todo> {
		const todoRows = await this.db
			.select()
			.from(todosTable)
			.where(eq(todosTable.id, todoId.value()));

		if (todoRows.length === 0) {
			throw new DataNotFoundError(
				`Todo get by id failed. id: ${todoId.value()}`,
			);
		}
		if (todoRows.length > 1) {
			throw new DataMultipleFoundError(
				`Todo get by id failed. id: ${todoId.value()}`,
			);
		}

		return this.convertTodoFromRow(todoRows[0]);
	}

	async update(todo: Todo): Promise<void> {
		await this.db
			.update(todosTable)
			.set(this.convertTodoToRow(todo))
			.where(eq(todosTable.id, todo.id.value()));
	}

	async delete(todoId: TodoId): Promise<void> {
		await this.db.delete(todosTable).where(eq(todosTable.id, todoId.value()));
	}

	private convertTodoToRow(todo: Todo): InferInsertModel<typeof todosTable> {
		return {
			name: todo.name,
			description: todo.description ?? null,
		};
	}

	private convertTodoFromRow(row: InferSelectModel<typeof todosTable>): Todo {
		return new Todo(row.id, row.name, row.description ?? undefined);
	}
}
