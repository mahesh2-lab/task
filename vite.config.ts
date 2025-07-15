import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
    base: '/task/', 
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    minify: 'esbuild',
    target: 'esnext',
    sourcemap: false,
    outDir: 'dist',
    chunkSizeWarningLimit: 500,
  },
});
