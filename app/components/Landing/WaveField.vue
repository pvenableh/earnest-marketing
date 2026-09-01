<!--
  LandingWaveField — the app's ambient wave field, on the marketing hero.

  A port of `app/components/Home/AmbientBackground.vue` from the Earnest app
  repo (the `waves` variant only — the orbs variant and the ambient switcher
  stay in the app). Every number below is carried over unchanged: the depth
  ladder in PLANES, the sampling in wavePath, the four-stop ramp in bodyStops,
  and the four tweens per band in startWaves. This is the field the hero
  screenshot is standing in front of, so it has to be the same field.

  THREE THINGS ARE DIFFERENT, and only three:

   1. POSITION. The app pins this behind a scrolling home; here it lives inside
      the hero, so the root is `position: absolute` and the hero is the
      containing block.

   2. COLOUR SOURCE. The app draws each band from a semantic token
      (`--primary`, `--tag-1`…`--tag-5`). Those don't exist here, so each band
      reads `--wave-1`…`--wave-5` — HSL triples on the marketing ramp
      (sellsheet-glass.css) rather than the app palette. `--ambient-hue`
      still overrides all five with one hue, which is how a lens re-tints the
      whole field in one line.

   3. STRENGTH. The app's 0.82 / 0.88 pair is tuned against its own grounds.
      Kept as-is: the crest floor it documents (far crests at 0.155–0.165
      compose to ~0.13, and the NEAR crest is what carries the read) is the
      same arithmetic here.

  ⚠️ The crest line is what makes this read as waves rather than fog. It is
  stroked with `vector-effect="non-scaling-stroke"` because the viewBox is
  stretched with `preserveAspectRatio="none"` — without it the same line is a
  hairline on the flats and fat on the slopes.
-->
<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch, useId } from 'vue';

const props = withDefaults(
	defineProps<{
		/**
		 * One HSL triple ("142 72% 46%") that overrides every band's own
		 * colour — how a lens re-tints the field. `null` restores the ramp.
		 */
		tint?: string | null;
	}>(),
	{ tint: null },
);

/** The stretched viewBox both the paths and the swell origin are measured in. */
const VB_W = 1200;
const VB_H = 400;

interface Harmonic {
	mult: number;
	weight: number;
	phase: number;
}

interface WaveSpec {
	period: number;
	amp: number;
	mid: number;
	span: number;
	dur: number;
	bob: number;
	dir: number;
	color: string;
	alpha: number;
	crest: number;
	weight: number;
	swell: number;
	swellDur: number;
	fade: number;
	fadeDur: number;
	harmonics: Harmonic[];
}

interface DepthPlane {
	key: string;
	blur: number;
	drift: number;
	driftDur: number;
	waves: WaveSpec[];
}

/**
 * Three planes, five bands, one depth ladder. Six properties move together
 * from far to near and they have to move TOGETHER — invert the first three on
 * their own and the field flattens into fog no matter how it is coloured:
 *
 *   period    320 →  980   (wavelength opens up as the water comes at you)
 *   amp         7 →   20   (so does crest height)
 *   dur        56 →   27   (…and it crosses the frame faster)
 *   blur        6 →  1.2   (…and its edge gets legible)
 *   crest    0.17 → 0.27   (…and its line gets brighter)
 *   weight      1 →    2   (…and heavier)
 */
