import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    },
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json']
  },
  // Define environment variables for client
  define: {
    // In production (Vercel), the API calls will be to the same domain
    // In development, we use the proxy defined above
    'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VERCEL_URL ? 
      `https://${process.env.VERCEL_URL}` : '')
  }
});

