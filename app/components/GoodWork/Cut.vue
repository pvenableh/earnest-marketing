<!--
  GoodWork/Cut — a beat's column that plays its cut once, by clock, when it
  comes into view: the ask types, the reply arrives, the card, the tap at
  real speed, the ✓. Then it rests there, whole and tapped. No whips: those
  belong to the montage. The timeline is useCutTimeline's, the montage's own;
  `pace="real"` (the beats over the client photograph) speeds nothing up.

  The server render, a visitor without JS, reduced motion, and a column
  already on screen when the page opens (a deep link, a reload) all get the
  column drawn whole, as before. It never sits half-drawn: a tab hidden
  mid-cut finishes it.
-->
<template>
	<div ref="el" class="gw-cut">
		<GoodWorkColumn :column="column" :waiting="waiting" :frame="frame" />
		<p v-if="stamp" class="gw-cut__stamp" :class="{ in: stampIn }" aria-hidden="true">{{ stamp }}</p>
	</div>
</template>

<script setup lang="ts">
import { columnWaiting, type Column } from '~/data/good-work';
import { planCut, useCutClock, useCutTimeline } from '~/composables/useCutTimeline';

const props = withDefaults(defineProps<{ cut: string; column: Column; stamp?: string; waiting?: number; pace?: 'cut' | 'real' }>(), {
	stamp: undefined,
	pace: 'cut',
	waiting: columnWaiting,
});

const el = ref<HTMLElement | null>(null);
const plan = planCut(props.cut, props.column, props.pace);
/** Null draws the column whole; once armed, the clock draws it. */
const armed = ref(false);
const clock = useCutClock();
const { frame, stampIn, landTap } = useCutTimeline(
	computed(() => (armed.value ? plan : null)),
	clock.lt,
);

function finish() {
	clock.pause();
	clock.lt.value = plan.dur;
	landTap();
}
watch(clock.lt, (l) => {
	if (l >= plan.dur) finish();
});
function onHidden() {
	if (document.hidden && clock.playing.value) finish();
}

let io: IntersectionObserver | null = null;
onMounted(() => {
	const node = el.value;
	if (!node || !('IntersectionObserver' in window) || document.hidden) return;
	if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
	// Already in view (or past it): it stays as it is.
	if (node.getBoundingClientRect().top < innerHeight * 0.75) return;
	armed.value = true;
	io = new IntersectionObserver(
		([e]) => {
			// Most of it in view, or half the screen of it on a short one.
			if (!e || (e.intersectionRatio < 0.6 && e.intersectionRect.height < innerHeight * 0.5)) return;
			io?.disconnect();
			if (document.hidden) finish();
			else clock.play();
		},
		{ threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] },
	);
	io.observe(node);
	document.addEventListener('visibilitychange', onHidden);
});
onBeforeUnmount(() => {
	io?.disconnect();
	document.removeEventListener('visibilitychange', onHidden);
});
</script>
