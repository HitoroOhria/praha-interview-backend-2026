import { beforeEach, describe, expect, test } from "vitest";
import { todosTable } from "@/db/schema/todos.js";
import { DataNotFoundError } from "@/domain/error/DataNotFoundError.js";
import { Todo } from "@/domain/model/Todo.js";
import { TodoId } from "@/domain/value/TodoId.js";
import { TodoRepositoryImpl } from "@/infrastructure/repositoryImpl/TodoRepositoryImpl.js";
import { testDbClient } from "@/util/test/TestDBClient.js";
import { truncateTables } from "@/util/test/trancateTable.js";

const todoRepository = new TodoRepositoryImpl(testDbClient);

beforeEach(async () => {
	await truncateTables(testDbClient, [todosTable]);
});

describe("TodoRepositoryImpl", () => {
	describe("create", () => {
		test("データを作成すること", async () => {
			const todo = new Todo(1, "name", "description");

			const createdTodo = await todoRepository.create(todo);

			const gotTodo = await todoRepository.getById(new TodoId(1));

			const expectedTodo = new Todo(1, "name", "description");
			expect(createdTodo).toStrictEqual(expectedTodo);
			expect(gotTodo).toStrictEqual(expectedTodo);
		});
	});

	describe("getAll", () => {
		test("データが存在しない場合、空のデータを返すこと", async () => {
			const gotTodo = await todoRepository.getAll();

			expect(gotTodo).toStrictEqual([]);
		});

		test("データが1件存在する場合、1件のデータを返すこと", async () => {
			const todo = new Todo(1, "name", "description");
			await todoRepository.create(todo);

			const gotTodo = await todoRepository.getAll();

			const expectedTodo = [new Todo(1, "name", "description")];
			expect(gotTodo).toStrictEqual(expectedTodo);
		});

		test("データが2件存在する場合、2件のデータを返すこと", async () => {
			const todos = [
				new Todo(1, "name1", "description1"),
				new Todo(2, "name2", "description2"),
			];
			await Promise.all(todos.map((todo) => todoRepository.create(todo)));

			const gotTodo = await todoRepository.getAll();

			const expectedTodo = [
				new Todo(1, "name1", "description1"),
				new Todo(2, "name2", "description2"),
			];
			expect(gotTodo).toStrictEqual(expectedTodo);
		});
	});

	describe("getById", () => {
		test("データが存在する場合、データを取得すること", async () => {
			const todo = new Todo(1, "name", "description");
			const createdTodo = await todoRepository.create(todo);

			const gotTodo = await todoRepository.getById(createdTodo.id);

			const expectedTodo = new Todo(1, "name", "description");
			expect(gotTodo).toStrictEqual(expectedTodo);
		});

		test("データが存在しない場合、エラーを返すこと", async () => {
			async function exec() {
				await todoRepository.getById(new TodoId(1));
			}

			await expect(exec()).rejects.toThrowError(DataNotFoundError);
		});
	});

	describe("update", () => {
		test("データを更新すること", async () => {
			const todo = new Todo(1, "name", "description");
			const createdTodo = await todoRepository.create(todo);

			const updatedTodo = new Todo(
				createdTodo.id.value(),
				"updatedName",
				"updatedDescription",
			);
			await todoRepository.update(updatedTodo);

			const gotTodo = await todoRepository.getById(createdTodo.id);

			const expectedTodo = new Todo(1, "updatedName", "updatedDescription");
			expect(gotTodo).toStrictEqual(expectedTodo);
		});
	});

	describe("delete", () => {
		test("データが存在する場合、データを削除すること", async () => {
			const todo = new Todo(1, "name", "description");
			await todoRepository.create(todo);

			await todoRepository.delete(new TodoId(1));

			const gotTodos = await todoRepository.getAll();
			expect(gotTodos).toStrictEqual([]);
		});

		test("データが存在しない場合、エラーを返さないこと", async () => {
			async function exec() {
				await todoRepository.delete(new TodoId(1));
			}

			await expect(exec()).resolves.not.toThrowError();
		});
	});
});
