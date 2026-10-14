<!--
  GoodWork/Montage — "Move fast." on the homepage: the animatic's montage
  (mockups/2026-10-move-fast/move-fast.html) as a pinned section that scroll
  plays. Five cuts, each one column (GoodWork/Column.vue, the claim map's
  data), then "Move fast." over the five ✓ receipts. It took the parked app
  scrub's place.

  The engine is the animatic's: one clock `t` (ms), and the stage is a pure
  function of it. Here scroll sets `t`, through a map that spends extra
  scroll on each tap, so the frame holds there. The tap itself never follows
  the scroll: once `t` reaches it, it plays on a real clock, 400ms, with the
  footage slowed nearly to still. Earnest's half is sped up; yours never is.
  Each cut's plan, its frame and the tap come from useCutTimeline, which the
  beat columns and the hero loop play too; this file owns the scroll map.

  The server render, a visitor without JS and reduced motion all get the
  still version: the five verbs with what really happened, beside the last
  column whole. Never an empty pinned box.
-->
<template>
	<section ref="sec" class="gw-montage" :class="{ 'is-live': live, hold: tapping }" aria-labelledby="gw-montage-h">
		<h2 id="gw-montage-h" class="gw-sr">Move fast: five things Earnest drafted, each waiting for a tap</h2>

		<!-- Still: the server render, no JS, reduced motion. -->
		<div v-if="!live" class="gw-montage__still gw-wrap">
			<div class="gw-montage__list">
				<p class="gw-montage__fast">Move fast<span class="dot">.</span></p>
				<ol>
					<li v-for="c in montage" :key="c.id">
						<b>{{ c.verb }}</b><span>{{ c.stamp }}</span>
					</li>
				</ol>
			</div>
			<GoodWorkColumn :column="last.column" :waiting="last.waiting" />
		</div>

		<!-- Live: pinned, played by scroll. The list above is what a screen reader gets. -->
		<template v-else>
			<ol class="gw-sr">
				<li v-for="c in montage" :key="c.id">{{ c.verb }}. {{ c.stamp }}</li>
			</ol>
			<div class="gw-montage__sticky" aria-hidden="true">
				<div class="gw-montage__bg">
					<img :src="photos.hero.small ?? photos.hero.src ?? ''" alt="" decoding="async" />
					<video v-if="photos.hero.video && !saveData" ref="vid" muted loop playsinline preload="none" :class="{ on: vidOn }" @playing="vidOn = true">
						<source :src="photos.hero.video" type="video/mp4" />
					</video>
				</div>
				<span class="gw-montage__rt">Real time · your tap</span>

				<div v-if="cut" :key="cut.c.id" class="gw-montage__cut">
					<p class="gw-montage__word">
						<span v-html="dotted(cut.c.verb)"></span><small>{{ cut.c.small }}</small>
					</p>
					<div class="gw-montage__colwrap">
						<GoodWorkColumn :column="cut.c.column" :waiting="cut.c.waiting" :frame="frame" />
						<p class="gw-montage__stamp" :class="{ in: stampIn }">{{ cut.c.stamp }}</p>
					</div>
				</div>
				<div v-else class="gw-montage__end">
					<p class="gw-montage__fast gw-at" :class="{ in: endT >= 80 }">Move fast<span class="dot">.</span></p>
					<p class="gw-montage__receipts">
						<span v-for="(c, i) in montage" :key="c.id" class="gw-at" :class="{ in: endT >= 500 + i * 90 }">{{ c.receipt }}</span>
					</p>
				</div>
				<p class="gw-montage__hint" :class="{ off: t > 600 }">Keep scrolling</p>
			</div>
		</template>
	</section>
</template>

<script setup lang="ts">
import { montage, photos, type MontageCut } from '~/data/good-work';
import { HOLD, planCut, useCutTimeline, type CutPlan } from '~/composables/useCutTimeline';

const last = montage[montage.length - 1]!;

/* ── The timeline (ms), as in the animatic: one cut after another, each
   planned by useCutTimeline (every time inside a cut is local to it), then
   the end on "Move fast.". ── */
