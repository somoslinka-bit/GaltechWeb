import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      // En producción todos los archivos se cargan desde Vercel, para que la web
      // funcione igual cuando la muestra el plugin de WordPress en galtech.com.ar
      base: mode === 'production' ? 'https://galtech-web.vercel.app/' : '/',
      build: {
        rollupOptions: {
          output: {
            // Nombres fijos (sin hash): si el plugin tiene guardado un HTML viejo,
            // igual apunta a archivos que existen después de cada deploy
            entryFileNames: 'assets/[name].js',
            chunkFileNames: 'assets/[name].js',
            assetFileNames: 'assets/[name][extname]',
          },
        },
      },
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
