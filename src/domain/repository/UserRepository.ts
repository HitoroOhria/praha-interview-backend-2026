import type { User } from "@/domain/model/User.js";
import type { UserId } from "@/domain/value/UserId.js";

export interface UserRepository {
	GetById(id: UserId): Promise<User>;
}
