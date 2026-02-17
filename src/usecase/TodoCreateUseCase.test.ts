import { describe, expect, test, vi } from "vitest";
import { Todo } from "@/domain/model/Todo.js";
import { createMockDbContext } from "@/domain/repository/DbContext.mock.js";
import { createMockTodoRepository } from "@/domain/repository/TodoRepository.mock.js";
import { TodoCreateUseCase } from "@/usecase/TodoCreateUseCase.js";

const mockTodoRepository = createMockTodoRepository();

const mockDb = createMockDbContext({ todoRepository: mockTodoRepository });

describe("TodoCreateUseCase", () => {
	describe("execute", () => {
		test("Todo を作成すること", async () => {
			vi.mocked(mockTodoRepository.create).mockResolvedValue(
				new Todo(1, "name", "description"),
			);

			const usecase = new TodoCreateUseCase(mockDb);
			const result = await usecase.execute("name", "description");

			expect(result).toStrictEqual(new Todo(1, "name", "description"));
			expect(mockTodoRepository.create).toHaveBeenNthCalledWith(
				1,
				new Todo(Number.MAX_SAFE_INTEGER, "name", "description"),
			);
		});
	});
});
