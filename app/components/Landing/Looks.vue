<!--
  LandingLooks — the appearance system, and the receipt for it.

  The looks are not a colour swap, and a page that argued that with a
  screenshot carousel would be making the claim in the one medium that cannot
  show it. So this section does not restyle a card — it hands over the app's
  own Appearance panel and restyles THE WHOLE PAGE. Look, palette, type and
  mode all write attributes on the landing's root, and the nav, headings,
  cards, buttons, rules, the hero's wave field and the coded home standing in
  front of it all change with them. The skins live in `sellsheet-home.css`;
  `useLandingAppearance` owns the choice, so the nav popover and this panel are
  the same control.

  ⚠️ THE SCREENSHOT IS STILL HERE, AND IT HAS A JOB. Everything else on this
  page is now drawn by us, which is exactly the kind of claim a buyer should
  want evidence for. This is the evidence: a real capture of the real app in
  the selected look, taken on 2026-09-01, sitting directly under a page
  wearing the same look. If the drawing and the photograph ever disagree, the
  photograph is right and the page is wrong.

  ⚠️ FONT NOTE. `--font-bauer-bodoni` is remapped to Proxima in `main.css`, so
  Paper names 'Bauer Bodoni Pro_1 W05 Roman' directly — going through the token
  would silently render Paper in the sans it is supposed to contrast with.
  Clean uses the app's real DIN Pro Condensed, copied over from
  `app/assets/css/fonts/`: uppercase condensed caps are the one thing that
  makes Clean recognisable, and tracked-out Proxima is not them.
-->
<script setup lang="ts">
import { computed } from 'vue';
import { looks } from '~/data/landing';
import { getScreenshotSrc } from '~/data/features';
import { useLandingAppearance } from '~/composables/useLandingAppearance';

const { look } = useLandingAppearance();
const current = computed(() => looks.find((l) => l.key === look.value) ?? looks[0]!);
</script>

<template>
	<div class="l-looks">
		<div class="l-looks-panel g-glass">
			<LandingAppearance variant="panel" />
		</div>

		<figure class="l-looks-card g-glass">
			<div class="e-frame">
				<div class="e-frame-chrome" aria-hidden="true"><span></span><span></span><span></span></div>
				<Transition name="l-looks-fade" mode="out-in">
					<img
						:key="current.key"
						:src="getScreenshotSrc(current.shot as any)"
						:alt="`Earnest — the home in the ${current.label} look`"
						loading="lazy"
						decoding="async"
						class="e-frame-img"
					/>
				</Transition>
			</div>
			<figcaption class="l-looks-cap">
				<span class="l-looks-name">{{ current.label }} — the capture</span>
				<span class="l-looks-blurb">
					The app itself, photographed on 2026-09-01. The home at the top of this page is the same screen in
					markup, which is why it turns with the page and this one does not.
				</span>
			</figcaption>
		</figure>

		<p class="l-looks-fine">
			<strong>This page is wearing your picks</strong> — look, palette, type and mode, the same four axes the app
			gives you, with the same limits: a look brings its own palette, and Paper brings its own display face. Every
			combination is checked against a 210-pair contrast ratchet, so no look can ship a stripe you cannot read.
		</p>
	</div>
</template>

<style scoped>
.l-looks {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 26px;
	width: 100%;
}

.l-looks-panel {
	width: 100%;
	max-width: 980px;
	padding: 22px clamp(18px, 3vw, 30px);
	border-radius: 22px;
	transition: border-radius 0.45s cubic-bezier(0.36, 0.66, 0.04, 1), background 0.45s ease, border-color 0.45s ease;
}

.l-looks-card {
	width: 100%;
	max-width: 980px;
	margin: 0;
	padding: 18px;
	border-radius: 22px;
	/* The card itself is what restyles — border radius, rule weight and the
	   caption's whole voice move with the look. */
	transition:
		border-radius 0.45s cubic-bezier(0.36, 0.66, 0.04, 1),
		background 0.45s ease,
		border-color 0.45s ease;
}
.l-looks-card .e-frame-img {
	display: block;
	width: 100%;
	aspect-ratio: 16 / 10;
	object-fit: cover;
	object-position: center top;
}

.l-looks-cap {
	display: flex;
	flex-direction: column;
	gap: 6px;
	padding: 18px 6px 4px;
	/* Two lines of blurb at the narrowest width — reserved so a look switch
	   never nudges the section below it. */
	min-height: 74px;
}
.l-looks-name {
	font-size: 19px;
	font-weight: 700;
	color: var(--g-ink);
	transition: font-size 0.3s ease, letter-spacing 0.3s ease;
}
.l-looks-blurb {
	font-size: 14.5px;
	line-height: 1.55;
	color: var(--g-ink-2);
}

/* The card's caption follows the page's look through the tokens the skins in
   sellsheet-home.css already set — it deliberately carries no look CSS of its
   own. An earlier pass restyled only this card, which made the switcher look
   like a preview widget rather than the page's own control. */

.l-looks-fine {
	max-width: 46rem;
	margin: 0;
	text-align: center;
	font-size: 13.5px;
	line-height: 1.6;
	color: var(--g-ink-3);
}

.l-looks-fade-enter-active,
.l-looks-fade-leave-active {
	transition: opacity 0.35s ease;
}
.l-looks-fade-enter-from,
.l-looks-fade-leave-to {
	opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
	.l-looks-card,
	.l-looks-name,
	.l-looks-fade-enter-active,
	.l-looks-fade-leave-active {
		transition: none;
	}
}
</style>
