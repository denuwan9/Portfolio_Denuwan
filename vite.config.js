import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path for GitHub Pages - change 'Portfolio_Denuwan' to your repo name
  base: '/Portfolio_Denuwan/',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          framer: ['framer-motion'],
        },
      },
    },
  },
})
