import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		mockReset: true,
		testTimeout: 2 * 60 * 1_000, // 2 minutes for debug
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
});
