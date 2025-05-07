import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

/**
 * Component for displaying a single todo item
 */
export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="todo-item">
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
        />
        <span className={todo.isCompleted ? 'todo-title completed' : 'todo-title'}>
          {todo.title}
        </span>
      </div>
      <button 
        onClick={() => onDelete(todo.id)}
        className="delete-button"
        aria-label="Delete todo"
      >
        Delete
      </button>
    </li>
  );
}

