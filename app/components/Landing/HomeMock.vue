<!--
  LandingHomeMock — Earnest's home, built rather than photographed.

  ⚠️ WHY THIS IS NOT A SCREENSHOT. The page's central claim is that a look is a
  real redesign and that a lens re-ranks a live screen. A PNG can illustrate
  either claim and can prove neither: a captured home is stuck in the look,
  palette, type and mode it was captured in, so the moment a visitor puts the
  page into Paper the app on the hero is still wearing Glass. This is the same
  home in markup, reading the same tokens as the page around it — so it turns
  with every axis the visitor moves, and it sits ON the wave field rather than
  inside a fake browser window, because the field is the app's own ground.

  ⚠️ AND IT IS NOT A LIE. Every string and number comes from `mockStats`,
  `mockPiles` and `mockWidgets` in `~/data/landing`, which are read off the
  seeded demo workspace the 2026-09 captures were taken from. The captures are
  still on the page — the Looks section shows all three — so the drawing can
  always be checked against the photograph. Nothing here may say something the
  app would not.

  What the LENS changes is exactly what it changes in the app: the line under
  the greeting, which stat tiles are left standing, and which rail widgets
  survive. The three piles do not move, because they do not move in the app.
-->
<script setup lang="ts">
import { computed } from 'vue';
import { mockStats, mockPiles, mockWidgets, type Lens } from '~/data/landing';

const props = defineProps<{ lens: Lens }>();

const stats = computed(() => props.lens.stats.map((k) => ({ key: k, ...mockStats[k]! })));
const widgets = computed(() => props.lens.widgets.map((k) => ({ key: k, ...mockWidgets[k]! })));
</script>

<template>
	<div class="hm" :data-lens="lens.key">
		<div class="hm-main">
			<!-- `aria-live` on the greeting, because the line under it is the one
			     thing on this screen that CHANGES without the page moving — a
			     visitor on a screen reader picking a lens should hear what
			     Earnest now says, not silence. -->
			<div class="hm-greet" aria-live="polite">
				<p class="hm-hello">Welcome back <span class="hm-wave" aria-hidden="true">👋</span></p>
				<!-- The line Earnest writes under the greeting. Keyed on the lens so
				     it cross-fades rather than swapping mid-sentence. -->
				<Transition name="hm-fade" mode="out-in">
					<p :key="lens.key" class="hm-line">
						{{ lens.line ?? '22 things today — 5 need a decision, 13 are one tap each, 4 are just worth knowing.' }}
					</p>
				</Transition>
			</div>

			<TransitionGroup tag="div" name="hm-tile" class="hm-stats">
				<div v-for="s in stats" :key="s.key" class="hm-stat g-glass-thin">
					<span class="hm-stat-k">{{ s.label }}</span>
					<span class="hm-stat-v">{{ s.value }} <em>{{ s.unit }}</em></span>
				</div>
			</TransitionGroup>

			<section v-for="p in mockPiles" :key="p.key" class="hm-pile">
				<header class="hm-pile-head">
					<span class="hm-pile-rule" aria-hidden="true"></span>
					<h3 class="hm-pile-name">{{ p.label }}</h3>
					<span class="hm-pile-count">{{ p.count }}</span>
					<UIcon name="i-lucide-chevron-right" class="hm-pile-more" />
				</header>
				<p class="hm-pile-sub">{{ p.sub }}</p>

				<!-- The stacked edges under each row are the app's own "there are
				     more of these behind this one" cue. Drawn, not faked with a
				     shadow, so they follow the look's border radius. -->
				<div class="hm-stack">
					<div class="hm-row g-glass-thin">
						<span class="hm-row-dot" aria-hidden="true"></span>
						<div class="hm-row-body">
							<p class="hm-row-title">{{ p.title }}</p>
							<p class="hm-row-meta">{{ p.meta }}</p>
						</div>
						<span v-if="p.action === 'approve'" class="hm-row-btn">{{ p.actionLabel }}</span>
						<span v-else-if="p.action === 'status'" class="hm-row-status">
							<span class="hm-row-status-dot" aria-hidden="true"></span>{{ p.actionLabel }}
						</span>
						<UIcon v-else name="i-lucide-arrow-right" class="hm-row-go" />
						<UIcon v-if="p.action === 'approve'" name="i-lucide-x" class="hm-row-x" />
					</div>
					<span class="hm-stack-2" aria-hidden="true"></span>
					<span class="hm-stack-3" aria-hidden="true"></span>
				</div>
			</section>
		</div>

		<!-- The rail. Widgets leave with the lens, so on Projects there is no
		     rail at all — which is the honest thing to draw: the app clears it. -->
		<TransitionGroup tag="aside" name="hm-tile" class="hm-rail">
			<div v-for="w in widgets" :key="w.key" class="hm-widget g-glass">
				<div class="hm-widget-head">
					<span class="hm-widget-title">{{ w.title }}</span>
					<span class="hm-widget-value">{{ w.value }}</span>
				</div>

				<div v-if="w.kind === 'bars'" class="hm-bars">
					<div v-for="r in w.rows" :key="r.label" class="hm-bar-row">
						<span class="hm-bar-label">{{ r.label }}</span>
						<span class="hm-bar-track">
							<span class="hm-bar-fill" :class="{ 'hm-bar-fill--danger': r.tone === 'danger' }" :style="{ width: `${r.pct}%` }"></span>
						</span>
					</div>
				</div>

				<div v-else-if="w.kind === 'chart'" class="hm-chart">
					<span v-for="(b, i) in w.bars" :key="i" class="hm-chart-bar" :style="{ height: `${b}%` }"></span>
					<span class="hm-chart-now">now</span>
				</div>

				<div v-else class="hm-facts">
					<div v-for="r in w.rows" :key="r.label" class="hm-fact">
						<span class="hm-fact-label">{{ r.label }}</span>
						<span class="hm-fact-value">{{ r.value }}</span>
					</div>
				</div>
			</div>
		</TransitionGroup>
	</div>
</template>