const END = 2500;
type Plan = CutPlan & { c: MontageCut; start: number };
const plans: Plan[] = [];
{
	let start = 0;
	for (const c of montage) {
		const p = planCut(c.id, c.column);
		plans.push({ ...p, c, start });
		start += p.dur;
	}
}
const CUTS_END = plans.reduce((n, p) => n + p.dur, 0);
const DUR = CUTS_END + END;

/* Scroll → t. Each segment is [t0, t1, scroll length]; a tap's segment gets
   more scroll than its milliseconds, so the frame holds while it plays, and
   the end rests a while on "Move fast." before the page moves on. */
const segs: [number, number, number][] = [];
{
	let t0 = 0;
	for (const p of plans) {
		if (p.tap != null) {
			const a = p.start + p.tap - 150;
			const b = p.start + p.tap + HOLD + 250;
			segs.push([t0, a, a - t0], [a, b, (b - a) * 2.5]);
			t0 = b;
		}
		const end = p.start + p.dur;
		segs.push([t0, end, end - t0]);
		t0 = end;
	}
	segs.push([t0, DUR, DUR - t0], [DUR, DUR, 1600]);
}
const SCROLL = segs.reduce((n, s) => n + s[2], 0);
function timeAt(p: number) {
	let d = p * SCROLL;
	for (const [a, b, len] of segs) {
		if (d <= len) return a + (b - a) * (len ? d / len : 1);
		d -= len;
	}
	return DUR;
}

const clamp = (v: number) => Math.max(0, Math.min(1, v));

const sec = ref<HTMLElement | null>(null);
const vid = ref<HTMLVideoElement | null>(null);
const live = ref(false);
const saveData = ref(false);
const vidOn = ref(false);
const t = ref(0);

const cut = computed(() => plans.find((p) => t.value >= p.start && t.value < p.start + p.dur) ?? null);
const lt = computed(() => (cut.value ? t.value - cut.value.start : 0));
const endT = computed(() => t.value - CUTS_END);

/* The tap plays on its own clock, whatever the scroll does. */
const { tapping, frame, stampIn } = useCutTimeline(cut, lt);

/** "Say it. Tap it." → each full stop in the accent. */
function dotted(s: string) {
	return s.replace(/\./g, '<span class="dot">.</span>') + (s.endsWith('.') ? '' : '<span class="dot">.</span>');
}

/* The footage: fast through the cuts, faster at "Move fast.", nearly still under a tap. */
const rate = computed(() => (tapping.value ? 0.08 : t.value >= CUTS_END ? 3 : 2.5));
function applyRate() {
	try {
		if (vid.value) vid.value.playbackRate = rate.value;
	} catch {}
}
watch(rate, applyRate);

let raf = 0;
let io: IntersectionObserver | null = null;
function tick() {
	raf = 0;
	const el = sec.value;
	if (!el) return;
	const r = el.getBoundingClientRect();
	const total = r.height - innerHeight;
	t.value = timeAt(total <= 0 ? 1 : clamp(-r.top / total));
}
function onScroll() {
	if (!raf) raf = requestAnimationFrame(tick);
}

onMounted(async () => {
	if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
	saveData.value = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
	live.value = true;
	await nextTick();
	addEventListener('scroll', onScroll, { passive: true });
	addEventListener('resize', onScroll, { passive: true });
	tick();
	if (sec.value && 'IntersectionObserver' in window) {
		io = new IntersectionObserver(
			([e]) => {
				const v = vid.value;
				if (!v) return;
				if (e?.isIntersecting) {
					if (v.preload === 'none') v.preload = 'auto';
					v.play().then(applyRate, () => {});
				} else v.pause();
			},
			{ rootMargin: '200px 0px' },
		);
		io.observe(sec.value);
	}
});
onBeforeUnmount(() => {
	removeEventListener('scroll', onScroll);
	removeEventListener('resize', onScroll);
	cancelAnimationFrame(raf);
	io?.disconnect();
});
</script>
