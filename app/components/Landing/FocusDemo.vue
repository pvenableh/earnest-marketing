<!--
  LandingFocusDemo — Focus, working, in the hero.

  The page's first claim is that Earnest answers from the studio's own data
  rather than a blank prompt. A screenshot of Focus shows the door; this shows
  it answering. Four chips, four answers typed out, and under each one the
  "Read" strip: what it consulted before it spoke. That strip is the argument.

  ⚠️ Every answer is in `focusQuestions` in `~/data/landing`, written from the
  seeded demo workspace the September captures were taken from — the same
  $12k out, the same 22 things, the same four cold contacts. Nothing here may
  say something the demo would not.

  The typing is cosmetic and respects `prefers-reduced-motion`, in which case
  the answer simply appears. Both follow-up buttons go to the live demo, which
  is where the real Focus is.
-->
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { focusQuestions } from '~/data/landing';

const config = useRuntimeConfig();
const appUrl = (config.public.appUrl as string) || 'https://app.earnest.guru';
const demoUrl = `${appUrl}/try-demo?persona=solo`;

const active = ref(0);
const current = computed(() => focusQuestions[active.value]!);
const shown = ref('');
const typing = ref(false);
let timer: ReturnType<typeof setTimeout> | null = null;
let reduce = false;

function type(text: string) {
	if (timer) clearTimeout(timer);
	if (reduce) {
		shown.value = text;
		typing.value = false;
		return;
	}
	let n = 0;
	typing.value = true;
	const tick = () => {
		n += 3;
		shown.value = text.slice(0, n);
		if (n < text.length) timer = setTimeout(tick, 14);
		else typing.value = false;
	};
	tick();
}

function pick(i: number) {
	if (i === active.value && shown.value) return;
	active.value = i;
	type(focusQuestions[i]!.a);
}

onMounted(() => {
	reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
	type(current.value.a);
});
onUnmounted(() => {
	if (timer) clearTimeout(timer);
});
</script>

<template>
	<div class="l-focus g-glass" aria-label="Focus, working on sample data">
		<div class="l-focus-top">
			<span class="l-focus-tag">Focus</span>
			<span class="l-focus-where"><UIcon name="i-lucide-target" /> Earnest Demo — Solo</span>
		</div>
		<p class="l-focus-greet">I’m here. No rush.<br />What’s the honest version of how things are right now?</p>

		<div class="l-focus-chips" role="tablist" aria-label="Try a question">
			<button
				v-for="(f, i) in focusQuestions"
				:key="f.q"
				type="button"
				role="tab"
				class="l-focus-chip g-press"
				:class="{ 'l-focus-chip--on': i === active }"
				:aria-selected="i === active"
				@click="pick(i)"
			>
				{{ f.q }}
			</button>
		</div>

		<div class="l-focus-answer" aria-live="polite">
			<span class="l-focus-you">{{ current.q }}</span>
			<p class="l-focus-text">{{ shown }}<span v-if="typing" class="l-focus-cursor" aria-hidden="true"></span></p>
		</div>

		<div class="l-focus-read">
			<span class="l-focus-read-k">Read</span>
			<span v-for="r in current.read" :key="r" class="l-focus-read-v">{{ r }}</span>
		</div>

		<div class="l-focus-actions">
			<a :href="demoUrl" class="e-btn e-btn-primary g-press l-focus-btn">{{ current.actions[0] }}</a>
			<a :href="demoUrl" class="e-btn e-btn-ghost g-press l-focus-btn">{{ current.actions[1] }}</a>
		</div>

		<div class="l-focus-input" aria-hidden="true">
			<span>Tell Earnest what’s on your mind…</span>
			<span class="l-focus-send"><UIcon name="i-lucide-arrow-up" /></span>
		</div>
	</div>
</template>
