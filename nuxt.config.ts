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
        // ⚠️ NO font preloads here. Two used to sit at
        // `/_nuxt/assets/css/fonts/<name>.woff2`, which is the SOURCE path —
        // Vite emits these hashed (`/_nuxt/proxima-nova-regular.7V0hsHkj.woff2`),
        // so both hints 404'd on every page while the fonts they were meant to
        // warm still loaded late off the stylesheet. A hint that cannot be
        // written correctly from static config is worse than none: it costs two
        // requests and buys nothing. Every face is `font-display: swap` in
        // main.css, so text paints immediately either way.
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
      // `/` and the feature pages are the live site. The archived landings
      // (/classic, /glass, /next, /director, /automation, /live-2026-07) are
      // deliberately NOT prerendered: they are noindex, nothing links to them,
      // and prerendering six full sell sheets on every build to serve nobody is
      // pure build time. The static host falls back to the SPA shell for them,
      // so the routes still resolve for anyone holding an old link.
      routes: ['/privacy-policy', '/terms-of-service', '/features', '/blog', ...featureRoutes],
    },
  },

  // ⚠️ @nuxtjs/sitemap builds its index from the routes it can discover and
  // does NOT read the `robots` meta tag, so a `noindex` page still lands in
  // sitemap.xml unless it is excluded here. Every archived landing is listed.
  sitemap: {
    exclude: [
      '/classic',
      '/glass',
      '/next',
      '/director',
      '/automation',
      '/live-2026-07',
      '/meeting-follow-up',
    ],
  },

  routeRules: {
    // Feature slugs that changed identity in the 2026-09 refresh. The surfaces
    // behind them were renamed rather than removed, so these are permanent
    // redirects to the page that now covers the same ground.
    '/features/contextual-ai-sidebar': { redirect: { to: '/features/focus', statusCode: 301 } },
    '/features/director-mode': { redirect: { to: '/features/boardroom', statusCode: 301 } },
    // Retired outright — the app no longer has these surfaces. Each points at
    // the nearest thing that is actually true today rather than 404-ing a URL
    // that may still be linked from an old post.
    '/features/health-snapshots': { redirect: { to: '/features/productivity-engine', statusCode: 301 } },
    '/features/social-inbox': { redirect: { to: '/features/social-ai-generate', statusCode: 301 } },
    '/features/social-analytics': { redirect: { to: '/features/social-ai-generate', statusCode: 301 } },
    '/features/earnest-companion': { redirect: { to: '/features/apps-layout', statusCode: 301 } },
    // The preview route the new landing was built at before it was promoted.
    '/next-home': { redirect: { to: '/', statusCode: 301 } },
    '/next-glass': { redirect: { to: '/', statusCode: 301 } },
  },
});
