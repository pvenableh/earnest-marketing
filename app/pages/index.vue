<script setup lang="ts">
// Landing page (for now): the Director glass experience (SellSheetGlass).
// The previous homepage is preserved at /classic. SellSheetGlass no longer sets
// its own head, so this page fully controls the landing SEO.
const description = 'Earnest is the honest AI for people who do good work — it reads your whole organization, tells you the truth about where things stand, learns how you work, and drafts the day in your voice, automating only what it’s sure of. Step into Focus to take it one honest thing at a time. The Director’s Office, People, Work, Money and Marketing in one calm shell.';

// Keep in sync with the FAQ section in SellSheetGlass.vue. Plain-text answers for
// the FAQPage rich result (Google strips markup anyway).
const faqEntries = [
  { q: 'How is Earnest different from ChatGPT or generic AI assistants?', a: 'Earnest runs on a real large language model — Anthropic’s Claude, on no-training terms, the same class of AI as ChatGPT — but instead of starting from a blank prompt, it works from your actual organization: your goals, brand, clients and live data across every app, and drafts the day’s decisions in your voice. Because it works from real context, it acts on what it understands, proposes when it matters, and asks when it’s missing something instead of guessing.' },
  { q: 'What is Focus mode?', a: 'Focus is a calm, full-screen space where Earnest sits with you — one honest read on where things stand, and room to take the day one thing at a time instead of scanning a dashboard. Step in when it’s a lot; it’s the same Earnest, just quieter and one-on-one.' },
  { q: 'Does Earnest really learn how I work?', a: 'Yes. It learns your voice, your rhythm, the calls you always make and the ones you never would — so its drafts sound like you and its priorities match yours. As it proves itself accurate you can dial up how much it handles on its own, from suggesting to assisting to running routine work end to end. There is a hard floor it never crosses: money and client-facing sends always wait for your tap.' },
  { q: 'Will Earnest send emails or move money on its own?', a: 'No. Low-stakes, reversible work — reconciling a payment, summarizing a meeting, enriching a contact — can run automatically with a full audit trail. But nothing reaches a client or moves money without your tap. Client-facing and financial actions are always drafted for your approval first.' },
  { q: 'What does it cost?', a: 'Three plans: Solo $49/mo, Studio $149/mo, and Agency $299/mo — priced per workspace, not per action. The Director’s Office and all seven apps are included on every plan, so there are no usage surprises.' },
  { q: 'Is Earnest for solo operators or bigger agencies?', a: 'Both. Solo is built for the one-person shop doing serious work; Studio and Agency add seats, team channels and director tooling as you grow. The same daily rhythm scales from one person to a full team.' },
  { q: 'What happens when Earnest doesn’t have enough context?', a: 'It stops and asks. If it’s thin on your brand, your goals, or a client’s voice, Earnest tells you what it’s missing instead of guessing or filling in generic text. It only acts on what it actually understands — real context over generic confidence.' },
  { q: 'Do I have to replace all my tools at once?', a: 'No. Earnest brings People, Work, Money and Marketing into one place, but you can start where it hurts most — chasing invoices, running a project, re-engaging leads — and let it earn the rest. Everything’s included, so there’s nothing extra to buy as you expand.' },
  { q: 'Can I track proposals that go cold or get rejected?', a: 'Yes — that is the point. Earnest keeps the whole life of every proposal, including the ones that went quiet or got a no, attached to the lead or client and its contact. Cold and lost deals stay on the record so you can see your real win rate, learn why work slips, and pick a deal back up later instead of losing the history.' },
  { q: 'What is the difference between money I am owed and money that is still out there?', a: 'Earnest sorts every dollar by how certain it is: banked (paid), owed (invoiced — overdue or not yet due), in play (live proposals still open), and cold (deals that went quiet). Owed money is billed and collectible; money still out there is pipeline you have not won yet. Keeping them on separate rungs means the honest cash never blurs into the hopeful pipeline.' },
  { q: 'What happens to a deal that goes quiet?', a: 'It does not just disappear. Earnest flags it as cold, keeps it in view as money worth reviving, and — because it remembers the full history — reads what happened and drafts the re-approach in your voice, ready for your tap. You decide whether to send it or log it as a touchpoint; nothing goes out on its own.' },
  { q: 'Can I try it before committing?', a: 'Yes. Explore the live demo right now with real sample data, or request early access to get your own workspace set up while we finalize production.' },
  { q: 'Who can see my data?', a: 'Your workspace is private to your organization — only members you invite can see it, and we never sell your data or share one customer’s data with another. Earnest’s AI reads your data only to generate your own results: context goes to Anthropic’s Claude under no-training terms that bar it from training on it, and we don’t train our own models on it either. Full detail is in our privacy policy.' },
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
        featureList: "The Director's Office, Focus mode, Learns how you work & earned trust, Context-aware AI, AI Actions, People CRM, Projects & Tasks, Cash Flow & Invoicing, Proposals & Contracts, Marketing, Earnest Score & Gamification, CardDesk",
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
