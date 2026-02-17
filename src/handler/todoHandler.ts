import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { createTodoHandler } from "@/di/handler/todoHandlerDI.js";
import { responseSuccess } from "@/handler/response.js";
import { zValidatorHook } from "@/handler/validate.js";

const {
	todoCreateUseCase,
	todoGetListUseCase,
	todoGetDetailUseCase,
	todoUpdateUseCase,
	todoDeleteUseCase,
} = createTodoHandler();

export const todoApp = new Hono();

const createTodoRequestSchema = z.object({
	name: z.string().min(1),
	description: z.string().max(5000).optional(),
});

type CreateTodoResponseData = {
	id: number;
	name: string;
	description?: string;
};

todoApp.post(
	"/todos",
	zValidator("json", createTodoRequestSchema, zValidatorHook),
	async (c) => {
		const { name, description } = c.req.valid("json");

		const todo = await todoCreateUseCase.execute(name, description);

		const data = {
			id: todo.id.value(),
			name: todo.name,
			description: todo.description,
		};

		return responseSuccess<CreateTodoResponseData>(c, data);
	},
);

type GetTodosResponseData = Array<{
	id: number;
	name: string;
	description?: string;
}>;

todoApp.get("/todos", async (c) => {
	const todos = await todoGetListUseCase.execute();

	const data = todos.map((todo) => ({
		id: todo.id.value(),
		name: todo.name,
		description: todo.description,
	}));

	return responseSuccess<GetTodosResponseData>(c, data);
});

const getTodoByIdParamSchema = z.object({
	id: z.coerce.number().int().min(1),
});

type GetTodoByIdResponse = {
	id: number;
	name: string;
	description?: string;
};

todoApp.get(
	"/todos/:id",
	zValidator("param", getTodoByIdParamSchema, zValidatorHook),
	async (c) => {
		const { id } = c.req.valid("param");

		const todo = await todoGetDetailUseCase.execute(id);

		const data = {
			id: todo.id.value(),
			name: todo.name,
			description: todo.description,
		};

		return responseSuccess<GetTodoByIdResponse>(c, data);
	},
);

const updateTodoParamSchema = z.object({
	id: z.coerce.number().int().min(1),
});
const updateTodoJsonSchema = z.object({
	name: z.string().min(1),
	description: z.string().max(5000).optional(),
});

type UpdateTodoResponseData = null;

todoApp.put(
	"/todos/:id",
	zValidator("param", updateTodoParamSchema, zValidatorHook),
	zValidator("json", updateTodoJsonSchema, zValidatorHook),
	async (c) => {
		const { id } = c.req.valid("param");
		const { name, description } = c.req.valid("json");

		await todoUpdateUseCase.execute(id, name, description);

		return responseSuccess<UpdateTodoResponseData>(c, null);
	},
);

const deleteTodoParamSchema = z.object({
	id: z.coerce.number().int().min(1),
});

type DeleteTodoResponseData = null;

todoApp.delete(
	"/todos/:id",
	zValidator("param", deleteTodoParamSchema, zValidatorHook),
	async (c) => {
		const { id } = c.req.valid("param");

		await todoDeleteUseCase.execute(id);

		return responseSuccess<DeleteTodoResponseData>(c, null);
	},
);
