import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';


const DEV_PORT = 5173;

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
  ],
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'lucide-react',
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: DEV_PORT,
    strictPort: true,
    host: 'localhost',
    open: true,
    hmr: {
      host: 'localhost',
      port: DEV_PORT,
    },
  },
  preview: {
    port: DEV_PORT,
    strictPort: true,
    headers: {
      'Cache-Control': 'no-store',
    },
  },
});
