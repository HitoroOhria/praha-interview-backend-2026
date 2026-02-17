import { vi } from "vitest";
import type { DbContext, Repositories } from "@/domain/repository/DbContext.js";

export function createMockDbContext<Deps extends Repositories>(
	deps: Deps,
): DbContext<Deps> {
	return {
		repos: deps,
		runTx: vi.fn((callback) => callback(deps)),
	};
}
