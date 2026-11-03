import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  // Load env files from this package only. The repo-root .env holds server settings.
  envDir: '.',
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true,
  },
});
