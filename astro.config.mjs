// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';

import tailwindcss from '@tailwindcss/vite';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  // Habilitar SSR completamente
  output: 'server',
  
  integrations: [
    vue()
  ],

  vite: {
    plugins: [tailwindcss()],
    // Optimización para GSAP
    ssr: {
      noExternal: ['gsap']
    }
  },

  adapter: node({
    mode: 'standalone'
  })
});