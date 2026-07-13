import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Permite exponer el dev server por dominios externos (ngrok, etc.).
    // El punto inicial habilita cualquier subdominio de ese dominio; como el
    // subdominio de ngrok cambia en cada sesión, así no hay que editarlo cada vez.
    allowedHosts: ['.ngrok-free.dev', '.ngrok-free.app', '.ngrok.io', '.ngrok.app'],
  },
})
