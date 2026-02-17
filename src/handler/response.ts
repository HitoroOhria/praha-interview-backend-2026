import type { Context } from "hono";
import type { HTTPException } from "hono/http-exception";
import type { JSONValue } from "hono/utils/types";

type SuccessResponse<Data extends JSONValue> = {
	type: "success";
	data: Data;
};

type ErrorResponse = {
	type: "error";
	message: ErrorResponseMessage;
};

type ErrorResponseMessage = string | object;

export function responseHTTPException(c: Context, err: HTTPException) {
	return c.json<ErrorResponse>(
		{ type: "error", message: err.message },
		err.status,
	);
}

export function responseSuccess<Data extends JSONValue>(
	c: Context,
	data: Data,
) {
	return c.json<SuccessResponse<Data>>({ type: "success", data }, 200);
}

export function responseBadRequest(c: Context, message: ErrorResponseMessage) {
	return c.json<ErrorResponse>({ type: "error", message }, 400);
}

export function responseInternalServerError(
	c: Context,
	message: ErrorResponseMessage,
) {
	return c.json<ErrorResponse>({ type: "error", message }, 500);
}
