<script setup lang="ts">
const description = 'Earnest reads your entire organization, presents it as a morning briefing, and hands you the day’s decisions already drafted — across People, Work, Money and Marketing. A context-aware AI that does the work so you just say yes.';

useHead({
  title: 'Earnest — Your decision machine',
  meta: [
    { name: 'description', content: description },
  ],
  link: [
    // Keep the classic homepage canonical while this alternate is in preview.
    { rel: 'canonical', href: 'https://earnest.guru' },
  ],
});

useSeoMeta({
  title: 'Earnest — Your decision machine',
  ogTitle: 'Earnest — Your decision machine | The Director’s Office',
  description,
  ogDescription: description,
  ogType: 'website',
  ogUrl: 'https://earnest.guru/next',
  ogSiteName: 'Earnest',
  robots: 'noindex, follow',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Earnest — Your decision machine',
  twitterDescription: description,
});
</script>

<template>
  <SellSheetDirector />
</template>
