<!--
  GoodWork/Scrub — the app, scrubbed by scroll (Apple's iPhone-page move): a
  sticky stage, one JPEG frame per scroll step drawn to a canvas, and
  captions that follow the progress. Ported from the mockup's `motion.js`.

  ⚠️ Not rendered today — `appSequence` in `data/good-work.ts` is null until
  the frames are re-recorded (that file says why). Set it and this renders.

  Fast by construction: nothing is fetched until the section is a viewport
  away, frames then load in order behind the first, and under reduced
  motion it loads the last frame alone and shows every caption.
-->
<template>
	<section ref="sec" class="gw-scrub" aria-label="The app, as you scroll">
		<div class="gw-scrub__sticky">
			<div class="gw-scrub__caps">
				<p v-for="(c, i) in captions" :key="i" class="gw-scrub__cap" :class="{ on: still || i === capOn }">
					<b>{{ c.title }}</b><span>{{ c.text }}</span><small>{{ c.where }}</small>
				</p>
			</div>
			<div ref="stage" class="gw-scrub__stage">
				<canvas ref="cv" aria-label="Earnest, recorded from the live demo"></canvas>
			</div>
			<p class="gw-scrub__hint" :class="{ off: done }">Keep scrolling</p>
		</div>
	</section>
</template>

<script setup lang="ts">
const props = defineProps<{
	/** A path with `{n}` for the frame number, e.g. `/app-seq/f-{n}.jpg`. */
	frames: string;
	count: number;
	pad?: number;
	captions: { at: number; title: string; text: string; where: string }[];
}>();

const sec = ref<HTMLElement | null>(null);
const stage = ref<HTMLElement | null>(null);
const cv = ref<HTMLCanvasElement | null>(null);
const capOn = ref(0);
const done = ref(false);
const still = ref(false);

let imgs: HTMLImageElement[] = [];
let cur = -1;
let want = 0;
let raf = 0;
let io: IntersectionObserver | null = null;
const off: (() => void)[] = [];

function src(i: number) {
	return props.frames.replace('{n}', String(i + 1).padStart(props.pad ?? 3, '0'));
}
function ready(im?: HTMLImageElement) {
	return !!im && im.complete && im.naturalWidth > 0;
}

function draw(i: number) {
	const c = cv.value;
	if (!c) return;
	let im: HTMLImageElement | undefined = imgs[i];
	if (!ready(im)) {
		im = undefined;
		for (let k = 1; k < props.count && !im; k++) {
			if (ready(imgs[i - k])) im = imgs[i - k];
			else if (ready(imgs[i + k])) im = imgs[i + k];
		}
	}
	if (!im || i === cur) return;
	cur = i;
	const ctx = c.getContext('2d');
	if (!ctx) return;
	const W = c.width;
	const H = c.height;
	const s = Math.max(W / im.naturalWidth, H / im.naturalHeight);
	const w = im.naturalWidth * s;
	const h = im.naturalHeight * s;
	ctx.clearRect(0, 0, W, H);
	ctx.drawImage(im, (W - w) / 2, (H - h) / 2, w, h);
}

function size() {
	const c = cv.value;
	const r = stage.value?.getBoundingClientRect();
	if (!c || !r) return;
	const d = Math.min(devicePixelRatio || 1, 2);
	c.width = Math.round(r.width * d);
	c.height = Math.round(r.height * d);
	cur = -1;
	draw(want);
}

function tick() {
	raf = 0;
	const r = sec.value?.getBoundingClientRect();
	if (!r) return;
	const total = r.height - innerHeight;
	const p = total <= 0 ? 1 : Math.min(1, Math.max(0, -r.top / total));
	want = Math.round(p * (props.count - 1));
	draw(want);
	let on = 0;
	props.captions.forEach((c, i) => {
		if (p >= c.at) on = i;
	});
	capOn.value = on;
	done.value = p > 0.9;
}
function onScroll() {
	if (!raf) raf = requestAnimationFrame(tick);
}

/** First frame now, the rest in order, each redrawing if it is the one wanted. */
function load() {
	imgs = Array.from({ length: props.count }, () => new Image());
	const land = (i: number) => () => {
		if (i === want || cur < 0) {
			cur = -1;
			draw(want);
		}
	};
	if (still.value) {
		want = props.count - 1;
		imgs[want]!.onload = land(want);
		imgs[want]!.src = src(want);
		return;
	}
	let q = 0;
	const next = () => {
		if (q >= props.count) return;
		const i = q++;
		const im = imgs[i]!;
		im.decoding = 'async';
		im.onload = () => {
			land(i)();
			next();
		};
		im.onerror = next;
		im.src = src(i);
	};
	// Three requests in flight, so the sequence fills quickly without a burst of a hundred.
	next();
	next();
	next();
}

onMounted(() => {
	still.value = matchMedia('(prefers-reduced-motion: reduce)').matches;
	size();
	addEventListener('resize', size);
	off.push(() => removeEventListener('resize', size));
	if (!still.value) {
		addEventListener('scroll', onScroll, { passive: true });
		off.push(() => removeEventListener('scroll', onScroll));
		tick();
	}
	io = new IntersectionObserver(
		(entries) => {
			if (entries.some((e) => e.isIntersecting)) {
				io?.disconnect();
				load();
			}
		},
		{ rootMargin: '100% 0px' },
	);
	if (sec.value) io.observe(sec.value);
});
onBeforeUnmount(() => {
	io?.disconnect();
	cancelAnimationFrame(raf);
	off.forEach((f) => f());
	imgs.forEach((im) => (im.onload = im.onerror = null));
});
</script>
