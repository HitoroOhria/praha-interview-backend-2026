import { HTTPException } from "hono/http-exception";

export class TodoIdMustBePositiveError extends HTTPException {
	constructor(value: number) {
		super(400, { message: `TodoId must be greater than 0. value: ${value}` });
	}
}
