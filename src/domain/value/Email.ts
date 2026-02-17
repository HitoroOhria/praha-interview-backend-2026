export class Email {
	private readonly _value: string;

	constructor(value: string) {
		this._value = value;
	}

	equals(other: Email): boolean {
		return this._value === other._value;
	}

	get host(): string {
		return this._value.split("@")[1];
	}

	value(): string {
		return this._value;
	}
}
