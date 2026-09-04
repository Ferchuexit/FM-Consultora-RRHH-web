import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// Vite config — versión simplificada para correr fuera del entorno de Figma Make.
// (El archivo original dependía de plugins y de un archivo ./.figma/make/site.json
// que solo existen dentro de la plataforma de Figma; acá no hacen falta.)
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: parseInt(process.env.PORT || '8443'),
  },
  preview: {
    port: parseInt(process.env.PORT || '8443'),
  },
})
