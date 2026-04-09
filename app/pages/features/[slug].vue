<script setup lang="ts">
import { features, getFeatureBySlug, getRelatedFeatures } from '~/data/features';

const route = useRoute();
const slug = route.params.slug as string;
const feature = getFeatureBySlug(slug);

if (!feature) {
  throw createError({ statusCode: 404, statusMessage: 'Feature not found' });
}

const related = getRelatedFeatures(slug, 3);
const config = useRuntimeConfig();
const appUrl = config.public.appUrl || 'https://app.earnest.guru';

const title = `${feature.name} — Earnest`;
const description = feature.desc;

useHead({
  title,
  link: [{ rel: 'canonical', href: `https://earnest.guru/features/${slug}` }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Earnest',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        featureList: feature.name,
        description: feature.desc,
        url: `https://earnest.guru/features/${slug}`,
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'USD',
          lowPrice: '49',
          highPrice: '299',
          offerCount: 3,
        },
      }),
    },
  ],
});

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogType: 'website',
  ogUrl: `https://earnest.guru/features/${slug}`,
  ogSiteName: 'Earnest',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
});
</script>

<template>
  <div class="fd-page">
    <nav class="fd-nav">
      <nuxt-link to="/" class="fd-nav-brand">
        <LogoEarnest size="sm" />
      </nuxt-link>
      <div class="fd-nav-links">
        <nuxt-link to="/features" class="fd-nav-link">All Features</nuxt-link>
        <nuxt-link to="/blog" class="fd-nav-link">Blog</nuxt-link>
      </div>
    </nav>

    <article class="fd-article">
      <header class="fd-hero">
        <nuxt-link to="/features" class="fd-breadcrumb">&larr; All Features</nuxt-link>
        <div class="fd-hero-icon">
          <UIcon :name="feature.icon" />
        </div>
        <h1 class="fd-title">{{ feature.name }}<span class="fd-dot">.</span></h1>
        <p class="fd-desc">{{ feature.desc }}</p>
      </header>

      <section class="fd-benefits">
        <h2 class="fd-section-title">What you get</h2>
        <ul class="fd-benefits-list">
          <li v-for="(benefit, i) in feature.benefits" :key="i" class="fd-benefit">
            <span class="fd-benefit-check">
              <UIcon name="i-lucide-check" />
            </span>
            {{ benefit }}
          </li>
        </ul>
      </section>

      <section v-if="feature.keywords.length" class="fd-keywords">
        <span v-for="kw in feature.keywords" :key="kw" class="fd-keyword">{{ kw }}</span>
      </section>

      <section class="fd-cta-block">
        <h2 class="fd-cta-title">Try {{ feature.name }} today</h2>
        <p class="fd-cta-sub">Included in every Earnest plan. No feature gates.</p>
        <a :href="appUrl + '/register'" class="fd-cta-btn">Start free trial</a>
      </section>

      <section class="fd-related">
        <h2 class="fd-section-title">More features</h2>
        <div class="fd-related-grid">
          <nuxt-link
            v-for="rel in related"
            :key="rel.slug"
            :to="`/features/${rel.slug}`"
            class="fd-related-card"
          >
            <div class="fd-related-icon">
              <UIcon :name="rel.icon" />
            </div>
            <h3 class="fd-related-name">{{ rel.name }}</h3>
            <p class="fd-related-desc">{{ rel.desc.slice(0, 80) }}...</p>
          </nuxt-link>
        </div>
      </section>
    </article>

    <footer class="fd-footer">
      <p>&copy; {{ new Date().getFullYear() }} Earnest. All rights reserved.</p>
      <div class="fd-footer-links">
        <nuxt-link to="/privacy-policy">Privacy</nuxt-link>
        <nuxt-link to="/terms-of-service">Terms</nuxt-link>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.fd-page {
  --fd-bg: #faf7f4;
  --fd-text: #0a0a0a;
  --fd-muted: #6b7280;
  --fd-pop: #00bfff;
  --fd-border: rgba(0, 0, 0, 0.06);
  --fd-font: 'Proxima Nova W01 Regular', system-ui, sans-serif;
  --fd-font-display: 'Bauer Bodoni Pro_1 W05 Roman', Georgia, serif;

  background: var(--fd-bg);
  color: var(--fd-text);
  font-family: var(--fd-font);
  -webkit-font-smoothing: antialiased;
}

