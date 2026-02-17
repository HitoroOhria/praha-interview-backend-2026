import type { Hook } from "@hono/zod-validator";
import type { Env, ValidationTargets } from "hono";
import type { $ZodType } from "zod/v4/core";
import { responseBadRequest } from "@/handler/response.js";

export const zValidatorHook: Hook<
	object,
	Env,
	string,
	keyof ValidationTargets,
	object,
	$ZodType
> = (result, c) => {
	if (result.success) {
		return;
	}

	console.error(result.error);

	const message = ((): object | string => {
		try {
			return JSON.parse(result.error.message);
		} catch (_) {
			return result.error.message;
		}
	})();

	return responseBadRequest(c, message);
};
