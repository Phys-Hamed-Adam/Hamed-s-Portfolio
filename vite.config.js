import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/Hamed-s-Portfolio/' : '/',
  plugins: [react()],
  assetsInclude: ['**/*.JPG', '**/*.JPEG'],
}))
