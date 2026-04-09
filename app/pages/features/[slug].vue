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
  <div class="fd">
    <SiteNav />

    <article class="fd-article">
      <header class="fd-hero">
        <nuxt-link to="/features" class="fd-breadcrumb">&larr; All features</nuxt-link>
        <div class="fd-hero-icon">
          <UIcon :name="feature.icon" />
        </div>
        <h1 class="fd-title">{{ feature.name }}<span class="fd-dot">.</span></h1>
        <p class="fd-desc">{{ feature.desc }}</p>
      </header>

      <section class="fd-benefits">
        <h2 class="fd-label">What you get</h2>
        <div class="fd-benefits-grid">
          <div v-for="(benefit, i) in feature.benefits" :key="i" class="fd-benefit-card">
            <span class="fd-benefit-check">
              <UIcon name="i-lucide-check" />
            </span>
            <span>{{ benefit }}</span>
          </div>
        </div>
      </section>

      <section v-if="feature.keywords.length" class="fd-keywords">
        <span v-for="kw in feature.keywords" :key="kw" class="fd-keyword">{{ kw }}</span>
      </section>

      <section class="fd-cta-block">
        <h2 class="fd-cta-title">Try {{ feature.name }}</h2>
        <p class="fd-cta-sub">Included in every Earnest plan. No feature gates.</p>
        <a :href="appUrl + '/register'" class="fd-cta-btn">Start free trial</a>
      </section>

      <section class="fd-related">
        <h2 class="fd-label">More features</h2>
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

    <SiteFooter />
  </div>
</template>

<style scoped>
.fd {
  background: #fcfcfc;
  color: #0a0a0a;
  font-family: 'Proxima Nova W01 Regular', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.fd-article {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 32px 60px;
}

.fd-hero { padding: 100px 0 48px; }
.fd-breadcrumb {
  font-size: 13px;
  color: #a1a1aa;
  text-decoration: none;
  transition: color 0.2s;
}
.fd-breadcrumb:hover { color: #00bfff; }
.fd-hero-icon {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.04);
  border-radius: 14px;
  margin: 24px 0 20px;
  font-size: 24px;
  color: #0a0a0a;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}
.fd-title {
  font-family: 'Bauer Bodoni Pro_1 W05 Roman', Georgia, serif;
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.02em;
}
.fd-dot { color: #00bfff; }
.fd-desc {
  font-size: 17px;
  line-height: 1.7;
  color: #6b7280;
  margin-top: 20px;
}

/* Section label */
.fd-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #a1a1aa;
  margin-bottom: 16px;
}

/* Benefits as glass cards */
.fd-benefits { padding: 40px 0; border-top: 1px solid rgba(0, 0, 0, 0.06); }
.fd-benefits-grid { display: flex; flex-direction: column; gap: 10px; }
.fd-benefit-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px 18px;
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  font-size: 15px;
  line-height: 1.5;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}
.fd-benefit-check {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #00bfff;
  color: white;
  border-radius: 50%;
  flex-shrink: 0;
  font-size: 12px;
  margin-top: 2px;
}

/* Keywords */
.fd-keywords { display: flex; flex-wrap: wrap; gap: 8px; padding: 0 0 40px; }
.fd-keyword {
  font-size: 12px;
  padding: 5px 12px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(0, 0, 0, 0.04);
  border-radius: 100px;
  color: #a1a1aa;
}

/* CTA */
.fd-cta-block {
  text-align: center;
  padding: 48px 32px;
  background: #0a0a0a;
  color: white;
  border-radius: 20px;
  margin: 20px 0 48px;
}
.fd-cta-title {
  font-family: 'Bauer Bodoni Pro_1 W05 Roman', Georgia, serif;
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 400;
}
.fd-cta-sub {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 8px;
}
.fd-cta-btn {
  display: inline-block;
  margin-top: 20px;
  padding: 12px 32px;
  background: white;
  color: #0a0a0a;
  font-weight: 600;
  font-size: 14px;
  border-radius: 100px;
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.fd-cta-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(255, 255, 255, 0.15); }

/* Related features */
.fd-related { padding: 0 0 40px; }
.fd-related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
}
.fd-related-card {
  padding: 18px;
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.04);
  border-radius: 14px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.fd-related-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  transform: translateY(-2px);
}
.fd-related-card:active { transform: scale(0.98); }
.fd-related-icon {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 8px;
  margin-bottom: 10px;
  font-size: 15px;
}
.fd-related-name { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
.fd-related-desc { font-size: 12px; color: #6b7280; line-height: 1.5; }

@media (max-width: 700px) {
  .fd-article { padding: 0 20px 40px; }
  .fd-hero { padding: 72px 0 32px; }
  .fd-related-grid { grid-template-columns: 1fr; }
  .fd-cta-block { padding: 36px 24px; border-radius: 16px; }
}
</style>
