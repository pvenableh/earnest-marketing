import tailwindcss from '@tailwindcss/vite';
import { features } from './app/data/features';

const featureRoutes = features.map((f) => `/features/${f.slug}`);

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
        // SVG favicon adapts to light/dark via prefers-color-scheme.
        // PNG fallback for browsers without SVG-favicon support (older Safari, Edge legacy).
        // favicon.ico in /public is auto-served as the final fallback.
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        // iOS home-screen icons across the common sizes — iOS picks
        // the closest match. apple-touch-icon must be a PNG (Safari
        // ignores SVG here).
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
        { rel: 'apple-touch-icon', href: '/icon-152x152.png', sizes: '152x152' },
        { rel: 'apple-touch-icon', href: '/icon-192x192.png', sizes: '192x192' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/_nuxt/assets/css/fonts/proxima-nova-regular.woff2', crossorigin: '' },
        { rel: 'preload', as: 'font', type: 'font/woff2', href: '/_nuxt/assets/css/fonts/bauer-bodoni-roman.woff2', crossorigin: '' },
      ],
      script: [
        { src: 'https://www.googletagmanager.com/gtag/js?id=G-F8K2L0D8BG', async: true },
        { innerHTML: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-F8K2L0D8BG');" },
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
      routes: ['/privacy-policy', '/terms-of-service', '/features', '/blog', '/next', '/director', '/automation', ...featureRoutes],
    },
  },
});