const PLANES: DepthPlane[] = [
	{
		key: 'far',
		// A crest line is 1px wide and blur is measured in SCREEN px, so past
		// ~8px this stops softening the line and starts deleting it. Depth on
		// this plane is carried by tightness, dimness and line weight instead.
		blur: 6,
		drift: 2,
		driftDur: 44,
		waves: [
			{
				period: 320,
				amp: 7,
				mid: 121,
				span: 230,
				dur: 56,
				bob: 3,
				dir: -1,
				color: 'var(--wave-1)',
				alpha: 0.095,
				crest: 0.165,
				weight: 1,
				swell: 1.08,
				swellDur: 31,
				fade: 0.72,
				fadeDur: 24,
				harmonics: [
					{ mult: 1, weight: 1, phase: 0 },
					{ mult: 2, weight: 0.24, phase: 1.15 },
					{ mult: 3, weight: 0.1, phase: 2.6 },
				],
			},
			{
				period: 420,
				amp: 9,
				mid: 137,
				span: 222,
				dur: 48,
				bob: 4,
				dir: 1,
				color: 'var(--wave-2)',
				alpha: 0.09,
				crest: 0.155,
				weight: 1.05,
				swell: 1.09,
				swellDur: 27,
				fade: 0.74,
				fadeDur: 29,
				harmonics: [
					{ mult: 1, weight: 1, phase: 2.7 },
					{ mult: 2, weight: 0.26, phase: 0.9 },
					{ mult: 3, weight: 0.09, phase: 1.9 },
				],
			},
		],
	},
	{
		key: 'mid',
		blur: 3,
		drift: -1.8,
		driftDur: 35,
		waves: [
			{
				period: 560,
				amp: 13,
				mid: 154,
				span: 215,
				dur: 40,
				bob: 5,
				dir: -1,
				color: 'var(--wave-3)',
				alpha: 0.1,
				crest: 0.21,
				weight: 1.35,
				swell: 1.08,
				swellDur: 23,
				fade: 0.76,
				fadeDur: 19,
				harmonics: [
					{ mult: 1, weight: 1, phase: 2.1 },
					{ mult: 2, weight: 0.24, phase: 0.4 },
					{ mult: 3, weight: 0.1, phase: 3.1 },
				],
			},
			{
				period: 760,
				amp: 16,
				mid: 170,
				span: 208,
				dur: 33,
				bob: 6,
				dir: 1,
				color: 'var(--wave-4)',
				alpha: 0.095,
				crest: 0.2,
				weight: 1.45,
				swell: 1.07,
				swellDur: 26,
				fade: 0.74,
				fadeDur: 31,
				harmonics: [
					{ mult: 1, weight: 1, phase: 0.8 },
					{ mult: 2, weight: 0.2, phase: 1.7 },
					{ mult: 3, weight: 0.09, phase: 0.5 },
				],
			},
		],
	},
	{
		key: 'near',
		// Barely a blur — just enough to take the aliasing off a 2px line on a
		// squashed viewBox. This is the plane you are meant to read, and one
		// band is enough: it is the front of the swell, not a layer.
		blur: 1.2,
		drift: 1.4,
		driftDur: 27,
		waves: [
			{
				period: 980,
				amp: 20,
				mid: 188,
				span: 200,
				dur: 27,
				bob: 7,
				dir: -1,
				color: 'var(--wave-5)',
				alpha: 0.11,
				crest: 0.27,
				weight: 2,
				swell: 1.06,
				swellDur: 18,
				fade: 0.8,
				fadeDur: 22,
				harmonics: [
					{ mult: 1, weight: 1, phase: 1.4 },
					{ mult: 2, weight: 0.22, phase: 2.2 },
					{ mult: 3, weight: 0.08, phase: 0.2 },
				],
			},
		],
	},
];

/**
 * One band as TWO paths over one sampled polyline: `bodyD` closed far below
 * the frame and filled, `crestD` left open and stroked. The line spans a whole
 * number of periods and carries a full period of slack on the left, so the
 * band stays covered whichever way it drifts. 48 samples per period resolves
 * the harmonics without visible faceting.
 *
 * ⚠️ The body is filled to `VB_H * 2`, well below the frame, because the swell
 * scales each band about its own midline and a band bottoming out at the frame
 * edge would lift off it and show bare ground. That only works because the
 * gradient is pinned to USER SPACE (see the template): an SVG linearGradient
 * defaults to `objectBoundingBox` and would be stretched over that whole
 * depth, dragging every peak stop off the bottom of the screen.
 */
