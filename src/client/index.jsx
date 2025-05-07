import React from 'react';
import routes from './routes.js';
import { App } from './components/App';

// This is the main entry point for @fastify/react
export default function createApp() {
  return {
    // Routes for server-side handling
    routes,
    // Function that returns the root component
    render() {
      return (props) => <App {...props} />;
    }
  };
}

