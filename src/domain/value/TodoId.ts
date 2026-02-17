import { TodoIdMustBePositiveError } from "@/domain/error/TodoIdMustBePositiveError.js";

export class TodoId {
	private readonly _value: number;

	constructor(value: number) {
		if (value <= 0) {
			throw new TodoIdMustBePositiveError(value);
		}

		this._value = value;
	}

	equals(other: TodoId): boolean {
		return this._value === other._value;
	}

	value(): number {
		return this._value;
	}
}
