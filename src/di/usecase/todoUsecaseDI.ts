import { createDbContext } from "@/di/repository/dbContextDI.js";
import { createTodoRepository } from "@/di/repository/todoRepositoryDI.js";
import { TodoCreateUseCase } from "@/usecase/TodoCreateUseCase.js";
import { TodoDeleteUseCase } from "@/usecase/TodoDeleteUseCase.js";
import { TodoGetByIdUseCase } from "@/usecase/TodoGetByIdUseCase.js";
import { TodoGetListUseCase } from "@/usecase/TodoGetListUseCase.js";
import { TodoUpdateUseCase } from "@/usecase/TodoUpdateUseCase.js";

export const todoCreateUseCase = new TodoCreateUseCase(
	createDbContext((db) => ({
		todoRepository: createTodoRepository(db),
	})),
);

export const todoGetListUseCase = new TodoGetListUseCase(
	createDbContext((db) => ({
		todoRepository: createTodoRepository(db),
	})),
);

export const todoGetDetailUseCase = new TodoGetByIdUseCase(
	createDbContext((db) => ({
		todoRepository: createTodoRepository(db),
	})),
);

export const todoUpdateUseCase = new TodoUpdateUseCase(
	createDbContext((db) => ({
		todoRepository: createTodoRepository(db),
	})),
);

export const todoDeleteUseCase = new TodoDeleteUseCase(
	createDbContext((db) => ({
		todoRepository: createTodoRepository(db),
	})),
);
