import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/chaiAI/',
  plugins: [react(), tailwindcss()],
  server: {
    // 本地开发：把 /api 代理到本地联系表单后端（server/ 目录，默认 :3001）
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
