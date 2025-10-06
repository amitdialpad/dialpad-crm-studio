import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

export default defineConfig({
  base: '/dialpad-crm-studio/',
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src') } }
})
