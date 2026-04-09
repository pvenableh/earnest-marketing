import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  ssr: true,

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2024-10-01',

  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#faf7f4', media: '(prefers-color-scheme: light)' },
        { name: 'theme-color', content: '#141210', media: '(prefers-color-scheme: dark)' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/icon.png' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      appUrl: process.env.APP_URL || 'https://app.earnest.guru',
      directusUrl: process.env.DIRECTUS_URL || 'https://admin.earnest.guru',
    },
  },

  modules: [
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@nuxtjs/sitemap',
  ],

  site: {
    url: 'https://earnest.guru',
  },

  components: [
    { path: '~/components', pathPrefix: true },
  ],

  icon: {
    serverBundle: 'remote',
    clientBundle: { scan: true },
    collections: ['lucide'],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  nitro: {
    prerender: {
      routes: ['/privacy-policy', '/terms-of-service'],
    },
  },
});
