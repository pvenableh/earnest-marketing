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
  font-family: 'Bauer Bodoni Pro_1 W05 Roman', Georgia, serif;
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
