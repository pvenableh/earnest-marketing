<script setup lang="ts">
// The landing page. `SellSheetLive` (the 2026-07 point-based sell sheet) is
// archived at /live-2026-07; the older variants live at /classic, /glass,
// /next, /director and /automation, all noindex.
//
// ⚠️ The FAQ used to be written out TWICE — once as HTML inside the landing
// component and once, hand-copied to plain text, here for the FAQPage rich
// result. They drifted, so the structured data kept answering questions the
// page had already reworded. Both now read `faqs` from `~/data/landing`, which
// carries the rendered answer and its plain-text twin side by side.
import { faqs } from '~/data/landing';
import { features } from '~/data/features';

const description =
  'Earnest is one home for a creative studio — clients, projects, invoices, proposals, client approvals and content in one place, with an AI that reads across all of it and drafts the day with you. Nothing reaches a client or moves money without your tap.';

// Built from `features.ts` rather than hand-listed, for the same reason the FAQ
// is: a hand-kept list is a list that will describe surfaces the app no longer
// has. Capped — this is a `featureList` string, not a sitemap.
const featureList = features
  .slice(0, 24)
  .map((f) => f.name)
  .join(', ');

const ogImage = 'https://earnest.guru/og/home.png';

useHead({
  title: 'Earnest — Run the whole studio from one home.',
  meta: [{ name: 'description', content: description }],
  link: [{ rel: 'canonical', href: 'https://earnest.guru' }],
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
        featureList,
        url: 'https://earnest.guru',
        image: ogImage,
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'USD',
          lowPrice: '49',
          highPrice: '299',
          offerCount: 3,
        },
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          // The plain-text twin. Google strips markup from FAQPage answers
          // anyway, so shipping the HTML here would only risk it being echoed
          // raw in a rich result.
          acceptedAnswer: { '@type': 'Answer', text: f.aText },
        })),
      }),
    },
  ],
});

useSeoMeta({
  title: 'Earnest — Run the whole studio from one home.',
  ogTitle: 'Earnest — Run the whole studio from one home.',
  description,
  ogDescription: description,
  ogType: 'website',
  ogUrl: 'https://earnest.guru',
  ogSiteName: 'Earnest',
  ogImage,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Earnest — the home, with the day sorted into Decide, Do and Know',
  robots: 'index, follow',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Earnest — Run the whole studio from one home.',
  twitterDescription: description,
  twitterImage: ogImage,
});
</script>

<template>
  <SellSheetHome />
</template>
