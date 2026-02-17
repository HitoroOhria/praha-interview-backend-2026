import type { Todo } from "@/domain/model/Todo.js";
import type { DbContext } from "@/domain/repository/DbContext.js";
import type { TodoRepository } from "@/domain/repository/TodoRepository.js";

type Deps = {
	todoRepository: TodoRepository;
};

export class TodoGetListUseCase {
	private readonly db: DbContext<Deps>;

	constructor(db: DbContext<Deps>) {
		this.db = db;
	}

	async execute(): Promise<Todo[]> {
		return await this.db.repos.todoRepository.getAll();
	}
}
