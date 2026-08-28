// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';

import tailwindcss from '@tailwindcss/vite';

import node from '@astrojs/node';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Habilitar SSR completamente
  output: 'server',

  site: 'https://dronwind.cl',

  integrations: [
    vue(),
    sitemap({
      filter: (page) => !page.includes('/admin') && !page.includes('/api'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-CL'
        }
      }
    })
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