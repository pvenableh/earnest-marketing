<script setup lang="ts">
// Preview of the new, LIVE-reframed landing (SellSheetLive): a tight, six-point
// argument that builds to one CTA, with real-app destinations (/register,
// /try-demo) instead of the early-access gate. Lives here (noindex) for review
// alongside the archived original at /glass, before it's promoted to index.vue.
const description = 'Preview of the simplified, live Earnest landing.';

useHead({
  title: 'Earnest — Do good work. (preview)',
  meta: [{ name: 'description', content: description }],
  link: [{ rel: 'canonical', href: 'https://earnest.guru/next-glass' }],
});

useSeoMeta({
  title: 'Earnest — Do good work. (preview)',
  robots: 'noindex, nofollow',
});
</script>

<template>
  <SellSheetLive />
</template>
