import {
	todoCreateUseCase,
	todoDeleteUseCase,
	todoGetDetailUseCase,
	todoGetListUseCase,
	todoUpdateUseCase,
} from "@/di/usecase/todoUsecaseDI.js";

export function createTodoHandler() {
	return {
		todoCreateUseCase,
		todoGetListUseCase,
		todoGetDetailUseCase,
		todoUpdateUseCase,
		todoDeleteUseCase,
	};
}
