import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const testEnv = createEnv({
	server: {
		TEST_DATABASE_URL: z.url(),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
