<!--
  LandingLensDemo — the four lenses, working, over a home that is BUILT.

  The home ships one arrangement and four ways of reading it. Picking a lens
  re-ranks the widgets, re-tints the wave field, and writes one line under the
  greeting from data the page has ALREADY loaded. That third part is the one a
  static screenshot cannot argue, so this control does all three: it re-ranks
  `LandingHomeMock`, hands the hero's `WaveField` a new hue, and lets the mock
  write Earnest's own line under its own greeting.

  ⚠️ IT USED TO SWAP A PNG, AND THE PNG WAS THE CEILING. A capture is stuck in
  the look, palette, type and mode it was taken in — so a visitor who put the
  page into Paper got a Paper page with a Glass app sitting in the middle of
  it, which is precisely the claim the page is trying to make and precisely the
  frame it was breaking. The home is markup now (`HomeMock.vue`), reading the
  same tokens as everything around it, and it floats straight on the wave field
  instead of inside a drawn browser window: the field is the app's own ground,
  and a chrome bar between them was a window onto a screenshot, not a product.

  ⚠️ Every line in `landing.ts` is a line the seeded demo workspace actually
  produced, in the format the app's own `useHomeV2ModeLine` writes. They are
  not written here and they are not embellished. The captures those numbers
  came from are still on the page, in the Looks section, so the drawing can be
  checked against the photographs. Everything has no line on purpose: a lens
  line that always talks is a label, and a label that repeats the lens name is
  noise — so under Everything the mock shows the app's plain count instead.

  The pills carry `.e-dock` / `.e-dock-item` so `useGlassMotion`'s hero intro
  stagger picks them up, exactly as it did for the eight-app dock this
  replaced — that part is selector-driven and needs no wiring. Pointer
  MAGNIFICATION is deliberately not wired up: it sets a pixel width per item,
  which is right for square chips and wrong for pills whose width is their
  label.
-->
<script setup lang="ts">
import { ref, computed } from 'vue';
import { lenses } from '~/data/landing';

const emit = defineEmits<{ (e: 'tint', hue: string | null): void }>();

const active = ref(0);
const current = computed(() => lenses[active.value]!);

function pick(i: number) {
	if (i === active.value) return;
	active.value = i;
	emit('tint', lenses[i]!.hue);
}
</script>

<template>
	<div class="l-lens">
		<div class="l-lens-pills e-dock" role="tablist" aria-label="Home lenses">
			<button
				v-for="(l, i) in lenses"
				:key="l.key"
				type="button"
				role="tab"
				class="l-lens-pill e-dock-item"
				:class="{ 'l-lens-pill--on': i === active }"
				:aria-selected="i === active"
				@click="pick(i)"
			>
				<UIcon :name="l.icon" />
				<span>{{ l.label }}</span>
			</button>
		</div>

		<!-- The page's own aside about the lens, in its own reserved band. Fixed
		     height so switching lenses never jumps the home underneath. What
		     EARNEST says is a different voice and lives in the home itself. -->
		<div class="l-lens-line">
			<Transition name="l-lens-fade" mode="out-in">
				<p :key="current.key" class="l-lens-note">{{ current.note }}</p>
			</Transition>
		</div>

		<LandingHomeMock :lens="current" />
	</div>
</template>

<style scoped>
/* ⚠️ LEFT, not centred, and on the home's own measure. The hero above centres
   everything, and the pills used to centre with it — which was fine while what
   followed was a screenshot in a frame, and wrong the moment what follows is
   the home itself: a control centred over a left-aligned greeting reads as
   part of the marketing page rather than part of the app. In Earnest the lens
   switcher sits top-left above the greeting. It does here too. */
.l-lens {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
	max-width: 1120px;
	margin: 0 auto;
}

.l-lens-pills {
	/* ⚠️ Overriding `.e-dock`, whose class this element also carries so the
	   hero intro timeline still staggers it in. The dock was built for square
	   app chips: it bottom-aligns its children and pushes 44px of top margin.
	   Both are declared here or they leak through. */
	display: flex;
	align-items: center;
	margin: 34px 0 0;
	gap: 6px;
	padding: 6px;
	border-radius: 999px;
	background: var(--g-accent-soft);
	border: 1px solid var(--g-line);
	backdrop-filter: blur(10px);
}

/* The house tab look — the same control the app's own lens switcher uses,
   on the house spring. */
.l-lens-pill {
	/* ⚠️ `width: auto` is load-bearing. `.e-dock-item` pins every child to a
	   52px square — right for an icon chip, and it cropped these pills to
	   40px with the labels sheared off. */
	width: auto;
	display: inline-flex;
	align-items: center;
	gap: 7px;
	padding: 8px 15px;
	border: 0;
	border-radius: 999px;
	background: transparent;
	color: var(--g-ink-2);
	font: inherit;
	font-size: 13.5px;
	font-weight: 600;
	white-space: nowrap;
	cursor: pointer;
	transition:
		background 0.4s cubic-bezier(0.36, 0.66, 0.04, 1),
		color 0.4s cubic-bezier(0.36, 0.66, 0.04, 1),
		transform 0.15s cubic-bezier(0.36, 0.66, 0.04, 1);
}
.l-lens-pill:hover {
	color: var(--g-ink);
}
.l-lens-pill:active {
	transform: scale(0.96);
}
.l-lens-pill--on {
	/* ⚠️ Not `#fff`. Mono's accent is near-WHITE in dark mode, and a hardcoded
	   white label on it left the selected pill blank. `--g-on-accent` is the
	   page's label-on-accent token (sellsheet-home.css) and flips with it. */
	color: var(--g-on-accent, #fff);
	background: var(--g-accent);
	box-shadow: 0 8px 20px -10px var(--g-accent);
}
.l-lens-pill :deep(svg),
.l-lens-pill :deep([class*='iconify']) {
	width: 16px;
	height: 16px;
	flex: none;
}

/* Reserved band — two lines at the narrowest width this section reaches, so
   the home below never moves when a longer note comes up. */
.l-lens-line {
	display: grid;
	align-items: center;
	min-height: 40px;
	margin-top: 14px;
	padding: 0 2px;
}
.l-lens-note {
	margin: 0;
	max-width: 46rem;
	font-size: 14.5px;
	line-height: 1.55;
	color: var(--g-ink-3);
}

.l-lens-fade-enter-active,
.l-lens-fade-leave-active {
	transition: opacity 0.28s ease, transform 0.28s cubic-bezier(0.36, 0.66, 0.04, 1);
}
.l-lens-fade-enter-from {
	opacity: 0;
	transform: translateY(6px);
}
.l-lens-fade-leave-to {
	opacity: 0;
	transform: translateY(-6px);
}

@media (prefers-reduced-motion: reduce) {
	.l-lens-fade-enter-active,
	.l-lens-fade-leave-active {
		transition: none;
	}
	.l-lens-fade-enter-from,
	.l-lens-fade-leave-to {
		transform: none;
	}
}

@media (max-width: 560px) {
	.l-lens-pills {
		flex-wrap: wrap;
		justify-content: flex-start;
		border-radius: 22px;
	}
}
</style>
