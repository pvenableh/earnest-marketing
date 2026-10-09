<script setup lang="ts">
// The landing page: "Do good work." (October 2026, `GoodWork/Home.vue`).
// The September sell sheet it replaced (`SellSheetHome`) is no longer
// routed; the site as it stood is branch `sellsheet-2026-10-everywhere`.
// `SellSheetLive` (2026-07) is archived at /live-2026-07; the older variants
// live at /classic, /glass, /next, /director and /automation, all noindex.
//
// ⚠️ The FAQ used to be written out TWICE — once as HTML inside the landing
// component and once, hand-copied to plain text, here for the FAQPage rich
// result. They drifted, so the structured data kept answering questions the
// page had already reworded. Both now read `homeFaqs` from `~/data/good-work`,
// which carries the rendered answer and its plain-text twin side by side.
import { homeFaqs } from '~/data/good-work';
import { features } from '~/data/features';

const title = 'Earnest — Do good work.';
const description =
  'Business software for people who mean it. Clients, projects, invoices, scheduling and marketing in one app, for agencies, firms, practices and shops. Earnest drafts the next step; nothing reaches a client or moves money without your tap.';

// Built from `features.ts` rather than hand-listed, for the same reason the FAQ
// is: a hand-kept list is a list that will describe surfaces the app no longer
// has. Capped — this is a `featureList` string, not a sitemap.
const featureList = features
  .slice(0, 24)
  .map((f) => f.name)
  .join(', ');

const ogImage = 'https://earnest.guru/og/good-work.png';

useHead({
  title,
  meta: [{ name: 'description', content: description }],
  link: [{ rel: 'canonical', href: 'https://earnest.guru' }],
  // `gw-root` lets good-work.css paint <html> itself (overscroll, the bounce
  // above the nav) in the page colour; Nuxt removes it on the way out.
  htmlAttrs: { class: 'gw-root' },
  script: [
    {
      // Light or dark before first paint, so nobody sees the wrong one flash:
      // a `#dark` / `#light` deep link, then the visitor's own choice, then the
      // system. GoodWork/Home.vue flips and remembers it from there.
      key: 'gw-mode',
      tagPosition: 'head',
      innerHTML:
        "(function(){var r=document.documentElement,h=location.hash.slice(1),m=null;if(h==='dark'||h==='light')m=h;else{try{m=localStorage.getItem('earnest-mode')}catch(e){}}if(m!=='dark'&&m!=='light')m=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';r.setAttribute('data-gw-mode',m)})()",
    },
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
        mainEntity: homeFaqs.map((f) => ({
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
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogType: 'website',
  ogUrl: 'https://earnest.guru',
  ogSiteName: 'Earnest',
  ogImage,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Earnest — Do good work. Business software for people who mean it.',
  robots: 'index, follow',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: ogImage,
});
</script>

<template>
  <GoodWorkHome />
</template>
