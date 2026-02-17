export type Repositories = Record<string, object>;

export interface DbContext<Repos extends Repositories> {
	readonly repos: Repos;
	runTx<Result>(callback: (repos: Repos) => Promise<Result>): Promise<Result>;
}
