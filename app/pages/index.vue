<script setup lang="ts">
// Landing page (for now): the Director glass experience (SellSheetGlass).
// The previous homepage is preserved at /classic. SellSheetGlass no longer sets
// its own head, so this page fully controls the landing SEO.
const description = 'Earnest is your context-aware decision machine — it reads your entire organization, walks you through the day’s decisions already drafted in your voice, and automates only what it’s sure of. The Director’s Office, People, Work, Money and Marketing in one calm, liquid-glass shell.';

// Keep in sync with the FAQ section in SellSheetGlass.vue. Plain-text answers for
// the FAQPage rich result (Google strips markup anyway).
const faqEntries = [
  { q: 'How is Earnest different from ChatGPT or generic AI assistants?', a: 'Generic AI starts from a blank prompt and sounds confident about everything. Earnest reads your actual organization — your goals, brand, clients and live data across every app — drafts the day’s decisions in your voice, and tells you how confident it is. It acts when it’s sure, proposes when it matters, and holds back when it isn’t.' },
  { q: 'Will Earnest send emails or move money on its own?', a: 'No. Low-stakes, reversible work — reconciling a payment, summarizing a meeting, enriching a contact — can run automatically with a full audit trail. But nothing reaches a client or moves money without your tap. Client-facing and financial actions are always drafted for your approval first.' },
  { q: 'What does it cost?', a: 'Three plans: Solo $49/mo, Studio $149/mo, and Agency $299/mo — priced per workspace, not per action. The Director’s Office and all seven apps are included on every plan, so there are no usage surprises.' },
  { q: 'Is Earnest for solo operators or bigger agencies?', a: 'Both. Solo is built for the one-person shop doing serious work; Studio and Agency add seats, team channels and director tooling as you grow. The same daily rhythm scales from one person to a full team.' },
  { q: 'What happens when Earnest isn’t sure?', a: 'It stops and asks. If it’s thin on your brand, your goals, or a client’s voice, Earnest tells you what it’s missing instead of guessing or filling in generic text. You get accuracy over eagerness — by design.' },
  { q: 'Do I have to replace all my tools at once?', a: 'No. Earnest brings People, Work, Money and Marketing into one place, but you can start where it hurts most — chasing invoices, running a project, re-engaging leads — and let it earn the rest. Everything’s included, so there’s nothing extra to buy as you expand.' },
  { q: 'Can I try it before committing?', a: 'Yes. Explore the live demo right now with real sample data, or request early access to get your own workspace set up while we finalize production.' },
  { q: 'Who can see my data?', a: 'Your workspace is private to your organization — only members you invite can see it, and we never sell your data or share one customer’s data with another. Earnest’s AI reads your data only to generate your own results: context goes to third-party AI providers under terms that bar them from training on it, and we don’t train our own models on it either. Full detail is in our privacy policy.' },
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
  <SellSheetGlass />
</template>
