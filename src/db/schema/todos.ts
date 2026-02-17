import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const todosTable = mysqlTable("todos", {
	id: serial().primaryKey(),
	name: varchar({ length: 255 }).notNull(),
	description: varchar({ length: 5000 }),
});
