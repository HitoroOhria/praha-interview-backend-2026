import type { MySql2Database } from "drizzle-orm/mysql2";
import { getTableName, type Table } from "drizzle-orm/table";

export async function truncateTables(db: MySql2Database, tables: Array<Table>) {
	await Promise.all(
		tables.map((table) => db.execute(`TRUNCATE TABLE ${getTableName(table)}`)),
	);
}
