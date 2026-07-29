<script setup lang="ts">
// Landing page: the live-reframed, point-based sell sheet (SellSheetLive).
// The prior "glass" landing is archived at /glass, and the older homepage at
// /classic. SellSheetLive sets no head of its own, so this page controls SEO.
const description = 'Earnest is one place to run your whole studio — people, work, money and marketing — with an AI that reads it all, drafts the day in your voice, and moves nothing without your tap. Live now: start free, set up in minutes, every feature included.';

// Keep in sync with the FAQ section in SellSheetLive.vue. Plain-text answers for
// the FAQPage rich result (Google strips markup anyway).
const faqEntries = [
  { q: 'Is Earnest actually live?', a: 'Yes. Earnest is live in production — sign up at app.earnest.guru/register, create your workspace in a few minutes, and start today. You can also explore the live demo with real sample data first, no sign-up required.' },
  { q: 'How is Earnest different from ChatGPT or generic AI assistants?', a: 'Earnest runs on a real large language model — Anthropic’s Claude, on no-training terms — but instead of a blank prompt, it works from your actual organization: your goals, brand, clients and live data across every app, and drafts the day in your voice. Real context, not generic confidence.' },
  { q: 'Does Earnest really learn how I work?', a: 'Yes. It learns your voice, your rhythm, the calls you always make and the ones you never would — so its drafts sound like you and its priorities match yours. As it proves itself accurate you can dial up how much it handles on its own, from suggesting to assisting to running routine work end to end. There is a hard floor it never crosses: money and client-facing sends always wait for your tap.' },
  { q: 'What happens when Earnest doesn’t have enough context?', a: 'It stops and asks. If it’s thin on your brand, your goals, or a client’s voice, Earnest tells you what it’s missing instead of guessing or filling in generic text. It only acts on what it actually understands — real context over generic confidence.' },
  { q: 'Will Earnest send emails or move money on its own?', a: 'No. Low-stakes, reversible work — reconciling a payment, summarizing a meeting, enriching a contact — can run automatically with a full audit trail. But nothing reaches a client or moves money without your tap.' },
  { q: 'What does it cost?', a: 'Three plans: Solo $49/mo, Studio $149/mo, and Agency $299/mo — priced per workspace, not per action, with every feature included. Choose monthly or save two months on annual.' },
  { q: 'Is Earnest for solo operators or bigger agencies?', a: 'Both. Solo is built for the one-person shop doing serious work; Studio and Agency add seats, team channels and director tooling as you grow. The same daily rhythm scales from one person to a full team.' },
  { q: 'Do I have to replace all my tools at once?', a: 'No. Earnest brings people, work, money and marketing into one place, but you can start where it hurts most — chasing invoices, running a project, re-engaging leads — and let it earn the rest.' },
  { q: 'Who can see my data?', a: 'Your workspace is private to your organization — only members you invite can see it, and we never sell your data or share one customer’s with another. Earnest’s AI reads your data only to generate your own results, under no-training terms. Full detail is in our privacy policy.' },
];

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
        featureList: "AI-first presence home, People CRM, Projects & Tasks, Tickets, Cash Flow & Invoicing, Stripe payments & deposits, Proposals & Contracts, Scheduler & booking, Marketing & social, The Boardroom, White-label client portal, Context-aware Earnest AI, CardDesk",
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
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqEntries.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
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
  <SellSheetLive />
</template>
