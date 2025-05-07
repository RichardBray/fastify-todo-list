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

// In-memory todos storage
// Note: In a real production app, you would use a persistent database instead
let todos: Todo[] = [];

/**
 * Get all todos
 */
export function getTodos(): Todo[] {
  return todos;
}

/**
 * Create a new todo
 */
export function createTodo(input: CreateTodoInput): Todo {
  if (!input.title || input.title.trim() === '') {
    throw new Error('Title is required');
  }

  const newTodo: Todo = {
    id: Date.now().toString(),
    title: input.title.trim(),
    isCompleted: false,
    createdAt: new Date().toISOString()
  };

  todos.push(newTodo);
  return newTodo;
}

/**
 * Update a todo by ID
 */
export function updateTodo(id: string, input: UpdateTodoInput): Todo {
  const todoIndex = todos.findIndex(todo => todo.id === id);
  
  if (todoIndex === -1) {
    throw new Error('Todo not found');
  }
  
  if (input.title !== undefined) {
    todos[todoIndex].title = input.title.trim();
  }
  
  if (input.isCompleted !== undefined) {
    todos[todoIndex].isCompleted = input.isCompleted;
  }
  
  return todos[todoIndex];
}

/**
 * Delete a todo by ID
 */
export function deleteTodo(id: string): DeleteTodoResponse {
  const todoIndex = todos.findIndex(todo => todo.id === id);
  
  if (todoIndex === -1) {
    throw new Error('Todo not found');
  }
  
  const deletedTodo = todos[todoIndex];
  todos.splice(todoIndex, 1);
  
  return { 
    success: true, 
    deletedTodo 
  };
}

