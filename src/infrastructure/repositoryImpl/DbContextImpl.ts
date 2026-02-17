import type { MySql2Database } from "drizzle-orm/mysql2";
import type { DbContext, Repositories } from "@/domain/repository/DbContext.js";

export class DbContextImpl<Repos extends Repositories>
	implements DbContext<Repos>
{
	private readonly db: MySql2Database;
	readonly repos: Repos;
	private readonly repoFactory: (db: MySql2Database) => Repos;

	constructor(db: MySql2Database, repoFactory: (db: MySql2Database) => Repos) {
		this.db = db;
		this.repos = repoFactory(db);
		this.repoFactory = repoFactory;
	}

	async runTx<Result>(
		callback: (repos: Repos) => Promise<Result>,
	): Promise<Result> {
		return this.db.transaction(async (tx) => {
			// factory 関数により、トランザクション事に Repository インスタンスを作成する
			// Repository インスタンスをシングルトンで作成すると、HTTP リクエストを並列処理する際にトランザクションが競合してしまう
			const repos = this.repoFactory(tx);
			return callback(repos);
		});
	}
}
