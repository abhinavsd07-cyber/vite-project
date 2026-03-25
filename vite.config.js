import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5173,
    strictPort: true,
    open: true, // Automatically open the correct browser tab
    watch: {
      usePolling: true, // Ensures file saves are always detected on Windows
    }
  }
})
