import { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

/**
 * Component for displaying the list of todos
 */
export function TodoList({ todos, onToggle, onDelete, isLoading }: TodoListProps) {
  /**
   * Renders appropriate content based on loading state and todos
   */
  function renderContent() {
    if (isLoading) {
      return <div className="loading-message">Loading todos...</div>;
    }
    
    if (todos.length === 0) {
      return <div className="empty-message">No tasks yet. Add one above!</div>;
    }
    
    return (
      <ul className="todo-list">
        {todos.map(todo => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            onToggle={onToggle} 
            onDelete={onDelete}
          />
        ))}
      </ul>
    );
  }
  
  return (
    <div className="todo-list-container">
      <h2>Your Tasks ({todos.length})</h2>
      {renderContent()}
    </div>
  );
}