function wavePath(spec: WaveSpec): { bodyD: string; crestD: string } {
	const repeats = Math.ceil(VB_W / spec.period) + 2;
	const startX = -spec.period;
	const endX = startX + spec.period * repeats;
	const step = spec.period / 48;
	const k = (2 * Math.PI) / spec.period;
	const norm = spec.harmonics.reduce((s, h) => s + h.weight, 0);
	const floor = VB_H * 2;

	const y = (x: number) => {
		let v = 0;
		for (const h of spec.harmonics) v += h.weight * Math.sin(h.mult * k * x + h.phase);
		return spec.mid + (spec.amp * v) / norm;
	};

	let crestD = `M${startX.toFixed(2)},${y(startX).toFixed(2)}`;
	for (let x = startX + step; x <= endX + 0.01; x += step) crestD += ` L${x.toFixed(2)},${y(x).toFixed(2)}`;

	return { crestD, bodyD: `${crestD} L${endX.toFixed(2)},${floor} L${startX.toFixed(2)},${floor} Z` };
}

/**
 * Stops for one band's body, as offsets down its `span` from its highest
 * crest. Full alpha at the top and decay only, so the band hangs off its own
 * crest line rather than floating as a ribbon with no edge.
 *
 * The `hold` plateau is why there are four stops: the line sinks a full
 * `2 × amp` into its troughs, and without a plateau that deep a trough would
 * start its fill already half-faded and the band would strobe along its length
 * as it travelled.
 */
function bodyStops(w: WaveSpec) {
	const hold = Math.min(0.42, (2 * w.amp) / w.span);

	return [
		{ offset: 0, alpha: w.alpha },
		{ offset: hold, alpha: w.alpha * 0.92 },
		// The shoulder — early (22% of what is left) and down to under a
		// quarter alpha. That is what buys the long thin run below without the
		// mid-field getting heavier.
		{ offset: hold + (1 - hold) * 0.22, alpha: w.alpha * 0.24 },
		{ offset: 1, alpha: 0 },
	];
}

const wavePlanes = computed(() =>
	PLANES.map((plane) => ({
		...plane,
		waves: plane.waves.map((w) => ({ ...w, ...wavePath(w), stops: bodyStops(w) })),
	})),
);

const flatWaves = computed(() => wavePlanes.value.flatMap((p) => p.waves));

// Gradient ids must be unique per instance or a second mount steals the fill.
const uid = useId();
const gradId = (i: number) => `mkt-wave-${uid}-${i}`;

// ── Motion ───────────────────────────────────────────────────────────────────
const root = ref<HTMLElement | null>(null);
let tweens: any[] = [];
let observer: IntersectionObserver | null = null;
let onScreen = true;
let reduce = false;

function killTweens() {
	for (const t of tweens) t.kill();
	tweens = [];
}

async function startWaves() {
	const { gsap } = await import('gsap');
	const planeEls = root.value?.querySelectorAll<HTMLElement>('.mkt-wave__plane');
	const bands = root.value?.querySelectorAll<SVGGElement>('.mkt-wave__band');
	if (!bands?.length) return;

	// Plane parallax: each depth slides on its own long cycle, so the planes
	// move over one another rather than as a block. That is the cue that
	// separates them once the blur has already put them at depth.
	planeEls?.forEach((plane, i) => {
		const spec = PLANES[i % PLANES.length]!;
		tweens.push(
			gsap.to(plane, { yPercent: spec.drift, duration: spec.driftDur, ease: 'sine.inOut', repeat: -1, yoyo: true }),
		);
	});

	const specs = flatWaves.value;

	bands.forEach((band, i) => {
		const spec = specs[i % specs.length]!;

		// Slide exactly one period, forever. The seam lands on an identical
		// crest so the loop is invisible — `ease: none` is required, since any
		// easing would visibly stall at the wrap. Direction alternates per
		// band, which is what stops the field reading as one conveyor.
		tweens.push(
			gsap.fromTo(band, { x: 0 }, { x: spec.dir * spec.period, duration: spec.dur, ease: 'none', repeat: -1 }),
		);
		tweens.push(gsap.to(band, { y: spec.bob, duration: spec.dur * 0.7, ease: 'sine.inOut', repeat: -1, yoyo: true }));

		// Swell + breath ride the INNER group: the swell needs its origin
		// pinned to the band's own midline, and the translate needs none.
		//
		// ⚠️ The swell only ever scales UP from 1. Scaling below 1 about the
		// midline would raise the filled body off the bottom of the frame and
		// open a seam of bare ground under it.
		const swell = band.querySelector<SVGGElement>('.mkt-wave__swell');
		if (!swell) return;

		tweens.push(
			gsap.to(swell, {
				scaleY: spec.swell,
				duration: spec.swellDur,
				ease: 'sine.inOut',
				repeat: -1,
				yoyo: true,
				svgOrigin: `${VB_W / 2} ${spec.mid}`,
			}),
			gsap.fromTo(
				swell,
				{ opacity: 1 },
				{ opacity: spec.fade, duration: spec.fadeDur, ease: 'sine.inOut', repeat: -1, yoyo: true },
			),
		);
	});

	if (!onScreen) for (const t of tweens) t.pause();
}

