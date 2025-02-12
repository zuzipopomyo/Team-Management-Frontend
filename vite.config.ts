import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
    host: 'localhost'
  },
  plugins: [
    react(),
    svgr(),
    checker({
      typescript: true,
      eslint: {
        dev: {
          logLevel: ['error']
        },
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"' // for example, lint .ts & .tsx
      }
    })
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: /^~/, replacement: '' }
    ]
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
});
