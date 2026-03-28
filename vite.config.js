import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Hamed-s-Portfolio/',
  plugins: [react()],
  assetsInclude: ['**/*.JPG', '**/*.JPEG'],
})
