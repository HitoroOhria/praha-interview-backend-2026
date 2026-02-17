import type { Todo } from "@/domain/model/Todo.js";
import type { DbContext } from "@/domain/repository/DbContext.js";
import type { TodoRepository } from "@/domain/repository/TodoRepository.js";
import { TodoId } from "@/domain/value/TodoId.js";

type Deps = {
	todoRepository: TodoRepository;
};

export class TodoGetByIdUseCase {
	private readonly db: DbContext<Deps>;

	constructor(db: DbContext<Deps>) {
		this.db = db;
	}

	async execute(id: number): Promise<Todo> {
		return await this.db.repos.todoRepository.getById(new TodoId(id));
	}
}
