// Define routes for the @fastify/react integration
export default [
  {
    id: 'index',
    path: '/',
    name: 'Home',
    // For @fastify/react integration - this function will import the component
    element: () => import('./components/App').then(m => m.App),
    // Data fetching function for server-side rendering
    getData: async ({ serverURL }) => {
      try {
        // Use serverURL for server-side data fetching
        const url = serverURL ? `${serverURL}/api/todos` : '/api/todos';
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        
        const todos = await response.json();
        return { todos };
      } catch (error) {
        console.error('Error fetching todos in route data:', error);
        return { todos: [] };
      }
    }
  }
];

