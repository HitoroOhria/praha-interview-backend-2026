import type {UserId} from "@/domain/value/UserId.js";

type PaymentResultArgs = {};

export class PaymentResult {
	public readonly userId: UserId = "";

	constructor(args: PaymentResultArgs) {}

	isSuccess(): boolean {
		return true;
	}
}