onMounted(async () => {
	reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
	// Reduced motion keeps the field — it is a static seascape, which is the
	// point of the section — and simply never animates it.
	if (reduce) return;

	// Scrolled past, the field is doing five looping tweens nobody can see.
	if (root.value && 'IntersectionObserver' in window) {
		observer = new IntersectionObserver(([entry]) => {
			onScreen = !!entry?.isIntersecting;
			for (const t of tweens) if (onScreen) t.play(); else t.pause();
		});
		observer.observe(root.value);
	}

	await startWaves();
});

onBeforeUnmount(() => {
	observer?.disconnect();
	killTweens();
});

// A lens change re-tints in place — nothing is re-created, so the tweens are
// untouched and the water does not jump.
watch(
	() => props.tint,
	() => {
		/* the tint is a CSS variable; the watcher exists only to document that. */
	},
);
</script>

<template>
	<div
		ref="root"
		class="mkt-wave"
		:style="tint ? { '--ambient-hue': tint } : undefined"
		aria-hidden="true"
	>
		<!-- One <svg> per depth plane: a single shared <svg> can carry only one
		     blur radius, and per-plane blur IS the depth effect. The plane is a
		     DIV rather than the <svg> itself because GSAP's transforms on an
		     <svg> root are not reliable across engines. -->
		<div
			v-for="(plane, p) in wavePlanes"
			:key="plane.key"
			class="mkt-wave__plane"
			:class="`mkt-wave__plane--${plane.key}`"
			:style="{ '--plane-blur': `${plane.blur}px` }"
		>
			<svg class="mkt-wave__svg" :viewBox="`0 0 ${VB_W} ${VB_H}`" preserveAspectRatio="none" focusable="false">
				<defs>
					<!-- ⚠️⚠️ `userSpaceOnUse`, NOT the default `objectBoundingBox`.
					     The band's body is filled far below the frame so the swell
					     cannot expose bare ground under it, and a bounding-box
					     gradient gets stretched over that whole depth — which puts
					     every peak stop off the bottom of the screen and makes the
					     field invisible with nothing in the CSS looking wrong.
					     Anchored here to the band's own highest crest over its own
					     `span`. x1 = x2 = 0 keeps it purely vertical, which is what
					     lets the horizontal loop translate a band without the paint
					     sliding under it. -->
					<linearGradient
						v-for="(w, i) in plane.waves"
						:id="gradId(p * 10 + i)"
						:key="i"
						gradientUnits="userSpaceOnUse"
						x1="0"
						:y1="w.mid - w.amp"
						x2="0"
						:y2="w.mid - w.amp + w.span"
					>
						<stop
							v-for="(s, si) in w.stops"
							:key="si"
							:offset="`${(s.offset * 100).toFixed(2)}%`"
							:stop-color="`hsl(var(--ambient-hue, ${w.color}))`"
							:stop-opacity="s.alpha"
						/>
					</linearGradient>
				</defs>
				<!-- Outer group translates + bobs; inner group swells + breathes.
				     The crest is stroked AFTER the body so the line always sits on
				     top of its own water. -->
				<g v-for="(w, i) in plane.waves" :key="i" class="mkt-wave__band">
					<g class="mkt-wave__swell">
						<path :d="w.bodyD" :fill="`url(#${gradId(p * 10 + i)})`" />
						<path
							:d="w.crestD"
							fill="none"
							vector-effect="non-scaling-stroke"
							:stroke="`hsl(var(--ambient-hue, ${w.color}))`"
							:stroke-opacity="w.crest"
							:stroke-width="w.weight"
							stroke-linejoin="round"
							stroke-linecap="round"
						/>
					</g>
				</g>
			</svg>
		</div>
	</div>