/* Nav */
.fd-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 32px;
  max-width: 900px;
  margin: 0 auto;
}
.fd-nav-brand { display: flex; align-items: center; }
.fd-nav-links { display: flex; gap: 24px; }
.fd-nav-link {
  font-size: 14px;
  color: var(--fd-muted);
  text-decoration: none;
  transition: color 0.2s;
}
.fd-nav-link:hover { color: var(--fd-text); }

/* Article */
.fd-article {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 32px 80px;
}

/* Hero */
.fd-hero { padding: 60px 0 48px; }
.fd-breadcrumb {
  font-size: 13px;
  color: var(--fd-muted);
  text-decoration: none;
  transition: color 0.2s;
}
.fd-breadcrumb:hover { color: var(--fd-pop); }
.fd-hero-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid var(--fd-border);
  border-radius: 14px;
  margin: 24px 0 20px;
  font-size: 26px;
  color: var(--fd-text);
}
.fd-title {
  font-family: var(--fd-font-display);
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.02em;
}
.fd-dot { color: var(--fd-pop); }
.fd-desc {
  font-size: 18px;
  line-height: 1.7;
  color: var(--fd-muted);
  margin-top: 20px;
}

/* Benefits */
.fd-section-title {
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--fd-muted);
  margin-bottom: 20px;
}
.fd-benefits { padding: 40px 0; border-top: 1px solid var(--fd-border); }
.fd-benefits-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 16px; }
.fd-benefit {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 16px;
  line-height: 1.6;
}
.fd-benefit-check {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--fd-pop);
  color: white;
  border-radius: 50%;
  flex-shrink: 0;
  font-size: 13px;
  margin-top: 2px;
}

/* Keywords */
.fd-keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0 0 40px;
}
.fd-keyword {
  font-size: 12px;
  padding: 5px 12px;
  background: white;
  border: 1px solid var(--fd-border);
  border-radius: 20px;
  color: var(--fd-muted);
}

/* CTA block */
.fd-cta-block {
  text-align: center;
  padding: 48px 32px;
  background: var(--fd-text);
  color: white;
  border-radius: 20px;
  margin: 20px 0 60px;
}
.fd-cta-title {
  font-family: var(--fd-font-display);
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 400;
}
.fd-cta-sub {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 8px;
}
.fd-cta-btn {
  display: inline-block;
  margin-top: 24px;
  padding: 12px 32px;
  background: var(--fd-pop);
  color: white;
  font-weight: 600;
  font-size: 15px;
  border-radius: 10px;
  text-decoration: none;
  transition: opacity 0.2s;
}
.fd-cta-btn:hover { opacity: 0.9; }

/* Related features */
.fd-related { padding: 0 0 40px; }
.fd-related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}
.fd-related-card {
  padding: 20px;
  background: white;
  border: 1px solid var(--fd-border);
  border-radius: 14px;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.3s, transform 0.3s;
}
.fd-related-card:hover {
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06);
  transform: translateY(-2px);
}
.fd-related-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--fd-bg);
  border-radius: 8px;
  margin-bottom: 12px;
  font-size: 16px;
}
.fd-related-name { font-size: 14px; font-weight: 600; margin-bottom: 6px; }
.fd-related-desc { font-size: 13px; color: var(--fd-muted); line-height: 1.5; }

/* Footer */
.fd-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px;
  max-width: 900px;
  margin: 0 auto;
  font-size: 13px;
  color: var(--fd-muted);
}
.fd-footer-links { display: flex; gap: 20px; }
.fd-footer-links a { color: var(--fd-muted); text-decoration: none; }
.fd-footer-links a:hover { color: var(--fd-text); }

@media (max-width: 700px) {
  .fd-article { padding: 0 20px 60px; }
  .fd-hero { padding: 40px 0 32px; }
  .fd-related-grid { grid-template-columns: 1fr; }
  .fd-footer { flex-direction: column; gap: 12px; text-align: center; }
}
</style>
