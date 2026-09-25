<!--
  LandingHomeMock — Earnest's Home, built rather than photographed.

  ⚠️ WHY THIS IS NOT A SCREENSHOT. The captures on disk (`home-v2*.png`,
  2026-09-01) show the Home the app had BEFORE the 2026-09-22 rethink — four
  lenses, stat tiles, three piles, a widget rail. That Home is gone. Home is
  now four things in order (app repo `app/components/Home/Surface.vue`):

    1. the greeting, and one true clause from the person's own numbers;
    2. the opening paragraph — three sentences at most, each ending in the
       verb it needs, and a verb is a link at the end of a sentence, never a
       button (`shared/brief.ts`);
    3. the composer, with its Do · Decide · Know chips and the mic;
    4. "Waiting for you · N", then Recent — both a column of the same action
       card, and Recent is where Undo lives.

  A drawing can show that today; a capture from three weeks ago cannot. It
  also wears whatever look, palette and type the visitor has picked, which is
  the Looks section's whole claim.

  ⚠️ AND IT IS NOT A LIE. Every string is `mockHome` in `~/data/earnest`,
  whose numbers are the solo demo seed's. Nothing here may say something the
  app would not.
-->
<script setup lang="ts">
import { mockHome } from '~/data/earnest';
</script>

<template>
	<div class="hm">
		<!-- 1. The greeting and its one clause -->
		<div class="hm-greet">
			<p class="hm-hello">{{ mockHome.greeting }} <span class="hm-wave" aria-hidden="true">👋</span></p>
			<p class="hm-intro">{{ mockHome.intro }}</p>
		</div>

		<!-- 2. The opening paragraph. Verbs end sentences; none is a button. -->
		<p class="hm-brief">
			<template v-for="(line, li) in mockHome.brief" :key="li">
				<span v-for="(s, si) in line.segs" :key="si" :class="{ 'hm-num': s.kind === 'num' }">{{ s.t }}</span>
				<template v-for="(v, vi) in line.verbs" :key="`v${vi}`">
					{{ ' ' }}<span class="hm-verb">{{ v }}</span><span v-if="vi < line.verbs.length - 1"> ·</span>
				</template>
				<span v-if="li < mockHome.brief.length - 1">{{ ' ' }}</span>
			</template>
		</p>

		<!-- 3. The composer, teleported into Home on a phone or the Line; the column, elsewhere. -->
		<div class="hm-composer">
			<div class="hm-chips" aria-label="Suggestions">
				<span v-for="c in mockHome.chips" :key="c" class="hm-chip">{{ c }}</span>
				<span class="hm-chip hm-chip--more">More</span>
			</div>
			<div class="hm-box g-glass-thin">
				<span class="hm-box-input">{{ mockHome.placeholder }}</span>
				<span class="hm-box-ic" aria-hidden="true"><UIcon name="i-lucide-paperclip" /></span>
				<span class="hm-box-ic" aria-hidden="true"><UIcon name="i-lucide-mic" /></span>
			</div>
		</div>

		<!-- 4. Waiting for you, then Recent — the same card, twice. -->
		<section class="hm-list">
			<header class="hm-list-head">
				<h3 class="hm-list-name">Waiting for you</h3>
				<span class="hm-list-count">{{ mockHome.waiting.count }}</span>
				<span class="hm-list-all">Approve all</span>
			</header>
			<div class="hm-card g-glass-thin">
				<span class="hm-card-dot" aria-hidden="true"></span>
				<div class="hm-card-body">
					<p class="hm-card-title">{{ mockHome.waiting.card.title }}</p>
					<p class="hm-card-meta">{{ mockHome.waiting.card.meta }}</p>
				</div>
				<span class="hm-card-btn hm-card-btn--primary">Approve</span>
				<span class="hm-card-btn">Edit</span>
				<span class="hm-card-btn hm-card-btn--quiet">Skip</span>
			</div>
			<p class="hm-list-more">4 more <UIcon name="i-lucide-chevron-down" /></p>
		</section>

		<section class="hm-list">
			<header class="hm-list-head">
				<h3 class="hm-list-name">Recent</h3>
			</header>
			<div class="hm-card hm-card--done g-glass-thin">
				<span class="hm-card-dot hm-card-dot--done" aria-hidden="true"><UIcon name="i-lucide-check" /></span>
				<div class="hm-card-body">
					<p class="hm-card-title">{{ mockHome.recent.card.title }}</p>
					<p class="hm-card-meta">{{ mockHome.recent.card.meta }}</p>
				</div>
				<span class="hm-card-btn hm-card-btn--quiet"><UIcon name="i-lucide-undo-2" /> Undo</span>
			</div>
		</section>
	</div>
</template>
