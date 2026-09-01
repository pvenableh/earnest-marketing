<!--
  LandingDoor — the "E." launcher, drawn rather than screenshotted.

  This is the one control in the app's three-control header that opens Focus,
  and the arc around it is the AUTONOMY tier: what Earnest may do on its own
  right now. The geometry and the tier colours are lifted from the app's
  `app/utils/chrome-rings.ts` so the marketing drawing and the real chrome
  cannot drift:

    · r = 10 in a 24×24 viewBox, stroke-width 2 (EARNEST_RING_W)
    · circumference 62.83 (EARNEST_RING_C) — the dasharray denominator
    · tier colours EARNEST_TIER_COLOR, in ladder order

  It is drawn, not captured, for a reason a screenshot cannot solve: the whole
  point of the ring is that it MOVES as trust is earned, and one frame of a
  gauge is just a circle. Hovering (or focusing) walks it up the ladder.
-->
<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

/** Circumference of r=10 in a 24×24 viewBox — mirrors EARNEST_RING_C. */
const RING_C = 62.83;

/**
 * The autonomy ladder, mirroring EARNEST_TIER_COLOR and the app's trust dial.
 * `fraction` is how far round the arc travels at that tier — the same 0–1 the
 * app's `ringDasharray` takes.
 */
const TIERS = [
	{ label: 'Suggesting', color: '#6b7280', fraction: 0.16, note: 'It drafts. You decide everything.' },
	{ label: 'Assisting', color: '#38bdf8', fraction: 0.42, note: 'It does the reversible work and shows you.' },
	{ label: 'Running', color: '#22d3ee', fraction: 0.68, note: 'Routine work runs end to end, with a trail.' },
	{ label: 'Trusted', color: '#4fd89a', fraction: 0.92, note: 'Still not money. Still not a client send.' },
];

const tier = ref(1);
const current = computed(() => TIERS[tier.value]!);
const dash = computed(() => `${current.value.fraction * RING_C} ${RING_C}`);

let timer: ReturnType<typeof setInterval> | null = null;
let paused = false;

function hold() {
	paused = true;
}
function release() {
	paused = false;
}
function step(i: number) {
	tier.value = i;
	paused = true;
}

onMounted(() => {
	const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
	// Reduced motion holds on Assisting — the tier a new workspace actually
	// starts at, so the still frame is the honest one.
	if (reduce) return;
	timer = setInterval(() => {
		if (!paused) tier.value = (tier.value + 1) % TIERS.length;
	}, 2600);
});

onBeforeUnmount(() => {
	if (timer) clearInterval(timer);
});
</script>

<template>
	<div class="l-door" @mouseenter="hold" @mouseleave="release" @focusin="hold" @focusout="release">
		<div class="l-door-stage">
			<span class="l-door-btn" :style="{ '--ring': current.color }">
				<svg viewBox="0 0 24 24" class="l-door-ring" aria-hidden="true">
					<circle cx="12" cy="12" r="10" class="l-door-ring-bg" />
					<circle
						cx="12"
						cy="12"
						r="10"
						class="l-door-ring-fg"
						:stroke-dasharray="dash"
						transform="rotate(-90 12 12)"
					/>
				</svg>
				<span class="l-door-face">E<i>.</i></span>
			</span>
		</div>

		<div class="l-door-read">
			<span class="l-door-tier" :style="{ color: current.color }">{{ current.label }}</span>
			<span class="l-door-note">{{ current.note }}</span>
		</div>

		<div class="l-door-ladder" role="tablist" aria-label="Autonomy tiers">
			<button
				v-for="(t, i) in TIERS"
				:key="t.label"
				type="button"
				role="tab"
				class="l-door-step"
				:class="{ 'l-door-step--on': i === tier }"
				:aria-selected="i === tier"
				:style="{ '--step': t.color }"
				@click="step(i)"
			>
				<span class="l-door-sr">{{ t.label }}</span>
			</button>
		</div>
	</div>
</template>

<style scoped>
.l-door {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;
	padding: 30px 24px 26px;
}

.l-door-stage {
	position: relative;
	display: grid;
	place-items: center;
	width: 96px;
	height: 96px;
}

/* 34px is the app's own launcher size; the 28px face inside it is the same
   proportion. Scaled up here because this is the subject of the section
   rather than one control in a header. */
.l-door-btn {
	position: relative;
	display: grid;
	place-items: center;
	width: 76px;
	height: 76px;
	border-radius: 50%;
	background: var(--g-accent-soft);
	border: 1px solid var(--g-line);
}

.l-door-ring {
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	overflow: visible;
}
.l-door-ring circle {
	fill: none;
	/* EARNEST_RING_W — 1.6 read as a hairline and 2.4 read as chunky. */
	stroke-width: 2;
	stroke-linecap: round;
}
.l-door-ring-bg {
	stroke: var(--g-line);
}
.l-door-ring-fg {
	stroke: var(--ring);
	transition: stroke-dasharray 0.7s cubic-bezier(0.36, 0.66, 0.04, 1), stroke 0.5s ease;
	filter: drop-shadow(0 0 5px color-mix(in srgb, var(--ring) 55%, transparent));
}

.l-door-face {
	font-family: 'Bauer Bodoni Pro_1 W05 Roman', Georgia, serif;
	font-size: 30px;
	line-height: 1;
	color: var(--g-ink);
	transform: translateY(1px);
}
.l-door-face i {
	font-style: normal;
	color: var(--ring);
	transition: color 0.5s ease;
}

.l-door-read {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
	text-align: center;
	/* Reserve the two-line height so walking the ladder never reflows the
	   card underneath it. */
	min-height: 44px;
}
.l-door-tier {
	font-size: 12px;
	font-weight: 700;
	letter-spacing: 0.09em;
	text-transform: uppercase;
	transition: color 0.5s ease;
}
.l-door-note {
	font-size: 13.5px;
	line-height: 1.5;
	color: var(--g-ink-3);
	max-width: 24rem;
}

.l-door-ladder {
	display: flex;
	gap: 8px;
}
.l-door-step {
	width: 9px;
	height: 9px;
	padding: 0;
	border: 0;
	border-radius: 50%;
	cursor: pointer;
	background: var(--g-accent-line);
	transition: transform 0.2s cubic-bezier(0.36, 0.66, 0.04, 1), background 0.2s;
}
.l-door-step--on {
	background: var(--step);
	transform: scale(1.4);
}
.l-door-sr {
	position: absolute;
	width: 1px;
	height: 1px;
	overflow: hidden;
	clip: rect(0 0 0 0);
}

@media (prefers-reduced-motion: reduce) {
	.l-door-ring-fg,
	.l-door-face i,
	.l-door-tier,
	.l-door-step {
		transition: none;
	}
}
</style>
