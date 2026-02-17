import { Todo } from "@/domain/model/Todo.js";
import type { DbContext } from "@/domain/repository/DbContext.js";
import type { TodoRepository } from "@/domain/repository/TodoRepository.js";

export type Deps = {
	todoRepository: TodoRepository;
};

export class TodoCreateUseCase {
	private readonly db: DbContext<Deps>;

	constructor(db: DbContext<Deps>) {
		this.db = db;
	}

	async execute(name: string, description?: string): Promise<Todo> {
		const todo = Todo.create(name, description);

		// transaction example
		// this.db.runTx(async (repos) => {
		// 	await repos.userRepository.create(user);
		// 	await repos.todoRepository.create(todo);
		// });

		return await this.db.repos.todoRepository.create(todo);
	}
}
