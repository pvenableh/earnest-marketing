<script setup lang="ts">
const description = 'Earnest doesn’t oversell. It reads your goals, brand, audience and live data, then automates only when it’s genuinely right — drafting work that sounds like you and holding back when it isn’t sure. Confidence-scored, context-aware automation.';

useHead({
  title: 'Earnest — Context in. Accuracy out.',
  link: [{ rel: 'canonical', href: 'https://earnest.guru' }],
});
useSeoMeta({
  title: 'Earnest — Context in. Accuracy out.',
  ogTitle: 'Earnest — Context in. Accuracy out. | Automation',
  description,
  ogDescription: description,
  ogType: 'website',
  ogUrl: 'https://earnest.guru/automation',
  ogSiteName: 'Earnest',
  robots: 'noindex, follow',
  twitterCard: 'summary_large_image',
});
</script>

<template>
  <SellSheetAutomation />
</template>
