import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://dev_server:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src/app'),

      '@api': path.resolve(__dirname, './src/services/api'),
      '@socket': path.resolve(__dirname, './src/services/socket'),
      
      '@components': path.resolve(__dirname, './src/components'),
      '@controllers': path.resolve(__dirname, './src/controllers'),
      '@form': path.resolve(__dirname, './src/components/form'),
      '@layout': path.resolve(__dirname, './src/components/layout'),
      '@section': path.resolve(__dirname, './src/components/section'),
      '@ui': path.resolve(__dirname, './src/components/ui'),

      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@css': path.resolve(__dirname, './src/css'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@utils': path.resolve(__dirname, './src/utils')
    },
    extensions: ['.js', '.jsx'],
  }
})
