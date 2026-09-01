<script setup lang="ts">
// The app's own public pages sign themselves with both wordmarks; the footer
// here is the pattern they follow, so it carries the two links a visitor who
// has scrolled this far is actually looking for — try it, or get back in.
const config = useRuntimeConfig();
const appUrl = (config.public.appUrl as string) || 'https://app.earnest.guru';
const demoUrl = `${appUrl}/try-demo?persona=solo`;
// ⚠️ `/auth/signin`, not `/login` — the app has no `/login` route.
const signInUrl = `${appUrl}/auth/signin`;
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer-inner">
      <div class="site-footer-brand">
        <span class="site-footer-name">Earnest<span class="site-footer-dot">.</span></span>
        <span class="site-footer-tagline">Do good work.</span>
      </div>
      <div class="site-footer-links">
        <nuxt-link to="/features">Features</nuxt-link>
        <nuxt-link to="/blog">Blog</nuxt-link>
        <nuxt-link to="/privacy-policy">Privacy</nuxt-link>
        <nuxt-link to="/terms-of-service">Terms</nuxt-link>
        <a :href="demoUrl">Live demo</a>
        <a :href="signInUrl">Sign in</a>
      </div>
      <p class="site-footer-copy">&copy; {{ new Date().getFullYear() }} Earnest. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  padding: 48px 32px;
}

.site-footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.site-footer-brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.site-footer-name {
  font-family: 'Proxima Nova W01 Regular', system-ui, sans-serif;
  font-size: 18px;
  color: #0a0a0a;
  line-height: 1;
}

.site-footer-dot { color: #00bfff; }

.site-footer-tagline {
  font-family: 'Gaegu', cursive;
  font-size: 10px;
  color: #a1a1aa;
}

.site-footer-links {
  display: flex;
  gap: 24px;
}

.site-footer-links a {
  font-size: 13px;
  color: #6b7280;
  text-decoration: none;
  transition: color 0.2s;
}

.site-footer-links a:hover { color: #0a0a0a; }

.site-footer-copy {
  font-size: 12px;
  color: #a1a1aa;
}
</style>
