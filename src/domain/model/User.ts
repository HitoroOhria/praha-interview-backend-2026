import { UserId } from "@/domain/value/UserId.js";
import { Email } from "@/domain/value/Email.js";

export class User {
	public id: UserId;
	public name: string; // TODO 値オブジェクトにするか検討する
	public email: Email;

	constructor(id: number, name: string, email: string) {
		this.id = new UserId(id);
		this.name = name;
		this.email = new Email(email);
	}
}
