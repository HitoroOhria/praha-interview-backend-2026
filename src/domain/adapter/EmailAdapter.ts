import type { Email } from "@/domain/value/Email.js";

export interface EmailAdapter {
	Send(email: Email, title: string, body: string): Promise<void>;
}
