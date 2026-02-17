import { HTTPException } from "hono/http-exception";

export class DataMultipleFoundError extends HTTPException {
	constructor(message: string) {
		super(500, { message: `Multiple rows found. ${message}` });
	}
}