</template>

<style scoped>
.mkt-wave {
	position: absolute;
	inset: 0;
	overflow: hidden;
	pointer-events: none;
	z-index: 0;

	/* The marketing ramp (sellsheet-glass.css) as HSL triples, ordered back to
	   front: the deep Yale end sits furthest away and the Sky-Aqua carries the
	   near crest, which is the band the eye actually reads. */
	--wave-1: 194 88% 43%; /* #0da0cc — the working accent */
	--wave-2: 206 55% 30%; /* #235377 — Yale, the deepest */
	--wave-3: 197 77% 38%; /* #1681aa */
	--wave-4: 193 92% 45%; /* #09b0dd */
	--wave-5: 191 100% 50%; /* #00cfff — Sky-Aqua, the near crest */

	/* A lens re-tints by swapping `--ambient-hue`, which every band's fill and
	   stroke reads through. It is NOT transitioned: the value is a bare HSL
	   triple, which has no registered syntax to interpolate, so a `transition`
	   here would be silently inert. The cross-fade the eye reads on a lens
	   change is the screenshot's, not the field's. */
}

.mkt-wave__plane {
	position: absolute;
	/* Overhangs the frame on every side, for three reasons: a band mid-slide
	   must never expose its trailing edge, the plane's own parallax must not
	   walk its top edge into view, and `filter: blur()` fades to transparent at
	   the element's own bounds — if those were the hero's you would see a
	   vignette outlining the plane. */
	left: -20%;
	top: -18%;
	width: 140%;
	height: 150%;
	/* THE depth cue, per plane. The only runtime filter here. */
	filter: blur(var(--plane-blur, 6px));
	will-change: transform;
}

.mkt-wave__svg {
	display: block;
	width: 100%;
	height: 100%;
	/* ONE multiplier over the whole field, per colour mode, on top of the
	   per-band alphas above. Light needs MORE field, not less: over near-black
	   a 0.10 wash is light being added and it carries, but over white it is a
	   grey being subtracted and goes muddy long before it goes strong. So 0.88
	   is the light default and dark dials DOWN to 0.82; the pair is set on the
	   page in sellsheet-home.css.

	   ⚠️ Tune the field HERE, not in the specs — those carry the depth ladder,
	   and editing them by hand for a global "more/less" flattens it one band at
	   a time. Below ~0.75 the far crests fall under the threshold where a band
	   stops reading as a wave and starts reading as fog.

	   ⚠️ Driven by a CUSTOM PROPERTY, not a `.dark` descendant rule. This is
	   scoped CSS, and a `:global(.dark) .mkt-wave__svg` selector was silently
	   compiled away — the field ran at the LIGHT strength on the dark ground
	   until a computed-style check caught it. A custom property inherits from
	   the page and has no such problem. */
	opacity: var(--wave-strength, 0.88);
}

/* ⚠️ NO `will-change` on the bands. They live inside `.mkt-wave__plane`, which
   carries a `filter` — a filtered subtree re-rasterises as a unit, so its
   children cannot be promoted to their own compositor layers however they are
   hinted. The hint would only reserve memory. The plane keeps its own, and
   deserves it: that IS the layer. */
</style>
