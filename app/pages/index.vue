<script setup lang="ts">
// Landing page (for now): the Director glass experience (SellSheetGlass).
// The previous homepage is preserved at /classic. SellSheetGlass no longer sets
// its own head, so this page fully controls the landing SEO.
const description = 'Earnest is your context-aware decision machine — it reads your entire organization, walks you through the day’s decisions already drafted in your voice, and automates only what it’s sure of. The Director’s Office, People, Work, Money and Marketing in one calm, liquid-glass shell.';

useHead({
  title: 'Earnest — Do good work.',
  meta: [
    { name: 'description', content: description },
  ],
  link: [
    { rel: 'canonical', href: 'https://earnest.guru' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Earnest',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description,
        featureList: "The Director's Office, Context-aware AI, AI Actions, People CRM, Projects & Tasks, Cash Flow & Invoicing, Proposals & Contracts, Marketing, Earnest Score & Gamification, CardDesk",
        url: 'https://earnest.guru',
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
  title: 'Earnest — Do good work.',
  ogTitle: 'Earnest — Do good work.',
  description,
  ogDescription: description,
  ogType: 'website',
  ogUrl: 'https://earnest.guru',
  ogSiteName: 'Earnest',
  robots: 'index, follow',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Earnest — Do good work.',
  twitterDescription: description,
});
</script>

<template>
  <SellSheetGlass />
</template>
