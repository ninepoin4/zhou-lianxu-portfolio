import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5279,
    strictPort: false,
    watch: {
      ignored: ['**/*.tmpdir/**', '**/*.tmp', '**/.git/**'],
    },
  },
  build: {
    target: 'es2020',
    assetsInlineLimit: 2048,
  },
})
