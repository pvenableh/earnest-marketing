<script setup lang="ts">
import { features } from '~/data/features';

const description = 'Explore every feature in Earnest — the AI-powered business operating system. Projects, CRM, invoicing, marketing, AI intelligence, and 20+ tools in one platform.';

useHead({
  title: 'Features — Earnest',
  link: [{ rel: 'canonical', href: 'https://earnest.guru/features' }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Earnest Features',
        description,
        url: 'https://earnest.guru/features',
        mainEntity: {
          '@type': 'SoftwareApplication',
          name: 'Earnest',
          applicationCategory: 'BusinessApplication',
          featureList: features.map((f) => f.name).join(', '),
        },
      }),
    },
  ],
});

useSeoMeta({
  title: 'Features — Earnest',
  ogTitle: 'Features — Earnest',
  description,
  ogDescription: description,
  ogType: 'website',
  ogUrl: 'https://earnest.guru/features',
  ogSiteName: 'Earnest',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Features — Earnest',
  twitterDescription: description,
});

const config = useRuntimeConfig();
const appUrl = config.public.appUrl || 'https://app.earnest.guru';
</script>

<template>
  <div class="features-page">
    <nav class="fp-nav">
      <nuxt-link to="/" class="fp-nav-brand">
        <LogoEarnest size="sm" />
      </nuxt-link>
      <div class="fp-nav-links">
        <nuxt-link to="/" class="fp-nav-link">Home</nuxt-link>
        <nuxt-link to="/blog" class="fp-nav-link">Blog</nuxt-link>
      </div>
    </nav>

    <header class="fp-hero">
      <p class="fp-kicker">The full platform</p>
      <h1 class="fp-title">
        {{ features.length }} features<span class="fp-dot">.</span>
        <br />One platform<span class="fp-dot">.</span>
      </h1>
      <p class="fp-sub">
        Everything your business needs to operate, grow, and stay sharp.
        Nothing it doesn't.
      </p>
    </header>

    <section class="fp-grid">
      <nuxt-link
        v-for="feature in features"
        :key="feature.slug"
        :to="`/features/${feature.slug}`"
        class="fp-card"
      >
        <div class="fp-card-icon">
          <UIcon :name="feature.icon" />
        </div>
        <h2 class="fp-card-name">{{ feature.name }}</h2>
        <p class="fp-card-desc">{{ feature.desc.slice(0, 120) }}...</p>
        <span class="fp-card-arrow">&rarr;</span>
      </nuxt-link>
    </section>

    <section class="fp-cta">
      <h2 class="fp-cta-title">Ready to do good work<span class="fp-dot">?</span></h2>
      <p class="fp-cta-sub">Start your free trial — every feature included.</p>
      <a :href="appUrl + '/register'" class="fp-cta-btn">Get started</a>
    </section>

    <footer class="fp-footer">
      <p>&copy; {{ new Date().getFullYear() }} Earnest. All rights reserved.</p>
      <div class="fp-footer-links">
        <nuxt-link to="/privacy-policy">Privacy</nuxt-link>
        <nuxt-link to="/terms-of-service">Terms</nuxt-link>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.features-page {
  --fp-bg: #faf7f4;
  --fp-text: #0a0a0a;
  --fp-muted: #6b7280;
  --fp-pop: #00bfff;
  --fp-border: rgba(0, 0, 0, 0.06);
  --fp-font: 'Proxima Nova W01 Regular', system-ui, sans-serif;
  --fp-font-display: 'Bauer Bodoni Pro_1 W05 Roman', Georgia, serif;

  background: var(--fp-bg);
  color: var(--fp-text);
  font-family: var(--fp-font);
  -webkit-font-smoothing: antialiased;
}

/* Nav */
.fp-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 32px;
  max-width: 1200px;
  margin: 0 auto;
}
.fp-nav-brand { display: flex; align-items: center; }
.fp-nav-links { display: flex; gap: 24px; }
.fp-nav-link {
  font-size: 14px;
  color: var(--fp-muted);
  text-decoration: none;
  transition: color 0.2s;
}
.fp-nav-link:hover { color: var(--fp-text); }

/* Hero */
.fp-hero {
  text-align: center;
  padding: 100px 32px 60px;
  max-width: 800px;
  margin: 0 auto;
}
.fp-kicker {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--fp-pop);
  margin-bottom: 16px;
}
.fp-title {
  font-family: var(--fp-font-display);
  font-size: clamp(36px, 6vw, 64px);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.02em;
}
.fp-dot { color: var(--fp-pop); }
.fp-sub {
  font-size: 18px;
  color: var(--fp-muted);
  margin-top: 20px;
  line-height: 1.6;
}

/* Grid */
.fp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 32px 100px;
}
.fp-card {
  display: flex;
  flex-direction: column;
  padding: 28px;
  background: white;
  border: 1px solid var(--fp-border);
  border-radius: 16px;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.3s, transform 0.3s;
  position: relative;
}
.fp-card:hover {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}
.fp-card:hover .fp-card-arrow { opacity: 1; color: var(--fp-pop); }
.fp-card-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--fp-bg);
  border-radius: 10px;
  margin-bottom: 16px;
  color: var(--fp-text);
  font-size: 20px;
}
.fp-card-name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}
.fp-card-desc {
  font-size: 14px;
  color: var(--fp-muted);
  line-height: 1.6;
  flex: 1;
}
.fp-card-arrow {
  position: absolute;
  top: 28px;
  right: 28px;
  font-size: 18px;
  color: var(--fp-muted);
  opacity: 0;
  transition: opacity 0.2s, color 0.2s;
}

/* CTA */
.fp-cta {
  text-align: center;
  padding: 80px 32px;
  background: var(--fp-text);
  color: white;
}
.fp-cta-title {
  font-family: var(--fp-font-display);
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 400;
}
.fp-cta-sub {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 12px;
}
.fp-cta-btn {
  display: inline-block;
  margin-top: 28px;
  padding: 14px 36px;
  background: var(--fp-pop);
  color: white;
  font-weight: 600;
  font-size: 15px;
  border-radius: 10px;
  text-decoration: none;
  transition: opacity 0.2s;
}
.fp-cta-btn:hover { opacity: 0.9; }

/* Footer */
.fp-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;
  font-size: 13px;
  color: var(--fp-muted);
}
.fp-footer-links { display: flex; gap: 20px; }
.fp-footer-links a { color: var(--fp-muted); text-decoration: none; }
.fp-footer-links a:hover { color: var(--fp-text); }

@media (max-width: 700px) {
  .fp-hero { padding: 60px 20px 40px; }
  .fp-grid { padding: 20px 16px 60px; grid-template-columns: 1fr; }
  .fp-footer { flex-direction: column; gap: 12px; text-align: center; }
}
</style>
