<script setup lang="ts">
const description = 'Earnest reads your entire organization, presents it as a morning briefing, and hands you the day’s decisions already drafted. A context-aware AI in a liquid-glass interface — with streaks, scores, and momentum that make good decisions visible.';

useHead({
  title: 'Earnest — Your decision machine',
  link: [{ rel: 'canonical', href: 'https://earnest.guru' }],
});
useSeoMeta({
  title: 'Earnest — Your decision machine',
  ogTitle: 'Earnest — Your decision machine | Liquid glass',
  description,
  ogDescription: description,
  ogType: 'website',
  ogUrl: 'https://earnest.guru/director',
  ogSiteName: 'Earnest',
  robots: 'noindex, follow',
  twitterCard: 'summary_large_image',
});
</script>

<template>
  <SellSheetGlass />
</template>
