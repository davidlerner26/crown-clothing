import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Optional: matches CRA's default build folder name
  },
  server: {
    port: 3000, // Optional: matches CRA's default port
    open: true, // Optional: opens the app in the browser on start
  },
});
