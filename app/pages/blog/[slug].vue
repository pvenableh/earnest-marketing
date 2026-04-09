<script setup lang="ts">
const EARNEST_ORG_ID = '842388b0-114e-4830-8a3a-17a587b2e13b';

const route = useRoute();
const slug = route.params.slug as string;

const config = useRuntimeConfig();
const directusUrl = config.public.directusUrl || 'https://admin.earnest.guru';
const appUrl = config.public.appUrl || 'https://app.earnest.guru';

const post = ref<any>(null);
const loading = ref(true);
const notFound = ref(false);

function imageUrl(id: string, width = 1200, height = 630) {
  if (!id) return '';
  return `${directusUrl}/assets/${id}?width=${width}&height=${height}&fit=cover`;
}

function formatDate(date: string) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

onMounted(async () => {
  if (!import.meta.client) return;

  const items = useDirectusItems('blog');

  try {
    const results = await items.list({
      fields: [
        'id', 'title', 'slug', 'excerpt', 'body', 'featured_image',
        'date_published', 'reading_time', 'author.first_name', 'author.last_name',
        'categories.blog_categories_id.name', 'categories.blog_categories_id.slug',
        'categories.blog_categories_id.color',
      ],
      filter: {
        status: { _eq: 'published' },
        slug: { _eq: slug },
        organization: { _eq: EARNEST_ORG_ID },
      },
      limit: 1,
    });

    if (results.length === 0) {
      notFound.value = true;
      return;
    }

    post.value = results[0];
  } catch (e) {
    console.error('Failed to load post:', e);
    notFound.value = true;
  } finally {
    loading.value = false;
  }
});

const authorName = computed(() => {
  if (!post.value?.author) return 'Earnest Team';
  return [post.value.author.first_name, post.value.author.last_name].filter(Boolean).join(' ') || 'Earnest Team';
});

watch(post, (p) => {
  if (!p) return;

  const title = `${p.title} — Earnest Blog`;
  const desc = p.excerpt || p.title;

  useHead({
    title,
    link: [{ rel: 'canonical', href: `https://earnest.guru/blog/${slug}` }],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: p.title,
          description: desc,
          url: `https://earnest.guru/blog/${slug}`,
          datePublished: p.date_published,
          author: {
            '@type': 'Person',
            name: authorName.value,
          },
          publisher: {
            '@type': 'Organization',
            name: 'Earnest',
            url: 'https://earnest.guru',
          },
          ...(p.featured_image && {
            image: imageUrl(p.featured_image),
          }),
        }),
      },
    ],
  });

  useSeoMeta({
    title,
    ogTitle: title,
    description: desc,
    ogDescription: desc,
    ogType: 'article',
    ogUrl: `https://earnest.guru/blog/${slug}`,
    ogSiteName: 'Earnest',
    ...(p.featured_image && {
      ogImage: imageUrl(p.featured_image),
      twitterImage: imageUrl(p.featured_image),
    }),
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: desc,
  });
}, { immediate: true });
</script>

<template>
  <div class="ba-page">
    <nav class="ba-nav">
      <nuxt-link to="/" class="ba-nav-brand">
        <LogoEarnest size="sm" />
      </nuxt-link>
      <div class="ba-nav-links">
        <nuxt-link to="/blog" class="ba-nav-link">Blog</nuxt-link>
        <nuxt-link to="/features" class="ba-nav-link">Features</nuxt-link>
      </div>
    </nav>

    <!-- Loading -->
    <div v-if="loading" class="ba-loading">
      <p>Loading...</p>
    </div>

    <!-- Not found -->
    <div v-else-if="notFound" class="ba-empty">
      <h1 class="ba-empty-title">Article not found</h1>
      <p class="ba-empty-text">This article may have been moved or removed.</p>
      <nuxt-link to="/blog" class="ba-empty-link">&larr; Back to blog</nuxt-link>
    </div>

    <!-- Article -->
    <article v-else-if="post" class="ba-article">
      <header class="ba-header">
        <nuxt-link to="/blog" class="ba-breadcrumb">&larr; Blog</nuxt-link>

        <div v-if="post.categories?.length" class="ba-cats">
          <span
            v-for="c in post.categories"
            :key="c.blog_categories_id?.slug"
            class="ba-cat"
            :style="{ color: c.blog_categories_id?.color }"
          >
            {{ c.blog_categories_id?.name }}
          </span>
        </div>

        <h1 class="ba-title">{{ post.title }}</h1>

        <div class="ba-meta">
          <span class="ba-author">{{ authorName }}</span>
          <span v-if="post.date_published">&middot; {{ formatDate(post.date_published) }}</span>
          <span v-if="post.reading_time">&middot; {{ post.reading_time }} min read</span>
        </div>
      </header>

      <div v-if="post.featured_image" class="ba-hero-img">
        <img :src="imageUrl(post.featured_image)" :alt="post.title" />
      </div>

      <div class="ba-body" v-html="post.body" />

      <footer class="ba-article-footer">
        <nuxt-link to="/blog" class="ba-back">&larr; More articles</nuxt-link>
        <a :href="appUrl + '/register'" class="ba-cta-btn">Try Earnest free</a>
      </footer>
    </article>

    <footer class="ba-footer">
      <p>&copy; {{ new Date().getFullYear() }} Earnest. All rights reserved.</p>
      <div class="ba-footer-links">
        <nuxt-link to="/privacy-policy">Privacy</nuxt-link>
        <nuxt-link to="/terms-of-service">Terms</nuxt-link>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.ba-page {
  --ba-bg: #faf7f4;
  --ba-text: #0a0a0a;
  --ba-muted: #6b7280;
  --ba-pop: #00bfff;
  --ba-border: rgba(0, 0, 0, 0.06);
  --ba-font: 'Proxima Nova W01 Regular', system-ui, sans-serif;
  --ba-font-display: 'Bauer Bodoni Pro_1 W05 Roman', Georgia, serif;

  background: var(--ba-bg);
  color: var(--ba-text);
  font-family: var(--ba-font);
  -webkit-font-smoothing: antialiased;
}

