import { resolve } from "path";
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  resolve: {
    alias: {
      "@": resolve(__dirname, 'src')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://192.168.20.80:8086/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  },
});
