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
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
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
          author: { '@type': 'Person', name: authorName.value },
          publisher: { '@type': 'Organization', name: 'Earnest', url: 'https://earnest.guru' },
          ...(p.featured_image && { image: imageUrl(p.featured_image) }),
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
    ...(p.featured_image && { ogImage: imageUrl(p.featured_image), twitterImage: imageUrl(p.featured_image) }),
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: desc,
  });
}, { immediate: true });
</script>

<template>
  <div class="ba">
    <SiteNav />

    <div v-if="loading" class="ba-state">
      <p class="ba-state-text">Loading...</p>
    </div>

    <div v-else-if="notFound" class="ba-state">
      <h1 class="ba-state-title">Article not found<span class="ba-dot">.</span></h1>
      <p class="ba-state-text">This article may have been moved or removed.</p>
      <nuxt-link to="/blog" class="ba-state-link">&larr; Back to blog</nuxt-link>
    </div>

    <article v-else-if="post" class="ba-article">
      <header class="ba-header">
        <nuxt-link to="/blog" class="ba-breadcrumb">&larr; Blog</nuxt-link>

        <div v-if="post.categories?.length" class="ba-cats">
          <span
            v-for="c in post.categories"
            :key="c.blog_categories_id?.slug"
            class="ba-cat"
            :style="{ color: c.blog_categories_id?.color }"
          >{{ c.blog_categories_id?.name }}</span>
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

    <SiteFooter />
  </div>
</template>

<style scoped>
.ba {
  background: #fcfcfc;
  color: #0a0a0a;
  font-family: 'Proxima Nova W01 Regular', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.ba-article { max-width: 720px; margin: 0 auto; padding: 0 32px 60px; }

.ba-header { padding: 100px 0 32px; }
.ba-breadcrumb { font-size: 13px; color: #a1a1aa; text-decoration: none; transition: color 0.2s; }
.ba-breadcrumb:hover { color: #00bfff; }
.ba-cats { display: flex; gap: 10px; margin: 20px 0 12px; }
.ba-cat { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; }
.ba-title {
  font-family: 'Bauer Bodoni Pro_1 W05 Roman', Georgia, serif;
  font-size: clamp(28px, 5vw, 44px);
  font-weight: 400; line-height: 1.15; letter-spacing: -0.02em;
}
.ba-dot { color: #00bfff; }
.ba-meta { display: flex; gap: 6px; font-size: 13px; color: #a1a1aa; margin-top: 16px; }
.ba-author { font-weight: 500; color: #0a0a0a; }

.ba-hero-img { border-radius: 16px; overflow: hidden; margin-bottom: 40px; }
.ba-hero-img img { width: 100%; display: block; }

/* Article body */
.ba-body { font-size: 17px; line-height: 1.8; color: #0a0a0a; }
.ba-body :deep(h2) { font-size: 24px; font-weight: 600; margin: 40px 0 16px; }
.ba-body :deep(h3) { font-size: 20px; font-weight: 600; margin: 32px 0 12px; }
.ba-body :deep(p) { margin-bottom: 20px; }
.ba-body :deep(ul), .ba-body :deep(ol) { padding-left: 24px; margin-bottom: 20px; }
.ba-body :deep(li) { margin-bottom: 8px; }
.ba-body :deep(blockquote) {
  border-left: 3px solid #00bfff; padding-left: 20px;
  margin: 24px 0; font-style: italic; color: #6b7280;
}
.ba-body :deep(img) { max-width: 100%; border-radius: 12px; margin: 24px 0; }
.ba-body :deep(a) { color: #00bfff; text-decoration: underline; }

.ba-article-footer {
  display: flex; align-items: center; justify-content: space-between;
  padding: 40px 0; border-top: 1px solid rgba(0, 0, 0, 0.06); margin-top: 40px;
}
.ba-back { font-size: 13px; color: #a1a1aa; text-decoration: none; }
.ba-back:hover { color: #00bfff; }
.ba-cta-btn {
  padding: 10px 24px; background: #0a0a0a; color: white;
  font-weight: 600; font-size: 13px; border-radius: 100px;
  text-decoration: none; transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.ba-cta-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15); }

/* States */
.ba-state { text-align: center; padding: 140px 32px 80px; }
.ba-state-title { font-family: 'Bauer Bodoni Pro_1 W05 Roman', Georgia, serif; font-size: 32px; font-weight: 400; }
.ba-state-text { font-size: 15px; color: #6b7280; margin-top: 10px; }
.ba-state-link { display: inline-block; margin-top: 20px; font-size: 13px; color: #00bfff; text-decoration: none; }

@media (max-width: 700px) {
  .ba-article { padding: 0 20px 40px; }
  .ba-header { padding: 72px 0 24px; }
  .ba-article-footer { flex-direction: column; gap: 16px; text-align: center; }
}
</style>
