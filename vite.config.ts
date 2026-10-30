import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// The room is a plain static folder in public/, so a real static server resolves
// /room/ to /room/index.html. Vite's dev server would otherwise fall back to the
// portfolio's own index.html; rewrite the directory request before that happens.
function roomDirectory(): Plugin {
  const rewrite = (req: { url?: string }) => {
    if (req.url === '/room' || req.url === '/room/') req.url = '/room/index.html'
  }
  return {
    name: 'room-directory',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        rewrite(req as { url?: string })
        next()
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        rewrite(req as { url?: string })
        next()
      })
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [react(), roomDirectory()],
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
