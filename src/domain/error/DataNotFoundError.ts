import { HTTPException } from "hono/http-exception";

export class DataNotFoundError extends HTTPException {
	constructor(message: string) {
		super(404, { message: `Data not found. ${message}` });
	}
}
