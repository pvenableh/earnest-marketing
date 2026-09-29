<!--
  LandingAppSwitcher — the rail, and what is behind each chip.

  One switching control for the whole page. Home comes first and every entry,
  Home included, wears the same stage: the Earnest column on the left (what
  this app is, and what Earnest would offer from inside it — the same door in
  every room, and the reason the Focus demo above can answer at all), and the
  app itself on the right.

  ⚠️ HOME'S LENSES LIVE IN THE COLUMN, NOT OVER THE HOME. They used to sit as a
  pill row above the greeting, which is where they are in the app — but here
  that put a second row of tabs directly under the rail, and two tab rows
  stacked read as one broken control. In the column they read as what they
  are: a way of reading the screen beside them.

  Home's view is the coded home (`HomeMock.vue`), drawn at its full 1120px
  measure and zoomed to fit the view, so its widget column is there at every
  width the stage runs two-up — the six captures beside it are scaled the same
  way. Below 600px of view it stops zooming and reflows instead, because a
  home at a third of its size is a thumbnail, not a screen.

  ⚠️ Screenshots come from `appTabs` in `~/data/landing`, and only the
  September 2026 captures may be listed there: `public/screenshots/latest/`
  is a mirror, and its July files show the old shell. Where a look has its own
  capture (Money in Paper), `shotByLook` swaps it in; the rest show Glass in
  every look, which is an honest gap rather than a fake.

  The lens tint is emitted so the hero's wave field still follows the lens.
-->
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { appTabs, homeTab, lenses } from '~/data/landing';
import { getScreenshotSrc } from '~/data/features';
import { useLandingAppearance } from '~/composables/useLandingAppearance';

const emit = defineEmits<{ (e: 'tint', hue: string | null): void }>();

const { look } = useLandingAppearance();

/** Index 0 is Home; `appTabs[i - 1]` for the rest. */
const active = ref(0);
const isHome = computed(() => active.value === 0);
const current = computed(() =>
	isHome.value ? { key: 'home', label: 'Home', ...homeTab } : appTabs[active.value - 1]!,
);

const lensIdx = ref(0);
const lens = computed(() => lenses[lensIdx.value]!);
function pickLens(i: number) {
	if (i === lensIdx.value) return;
	lensIdx.value = i;
	emit('tint', lenses[i]!.hue);
}

function shotFor(tab: (typeof appTabs)[number]) {
	const slug = tab.shotByLook?.[look.value] ?? tab.shot;
	return getScreenshotSrc(slug as any);
}

// The home's zoom. Its design measure is `.hm`'s 1120px max-width plus the
// view's padding on both sides.
const HOME_W = 1120;
const HOME_PAD = 28;
const viewRef = ref<HTMLElement | null>(null);
const homeZoom = ref<number | null>(null);
let ro: ResizeObserver | null = null;
onMounted(() => {
	if (!viewRef.value) return;
	ro = new ResizeObserver(([entry]) => {
		const w = entry!.contentRect.width;
		// `zoom` scales the padding too, so the padding is part of the measure.
		homeZoom.value = w >= 600 ? Math.min(1, w / (HOME_W + HOME_PAD * 2)) : null;
	});
	ro.observe(viewRef.value);
});
onUnmounted(() => ro?.disconnect());
</script>

<template>
	<div class="l-apps">
		<div class="l-apps-rail" role="tablist" aria-label="The apps">
			<button
				type="button"
				role="tab"
				class="l-apps-chip g-press"
				:class="{ 'l-apps-chip--on': isHome }"
				:aria-selected="isHome"
				aria-label="Home"
				@click="active = 0"
			>
				<UIcon name="i-lucide-layout-dashboard" />
				<span>Home</span>
			</button>
			<button
				v-for="(t, i) in appTabs"
				:key="t.key"
				type="button"
				role="tab"
				class="l-apps-chip g-press"
				:class="{ 'l-apps-chip--on': active === i + 1 }"
				:aria-selected="active === i + 1"
				:aria-label="t.label"
				@click="active = i + 1"
			>
				<UIcon :name="t.icon" />
				<span>{{ t.label }}</span>
			</button>
		</div>

		<div class="l-apps-stage g-glass" :class="{ 'l-apps-stage--home': isHome }">
			<!-- The Earnest column. -->
			<div class="l-apps-side">
				<Transition name="l-apps-fade" mode="out-in">
					<div :key="current.key" class="l-apps-copy">
						<h3 class="l-apps-title">{{ current.title }}</h3>
						<p class="l-apps-desc">{{ current.desc }}</p>

						<template v-if="isHome">
							<div class="l-apps-lenses" role="radiogroup" aria-label="Home lenses">
								<button
									v-for="(l, i) in lenses"
									:key="l.key"
									type="button"
									role="radio"
									class="l-apps-lens g-press"
									:class="{ 'l-apps-lens--on': i === lensIdx }"
									:aria-checked="i === lensIdx"
									@click="pickLens(i)"
								>
									<UIcon :name="l.icon" />
									<span>{{ l.label }}</span>
								</button>
							</div>
							<p class="l-apps-lens-note">{{ lens.note }}</p>
						</template>

						<div class="l-apps-chip-e-wrap">
							<span class="l-apps-chip-e">E<b>.</b></span>
							<span class="l-apps-chip-body">
								{{ current.chip }}
								<small>From {{ current.label }} · drafted, not sent</small>
							</span>
						</div>
					</div>
				</Transition>
			</div>

			<div ref="viewRef" class="l-apps-view">
				<!-- Home: the coded home, zoomed to the view. -->
				<div
					v-show="isHome"
					class="l-apps-home"
					:class="{ 'l-apps-home--fit': homeZoom !== null }"
					:style="homeZoom !== null ? { zoom: homeZoom } : undefined"
				>
					<LandingHomeMock :lens="lens" />
				</div>

				<!-- The six apps: the captures. -->
				<img
					v-for="(t, i) in appTabs"
					:key="t.key"
					:src="shotFor(t)"
					:alt="`Earnest — ${t.title}`"
					:class="{ 'l-apps-img--on': active === i + 1 }"
					class="l-apps-img"
					loading="lazy"
					decoding="async"
				/>
			</div>
		</div>
	</div>
</template>
