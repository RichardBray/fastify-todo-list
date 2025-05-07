import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyVite from '@fastify/vite';
import fastifyStatic from '@fastify/static';
import { prepareServer } from '@fastify/react';
import path from 'path';
import { fileURLToPath } from 'url';
import { Todo, CreateTodoInput, UpdateTodoInput } from './types';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Fastify instance
const server = Fastify({
  logger: true
});

// In-memory todos storage
const todos: Todo[] = [];

/**
 * Register plugins
 */
async function registerPlugins() {
  // Enable CORS
  await server.register(cors, {
    origin: true
  });

  // Serve static files in production mode only
  if (process.env.NODE_ENV === 'production') {
    await server.register(fastifyStatic, {
      root: path.join(__dirname, '../../dist/client'),
      prefix: '/'
    });
  }

  // Register Vite and React integration
  await server.register(fastifyVite, {
    root: path.join(__dirname, '../../'),
    renderer: '@fastify/react',
    dev: process.env.NODE_ENV !== 'production'
  });
  
  // Prepare server for React integration
  prepareServer(server);
}

/**
 * Register API routes
 */
function registerRoutes() {
  // GET /todos - List all todos
  server.get('/api/todos', async (request, reply) => {
    return todos;
  });

  // POST /todo - Create a new todo
  server.post<{ Body: CreateTodoInput }>('/api/todo', async (request, reply) => {
    const { title } = request.body;
    
    if (!title || title.trim() === '') {
      return reply.code(400).send({ error: 'Title is required' });
    }

    const newTodo: Todo = {
      id: Date.now().toString(),
      title: title.trim(),
      isCompleted: false,
      createdAt: new Date().toISOString()
    };

    todos.push(newTodo);
    return newTodo;
  });

  // PUT /todo/:id - Update a todo
  server.put<{ Params: { id: string }, Body: UpdateTodoInput }>('/api/todo/:id', async (request, reply) => {
    const { id } = request.params;
    const { title, isCompleted } = request.body;
    
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) {
      return reply.code(404).send({ error: 'Todo not found' });
    }
    
    if (title !== undefined) {
      todos[todoIndex].title = title.trim();
    }
    
    if (isCompleted !== undefined) {
      todos[todoIndex].isCompleted = isCompleted;
    }
    
    return todos[todoIndex];
  });

  // DELETE /todo/:id - Delete a todo
  server.delete<{ Params: { id: string } }>('/api/todo/:id', async (request, reply) => {
    const { id } = request.params;
    
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) {
      return reply.code(404).send({ error: 'Todo not found' });
    }
    
    const deletedTodo = todos[todoIndex];
    todos.splice(todoIndex, 1);
    
    return { success: true, deletedTodo };
  });

  // Note: @fastify/react adds its own catch-all route for client-side routing
  // so we don't need to add our own here
}

/**
 * Start the server
 */
async function start() {
  try {
    await registerPlugins();
    registerRoutes();
    
    const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    await server.listen({ port: PORT, host: '0.0.0.0' });
    
    console.log(`Server is running at http://localhost:${PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

// Start the server
start();

