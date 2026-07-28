<script setup lang="ts">
// Archive of the original "glass" landing (SellSheetGlass) — the long-form,
// 11-section narrative experience that was the homepage before the LIVE
// simplification. Kept reachable here (noindex) so it can always be compared
// against, or restored, while index.vue is developed toward the new version.
const description = 'The original Earnest glass landing — preserved for reference.';

useHead({
  title: 'Earnest — Do good work. (archive)',
  meta: [{ name: 'description', content: description }],
  link: [{ rel: 'canonical', href: 'https://earnest.guru/glass' }],
});

useSeoMeta({
  title: 'Earnest — Do good work. (archive)',
  robots: 'noindex, nofollow',
});
</script>

<template>
  <SellSheetGlass />
</template>
