
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  // Robustly find the API Key: Check VITE_ prefix (common convention) and standard name
  const apiKey = env.API_KEY || env.VITE_API_KEY || process.env.API_KEY || process.env.VITE_API_KEY;

  return {
    plugins: [react()],
    define: {
      // Inject the key into process.env.API_KEY for the app to use
      'process.env.API_KEY': JSON.stringify(apiKey),
    },
    server: {
      port: 3000,
    },
    build: {
      outDir: 'dist',
    }
  };
});
