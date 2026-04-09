<script setup lang="ts">
const EARNEST_ORG_ID = '842388b0-114e-4830-8a3a-17a587b2e13b';

const config = useRuntimeConfig();
const directusUrl = config.public.directusUrl || 'https://admin.earnest.guru';
const appUrl = config.public.appUrl || 'https://app.earnest.guru';

const description = 'Practical guides, product updates, case studies, and insights for business operators. The Earnest knowledge hub.';

useHead({
  title: 'Blog — Earnest',
  link: [{ rel: 'canonical', href: 'https://earnest.guru/blog' }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Earnest Blog',
        description,
        url: 'https://earnest.guru/blog',
      }),
    },
  ],
});

useSeoMeta({
  title: 'Blog — Earnest',
  ogTitle: 'Blog — Earnest',
  description,
  ogDescription: description,
  ogType: 'website',
  ogUrl: 'https://earnest.guru/blog',
  ogSiteName: 'Earnest',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Blog — Earnest',
  twitterDescription: description,
});

// State
const posts = ref<any[]>([]);
const categories = ref<any[]>([]);
const activeCategory = ref<string | null>(null);
const loading = ref(true);
const page = ref(1);
const perPage = 12;
const totalPosts = ref(0);

const filteredPosts = computed(() => {
  if (!activeCategory.value) return posts.value;
  return posts.value.filter((p: any) =>
    p.categories?.some((c: any) => c.blog_categories_id?.slug === activeCategory.value)
  );
});

const featuredPost = computed(() => posts.value.find((p: any) => p.featured));
const gridPosts = computed(() => {
  const featured = featuredPost.value;
  return filteredPosts.value.filter((p: any) => p.id !== featured?.id);
});

