import { HTTPException } from "hono/http-exception";

export class DataReturningMultipleError extends HTTPException {
	constructor(message: string) {
		super(500, { message: `Multiple rows returned. ${message}` });
	}
}
