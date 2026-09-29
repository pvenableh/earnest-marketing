<!--
  LandingAppSwitcher — the rail, and what is behind each chip.

  One switching control for the whole page. Home comes first and is the coded
  home (`LandingLensDemo`), lens pills and all, because that is where the lens
  switcher lives in the app: inside Home, above the greeting. The six apps
  follow as real captures, each with an Earnest chip saying what it would
  offer from inside that app — the same door in every room, and the reason the
  Focus demo above can answer at all.

  ⚠️ Screenshots come from `appTabs` in `~/data/landing`, and only the
  September 2026 captures may be listed there: `public/screenshots/latest/`
  is a mirror, and its July files show the old shell. Where a look has its own
  capture (Money in Paper), `shotByLook` swaps it in; the rest show Glass in
  every look, which is an honest gap rather than a fake.

  The lens demo's tint is re-emitted so the hero's wave field still follows
  the lens, as it did when the home sat in the hero.
-->
<script setup lang="ts">
import { ref, computed } from 'vue';
import { appTabs } from '~/data/landing';
import { getScreenshotSrc } from '~/data/features';
import { useLandingAppearance } from '~/composables/useLandingAppearance';

const emit = defineEmits<{ (e: 'tint', hue: string | null): void }>();

const { look } = useLandingAppearance();

/** Index 0 is Home; `appTabs[i - 1]` for the rest. */
const active = ref(0);
const isHome = computed(() => active.value === 0);
const current = computed(() => (isHome.value ? null : appTabs[active.value - 1]!));

function shotFor(tab: (typeof appTabs)[number]) {
	const slug = tab.shotByLook?.[look.value] ?? tab.shot;
	return getScreenshotSrc(slug as any);
}
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

		<!-- Home: the coded home, lenses and all. -->
		<div v-show="isHome" class="l-apps-home">
			<LandingLensDemo @tint="(h) => emit('tint', h)" />
		</div>

		<!-- The six apps: copy, the chip, and the capture. -->
		<div v-show="!isHome" class="l-apps-stage g-glass">
			<div class="l-apps-side">
				<Transition name="l-apps-fade" mode="out-in">
					<div v-if="current" :key="current.key" class="l-apps-copy">
						<h3 class="l-apps-title">{{ current.title }}</h3>
						<p class="l-apps-desc">{{ current.desc }}</p>
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
			<div class="l-apps-view">
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
