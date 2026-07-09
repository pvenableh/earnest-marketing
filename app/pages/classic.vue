<script setup lang="ts">
// The previous homepage ("seven apps in one shell") — preserved here while the
// Director glass page is the landing at `/`. Kept out of the index (noindex) so
// it doesn't compete with the new landing.
const description = 'The AI-powered business operating system for creative agencies. Projects, CRM pipeline, invoicing, marketing, gamification, and contextual AI intelligence — all in one platform.';

useHead({
  title: 'Earnest — Do good work.',
  meta: [
    { name: 'description', content: description },
  ],
  link: [
    { rel: 'canonical', href: 'https://earnest.guru/classic' },
  ],
});

useSeoMeta({
  title: 'Earnest — Do good work.',
  ogTitle: 'Earnest — Do good work.',
  description,
  ogDescription: description,
  ogType: 'website',
  ogUrl: 'https://earnest.guru/classic',
  ogSiteName: 'Earnest',
  robots: 'noindex, follow',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Earnest — Do good work.',
  twitterDescription: description,
});
</script>

<template>
  <SellSheetModern />
</template>
