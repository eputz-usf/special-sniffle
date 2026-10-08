import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Keep the live browser dependency cache separate from SSR test servers.
  cacheDir: 'node_modules/.vite-dev',
  plugins: [react()],
})
