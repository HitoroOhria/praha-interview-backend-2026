import type { PaymentResult } from "@/domain/model/PaymentResult.js";

export interface PaymentRepository {
	SaveResult(paymentResult: PaymentResult): Promise<void>;
}
