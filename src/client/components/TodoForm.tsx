import { useState, FormEvent } from 'react';

interface TodoFormProps {
  onAddTodo: (title: string) => Promise<void>;
}

/**
 * Form component for adding new todos
 */
export function TodoForm({ onAddTodo }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  /**
   * Handles form submission
   */
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    if (!title.trim() || isSubmitting) {
      return;
    }
    
    try {
      setIsSubmitting(true);
      await onAddTodo(title);
      setTitle('');
    } catch (error) {
      console.error('Failed to add todo:', error);
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="todo-input"
        disabled={isSubmitting}
      />
      <button 
        type="submit" 
        className="add-button"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
}

