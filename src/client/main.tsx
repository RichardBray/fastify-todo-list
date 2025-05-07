import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import './styles.css';

// This file is used when running the app in development mode with Vite
// The @fastify/react integration will use index.jsx for server-side rendering

// Root component that wraps our App with context
function Root() {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Get the root element and render our app
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<Root />);
}

