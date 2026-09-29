<!--
  LandingAppSwitcher — six apps, one memory.

  Breadth, in one control: six tabs, six real screens, and on every one an
  Earnest chip saying what it would offer from inside that app. The chip is
  what makes this more than a screenshot carousel — it is the same door in
  every room, and the reason the Focus demo above can answer at all.

  ⚠️ Screenshots come from `appTabs` in `~/data/landing`, and only the
  September 2026 captures may be listed there: `public/screenshots/latest/`
  is a mirror, and its July files show the old shell. Where a look has its own
  capture (Money in Paper), `shotByLook` swaps it in; the rest show Glass in
  every look, which is an honest gap rather than a fake.
-->
<script setup lang="ts">
import { ref, computed } from 'vue';
import { appTabs } from '~/data/landing';
import { getScreenshotSrc } from '~/data/features';
import { useLandingAppearance } from '~/composables/useLandingAppearance';

const { look } = useLandingAppearance();
const active = ref(0);
const current = computed(() => appTabs[active.value]!);

function shotFor(tab: (typeof appTabs)[number]) {
	const slug = tab.shotByLook?.[look.value] ?? tab.shot;
	return getScreenshotSrc(slug as any);
}
</script>

<template>
	<div class="l-apps">
		<div class="l-apps-tabs" role="tablist" aria-label="The apps">
			<button
				v-for="(t, i) in appTabs"
				:key="t.key"
				type="button"
				role="tab"
				class="l-apps-tab"
				:class="{ 'l-apps-tab--on': i === active }"
				:aria-selected="i === active"
				@click="active = i"
			>
				{{ t.label }}
			</button>
		</div>
		<div class="l-apps-stage g-glass">
			<div class="l-apps-side">
				<Transition name="l-apps-fade" mode="out-in">
					<div :key="current.key" class="l-apps-copy">
						<h3 class="l-apps-title">{{ current.title }}</h3>
						<p class="l-apps-desc">{{ current.desc }}</p>
						<div class="l-apps-chip">
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
					:class="{ 'l-apps-img--on': i === active }"
					class="l-apps-img"
					:loading="i === 0 ? 'eager' : 'lazy'"
					decoding="async"
				/>
			</div>
		</div>
	</div>
</template>
