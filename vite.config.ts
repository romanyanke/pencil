import react from '@vitejs/plugin-react'
import { defineConfig, type ViteUserConfig } from 'vitest/config'

export default defineConfig((): ViteUserConfig => {
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
