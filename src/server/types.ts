/**
 * Interface representing a Todo item
 */
export interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: string;
}

/**
 * Interface for creating a new Todo
 */
export interface CreateTodoInput {
  title: string;
}

/**
 * Interface for updating a Todo
 */
export interface UpdateTodoInput {
  title?: string;
  isCompleted?: boolean;
}

/**
 * API response for deletion
 */
export interface DeleteTodoResponse {
  success: boolean;
  deletedTodo: Todo;
}

