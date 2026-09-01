<!--
  LandingLooks — three looks, one Earnest.

  The looks are not a colour swap, and a page that argued that with a
  screenshot carousel would be making the claim in the one medium that cannot
  show it. So this control does not restyle a card — it restyles THE WHOLE
  PAGE. Picking Paper or Clean puts `data-look` on the landing's root and the
  nav, headings, cards, buttons, rules and the hero's own wave field all
  change with it. The skins live in `sellsheet-home.css`; this component owns
  only the choice.

  The screenshot inside the card swaps at the same time, so the app on screen
  and the page around it are always wearing the same look.

  ⚠️ FONT NOTE. `--font-bauer-bodoni` is remapped to Proxima in `main.css`, so
  Paper names 'Bauer Bodoni Pro_1 W05 Roman' directly — going through the token
  would silently render Paper in the sans it is supposed to contrast with.
  Clean uses the app's real DIN Pro Condensed, copied over from
  `app/assets/css/fonts/`: uppercase condensed caps are the one thing that
  makes Clean recognisable, and tracked-out Proxima is not them.
-->
<script setup lang="ts">
import { ref, computed } from 'vue';
import { looks } from '~/data/landing';
import { getScreenshotSrc } from '~/data/features';

const emit = defineEmits<{ (e: 'look', key: string): void }>();

const active = ref(0);
const current = computed(() => looks[active.value]!);

function pick(i: number) {
	if (i === active.value) return;
	active.value = i;
	emit('look', looks[i]!.key);
}
</script>

<template>
	<div class="l-looks">
		<div class="l-looks-switch" role="tablist" aria-label="Looks">
			<button
				v-for="(l, i) in looks"
				:key="l.key"
				type="button"
				role="tab"
				class="l-looks-tab"
				:class="{ 'l-looks-tab--on': i === active }"
				:aria-selected="i === active"
				@click="pick(i)"
			>
				{{ l.label }}
			</button>
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
				<span class="l-looks-name">{{ current.label }}</span>
				<span class="l-looks-blurb">{{ current.blurb }}</span>
			</figcaption>
		</figure>

		<p class="l-looks-fine">
			<strong>This page is wearing it too</strong> — pick one and the whole thing changes, the same way the app
			does. Type, colour and an extra-contrast mode move on their own axes in the app, and every combination is
			checked against a 210-pair contrast ratchet, so no look can ship a stripe you cannot read.
		</p>
	</div>
</template>

<style scoped>
.l-looks {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 22px;
	width: 100%;
}

.l-looks-switch {
	display: inline-flex;
	gap: 4px;
	padding: 5px;
	border-radius: 999px;
	background: var(--g-accent-soft);
	border: 1px solid var(--g-line);
}
.l-looks-tab {
	padding: 8px 20px;
	border: 0;
	border-radius: 999px;
	background: transparent;
	color: var(--g-ink-2);
	font: inherit;
	font-size: 13.5px;
	font-weight: 600;
	cursor: pointer;
	transition:
		background 0.4s cubic-bezier(0.36, 0.66, 0.04, 1),
		color 0.4s cubic-bezier(0.36, 0.66, 0.04, 1);
}
.l-looks-tab--on {
	color: #fff;
	background: var(--g-accent);
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
	max-width: 44rem;
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
