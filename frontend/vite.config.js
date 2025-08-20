import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // load .env variables
  const env = loadEnv(mode, process.cwd(), '');
  const API = env.VITE_API_BASE || '';

  return {
    plugins: [react()],
    server: {
      proxy: API ? {} : { '/api': 'http://localhost:4000' },
    },
  };
});
