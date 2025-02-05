import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/js/app.tsx',
      refresh: true,
    }),
    react(),
  ],
  server: {
    host: '127.0.0.1', // Use localhost or 127.0.0.1 instead of [::1]
    port: 5173,
    hmr: {
      host: '127.0.0.1', // Use the same host as the server
      port: 5173,
    },
    cors: true,
  },
});
