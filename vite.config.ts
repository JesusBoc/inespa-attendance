import { defineConfig } from 'vite';
import { resolve } from 'path'

export default defineConfig({
  base: './', // Vital para que los assets carguen bien en GitHub Pages
  build: {
    outDir: 'docs', // Cambiamos dist por docs
    emptyOutDir: true, // Limpia la carpeta docs antes de cada build
    rollupOptions: {
        input: {
            main: resolve(__dirname, 'index.html'),
            vista1: resolve(__dirname, 'clases.html'),
            vista2: resolve(__dirname, 'asistencia.html'),
            dashboard: resolve(__dirname, 'dashboard.html'),
            adminPanel: resolve(__dirname, 'adminPanel.html')
        }
    }
  },
});