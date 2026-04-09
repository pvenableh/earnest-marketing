<script setup lang="ts">
const config = useRuntimeConfig();
const appUrl = config.public.appUrl || 'https://app.earnest.guru';
const scrolled = ref(false);

function onScroll() {
  scrolled.value = window.scrollY > 20;
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>

<template>
  <nav class="site-nav" :class="{ 'site-nav-scrolled': scrolled }">
    <div class="site-nav-inner">
      <div class="site-nav-side site-nav-left">
        <nuxt-link to="/features" class="site-nav-link">Features</nuxt-link>
        <nuxt-link to="/blog" class="site-nav-link">Blog</nuxt-link>
      </div>

      <nuxt-link to="/" class="site-nav-brand">
        <span class="site-nav-name">Earnest<span class="site-nav-dot">.</span></span>
        <span class="site-nav-tagline">Do good work.</span>
      </nuxt-link>

      <div class="site-nav-side site-nav-right">
        <a href="#pricing" class="site-nav-link">Pricing</a>
        <a :href="appUrl + '/auth/signin'" class="site-nav-signin">Sign In</a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.site-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  padding: 0 28px;
  background: transparent;
  border-bottom: 1px solid transparent;
  transition:
    background 0.35s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.35s cubic-bezier(0.16, 1, 0.3, 1),
    backdrop-filter 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.site-nav-scrolled {
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom-color: rgba(0, 0, 0, 0.06);
}

.site-nav-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  height: 60px;
  position: relative;
}

.site-nav-side {
  display: flex;
  align-items: center;
  gap: 24px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.site-nav-left { left: 0; }
.site-nav-right { right: 0; }

.site-nav-brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  gap: 1px;
}

.site-nav-name {
  font-family: 'Bauer Bodoni Pro_1 W05 Roman', Georgia, serif;
  font-size: 20px;
  font-weight: 400;
  color: #0a0a0a;
  letter-spacing: -0.01em;
  line-height: 1;
}

.site-nav-dot {
  color: #00bfff;
}

.site-nav-tagline {
  font-family: 'Gaegu', cursive;
  font-size: 10px;
  color: #a1a1aa;
  letter-spacing: 0.02em;
  line-height: 1;
}

.site-nav-link {
  font-family: 'Proxima Nova W01 Regular', system-ui, sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #6b7280;
  text-decoration: none;
  transition: color 0.2s;
  letter-spacing: 0.01em;
}

.site-nav-link:hover {
  color: #0a0a0a;
}

.site-nav-signin {
  font-family: 'Proxima Nova W01 Regular', system-ui, sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #0a0a0a;
  text-decoration: none;
  padding: 7px 18px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 100px;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.site-nav-signin:hover {
  background: #0a0a0a;
  color: white;
  border-color: #0a0a0a;
}

@media (max-width: 700px) {
  .site-nav { padding: 0 16px; }
  .site-nav-inner { height: 52px; }
  .site-nav-side { gap: 16px; }
  .site-nav-left { position: static; transform: none; }
  .site-nav-right { position: static; transform: none; }
  .site-nav-inner {
    justify-content: space-between;
  }
  .site-nav-brand { display: none; }
  .site-nav-link { font-size: 12px; }
  .site-nav-signin { font-size: 12px; padding: 6px 14px; }
}
</style>
