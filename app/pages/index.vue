<script setup lang="ts">
const description = 'The AI-powered business operating system for creative agencies. Projects, CRM, invoicing, marketing, and AI intelligence — all in one platform.';

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
  twitterCard: 'summary_large_image',
  twitterTitle: 'Earnest — Do good work.',
  twitterDescription: description,
});
</script>

<template>
  <SellSheetModern />
</template>
