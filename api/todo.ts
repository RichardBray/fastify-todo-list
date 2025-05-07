import { VercelRequest, VercelResponse } from '@vercel/node';
import { createTodo, CreateTodoInput } from './_db.js';

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

  // Only allow POST requests for this endpoint
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Validate request body
    const { title } = req.body as CreateTodoInput;
    
    if (!title || typeof title !== 'string') {
      return res.status(400).json({ error: 'Title is required and must be a string' });
    }

    // Create new todo
    const newTodo = createTodo({ title });
    return res.status(201).json(newTodo);
  } catch (error) {
    console.error('Error creating todo:', error);
    
    // Handle validation errors separately from server errors
    if (error instanceof Error && error.message === 'Title is required') {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