.ba-nav {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 32px; max-width: 800px; margin: 0 auto;
}
.ba-nav-brand { display: flex; align-items: center; }
.ba-nav-links { display: flex; gap: 24px; }
.ba-nav-link { font-size: 14px; color: var(--ba-muted); text-decoration: none; transition: color 0.2s; }
.ba-nav-link:hover { color: var(--ba-text); }

.ba-article { max-width: 720px; margin: 0 auto; padding: 0 32px 60px; }

.ba-header { padding: 40px 0 32px; }
.ba-breadcrumb { font-size: 13px; color: var(--ba-muted); text-decoration: none; transition: color 0.2s; }
.ba-breadcrumb:hover { color: var(--ba-pop); }
.ba-cats { display: flex; gap: 10px; margin: 20px 0 12px; }
.ba-cat { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; }
.ba-title {
  font-family: var(--ba-font-display);
  font-size: clamp(28px, 5vw, 44px);
  font-weight: 400; line-height: 1.15; letter-spacing: -0.02em;
}
.ba-meta { display: flex; gap: 6px; font-size: 14px; color: var(--ba-muted); margin-top: 16px; }
.ba-author { font-weight: 500; color: var(--ba-text); }

.ba-hero-img { border-radius: 16px; overflow: hidden; margin-bottom: 40px; }
.ba-hero-img img { width: 100%; display: block; }

.ba-body { font-size: 17px; line-height: 1.8; color: var(--ba-text); }
.ba-body :deep(h2) { font-size: 24px; font-weight: 600; margin: 40px 0 16px; }
.ba-body :deep(h3) { font-size: 20px; font-weight: 600; margin: 32px 0 12px; }
.ba-body :deep(p) { margin-bottom: 20px; }
.ba-body :deep(ul), .ba-body :deep(ol) { padding-left: 24px; margin-bottom: 20px; }
.ba-body :deep(li) { margin-bottom: 8px; }
.ba-body :deep(blockquote) {
  border-left: 3px solid var(--ba-pop); padding-left: 20px;
  margin: 24px 0; font-style: italic; color: var(--ba-muted);
}
.ba-body :deep(img) { max-width: 100%; border-radius: 12px; margin: 24px 0; }
.ba-body :deep(a) { color: var(--ba-pop); text-decoration: underline; }

.ba-article-footer {
  display: flex; align-items: center; justify-content: space-between;
  padding: 40px 0; border-top: 1px solid var(--ba-border); margin-top: 40px;
}
.ba-back { font-size: 14px; color: var(--ba-muted); text-decoration: none; }
.ba-back:hover { color: var(--ba-pop); }
.ba-cta-btn {
  padding: 10px 24px; background: var(--ba-pop); color: white;
  font-weight: 600; font-size: 14px; border-radius: 8px;
  text-decoration: none; transition: opacity 0.2s;
}
.ba-cta-btn:hover { opacity: 0.9; }

.ba-loading, .ba-empty { text-align: center; padding: 100px 32px; }
.ba-empty-title { font-family: var(--ba-font-display); font-size: 32px; font-weight: 400; }
.ba-empty-text { font-size: 16px; color: var(--ba-muted); margin-top: 12px; }
.ba-empty-link { display: inline-block; margin-top: 20px; font-size: 14px; color: var(--ba-pop); text-decoration: none; }

.ba-footer {
  display: flex; align-items: center; justify-content: space-between;
  padding: 32px; max-width: 800px; margin: 0 auto;
  font-size: 13px; color: var(--ba-muted);
}
.ba-footer-links { display: flex; gap: 20px; }
.ba-footer-links a { color: var(--ba-muted); text-decoration: none; }
.ba-footer-links a:hover { color: var(--ba-text); }

@media (max-width: 700px) {
  .ba-article { padding: 0 20px 40px; }
  .ba-article-footer { flex-direction: column; gap: 16px; text-align: center; }
  .ba-footer { flex-direction: column; gap: 12px; text-align: center; }
}
</style>
