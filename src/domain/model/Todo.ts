import { TodoId } from "@/domain/value/TodoId.js";

export class Todo {
	id: TodoId;
	name: string;
	description?: string;

	constructor(todoId: number, name: string, description?: string) {
		this.id = new TodoId(todoId);
		this.name = name;
		this.description = description;
	}

	public static create(name: string, description?: string): Todo {
		return new Todo(Number.MAX_SAFE_INTEGER, name, description);
	}
}
