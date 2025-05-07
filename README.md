# Fastify Todo List

A full-stack todo list application built with Fastify on the backend and React on the frontend. This application provides a RESTful API for managing todos and a React-based UI for interacting with the API.

## Features

- Complete todo management:
  - Create new todos
  - View all todos
  - Update todo status (complete/incomplete)
  - Delete todos
- RESTful API architecture
- React frontend with TypeScript
- In-memory data storage

## Technologies Used

### Backend
- **Fastify** - Fast and low overhead web framework
- **TypeScript** - For type-safe code
- **@fastify/cors** - For CORS support
- **@fastify/static** - For serving static files
- **@fastify/vite** - For Vite integration

### Frontend
- **React** - UI library
- **TypeScript** - For type-safe code
- **Vite** - Build tool and development server
- **Fetch API** - For API communication

## API Endpoints

| Method | Endpoint      | Description           | Request Body                            | Response                        |
|--------|---------------|-----------------------|----------------------------------------|--------------------------------|
| GET    | /api/todos    | Get all todos         | -                                      | Array of Todo objects           |
| POST   | /api/todo     | Create a new todo     | `{ "title": "string" }`                | Created Todo object             |
| PUT    | /api/todo/:id | Update a todo         | `{ "title?: "string", "isCompleted?: boolean" }` | Updated Todo object   |
| DELETE | /api/todo/:id | Delete a todo         | -                                      | `{ "success": true, "deletedTodo": Todo }` |

### Todo Object Structure

```typescript
{
  id: string;         // Unique identifier
  title: string;      // Todo text content
  isCompleted: boolean; // Completion status
  createdAt: string;  // ISO date string
}
```

## Project Structure

```
fastify-todo-list/
├── src/
│   ├── server/                  # Backend code
│   │   ├── server.ts            # Fastify server setup and API routes
│   │   └── types.ts             # TypeScript interfaces for the server
│   └── client/                  # Frontend code
│       ├── components/          # React components
│       │   ├── App.tsx          # Main React component
│       │   ├── TodoForm.tsx     # Form for adding todos
│       │   ├── TodoItem.tsx     # Individual todo item
│       │   └── TodoList.tsx     # List of todos
│       ├── types/               # TypeScript types
│       │   └── todo.ts          # Todo interfaces
│       ├── main.tsx             # React entry point
│       └── styles.css           # CSS styles
├── index.html                   # HTML entry point
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Project dependencies
```

## How to Run

### Development Mode

Run both the Vite development server and the Fastify server concurrently:

```bash
# Install dependencies
npm install

# Start development servers
npm run dev
```

This will start:
- Vite dev server at http://localhost:5173 (frontend)
- Fastify server at http://localhost:3000 (backend)

The Vite server is configured to proxy API requests to the Fastify server.

### Production Mode

Build and run the application for production:

```bash
# Build client and server
npm run build

# Start production server
npm run start
```

This will build the React app and serve it via Fastify at http://localhost:3000.

## Coding Standards

This project follows these coding standards:
- Function declarations instead of function expressions
- Boolean variables prefixed with verbs (is, has, can)
- Short and focused functions (< 20 lines)
- Single level of abstraction per function
- TypeScript interfaces over types

