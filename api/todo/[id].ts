import { VercelRequest, VercelResponse } from '@vercel/node';
import { updateTodo, deleteTodo, UpdateTodoInput } from '../_db.js';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Get todo ID from the URL
  const { id } = req.query;
  
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid todo ID' });
  }

  try {
    // Handle PUT request (update todo)
    if (req.method === 'PUT') {
      const updateData = req.body as UpdateTodoInput;
      
      // Validate update data
      if (
        (updateData.title !== undefined && typeof updateData.title !== 'string') ||
        (updateData.isCompleted !== undefined && typeof updateData.isCompleted !== 'boolean')
      ) {
        return res.status(400).json({ 
          error: 'Invalid update data. Title must be a string and isCompleted must be a boolean.' 
        });
      }
      
      const updatedTodo = updateTodo(id, updateData);
      return res.status(200).json(updatedTodo);
    }
    
    // Handle DELETE request (delete todo)
    if (req.method === 'DELETE') {
      const result = deleteTodo(id);
      return res.status(200).json(result);
    }
    
    // Handle unsupported methods
    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error(`Error processing ${req.method} request for todo ${id}:`, error);
    
    // Handle "not found" errors specifically
    if (error instanceof Error && error.message === 'Todo not found') {
      return res.status(404).json({ error: error.message });
    }
    
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

