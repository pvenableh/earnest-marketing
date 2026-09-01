<script setup lang="ts">
const config = useRuntimeConfig();
const appUrl = config.public.appUrl || 'https://app.earnest.guru';
const scrolled = ref(false);
const demoOpen = ref(false);
const demoRef = ref<HTMLElement | null>(null);

const soloDemoUrl = `${appUrl}/try-demo?persona=solo`;
const agencyDemoUrl = `${appUrl}/try-demo?persona=agency`;
// Flip off if the agency endpoint is taken down — the dropdown will revert
// to showing "Coming soon" automatically.
const AGENCY_DEMO_READY = true;

function onScroll() {
  scrolled.value = window.scrollY > 20;
}

function onDocClick(e: MouseEvent) {
  if (!demoRef.value) return;
  if (!demoRef.value.contains(e.target as Node)) demoOpen.value = false;
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('click', onDocClick);
  onScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
  document.removeEventListener('click', onDocClick);
});
</script>

<template>
  <nav class="site-nav" :class="{ 'site-nav-scrolled': scrolled }">
    <div class="site-nav-inner">
      <div class="site-nav-side site-nav-left">
        <nuxt-link to="/features" class="site-nav-link">Features</nuxt-link>
        <nuxt-link to="/blog" class="site-nav-link">Blog</nuxt-link>
        <div ref="demoRef" class="site-nav-demo">
          <button
            type="button"
            class="site-nav-link site-nav-demo-trigger"
            :aria-expanded="demoOpen"
            aria-haspopup="menu"
            @click.stop="demoOpen = !demoOpen"
          >
            See it live
            <svg class="site-nav-caret" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
              <path d="M1 3 L5 7 L9 3" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <div v-if="demoOpen" class="site-nav-menu" role="menu">
            <a :href="soloDemoUrl" class="site-nav-menu-item" role="menuitem" @click="demoOpen = false">
              <span class="site-nav-menu-title">Solo demo</span>
              <span class="site-nav-menu-desc">One creator, live data, ~2&nbsp;min walkthrough.</span>
            </a>
            <a
              v-if="AGENCY_DEMO_READY"
              :href="agencyDemoUrl"
              class="site-nav-menu-item"
              role="menuitem"
              @click="demoOpen = false"
            >
              <span class="site-nav-menu-title">Agency demo</span>
              <span class="site-nav-menu-desc">Team pipeline, marketing, billing (admin view).</span>
            </a>
            <span
              v-else
              class="site-nav-menu-item site-nav-menu-item-disabled"
              :title="'Admin-role agency walkthrough — shipping soon.'"
              role="menuitem"
              aria-disabled="true"
            >
              <span class="site-nav-menu-title">
                Agency demo
                <span class="site-nav-menu-pill">Soon</span>
              </span>
              <span class="site-nav-menu-desc">Team pipeline, marketing, billing (admin view).</span>
            </span>
          </div>
        </div>
      </div>

      <nuxt-link to="/" class="site-nav-brand">
        <span class="site-nav-name">Earnest<span class="site-nav-dot">.</span></span>
        <span class="site-nav-tagline">Do good work.</span>
      </nuxt-link>

      <div class="site-nav-side site-nav-right">
        <!-- `#pricing` only exists on the landing, so off-home this was a dead
             anchor that scrolled nowhere. `/#pricing` navigates home first. -->
        <nuxt-link to="/#pricing" class="site-nav-link">Pricing</nuxt-link>
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
  font-family: 'Proxima Nova W01 Regular', system-ui, sans-serif;
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
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
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

/* Demo dropdown */
.site-nav-demo { position: relative; }
.site-nav-demo-trigger {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.site-nav-caret {
  transition: transform 0.2s ease;
}
.site-nav-demo-trigger[aria-expanded="true"] .site-nav-caret {
  transform: rotate(180deg);
}
.site-nav-menu {
  position: absolute;
  top: calc(100% + 10px);
  left: -8px;
  min-width: 240px;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: saturate(180%) blur(24px);
  -webkit-backdrop-filter: saturate(180%) blur(24px);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  padding: 6px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  z-index: 60;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.site-nav-menu-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 12px;
  border-radius: 8px;
  text-decoration: none;
  color: #0a0a0a;
  transition: background 0.2s ease;
  cursor: pointer;
}
.site-nav-menu-item:hover {
  background: rgba(0, 191, 255, 0.06);
}
.site-nav-menu-item-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
.site-nav-menu-item-disabled:hover {
  background: transparent;
}
.site-nav-menu-title {
  font-size: 13px;
  font-weight: 600;
  color: #0a0a0a;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.site-nav-menu-desc {
  font-size: 11px;
  color: #6b7280;
  line-height: 1.4;
}
.site-nav-menu-pill {
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  background: #0a0a0a;
  color: #fff;
  padding: 2px 7px;
  border-radius: 100px;
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
  .site-nav-menu {
    left: 0;
    right: auto;
    min-width: 220px;
  }
}
</style>
