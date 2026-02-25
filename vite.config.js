import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // SPA fallback — all unknown routes serve index.html so React Router handles them
    historyApiFallback: true,
  },
})
