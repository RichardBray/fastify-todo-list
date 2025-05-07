import { useState, useEffect } from 'react';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { Todo, CreateTodoInput, UpdateTodoInput, DeleteTodoResponse } from '../types/todo';

// Use the environment variable if available, otherwise default to '/api'
const API_BASE_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

/**
 * Props interface for App component
 */
interface AppProps {
  todos?: Todo[];
  data?: {
    todos?: Todo[];
  };
}

/**
 * Main App component
 */
export function App(props: AppProps = {}) {
  // Initialize todos from props if available (from server-side rendering)
  // First check direct todos prop, then check nested data.todos structure (fastify-react format)
  const initialTodos = props.todos || props.data?.todos || [];
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [isLoading, setIsLoading] = useState(initialTodos.length === 0);
  const [hasError, setHasError] = useState(false);

  /**
   * Fetches all todos from the API
   */
  async function fetchTodos() {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/todos`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      
      const data = await response.json() as Todo[];
      setTodos(data);
      setHasError(false);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Adds a new todo
   */
  async function handleAddTodo(title: string) {
    try {
      const payload: CreateTodoInput = { title };
      
      const response = await fetch(`${API_BASE_URL}/todo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add todo');
      }
      
      const newTodo = await response.json() as Todo;
      setTodos(prevTodos => [...prevTodos, newTodo]);
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error;
    }
  }

  /**
   * Toggles completion status of a todo
   */
  async function handleToggleTodo(id: string) {
    try {
      const todo = todos.find(t => t.id === id);
      
      if (!todo) return;
      
      const payload: UpdateTodoInput = {
        isCompleted: !todo.isCompleted
      };
      
      const response = await fetch(`${API_BASE_URL}/todo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
      
      const updatedTodo = await response.json() as Todo;
      
      setTodos(prevTodos => 
        prevTodos.map(t => t.id === id ? updatedTodo : t)
      );
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  }

  /**
   * Deletes a todo
   */
  async function handleDeleteTodo(id: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/todo/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
      
      await response.json() as DeleteTodoResponse;
      
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }

  // Load todos on component mount if they weren't provided via props (SSR)
  useEffect(() => {
    if (initialTodos.length === 0) {
      fetchTodos();
    }
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Fastify Todo List</h1>
      </header>
      
      <main className="app-main">
        <TodoForm onAddTodo={handleAddTodo} />
        
        {hasError && (
          <div className="error-message">
            Error loading todos. Please try again later.
          </div>
        )}
        
        <TodoList 
          todos={todos} 
          onToggle={handleToggleTodo} 
          onDelete={handleDeleteTodo}
          isLoading={isLoading}
        />
      </main>
      
      <footer className="app-footer">
        <p>Fastify + React Todo List</p>
      </footer>
    </div>
  );
}

