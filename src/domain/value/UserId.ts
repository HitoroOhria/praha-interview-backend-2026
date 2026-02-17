export class UserId {
	private readonly _value: number;

	constructor(value: number) {
		this._value = value;
	}

	equals(other: UserId): boolean {
		return this.value === other.value;
	}

	value(): number {
		return this._value;
	}
}
