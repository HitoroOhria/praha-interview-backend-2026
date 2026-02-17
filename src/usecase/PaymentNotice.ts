import type { EmailAdapter } from "@/domain/adapter/EmailAdapter.js";
import { PaymentResult } from "@/domain/model/PaymentResult.js";
import type { PaymentRepository } from "@/domain/repository/Payment.js";
import type { UserRepository } from "@/domain/repository/UserRepository.js";

type Deps = {
	paymentRepository: PaymentRepository;
	userRepository: UserRepository;
	emailAdapter: EmailAdapter;
};

type Args = {
	result: "success" | "failure";
	items: string[]; // 後ほど埋める
	metadata: {
		userId: string;
	};
};

export class PaymentNotice {
	private readonly deps: Deps;

	constructor(deps: Deps) {
		this.deps = deps;
	}

	async excute(args: Args): Promise<void> {
		const paymentResult = new PaymentResult({ ...args });

		await this.deps.paymentRepository.SaveResult(paymentResult);

		// 失敗時はメール送信しない
		if (!paymentResult.isSuccess()) {
			return;
		}

		const user = await this.deps.userRepository.GetById(paymentResult.userId);

		await this.deps.emailAdapter.Send(
			user.email,
			"Payment Notification",
			"Your payment has been completed.",
		);
	}
}
