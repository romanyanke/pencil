import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    plugins: [react()],
    server: {
      allowedHosts: ['ypro.local'],
      port: 3000,
    },
    test: {
      globals: true,
      environment: 'jsdom',
    },
  }
})
