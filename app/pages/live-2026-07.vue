<script setup lang="ts">
// ARCHIVE — the landing that ran from 2026-07-28 to 2026-09-01 (SellSheetLive).
// Kept at a noindex route so anything that linked to a screenshot or a section
// of it still resolves, and so the copy is diffable against what replaced it.
//
// ⚠️ Its claims are STALE ON PURPOSE and must not be revived: it leads with the
// Command Center, an eight-chip app rail, a docked AI sidebar, the Director's
// Office and "schedule across channels". All five describe surfaces the app
// either renamed or retired. Do not spend time fixing them — fix the live
// landing instead.
const description = 'Archived Earnest landing page (July 2026).';

useHead({
  title: 'Earnest — Do good work. (archived, July 2026)',
  meta: [{ name: 'description', content: description }],
  link: [{ rel: 'canonical', href: 'https://earnest.guru' }],
});

useSeoMeta({
  title: 'Earnest — Do good work. (archived, July 2026)',
  robots: 'noindex, nofollow',
});
</script>

<template>
  <SellSheetLive />
</template>