function imageUrl(id: string, width = 800, height = 450) {
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
  const catItems = useDirectusItems('blog_categories');

  try {
    const [postData, catData] = await Promise.all([
      items.list({
        fields: [
          'id', 'title', 'slug', 'excerpt', 'featured_image', 'date_published',
          'reading_time', 'featured', 'author.first_name', 'author.last_name',
          'categories.blog_categories_id.name', 'categories.blog_categories_id.slug',
          'categories.blog_categories_id.color',
        ],
        filter: {
          status: { _eq: 'published' },
          organization: { _eq: EARNEST_ORG_ID },
        },
        sort: ['-date_published'],
        limit: perPage,
        offset: (page.value - 1) * perPage,
      }),
      catItems.list({
        fields: ['id', 'name', 'slug', 'color'],
        filter: {
          status: { _eq: 'published' },
          organization: { _eq: EARNEST_ORG_ID },
        },
        sort: ['name'],
      }),
    ]);

    posts.value = postData;
    categories.value = catData;
  } catch (e) {
    console.error('Failed to load blog data:', e);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="blog-page">
    <nav class="bp-nav">
      <nuxt-link to="/" class="bp-nav-brand">
        <LogoEarnest size="sm" />
      </nuxt-link>
      <div class="bp-nav-links">
        <nuxt-link to="/" class="bp-nav-link">Home</nuxt-link>
        <nuxt-link to="/features" class="bp-nav-link">Features</nuxt-link>
      </div>
    </nav>

    <header class="bp-hero">
      <p class="bp-kicker">Knowledge hub</p>
      <h1 class="bp-title">The Earnest Blog<span class="bp-dot">.</span></h1>
      <p class="bp-sub">Practical guides and insights for people who do good work.</p>
    </header>

    <!-- Categories -->
    <div v-if="categories.length" class="bp-categories">
      <button
        class="bp-cat-pill"
        :class="{ 'bp-cat-active': !activeCategory }"
        @click="activeCategory = null"
      >
        All
      </button>
      <button
        v-for="cat in categories"
        :key="cat.slug"
        class="bp-cat-pill"
        :class="{ 'bp-cat-active': activeCategory === cat.slug }"
        @click="activeCategory = cat.slug"
      >
        {{ cat.name }}
      </button>
    </div>

    <!-- Featured -->
    <nuxt-link
      v-if="featuredPost && !activeCategory"
      :to="`/blog/${featuredPost.slug}`"
      class="bp-featured"
    >
      <div v-if="featuredPost.featured_image" class="bp-featured-img">
        <img :src="imageUrl(featuredPost.featured_image, 1200, 600)" :alt="featuredPost.title" />
      </div>
      <div class="bp-featured-body">
        <span class="bp-featured-badge">Featured</span>
        <h2 class="bp-featured-title">{{ featuredPost.title }}</h2>
        <p class="bp-featured-excerpt">{{ featuredPost.excerpt }}</p>
        <div class="bp-meta">
          <span v-if="featuredPost.date_published">{{ formatDate(featuredPost.date_published) }}</span>
          <span v-if="featuredPost.reading_time">&middot; {{ featuredPost.reading_time }} min read</span>
        </div>
      </div>
    </nuxt-link>

    <!-- Grid -->
    <section class="bp-grid">
      <nuxt-link
        v-for="post in gridPosts"
        :key="post.id"
        :to="`/blog/${post.slug}`"
        class="bp-card"
      >
        <div v-if="post.featured_image" class="bp-card-img">
          <img :src="imageUrl(post.featured_image)" :alt="post.title" />
        </div>
        <div class="bp-card-body">
          <div v-if="post.categories?.length" class="bp-card-cats">
            <span
              v-for="c in post.categories"
              :key="c.blog_categories_id?.slug"
              class="bp-card-cat"
              :style="{ color: c.blog_categories_id?.color }"
            >
              {{ c.blog_categories_id?.name }}
            </span>
          </div>
          <h3 class="bp-card-title">{{ post.title }}</h3>
          <p class="bp-card-excerpt">{{ post.excerpt?.slice(0, 120) }}</p>
          <div class="bp-meta">
            <span v-if="post.date_published">{{ formatDate(post.date_published) }}</span>
            <span v-if="post.reading_time">&middot; {{ post.reading_time }} min</span>
          </div>
        </div>
      </nuxt-link>
    </section>

    <!-- Empty state -->
    <div v-if="!loading && posts.length === 0" class="bp-empty">
      <h2 class="bp-empty-title">Coming soon</h2>
      <p class="bp-empty-text">We're working on our first articles. Check back soon.</p>
      <nuxt-link to="/" class="bp-empty-link">&larr; Back to home</nuxt-link>
    </div>

    <footer class="bp-footer">
      <p>&copy; {{ new Date().getFullYear() }} Earnest. All rights reserved.</p>
      <div class="bp-footer-links">
        <nuxt-link to="/privacy-policy">Privacy</nuxt-link>
        <nuxt-link to="/terms-of-service">Terms</nuxt-link>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.blog-page {
  --bp-bg: #faf7f4;
  --bp-text: #0a0a0a;
  --bp-muted: #6b7280;
  --bp-pop: #00bfff;
  --bp-border: rgba(0, 0, 0, 0.06);
  --bp-font: 'Proxima Nova W01 Regular', system-ui, sans-serif;
  --bp-font-display: 'Bauer Bodoni Pro_1 W05 Roman', Georgia, serif;

  background: var(--bp-bg);
  color: var(--bp-text);
  font-family: var(--bp-font);
  -webkit-font-smoothing: antialiased;
}

.bp-nav {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 32px; max-width: 1200px; margin: 0 auto;
}
.bp-nav-brand { display: flex; align-items: center; }
.bp-nav-links { display: flex; gap: 24px; }
.bp-nav-link { font-size: 14px; color: var(--bp-muted); text-decoration: none; transition: color 0.2s; }
.bp-nav-link:hover { color: var(--bp-text); }

.bp-hero { text-align: center; padding: 80px 32px 40px; max-width: 700px; margin: 0 auto; }
.bp-kicker { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--bp-pop); margin-bottom: 16px; }
.bp-title { font-family: var(--bp-font-display); font-size: clamp(36px, 5vw, 56px); font-weight: 400; line-height: 1.1; }
.bp-dot { color: var(--bp-pop); }
.bp-sub { font-size: 18px; color: var(--bp-muted); margin-top: 16px; line-height: 1.6; }

/* Categories */
.bp-categories {
  display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;
  max-width: 800px; margin: 0 auto; padding: 0 32px 40px;
}
.bp-cat-pill {
  padding: 7px 16px; font-size: 13px; font-weight: 500;
  border: 1px solid var(--bp-border); border-radius: 20px;
  background: white; color: var(--bp-muted); cursor: pointer;
  transition: all 0.2s;
}
.bp-cat-pill:hover { border-color: var(--bp-text); color: var(--bp-text); }
.bp-cat-active { background: var(--bp-text); color: white; border-color: var(--bp-text); }

/* Featured */
.bp-featured {
  display: grid; grid-template-columns: 1fr 1fr; gap: 32px;
  max-width: 1100px; margin: 0 auto 40px; padding: 0 32px;
  text-decoration: none; color: inherit;
}
.bp-featured-img { border-radius: 16px; overflow: hidden; }
.bp-featured-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
.bp-featured-body { display: flex; flex-direction: column; justify-content: center; }
.bp-featured-badge {
  font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em;
  color: var(--bp-pop); margin-bottom: 12px;
}
.bp-featured-title { font-size: clamp(24px, 3vw, 32px); font-weight: 600; line-height: 1.2; margin-bottom: 12px; }
.bp-featured-excerpt { font-size: 15px; color: var(--bp-muted); line-height: 1.6; }
.bp-meta { font-size: 13px; color: var(--bp-muted); margin-top: 12px; display: flex; gap: 6px; }

/* Grid */
.bp-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px; max-width: 1200px; margin: 0 auto; padding: 0 32px 80px;
}
.bp-card {
  background: white; border: 1px solid var(--bp-border); border-radius: 16px;
  overflow: hidden; text-decoration: none; color: inherit;
  transition: box-shadow 0.3s, transform 0.3s;
}
.bp-card:hover { box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08); transform: translateY(-2px); }
.bp-card-img { aspect-ratio: 16/9; overflow: hidden; }
.bp-card-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
.bp-card-body { padding: 20px; }
.bp-card-cats { display: flex; gap: 8px; margin-bottom: 8px; }
.bp-card-cat { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; }
.bp-card-title { font-size: 17px; font-weight: 600; line-height: 1.3; margin-bottom: 8px; }
.bp-card-excerpt { font-size: 14px; color: var(--bp-muted); line-height: 1.5; }

/* Empty */
.bp-empty { text-align: center; padding: 80px 32px; }
.bp-empty-title { font-family: var(--bp-font-display); font-size: 32px; font-weight: 400; }
.bp-empty-text { font-size: 16px; color: var(--bp-muted); margin-top: 12px; }
.bp-empty-link { display: inline-block; margin-top: 20px; font-size: 14px; color: var(--bp-pop); text-decoration: none; }

/* Footer */
.bp-footer {
  display: flex; align-items: center; justify-content: space-between;
  padding: 32px; max-width: 1200px; margin: 0 auto;
  font-size: 13px; color: var(--bp-muted);
}
.bp-footer-links { display: flex; gap: 20px; }
.bp-footer-links a { color: var(--bp-muted); text-decoration: none; }
.bp-footer-links a:hover { color: var(--bp-text); }

@media (max-width: 700px) {
  .bp-featured { grid-template-columns: 1fr; }
  .bp-grid { grid-template-columns: 1fr; padding: 0 16px 60px; }
  .bp-footer { flex-direction: column; gap: 12px; text-align: center; }
}
</style>
