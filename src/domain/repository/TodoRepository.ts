import type { Todo } from "@/domain/model/Todo.js";
import type { TodoId } from "@/domain/value/TodoId.js";

export interface TodoRepository {
	create(todo: Todo): Promise<Todo>;
	getAll(): Promise<Todo[]>;
	getById(todoId: TodoId): Promise<Todo>;
	update(todo: Todo): Promise<void>;
	delete(todoId: TodoId): Promise<void>;
}
