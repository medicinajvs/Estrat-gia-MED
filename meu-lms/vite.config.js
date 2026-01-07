import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// SUBSTITUA 'nome-do-seu-repositorio' PELO NOME QUE ESTÁ NO GITHUB
export default defineConfig({
  plugins: [react()],
  base: '/Estrat-gia-MED/', 
})