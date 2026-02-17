import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		NODE_ENV: z.union([
			z.literal("local"),
			z.literal("test"),
			z.literal("dev"),
			z.literal("stg"),
			z.literal("prd"),
		]),
		DATABASE_URL: z.url(),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
