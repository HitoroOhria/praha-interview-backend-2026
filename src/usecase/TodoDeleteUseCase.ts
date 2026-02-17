import type { DbContext } from "@/domain/repository/DbContext.js";
import type { TodoRepository } from "@/domain/repository/TodoRepository.js";
import { TodoId } from "@/domain/value/TodoId.js";

type Deps = {
	todoRepository: TodoRepository;
};

export class TodoDeleteUseCase {
	private readonly db: DbContext<Deps>;

	constructor(db: DbContext<Deps>) {
		this.db = db;
	}

	async execute(id: number): Promise<void> {
		await this.db.repos.todoRepository.delete(new TodoId(id));
	}
}
