<!--
  LandingAppearance — the app's Appearance panel, driving the marketing page.

  Four axes, the same four a signed-in user gets: LOOK, PALETTE, TYPE and
  light/dark. Every one of them writes an attribute on the landing's root and
  the whole page turns — nav, headings, cards, buttons, rules, the wave field,
  and the coded home standing in front of it.

  ⚠️ THE PINS ARE THE POINT, NOT AN OVERSIGHT. In Earnest a look is not an
  axis: Paper and Clean each bring their own palette, and Paper brings its own
  display face. So under those looks the Palette row (and, under Paper, the
  Type row) goes quiet and says why. Hiding the rows instead would have been
  tidier and would have misrepresented the system — a buyer deciding whether
  this is a toy or a design system should be able to see where it draws its
  lines. `useLandingAppearance` owns the rule; this file only renders it.

  Two shapes off one control: `panel` for the Looks section, `compact` for the
  nav popover. They share state through `useState`, so moving one moves both.
-->
<script setup lang="ts">
import {
	useLandingAppearance,
	LANDING_LOOKS,
	LANDING_PALETTES,
	LANDING_TYPES,
} from '~/composables/useLandingAppearance';

withDefaults(defineProps<{ variant?: 'panel' | 'compact' }>(), { variant: 'panel' });

const { look, effectivePalette, effectiveType, isDark, pins, setLook, setPalette, setType, toggleTheme } =
	useLandingAppearance();

const hintFor = (opts: { key: string; hint: string }[], key: string) => opts.find((o) => o.key === key)?.hint ?? '';
</script>

<template>
	<div class="l-ap" :class="`l-ap--${variant}`">
		<div class="l-ap-row">
			<span class="l-ap-key">Look</span>
			<div class="l-ap-seg" role="radiogroup" aria-label="Look">
				<button
					v-for="o in LANDING_LOOKS"
					:key="o.key"
					type="button"
					role="radio"
					class="l-ap-opt"
					:class="{ 'l-ap-opt--on': look === o.key }"
					:aria-checked="look === o.key"
					@click="setLook(o.key)"
				>
					{{ o.label }}
				</button>
			</div>
			<p v-if="variant === 'panel'" class="l-ap-hint">{{ hintFor(LANDING_LOOKS, look) }}</p>
		</div>

		<div class="l-ap-row" :class="{ 'l-ap-row--pinned': pins.palette }">
			<span class="l-ap-key">Palette</span>
			<div class="l-ap-seg" role="radiogroup" aria-label="Palette">
				<button
					v-for="o in LANDING_PALETTES"
					:key="o.key"
					type="button"
					role="radio"
					class="l-ap-opt"
					:class="{ 'l-ap-opt--on': !pins.palette && effectivePalette === o.key }"
					:aria-checked="!pins.palette && effectivePalette === o.key"
					:disabled="!!pins.palette"
					@click="setPalette(o.key)"
				>
					<span class="l-ap-swatch" :data-palette="o.key" aria-hidden="true"></span>{{ o.label }}
				</button>
			</div>
			<p v-if="variant === 'panel'" class="l-ap-hint">
				<template v-if="pins.palette"><UIcon name="i-lucide-lock" class="l-ap-lock" />{{ pins.palette }}</template>
				<template v-else>{{ hintFor(LANDING_PALETTES, effectivePalette) }}</template>
			</p>
		</div>

		<div class="l-ap-row" :class="{ 'l-ap-row--pinned': pins.type }">
			<span class="l-ap-key">Type</span>
			<div class="l-ap-seg" role="radiogroup" aria-label="Type">
				<button
					v-for="o in LANDING_TYPES"
					:key="o.key"
					type="button"
					role="radio"
					class="l-ap-opt"
					:class="{ 'l-ap-opt--on': !pins.type && effectiveType === o.key }"
					:aria-checked="!pins.type && effectiveType === o.key"
					:disabled="!!pins.type"
					@click="setType(o.key)"
				>
					{{ o.label }}
				</button>
			</div>
			<p v-if="variant === 'panel'" class="l-ap-hint">
				<template v-if="pins.type"><UIcon name="i-lucide-lock" class="l-ap-lock" />{{ pins.type }}</template>
				<template v-else>{{ hintFor(LANDING_TYPES, effectiveType) }}</template>
			</p>
		</div>

		<div class="l-ap-row">
			<span class="l-ap-key">Mode</span>
			<div class="l-ap-seg" role="radiogroup" aria-label="Mode">
				<ClientOnly>
					<button
						type="button"
						role="radio"
						class="l-ap-opt"
						:class="{ 'l-ap-opt--on': !isDark }"
						:aria-checked="!isDark"
						@click="isDark && toggleTheme()"
					>
						<UIcon name="i-lucide-sun" />Light
					</button>
					<button
						type="button"
						role="radio"
						class="l-ap-opt"
						:class="{ 'l-ap-opt--on': isDark }"
						:aria-checked="isDark"
						@click="!isDark && toggleTheme()"
					>
						<UIcon name="i-lucide-moon" />Dark
					</button>
					<template #fallback>
						<span class="l-ap-opt l-ap-opt--on"><UIcon name="i-lucide-moon" />Dark</span>
					</template>
				</ClientOnly>
			</div>
			<p v-if="variant === 'panel'" class="l-ap-hint">
				Light and dark are their own axis — every look ships both, and every pair is graded.
			</p>
		</div>
	</div>
</template>
