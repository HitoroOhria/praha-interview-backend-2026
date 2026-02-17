import { Todo } from "@/domain/model/Todo.js";
import type { DbContext } from "@/domain/repository/DbContext.js";
import type { TodoRepository } from "@/domain/repository/TodoRepository.js";

type Deps = {
	todoRepository: TodoRepository;
};

export class TodoUpdateUseCase {
	private readonly db: DbContext<Deps>;

	constructor(db: DbContext<Deps>) {
		this.db = db;
	}

	async execute(id: number, name: string, description?: string): Promise<void> {
		const todo = new Todo(id, name, description);
		await this.db.repos.todoRepository.update(todo);
	}
}
