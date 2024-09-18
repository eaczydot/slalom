import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    root: path.resolve(__dirname),
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          icon: true,
        },
      }),
    ],
    server: {
      host: '0.0.0.0',
      port: 3000,
    },
    build: {
      outDir: 'dist',
      minify: 'terser', // Explicitly set minify to use Terser
      sourcemap: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    define: {
      'process.env': env
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'chart.js', 'react-chartjs-2']
    }
  }
})