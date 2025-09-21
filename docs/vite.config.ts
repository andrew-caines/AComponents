import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@acomponents/core': path.resolve(__dirname, '../src'),
      // Add alias for parent library's utils
      '@/utils': path.resolve(__dirname, '../src/utils'),
    },
  },
  server: {
    port: 3001,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  optimizeDeps: {
    include: ['@radix-ui/colors'],
  },
})
