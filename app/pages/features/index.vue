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
  <div class="fp">
    <SiteNav />

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

    <SiteFooter />
  </div>
</template>

<style scoped>
.fp {
  background: #fcfcfc;
  color: #0a0a0a;
  font-family: 'Proxima Nova W01 Regular', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.fp-hero {
  text-align: center;
  padding: 120px 32px 60px;
  max-width: 800px;
  margin: 0 auto;
}
.fp-kicker {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #00bfff;
  margin-bottom: 16px;
}
.fp-title {
  font-family: 'Bauer Bodoni Pro_1 W05 Roman', Georgia, serif;
  font-size: clamp(36px, 6vw, 64px);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.02em;
}
.fp-dot { color: #00bfff; }
.fp-sub {
  font-size: 17px;
  color: #6b7280;
  margin-top: 20px;
  line-height: 1.6;
}

/* Glass cards grid */
.fp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 32px 100px;
}
.fp-card {
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.04);
  border-radius: 16px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
}
.fp-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transform: translateY(-2px);
}
.fp-card:hover .fp-card-arrow { opacity: 1; color: #00bfff; }
.fp-card:active { transform: scale(0.98); }
.fp-card-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 10px;
  margin-bottom: 14px;
  color: #0a0a0a;
  font-size: 18px;
}
.fp-card-name {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 6px;
}
.fp-card-desc {
  font-size: 13px;
  color: #6b7280;
  line-height: 1.6;
  flex: 1;
}
.fp-card-arrow {
  position: absolute;
  top: 24px;
  right: 24px;
  font-size: 16px;
  color: #a1a1aa;
  opacity: 0;
  transition: opacity 0.2s, color 0.2s;
}

/* CTA */
.fp-cta {
  text-align: center;
  padding: 72px 32px;
  margin: 0 32px;
  background: #0a0a0a;
  color: white;
  border-radius: 20px;
  margin-bottom: 60px;
  max-width: 1136px;
  margin-left: auto;
  margin-right: auto;
}
.fp-cta-title {
  font-family: 'Bauer Bodoni Pro_1 W05 Roman', Georgia, serif;
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 400;
}
.fp-cta-sub {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 10px;
}
.fp-cta-btn {
  display: inline-block;
  margin-top: 24px;
  padding: 14px 36px;
  background: white;
  color: #0a0a0a;
  font-weight: 600;
  font-size: 14px;
  border-radius: 100px;
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.fp-cta-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(255, 255, 255, 0.15); }

@media (max-width: 700px) {
  .fp-hero { padding: 80px 20px 40px; }
  .fp-grid { padding: 20px 16px 60px; grid-template-columns: 1fr; }
  .fp-cta { margin: 0 16px 40px; padding: 48px 24px; border-radius: 16px; }
}
</style>
