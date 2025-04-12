import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '/dev-overflow.github.io/',  // Correct base URL for your repo
  plugins: [react()],
})
