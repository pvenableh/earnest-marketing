<!--
  GoodWork/HeroLoop — over the office loop, beside "Move fast. Mean it.":
  one column cycling four of the montage's cuts on the beat, by clock. Each
  is an ask, Earnest's draft (sped up) and your tap at real speed, with the
  room slowed under it and the ✓ after. The timeline is useCutTimeline's.

  From 901px up only. A phone keeps the hero as it was: the column would push
  the CTAs and the plain "what is this" paragraph (Google's OAuth review
  reads it) below the fold at 390px. It pauses off screen and in a hidden
  tab. The server render and reduced motion get the first cut's column,
  still and whole. Decorative: the hero's own copy says what it shows.
-->
<template>
	<div ref="el" class="gw-loop" :class="{ hold: tapping }" aria-hidden="true">
		<div class="gw-loop__top">
			<span v-html="dotted(cur.c.verb)"></span>
			<span class="gw-loop__rt">Real time · your tap</span>
		</div>
		<div :key="cur.c.id" class="gw-cut gw-loop__cut" :class="{ whip: cycled }">
			<GoodWorkColumn :column="cur.c.column" :waiting="cur.c.waiting" :frame="frame" />
			<p class="gw-cut__stamp" :class="{ in: stampIn }">{{ cur.c.stamp }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { montage } from '~/data/good-work';
import { BEAT, planCut, useCutClock, useCutTimeline } from '~/composables/useCutTimeline';

/* Four of the montage's cuts, each ending on a tap. */
const cuts = montage
	.filter((c) => c.column.card)
	.slice(0, 4)
	.map((c) => ({ c, plan: planCut(`hero-${c.id}`, c.column) }));
/** After the ✓, four beats to read it before the next cut. */
const REST = 4 * BEAT;

const el = ref<HTMLElement | null>(null);
const i = ref(0);
const cur = computed(() => cuts[i.value]!);
/** Off until it first plays: the column is drawn whole until then. */
const armed = ref(false);
/** Past the first cut: from here each new one whips in. */
const cycled = ref(false);
const clock = useCutClock();
const { frame, stampIn, tapping } = useCutTimeline(
	computed(() => (armed.value ? cur.value.plan : null)),
	clock.lt,
);

watch(clock.lt, (l) => {
	if (l < cur.value.plan.dur + REST) return;
	i.value = (i.value + 1) % cuts.length;
	cycled.value = true;
	clock.lt.value = 0;
});

/** "Say it. Tap it." → each full stop in the accent. */
function dotted(s: string) {
	return s.replace(/\./g, '<span class="dot">.</span>') + (s.endsWith('.') ? '' : '<span class="dot">.</span>');
}

/* The room all but stops under your tap, as in the montage. */
let heroVideo: HTMLVideoElement | null = null;
watch(tapping, (t) => {
	try {
		if (heroVideo) heroVideo.playbackRate = t ? 0.08 : 1;
	} catch {}
});

/* Plays only while it is wide enough to show, on screen, in a visible tab. */
const inView = ref(false);
const wide = ref(false);
const shown = ref(false);
function sync() {
	if (inView.value && wide.value && shown.value) {
		armed.value = true;
		clock.play();
	} else clock.pause();
}
watch([inView, wide, shown], sync);

let io: IntersectionObserver | null = null;
let mq: MediaQueryList | null = null;
const onWide = () => (wide.value = !!mq?.matches);
const onVis = () => (shown.value = !document.hidden);
onMounted(() => {
	if (!el.value || !('IntersectionObserver' in window)) return;
	if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
	heroVideo = el.value.closest('.gw-hero')?.querySelector('video') ?? null;
	mq = matchMedia('(min-width: 901px)');
	mq.addEventListener('change', onWide);
	onWide();
	document.addEventListener('visibilitychange', onVis);
	onVis();
	io = new IntersectionObserver(([e]) => (inView.value = !!e?.isIntersecting), { threshold: 0.3 });
	io.observe(el.value);
});
onBeforeUnmount(() => {
	io?.disconnect();
	mq?.removeEventListener('change', onWide);
	document.removeEventListener('visibilitychange', onVis);
});
</script>
