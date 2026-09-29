<!--
  LandingLooks — a teaser for the appearance system, not the system itself.

  It used to hand over the whole Appearance panel (look, palette, type, mode)
  with a capture underneath, which made a closing section the heaviest control
  on the page. The panel still exists — it is the swatch button in the nav —
  so this section only has to say that the looks are real and show them: the
  three captures, side by side. Tapping one puts the page into that look; the
  button opens the full panel in the nav.

  ⚠️ The captures are the receipt. Everything else on the page is drawn by us;
  these are the app itself, photographed on 2026-09-01. If a drawing and a
  photograph ever disagree, the photograph is right and the page is wrong.
-->
<script setup lang="ts">
import { looks } from '~/data/landing';
import { getScreenshotSrc } from '~/data/features';
import { useLandingAppearance, LANDING_LOOKS } from '~/composables/useLandingAppearance';

const emit = defineEmits<{ (e: 'open-panel'): void }>();

const { look, setLook } = useLandingAppearance();
const hint = (key: string) => LANDING_LOOKS.find((o) => o.key === key)?.hint ?? '';
</script>

<template>
	<div class="l-looks">
		<div class="l-looks-row" role="radiogroup" aria-label="Look">
			<button
				v-for="l in looks"
				:key="l.key"
				type="button"
				role="radio"
				class="l-looks-card g-glass g-press"
				:class="{ 'l-looks-card--on': look === l.key }"
				:aria-checked="look === l.key"
				@click="setLook(l.key)"
			>
				<img
					:src="getScreenshotSrc(l.shot as any)"
					:alt="`Earnest — the home in the ${l.label} look`"
					class="l-looks-img"
					loading="lazy"
					decoding="async"
				/>
				<span class="l-looks-name">{{ l.label }}</span>
				<span class="l-looks-hint">{{ hint(l.key) }}</span>
			</button>
		</div>

		<p class="l-looks-fine">
			Tap one and this page wears it.
			<button type="button" class="l-looks-more" @click="emit('open-panel')">
				Palette, type and dark mode <UIcon name="i-lucide-arrow-up-right" />
			</button>
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

.l-looks-row {
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 16px;
	width: 100%;
	max-width: 1040px;
}

.l-looks-card {
	display: flex;
	flex-direction: column;
	gap: 4px;
	padding: 10px 10px 16px;
	border-radius: 18px;
	font: inherit;
	text-align: left;
	color: inherit;
	cursor: pointer;
	transition:
		border-radius 0.45s cubic-bezier(0.36, 0.66, 0.04, 1),
		border-color 0.3s ease,
		box-shadow 0.3s ease;
}
.l-looks-card--on {
	border-color: var(--g-accent);
	box-shadow: 0 0 0 1px var(--g-accent);
}
.l-looks-img {
	display: block;
	width: 100%;
	aspect-ratio: 16 / 10;
	object-fit: cover;
	object-position: center top;
	border-radius: 10px;
	margin-bottom: 10px;
}
.l-looks-name {
	padding: 0 6px;
	font-size: 17px;
	font-weight: 700;
	color: var(--g-ink);
}
.l-looks-hint {
	padding: 0 6px;
	font-size: 13.5px;
	line-height: 1.5;
	color: var(--g-ink-2);
}

.l-looks-fine {
	margin: 0;
	text-align: center;
	font-size: 14px;
	line-height: 1.6;
	color: var(--g-ink-3);
}
.l-looks-more {
	display: inline-flex;
	align-items: center;
	gap: 4px;
	margin-left: 6px;
	padding: 0;
	border: 0;
	background: none;
	font: inherit;
	font-weight: 600;
	color: var(--g-accent-ink, var(--g-accent));
	cursor: pointer;
}
.l-looks-more:hover {
	text-decoration: underline;
	text-underline-offset: 3px;
}

@media (max-width: 760px) {
	.l-looks-row {
		grid-template-columns: 1fr;
		max-width: 420px;
	}
}

@media (prefers-reduced-motion: reduce) {
	.l-looks-card {
		transition: none;
	}
}
</style>
