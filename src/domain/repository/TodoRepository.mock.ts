import { vi } from "vitest";
import type { TodoRepository } from "@/domain/repository/TodoRepository.js";

export function createMockTodoRepository(): TodoRepository {
	return {
		create: vi.fn(),
		getAll: vi.fn(),
		getById: vi.fn(),
		update: vi.fn(),
		delete: vi.fn(),
	};
}
