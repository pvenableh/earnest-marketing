<!--
  LandingLensDemo — the four lenses, working.

  The home ships one arrangement and four ways of reading it. Picking a lens
  re-ranks the widgets, re-tints the wave field, and writes one line under the
  greeting from data the page has ALREADY loaded. That third part is the one
  a static screenshot cannot argue, so this control does all three: it swaps
  the shot, hands the hero's `WaveField` a new hue, and shows the line.

  ⚠️ Every line in `landing.ts` is a line the seeded demo workspace actually
  produced, in the format the app's own `useHomeV2ModeLine` writes. They are
  not written here and they are not embellished — the screenshot beside them
  shows the same words. Everything has no line on purpose: a lens line that
  always talks is a label, and a label that repeats the lens name is noise.

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
import { getScreenshotSrc } from '~/data/features';

const props = withDefaults(defineProps<{ look?: string }>(), { look: 'glass' });
const emit = defineEmits<{ (e: 'tint', hue: string | null): void }>();

const active = ref(0);
const current = computed(() => lenses[active.value]!);

/**
 * The shot, in whichever Look the page is currently wearing. Only Everything
 * carries all three; every other lens falls back to its Glass capture, which
 * is the honest thing to show — it is the capture that exists.
 */
const currentShot = computed(() => current.value.shotByLook?.[props.look] ?? current.value.shot);

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

		<!-- The line, in its own reserved band. Fixed height so switching
		     between a lens that speaks and one that doesn't never jumps the
		     screenshot underneath. -->
		<div class="l-lens-line" aria-live="polite">
			<Transition name="l-lens-fade" mode="out-in">
				<p v-if="current.line" :key="`${current.key}-${look}`" class="l-lens-said">
					<span class="l-lens-mark" aria-hidden="true"></span>{{ current.line }}
				</p>
				<p v-else :key="`${current.key}-note`" class="l-lens-note">{{ current.note }}</p>
			</Transition>
		</div>

		<figure class="l-lens-shot">
			<div class="e-frame g-hero-frame">
				<div class="e-frame-chrome" aria-hidden="true"><span></span><span></span><span></span></div>
				<Transition name="l-lens-fade" mode="out-in">
					<img
						:key="current.key"
						:src="getScreenshotSrc(currentShot as any)"
						:alt="`Earnest — the home under the ${current.label} lens`"
						loading="eager"
						decoding="async"
						class="e-frame-img"
					/>
				</Transition>
			</div>
		</figure>
	</div>
</template>

<style scoped>
.l-lens {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
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
	color: #fff;
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
   the frame below never moves when a lens with a longer line comes up. */
.l-lens-line {
	display: grid;
	place-items: center;
	min-height: 58px;
	margin-top: 18px;
	padding: 0 16px;
	text-align: center;
}
.l-lens-said,
.l-lens-note {
	margin: 0;
	max-width: 46rem;
	font-size: 15px;
	line-height: 1.55;
}
.l-lens-said {
	color: var(--g-ink);
	font-weight: 600;
}
.l-lens-note {
	color: var(--g-ink-3);
}
/* The small square Earnest writes its own lines behind, in the app. */
.l-lens-mark {
	display: inline-block;
	width: 3px;
	height: 13px;
	margin-right: 9px;
	border-radius: 2px;
	background: var(--g-accent);
	vertical-align: -1px;
}

.l-lens-shot {
	width: 100%;
	margin: 6px 0 0;
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
		justify-content: center;
		border-radius: 22px;
	}
}
</style>
